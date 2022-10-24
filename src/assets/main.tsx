const {html, render, Component} = htmPreact

const is404Page = !!document.head.querySelector('[itemprop = Is404]');

class UnitConverter extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = ;
  }

  
}

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      disabled: true,
      filterChildPaths: false,
      firstSearchDone: false,
      query: is404Page ? window.location.pathname.split("/").reverse().join(" ") : '',
      searchResults: [],
      selectedResultIndex: 0
    };
  }

  handleKeyDown(e) {
    if (e.key == "Escape") {
      this.setState({
        query: "",
        searchResults: [],
        selectedResultIndex: 0
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
        0
      )});
      e.preventDefault(); //prevent moving the cursor left in the input
    } else if (e.key == "Enter") {
      if (this.state.searchResults.length != 0) {
        window.location = this.state.searchResults[this.state.selectedResultIndex].id;
      }
    }
  }

  handleChange(query, filterChildPaths) {
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

      if (filterChildPaths) {
        searchResults = this.state.searchResults.filter(result =>
          result.id.startsWith(window.location.pathname)
        );
      }

      //sort by if the query is a substring of the page title
      searchResults.sort((a, b) => {
        const normalize = (s) => s.toLowerCase().replace(/\W/g, "");
        const queryNormalized = normalize(query);
        const aIncludes = normalize(a.title).includes(queryNormalized);
        const bIncludes = normalize(b.title).includes(queryNormalized);
        if (aIncludes && !bIncludes) return -1;
        if (bIncludes && !aIncludes) return 1;
        return 0;
      });

      this.setState({
        query,
        searchResults,
        filterChildPaths,
        selectedResultIndex: 0,
		firstSearchDone: true
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
            boost: {title: 2, keywords: 3},
            fuzzy: 0.2
          }
        });
        this.setState({disabled: false});
        console.log("Search index loaded!");
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
        selectedResultIndex: 0
      });
      if (this.inputRef) {
        this.inputRef.blur();
      }
    });
  }

  render() {
    const clearInput = () => this.handleChange("", this.state.filterChildPaths);
    const handleInput = (e) => this.handleChange(e.target.value, this.state.filterChildPaths);
    const handleFilter = () => this.handleChange(this.state.query, !this.state.filterChildPaths);
    const isNonEmptyQuery = this.state.query && this.state.query != "";
    //save a reference to the DOM element which gets rendered, so we can focus it later
    const saveInputRef = (el) => this.inputRef = el;

    if (!this.state.firstSearchDone && is404Page)
      this.handleChange(this.state.query, this.state.filterChildPaths);

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
          <div class="results-header">
            <h2>${localize("searchResults")}</h2>
            <button class="clear-button" onClick=${clearInput}>${localize("close")} <span class="desktop-only">[Esc]</span></button>
          </div>
          ${ !is404Page &&
          html`<div class="results-toggle-child-pages">
            <input type="checkbox" id="filter-results" onClick=${handleFilter} checked=${this.state.filterChildPaths}/>
            <label for="filter-results">${localize("limitToChildPaths")}</label>
          </div>`
          }
          ${this.state.searchResults.length > 0 ? html`
            <ul class="link-list">
              ${this.state.searchResults.map((result, i) => {
                //render each search result, ensuring that the user's selected one gets highlighted by CSS:
                const isSelected = i == this.state.selectedResultIndex;
                const pathPrefix = result.id.slice(1).split("/").slice(0, -1).join("/");
                return html`
                  <li class=${isSelected ? "selected" : ""}>
                    <a href=${result.id}>
                      ${result.title}
                      ${pathPrefix != "" && html` <span class="path-prefix">(${pathPrefix})</span>`}
                      ${isSelected && html` <kbd class="desktop-only">⬍ Enter</kbd>`}
                    </a>
                  </li>`;
              })}
            </ul>
          ` : html`
            <p class="null-result">${localize("searchNoResults")} <strong>${this.state.query}</strong></p>
          `}
        </nav>
      `}
    `;
  }
}

if (is404Page) {
  document.querySelector('[id=missing-page]').innerText = "(" + window.location.pathname + ")";
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
      }, 1500);
    }
  }
}

window.addEventListener("hashchange", hashFlash, false);
hashFlash();

function setSyntax() {
  document.getElementById("syntax").href = document.documentElement.dataset.theme == "dark" ?
    "/assets/night-owl.css" : "/assets/github.css";
}
document.documentElement.dataset.theme = window.localStorage.getItem("theme") || "dark";
document.getElementById("toggle-theme").addEventListener("click", () => {
  const data = document.documentElement.dataset;
  data.theme = data.theme == "dark" ? "light" : "dark";
  window.localStorage.setItem("theme", data.theme);
  setSyntax();
});
setSyntax();
