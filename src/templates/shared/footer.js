const {html, REPO_URL} = require("./bits");

const LICENSE_URL = "https://creativecommons.org/licenses/by-sa/3.0/";

const footer = (page) => {
  const srcUrl = `${REPO_URL}/tree/master/src/content${page._dirUrl}`;
  return html`
    <footer class="content-footer">
      <p>
        <small>
          This text is available under the <a href="${LICENSE_URL}">CC BY-SA 3.0 license</a>
          •
          <a href="${srcUrl}">Source</a>
          •
          <a href="#">Go to top</a>
        </small>
      </p>
    </footer>
  `;
};

module.exports = footer;
