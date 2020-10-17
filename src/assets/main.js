const {html, render, Component} = htmPreact;

const lang = document.querySelector("html").lang;

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
        label: "World units",
        rel: 100
      },
      inches: {
        label: "Inches",
        rel: 1 / 1.2
      },
      feet: {
        label: "Feet",
        rel: 10
      },
      meters: {
        label: "Meters",
        rel: 1 / 0.03048
      },
    };

    const presets = [
      {
        label: "Warthog length",
        basisValue: "191.766",
        basisType: "jms"
      },
      {
        label: "Player collision height (standing)",
        basisValue: "70",
        basisType: "jms"
      },
      {
        label: "Player collision height (crouching)",
        basisValue: "50",
        basisType: "jms"
      },
      {
        label: "Distance between Blood Gulch flags",
        basisValue: "97.60443705836329",
        basisType: "world"
      },
      {
        label: "American football field length",
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
  }

  render() {
    const placeholderText = {
      en: "Search c20...",
      es: "Buscar c20..."
    }[lang];
    const searchResultsText = {
      en: "Search results",
      es: "Resultados de la búsqueda"
    }[lang];

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
        placeholder=${placeholderText}
        disabled=${this.state.disabled}
        value=${this.state.query}
        onInput=${handleInput}
        onKeyDown=${this.handleKeyDown}
      />
      ${isNonEmptyQuery && html`
        <nav class="search-results">
          <button class="clear-button" onClick=${clearInput}>Close</button>
          <h1>${searchResultsText}</h1>
          <p class="desktop-only"><small>Hotkeys: <kbd>s</kbd> to search, <kbd>Up/Down</kbd> to choose result, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to close.</small></p>
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
            <p>No results found for <strong>${this.state.query}</strong></p>
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
