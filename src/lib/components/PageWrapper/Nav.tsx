import Icon, { IconName } from "../Icon/Icon";
import {useLocalize} from "../Locale/Locale";
import {DISCORD_URL} from "../../utils/external-urls";
import {createPageLink, PageId, PageIndex} from "../../content/pages";
import MiniSearch from "minisearch";
import Search from "../Search/Search";
import {useState} from "preact/hooks";
import ThemeSelector from "./ThemeSelector";
import {joinClasses} from "../../utils/web";

const localizations = {
  siteName: {
    en: "The Reclaimers Library",
  },
  toc: {
    en: "Page contents",
  },
  children: {
    en: "Child pages",
  },
  main: {
    en: "Main topics",
  },
  menu: {
    en: "Menu",
  },
  discord: {
    en: "Chat on Discord",
  }
};

export type NavProps = {
  className?: string;
  pageId: string;
  themes?: {name: string, icon: IconName}[];
  initialTheme?: string;
  onThemeSelected?: (string) => void;
  searchIndex?: MiniSearch;
  pageIndex?: PageIndex;
  wrapperState: number;
  onMenuToggled: () => void;
  onSearchFocused: (focused: boolean) => void;
};

export default function Nav(props: NavProps) {
  const {localize} = useLocalize(localizations);

  const [expandedPages, setExpandedPages] = useState<Record<PageId, boolean>>({});

  const toggle = (pageId: string) => {
    setExpandedPages({...expandedPages, [pageId]: !expandedPages[pageId]});
  };

  return (
    <nav className={joinClasses("site-nav", props.className)}>
      <header className="nav-bar">
        <a className="c20-logo" title={localize("siteName")} href="/">
          <span className="c20-name">c20</span>
        </a>
        <div className="button-group">
          {props.themes &&
            <ThemeSelector
              themes={props.themes}
              initialValue={props.initialTheme!}
              onSelect={props.onThemeSelected!}
            />
          }
          <button className="nobg mobile-only" id="toggle-menu" title={localize("menu")} aria-label={localize("menu")} onClick={props.onMenuToggled}>
            <Icon name={props.wrapperState == 0 ? "file-text" : "search"}/>
          </button>
        </div>
      </header>
      <div className="nav-search">
        <Search
          currentSection={props.pageId == "/" ? "/" : "/" + props.pageId.split("/")[1]}
          onSearchFocused={props.onSearchFocused}
          searchIndex={props.searchIndex}
        />
      </div>
      <div className="nav-tree">
        {props.pageIndex && renderPageTree(props.pageId, "/", props.pageIndex, expandedPages, toggle)}
        <hr/>
        <div className="item-link">
          <a href={DISCORD_URL} target="_blank"><Icon name="message-circle"/>{localize("discord")}</a>
        </div>
      </div>
    </nav>
  );
}

function renderPageTree(currPageId: PageId, rootPageId: PageId, pageIndex: PageIndex, expandedPages: Record<PageId, boolean>, toggle: (pageId: PageId) => void) {
  const rootPageInfo = pageIndex[rootPageId];
  return (
    <ol>
      {rootPageInfo.children?.map((childPageId) => {
        const childPageInfo = pageIndex[childPageId];
        const isTopLevel = childPageId.lastIndexOf("/") == 0;
        const isParent = (currPageId + "/").startsWith(childPageId + "/");
        const isCurrent = currPageId == childPageId;
        const showPlus = !isTopLevel && !isParent && (childPageInfo.children?.length ?? 0) > 0;
        const isExpanded = isParent || expandedPages[childPageId];
        const link = createPageLink(pageIndex, childPageId)!;

        const liClasses: string[] = [];
        if (isParent || isCurrent) liClasses.push("active");
        liClasses.push(isTopLevel ? "top-level" : "nested");

        const pageItem = (
          <div className="nav-tree-label">
            <a className="item-link" href={link.url} aria-current={isCurrent ? "location" : undefined}>
              {!isTopLevel && <Icon name={link.icon}/>}
              {link.title}
            </a>
            {showPlus &&
              <button className="tree-expand" onClick={() => toggle(childPageId)}>
                <Icon name={expandedPages[childPageId] ? "chevron-up" : "chevron-down"}/>
              </button>
            }
          </div>
        );
        return (
          <li className={liClasses.join(" ")}>
            {pageItem}
            {isExpanded && renderPageTree(currPageId, childPageId, pageIndex, expandedPages, toggle)}
          </li>
        );
      })}
    </ol>
  );
}
