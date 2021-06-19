const R = require("ramda");
const {localizer, alert, html, REPO_URL, renderMarkdown, icon} = require("../components");

const localizations = localizer({
  stubNotice: {
    en: (ctx) => html`
      <p>${icon("help-circle")} This page needs help! Please submit any missing information via
      <a href="${REPO_URL}">GitHub issues or pull requests</a>.</p>
    `,
    es: (ctx) => html`
      <p>🚧 ¡Este artículo incompleto necesita ayuda! Envíe sugerencias e información mediante
      <a href="${REPO_URL}">solicitudes de extracción o problemas</a> o comunicándose con un <a href="${ctx.resolveUrl("thanks")}">mantenedor</a>.</p>
    `
  }
});

module.exports = async function(ctx) {
  const {page, lang} = ctx;
  const localize = localizations(lang);

  return {
    html: html`
      ${page.stub && alert("danger", localize("stubNotice")(ctx))}
      ${R.pipe(
        R.pathOr([], ["alerts"]),
        R.filter(R.path(["md", lang])),
        R.map(({type, md}) => alert(type, renderMarkdown(ctx, md[lang])))
      )(page)}
    `,
    searchText: R.pipe(
      R.pathOr([], ["alerts"]),
      R.filter(R.path(["md", lang])),
      R.map(({md}) => {
        console.warn(`Page ${page.pageId} is using the deprecated YAML alerts feature. Use inline markdown alerts instead.`);
        return renderMarkdown(ctx, md[lang], true)
      }),
      R.join(" ")
    )(page)
  };
};
