import {slugify} from "../../utils/strings";
import {joinClasses} from "../../utils/web";
import {VNode} from "preact";

const TOC_LEVELS = 2;

export type NavHeading = {level: number, title: string, id?: string, sub: NavHeading[]};

export interface TableOfContentsProps {
  id?: string;
  heading?: VNode;
  navHeadings: NavHeading[];
  style: "sidebar" | "inline";
}

export default function TableOfContents(props: TableOfContentsProps) {
  return (
    <nav id={props.id} className={joinClasses("toc", props.style)}>
      {props.heading}
      {renderSub(1, props.navHeadings)}
    </nav>
  );
}

function renderSub(level: number, sub: NavHeading[]) {
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
}