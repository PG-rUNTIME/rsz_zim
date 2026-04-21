import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { Seo } from "../components/Seo";
import { submitToWeb3Forms } from "../lib/web3formsSubmit";
import {
  FACEBOOK_PAGE_URL,
  LINKEDIN_URL,
  SITE_INQUIRY_EMAIL,
  X_TWITTER_URL,
} from "../seo/site";

const SUBJECT_LABELS: Record<string, string> = {
  partnership: "Partnership Inquiry",
  funding: "Funding Opportunity",
  consultancy: "Consultancy Request",
  volunteer: "Volunteer Opportunity",
  general: "General Inquiry",
};

function buildContactMessage(
  name: string,
  email: string,
  organization: string,
  subjectKey: string,
  message: string,
): string {
  const subjectLine = SUBJECT_LABELS[subjectKey] ?? subjectKey;
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || "—"}`,
    `Subject: ${subjectLine}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();
  const isDev = import.meta.env.DEV;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        isDev
          ? `Add VITE_WEB3FORMS_ACCESS_KEY to .env (see web3forms.com), or email ${SITE_INQUIRY_EMAIL}.`
          : `Add VITE_WEB3FORMS_ACCESS_KEY under Render → Environment, then click “Save, rebuild, and deploy” (not “Save and deploy”—that reuses an old build without your key). Or email ${SITE_INQUIRY_EMAIL}.`,
      );
      return;
    }

    setStatus("sending");
    const messageBody = buildContactMessage(
      formData.name,
      formData.email,
      formData.organization,
      formData.subject,
      formData.message,
    );
    const subjectLabel = SUBJECT_LABELS[formData.subject] ?? "Contact form";

    const result = await submitToWeb3Forms({
      accessKey,
      subject: `RSZ Contact: ${subjectLabel} — ${formData.name}`,
      fromName: formData.name,
      visitorEmail: formData.email,
      message: messageBody,
    });

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.message);
      return;
    }

    setStatus("sent");
    setFormData({ name: "", email: "", organization: "", subject: "", message: "" });
  };

  const partners = [
    "Government of Zimbabwe - Civil Protection Units",
    "Local Government Authorities",
    "UN Agencies and International NGOs",
    "Community-Based Organizations",
    "Faith-Based Groups",
    "Academic Institutions",
    "Environmental Organizations",
    "Agricultural Extension Services",
    "Child Protection Organizations",
    "Youth Empowerment Bodies",
  ];

  return (
    <div className="bg-white">
      <Seo
        title="Contact & Partners | RSZ Zimbabwe"
        description="Contact Resilient Societies of Zimbabwe in Mutare (Chikanga), Manicaland—email, phone, and partnership enquiries. Work with government, UN, and community partners."
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 md:mb-6">Contact & Partners</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 max-w-3xl">
            Get in touch to explore partnership opportunities and collaboration
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl mb-3">Physical Address</h3>
              <p className="text-gray-700">
                Stand Number 2288<br />
                Mutare (Chikanga)<br />
                Manicaland Province<br />
                Zimbabwe
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl mb-3">Telephone</h3>
              <p className="text-gray-700 mb-2">
                <strong>Executive Director:</strong><br />
                +263 772 978 904
              </p>
              <p className="text-gray-700">
                <strong>Programs Director:</strong><br />
                +263 778 934 153
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl mb-3">Email Addresses</h3>
              <p className="text-gray-700 mb-2">
                <strong>General Inquiries:</strong><br />
                <a
                  href={`mailto:${SITE_INQUIRY_EMAIL}`}
                  className="text-green-600 hover:text-green-700"
                >
                  {SITE_INQUIRY_EMAIL}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong><br />
                <a href="https://www.rszimbabwe.org" className="text-green-600 hover:text-green-700">
                  www.rszimbabwe.org
                </a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl md:text-3xl mb-4 md:mb-6">Send Us a Message</h2>
              {status === "sent" ? (
                <div
                  className="rounded-lg border border-green-200 bg-green-50 px-4 py-6 text-green-900"
                  role="status"
                >
                  <p className="font-medium">Thank you for your message.</p>
                  <p className="mt-2 text-sm text-green-800">We will get back to you soon.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="mt-6 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="organization" className="block text-sm mb-2 text-gray-700">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Your Organization"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm mb-2 text-gray-700">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Select a subject</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="funding">Funding Opportunity</option>
                      <option value="consultancy">Consultancy Request</option>
                      <option value="volunteer">Volunteer Opportunity</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                {status === "error" ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  <Send size={20} />
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">Connect With Us</h2>
            <p className="text-base md:text-xl text-gray-600">Follow our work on social media</p>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resilient Societies of Zimbabwe on Facebook"
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-green-50 transition-colors shadow-md"
            >
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={X_TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (opens x.com)"
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-green-50 transition-colors shadow-md"
            >
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resilient Societies of Zimbabwe on LinkedIn"
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-green-50 transition-colors shadow-md"
            >
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 md:mb-4">Our Partners & Collaborators</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We work with diverse partners to deliver multi-sectoral impact
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <div key={index} className="bg-green-50 px-4 py-3 rounded-lg text-center">
                <span className="text-gray-800">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
