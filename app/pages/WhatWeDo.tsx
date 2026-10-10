import { Link } from "react-router";
import { Seo } from "../components/Seo";
import { THEMES } from "../content/themes";

export function WhatWeDo() {
  return (
    <div className="bg-white">
      <Seo
        title="What We Do | RSZ Zimbabwe"
        description="RSZ delivers disaster mitigation, early warning, climate-resilient livelihoods, economic strengthening, and partnerships with government, NGOs, and communities in Zimbabwe."
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 md:mb-6">What We Do</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 max-w-3xl">
            RSZ employs a participatory approach to disaster risk management, vulnerability reduction, and resilience-building
          </p>
        </div>
      </section>

      {/* Thematic Focus Areas */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 md:mb-4">Our Work</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Six connected themes that build comprehensive community resilience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {THEMES.map((theme) => (
              <div
                key={theme.id}
                id={theme.id}
                className="scroll-mt-24 bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" aria-hidden>{theme.icon}</span>
                  <div>
                    <h3 className="text-xl mb-3">{theme.title}</h3>
                    <p className="text-gray-700">{theme.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link to="/about#approach" className="text-green-600 hover:text-green-700">
              See how we work: our approach →
            </Link>
          </p>
        </div>
      </section>

      {/* Staff Expertise */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 md:mb-4">Staff Expertise and Skills</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Our team brings diverse technical expertise to deliver high-quality programs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              "Disaster Risk Reduction",
              "Climate Resilience (Mitigation & Adaptation)",
              "Food Security & Resilience Building",
              "Urban Resilience",
              "Humanitarian Response",
              "Agriculture Development",
              "Community Development",
              "Youth Programming",
              "Entrepreneurship/Business Development",
              "Nutrition and Health Programs",
              "Monitoring Evaluation Accountability and Learning",
              "Gender and Social Dynamics",
            ].map((skill, index) => (
              <div key={index} className="bg-green-50 px-4 py-3 rounded-lg text-center">
                <span className="text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values and Commitment */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl mb-6">Our Commitment</h2>
            <p className="text-lg text-gray-700 mb-4">
              Women, young people, persons with disabilities, and children are centered in all programming to advance gender equality. We work with traditional leaders, ward councillors, and established development structures to strengthen them in supporting resilience initiatives at community level.
            </p>
            <p className="text-lg text-gray-700">
              All community members play active roles in creating safe, habitable environments that enhance human dignity and build long-term resilience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
