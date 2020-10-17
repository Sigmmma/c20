const {html, DISCORD_URL} = require("../bits");

const header = (ctx, siteName) => html`
  <header class="top-header">
    <a class="c20-logo" href="${ctx.resolveUrl("/")}">
      <span class="c20-name-short">c20</span>
      <span class="c20-name-long">${siteName}</span>
    </a>
    <div id="c20-search-mountpoint"></div>
    <nav class="c20-top-nav">
      <a href="${DISCORD_URL}">Discord</a>
    </nav>
  </header>
`;

module.exports = header;
