/**
 * Base simulada de rotas entre cidades brasileiras.
 * findDistance isolada para poder trocar depois por uma API de mapas.
 */
const routesDB = {
  routes: [
    { origin: "São Paulo", destination: "Rio de Janeiro", distanceKm: 430 },
    { origin: "São Paulo", destination: "Campinas", distanceKm: 95 },
    { origin: "São Paulo", destination: "Curitiba", distanceKm: 408 },
    { origin: "São Paulo", destination: "Belo Horizonte", distanceKm: 586 },
    { origin: "Rio de Janeiro", destination: "Belo Horizonte", distanceKm: 434 },
    { origin: "Rio de Janeiro", destination: "Vitória", distanceKm: 521 },
    { origin: "Brasília", destination: "Goiânia", distanceKm: 209 },
    { origin: "Brasília", destination: "São Paulo", distanceKm: 1015 },
    { origin: "Curitiba", destination: "Florianópolis", distanceKm: 300 },
    { origin: "Curitiba", destination: "Porto Alegre", distanceKm: 711 },
    { origin: "Salvador", destination: "Recife", distanceKm: 839 },
    { origin: "Salvador", destination: "Fortaleza", distanceKm: 1200 },
    { origin: "Recife", destination: "Natal", distanceKm: 297 },
    { origin: "Fortaleza", destination: "Natal", distanceKm: 537 },
    { origin: "Belém", destination: "Manaus", distanceKm: 1293 },
    { origin: "Manaus", destination: "Porto Velho", distanceKm: 901 },
    { origin: "Cuiabá", destination: "Campo Grande", distanceKm: 694 },
    { origin: "Porto Alegre", destination: "Florianópolis", distanceKm: 476 },
    { origin: "Belo Horizonte", destination: "Brasília", distanceKm: 741 },
    { origin: "Goiânia", destination: "Cuiabá", distanceKm: 934 },
  ],

  normalize(city) {
    return String(city || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  },

  /** Lista única de cidades para o autocompletar. */
  getCities() {
    const set = new Set();
    this.routes.forEach((route) => {
      set.add(route.origin);
      set.add(route.destination);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
  },

  /**
   * Busca a distância em km nos dois sentidos.
   * @returns {number|null}
   */
  findDistance(origin, destination) {
    const o = this.normalize(origin);
    const d = this.normalize(destination);
    if (!o || !d) return null;

    const found = this.routes.find((route) => {
      const a = this.normalize(route.origin);
      const b = this.normalize(route.destination);
      return (a === o && b === d) || (a === d && b === o);
    });

    return found ? found.distanceKm : null;
  },
};

window.routesDB = routesDB;
