import {slugify} from "../../utils/strings";
import {useLocalize} from "../Ctx/Ctx";
import Icon from "../Icon/Icon";

const TOC_LEVELS = 2;

const localizations = {
  toc: {
    en: "Page contents",
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
  const localize = useLocalize(localizations);
  return (
    <div className="sidebar-toc">
      <h2 id="table-of-contents"><Icon name="list"/> {localize("toc")}</h2>
      {renderSub(1, props.headings)}
    </div>
  );
};
