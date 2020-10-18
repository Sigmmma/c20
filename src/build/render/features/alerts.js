const R = require("ramda");
const {localizer, alert, html, REPO_URL, renderMarkdown} = require("../components");

const localizations = localizer({
  stubNotice: {
    en: (ctx) => html`
      <p>🚧 This incomplete article needs help! Please submit tips and info by
      <a href="${REPO_URL}">pull requests or issues</a> or contacting a <a href="${ctx.resolveUrl("thanks")}">maintainer</a>.</p>
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
      R.map(({md}) => renderMarkdown(ctx, md[lang], true)),
      R.join(" ")
    )(page)
  };
};
