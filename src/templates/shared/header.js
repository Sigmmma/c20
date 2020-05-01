const {html, DISCORD_URL, REPO_URL} = require("./bits");

const header = () => html`
  <header class="top-header">
    <a class="c20-logo" href="/">
      <span class="c20-name-short">c20</span>
      <span class="c20-name-long">The Reclaimers Library</span>
    </a>
    <nav class="c20-top-nav">
      <div id="c20-search-mountpoint"></div>
      <a href="${DISCORD_URL}">Discord</a>
      <a href="${REPO_URL}">Contribute</a>
    </nav>
  </header>
`;

module.exports = header;
