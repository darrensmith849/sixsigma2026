/**
 * Inlined HTML email templates for the /api/contact route.
 *
 * Keeping these in code (rather than in Brevo's template editor) means:
 *   - They're version-controlled in git
 *   - Copy changes go through PR review
 *   - No Brevo template ID drift between environments
 */

const LOGO_URL =
  "https://sixsigmasouthafrica.co.za/images/sssa-logo-full.png";
const SIGMAFY_URL = "https://sigmafy.com";

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, sans-serif;
  color: #0a1e14;
  line-height: 1.65;
`;

function wrapper(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Six Sigma South Africa</title>
</head>
<body style="margin:0;padding:0;background:#f6f8f7;${baseStyles}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f8f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="${LOGO_URL}" alt="Six Sigma South Africa" width="280" style="display:block;max-width:280px;width:100%;height:auto;" />
              <p style="margin:12px 0 0;color:#5b6b62;font-size:14px;">
                Powered by <strong style="color:#16b24a;">2KO</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border-radius:16px;padding:40px;box-shadow:0 4px 12px rgba(10,30,20,.06);">
              ${inner}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0;font-size:15px;color:#0a1e14;">
                Check out <a href="${SIGMAFY_URL}" style="color:#16b24a;font-weight:700;text-decoration:underline;">Sigmafy</a>
              </p>
              <p style="margin:6px 0 0;font-size:14px;color:#5b6b62;">
                The dedicated Six Sigma Network.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#9ba8a1;">
                Six Sigma South Africa &mdash; 2KO Africa CC<br/>
                021 426 5300 &middot; info@2ko.co.za
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ────────────────────────────────────────────────
 * 1. Confirmation email — sent back to the enquirer
 * ──────────────────────────────────────────────── */

export interface ConfirmationParams {
  name: string;
  subject: string;
}

const subjectLabels: Record<string, string> = {
  "course-enquiry": "Six Sigma course enquiry",
  "corporate-training": "corporate training enquiry",
  "consultancy": "consultancy enquiry",
  "partnership": "partnership enquiry",
  "general": "enquiry",
};

export function buildConfirmationEmail({
  name,
  subject,
}: ConfirmationParams): { subject: string; html: string } {
  const firstName = escape(name.trim().split(/\s+/)[0] || "there").toUpperCase();
  const subjectLabel = subjectLabels[subject] ?? "enquiry";

  const html = wrapper(`
    <h1 style="margin:0 0 24px;font-size:28px;font-weight:800;color:#0a1e14;letter-spacing:-0.02em;">
      Thank you for your inquiry!
    </h1>
    <p style="margin:0 0 20px;font-size:16px;color:#0a1e14;">
      Hi ${firstName},
    </p>
    <p style="margin:0 0 20px;font-size:16px;color:#0a1e14;">
      We have received your ${escape(subjectLabel)} and one of our team will be in touch within one business day.
    </p>
    <p style="margin:0 0 20px;font-size:16px;color:#0a1e14;">
      In the meantime, if your enquiry is urgent you can reach us directly on
      <a href="tel:+27214265300" style="color:#16b24a;font-weight:600;">021 426 5300</a> or
      <a href="mailto:info@2ko.co.za" style="color:#16b24a;font-weight:600;">info@2ko.co.za</a>.
    </p>
    <p style="margin:24px 0 0;font-size:16px;color:#0a1e14;">
      Kind regards,<br/>
      <strong>The Six Sigma South Africa team</strong>
    </p>
  `);

  return {
    subject: "Thank you for your inquiry · Six Sigma South Africa",
    html,
  };
}

/* ────────────────────────────────────────────────
 * 2. Internal notification — sent to contact@2ko.co.za
 * ──────────────────────────────────────────────── */

export interface NotificationParams {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  sourcePage?: string;
  utm?: Record<string, string>;
  userAgent?: string;
}

export function buildNotificationEmail(
  p: NotificationParams
): { subject: string; html: string } {
  const subjectLabel = subjectLabels[p.subject] ?? p.subject;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e8ece9;vertical-align:top;width:140px;">
        <strong style="font-size:12px;color:#5b6b62;text-transform:uppercase;letter-spacing:0.12em;">
          ${escape(label)}
        </strong>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #e8ece9;font-size:15px;color:#0a1e14;">
        ${value}
      </td>
    </tr>`;

  const utmRows = p.utm
    ? Object.entries(p.utm)
        .map(([k, v]) => row(k, escape(v)))
        .join("")
    : "";

  const inner = `
    <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#16b24a;text-transform:uppercase;letter-spacing:0.14em;">
      New website enquiry
    </p>
    <h1 style="margin:0 0 32px;font-size:26px;font-weight:800;color:#0a1e14;letter-spacing:-0.02em;">
      ${escape(subjectLabel)}
    </h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row("Name", escape(p.name))}
      ${row(
        "Email",
        `<a href="mailto:${escape(p.email)}" style="color:#16b24a;">${escape(p.email)}</a>`
      )}
      ${row(
        "Phone",
        p.phone
          ? `<a href="tel:${escape(p.phone.replace(/\s+/g, ""))}" style="color:#16b24a;">${escape(p.phone)}</a>`
          : '<span style="color:#9ba8a1;">—</span>'
      )}
      ${row("Company", p.company ? escape(p.company) : '<span style="color:#9ba8a1;">—</span>')}
      ${row("Subject", escape(subjectLabel))}
      ${row("Source page", p.sourcePage ? escape(p.sourcePage) : '<span style="color:#9ba8a1;">—</span>')}
      ${utmRows}
    </table>

    <div style="margin-top:32px;padding:24px;background:#f6f8f7;border-radius:12px;border-left:4px solid #16b24a;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#5b6b62;text-transform:uppercase;letter-spacing:0.12em;">
        Message
      </p>
      <p style="margin:0;font-size:15px;color:#0a1e14;white-space:pre-wrap;line-height:1.65;">
${escape(p.message)}
      </p>
    </div>

    <div style="margin-top:28px;text-align:center;">
      <a href="mailto:${escape(p.email)}?subject=Re%3A%20Your%20Six%20Sigma%20enquiry"
         style="display:inline-block;background:#16b24a;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">
        Reply to ${escape(p.name.split(/\s+/)[0] || "enquirer")}
      </a>
    </div>
  `;

  return {
    subject: `[Website enquiry] ${subjectLabel} — ${p.name}`,
    html: wrapper(inner),
  };
}
