const {html} = require("./bits");

function renderDisambiguationList(ctx) {
    const list = ctx.page.disambiguationList;
    if (!list) {
        throw new Error(`Page is not an disambiguation page: ${ctx.page.pageId}. The list can't be used`);
    }
    const searchTerms = [];
    for (link of list) {
        searchTerms.push(link.name)
    }

    htmlResult = html`
    <ul>
        ${list.map((value) => html`
            <li>
                <a href="${value.target}">${value.name}</a>
            </li>
        `)}
    </ul>
    `
    return {searchTerms, html: htmlResult};
}

module.exports = {renderDisambiguationList};