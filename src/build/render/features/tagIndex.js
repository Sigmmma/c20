const {} = require("../components");
//   if (page.tagIndex) {
//     const gameVersion = page.tagIndex;
//     const usedTags = metaIndex.data[gameVersion].tags.filter(t => !t.unused);
//     const unusedTags = metaIndex.data[gameVersion].tags.filter(t => t.unused);
//
//     articleBodySections.push(html`
//       ${heading("h1", "Tags list")}
//       ${tagsTable(usedTags, metaIndex)}
//     `);
//     wrapperProps._headers.push({title: "Tags list", id: "tags", level: 1});
//
//     if (unusedTags.length > 0) {
//       articleBodySections.push(html`
//         ${heading("h2", "Unused tags")}
//         <p>
//           These vestigal tags were found within the game engine or tools, but are no longer used.
//           They were used during Halo's development and then partially removed before release.
//           The tags are listed here for informational purposes only, and you will not need to use them.
//         </p>
//         ${tagsTable(unusedTags, metaIndex)}
//       `);
//       wrapperProps._headers.push({title: "Unused tags", id: "unused-tags", level: 2});
//     }
//   }
//

module.exports = async function(ctx) {
  return {

  };
};
