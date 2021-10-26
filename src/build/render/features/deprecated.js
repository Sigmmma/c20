module.exports = async function(ctx) {
  if (ctx.page.alerts) {
    throw new Error(`Page ${ctx.page.pageId} is using the deprecated YAML alerts feature. Use inline markdown alerts instead.`);
  }

  return {};
};
