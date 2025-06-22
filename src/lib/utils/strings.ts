import * as R from "ramda";

//converts a title into a URL- or ID-friendly slug
export function slugify(title?: string, allowUnderscore?: boolean): string | undefined {
  return title ? title
    .toLowerCase()
    .replace(/[']/g, "")
    .replace(allowUnderscore ? /[^\p{L}0-9_]/gu : /[^\p{L}0-9]/gu, " ")
    .split(" ")
    .filter(part => part.length > 0)
    .join("-") : undefined;
}

//returns length of common prefix of two strings
export function commonLength(strA: string, strB: string): number {
  let len = 0;
  while (len < strA.length && len < strB.length) {
    if (strA[len] != strB[len]) break;
    len++;
  }
  return len;
}

export function addBreaks<T>(content: string | undefined, replacement: T): (string | T)[] {
  if (!content) return [];
  if (content.length < 10) return [content];
  return R.pipe(
    //split to tokens
    R.split(" "),
    //map each token to an array of itself or a series of nodes
    R.map(token => {
      return token.length < 10 ?
        [token] :
        R.flatten(R.intersperse(["_", replacement], token.split("_")));
    }),
    //re-add the spaces between tokens
    R.intersperse(" "),
    //collapse multi-node tokens
    R.flatten,
  )(content);
}