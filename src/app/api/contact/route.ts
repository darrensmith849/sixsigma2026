import { NextRequest, NextResponse } from "next/server";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
} from "@/lib/email-templates";

/**
 * Contact form sink.
 *
 * Accepts a POST from the ContactForm component, validates the payload,
 * and fans it out to:
 *   1. Brevo Transactional Email → internal notification to contact@2ko.co.za
 *   2. Brevo Transactional Email → confirmation back to the enquirer
 *   3. Brevo Contacts → upsert into the "Website Enquiries" list
 *   4. Sigmafy leads endpoint (optional, gated on env var)
 *
 * Each outbound call runs in parallel via Promise.allSettled so a single
 * failure doesn't block the others. The user only sees an error if the
 * internal notification (the most important one) fails.
 */

export const runtime = "nodejs";

const BREVO_API = "https://api.brevo.com/v3";

interface ContactPayload {
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

function validate(body: unknown): ContactPayload | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid payload" };
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const sourcePage = typeof b.sourcePage === "string" ? b.sourcePage : undefined;
  const utm =
    b.utm && typeof b.utm === "object"
      ? (b.utm as Record<string, string>)
      : undefined;
  const userAgent =
    typeof b.userAgent === "string" ? b.userAgent : undefined;

  if (!name) return { error: "Name is required" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Valid email is required" };
  if (!subject) return { error: "Subject is required" };
  if (!message) return { error: "Message is required" };

  return { name, email, phone, company, subject, message, sourcePage, utm, userAgent };
}

async function brevoFetch(path: string, init: RequestInit) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY not set");
  const res = await fetch(`${BREVO_API}${path}`, {
    ...init,
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo ${path} failed ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function sendNotificationEmail(payload: ContactPayload) {
  const { subject, html } = buildNotificationEmail(payload);
  return brevoFetch("/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME ?? "Six Sigma South Africa",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: process.env.BREVO_NOTIFY_TO, name: "Six Sigma South Africa" }],
      replyTo: { email: payload.email, name: payload.name },
      subject,
      htmlContent: html,
    }),
  });
}

async function sendConfirmationEmail(payload: ContactPayload) {
  const { subject, html } = buildConfirmationEmail({
    name: payload.name,
    subject: payload.subject,
  });
  return brevoFetch("/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME ?? "Six Sigma South Africa",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: payload.email, name: payload.name }],
      subject,
      htmlContent: html,
    }),
  });
}

async function upsertContact(payload: ContactPayload) {
  const listIdRaw = process.env.BREVO_LIST_ID;
  const listIds = listIdRaw ? [Number(listIdRaw)] : undefined;

  const attributes: Record<string, string> = {
    FIRSTNAME: payload.name.split(/\s+/)[0] ?? "",
    LASTNAME: payload.name.split(/\s+/).slice(1).join(" "),
    COMPANY: payload.company ?? "",
    LAST_ENQUIRY_SUBJECT: payload.subject,
    LAST_ENQUIRY_PAGE: payload.sourcePage ?? "",
    LAST_ENQUIRY_AT: new Date().toISOString(),
  };
  // Only include phone when it parses as valid E.164 (Brevo SMS field
  // rejects anything else). Otherwise store it as a plain text attribute
  // so lead reps still have it to call.
  if (payload.phone) {
    const digits = payload.phone.replace(/[^\d+]/g, "");
    if (/^\+\d{8,15}$/.test(digits)) {
      attributes.SMS = digits;
    } else {
      attributes.PHONE = payload.phone;
    }
  }

  return brevoFetch("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      attributes,
      listIds,
      updateEnabled: true,
    }),
  });
}

async function sendToSigmafy(payload: ContactPayload) {
  const url = process.env.SIGMAFY_API_URL;
  const key = process.env.SIGMAFY_API_KEY;
  if (!url || !key) return { skipped: true };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      source: "sixsigmasouthafrica.co.za",
      sourcePage: payload.sourcePage,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      subject: payload.subject,
      message: payload.message,
      utm: payload.utm,
      userAgent: payload.userAgent,
      receivedAt: new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sigmafy lead POST failed ${res.status}: ${text}`);
  }
  return res.json().catch(() => ({}));
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validate(body);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  // Attach the User-Agent header automatically (useful for spam filtering).
  validated.userAgent = req.headers.get("user-agent") ?? undefined;

  // Fan out. Notification is the critical path — if it throws we return 500.
  // Confirmation, contact upsert and Sigmafy are best-effort (logged).
  const results = await Promise.allSettled([
    sendNotificationEmail(validated), // 0 — critical
    sendConfirmationEmail(validated), // 1
    upsertContact(validated),         // 2
    sendToSigmafy(validated),         // 3
  ]);

  const labels = ["notification", "confirmation", "contact-upsert", "sigmafy"];
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      // eslint-disable-next-line no-console
      console.error(`[contact] ${labels[i]} failed:`, r.reason);
    }
  });

  if (results[0].status === "rejected") {
    return NextResponse.json(
      { error: "Failed to deliver enquiry. Please try again or email info@2ko.co.za directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: {
      notification: results[0].status === "fulfilled",
      confirmation: results[1].status === "fulfilled",
      contact: results[2].status === "fulfilled",
      sigmafy: results[3].status === "fulfilled",
    },
  });
}
