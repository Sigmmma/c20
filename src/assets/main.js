const {html, render, Component} = htmPreact;

const MAX_SEARCH_SUGGESTIONS = 1;

class Search extends Component {
  constructor() {
    super();
    this.state = {disabled: true, searchResults: [], suggestions: []};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (!this.state.disabled) {
      const query = e.target.value;
      const searchResults = this.searchIndex.search(query);
      const suggestions = new Set();
      this.searchIndex.autoSuggest(query).forEach(s => {
        if (suggestions.size < MAX_SEARCH_SUGGESTIONS) {
          suggestions.add(s.terms[0]);
        }
      });
      this.setState({
        searchResults,
        suggestions: [...suggestions],
        nonempty: !!query
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
  }
  render() {
    return html`
      <input
        class="search-input ${this.state.nonempty ? "nonempty" : ""}"
        type="text"
        list="c20-search-suggestions"
        placeholder="Search c20..."
        disabled=${this.state.disabled}
        onInput=${this.handleChange}
      />
      <datalist id="c20-search-suggestions">
        ${this.state.suggestions.map(suggestion => html`
          <option value=${suggestion}/>
        `)}
      </datalist>
      ${this.state.searchResults.length > 0 && html`
        <div class="search-results">
          <h1>Search results</h1>
          <ul>
            ${this.state.searchResults.map(result =>
              html`<li><a href=${result.id}>${result.title}</a></li>`
            )}
          </ul>
        </div>
      `}
    `;
  }
}

render(html`<${Search}/>`, document.getElementById("c20-search-mountpoint"));
