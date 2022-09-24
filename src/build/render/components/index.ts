export {default as PageWrapper} from "./PageWrapper/PageWrapper";
export {default as Ctx} from "./Ctx/Ctx";
export * from "./markdown";
export * from "./bits";
export * from "./structs";

export type RawHtml = string;
export type MdSrc = string;

/* This helps us shim legacy raw HTML components into TSX.
 * It should go away when we're done migrating.
 */
export function rawHelper(rawHtml: RawHtml) {
  return {
    dangerouslySetInnerHTML: {__html: rawHtml}
  };
}