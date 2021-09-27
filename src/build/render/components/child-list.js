const {html, jump, slugify, anchor} = require("./bits");

function renderChildList(ctx) {
    const list = ctx.page.children;
    const searchTerms = [];
    for (child of list) {
        searchTerms.push(child.tryLocalizedTitle(ctx.lang))
    }

    htmlResult = html`
    <ul>
        ${list.map((child) => html`
            <li>
                ${anchor(ctx.resolveUrl(child.pageId), child.tryLocalizedTitle(ctx.lang))}
            </li>
        `)}
    </ul>
    `
    return {searchTerms, html: htmlResult};
}

module.exports = {renderChildList};