import Markdoc, {type Node, RenderableTreeNode, ValidateError} from "@markdoc/markdoc";
import fm, {FrontMatterResult} from "front-matter";
import yaml from "js-yaml";
import tagsConfig from "./tags";
import nodesConfig from "./nodes";
import {type RenderContext} from "../components/Ctx/Ctx";
import {Lang} from "../utils/localization";
export {default as renderPlaintext} from "../components/Md/plaintext";

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

export function parseSplit<F=any>(mdSrc: MdSrc): FrontMatterResult<F> {
  return fm(mdSrc);
}

export function parse<F=any>(mdSrc: MdSrc, fileName?: string): ParseResult<F> {
  const ast = Markdoc.parse(mdSrc, fileName);
  const frontmatter = ast.attributes.frontmatter ?
    yaml.load(ast.attributes.frontmatter) as F :
    undefined;
  return {ast, frontmatter};
}

export function transform<F=any>(ast: Node, ctx: RenderContext | undefined, lang: Lang, frontmatter?: F): RenderableTreeNode | undefined {
  const config = {
    variables: {
      ...frontmatter
    },
    ctx,
    lang,
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
