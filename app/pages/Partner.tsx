import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo";

const WAYS = [
  { icon: "💰", title: "Funding", text: "Fund community-led resilience programmes with transparent, evidence-based reporting.", subject: "funding" },
  { icon: "🛠", title: "Technical Support", text: "Share expertise in climate, agriculture, nutrition, MEAL or organisational development.", subject: "partnership" },
  { icon: "🔬", title: "Research", text: "Co-design research and learning with communities, universities and think tanks.", subject: "partnership" },
  { icon: "🏢", title: "Corporate Partnerships", text: "Align CSR and shared-value investments with community resilience outcomes.", subject: "partnership" },
  { icon: "🤝", title: "Implementation", text: "Deliver together: NGOs, government and community partners on the ground.", subject: "partnership" },
];

export function Partner() {
  return (
    <div className="bg-white">
      <Seo
        title="Partner With RSZ | RSZ Zimbabwe"
        description="Partner with Resilient Societies of Zimbabwe: funding, technical support, research, corporate partnerships and implementation."
      />
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 md:mb-6">Partner With RSZ</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 max-w-3xl">
            Pick how you would like to work with us. It takes one short message to start.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {WAYS.map((w) => (
              <div key={w.title} id={w.title === "Funding" ? "donate" : undefined} className="scroll-mt-24 flex flex-col rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2" aria-hidden>{w.icon}</div>
                <h2 className="text-xl mb-2">{w.title === "Funding" ? "Donate / Funding" : w.title}</h2>
                <p className="text-gray-700 mb-4 flex-1">{w.text}</p>
                <Link
                  to={`/contact?subject=${w.subject}#contact-form`}
                  className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800"
                >
                  Start a conversation <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl mb-3">Our partners &amp; collaborators</h2>
          <p className="text-gray-600 mb-6">
            We work with Civil Protection Unit and local authorities, UN agencies and international NGOs,
            community-based and faith-based organisations, academic institutions, environmental and
            agricultural bodies, and child-protection and youth organisations.
          </p>
          <Link to="/contact" className="text-green-700 underline">Or send us a general enquiry</Link>
        </div>
      </section>
    </div>
  );
}
