/* Exposes an array of async feature functions, which when given a render context
 * return an object containing render outputs:
 *
 * - keywords: search-boosted array of terms
 * - searchText: plaintext string to become searchable for this page
 * - html: added to the body of the article wrapper
 * - headings: array of {id, title, level} used to form table of contents
 * - metaTitle: title content of metabox
 * - metaSections: array of {cssClass, body} to appear as metabox sections
 * - img: image path for metabox
 * - imgCaption: caption for metabox
 *
 * The order of features determines order on the page.
 */
module.exports = [
  require("./alerts"),
  require("./metaboxBase"),
  require("./workflows"),
  require("./markdownFile"),
  require("./survey/results"),
  require("./tagIndex"),
  require("./tag"),
  require("./thanks"),
  require("./thanksIndex"),
];
