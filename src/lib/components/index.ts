import {VNode} from "preact";
import renderToString from "preact-render-to-string";
export {default as PageWrapper} from "./PageWrapper/PageWrapper";
export {default as Ctx} from "./Ctx/Ctx";

export type PageDataLite = {
  title: string;
  url: string;
  pageId: string;
};

/**
 * This helps us shim legacy raw HTML components into TSX.
 * @deprecated
 */
export function rawHelper(rawHtml: string) {
  return {
    dangerouslySetInnerHTML: {__html: rawHtml}
  };
};

/**
 * This helps us shim TSX components into legacy HTML.
 * @deprecated
 */
export function preactHelper(node: VNode) {
  return renderToString(node);
};