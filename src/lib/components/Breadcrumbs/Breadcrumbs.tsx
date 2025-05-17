import {PageLink} from "../../content/pages";

export type BreadcrumbsProps = {
  parents: PageLink[];
};

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs">
      <ol>
        {props.parents.map((crumbPage) =>
          <li><a href={crumbPage.url}>{crumbPage.title}</a></li>
        )}
      </ol>
    </nav>
  );
};

