const {escapeHtml, html} = require("./bits");

const TOC_LEVELS = 2;

const toc = (page) => {
  //convert headers to a tree structure
  let listHtml = "";
  let currentLevel = 0;
  for (let header of page._headers.filter(it => it.level <= TOC_LEVELS)) {
    if (header.level > currentLevel) {
      listHtml += `\n${"  ".repeat(currentLevel)}<ul>`;
      currentLevel = header.level;
    } else if (header.level < currentLevel) {
      currentLevel = header.level;
      listHtml += `</li>\n${"  ".repeat(currentLevel)}</ul>`;
      listHtml += `\n${"  ".repeat(currentLevel)}</li>`;
    } else {
      listHtml += "</li>";
    }
    listHtml += `\n${"  ".repeat(currentLevel)}<li><a href="#${header.id}">${escapeHtml(header.title)}</a>`;
  }
  while (currentLevel > 0) {
    currentLevel--;
    listHtml += `</li>\n${"  ".repeat(currentLevel)}</ul>`;
  }

  return html`
    <h2 id="table-of-contents">On this page</h2>
    ${listHtml}
  `;
};

module.exports = toc;
