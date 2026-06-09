import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Contact form submission handler.
 *
 * Currently validates server-side and logs the message. The actual delivery
 * is stubbed at `deliverMessage()` below — wire a real provider there
 * (e.g. Resend, SendGrid, Nodemailer, or a webhook) and add the API key to
 * the environment. No provider is bundled so there are no broken secrets.
 */
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  // Server-side validation — never trust the client alone.
  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", errors },
      { status: 422 },
    );
  }

  try {
    await deliverMessage(body as ContactPayload);
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong sending your message." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: "Message received." });
}

/**
 * TODO: integrate a real email/delivery provider here.
 *
 * Example (Resend):
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "portfolio@ankit.motoflexing.com",
 *     to: site.email,
 *     subject: `[Portfolio] ${payload.reason} — ${payload.name}`,
 *     replyTo: payload.email,
 *     text: payload.message,
 *   });
 *
 * Until then we log the (validated) submission so the form flow is fully
 * testable end to end without sending real email.
 */
async function deliverMessage(payload: ContactPayload): Promise<void> {
  console.info("[contact] new submission:", {
    name: payload.name,
    email: payload.email,
    organization: payload.organization ?? "—",
    reason: payload.reason,
    messagePreview: payload.message.slice(0, 80),
  });
}
