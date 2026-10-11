export const FEATURED_PROJECT = {
  title:
    "Community Led Climate Resilience and Health Sensitive Vulnerability Reduction Project (ACT Ubumbano Solidarity Support Facility)",
  shortTitle: "Community Led Climate Resilience and Health Sensitive Vulnerability Reduction",
  location: "Mutare Rural, Manicaland",
  reach: "50 smallholder households",
  duration: "6 months (June–November 2026)",
  focus: "Climate resilience + health-sensitive vulnerability reduction",
  /** Last day of the project; the status label is derived from it. */
  endsOn: "2026-11-30",
  model: ["Lead Farmer Trainer of Trainers", "Fellow Farmers", "Household Adoption", "Community Climate Resilience"],
  pillars: [
    {
      title: "🌱 Climate Resilience",
      items: ["Climate-smart agriculture", "Anticipatory action", "Early warning", "Preparedness", "Demonstration plot"],
    },
    {
      title: "🥗 Nutrition & Health",
      items: [
        "Nutrition-sensitive agriculture",
        "Small grains and legumes",
        "Small livestock",
        "Keyhole gardens",
        "WASH and health-seeking behaviour",
      ],
    },
  ],
};

export function projectStatus(now = new Date()): "Ongoing" | "Recently completed" {
  return now <= new Date(`${FEATURED_PROJECT.endsOn}T23:59:59`) ? "Ongoing" : "Recently completed";
}
