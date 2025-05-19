import {PageIndex} from "../../content/pages";
import {ComponentChildren} from "preact";
import {useState} from "preact/hooks";
import Nav from "./Nav";
import {IconName} from "../Icon/names";
import MiniSearch from "minisearch";

const wrapperStateClasses = ["menu-view", "body-view"];

export type PageWrapperProps = {
  pageId: string;
  pageIndex?: PageIndex;
  searchIndex?: MiniSearch;
  themes?: {name: string, icon: IconName}[];
  initialTheme?: string;
  onThemeSelected?: (string) => void;
  children?: ComponentChildren;
};

export default function PageWrapper(props: PageWrapperProps) {
  const [wrapperState, setWrapperState] = useState<0 | 1>(1);

  const onMenuToggled = () => {
    setWrapperState(wrapperState != 0 ? 0 : 1);
  };

  const onSearchFocused = (focused) => {
    setWrapperState(focused ? 0 : 1);
  };

  return (
    <div className={`page-wrapper ${wrapperStateClasses[wrapperState] ?? "body-view"}`}>
      <Nav
        className="wrapper-nav"
        pageId={props.pageId}
        pageIndex={props.pageIndex}
        wrapperState={wrapperState}
        onMenuToggled={onMenuToggled}
        onSearchFocused={onSearchFocused}
        themes={props.themes}
        initialTheme={props.initialTheme}
        onThemeSelected={props.onThemeSelected}
        searchIndex={props.searchIndex}
      />
      <main role="main" className="wrapper-body">
        {props.children}
      </main>
    </div>
  );
};
