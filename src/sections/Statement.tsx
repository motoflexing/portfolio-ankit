import { Reveal } from "@/components/Reveal";
import { hero } from "@/data/home";

/**
 * Short statement block that sits just beneath the hero — a single, confident
 * line about product-first thinking. Rendered from the data source of truth,
 * with accent emphasis applied to the closing phrase.
 */
export function Statement() {
  // Split the canonical statement so the closing phrase can carry the accent.
  const accentPhrase = "build useful products";
  const [before] = hero.statement.split(accentPhrase);

  return (
    <section
      className="container-rhythm border-y border-line py-20 md:py-28"
      aria-label="Statement"
    >
      <Reveal>
        <p className="mx-auto max-w-4xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-text">
          {before}
          <span className="text-accent">{accentPhrase}</span>.
        </p>
      </Reveal>
    </section>
  );
}
