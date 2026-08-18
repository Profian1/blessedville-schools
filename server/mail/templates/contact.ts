import { emailLayout } from "./layout";
import { SCHOOL_MAIL } from "../schoolConfig";

type ContactData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  grade: string;
  message: string;
  submittedAt: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function contactAdminEmail(data: ContactData) {
  const content = `
    <h2>New Contact Form Submission</h2>
    <p>A new inquiry has been received through the Blessedville Schools website.</p>
    <div class="details">
      <strong>Parent Name</strong><span>${escapeHtml(data.name)}</span>
      <strong>Email</strong><span>${escapeHtml(data.email)}</span>
      <strong>Phone</strong><span>${escapeHtml(data.phone) || "Not provided"}</span>
      <strong>Subject</strong><span>${escapeHtml(data.subject)}</span>
      <strong>Child's Age / Grade</strong><span>${escapeHtml(data.grade) || "Not provided"}</span>
      <strong>Message</strong><span style="white-space:pre-wrap">${escapeHtml(data.message)}</span>
      <strong>Submitted</strong><span>${escapeHtml(data.submittedAt)}</span>
    </div>
    <a href="mailto:${escapeHtml(data.email)}" class="btn">Reply to Parent</a>
  `;

  return {
    html: emailLayout(content),
    text: `New Contact Form Submission\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\nGrade: ${data.grade}\nMessage: ${data.message}\nSubmitted: ${data.submittedAt}`,
  };
}

export function contactConfirmationEmail(data: ContactData) {
  const content = `
    <h2>We've Received Your Message</h2>
    <p>Dear ${data.name},</p>
    <p>Thank you for reaching out to Blessedville Schools. We have received your inquiry and our admissions team will respond within 24 hours during weekdays.</p>
    <p>In the meantime, you can explore our programs, activities, and school life at our website.</p>
    <a href="${escapeHtml(SCHOOL_MAIL.website)}/contact" class="btn">Book a School Tour</a>
    <p style="margin-top:16px">If you need immediate assistance, feel free to call us at <strong>${escapeHtml(SCHOOL_MAIL.phone)}</strong>.</p>
  `;

  return {
    html: emailLayout(content),
    text: `We've Received Your Message\n\nDear ${data.name},\n\nThank you for reaching out to Blessedville Schools. We have received your inquiry and will respond within 24 hours. You can call us at ${SCHOOL_MAIL.phone} for immediate assistance.`,
  };
}
