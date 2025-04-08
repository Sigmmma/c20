import {type PageTree} from "../../content";
import {type ComponentChildren} from "preact";
import { useState } from "preact/hooks";
import TableOfContents, {type NavHeading} from "../Article/TableOfContents";
import Nav from "../Nav/Nav";
import { IconName } from "../Icon/names";
import MiniSearch from "minisearch";

const wrapperStateClasses = ["menu-view", "body-view", "toc-view"];

export type PageWrapperProps = {
  pageId: string;
  navHeadings?: NavHeading[];
  pageTree?: PageTree;
  searchIndex?: MiniSearch;
  themes?: {name: string, icon: IconName}[];
  initialTheme?: string;
  onThemeSelected?: (string) => void;
  children?: ComponentChildren;
};

export default function PageWrapper(props: PageWrapperProps) {
  const [wrapperState, setWrapperState] = useState<number>(1);

  const onMenuToggled = () => {
    setWrapperState(wrapperState != 0 ? 0 : 1);
  };

  const onTocToggled = () => {
    setWrapperState(wrapperState != 2 ? 2 : 1);
  };

  const onSearchFocused = (focused) => {
    setWrapperState(focused ? 0 : 1);
  };

  const onTocHeadingClicked = () => {
    setWrapperState(1);
  }

  return (
    <div className={`wrapper ${wrapperStateClasses[wrapperState] ?? "body-view"}`}>
      <Nav
        pageId={props.pageId}
        pageTree={props.pageTree}
        wrapperState={wrapperState}
        onMenuToggled={onMenuToggled}
        onTocToggled={onTocToggled}
        onSearchFocused={onSearchFocused}
        themes={props.themes}
        initialTheme={props.initialTheme}
        onThemeSelected={props.onThemeSelected}
        searchIndex={props.searchIndex}
      />
      <div className="wrapper-toc">
        {props.navHeadings && props.navHeadings.length > 0 &&
          <TableOfContents
            headings={props.navHeadings}
            onHeadingClicked={onTocHeadingClicked}
          />
        }
      </div>
      <main role="main" className="wrapper-body">
        {props.children}
      </main>
    </div>
  );
};
