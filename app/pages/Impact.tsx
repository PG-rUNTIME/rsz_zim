import { Link } from "react-router";
import { Seo } from "../components/Seo";
import { FACEBOOK_PAGE_URL, LINKEDIN_URL } from "../seo/site";

const SECTIONS = [
  { id: "stories", title: "Stories", blurb: "Voices and experiences from the communities we work with." },
  { id: "publications", title: "Publications", blurb: "Research briefs, policy papers and learning products." },
  { id: "reports", title: "Reports", blurb: "Programme and annual reports, with data on results." },
  { id: "news", title: "News", blurb: "Updates from RSZ and our partners." },
];

export function Impact() {
  return (
    <div className="bg-white">
      <Seo
        title="Impact & Learning | RSZ Zimbabwe"
        description="Stories, publications, reports and news from Resilient Societies of Zimbabwe: evidence of impact and what we are learning."
      />
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 md:mb-6">Impact &amp; Learning</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 max-w-3xl">
            Stories • Data • Reports • Research • Resources
          </p>
          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full bg-white/15 px-4 py-2 text-sm hover:bg-white/25">
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24 rounded-lg border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl mb-2">{s.title}</h2>
              <p className="text-gray-600 mb-4">{s.blurb}</p>
              <p className="rounded-md bg-green-50 p-4 text-gray-700">
                New {s.title.toLowerCase()} are coming soon. In the meantime, follow us on{" "}
                <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">Facebook</a>{" "}
                or{" "}
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">LinkedIn</a>
                , or <Link to="/contact" className="text-green-700 underline">contact us</Link> to request materials.
              </p>
            </div>
          ))}
          <p className="text-center text-gray-600">
            See our <Link to="/programs" className="text-green-700 underline">featured project</Link> and{" "}
            <Link to="/programs" className="text-green-700 underline">programme portfolio</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
