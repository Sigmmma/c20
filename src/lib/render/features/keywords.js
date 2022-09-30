import * as R from "ramda";

module.exports = function(ctx, input) {
  return {
    keywords: R.pathOr([], ["keywords", ctx.lang], input.page)
  };
};
