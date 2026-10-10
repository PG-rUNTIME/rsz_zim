import { BarChart3, Database, Lock, Target, Users, MapPin } from "lucide-react";
import { Seo } from "../components/Seo";
import { FEATURED_PROJECT as P, projectStatus } from "../content/project";

export function Programs() {
  return (
    <div className="bg-white">
      <Seo
        title="Programs & Impact | RSZ Zimbabwe"
        description="Explore RSZ’s programme areas, geographic focus in Manicaland and beyond, and commitment to data-driven delivery, safeguarding, and accountability."
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 md:mb-6">Programs & Impact</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 max-w-3xl">
            Demonstrating delivery capacity and accountability through data-driven programming
          </p>
        </div>
      </section>

      {/* Featured Project */}
      <section id="featured-project" className="py-8 md:py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">
            Featured Project · {projectStatus()}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 md:mb-6">{P.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {[
              { icon: "📍", text: P.location },
              { icon: "👥", text: P.reach },
              { icon: "⏱", text: P.duration },
              { icon: "🎯", text: P.focus },
            ].map((fact) => (
              <div key={fact.text} className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <span aria-hidden>{fact.icon}</span>
                <span className="text-gray-800">{fact.text}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl md:text-2xl mb-3">The model</h3>
          <ol className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-2 mb-8 text-gray-800">
            {P.model.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="bg-green-600 text-white px-3 py-2 rounded-md text-sm md:text-base">{step}</span>
                {i < P.model.length - 1 ? <span aria-hidden className="hidden md:inline text-green-600">→</span> : null}
              </li>
            ))}
          </ol>

          <h3 className="text-xl md:text-2xl mb-3">Project Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {P.pillars.map((pillar) => (
              <div key={pillar.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg md:text-xl mb-3">{pillar.title}</h4>
                <ul className="space-y-2 text-gray-700">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Operation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-green-600" size={32} />
                <h2 className="text-3xl">Areas of Operation</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                RSZ is headquartered in Mutare (Chikanga), Manicaland Province, with primary operations in Mutare Rural, Mutare Urban, and other disaster-prone districts including:
              </p>
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Chimanimani District</strong> - Community resilience and disaster preparedness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Chipinge District</strong> - Climate adaptation and livelihood support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Mutare Rural</strong> - Community resilience and local partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Mutare Urban</strong> - Urban resilience and coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Manicaland Province</strong> - Regional coordination and partnerships</span>
                </li>
              </ul>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Scalability:</strong> Our proven models are ready for expansion to other provinces, territories, and regional initiatives across Southern Africa.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-lg">
              <h3 className="text-2xl mb-6">Target Communities</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-green-100 mb-1">Primary Beneficiaries</div>
                  <p className="text-lg">Communities in disaster-prone areas, with focus on women, persons with disabilities, young people, and children</p>
                </div>
                <div className="border-t border-green-500 pt-4">
                  <div className="text-sm text-green-100 mb-1">Geographic Focus</div>
                  <p className="text-lg">Rural and peri-urban communities vulnerable to climate shocks and disasters</p>
                </div>
                <div className="border-t border-green-500 pt-4">
                  <div className="text-sm text-green-100 mb-1">Partnerships</div>
                  <p className="text-lg">Government entities, local institutions, NGOs, CBOs, faith-based groups, and international bodies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Implementation */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 md:mb-4">Our Program Portfolio</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Implementing comprehensive programs across multiple thematic areas
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Target,
                title: "Humanitarian Response",
                description: "Cash Transfers, Cash Voucher Assistance, In-kind food assistance including supplementary feeding, Emergency Response and Recovery",
              },
              {
                icon: Users,
                title: "Community Development",
                description: "Strengthening local institutions and empowering communities to lead their own development initiatives",
              },
              {
                icon: BarChart3,
                title: "Food Security Programs",
                description: "Building resilience through sustainable agriculture and livelihood diversification",
              },
              {
                icon: Target,
                title: "Youth Empowerment",
                description: "Youth programming focused on skills development, entrepreneurship, and leadership",
              },
              {
                icon: Users,
                title: "Gender Equality",
                description: "Gender-inclusive programming advancing women's leadership and decision-making",
              },
              {
                icon: MapPin,
                title: "Climate Adaptation",
                description: "Climate-resilient livelihoods and ecosystem restoration initiatives",
              },
            ].map((program, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <program.icon className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl mb-3">{program.title}</h3>
                <p className="text-gray-700">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEL Framework */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4">Monitoring, Evaluation & Learning (MEL)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our work is data-driven with robust systems for accountability and learning
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border-2 border-green-200">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl mb-4">Data-Driven Programming</h3>
              <p className="text-gray-700">
                We use participatory MEL frameworks (e.g., community scorecards, digital dashboards) aligned with national standards to track outcomes, adapt interventions, and share evidence-based reports.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-green-200">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl mb-4">Comprehensive Data Management</h3>
              <p className="text-gray-700">
                We invest in comprehensive data management processes including proper data collection tools design, proper targeting, timing and data security.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-green-200">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl mb-4">Data Protection & Privacy</h3>
              <p className="text-gray-700">
                We subscribe to national and international policies on data privacy and security, ensuring the protection of all beneficiary information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Management */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl mb-6 text-center">Resources Management</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 mb-4">
                We value all the resources we receive from our donors, partners and community and we ensure proper accountability through policy and practice.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                98% of our financial resources come from donors and partners and as such we have strong systems in place to manage and allocate resources where they achieve the greatest impact at least cost.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl text-green-600 mb-2">98%</div>
                  <div className="text-gray-700">Donor Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-green-600 mb-2">100%</div>
                  <div className="text-gray-700">Accountability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-green-600 mb-2">High</div>
                  <div className="text-gray-700">Impact Focus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
