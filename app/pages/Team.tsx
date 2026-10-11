import { Seo } from "../components/Seo";
import { TeamMemberCard } from "../components/PersonCard";
import { BIOS } from "../content/bios";

const PROGRAMS_TEAM = [
  { name: "Wonder Chinhuru", role: "Executive Director", imageFile: "Wonder Chinhuru.jpeg", bio: BIOS.wonder },
  { name: "Godfrey Madyauta", role: "Programs Director", imageFile: "Godfrey Madyauta.jpeg", bio: BIOS.godfrey },
  { name: "Tinashe Mhlanga", role: "Finance and Administration Manager", imageFile: "Tinashe Mhlanga.jpeg", bio: BIOS.tinashe },
];

export function Team() {
  return (
    <div className="bg-white">
      <Seo
        title="Our Team | RSZ Zimbabwe"
        description="Meet the RSZ Programs Team: Executive Director, Programs Director, and Finance and Administration Manager, supported by resource mobilisation and communications volunteers."
      />

      <section className="bg-gradient-to-br from-green-700 to-green-900 py-12 text-white md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">Our Team</h1>
          <p className="max-w-3xl text-base text-green-100 sm:text-lg md:text-xl lg:text-2xl">
            Resilient Societies of Zimbabwe (RSZ): the people behind our programmes
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">Programs Team</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROGRAMS_TEAM.map((m) => (
              <TeamMemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">Volunteers</h2>
          <div className="mx-auto mb-8 max-w-sm">
            <TeamMemberCard
              name="Virginia Masocha"
              role="Resource Mobilisation Associate"
              imageFile="Virginia Masocha.jpg"
              bio={BIOS.virginia}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-green-600 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 md:text-xl">4 Resource Mobilisation Associates</h3>
              <p className="mt-2 text-gray-700">
                Supporting opportunity identification, donor research, partnership development and resource
                mobilisation.
              </p>
            </div>
            <div className="rounded-xl border-2 border-green-600 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 md:text-xl">
                1 Communications and Learning Assistant
              </h3>
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
