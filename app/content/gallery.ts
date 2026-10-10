export const PFUMVUDZA_GALLERY = {
  title: "Pfumvudza Climate-Smart Agriculture Demonstration",
  caption:
    "A practical demonstration of the climate-smart agriculture concept (Pfumvudza), supported by Resilient Societies of Zimbabwe under the Community Led Climate Resilience and Health Sensitive Vulnerability Reduction Project (ACT Ubumbano Solidarity Support Facility), Ward 34 Chiwere Community, Mutare Rural. The demonstrations were led by Mr Sumburani, Agritex Officer for Ward 34, Mutare Rural.",
  photos: Array.from({ length: 16 }, (_, i) => ({
    src: `/gallery/pfumvudza-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `Pfumvudza demonstration, Ward 34 Chiwere, Mutare Rural (photo ${i + 1})`,
  })),
};
