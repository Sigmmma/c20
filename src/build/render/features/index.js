/* Exposes an array of async feature functions, which when given a render context
 * return an object containing render outputs:
 *
 * - keywords: search-boosted array of terms
 * - searchText: plaintext string to become searchable for this page
 * - html: added to the body of the article wrapper
 * - plaintext: used to build plaintext preview (og:description)
 * - headings: array of {id, title, level} used to form table of contents
 * - metaTitle: title content of metabox
 * - metaSections: array of {cssClass, body} to appear as metabox sections
 * - img: image path for metabox
 * - imgCaption: caption for metabox
 * - thanks: added to the credits section at end of page, {name: [forText, ...], ...}
 *
 * The order of features determines order on the page and precedence of metaTitle, etc.
 */
module.exports = [
  require("./deprecated"),
  require("./stub"),
  require("./metaboxBase"),
  require("./markdownFile"),
  require("./survey/results"),
  require("./tagIndex"),
  require("./tag"),
  require("./workflows"),
  require("./thanks"),
  require("./keywords"),
  require("./thanksIndex"),
];
