import nodemailer from "nodemailer";
import { z } from "zod";

const envSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_SECURE: z.string().optional(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  MAIL_FROM: z.string(),
  ADMISSIONS_EMAIL: z.string(),
});

const env = envSchema.safeParse({
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: process.env.SMTP_PORT || "587",
  SMTP_SECURE: process.env.SMTP_SECURE || "false",
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  MAIL_FROM: process.env.MAIL_FROM || "",
  ADMISSIONS_EMAIL: process.env.ADMISSIONS_EMAIL || "",
});

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    });
  }
  return transporter;
}

export type EmailOptions = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  const transport = getTransporter();
  const from = process.env.MAIL_FROM || "";
  const fromName = process.env.MAIL_FROM_NAME || "Blessedville Schools";

  return transport.sendMail({
    from: `"${fromName}" <${from}>`,
    to,
    subject,
    html,
    text,
  });
}

export function getEmailConfig() {
  return {
    admissionsEmail: process.env.ADMISSIONS_EMAIL || "",
  };
}
