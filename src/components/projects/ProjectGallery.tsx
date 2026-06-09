"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Swipeable case-study screenshot gallery (Embla) with a lightbox built on
 * the shadcn Dialog. Each shot opens full-size; the dialog is keyboard- and
 * screen-reader-friendly (focus trap + Escape come from Radix).
 *
 * The screenshot paths in the project data are placeholders until real,
 * optimized images are added, so each slide renders an on-brand texture tile
 * with the shot's label rather than a broken image. Swap <GalleryTile> for
 * <Image> once real screenshots exist.
 */
export function ProjectGallery({
  screenshots,
  title,
}: {
  screenshots: string[];
  title: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: screenshots.length > 1,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const raf = requestAnimationFrame(() => onSelect(emblaApi));
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (screenshots.length === 0) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-line" ref={emblaRef}>
        <div className="flex">
          {screenshots.map((src, i) => (
            <div key={src} className="min-w-0 shrink-0 grow-0 basis-full">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group relative block w-full outline-none"
                    aria-label={`View ${title} screenshot ${i + 1} full size`}
                  >
                    <GalleryTile src={src} index={i} />
                    <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded border border-line-strong bg-bg/70 text-text-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="max-w-5xl border-line bg-surface p-2"
                >
                  <DialogTitle className="sr-only">
                    {title} — screenshot {i + 1}
                  </DialogTitle>
                  <div className="relative">
                    <GalleryTile src={src} index={i} large />
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        aria-label="Close"
                        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded border border-line-strong bg-bg/70 text-text backdrop-blur"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </DialogTrigger>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {screenshots.length > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {screenshots.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Screenshot ${i + 1}`}
                aria-current={selected === i ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  selected === i
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-line-strong hover:bg-text-faint",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous screenshot"
              className="grid h-9 w-9 place-items-center rounded border border-line-strong text-text-muted transition-colors hover:border-accent hover:text-text"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next screenshot"
              className="grid h-9 w-9 place-items-center rounded border border-line-strong text-text-muted transition-colors hover:border-accent hover:text-text"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Placeholder tile standing in for a real screenshot. On-brand grid texture +
 * filename label. Replace with <Image src={src} .../> when real screenshots
 * are added (the `src` is already threaded through).
 */
function GalleryTile({
  src,
  index,
  large,
}: {
  src: string;
  index: number;
  large?: boolean;
}) {
  const name = src.split("/").pop()?.replace(/\.\w+$/, "") ?? `shot-${index}`;
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-bg",
        large ? "aspect-video rounded-md" : "aspect-[16/10]",
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(245,245,243,0.06) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <span className="absolute bottom-4 left-4 font-mono text-xs text-text-faint">
        {name}
      </span>
    </div>
  );
}
