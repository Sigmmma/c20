const {html} = require("common-tags");
const {wrapper, renderMarkdown, metabox, alert, anchor} = require("./shared");

function expandStructs(struct, tags) {
  const structs = struct.fields
    .filter(field => field.type == "TagReflexive" &&
      field.struct != "PredictedResource"
    )
    .map(field => tags[field.struct]);
  if (struct.inherits) {
    structs.push(tags[struct.inherits]);
  }
  return structs;
}

function getTagDependencies(tagStruct, tags, dbg) {
  if (!tagStruct) {
    return [];
  }
  let deps = new Set();
  let structStack = expandStructs(tagStruct, tags);
  while (structStack.length > 0) {
    const struct = structStack.pop();
    struct.fields
      .filter(field => field.type == "TagDependency")
      .flatMap(field => field.classes)
      .forEach(tagClass => deps.add(tagClass));
    structStack = [
      ...structStack,
      ...expandStructs(struct, tags)
    ];
  }
  return [...deps].sort();
}

module.exports = (page, metaIndex) => {
  const tagClassSnake = page._dir[page._dir.length - 1];
  const tagClassPascal = page.tagClass || tagClassSnake
    .split("_")
    .map(part => `${part[0].toUpperCase()}${part.substring(1)}`)
    .join("");

  const tagStruct = metaIndex.tags[tagClassPascal];
  if (!tagStruct) {
    console.warn(`Failed to find tag structure for ${page.title}`);
  }

  const tagDependencies = getTagDependencies(tagStruct, metaIndex.tags);

  const tagDependenciesHtml = tagDependencies.length > 0 ? html`
    <p>Dependencies:</p>
    <ul>
      ${tagDependencies.map(tagClass => {
        if (tagClass == "*") {
          //sound, effect, damage effect, sound looping, model animations, actor variants, and objects
          return html`<li>(any tags referenced by scripts)</li>`;
        } else {
          const tagPageUrl = `/blam/tags/${tagClass}`;
          return html`<li>${anchor(tagPageUrl, tagClass)}</li>`;
        }
      })}
    </ul>
  ` : html`
    <p>Dependencies: None</p>
  `;

  const invaderSrcReference = `https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition/${tagClassSnake}.json`;

  const metaboxOpts = {
    ...page,
    metaTitle: `\u{1F3F7} ${tagClassSnake} (tag)`,
    metaColour: "#530000",
    mdFooter: metaIndex.mdFooter,
    mdSections: [
      page.info
    ],
    htmlSections: [
      tagDependenciesHtml
    ]
  };

  return wrapper(page, metaIndex, html`
    ${metabox(metaboxOpts)}
    ${renderMarkdown(page._md, metaIndex.mdFooter)}
    <h1 id="tag-structure">
      Tag structure
      <a href="#tag-structure" class="header-anchor">#</a>
    </h1>
    ${alert({type: "info", body: html`
      <p>
        Tag structures are not yet built into this wiki, but you can find a reference for this tag in
        <a href="${invaderSrcReference}">Invader's source</a>.
      </p>
    `})}
  `);
};
