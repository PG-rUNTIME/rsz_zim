import { Seo } from "../components/Seo";
import { TeamMemberCard } from "../components/PersonCard";
import { BIOS } from "../content/bios";

const BOARD = [
  { name: "Dr. Nelson Chanza", role: "Board Member · Technical Advisor", imageFile: "Dr Nelson Chanza.jpeg", bio: BIOS.nelson },
  { name: "Enety Chokera", role: "Board Member · Emergency Response Programs", imageFile: null, bio: BIOS.enety },
  { name: "Gamuchirai Murenje", role: "Board Member", imageFile: "Gamuchirai Murenje.jpeg", bio: BIOS.gamuchirai },
  { name: "Tinashe Mhlanga", role: "Board Treasurer", imageFile: "Tinashe Mhlanga.jpeg", bio: BIOS.tinashe },
  { name: "Evelyn Ngorima", role: "Board Secretary", imageFile: "Evelyn Ngorima.jpeg", bio: BIOS.evelyn },
];

export function Board() {
  return (
    <div className="bg-white">
      <Seo
        title="Our Board | RSZ Zimbabwe"
        description="Meet the Board of Resilient Societies of Zimbabwe: experts in climate resilience, emergency response, finance, community development and legal advisory."
      />
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-12 text-white md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">Our Board</h1>
          <p className="max-w-3xl text-base text-green-100 sm:text-lg md:text-xl lg:text-2xl">
            Governance and oversight of Resilient Societies of Zimbabwe (RSZ)
          </p>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BOARD.map((m) => (
              <TeamMemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
