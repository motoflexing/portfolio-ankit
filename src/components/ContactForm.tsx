"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionButton } from "@/components/ActionButton";
import { cn } from "@/lib/utils";
import {
  contactReasons,
  validateContact,
  type ContactErrors,
  type ContactPayload,
  type ContactReason,
} from "@/lib/contact";

type FormState = {
  name: string;
  email: string;
  organization: string;
  reason: ContactReason | "";
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  organization: "",
  reason: "",
  message: "",
};

/**
 * Contact form: shadcn inputs/select/textarea, client + server validation,
 * loading state, and sonner toasts for success/error. Submits to the
 * /api/contact route handler.
 *
 * Accessibility: every field has a <Label>, errors are linked via
 * aria-describedby and announced with role="alert".
 */
export function ContactForm() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Partial<ContactPayload> = {
      name: values.name,
      email: values.email,
      organization: values.organization || undefined,
      reason: (values.reason || undefined) as ContactReason | undefined,
      message: values.message,
    };

    const clientErrors = validateContact(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        toast.error(data.message ?? "Something went wrong.");
        return;
      }

      toast.success("Thanks — your message is on its way.");
      setValues(EMPTY);
      setErrors({});
      setSent(true);
    } catch {
      toast.error("Network error. Please try again, or email directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return <SuccessPanel reduced={reduced} onReset={() => setSent(false)} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={errors.name}
          required
        >
          <Input
            id="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email} required>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="organization" label="Organization (optional)">
          <Input
            id="organization"
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            placeholder="Company or team"
          />
        </Field>

        <Field id="reason" label="Reason" error={errors.reason} required>
          <Select
            value={values.reason}
            onValueChange={(v) => set("reason", v as ContactReason)}
          >
            <SelectTrigger
              id="reason"
              aria-invalid={!!errors.reason}
              aria-describedby={errors.reason ? "reason-error" : undefined}
              className="w-full"
            >
              <SelectValue placeholder="What's this about?" />
            </SelectTrigger>
            <SelectContent>
              {contactReasons.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message} required>
        <Textarea
          id="message"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell me a little about what you have in mind."
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      <ActionButton
        type="submit"
        variant="primary"
        size="lg"
        magnetic
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send />
          </>
        )}
      </ActionButton>
    </form>
  );
}

/** Labelled field wrapper with accessible error text. */
function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-mono text-xs uppercase tracking-wide">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </Label>
      {/* Control + animated accent underline that grows from the left on focus.
          `group` + focus-within drives scaleX 0->1 (CSS transition, so it's
          inert/instant under reduced-motion via the global transition zeroing). */}
      <div className="group relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-focus-within:scale-x-100"
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn("text-xs text-accent")}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Success state shown after a message sends. A hand-coded SVG checkmark draws
 * itself (Framer pathLength) — no animation library beyond what's installed.
 * Under reduced-motion the check is simply drawn (no animation).
 */
function SuccessPanel({
  reduced,
  onReset,
}: {
  reduced: boolean;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="card-hairline flex flex-col items-center gap-5 p-10 text-center"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="var(--accent)"
          strokeWidth="2"
          initial={reduced ? false : { pathLength: 0 }}
          animate={reduced ? undefined : { pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.path
          d="M20 33 L29 42 L45 24"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={reduced ? undefined : { pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.45 }}
        />
      </svg>
      <div>
        <h3 className="font-display text-h3 font-medium text-text">
          Message sent
        </h3>
        <p className="measure mt-2 text-sm leading-relaxed text-text-muted">
          Thanks for reaching out — I&apos;ll get back to you. In the meantime,
          feel free to email directly.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs uppercase tracking-widest text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
      >
        Send another
      </button>
    </div>
  );
}
