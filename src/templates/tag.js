const {html, wrapper, renderMarkdown, metabox, alert, tagAnchor, ul, heading} = require("./shared");

const INVADER_TAG_BASE = "https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition";

module.exports = (page, metaIndex) => {
  const tag = metaIndex.data.h1.tagsByName[page._slug];
  if (!tag) {
    throw new Error(`Failed to find tag structure for ${page.title}`);
  }

  const metaboxHtmlSections = [
    html`<p>Tag ID: <strong>${tag.id}</strong></p>`
  ];

  let refDetailElements = [];
  let refLevel = tag;
  while (refLevel) {
    if (refLevel.references.length > 0) {
      const isDirect = refLevel.name == tag.name;
      const refLevelSummary = isDirect ?
        "Direct references" :
        `${tagAnchor(refLevel, metaIndex)} references`;

      refDetailElements.push(html`
        <details${isDirect ? " open" : ""}>
          <summary>${refLevelSummary}</summary>
          ${ul(refLevel.references.map(refTag => {
            if (refTag === "*") {
              //sound, effect, damage effect, sound looping, model animations, actor variants, and objects
              return "(any tags referenced by scripts)";
            } else {
              return tagAnchor(refTag, metaIndex);
            }
          }))}
        </details>
      `);
    }
    refLevel = refLevel.parent;
  }

  if (refDetailElements.length > 0) {
    metaboxHtmlSections.push(refDetailElements.join("\n"));
  }

  //todo: referenced by
  if (tag.referencedBy.length > 0) {
    metaboxHtmlSections.push(html`
      <details open>
        <summary>Referenced by</summary>
        ${ul(tag.referencedBy.map(otherTag => tagAnchor(otherTag, metaIndex)))}
      </details>
    `);
  }

  if (tag.parent) {
    metaboxHtmlSections.push(
      html`<p>Parent tag: ${tagAnchor(tag.parent, metaIndex)}</p>`
    );
  }

  if (tag.children.length > 0) {
    metaboxHtmlSections.push(html`
      <details>
        <summary>Child tags</summary>
        ${ul(tag.children.map(childTag => tagAnchor(childTag, metaIndex)))}
      </details>
    `);
  }

  const metaboxOpts = {
    ...page,
    metaTitle: `\u{1F3F7} ${tag.name} (tag)`,
    metaColour: "#530000",
    metaIndex,
    mdSections: [
      page.info
    ],
    htmlSections: metaboxHtmlSections
  };

  //because we're adding headers to the page, should update the headers list for ToC
  const pageMetaForWrapper = {
    ...page,
    _headers: [
      ...page._headers,
      ...(!tag.invaderStructName ? [] : [
        {title: "Tag structure", id: "tag-structure", level: 1}
      ])
    ]
  };

  const htmlDoc = wrapper(pageMetaForWrapper, metaIndex, html`
    ${metabox(metaboxOpts)}
    ${tag.unused && alert("danger", html`
      <p>
        <strong>This tag is unused!</strong><br/>
        Although references to it exist in the engine or tools, it was removed during Halo's development.
      </p>
    `)}
    ${renderMarkdown(page._md, metaIndex)}
    ${tag.invaderStructName && html`
      ${heading("h1", "Tag structure")}
      ${alert("info", html`
        <p>
          Tag structures are not yet built into this wiki, but you can find a reference for this tag in
          <a href="${INVADER_TAG_BASE}/${tag.name}.json">Invader's source</a>.
        </p>
      `)}
    `}
  `);

  const searchDoc = {
    path: page._path,
    title: page.title,
    text: renderMarkdown(page._md, metaIndex, true)
  };

  return {htmlDoc, searchDoc};
};
