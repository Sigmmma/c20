import {type PageLink} from "../../content";

export type BreadcrumbsProps = {
  parents: PageLink[];
};

export default function Breadcrumbs(props: BreadcrumbsProps) {
  if (props.parents.length == 0) {
    return null;
  }

  return (
    <ol>
      {props.parents.map((crumbPage) =>
        <li><a href={crumbPage.url}>{crumbPage.title}</a></li>
      )}
    </ol>
  );
};

