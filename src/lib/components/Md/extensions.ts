import {RenderContext} from "../Ctx/Ctx";

type PlaintextRenderer = (children: string, attributes: Record<string, any>, ctx: RenderContext | undefined) => string | undefined;
type Extension = {
  plaintext?: PlaintextRenderer;
  //todo
  headings?: any;
  dependencies?: any;
};

const extensions: Record<string, Extension> = {
  pre: {

  }
};

export default extensions;