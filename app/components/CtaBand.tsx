import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

/** Closing call to action shown at the bottom of every page (rendered by Layout). */
export function CtaBand() {
  return (
    <section className="bg-green-700 py-10 text-white md:py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">Ready to build resilience with us?</h2>
          <p className="mt-1 text-green-100">Funding, technical support, research, corporate partnerships or implementation.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/partner"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
          >
            Partner With Us <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
