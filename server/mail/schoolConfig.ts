/* ------------------------------------------------------------------ */
/*  Email templates — central school contact configuration              */
/*  Keeps the school's contact details consistent across all emails.   */
/*  Values can be overridden via environment variables.                */
/* ------------------------------------------------------------------ */

export const SCHOOL_MAIL = {
  name: process.env.MAIL_FROM_NAME || "Blessedville Schools",
  phone: process.env.SCHOOL_PHONE || "+254 791 480427",
  whatsapp: process.env.SCHOOL_WHATSAPP || "+254791480427",
  email: process.env.ADMISSIONS_EMAIL || "blessedville22@gmail.com",
  address: process.env.SCHOOL_ADDRESS || "Kiwanja, Northern Bypass, Kahawa West, Nairobi",
  website: process.env.SCHOOL_WEBSITE || "https://blessedvilleschools.co.ke",
  logoUrl: process.env.SCHOOL_LOGO_URL || "https://blessedvilleschools.co.ke/blessedville.svg",
};