/**
 * Shared contact-form schema + validation, used by both the client form and
 * the server route handler so the rules can't drift apart.
 */

export const contactReasons = [
  "Job opportunity",
  "Internship",
  "Freelance project",
  "Product collaboration",
  "Startup discussion",
  "General message",
] as const;

export type ContactReason = (typeof contactReasons)[number];

export interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  reason: ContactReason;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a payload. Returns an errors map (empty if valid). Pure and shared,
 * so client and server agree on what "valid" means.
 */
export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};

  const name = input.name?.trim() ?? "";
  if (name.length < 2) errors.name = "Please enter your name.";

  const email = input.email?.trim() ?? "";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";

  if (!input.reason || !contactReasons.includes(input.reason)) {
    errors.reason = "Please choose a reason.";
  }

  const message = input.message?.trim() ?? "";
  if (message.length < 10) {
    errors.message = "Please add a little more detail (10+ characters).";
  } else if (message.length > 4000) {
    errors.message = "That message is a bit too long.";
  }

  return errors;
}
