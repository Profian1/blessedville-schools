import { SCHOOL_MAIL } from "../schoolConfig";

export const SCHOOL = SCHOOL_MAIL;

export function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f4f4f6; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; }
    .header { background: #0B1F3A; padding: 32px 24px; text-align: center; }
    .header img { height: 48px; }
    .header h1 { color: #F5B813; font-size: 14px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin: 12px 0 0; }
    .body { padding: 32px 24px; color: #1a1a1a; }
    .body h2 { color: #0B1F3A; font-size: 22px; margin: 0 0 12px; }
    .body p { font-size: 15px; line-height: 1.6; color: #444; margin: 0 0 12px; }
    .details { background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .details strong { color: #0B1F3A; display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 10px; }
    .details strong:first-child { margin-top: 0; }
    .details span { color: #555; font-size: 14px; }
    .btn { display: inline-block; background: #F5B813; color: #0B1F3A; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 16px; }
    .footer { background: #f8f9fa; padding: 24px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
    .footer p { margin: 4px 0; }
    @media (max-width: 480px) { .body { padding: 24px 16px; } }
  </style>
</head>
<body style="padding: 24px 0;">
  <div class="container">
    <div class="header">
      <div style="background:#F5B813;width:48px;height:48px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;">
        <span style="font-size:24px;color:#0B1F3A;font-weight:700">B</span>
      </div>
      <h1>${SCHOOL.name}</h1>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p style="font-weight:600;color:#0B1F3A;">${SCHOOL.name}</p>
      <p>${SCHOOL.address}</p>
      <p>📞 ${SCHOOL.phone} · ✉️ ${SCHOOL.email}</p>
    </div>
  </div>
</body>
</html>`;
}
