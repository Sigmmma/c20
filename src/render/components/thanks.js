const {ul, html, escapeHtml} = require("./bits");

const thanks = (thanks) => {
  const pageThanksByName = {};

  for (let thank of thanks) {
    pageThanksByName[thank.to] = pageThanksByName[thank.to] || [];
    if (thank.for) {
      pageThanksByName[thank.to].push(thank.for);
    }
  }
  const pageThanks = Object.entries(pageThanksByName);
  pageThanks.sort(([aTo], [bTo]) => aTo.localeCompare(bTo));

  return html`
    <h1>Acknowledgements</h1>
    <p>Thanks to the following individuals for their research or contributions to this topic:</p>
    ${ul(pageThanks.map(([to, forEntries]) => {
      const forPart = forEntries.length > 0 ? ` <em>(${escapeHtml(forEntries.join("; "))})</em>` : "";
      return `${escapeHtml(to)}${forPart}`;
    }))}
  `;
};

module.exports = thanks;
