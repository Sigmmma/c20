import * as R from "ramda";
const {heading, html, ul} = require("../components");
import {slugify} from "../utils/strings";
import {localizer} from "../utils/localization";

const localizations = {
  headingText: {
    en: "Thank you!",
    es: "Gracias!"
  }
};

module.exports = function(ctx, input) {
  const {pageIndex: {pages}, page} = input;
  const {lang} = ctx;
  if (!page.thanksIndex) return {};

  const localize = localizer(localizations, lang);
  const headingText = localize("headingText");

  let allThanks = new Set();

  for (let page of Object.values(pages)) {
    const recipients = R.pipe(
      R.propOr({}, "thanks"),
      R.keys
    )(page);

    for (let recipient of recipients) {
      allThanks.add(recipient);
    }
  }

  // for (let recipient of Object.keys(data.h1.tagThanks)) {
  //   allThanks.add(recipient);
  // }

  //convert to an array and sort alphabetically
  allThanks = [...allThanks];
  allThanks.sort((a, b) => a.localeCompare(b));

  return {
    html: html`
      ${heading("h2", headingText)}
      ${ul(allThanks)}
    `,
    headings: [{level: 2, id: slugify(headingText), title: headingText}],
  };
};
