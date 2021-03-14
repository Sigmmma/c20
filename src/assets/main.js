const {html, render, Component} = htmPreact;

const lang = document.querySelector("html").lang;
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
    en: "Search c20...",
    es: "Buscar c20..."
  },
  searchResults: {
    en: "Search results",
    es: "Resultados de la búsqueda"
  },
  close: {
    en: "Close",
    es: "Cerrar"
  },
  searchHotkeys: {
    en: "Hotkeys: <kbd>s</kbd> to search, <kbd>Up/Down</kbd> to choose result, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to close.",
    es: "Teclas de acceso rápido: <kbd>s</kbd> para buscar, <kbd>Arriba/Abajo</kbd> para elegir el resultado, <kbd>Enter</kbd> para seleccionar, <kbd>Esc</kbd> para cerrar."
  },
  searchNoResults: {
    en: "No results found for",
    es: "No se encontraron resultados para",
  }
}[key][lang]);

class UnitConverter extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      basisType: "world",
      basisValue: "1",
    };
  }

  handleChange(basisType, basisValue) {
    this.setState({basisType, basisValue});
  }

  render() {
    //everything relative to JMS units:
    const conversions = {
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

    const presets = [
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

    return html`
      <div class="unit-converter">
        <div class="inputs">
          ${Object.entries(conversions).map(([type, {label, rel}]) => {
            const name = `conversion-${type}`;
            let entryValue = this.state.basisValue;
            if (type != this.state.basisType) {
              const jmsValue = Number(this.state.basisValue) * conversions[this.state.basisType].rel;
              entryValue = Number.isNaN(jmsValue) ? "" : String(jmsValue / conversions[type].rel);
            }
            return html`
              <br/>
              <label for=${name}>${label}</label>
              <input
                name=${name}
                type="text"
                value=${entryValue}
                onInput=${(e) => this.handleChange(type, e.target.value)}
              />
            `;
          })}
        </div>
        <div class="presets">
          <h2>Presets</h2>
          ${presets.map(({label, basisValue, basisType}) => {
            const clickHandler = () => {this.handleChange(basisType, basisValue)};
            return html`
              <button onClick=${clickHandler}>${label}</button>
              <br/>
            `;
          })}
        </div>
      </div>
    `;
  }
}

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      disabled: true,
      query: "",
      searchResults: [],
      selectedResultIndex: -1
    };
  }

  handleKeyDown(e) {
    if (e.key == "Escape") {
      this.setState({
        query: "",
        searchResults: [],
        selectedResultIndex: -1
      });
      if (this.inputRef) {
        this.inputRef.blur();
      }
    } else if (e.key == "ArrowDown") {
      this.setState({selectedResultIndex: Math.min(
        this.state.selectedResultIndex + 1,
        this.state.searchResults.length - 1
      )});
      e.preventDefault(); //prevent moving the cursor right in the input
    } else if (e.key == "ArrowUp") {
      this.setState({selectedResultIndex: Math.max(
        this.state.selectedResultIndex - 1,
        -1
      )});
      e.preventDefault(); //prevent moving the cursor left in the input
    } else if (e.key == "Enter") {
      if (this.state.selectedResultIndex != -1) {
        window.location = this.state.searchResults[this.state.selectedResultIndex].id;
      }
    }
  }

  handleChange(query) {
    if (!this.state.disabled) {
      let searchResults = this.searchIndex.search(query);

      //if no results, try suggested search instead
      if (searchResults.length == 0) {
        const suggestions = this.searchIndex.autoSuggest(query);
        if (suggestions.length > 0) {
          const firstSuggestionTerm = suggestions[0].terms[0];
          searchResults = this.searchIndex.search(firstSuggestionTerm);
        }
      }

      this.setState({
        query,
        searchResults,
        selectedResultIndex: -1
      });
    }
  }

  componentDidMount() {
    fetch(`/assets/search-index_${lang}.json`)
      .then(res => res.text())
      .then(indexJson => {
        this.searchIndex = MiniSearch.loadJSON(indexJson, {
          idField: "path",
          fields: ["title", "text"],
          storeFields: ["title"],
          searchOptions: {
            tokenize: (string) => {
              //customize tokenizer to allow underscores in token
              return string.split(/[\s\-\."'!?,;:\[\]\(\)\|\\><]+/);
            },
            boost: {title: 3, keywords: 2},
            fuzzy: 0.2
          }
        });
        this.setState({disabled: false});
      });

    window.addEventListener("keydown", (e) => {
      //check for global keydown of "s" to move focus to the search input
      if (e.key == "s" && this.inputRef && document.activeElement !== this.inputRef) {
        this.inputRef.focus();
        //prevents event from being passed to next handlers to avoid "s" being put in now-focused input
        e.preventDefault();
      }
    });

    //closes search before navigating away so it's not still open when going back
    window.addEventListener("beforeunload", (e) => {
      this.setState({
        query: "",
        searchResults: [],
        selectedResultIndex: -1
      });
      if (this.inputRef) {
        this.inputRef.blur();
      }
    });
  }

  render() {
    const clearInput = () => this.handleChange("");
    const handleInput = (e) => this.handleChange(e.target.value);
    const isNonEmptyQuery = this.state.query && this.state.query != "";
    //save a reference to the DOM element which gets rendered, so we can focus it later
    const saveInputRef = (el) => this.inputRef = el;

    return html`
      <input
        ref=${saveInputRef}
        class="search-input ${isNonEmptyQuery ? "nonempty" : ""}"
        type="text"
        placeholder=${localize("searchPlaceholder")}
        disabled=${this.state.disabled}
        value=${this.state.query}
        onInput=${handleInput}
        onKeyDown=${this.handleKeyDown}
      />
      ${isNonEmptyQuery && html`
        <nav class="search-results">
          <button class="clear-button" onClick=${clearInput}>${localize("close")}</button>
          <h1>${localize("searchResults")}</h1>
          <p class="desktop-only"><small dangerouslySetInnerHTML=${{__html: localize("searchHotkeys")}}/></p>
          ${this.state.searchResults.length > 0 ? html`
            <ul>
              ${this.state.searchResults.map((result, i) => {
                //render each search result, ensuring that the user's selected one gets highlighted by CSS:
                const isSelected = i == this.state.selectedResultIndex;
                return html`
                  <li class=${isSelected ? "selected" : ""}>
                    <a href=${result.id}>${result.title}</a>
                  </li>`;
              })}
            </ul>
          ` : html`
            <p>${localize("searchNoResults")} <strong>${this.state.query}</strong></p>
          `}
        </nav>
      `}
    `;
  }
}

render(html`<${Search}/>`, document.getElementById("c20-search-mountpoint"));

const converterMount = document.getElementById("unit-converter-mountpoint");
if (converterMount) {
  render(html`<${UnitConverter}/>`, converterMount);
}

//flash heading matching URL hash
function hashFlash() {
  const hash = document.location.hash;
  if (hash) {
    const heading = document.getElementById(decodeURI(hash.substring(1)));
    if (heading) {
      heading.classList.add("destination");
      setTimeout(() => {
        heading.classList.remove("destination");
      }, 500);
    }
  }
}

window.addEventListener("hashchange", hashFlash, false);
hashFlash();

//todo: support theme changing
// document.documentElement.dataset.theme = window.localStorage.getItem("theme") || "dark";
// document.getElementById("toggle-theme").addEventListener("click", () => {
//   const data = document.documentElement.dataset;
//   data.theme = data.theme == "dark" ? "light" : "dark";
//   window.localStorage.setItem("theme", data.theme);
// });
