//converts a title into a URL- or ID-friendly slug
export function slugify(title?: string) {
  return title ? title
    .toLowerCase()
    .replace(/[']/g, "")
    .replace(/[^\p{L}0-9]/gu, " ")
    .split(" ")
    .filter(part => part.length > 0)
    .join("-") : undefined;
};

//returns length of common prefix of two strings
export function commonLength(strA: string, strB: string): number {
  let len = 0;
  while (len < strA.length && len < strB.length) {
    if (strA[len] != strB[len]) break;
    len++;
  }
  return len;
}