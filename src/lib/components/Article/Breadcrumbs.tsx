import {PageDataLite} from "..";
import {useLocalize} from "../Ctx/Ctx";

const localizations = {
  homeOverride: {
    en: "Home",
    es: "Página principal"
  }
};

export type BreadcrumbsProps = {
  parents: PageDataLite[];
};

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const localize = useLocalize(localizations);

  if (props.parents.length == 0) {
    return null;
  }

  return (
    <ol>
      {props.parents.map((crumbPage) => {
        //the homepage gets a special title to avoid repetition with the header
        const crumbPageTitle = crumbPage.pageId == "/" ?
          localize("homeOverride") :
          crumbPage.title;
        return <a href={crumbPage.url}>{crumbPageTitle}</a>;
      })}
    </ol>
  );
};

