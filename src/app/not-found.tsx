import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";

export default function NotFound() {
  return (
    <div className="container-rhythm relative flex min-h-[72vh] flex-col justify-center py-24">
      <div className="md:pl-(--grid-margin)">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-(--grid-margin) border-r border-line md:block">
          <span className="section-index absolute left-4 top-28">404</span>
        </div>

        <p className="eyebrow mb-6">Error · 404</p>
        <h1 className="font-display text-display-xl font-medium text-text">
          Lost the <span className="text-accent">thread</span>.
        </h1>
        <p className="text-body measure mt-5 text-text-muted">
          That page doesn&apos;t exist — it may have moved, or never shipped.
          Let&apos;s get you back to something real.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ActionButton href="/" variant="primary" magnetic>
            <ArrowLeft />
            Back home
          </ActionButton>
          <Link
            href="/projects"
            className="font-mono text-xs uppercase tracking-widest text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
          >
            View the work
          </Link>
        </div>
      </div>
    </div>
  );
}
