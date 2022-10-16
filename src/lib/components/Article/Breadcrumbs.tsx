import {type PageLink} from "../../content";
import {useLocalize} from "../Ctx/Ctx";

const localizations = {
  homeOverride: {
    en: "Home",
    es: "Página principal"
  }
};

export type BreadcrumbsProps = {
  parents: PageLink[];
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
        return <li><a href={crumbPage.url}>{crumbPageTitle}</a></li>;
      })}
    </ol>
  );
};

