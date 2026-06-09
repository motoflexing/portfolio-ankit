import { PageTransition } from "@/components/PageTransition";

/**
 * App Router template — re-mounts on every navigation, so it's the right
 * place to drive the per-page enter transition (curtain wipe + AD monogram).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
