const {html, alert, ol, pageAnchor} = require("./bits");

const DISCORD_URL = "https://discord.reclaimers.net";
const REPO_URL = "https://github.com/Sigmmma/c20";

const STUB_ALERT = alert({type: "danger", body: html`
  <p>🚧 This article is a stub. You can help expand it by submitting content in
  pull requests or issues in this wiki's <a href="${REPO_URL}">source repo</a>.</p>
`});

const wrapper = (page, metaIndex, body) => {
  const srcUrl = `${REPO_URL}/tree/master/src/content${page._dirUrl}`;
  const breadcrumbs = [];
  for (let i = 0; i <= page._dir.length; i++) {
    const parentUrl = "/" + page._dir.slice(0, i).join("/");
    const parent = metaIndex.pages.find(otherPage => otherPage._dirUrl == parentUrl);
    if (parent) {
      breadcrumbs.push(parent);
    }
  }
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta property="og:title" content="${page.title}"/>
        <meta property="og:site_name" content="The Reclaimers Library"/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:url" content="${metaIndex.baseUrl}${page._dirUrl}"/>
        ${page.img && html`<meta property="og:image" content="${metaIndex.baseUrl}${page._dirUrl}/${page.img}"/>`}
        <title>${page.title} - c20</title>
        <link rel="icon" type="image/png" href="/assets/librarian.png">
        <link rel="stylesheet" href="/assets/style.css"/>
        <link rel="stylesheet" href="/assets/atom-one-dark.css"/>
      </head>
      <body>
        <header class="top-header">
          <a class="c20-logo" href="/">
            <span class="c20-name-short">c20</span>
            <span class="c20-name-long">The Reclaimers Library</span>
          </a>
          <nav class="c20-top-nav">
            <input type="text" class="search" disabled placeholder="Search not implemented"></input>
            <a href="${DISCORD_URL}">Discord</a>
            <a href="${REPO_URL}">Contribute</a>
          </nav>
        </header>
        <div class="content-layout">
          <aside class="content-sidebar">
          </aside>
          <main role="main" class="content-main">
            <nav class="breadcrumbs">
              ${ol(breadcrumbs.map((page, i) =>
                (i < breadcrumbs.length - 1) ? pageAnchor(page) : page.title
              ))}
            </nav>
            <article class="content-article">
              <h1 class="page-title">${page.title}</h1>
    ${body}
              ${page.stub && html`
                <hr/>
                ${STUB_ALERT}
              `}
            </article>
          </main>
          <footer class="content-footer">
            <p>
              <small>
                This text is available under the <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0 license</a>
                •
                <a href="${srcUrl}">Source</a>
                •
                <a href="#">Go to top</a>
              </small>
            </p>
          </footer>
        </div>
      </body>
    </html>
  `;
};

module.exports = wrapper;
