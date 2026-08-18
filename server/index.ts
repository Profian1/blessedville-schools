import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { sendEmail, getEmailConfig } from "./mail/smtp";
import { contactAdminEmail, contactConfirmationEmail } from "./mail/templates/contact";
import {
  admissionsAdminEmail,
  admissionsParentEmail,
} from "./mail/templates/admissions";
import {
  generateReference,
  saveApplication,
  listApplications,
  getApplication,
  updateApplication,
  hasRecentDuplicate,
  APPLICATION_STATUSES,
} from "./store";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json({ limit: "100kb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));

/* ------------------------------------------------------------------ */
/* Origin check (lightweight CSRF protection for browser requests)     */
/* ------------------------------------------------------------------ */
const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:5173", "http://localhost:3001"].filter(
  (o): o is string => Boolean(o)
);

app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  const origin = req.headers.origin;
  if (!origin) return next();
  if (allowedOrigins.some((o) => origin === o || origin.startsWith(o.replace(/\/$/, "") + "/"))) return next();
  res.status(403).json({ success: false, message: "Request origin not allowed." });
});

/* ------------------------------------------------------------------ */
/* Rate limiting (in-memory, resets on restart)                        */
/* ------------------------------------------------------------------ */
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const rateLimitBuckets = {
  contact: new Map<string, { count: number; resetAt: number }>(),
  admissions: new Map<string, { count: number; resetAt: number }>(),
} as const;

type RateBucketKey = keyof typeof rateLimitBuckets;

function checkRateLimit(bucket: RateBucketKey, ip: string, max: number, windowMs: number): boolean {
  const store = rateLimitBuckets[bucket];
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

function clientIp(req: express.Request): string {
  return req.ip || req.socket.remoteAddress || "unknown";
}

/* ------------------------------------------------------------------ */
/* Friendly validation messages — never expose technical zod output    */
/* ------------------------------------------------------------------ */
const GENERIC_FORM_ERROR = "Please review your application and try again.";

function firstFriendlyError(result: { error: z.ZodError }, fallback: string = GENERIC_FORM_ERROR): string {
  const issue = result.error.issues[0];
  if (!issue) return fallback;
  const technical = new Set(["invalid_type", "too_big", "too_small", "unrecognized_keys", "invalid_union", "invalid_literal"]);
  return technical.has(issue.code) ? fallback : issue.message;
}

/* ------------------------------------------------------------------ */
/* Shared validation helpers                                           */
/* ------------------------------------------------------------------ */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, "");
  if (!digits) return false;
  if (/^(\+?254|0)?7\d{8}$/.test(digits)) return true;
  return /^\+?\d{8,15}$/.test(digits);
}

const MAX_APPLICANT_AGE_YEARS = 18;

function isValidDateOfBirth(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const dob = new Date(`${value}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return false;
  const now = new Date();
  if (dob > now) return false;
  const minDate = new Date(now.getFullYear() - MAX_APPLICANT_AGE_YEARS, now.getMonth(), now.getDate());
  return dob >= minDate;
}

const PROGRAM_GRADES: Record<string, string[]> = {
  daycare: ["Daycare", "Kindergarten"],
  playgroup: ["Playgroup", "Preschool"],
  "lower-primary": ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
};

const ADMISSION_TERMS = ["Term 1", "Term 2", "Term 3"];
const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "Social Media",
  "Friend or Family",
  "Current Parent",
  "School Event",
  "Referral",
  "Other",
];

/* ------------------------------------------------------------------ */
/* Contact form (existing)                                             */
/* ------------------------------------------------------------------ */
const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().default(""),
  subject: z.string().min(2, "Subject is required").max(200),
  grade: z.string().optional().default(""),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  honeypot: z.string().max(0, "Bot detected"),
});

app.post("/api/contact", async (req, res) => {
  try {
    const ip = clientIp(req);
    if (!checkRateLimit("contact", ip, 5, 60_000)) {
      res.status(429).json({ success: false, message: "Too many requests. Please try again shortly." });
      return;
    }

    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: firstFriendlyError(result) });
      return;
    }

    const data = result.data;
    const submittedAt = new Date().toISOString();
    const submittedAtDisplay = new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });

    const { admissionsEmail } = getEmailConfig();
    const contactData = { ...data, submittedAt: submittedAtDisplay };

    const adminEmail = contactAdminEmail(contactData);
    const confirmationEmail = contactConfirmationEmail(contactData);

    const [adminResult, confirmResult] = await Promise.allSettled([
      sendEmail({ to: admissionsEmail, subject: "New Contact Form Submission - Blessedville Schools", ...adminEmail }),
      sendEmail({ to: data.email, subject: "We've Received Your Message - Blessedville Schools", ...confirmationEmail }),
    ]);

    const adminOk = adminResult.status === "fulfilled";
    const confirmOk = confirmResult.status === "fulfilled";

    if (!adminOk && !confirmOk) {
      res.status(500).json({
        success: true,
        message: "Thank you! Your message has been received. Our team will follow up with you shortly.",
      });
      return;
    }

    res.json({
      success: true,
      message: "Thank you! Your message has been sent successfully. We will get back to you within 24 hours.",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({
      success: true,
      message: "Thank you! Your message has been received. Our team will follow up with you shortly.",
    });
  }
});

/* ------------------------------------------------------------------ */
/* Admission application                                               */
/* ------------------------------------------------------------------ */
const admissionsSchema = z.object({
  child: z.object({
    firstName: z.string().trim().min(1, "Student's first name is required").max(100),
    middleName: z.string().trim().max(100).default(""),
    surname: z.string().trim().min(1, "Student's surname is required").max(100),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date of birth")
      .refine(isValidDateOfBirth, "Invalid date of birth"),
    gender: z.enum(["Female", "Male", "Other"], { message: "Invalid gender" }),
    currentSchool: z.string().trim().max(150).default(""),
    program: z.enum(["daycare", "playgroup", "lower-primary"], { message: "Invalid program" }),
    grade: z.string().min(1, "Grade is required").max(50),
    admissionYear: z.string().regex(/^\d{4}$/, "Invalid admission year"),
    admissionTerm: z.enum(ADMISSION_TERMS as [string, ...string[]], { message: "Invalid admission term" }),
  }),
  parent: z.object({
    firstName: z.string().trim().min(1, "Parent's first name is required").max(100),
    surname: z.string().trim().min(1, "Parent's surname is required").max(100),
    relationship: z.enum(["Mother", "Father", "Guardian", "Other"], { message: "Invalid relationship" }),
    email: z.string().trim().email("Valid email is required").max(200),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .max(30)
      .refine(isValidPhone, "Invalid phone number"),
    alternativePhone: z.string().trim().max(30).default("").refine((v) => !v || isValidPhone(v), "Invalid alternative phone"),
    address: z.string().trim().max(300).default(""),
    hasSecondParent: z.boolean(),
    secondParentFirstName: z.string().trim().max(100).default(""),
    secondParentSurname: z.string().trim().max(100).default(""),
    secondParentRelationship: z.string().trim().max(50).default(""),
    secondParentEmail: z.string().trim().max(200).default(""),
    secondParentPhone: z.string().trim().max(30).default(""),
    secondParentAlternativePhone: z.string().trim().max(30).default(""),
    secondParentAddress: z.string().trim().max(300).default(""),
  }),
  preferences: z.object({
    healthConditions: z.boolean(),
    healthDetails: z.string().trim().max(1000).default(""),
    whyInterested: z.string().trim().max(2000).default(""),
    hearAbout: z.enum(HEAR_ABOUT_OPTIONS as [string, ...string[]], { message: "Invalid option" }),
    wantsTour: z.boolean(),
    tourDate: z.string().trim().max(20).default(""),
    tourTime: z.string().trim().max(50).default(""),
    additionalInfo: z.string().trim().max(2000).default(""),
  }),
  honeypot: z.string().max(0, "Bot detected"),
}).superRefine((data, ctx) => {
  const grades = PROGRAM_GRADES[data.child.program] ?? [];
  if (!grades.includes(data.child.grade)) {
    ctx.addIssue({ code: "custom", path: ["child", "grade"], message: "Invalid grade for the selected program" });
  }
  if (data.preferences.wantsTour && !data.preferences.tourDate) {
    ctx.addIssue({ code: "custom", path: ["preferences", "tourDate"], message: "Preferred tour date is required" });
  }
  if (data.parent.hasSecondParent) {
    if (!data.parent.secondParentFirstName) {
      ctx.addIssue({ code: "custom", path: ["parent", "secondParentFirstName"], message: "Second parent's first name is required" });
    }
    if (!data.parent.secondParentSurname) {
      ctx.addIssue({ code: "custom", path: ["parent", "secondParentSurname"], message: "Second parent's surname is required" });
    }
    if (!data.parent.secondParentRelationship) {
      ctx.addIssue({ code: "custom", path: ["parent", "secondParentRelationship"], message: "Relationship is required" });
    }
    if (!data.parent.secondParentPhone) {
      ctx.addIssue({ code: "custom", path: ["parent", "secondParentPhone"], message: "Second parent's phone number is required" });
    }
  }
  if (data.preferences.healthConditions && !data.preferences.healthDetails) {
    ctx.addIssue({ code: "custom", path: ["preferences", "healthDetails"], message: "Please describe the health conditions" });
  }
});

app.post("/api/admissions", async (req, res) => {
  try {
    const ip = clientIp(req);
    if (!checkRateLimit("admissions", ip, 5, 15 * 60_000)) {
      res.status(429).json({
        success: false,
        message: "You have submitted too many applications from this device. Please wait a while and try again, or contact our admissions team.",
      });
      return;
    }

    const result = admissionsSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: firstFriendlyError(result) });
      return;
    }

    const data = result.data;

    if (hasRecentDuplicate(data.child, data.parent.email, 30 * 24 * 60 * 60 * 1000)) {
      res.status(409).json({
        success: false,
        message:
          "It looks like an application for this student has already been submitted. Our team will be in touch. If you have questions, please contact the admissions team.",
      });
      return;
    }

    const reference = generateReference();
    const submittedAt = new Date().toISOString();
    const submittedAtDisplay = new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });

    const record = {
      reference,
      status: "New",
      internalNotes: [] as { text: string; at: string }[],
      submittedAt,
      child: data.child,
      parent: data.parent,
      preferences: data.preferences,
    };
    saveApplication(record);

    const { admissionsEmail } = getEmailConfig();
    const mailData = {
      reference,
      submittedAt: submittedAtDisplay,
      child: data.child,
      parent: data.parent,
      preferences: data.preferences,
    };

    const [adminResult, confirmResult] = await Promise.allSettled([
      sendEmail({
        to: admissionsEmail,
        subject: `New Blessedville Schools Admission Application — ${reference}`,
        ...admissionsAdminEmail(mailData),
      }),
      sendEmail({
        to: data.parent.email,
        subject: `We've Received Your Blessedville Schools Application — ${reference}`,
        ...admissionsParentEmail(mailData),
      }),
    ]);

    const adminOk = adminResult.status === "fulfilled";
    const confirmOk = confirmResult.status === "fulfilled";

    if (!adminOk && !confirmOk) {
      console.error("Admission application emails failed", { reference });
    }

    res.status(201).json({
      success: true,
      reference,
      message: "Your application has been received successfully.",
    });
  } catch (err) {
    console.error("Admission application error:", err);
    res.status(500).json({
      success: false,
      message: "We couldn't submit your application right now. Please try again shortly or contact our admissions team.",
    });
  }
});

/* ------------------------------------------------------------------ */
/* Admin — applications management                                     */
/* ------------------------------------------------------------------ */
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

function isAuthorized(req: express.Request): boolean {
  if (!ADMIN_TOKEN) return false;
  const auth = req.headers.authorization || "";
  return auth === `Bearer ${ADMIN_TOKEN}`;
}

function adminListSummary(record: Awaited<ReturnType<typeof listApplications>>[number]) {
  return {
    reference: record.reference,
    status: record.status,
    submittedAt: record.submittedAt,
    childName: `${record.child.firstName} ${record.child.surname}`,
    dateOfBirth: record.child.dateOfBirth,
    program: record.child.program,
    grade: record.child.grade,
    admissionYear: record.child.admissionYear,
    admissionTerm: record.child.admissionTerm,
    parentName: `${record.parent.firstName} ${record.parent.surname}`,
    parentEmail: record.parent.email,
    parentPhone: record.parent.phone,
  };
}

app.get("/api/admissions/admin", (req, res) => {
  if (!isAuthorized(req)) {
    res.status(401).json({ success: false, message: "Unauthorized." });
    return;
  }
  const { program, grade, year, status, q } = req.query as Record<string, string | undefined>;
  let records = listApplications();

  if (program) records = records.filter((r) => r.child.program === program);
  if (grade) records = records.filter((r) => r.child.grade === grade);
  if (year) records = records.filter((r) => r.child.admissionYear === year);
  if (status) records = records.filter((r) => r.status === status);
  if (q) {
    const needle = q.toLowerCase();
    records = records.filter(
      (r) =>
        r.child.firstName.toLowerCase().includes(needle) ||
        r.child.surname.toLowerCase().includes(needle) ||
        r.reference.toLowerCase().includes(needle) ||
        r.parent.email.toLowerCase().includes(needle) ||
        r.parent.phone.toLowerCase().includes(needle)
    );
  }

  res.json({ success: true, applications: records.map(adminListSummary), total: records.length });
});

app.get("/api/admissions/admin/:reference", (req, res) => {
  if (!isAuthorized(req)) {
    res.status(401).json({ success: false, message: "Unauthorized." });
    return;
  }
  const record = getApplication(req.params.reference);
  if (!record) {
    res.status(404).json({ success: false, message: "Application not found." });
    return;
  }
  res.json({ success: true, application: record });
});

app.patch("/api/admissions/admin/:reference", (req, res) => {
  if (!isAuthorized(req)) {
    res.status(401).json({ success: false, message: "Unauthorized." });
    return;
  }
  const body = z
    .object({
      status: z.enum(APPLICATION_STATUSES as unknown as [string, ...string[]]).optional(),
      note: z.string().trim().max(2000).optional(),
    })
    .safeParse(req.body);

  if (!body.success) {
    res.status(400).json({ success: false, message: "Invalid update." });
    return;
  }

  if (!body.data.status && !body.data.note) {
    res.status(400).json({ success: false, message: "Nothing to update." });
    return;
  }

  const record = updateApplication(req.params.reference, {
    status: body.data.status,
    note: body.data.note,
  });
  if (!record) {
    res.status(404).json({ success: false, message: "Application not found." });
    return;
  }
  res.json({ success: true, application: record });
});

/* ------------------------------------------------------------------ */
/* Static site — serves the production build (dist/) if present        */
/* ------------------------------------------------------------------ */
const DIST_DIR = path.join(process.cwd(), "dist");

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get(/^(?!\/api(?:\/|$)).*/, (req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"));
  });
}

/* ------------------------------------------------------------------ */
/* Listen                                                              */
/* ------------------------------------------------------------------ */
app.listen(PORT, () => {
  console.log(`📧 Email API running on http://localhost:${PORT}`);
});
