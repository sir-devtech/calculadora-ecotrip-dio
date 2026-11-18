/**
 * Fatores de emissão (kg CO₂ por km) e preço do crédito de carbono.
 * 1 tonelada = 1000 kg.
 */
const ecoConfig = {
  emissionFactors: {
    bike: 0,
    car: 0.21,
    bus: 0.105,
    truck: 0.27,
  },

  transportLabels: {
    bike: "Bicicleta",
    car: "Carro",
    bus: "Ônibus",
    truck: "Caminhão",
  },

  /** Preço médio estimado por tonelada de CO₂ (BRL). */
  carbonCreditPricePerTon: 80,

  kgPerTon: 1000,
};

window.ecoConfig = ecoConfig;
