import Markdoc, { ValidateError } from "@markdoc/markdoc";
import yaml from "js-yaml";
import tagsConfig from "./tags";

export class ValidationError extends Error {
  readonly errors: ValidateError[];
  constructor(errors: ValidateError[]) {
    super();
    this.errors = errors;
  }
}

export function parseMdDoc(mdSrc) {
  const ast = Markdoc.parse(mdSrc);
  const frontmatter = ast.attributes.frontmatter ?
    yaml.load(ast.attributes.frontmatter) as Record<string, unknown> :
    {};
  const config = {
    variables: {
      ...frontmatter
    },
    tags: tagsConfig
  };
  const errors = Markdoc.validate(ast, config);
  if (errors && errors.length > 0) {
    throw new ValidationError(errors);
  }

  const content = Markdoc.transform(ast, config);
  return {content, frontmatter}
}

// export function renderMdDoc(mdSrc) {
//   const {content, frontmatter} = parseMdDoc(mdSrc);
//   // const html = Markdoc.renderers.html(content);
//   return {frontmatter, node};
// }