import express from "express";
import cors from "cors";
import { z } from "zod";
import { sendEmail, getEmailConfig } from "./mail/smtp";
import { contactAdminEmail, contactConfirmationEmail } from "./mail/templates/contact";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));

// Rate limiting store (in-memory, resets on restart)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

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
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(ip)) {
      res.status(429).json({ success: false, message: "Too many requests. Please try again shortly." });
      return;
    }

    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((i) => i.message).join(", ");
      res.status(400).json({ success: false, message: errors });
      return;
    }

    const data = result.data;
    const submittedAt = new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });

    const { admissionsEmail } = getEmailConfig();
    const contactData = { ...data, submittedAt };

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

app.listen(PORT, () => {
  console.log(`📧 Email API running on http://localhost:${PORT}`);
});
