const {html, REPO_URL, localizer} = require("../bits");

const LICENSE_URL = "https://creativecommons.org/licenses/by-sa/3.0/";

const localizations = localizer({
  goTop: {
    en: "Go to top",
    es: "Ve arriba"
  },
  license: {
    en: (link) => `This text is available under the ${link} license`,
    es: (link) => `Este texto está disponible bajo la licencia CC ${link}`,
  }
});

const footer = (ctx) => {;
  const localize = localizations(ctx.lang);
  return html`
    <footer class="content-footer">
      <p>
        <small>
          ${localize("license")(`<a href="${LICENSE_URL}">CC BY-SA 3.0</a>`)}
          •
          ${ctx.buildOpts.packageVersion && html`
            <a href="${REPO_URL}">c20 v${ctx.buildOpts.packageVersion}</a>
          `}
          •
          <a href="#">${localize("goTop")}</a>
        </small>
      </p>
    </footer>
  `;
};

module.exports = footer;
