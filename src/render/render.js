const {
  detailsList, anchor, metabox, ul, wrapper, renderMarkdown, defAnchor,
  html, alert, thanks: renderThanks, REPO_URL, heading, tagAnchor,
  workflowItemAnchor, workflowsList, tagsTable, renderTagStructure,
  surveyResults
} = require("./components");

const STUB_ALERT = {type: "danger", body: html`
  <p>🚧 This incomplete article needs help! Please submit tips and info by
  <a href="${REPO_URL}">pull requests or issues</a> or contacting a <a href="/thanks">maintainer</a>.</p>
`};

module.exports = (page, metaIndex) => {
  let thanks = [];
  let alertProps = [];
  let keywords = page.keywords || [];
  let searchTexts = [];
  const metaboxProps = {
    metaTitle: page.title,
    metaClass: null,
    img: page.img,
    imgCaption: renderMarkdown(page.imgCaption, metaIndex),
    sections: page.info ? [{body: renderMarkdown(page.info, metaIndex)}] : [],
  };
  let articleBodySections = [
    renderMarkdown(page._md, metaIndex)
  ];
  const wrapperProps = {
    ...page,
    _headers: [
      ...page._headers
    ]
  };

  if (!page.noSearchMd) {
    searchTexts.push(renderMarkdown(page._md, metaIndex, true));
  }

  if (page.stub) {
    alertProps.push(STUB_ALERT);
  }

  if (page.thanks) {
    thanks = thanks.concat(page.thanks);
  }

  if (page.alerts) {
    for (const {type, md} of page.alerts) {
      alertProps.push({type: type || "info", body: renderMarkdown(md, metaIndex)});
    }
  }

  if (page.toolName) {
    metaboxProps.metaTitle = `\u{1F527} Tool: ${page.toolName}`;
    metaboxProps.metaClass = "content-tool";
  }

  if (page.tagName) {
    //todo: allow page to specify game too
    const tag = metaIndex.data.h1.tagsByName[page.tagName];
    if (!tag) {
      throw new Error(`Failed to find tag structure ${page.tagName}`);
    }

    keywords.push(tag.id);

    if (tag.parent) {
      metaboxProps.sections.push({
        cssClass: "content-tag-minor",
        body: html`<p>Parent tag: ${tagAnchor(tag.parent, metaIndex)}</p>`
      });
    }

    let refDetailElements = [];
    let refLevel = tag;
    while (refLevel) {
      if (refLevel.references.length > 0) {
        const isDirect = refLevel.name == tag.name;
        const refLevelSummary = isDirect ?
          "Direct references" :
          `${tagAnchor(refLevel, metaIndex)} references`;

        refDetailElements.push(detailsList(
          refLevelSummary,
          refLevel.references.map(refTag => {
            if (refTag === "*") {
              //sound, effect, damage effect, sound looping, model animations, actor variants, and objects
              return "(any tags referenced by scripts)";
            } else {
              return tagAnchor(refTag, metaIndex);
            }
          }),
          isDirect ? undefined : false
        ));
      }
      refLevel = refLevel.parent;
    }

    if (refDetailElements.length > 0) {
      metaboxProps.sections.push({
        cssClass: "content-tag-minor",
        body: refDetailElements.join("\n")
      });
    }

    if (tag.referencedBy.length > 0) {
      metaboxProps.sections.push({
        cssClass: "content-tag-minor",
        body: detailsList(
          "Referenced by",
          tag.referencedBy.map(otherTag => tagAnchor(otherTag, metaIndex)),
          false
        )
      });
    }

    if (tag.children.length > 0) {
      metaboxProps.sections.push({
        cssClass: "content-tag-minor",
        body: detailsList(
          "Child tags",
          tag.children.map(childTag => tagAnchor(childTag, metaIndex))
        )
      });
    }

    const engineId = `<code>${tag.id}</code>${defAnchor(metaIndex.resolveUrl("tags", "engine-ids"))}`;
    metaboxProps.metaTitle = `\u{1F3F7} Tag: ${tag.name} (${engineId})`;
    metaboxProps.metaClass = "content-tag";

    if (tag.invaderStruct) {
      const {headings, htmlResult, searchText} = renderTagStructure(tag, metaIndex)
      articleBodySections.push(htmlResult);
      searchTexts.push(searchText);
      wrapperProps._headers = [
        ...wrapperProps._headers,
        ...headings
      ];
    }

    thanks = thanks.concat(metaIndex.data.h1.tagThanks);
  }

  const workflowItemName = page.workflowName || page.toolName || page.tagName;
  if (workflowItemName) {
    const itemInfo = metaIndex.data.h1.getWorkflowItem(workflowItemName);
    if (itemInfo.authors && itemInfo.authors.length > 0) {
      metaboxProps.sections.push({
        body: detailsList("Author(s)", itemInfo.authors)
      });
    }
    if (itemInfo.similarTo && itemInfo.similarTo.length > 0) {
      metaboxProps.sections.push({
        body: detailsList("Similar to", itemInfo.similarTo.map(itemName => {
          return workflowItemAnchor(itemName, metaIndex);
        }))
      });
    }
    if (itemInfo.workflows && itemInfo.workflows.length > 0) {
      metaboxProps.sections.push({
        cssClass: "content-tool-minor",
        body: workflowsList(workflowItemName, itemInfo.workflows, metaIndex)
      });
    }
  }

  if (page.tagIndex) {
    const gameVersion = page.tagIndex;
    const usedTags = metaIndex.data[gameVersion].tags.filter(t => !t.unused);
    const unusedTags = metaIndex.data[gameVersion].tags.filter(t => t.unused);

    articleBodySections.push(html`
      ${heading("h1", "Tags list")}
      ${tagsTable(usedTags, metaIndex)}
    `);
    wrapperProps._headers.push({title: "Tags list", id: "tags", level: 1});

    if (unusedTags.length > 0) {
      articleBodySections.push(html`
        ${heading("h2", "Unused tags")}
        <p>
          These vestigal tags were found within the game engine or tools, but are no longer used.
          They were used during Halo's development and then partially removed before release.
          The tags are listed here for informational purposes only, and you will not need to use them.
        </p>
        ${tagsTable(unusedTags, metaIndex)}
      `);
      wrapperProps._headers.push({title: "Unused tags", id: "unused-tags", level: 2});
    }
  }

  if (page.thanksIndex) {
    let allThanks = new Set();

    for (let page of metaIndex.pages) {
      for (let thank of (page.thanks || [])) {
        if (thank.to) {
          allThanks.add(thank.to);
        }
      }
    }

    for (let thank of metaIndex.data.thanks) {
      if (thank.to) {
        allThanks.add(thank.to);
      }
    }

    //convert to an array and sort alphabetically
    allThanks = [...allThanks];
    allThanks.sort((a, b) => a.localeCompare(b));

    articleBodySections.push(html`
      <h2>Thank you!</h2>
      ${ul(allThanks)}
    `);
    wrapperProps._headers.push({title: "Thank you!", id: "thank-you", level: 2});
  }

  if (page.isSurveyResults) {
    articleBodySections.push(surveyResults.body);
    wrapperProps._headers = [
      ...wrapperProps._headers,
      ...surveyResults.headings
    ];
  }

  const htmlDoc = wrapper(wrapperProps, metaIndex, html`
    ${alertProps.length > 0 && alertProps.map(({type, body}) => alert(type, body))}
    ${metabox(metaboxProps)}
    ${articleBodySections}
    ${thanks.length > 0 && renderThanks(thanks)}
  `);

  const searchDoc = {
    path: page._path,
    title: page.title,
    text: searchTexts.join("\n"),
    keywords: keywords.join(" ")
  };

  return {htmlDoc, searchDoc};
}
