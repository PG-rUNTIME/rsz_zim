export type Theme = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

/** The six "Our Work" themes; ids are anchors on /what-we-do and are linked from nav and homepage. */
export const THEMES: Theme[] = [
  {
    id: "climate-resilience",
    icon: "🌱",
    title: "Climate Resilience",
    description:
      "Helping communities map hazards, co-design preparedness plans and early-warning systems, and restore the ecosystems they depend on, so climate shocks cause less harm.",
  },
  {
    id: "livelihoods",
    icon: "💼",
    title: "Sustainable Livelihoods",
    description:
      "Promoting economic strengthening through social enterprises, micro-funds and local revenue streams that reduce poverty and can sustain themselves.",
  },
  {
    id: "food-nutrition",
    icon: "🥗",
    title: "Food & Nutrition Security",
    description:
      "Building resilience through sustainable, nutrition-sensitive agriculture and livelihood diversification, so households can feed themselves through shocks.",
  },
  {
    id: "youth",
    icon: "👥",
    title: "Youth Empowerment",
    description:
      "Youth programming focused on skills development, entrepreneurship and leadership, creating real opportunities for young people.",
  },
  {
    id: "social-inclusion",
    icon: "👩",
    title: "Women & Social Inclusion",
    description:
      "Centering women, persons with disabilities, young people and children in all programming, with equitable decision-making, leadership and access to resources.",
  },
  {
    id: "research-learning",
    icon: "🔬",
    title: "Research & Learning",
    description:
      "Evidence-based delivery through monitoring, evaluation and learning, blending Indigenous Knowledge Systems with scientific approaches.",
  },
];
