/**
 * Camada de interface: DOM, autocomplete e exibição dos blocos.
 */
const ecoUI = {
  els: {},

  init() {
    this.els = {
      form: document.getElementById("trip-form"),
      origin: document.getElementById("origin"),
      destination: document.getElementById("destination"),
      distance: document.getElementById("distance"),
      transport: document.getElementById("transport"),
      originList: document.getElementById("origin-list"),
      destinationList: document.getElementById("destination-list"),
      distanceHint: document.getElementById("distance-hint"),
      result: document.getElementById("result"),
      comparison: document.getElementById("comparison"),
      credits: document.getElementById("credits"),
      resultDistance: document.getElementById("result-distance"),
      resultEmission: document.getElementById("result-emission"),
      resultTransport: document.getElementById("result-transport"),
      comparisonBody: document.getElementById("comparison-body"),
      creditTons: document.getElementById("credit-tons"),
      creditCost: document.getElementById("credit-cost"),
    };

    this.fillCityLists();
    this.bindAutocompleteHints();
    this.hidePanels();
  },

  fillCityLists() {
    const cities = routesDB.getCities();
    const options = cities.map((city) => `<option value="${city}"></option>`).join("");
    this.els.originList.innerHTML = options;
    this.els.destinationList.innerHTML = options;
  },

  bindAutocompleteHints() {
    const syncDistance = () => {
      const fromBase = routesDB.findDistance(
        this.els.origin.value,
        this.els.destination.value
      );

      if (fromBase != null) {
        this.els.distance.value = fromBase;
        this.els.distanceHint.textContent =
          "Distância preenchida pela base de rotas. Você ainda pode ajustar manualmente.";
        this.els.distanceHint.hidden = false;
      } else if (this.els.origin.value.trim() && this.els.destination.value.trim()) {
        this.els.distanceHint.textContent =
          "Rota fora da base — informe a distância em km.";
        this.els.distanceHint.hidden = false;
      } else {
        this.els.distanceHint.hidden = true;
      }
    };

    this.els.origin.addEventListener("change", syncDistance);
    this.els.destination.addEventListener("change", syncDistance);
    this.els.origin.addEventListener("blur", syncDistance);
    this.els.destination.addEventListener("blur", syncDistance);
  },

  hidePanels() {
    this.els.result.hidden = true;
    this.els.comparison.hidden = true;
    this.els.credits.hidden = true;
  },

  showPanels() {
    this.els.result.hidden = false;
    this.els.comparison.hidden = false;
    this.els.credits.hidden = false;
  },

  /**
   * @param {{ distanceKm: number, transport: string, emissionKg: number, comparison: Array, credit: { tons: number, costBrl: number } }} data
   */
  render(data) {
    const label = ecoConfig.transportLabels[data.transport] || data.transport;

    this.els.resultDistance.textContent = `${data.distanceKm.toLocaleString("pt-BR")} km`;
    this.els.resultEmission.textContent = `${data.emissionKg.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} kg CO₂`;
    this.els.resultTransport.textContent = label;

    this.els.comparisonBody.innerHTML = data.comparison
      .map((item, index) => {
        const isSelected = item.key === data.transport;
        return `
          <tr class="comparison__row${isSelected ? " comparison__row--selected" : ""}">
            <td>${index + 1}º</td>
            <td>${item.label}${isSelected ? " (seu meio)" : ""}</td>
            <td>${item.emissionKg.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} kg</td>
          </tr>
        `;
      })
      .join("");

    this.els.creditTons.textContent = `${data.credit.tons.toLocaleString("pt-BR", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    })} t`;
    this.els.creditCost.textContent = data.credit.costBrl.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    this.showPanels();
  },

  getFormValues() {
    return {
      origin: this.els.origin.value.trim(),
      destination: this.els.destination.value.trim(),
      distanceKm: Number(this.els.distance.value),
      transport: this.els.transport.value,
    };
  },

  alert(message) {
    window.alert(message);
  },
};

window.ecoUI = ecoUI;
