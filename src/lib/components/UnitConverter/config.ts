const lang = "en"; //document.querySelector("html")!.lang;

const localize = (key) => ({
  worldUnits: {
    en: "World units",
    es: "Unidades mundiales"
  },
  inches: {
    en: "Inches",
    es: "Pulgada"
  },
  feet: {
    en: "Feet",
    es: "Pie"
  },
  meters: {
    en: "Meters",
    es: "Metros"
  },
  warthogLength: {
    en: "Warthog length",
    es: "Longitud del Warthog",
  },
  playerHeightStanding: {
    en: "Player collision height (standing)",
    es: "Altura de colisión del jugador (de pie)",
  },
  playerHeightCrouching: {
    en: "Player collision height (crouching)",
    es: "Altura de colisión del jugador (agachado)",
  },
  bgFlagsDist: {
    en: "Distance between Blood Gulch flags",
    es: "Distancia entre banderas de Blood Gulch",
  },
  footballField: {
    en: "American football field length",
    es: "Longitud del campo de fútbol americano",
  },
  searchPlaceholder: {
    en: "Search all of c20... [S]",
    es: "Buscar todo en c20... [S]"
  },
  searchResults: {
    en: "Search results",
    es: "Resultados de la búsqueda"
  },
  close: {
    en: "Close",
    es: "Cerrar"
  },
  searchNoResults: {
    en: "No results found for",
    es: "No se encontraron resultados para",
  },
  limitToChildPaths: {
    en: "Child pages only",
    es: "Solo páginas secundarias"
  }
}[key][lang]);

//everything relative to JMS units:
export const conversions = {
  jms: {
    label: "JMS",
    rel: 1
  },
  world: {
    label: localize("worldUnits"),
    rel: 100
  },
  inches: {
    label: localize("inches"),
    rel: 1 / 1.2
  },
  feet: {
    label: localize("feet"),
    rel: 10
  },
  meters: {
    label: localize("meters"),
    rel: 1 / 0.03048
  },
};

export const presets = [
  {
    label: localize("warthogLength"),
    basisValue: "191.766",
    basisType: "jms"
  },
  {
    label: localize("playerHeightStanding"),
    basisValue: "70",
    basisType: "jms"
  },
  {
    label: localize("playerHeightCrouching"),
    basisValue: "50",
    basisType: "jms"
  },
  {
    label: localize("bgFlagsDist"),
    basisValue: "97.60443705836329",
    basisType: "world"
  },
  {
    label: localize("footballField"),
    basisValue: "109.73",
    basisType: "meters"
  },
];