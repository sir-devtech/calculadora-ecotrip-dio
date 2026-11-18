/**
 * Cálculos de emissão, comparação entre meios e custo de crédito de carbono.
 */
const ecoCalculator = {
  /**
   * @param {number} distanceKm
   * @param {keyof typeof ecoConfig.emissionFactors} transport
   * @returns {number} emissão em kg CO₂
   */
  calculateEmission(distanceKm, transport) {
    const factor = ecoConfig.emissionFactors[transport];
    if (factor == null || Number.isNaN(distanceKm) || distanceKm < 0) {
      return 0;
    }
    return Number((distanceKm * factor).toFixed(2));
  },

  /**
   * Emite a lista ordenada (menor emissão primeiro) para todos os meios.
   * @param {number} distanceKm
   */
  compareTransports(distanceKm) {
    return Object.keys(ecoConfig.emissionFactors)
      .map((key) => ({
        key,
        label: ecoConfig.transportLabels[key],
        emissionKg: this.calculateEmission(distanceKm, key),
        factor: ecoConfig.emissionFactors[key],
      }))
      .sort((a, b) => a.emissionKg - b.emissionKg);
  },

  /**
   * Converte kg CO₂ em toneladas e estima o custo do crédito.
   * @param {number} emissionKg
   */
  estimateCarbonCredit(emissionKg) {
    const tons = emissionKg / ecoConfig.kgPerTon;
    const cost = tons * ecoConfig.carbonCreditPricePerTon;
    return {
      tons: Number(tons.toFixed(4)),
      costBrl: Number(cost.toFixed(2)),
    };
  },
};

window.ecoCalculator = ecoCalculator;
