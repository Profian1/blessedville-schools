import { emailLayout } from "./layout";
import { SCHOOL_MAIL } from "../schoolConfig";

type ChildData = {
  firstName: string;
  middleName: string;
  surname: string;
  dateOfBirth: string;
  gender: string;
  currentSchool: string;
  program: string;
  grade: string;
  admissionYear: string;
  admissionTerm: string;
};

type ParentData = {
  firstName: string;
  surname: string;
  relationship: string;
  email: string;
  phone: string;
  alternativePhone: string;
  address: string;
};

type PreferencesData = {
  whyInterested: string;
  hearAbout: string;
  wantsTour: boolean;
  tourDate: string;
  tourTime: string;
  additionalInfo: string;
};

export type AdmissionData = {
  reference: string;
  submittedAt: string;
  child: ChildData;
  parent: ParentData;
  preferences: PreferencesData;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const PROGRAM_LABELS: Record<string, string> = {
  daycare: "Kindergarten & Daycare",
  playgroup: "Playgroup / Preschool",
  "lower-primary": "Lower Primary",
};

function programLabel(key: string): string {
  return PROGRAM_LABELS[key] ?? key;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
}

/* ------------------------------------------------------------------ */
/* Email 1 — notification to the school admissions team                */
/* ------------------------------------------------------------------ */
export function admissionsAdminEmail(data: AdmissionData) {
  const content = `
    <h2>New Admission Application</h2>
    <p>A new online admission application was received through the Blessedville Schools website.</p>
    <div class="details">
      <strong>Application Reference</strong><span>${escapeHtml(data.reference)}</span>
      <strong>Child's Name</strong><span>${escapeHtml([data.child.firstName, data.child.middleName, data.child.surname].filter(Boolean).join(" "))}</span>
      <strong>Date of Birth</strong><span>${escapeHtml(formatDate(data.child.dateOfBirth))}</span>
      <strong>Program</strong><span>${escapeHtml(programLabel(data.child.program))}</span>
      <strong>Grade / Class</strong><span>${escapeHtml(data.child.grade)}</span>
      <strong>Intended Admission</strong><span>${escapeHtml(data.child.admissionYear)} · ${escapeHtml(data.child.admissionTerm)}</span>
      <strong>Parent / Guardian</strong><span>${escapeHtml(data.parent.firstName + " " + data.parent.surname)} (${escapeHtml(data.parent.relationship)})</span>
      <strong>Parent Email</strong><span>${escapeHtml(data.parent.email)}</span>
      <strong>Parent Phone</strong><span>${escapeHtml(data.parent.phone)}</span>
      <strong>School Tour Requested</strong><span>${data.preferences.wantsTour ? `Yes — ${escapeHtml(data.preferences.tourDate)}${data.preferences.tourTime ? " (" + escapeHtml(data.preferences.tourTime) + ")" : ""}` : "No"}</span>
      <strong>Submitted</strong><span>${escapeHtml(data.submittedAt)}</span>
    </div>
    <a href="mailto:${escapeHtml(data.parent.email)}" class="btn">Reply to Parent</a>
  `;

  const text = [
    "New Admission Application",
    "",
    `Application Reference: ${data.reference}`,
    `Child's Name: ${[data.child.firstName, data.child.middleName, data.child.surname].filter(Boolean).join(" ")}`,
    `Date of Birth: ${formatDate(data.child.dateOfBirth)}`,
    `Program: ${programLabel(data.child.program)}`,
    `Grade / Class: ${data.child.grade}`,
    `Intended Admission: ${data.child.admissionYear} · ${data.child.admissionTerm}`,
    `Parent / Guardian: ${data.parent.firstName} ${data.parent.surname} (${data.parent.relationship})`,
    `Parent Email: ${data.parent.email}`,
    `Parent Phone: ${data.parent.phone}`,
    `School Tour Requested: ${data.preferences.wantsTour ? "Yes" : "No"}`,
    `Submitted: ${data.submittedAt}`,
  ].join("\n");

  return { html: emailLayout(content), text };
}

/* ------------------------------------------------------------------ */
/* Email 2 — confirmation to the parent                                */
/* ------------------------------------------------------------------ */
export function admissionsParentEmail(data: AdmissionData) {
  const content = `
    <h2>We've Received Your Application</h2>
    <p>Dear ${escapeHtml(data.parent.firstName + " " + data.parent.surname)},</p>
    <p>Thank you for applying to Blessedville Schools. This email confirms that <strong>${escapeHtml([data.child.firstName, data.child.surname].filter(Boolean).join(" "))}</strong> — your application for <strong>${escapeHtml(programLabel(data.child.program))}</strong> — has been received by our admissions team.</p>
    <div class="details">
      <strong>Application Reference</strong><span>${escapeHtml(data.reference)}</span>
      <strong>Program</strong><span>${escapeHtml(programLabel(data.child.program))} · ${escapeHtml(data.child.grade)}</span>
      <strong>Intended Admission</strong><span>${escapeHtml(data.child.admissionYear)} · ${escapeHtml(data.child.admissionTerm)}</span>
    </div>
    <p><strong>What happens next?</strong> Our admissions team will review your application and contact you regarding availability and the next steps. Please keep your application reference number for any future correspondence.</p>
    <p>Please note that receiving this confirmation means your application has been received — it does not confirm admission. Our team will be in touch to guide you through the remaining steps.</p>
    <p>If you need assistance in the meantime, call or WhatsApp us on <strong>${escapeHtml(SCHOOL_MAIL.phone)}</strong>, email <strong>${escapeHtml(SCHOOL_MAIL.email)}</strong>, or visit <a href="${escapeHtml(SCHOOL_MAIL.website)}">${escapeHtml(SCHOOL_MAIL.website.replace(/^https?:\/\//, ""))}</a>.</p>
  `;

  const text = [
    "We've Received Your Application",
    "",
    `Dear ${data.parent.firstName} ${data.parent.surname},`,
    "",
    `Thank you for applying to Blessedville Schools. This email confirms that ${[data.child.firstName, data.child.surname].filter(Boolean).join(" ")} — your application for ${programLabel(data.child.program)} — has been received by our admissions team.`,
    "",
    `Application Reference: ${data.reference}`,
    `Program: ${programLabel(data.child.program)} · ${data.child.grade}`,
    `Intended Admission: ${data.child.admissionYear} · ${data.child.admissionTerm}`,
    "",
    "What happens next? Our admissions team will review your application and contact you regarding availability and the next steps. Please keep your application reference number for any future correspondence.",
    "",
    "Please note that receiving this confirmation means your application has been received — it does not confirm admission. Our team will be in touch to guide you through the remaining steps.",
    "",
    "If you need assistance, call or WhatsApp us on " + SCHOOL_MAIL.phone + ", email " + SCHOOL_MAIL.email + ", or visit " + SCHOOL_MAIL.website,
  ].join("\n");

  return { html: emailLayout(content), text };
}
