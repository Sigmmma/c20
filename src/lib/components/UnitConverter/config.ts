export const localizations = {
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
  jms: {
    en: "JMS",
    es: "JMS",
  },
  meters: {
    en: "Meters",
    es: "Metros"
  },
  warthogLength: {
    en: "Warthog length (H1)",
    es: "Longitud del Warthog",
  },
  playerHeightStandingH1: {
    en: "Player standing height (H1)",
    es: "Altura de colisión del jugador (de pie)",
  },
  playerHeightStandingH23: {
    en: "Player standing height (H2, H3)",
  },
  playerHeightCrouching: {
    en: "Player crouching height (H1, H2, H3)",
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
};

//everything relative to JMS units:
export const conversions = {
  jms: {
    label: "jms",
    rel: 1
  },
  world: {
    label: "worldUnits",
    rel: 100
  },
  inches: {
    label: "inches",
    rel: 1 / 1.2
  },
  feet: {
    label: "feet",
    rel: 10
  },
  meters: {
    label: "meters",
    rel: 1 / 0.03048
  },
};

export const presets = [
  {
    label: "warthogLength",
    basisValue: "191.766",
    basisType: "jms"
  },
  {
    label: "playerHeightStandingH1",
    basisValue: "70",
    basisType: "jms"
  },
  {
    label: "playerHeightStandingH23",
    basisValue: "0.725",
    basisType: "world"
  },
  {
    label: "playerHeightCrouching",
    basisValue: "50",
    basisType: "jms"
  },
  {
    label: "bgFlagsDist",
    basisValue: "97.60443705836329",
    basisType: "world"
  },
  {
    label: "footballField",
    basisValue: "109.73",
    basisType: "meters"
  },
];