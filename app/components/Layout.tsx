import { Link, Outlet, useLocation } from "react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { InquiryChat } from "./InquiryChat";
import { CtaBand } from "./CtaBand";
import { OrganizationJsonLd } from "./OrganizationJsonLd";
import { THEMES } from "../content/themes";
import { FACEBOOK_PAGE_URL, LINKEDIN_URL, SITE_INQUIRY_EMAIL, X_TWITTER_URL } from "../seo/site";

type NavChild = { path: string; label: string };
type NavItem = { path: string; label: string; children?: NavChild[]; also?: string[] };

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home" },
  {
    path: "/about",
    label: "About Us",
    also: ["/team", "/board"],
    children: [
      { path: "/about", label: "Who We Are" },
      { path: "/about#approach", label: "Our Approach" },
      { path: "/board", label: "Governance" },
      { path: "/team", label: "Our Team" },
    ],
  },
  {
    path: "/what-we-do",
    label: "Our Work",
    children: THEMES.map((t) => ({ path: `/what-we-do#${t.id}`, label: t.title })),
  },
  { path: "/programs", label: "Projects" },
  {
    path: "/impact",
    label: "Impact & Learning",
    children: [
      { path: "/impact#stories", label: "Stories" },
      { path: "/impact#publications", label: "Publications" },
      { path: "/impact#reports", label: "Reports" },
      { path: "/impact#news", label: "News" },
    ],
  },
  { path: "/contact", label: "Contact" },
  { path: "/partner#donate", label: "Donate" },
];

const partnerButtonClass =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-md ring-2 ring-green-300 transition-colors hover:bg-green-700";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const isActive = (item: NavItem) => {
    const paths = [item.path, ...(item.also ?? [])];
    return paths.some((p) => (p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)));
  };

  // Close menus on navigation; scroll to the #hash target, or to the top.
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    const el = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  // Lock page scroll behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = (active: boolean) =>
    `px-3 py-2 rounded-md transition-colors ${
      active ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-50 hover:text-green-600"
    }`;

  return (
    <>
      <OrganizationJsonLd />
      <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-2 py-3 md:py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 min-w-0">
              <img
                src="/logo.png"
                alt=""
                className="h-12 w-auto shrink-0 object-contain object-left md:h-14"
                decoding="async"
                fetchPriority="high"
                width={270}
                height={240}
              />
              <div className="min-w-0">
                <div className="font-bold text-sm sm:text-base md:text-xl text-gray-900 truncate">Resilient Societies of Zimbabwe</div>
                <div className="text-xs text-green-600 hidden sm:block">Building Community Resilience</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="flex items-center">
                      <Link to={item.path} className={`${linkClass(isActive(item))} pr-1 rounded-r-none`}>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`${item.label} menu`}
                        aria-expanded={openDropdown === item.label}
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className={`${linkClass(isActive(item))} px-1.5 rounded-l-none`}
                      >
                        <ChevronDown size={14} aria-hidden />
                      </button>
                    </div>
                    {openDropdown === item.label && (
                      <div className="absolute left-0 top-full min-w-60 pt-1">
                        <ul className="rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                to={child.path}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.label} to={item.path} className={linkClass(isActive(item))}>
                    {item.label}
                  </Link>
                ),
              )}
              <Link to="/partner" className={`${partnerButtonClass} ml-2`}>
                PARTNER WITH US
              </Link>
            </nav>

            {/* Mobile / tablet: Partner button always visible next to the menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/partner" className={`${partnerButtonClass} px-3 py-2 text-xs sm:text-sm`}>
                PARTNER<span className="hidden sm:inline">&nbsp;WITH US</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation: full-height panel under the header */}
        {mobileMenuOpen && (
          <nav
            aria-label="Main"
            className="lg:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto bg-white px-4 pb-8 pt-2 border-t border-gray-200 shadow-lg"
          >
            {NAV_ITEMS.map((item) => {
              const expanded = expandedMobile === item.label;
              const rowClass = `flex-1 px-4 py-3.5 rounded-md text-lg ${
                isActive(item) ? "bg-green-600 text-white" : "text-gray-800 hover:bg-green-50"
              }`;
              return (
                <div key={item.label} className="border-b border-gray-100">
                  <div className="flex items-center">
                    <Link to={item.path} className={rowClass}>
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                        onClick={() => setExpandedMobile(expanded ? null : item.label)}
                        className="p-4 text-gray-600"
                      >
                        <ChevronDown size={20} className={expanded ? "rotate-180 transition-transform" : "transition-transform"} />
                      </button>
                    )}
                  </div>
                  {item.children && expanded && (
                    <ul className="pb-2 pl-4">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link to={child.path} className="block px-4 py-3 text-gray-600 hover:text-green-700">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <Link to="/partner" className={`${partnerButtonClass} mt-6 w-full py-4 text-base`}>
              PARTNER WITH US
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <CtaBand />

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Resilient Societies of Zimbabwe</h3>
              <p className="text-gray-400 text-sm">
                Building community resilience through sustainable disaster mitigation, preparedness, and response solutions.
              </p>
              <p className="text-gray-400 text-sm mt-3 md:mt-4">PVO 19/20 © 2020</p>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Contact Us</h3>
              <p className="text-gray-400 text-sm">Stand Number 2822, Mutare (Chikanga)</p>
              <p className="text-gray-400 text-sm">Manicaland Province, Zimbabwe</p>
              <p className="text-gray-400 text-sm mt-2">
                Email:{" "}
                <a href={`mailto:${SITE_INQUIRY_EMAIL}`} className="hover:text-white underline-offset-2">
                  {SITE_INQUIRY_EMAIL}
                </a>
              </p>
              <p className="text-gray-400 text-sm">Phone: +263 778 934 153 / +263 772 978 904</p>
              <p className="text-gray-400 text-sm mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={X_TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Resilient Societies of Zimbabwe. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <InquiryChat />
    </div>
    </>
  );
}
