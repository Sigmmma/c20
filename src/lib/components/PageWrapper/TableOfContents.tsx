import {slugify} from "../../utils/strings";
import Icon from "../Icon/Icon";
import {useLocalize} from "../Locale/Locale";

const TOC_LEVELS = 2;

const localizations = {
  toc: {
    en: "On this page",
    es: "En esta página"
  },
};

export type NavHeading = {level: number, title: string, id?: string, sub: NavHeading[]};
export type TableOfContentsProps = {
  headings: NavHeading[];
};

const renderSub = (level: number, sub: NavHeading[]) => {
  return sub.length == 0 || level > TOC_LEVELS ? null : (
    <ol>
      {sub.map((hdg, i) =>
        <li key={i}>
          <a href={`#${hdg.id ?? slugify(hdg.title)}`}>{hdg.title}</a>
          {renderSub(level + 1, hdg.sub)}
        </li>
      )}
    </ol>
  );
};

export default function TableOfContents(props: TableOfContentsProps) {
  const {localize} = useLocalize(localizations);
  return (
    <aside class="sidebar-toc">
      <nav class="sidebar-toc-inner nav-list">
        <h2 id="table-of-contents">{localize("toc")}</h2>
        {renderSub(1, props.headings)}
      </nav>
    </aside>
  );
};
