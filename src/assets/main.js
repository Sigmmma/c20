const {html, render, Component} = htmPreact;

class Search extends Component {
  constructor() {
    super();
    this.state = {disabled: true, searchResults: []};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (!this.state.disabled) {
      const searchResults = this.searchIndex.search(e.target.value);
      this.setState({searchResults});
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
            boost: {title: 2},
            fuzzy: 0.2
          }
        });
        this.setState({disabled: false});
      });
  }
  render(props, state) {
    console.log(this.state.searchResults);
    return html`
      <input
        class="search"
        type="text"
        placeholder="Search c20..."
        disabled=${this.state.disabled}
        onInput=${this.handleChange}
      />
      ${this.state.searchResults.length > 0 && html`
        <div class="search-results">
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
