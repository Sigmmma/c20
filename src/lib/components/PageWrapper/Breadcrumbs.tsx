import {useCtx, useLocalize} from "../Ctx/Ctx";

const localizations = {
  homeOverride: {
    en: "Home",
    es: "Página principal"
  }
};

export default function Breadcrumbs() {
  const ctx = useCtx();
  const localize = useLocalize(localizations);
  const breadcrumbs: any[] = [];
  let currPage = ctx.page;

  while (currPage.parent) {
    currPage = currPage.parent;
    breadcrumbs.push(currPage);
  }

  if (breadcrumbs.length == 0) {
    return null;
  }

  return (
    <ol>
      {breadcrumbs.reverse().map((crumbPage) => {
        //the homepage gets a special title to avoid repetition with the header
        const crumbPageTitle = crumbPage.parent ?
          crumbPage.tryLocalizedTitle(ctx.lang) :
          localize("homeOverride");
        return <a href={crumbPage.tryLocalizedPath(ctx.lang)}>{crumbPageTitle}</a>;
      })}
    </ol>
  );
};

