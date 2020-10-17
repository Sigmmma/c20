const path = require("path");
const fs = require("fs").promises;
const R = require("ramda");

const {wrapper} = require("./components");
const features = require("./features");

//TODO: convert into features:

// function renderPage2(ctx) {
//   const metaboxProps = {
//     metaTitle: page.title,
//     metaClass: null,
//     img: page.img,
//     imgCaption: renderMarkdown(page.imgCaption, metaIndex),
//     sections: page.info ? [{body: renderMarkdown(page.info, metaIndex)}] : [],
//   };
//
//   if (page.toolName) {
//     metaboxProps.metaTitle = `\u{1F527} Tool: ${page.toolName}`;
//     metaboxProps.metaClass = "content-tool";
//   }
//
//   if (page.tagName) {
//     //todo: allow page to specify game too
//     const tag = metaIndex.data.h1.tagsByName[page.tagName];
//     if (!tag) {
//       throw new Error(`Failed to find tag structure ${page.tagName}`);
//     }
//
//     keywords.push(tag.id);
//
//     if (tag.parent) {
//       metaboxProps.sections.push({
//         cssClass: "content-tag-minor",
//         body: html`<p>Parent tag: ${tagAnchor(tag.parent, metaIndex)}</p>`
//       });
//     }
//
//     let refDetailElements = [];
//     let refLevel = tag;
//     while (refLevel) {
//       if (refLevel.references.length > 0) {
//         const isDirect = refLevel.name == tag.name;
//         const refLevelSummary = isDirect ?
//           "Direct references" :
//           `${tagAnchor(refLevel, metaIndex)} references`;
//
//         refDetailElements.push(detailsList(
//           refLevelSummary,
//           refLevel.references.map(refTag => {
//             if (refTag === "*") {
//               //sound, effect, damage effect, sound looping, model animations, actor variants, and objects
//               return "(any tags referenced by scripts)";
//             } else {
//               return tagAnchor(refTag, metaIndex);
//             }
//           }),
//           isDirect ? undefined : 0
//         ));
//       }
//       refLevel = refLevel.parent;
//     }
//
//     if (refDetailElements.length > 0) {
//       metaboxProps.sections.push({
//         cssClass: "content-tag-minor",
//         body: refDetailElements.join("\n")
//       });
//     }
//
//     if (tag.referencedBy.length > 0) {
//       metaboxProps.sections.push({
//         cssClass: "content-tag-minor",
//         body: detailsList(
//           "Referenced by",
//           tag.referencedBy.map(otherTag => tagAnchor(otherTag, metaIndex)),
//           0
//         )
//       });
//     }
//
//     if (tag.children.length > 0) {
//       metaboxProps.sections.push({
//         cssClass: "content-tag-minor",
//         body: detailsList(
//           "Child tags",
//           tag.children.map(childTag => tagAnchor(childTag, metaIndex))
//         )
//       });
//     }
//
//     const engineId = `<code>${tag.id}</code>${defAnchor(metaIndex.resolveUrl("h1/tags", "engine-ids"))}`;
//     metaboxProps.metaTitle = `\u{1F3F7} Tag: ${tag.name} (${engineId})`;
//     metaboxProps.metaClass = "content-tag";
//
//     if (tag.invaderStruct) {
//       const {headings: tagHeadings, htmlResult, searchText} = renderTagStructure(tag, metaIndex)
//       articleBodySections.push(htmlResult);
//       searchTexts.push(searchText);
//       headings = [...headings, ...tagHeadings];
//     }
//
//     thanks = thanks.concat(metaIndex.data.h1.tagThanks);
//   }
//
//   const workflowItemName = page.workflowName || page.toolName || page.tagName;
//   if (workflowItemName) {
//     const itemInfo = metaIndex.data.h1.getWorkflowItem(workflowItemName);
//     if (itemInfo.authors && itemInfo.authors.length > 0) {
//       metaboxProps.sections.push({
//         body: detailsList("Author(s)", itemInfo.authors)
//       });
//     }
//     if (itemInfo.similarTo && itemInfo.similarTo.length > 0) {
//       metaboxProps.sections.push({
//         body: detailsList("Similar to", itemInfo.similarTo.map(itemName => {
//           return workflowItemAnchor(itemName, metaIndex);
//         }))
//       });
//     }
//     if (itemInfo.workflows && itemInfo.workflows.length > 0) {
//       metaboxProps.sections.push({
//         cssClass: "content-tool-minor",
//         body: workflowsList(workflowItemName, itemInfo.workflows, metaIndex)
//       });
//     }
//   }
//

async function renderPage(ctx) {
  const {page, lang} = ctx;

  /* Pass the render context through each feature, gathering their desired
   * additions to the page and search index.
   */
  const featureResults = await Promise.all(features.map(feature => feature(ctx)));
  const transformResults = (...pipe) => R.pipe(...pipe)(featureResults);

  //represents the full page HTML, ready to write to a file
  const htmlDoc = wrapper(
    ctx,
    transformResults(
      R.map(R.propOr([], "headings")),
      R.flatten
    ),
    transformResults(
      R.map(R.prop("html"))
    )
  );
  //used to add the page to the search index
  const searchDoc = page.noSearch ? null : {
    lang,
    path: ctx.page.localizedPaths[ctx.lang],
    title: ctx.page.title[ctx.lang],
    text: transformResults(
      R.map(R.propOr("", "searchText")),
      R.join(" ")
    ),
    keywords: transformResults(
      R.map(R.propOr([], "keywords")),
      R.flatten,
      R.join(" ")
    )
  };

  return {htmlDoc, searchDoc};
}

async function renderPages(pageIndex, data, buildOpts) {
  //for all pages, and for all of their languages...
  const searchDocs = await Promise.all(Object.values(pageIndex.pages).flatMap(page =>
    page.langs.map(async (lang) => {
      //we can assume page and language is mantained during a page render
      const renderContext = {
        resolvePage: (idTail) => pageIndex.resolvePage(page.pageId, idTail),
        resolveUrl: (idTail, headingId) => pageIndex.resolveUrl(page.pageId, lang, idTail, headingId),
        pageIndex,
        data,
        buildOpts,
        page,
        lang,
      };

      //render the page to HTML and also gather search index data
      const {htmlDoc, searchDoc} = await renderPage(renderContext);
      //write the HTML content out to a file
      await fs.mkdir(path.join(buildOpts.outputDir, page.localizedPaths[lang]), {recursive: true});
      await fs.writeFile(path.join(buildOpts.outputDir, page.localizedPaths[lang], "index.html"), htmlDoc, "utf8");
      return searchDoc;
    })
  ))
  //return all search docs so they can be written to a single file (for this lang)
  return searchDocs.filter(it => it != null);
}

module.exports = renderPages;
