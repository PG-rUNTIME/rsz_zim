import { User } from "lucide-react";
import { cn } from "./ui/utils";

export function photoPath(filename: string): string {
  return `/${encodeURIComponent(filename)}`;
}

const cardFrameClass =
  "border-green-600 bg-gradient-to-b from-green-50 to-white shadow-md shadow-green-900/10";

export function TeamMemberCard({
  name,
  role,
  imageFile,
  vacant,
  imageClassName,
  bio,
}: {
  name: string;
  role: string;
  imageFile: string | null;
  vacant?: boolean;
  /** Extra classes on the photo (e.g. nudge position to hide a source edge without cropping the face). */
  imageClassName?: string;
  bio?: string;
}) {
  const showPhoto = imageFile && !vacant;

  return (
    <article
      className={`flex flex-col items-center rounded-xl border-2 p-4 pt-5 text-center ${cardFrameClass}`}
    >
      <div
        className="relative mb-4 h-36 w-36 shrink-0 overflow-hidden rounded-full bg-gray-200 shadow-inner ring-4 ring-green-100 ring-offset-2 ring-offset-white md:h-40 md:w-40"
      >
        {showPhoto ? (
          <img
            src={photoPath(imageFile)}
            alt={`Portrait of ${name}`}
            className={cn(
              "h-full w-full object-cover object-top",
              imageClassName,
            )}
            loading="lazy"
            decoding="async"
          />
        ) : vacant ? (
          <div className="flex h-full w-full items-center justify-center bg-green-50 text-2xl font-semibold text-green-400">
            —
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-green-50 text-green-600">
            <User className="h-14 w-14" strokeWidth={1.25} aria-hidden />
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold leading-snug text-gray-900 md:text-xl">{name}</h3>
      <p className="mt-1 text-sm leading-snug text-gray-700 md:text-base">{role}</p>
      {bio ? <p className="mt-3 text-left text-sm leading-relaxed text-gray-600">{bio}</p> : null}
      {vacant ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-green-800">
          Position vacant
        </p>
      ) : null}
    </article>
  );
}
