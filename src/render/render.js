const {
  detailsList, anchor, metabox, ul, wrapper, renderMarkdown, defAnchor,
  html, alert, thanks: renderThanks, REPO_URL, heading, tagAnchor
} = require("./shared");
const R = require("ramda");
const tagsTable = require("./tag/tagsTable");
const renderTagStructure = require("./tag/tagStructure");

const STUB_ALERT = {type: "danger", body: html`
  <p>🚧 This article is a stub. You can help expand it by submitting content in
  pull requests or issues in this wiki's <a href="${REPO_URL}">source repo</a>.</p>
`};

module.exports = (page, metaIndex) => {
  let thanks = [];
  let alertProps = [];
  let keywords = page.keywords || [];
  let searchTexts = [renderMarkdown(page._md, metaIndex, true)];
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

  if (page.stub) {
    alertProps.push(STUB_ALERT);
  }

  if (page.thanks) {
    thanks = thanks.concat(page.thanks);
  }

  if (page.toolName) {
    metaboxProps.metaTitle = `\u{1F527} Tool: ${page.toolName}`;
    metaboxProps.metaClass = "content-tool";

    const toolInfo = metaIndex.data.h1.getToolInfoByName(page.toolName);
    if (toolInfo) {
      if (toolInfo.authors && toolInfo.authors.length > 0) {
        metaboxProps.sections.push({
          body: detailsList("Authors", toolInfo.authors)
        });
      }
    }

    const similarToolsNames = metaIndex.data.h1.getSimilarToolNames(page.toolName);
    if (similarToolsNames.length > 0) {
      metaboxProps.sections.push({
        cssClass: "content-tool-minor",
        body: detailsList("Similar to", similarToolsNames.map(otherToolName => {
          const otherToolInfo = metaIndex.data.h1.getToolInfoByName(otherToolName);
          const otherToolUrl = otherToolInfo.url || metaIndex.resolveUrl(otherToolInfo.page, otherToolInfo.heading);
          return anchor(otherToolUrl, otherToolName);
        }))
      });
    }

    const workflows = metaIndex.data.h1.getToolWorkflows(page.toolName);
    if (workflows.length > 0) {
      metaboxProps.sections.push({
        body: detailsList(
          "Workflows",
          workflows.map(flow => {
            if (flow.edit) {
              const editResourceInfo = metaIndex.data.h1.getResourceInfoByName(flow.edit);
              const editResourceUrl = editResourceInfo.url || metaIndex.resolveUrl(editResourceInfo.page, editResourceInfo.heading);
              return `Edit ${anchor(editResourceUrl, flow.edit)}`;
            } else if (flow.from && flow.to) {
              const fromResourceInfo = metaIndex.data.h1.getResourceInfoByName(flow.from);
              const fromResourceUrl = fromResourceInfo.url || metaIndex.resolveUrl(fromResourceInfo.page, fromResourceInfo.heading);
              const toResourceInfo = metaIndex.data.h1.getResourceInfoByName(flow.to);
              const toResourceUrl = toResourceInfo.url || metaIndex.resolveUrl(toResourceInfo.page, toResourceInfo.heading);
              return `${anchor(fromResourceUrl, flow.from)} to ${anchor(toResourceUrl, flow.to)}`;
            }
            throw new Error(`Cannot render unhandled workflow: ${JSON.stringify(flow)}`);
          })
        )
      });
    }
  }

  if (page.tagName) {
    const tag = metaIndex.data.h1.tagsByName[page._slug];
    if (!tag) {
      throw new Error(`Failed to find tag structure for ${page.title}`);
    }

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
      const {headings, htmlResult} = renderTagStructure(tag, metaIndex)
      articleBodySections.push(htmlResult);
      wrapperProps._headers = [
        ...wrapperProps._headers,
        ...headings
      ];
    }

    thanks = thanks.concat(metaIndex.data.h1.tagThanks);
  }

  const resourceName = page.resourceName || page.tagName;
  if (resourceName) {
    const workflows = metaIndex.data.h1.getResourceWorkflows(resourceName);
    if (workflows.length > 0) {
      metaboxProps.sections.push({
        cssClass: "content-tool-minor",
        body: detailsList(
          "Workflows",
          workflows.map(flow => {
            const toolInfo = metaIndex.data.h1.getToolInfoByName(flow.toolName);
            const toolPageUrl = toolInfo.url || metaIndex.resolveUrl(toolInfo.page, toolInfo.heading);
            const toolLink = anchor(toolPageUrl, flow.toolName);
            if (flow.edit) {
              return `Edit with ${toolLink}`;
            } else if (flow.from && flow.to) {
              const fromResourceInfo = metaIndex.data.h1.getResourceInfoByName(flow.from);
              const fromResourceUrl = fromResourceInfo.url || metaIndex.resolveUrl(fromResourceInfo.page, fromResourceInfo.heading);
              const fromAnchor = anchor(fromResourceUrl, flow.from);
              const toResourceInfo = metaIndex.data.h1.getResourceInfoByName(flow.to);
              const toResourceUrl = toResourceInfo.url || metaIndex.resolveUrl(toResourceInfo.page, toResourceInfo.heading);
              const toAnchor = anchor(toResourceUrl, flow.to);
              //use &nbsp; to join words for better appearance on narrow windows
              if (flow.from == resourceName) {
                return `To&nbsp;${toAnchor} with&nbsp;${toolLink}`;
              } else if (flow.to == resourceName) {
                return `From&nbsp;${fromAnchor} with&nbsp;${toolLink}`;
              } else {
                return `From&nbsp;${fromAnchor} to&nbsp;${toAnchor} with&nbsp;${toolLink}`;
              }
            }
          })
        )
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
