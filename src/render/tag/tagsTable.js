const {tagAnchor, renderMarkdown, html} = require("../shared");

const tagsTable = (tags, metaIndex) => {
  const tagsSorted = [...tags];
  tagsSorted.sort((a, b) => a.name.localeCompare(b.name));
  return html`
    <table>
      <thead>
        <tr>
          <th>Tag name</th>
          <th><a href="${metaIndex.resolveUrl("tags", "engine-ids")}">Engine ID</a></th>
          <th>Parent</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        ${tagsSorted.map(tag => html`
          <tr>
            <td>${tagAnchor(tag, metaIndex)}</td>
            <td><code>${tag.id}</code></td>
            <td>${tag.parent && tagAnchor(tag.parent, metaIndex)}</td>
            <td>
              ${tag.comments && tag.comments.md != "..." &&
                renderMarkdown(tag.comments.md, metaIndex)
              }
            </td>
          </tr>
        `)}
      </tbody>
    </table>
  `;
};

module.exports = tagsTable;
