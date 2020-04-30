const {wrapper, tagAnchor, renderMarkdown, heading, html} = require("./shared");

const tagsTable = (tags, metaIndex) => {
  const tagsSorted = [...tags];
  tagsSorted.sort((a, b) => a.name.localeCompare(b.name));
  return html`
    <table>
      <thead>
        <tr>
          <th>Tag name</th>
          <th>Tag ID</th>
          <th>Parent</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        ${tagsSorted.map(tag => html`
          <tr>
            <td>${tagAnchor(tag, metaIndex)}</td>
            <td>${tag.id}</td>
            <td>${tag.parent && tagAnchor(tag.parent, metaIndex)}</td>
            <td>${tag.descMd && renderMarkdown(tag.descMd, metaIndex)}</td>
          </tr>
        `)}
      </tbody>
    </table>
  `;
};

module.exports = (page, metaIndex) => {

  const pageMetaForWrapper = {
    ...page,
    _headers: [
      ...page._headers,
      {title: "Tags list", id: "tags", level: 1},
      {title: "Unused tags", id: "unused-tags", level: 2},
    ]
  };

  const htmlDoc = wrapper(pageMetaForWrapper, metaIndex, html`
    ${renderMarkdown(page._md, metaIndex)}
    ${heading("h1", "Tags list")}
    ${tagsTable(metaIndex.data.h1.tags.filter(t => !t.unused), metaIndex)}
    ${heading("h2", "Unused tags")}
    <p>
      These vestigal tags were found within the game engine or tools, but are no longer used.
      They were used during Halo's development and then partially removed before release.
      The tags are listed here for informational purposes only, and you will not need to use them.
    </p>
    ${tagsTable(metaIndex.data.h1.tags.filter(t => t.unused), metaIndex)}
  `);

  const searchDoc = {
    path: page._path,
    title: page.title,
    text: renderMarkdown(page._md, metaIndex, true)
  };

  return {htmlDoc, searchDoc};
};
