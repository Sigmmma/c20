import Markdoc, {type Node, RenderableTreeNode, ValidateError} from "@markdoc/markdoc";
import yaml from "js-yaml";
import tagsConfig from "./tags";
import nodesConfig from "./nodes";
import {RenderContext} from "../Ctx/Ctx";
export {default as renderPlaintext} from "./plaintext";

export type MdSrc = string;

export class InvalidMarkdownError extends Error {
  readonly errors: ValidateError[];
  constructor(errors: ValidateError[]) {
    super();
    this.errors = errors;
  }
}

export type ParseResult<F> = {
  ast: Node;
  frontmatter?: F;
};

export function parse<F=any>(mdSrc: MdSrc, fileName?: string): ParseResult<F> {
  const ast = Markdoc.parse(mdSrc, fileName);
  const frontmatter = ast.attributes.frontmatter ?
    yaml.load(ast.attributes.frontmatter) as F :
    undefined;
  return {ast, frontmatter};
}

export function transform<F=any>(ast: Node, ctx: RenderContext | undefined, frontmatter?: F): RenderableTreeNode | undefined {
  const config = {
    variables: {
      ...frontmatter
    },
    ctx,
    tags: tagsConfig,
    nodes: nodesConfig,
  };
  const errors = Markdoc.validate(ast, config);
  if (errors && errors.length > 0) {
    console.warn(errors);
    throw new InvalidMarkdownError(errors);
  }
  const content = Markdoc.transform(ast, config) ?? undefined;
  return content;
}

// export function renderMdDoc(mdSrc) {
//   const {content, frontmatter} = parseMdDoc(mdSrc);
//   // const html = Markdoc.renderers.html(content);
//   return {frontmatter, node};
// }