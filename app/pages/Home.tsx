import { Link } from "react-router";
import { ArrowRight, Shield, Users } from "lucide-react";
import { Seo } from "../components/Seo";
import { THEMES } from "../content/themes";
import { FEATURED_PROJECT as P, projectStatus } from "../content/project";

const challenges = [
  "Climate shocks",
  "Livelihood insecurity",
  "Food insecurity",
  "Limited opportunities for youth",
  "Social vulnerability",
];
const programmeModel = ["Community engagement", "Co-design", "Implement", "Measure", "Learn", "Scale"];
const approach = ["Locally Led", "Participatory", "Inclusive", "Evidence-Based", "Partnership-Driven"];
const partners = ["Academia", "Government", "NGOs", "Private Sector", "Communities"];

function Pills({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-900 md:text-base">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`py-8 md:py-14 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-5 text-2xl font-bold text-gray-900 md:mb-8 md:text-3xl lg:text-4xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function Home() {
  return (
    <div className="bg-white">
      <Seo
        title="Resilient Societies of Zimbabwe (RSZ)"
        description="RSZ works with vulnerable communities in Zimbabwe to strengthen climate resilience, sustainable livelihoods, food and nutrition security, and opportunities for women and youth. Based in Mutare, Manicaland."
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-3xl leading-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
              Building Climate-Resilient, Inclusive and Self-Reliant Communities
            </h1>
            <p className="mb-6 text-base text-green-100 sm:text-lg md:mb-8 md:text-xl lg:text-2xl">
              We work with vulnerable communities in Zimbabwe to strengthen climate resilience, sustainable
              livelihoods, food and nutrition security, and opportunities for women and youth.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
              <Link
                to="/partner"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-center font-semibold text-white shadow-lg ring-2 ring-white hover:bg-green-400 md:px-8 md:py-4"
              >
                Partner With Us <ArrowRight size={20} />
              </Link>
              <Link
                to="/what-we-do"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-center text-white hover:bg-white/10 md:px-8 md:py-4"
              >
                Explore Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-green-50 py-6 md:py-8">
        <p className="mx-auto max-w-4xl px-4 text-center text-base italic text-green-900 md:text-lg">
          “We are locally rooted, professionally organised, technically capable, partnership-oriented and ready
          to deliver practical resilience solutions with the right partners.”
        </p>
      </section>

      <Section title="The Challenge">
        <Pills items={challenges} />
      </Section>

      <Section title="Our Response" className="bg-gray-50">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {THEMES.map((t) => (
            <li key={t.id}>
              <Link
                to={`/what-we-do#${t.id}`}
                className="block h-full rounded-lg border border-gray-200 bg-white p-4 hover:border-green-600 hover:shadow-md md:p-6"
              >
                <div className="mb-2 text-3xl" aria-hidden>{t.icon}</div>
                <div className="font-medium text-gray-900">{t.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="py-8 md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 md:gap-6 lg:px-8">
          {[
            { src: "/gallery/pfumvudza-08.jpg", alt: "Community members gathered at a Pfumvudza demonstration, Ward 34 Chiwere, Mutare Rural" },
            { src: "/gallery/pfumvudza-03.jpg", alt: "Farmers learning Pfumvudza planting techniques together, Mutare Rural" },
          ].map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              className="aspect-[3/2] w-full rounded-xl object-cover shadow-md"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </section>

      <Section title="Our Programme Model">
        <ol className="flex flex-col items-stretch gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center">
          {programmeModel.map((step, i) => (
            <li key={step} className="flex items-center justify-center gap-2">
              <span className="w-full rounded-md bg-green-600 px-5 py-2.5 text-white md:w-auto">
                {i + 1}. {step}
              </span>
              {i < programmeModel.length - 1 ? (
                <span aria-hidden className="hidden text-green-600 md:inline">→</span>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Our Approach" className="bg-gray-50">
        <Pills items={approach} />
        <Link to="/about#approach" className="mt-6 inline-flex items-center gap-2 text-green-700 hover:text-green-800">
          How we work <ArrowRight size={18} />
        </Link>
      </Section>

      {/* Featured project teaser */}
      <Section title="Featured Project">
        <div className="mx-auto max-w-3xl rounded-xl border-2 border-green-600 p-6 text-left md:p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">{projectStatus()}</p>
          <h3 className="mb-3 text-xl md:text-2xl">{P.shortTitle}</h3>
          <p className="mb-4 text-gray-700">
            📍 {P.location} · 👥 {P.reach} · ⏱ {P.duration}
          </p>
          <Link to="/programs" className="inline-flex items-center gap-2 font-semibold text-green-700 hover:text-green-800">
            See the project <ArrowRight size={18} />
          </Link>
        </div>
      </Section>

      <Section title="Impact & Learning" className="bg-gray-50">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
          {[
            { label: "Stories", to: "/impact#stories" },
            { label: "Reports", to: "/impact#reports" },
            { label: "Publications", to: "/impact#publications" },
            { label: "News", to: "/impact#news" },
          ].map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="block rounded-full bg-white px-5 py-2 text-green-800 shadow-sm hover:bg-green-100">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Our Partners">
        <Pills items={partners} />
      </Section>

      {/* Vision & mission, kept from the previous homepage */}
      <section className="bg-gray-50 py-8 md:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-8 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
            <Shield className="mb-3 text-green-600" size={28} />
            <h2 className="mb-3 text-xl md:text-2xl">Our Vision</h2>
            <p className="text-sm text-gray-700 md:text-base">
              To lead in capacitating communities to respond effectively to livelihood shocks and stressors through sustainable, community-driven disaster mitigation, preparedness, response, and resilience-building.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
            <Users className="mb-3 text-green-600" size={28} />
            <h2 className="mb-3 text-xl md:text-2xl">Our Mission</h2>
            <p className="text-sm text-gray-700 md:text-base">
              To reduce community vulnerability and exposure to disasters by strengthening capacities for absorptive, adaptive, and transformative resilience through collaboration with governments, local institutions, and communities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
