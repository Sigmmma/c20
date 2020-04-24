const {html, wrapper, renderMarkdown, metabox, alert, anchor} = require("./shared");

function expandStructs(parentedStruct, tags) {
  const {struct, parentName} = parentedStruct;
  const results = struct.fields
    .filter(field => field.type == "TagReflexive" &&
      field.struct != "PredictedResource"
    )
    .map(field => ({struct: tags[field.struct], parentName}));
  if (struct.inherits) {
    results.push({
      struct: tags[struct.inherits],
      parentName: struct.inherits
    });
  }
  return results;
}

function getTagDependencies(tagStruct, tags) {
  if (!tagStruct) {
    return [];
  }

  const resultsLevels = [];
  let structStack = [{struct: tagStruct, parentName: null}];

  while (structStack.length > 0) {
    const parentedStruct = structStack.pop();
    const {struct, parentName} = parentedStruct;
    struct.fields
      .filter(field => field.type == "TagDependency")
      .flatMap(field => field.classes)
      .forEach(tagClass => {
        const resultLevel = resultsLevels.find(level => level.parentName == parentName);
        if (resultLevel) {
          resultLevel.deps.add(tagClass);
        } else {
          resultsLevels.push({parentName, deps: new Set([tagClass])});
        }
      });
    structStack = [
      ...structStack,
      ...expandStructs(parentedStruct, tags)
    ];
  }
  return resultsLevels.map(({parentName, deps}) => ({
    parentName,
    deps: [...deps].sort()
  }));
}

module.exports = (page, metaIndex) => {
  const tagClassSnake = page._pathParts[page._pathParts.length - 1];
  const tagClassPascal = page.tagClass || tagClassSnake
    .split("_")
    .map(part => `${part[0].toUpperCase()}${part.substring(1)}`)
    .join("");

  const tagStruct = metaIndex.tags[tagClassPascal];
  if (!tagStruct) {
    console.warn(`Failed to find tag structure for ${page.title}`);
  }

  const tagDependencies = getTagDependencies(tagStruct, metaIndex.tags);

  const tagDependencySections = tagDependencies.map(depLevel => {
    let parentTagClass = null;
    let parentPage = null;

    if (depLevel.parentName) {
      parentTagClass = depLevel.parentName.toLowerCase();
      parentPage = metaIndex.pages.find(page => page._slug == parentTagClass);
    }

    return html`
      <p>
        <details${depLevel.parentName ? "" : " open"}>
          <summary>${parentPage ? anchor(parentPage._path, parentTagClass) : "Direct"} references</summary>
          <ul>
            ${depLevel.deps.map(tagClass => {
              if (tagClass == "*") {
                //sound, effect, damage effect, sound looping, model animations, actor variants, and objects
                return html`<li>(any tags referenced by scripts)</li>`;
              } else {
                const tagPage = metaIndex.pages.find(page => page._slug == tagClass);
                if (tagPage) {
                  return html`<li>${anchor(tagPage._path, tagClass)}</li>`;
                }
                console.warn(`Unable to find the tag page for tag class ${tagClass}`);
                return html`<li>${tagClass}</li>`;
              }
            })}
          </ul>
        </details>
      </p>
    `;
  });

  const invaderSrcReference = `https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition/${tagClassSnake}.json`;

  const metaboxOpts = {
    ...page,
    metaTitle: `\u{1F3F7} ${tagClassSnake} (tag)`,
    metaColour: "#530000",
    metaIndex,
    mdSections: [
      page.info
    ],
    htmlSections: [
      ...tagDependencySections
    ]
  };

  //because we're adding headers to the page, should update the headers list for ToC
  const pageMetaForWrapper = {
    ...page,
    _headers: [
      ...page._headers,
      {title: "Tag structure", id: "tag-structure", level: 1}
    ]
  };

  return wrapper(pageMetaForWrapper, metaIndex, html`
    ${metabox(metaboxOpts)}
    ${renderMarkdown(page._md, metaIndex)}
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
