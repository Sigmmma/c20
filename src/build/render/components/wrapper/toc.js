const {escapeHtml, html} = require("../bits");

const TOC_LEVELS = 2;

const toc = (headings) => {
  //convert headings to a tree structure
  let listHtml = "";
  let currentLevel = 0;
  for (let heading of headings.filter(it => it.level <= TOC_LEVELS)) {
    if (heading.level > currentLevel) {
      listHtml += `\n${"  ".repeat(currentLevel)}<ol>`;
      currentLevel = heading.level;
    } else if (heading.level < currentLevel) {
      currentLevel = heading.level;
      listHtml += `</li>\n${"  ".repeat(currentLevel)}</ol>`;
      listHtml += `\n${"  ".repeat(currentLevel)}</li>`;
    } else {
      listHtml += "</li>";
    }
    listHtml += `\n${"  ".repeat(currentLevel)}<li><a href="#${heading.id}">${escapeHtml(heading.title)}</a>`;
  }
  while (currentLevel > 0) {
    currentLevel--;
    listHtml += `</li>\n${"  ".repeat(currentLevel)}</ol>`;
  }

  return listHtml;
};

module.exports = toc;
