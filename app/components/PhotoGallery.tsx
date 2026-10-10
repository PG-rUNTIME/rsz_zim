import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Photo = { src: string; alt: string };

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<Photo | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {photos.map((p) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(p)}
            className="overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              width={1200}
              height={800}
              className="aspect-[3/2] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
            onClick={() => setOpen(null)}
          >
            <X size={24} />
          </button>
          <img src={open.src} alt={open.alt} className="max-h-full max-w-full rounded-lg object-contain" />
        </div>
      ) : null}
    </>
  );
}
