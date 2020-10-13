const {html, DISCORD_URL} = require("../bits");

const header = (siteName, lang) => html`
  <header class="top-header">
    <a class="c20-logo" href="/">
      <span class="c20-name-short">c20</span>
      <span class="c20-name-long">${siteName}</span>
    </a>
    <div id="c20-search-mountpoint" data-lang="${lang}"></div>
    <nav class="c20-top-nav">
      <a href="${DISCORD_URL}">Discord</a>
    </nav>
  </header>
`;

module.exports = header;
