/**
 * Ponto de entrada: liga eventos e inicializa a calculadora.
 */
(function bootEcoTrip() {
  function onSubmit(event) {
    event.preventDefault();

    const values = ecoUI.getFormValues();

    if (!values.origin || !values.destination) {
      ecoUI.alert("Preencha origem e destino.");
      return;
    }

    if (!values.distanceKm || values.distanceKm <= 0 || Number.isNaN(values.distanceKm)) {
      ecoUI.alert("Informe uma distância válida em quilômetros.");
      return;
    }

    if (!values.transport) {
      ecoUI.alert("Escolha um meio de transporte.");
      return;
    }

    const emissionKg = ecoCalculator.calculateEmission(
      values.distanceKm,
      values.transport
    );
    const comparison = ecoCalculator.compareTransports(values.distanceKm);
    const credit = ecoCalculator.estimateCarbonCredit(emissionKg);

    ecoUI.render({
      distanceKm: values.distanceKm,
      transport: values.transport,
      emissionKg,
      comparison,
      credit,
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ecoUI.init();
    ecoUI.els.form.addEventListener("submit", onSubmit);
  });
})();
