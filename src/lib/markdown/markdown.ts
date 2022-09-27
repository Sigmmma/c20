import Markdoc from "@markdoc/markdoc";
import yaml from "js-yaml";
import tagsConfig from "./tags";

export function parseMdDoc(mdSrc) {
  const ast = Markdoc.parse(mdSrc);
  const frontmatter = ast.attributes.frontmatter ?
    yaml.load(ast.attributes.frontmatter) as Record<string, unknown> :
    {};
  const content = Markdoc.transform(ast, {
    variables: {
      mykey: "value"
    },
    tagsConfig
  });
  return {content, frontmatter}
}

// export function renderMdDoc(mdSrc) {
//   const {content, frontmatter} = parseMdDoc(mdSrc);
//   // const html = Markdoc.renderers.html(content);
//   return {frontmatter, node};
// }