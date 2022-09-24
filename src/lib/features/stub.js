import {localizer, alert, html, REPO_URL, icon} from "../components";

const localizations = localizer({
  stubNotice: {
    en: (ctx) => html`
      <p>${icon("help-circle")} This page is incomplete! You can contribute information using
      <a href="${REPO_URL}">GitHub issues or pull requests</a>.</p>
    `,
    es: (ctx) => html`
      <p>🚧 ¡Este artículo incompleto necesita ayuda! Envíe sugerencias e información mediante
      <a href="${REPO_URL}">solicitudes de extracción o problemas</a> o comunicándose con un <a href="${ctx.resolveUrl("thanks")}">mantenedor</a>.</p>
    `
  }
});

module.exports = function(ctx) {
  const {page, lang} = ctx;
  
  if (!page.stub) return {};

  const localize = localizations(lang);

  return {
    html: html`
      ${page.stub && alert("info", localize("stubNotice")(ctx))}
    `
  };
};
