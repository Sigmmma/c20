import {RenderInput} from "../types";
import * as R from "ramda";
import { RenderContext } from "../../components/Ctx/Ctx";
const {renderMarkdownInline} = require("../../components");

function localizeThanks(ctx, thanks) {
  return R.mapObjIndexed((forLangs, to) => {
    const forMd = forLangs[ctx.lang];
    return forMd ? [renderMarkdownInline(ctx, forMd)] : [];
  }, thanks);
}

module.exports = function(ctx: RenderContext, input: RenderInput) {
  return {
    thanks: localizeThanks(ctx, R.propOr({}, "thanks", input.page))
  };
};
