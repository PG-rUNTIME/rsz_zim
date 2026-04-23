import { User } from "lucide-react";
import { Seo } from "../components/Seo";
import { cn } from "../components/ui/utils";

function photoPath(filename: string): string {
  return `/${encodeURIComponent(filename)}`;
}

const cardFrameClass =
  "border-green-600 bg-gradient-to-b from-green-50 to-white shadow-md shadow-green-900/10";

function TeamMemberCard({
  name,
  role,
  imageFile,
  vacant,
  imageClassName,
}: {
  name: string;
  role: string;
  imageFile: string | null;
  vacant?: boolean;
  /** Extra classes on the photo (e.g. nudge position to hide a source edge without cropping the face). */
  imageClassName?: string;
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
      {vacant ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-green-800">
          Position vacant
        </p>
      ) : null}
    </article>
  );
}

/** Vertical connector between tiers */
function ConnectorDown({ tall = false }: { tall?: boolean }) {
  return (
    <div className="flex justify-center py-0" aria-hidden>
      <div className={`w-0.5 bg-green-600/40 ${tall ? "h-10 md:h-12" : "h-6 md:h-8"}`} />
    </div>
  );
}

/** Horizontal bar with three downward stubs (desktop) */
function BranchThreeDown() {
  return (
    <div className="relative mx-auto hidden h-8 w-full max-w-4xl md:block" aria-hidden>
      <div className="absolute left-[16.666%] right-[16.666%] top-0 h-0.5 bg-green-600/40" />
      <div className="absolute left-[16.666%] top-0 h-8 w-0.5 -translate-x-1/2 bg-green-600/40" />
      <div className="absolute left-1/2 top-0 h-8 w-0.5 -translate-x-1/2 bg-green-600/40" />
      <div className="absolute left-[83.333%] top-0 h-8 w-0.5 -translate-x-1/2 bg-green-600/40" />
    </div>
  );
}

export function Team() {
  return (
    <div className="bg-white">
      <Seo
        title="Our Team | RSZ Zimbabwe"
        description="RSZ organogram: Executive Director, senior advisors and directors, and programme operations—including resource mobilisation, finance, and partnerships."
      />

      <section className="bg-gradient-to-br from-green-700 to-green-900 py-12 text-white md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">Our Team</h1>
          <p className="max-w-3xl text-base text-green-100 sm:text-lg md:text-xl lg:text-2xl">
            Resilient Societies of Zimbabwe (RSZ): leadership structure and key roles
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:mb-12">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Organogram</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-600">
              How our team is structured: the Executive Director, senior leadership, and
              programme &amp; operations roles reporting to the Programs Director / MEAL.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {/* Level 1 — Executive Director */}
            <div className="w-full max-w-sm">
              <TeamMemberCard
                name="Wonder Chinhuru"
                role="Executive Director"
                imageFile="Wonder Chinhuru.jpeg"
              />
            </div>

            <ConnectorDown tall />

            <BranchThreeDown />
            <div className="h-2 md:hidden" aria-hidden />

            {/* Level 2 — reports to ED */}
            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
              <TeamMemberCard
                name="Dr. Nelson Chanza"
                role="Program Technical Advisor"
                imageFile="Dr Nelson Chanza.jpeg"
              />
              <TeamMemberCard
                name="Godfrey Madyauta"
                role="Programs Director / MEAL"
                imageFile="Godfrey Madyauta.jpeg"
              />
              <TeamMemberCard
                name="Evelyn Ngorima"
                role="Policy & Legal Advisor"
                imageFile="Evelyn Ngorima.jpeg"
              />
            </div>

            <p className="mb-2 mt-10 max-w-xl text-center text-sm font-medium text-gray-600 md:mt-12">
              Programme &amp; operations
              <span className="block text-xs font-normal text-gray-500">
                (reporting to the Programs Director / MEAL)
              </span>
            </p>

            {/* Connector: only middle column on desktop */}
            <div className="mx-auto hidden w-full max-w-5xl grid-cols-3 md:grid">
              <div />
              <ConnectorDown />
              <div />
            </div>
            <div className="flex justify-center md:hidden" aria-hidden>
              <div className="h-6 w-0.5 bg-green-600/40" />
            </div>

            <BranchThreeDown />
            <div className="h-2 md:hidden" aria-hidden />

            {/* Level 3 — reports to Programs Director / MEAL */}
            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
              <TeamMemberCard
                name="Emmanuel Mazangwa"
                role="Resource Mobilisation & Operations Manager"
                imageFile="Emmanuel Mazangwa.jpeg"
                imageClassName="-translate-y-1"
              />
              <TeamMemberCard
                name="Tinashe Mhlanga"
                role="Finance & Admin Manager"
                imageFile="Tinashe Mhlanga.jpeg"
              />
              <TeamMemberCard
                name="Gamuchirai Murenje"
                role="Partnerships & Communication Manager"
                imageFile="Gamuchirai Murenje.jpeg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Our commitment</h2>
            <p className="mt-3 text-lg text-gray-700">
              RSZ combines local expertise with national standards: community-centred delivery,
              accountability, and inclusive leadership across all levels of the organisation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
