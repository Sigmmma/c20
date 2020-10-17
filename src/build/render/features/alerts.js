const R = require("ramda");
const {localizer, alert, html, REPO_URL, renderMarkdown} = require("../components");

const localizations = localizer({
  stubNotice: {
    en: html`
      <p>🚧 This incomplete article needs help! Please submit tips and info by
      <a href="${REPO_URL}">pull requests or issues</a> or contacting a <a href="/thanks">maintainer</a>.</p>
    `,
    es: html`
      <p>🚧 ¡Este artículo incompleto necesita ayuda! Envíe sugerencias e información mediante
      <a href="${REPO_URL}">solicitudes de extracción o problemas</a> o comunicándose con un <a href="/agradecimientos">mantenedor</a>.</p>
    `
  }
});

module.exports = async function(ctx) {
  const {page, lang} = ctx;
  const localize = localizations(lang);

  return {
    html: html`
      ${page.stub && alert("danger", localize("stubNotice"))}
      ${R.pipe(
        R.pathOr([], ["alerts"]),
        R.filter(R.path(["md", lang])),
        R.map(({type, md}) => alert(type, renderMarkdown(ctx, md[lang])))
      )(page)}
    `
  };
};
