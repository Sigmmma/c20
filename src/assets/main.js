const {html, render, Component} = htmPreact;

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
    } else if (e.key == "ArrowUp") {
      this.setState({selectedResultIndex: Math.max(
        this.state.selectedResultIndex - 1,
        -1
      )});
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
    fetch("/assets/search-index.json")
      .then(res => res.text())
      .then(indexJson => {
        this.searchIndex = MiniSearch.loadJSON(indexJson, {
          idField: "path",
          fields: ["title", "text"],
          storeFields: ["title"],
          searchOptions: {
            boost: {title: 3, keywords: 2},
            fuzzy: 0.2
          }
        });
        this.setState({disabled: false});
      });
    window.addEventListener("keydown", (e) => {
      if (e.key == "s" && this.inputRef && document.activeElement !== this.inputRef) {
        this.inputRef.focus();
        e.preventDefault();
      }
    });
  }

  render() {
    return html`
      <input
        ref=${(el) => this.inputRef = el}
        class="search-input ${!!this.state.query ? "nonempty" : ""}"
        type="text"
        placeholder="Search c20..."
        disabled=${this.state.disabled}
        value=${this.state.query}
        onInput=${(e) => this.handleChange(e.target.value)}
        onKeyDown=${this.handleKeyDown}
      />
      ${this.state.query != "" && html`
        <nav class="search-results">
          <button class="clear-button" onClick=${() => this.handleChange("")}>Close</button>
          <h1>Search results</h1>
          ${this.state.searchResults.length > 0 ? html`
            <ul>
              ${this.state.searchResults.map((result, i) => {
                const isSelected = i == this.state.selectedResultIndex;
                return html`<li class=${isSelected ? "selected" : ""}><a href=${result.id}>${result.title}</a></li>`
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
