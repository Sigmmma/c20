import Icon, { IconName } from "../Icon/Icon";
import {useLocalize} from "../Locale/Locale";
import {DISCORD_URL} from "../../utils/external-urls";
import localizations from "./localizations";
import { PageTree } from "../../content";
import MiniSearch from "minisearch";
import Search from "../Search/Search";
import { useState } from "preact/hooks";
import ThemeSelector from "../PageWrapper/ThemeSelector";

export type NavProps = {
  pageId: string;
  themes?: {name: string, icon: IconName}[];
  initialTheme?: string;
  onThemeSelected?: (string) => void;
  searchIndex?: MiniSearch;
  pageTree?: PageTree;
  wrapperState: number;
  onMenuToggled: () => void;
  onTocToggled: () => void;
  onSearchFocused: (focused: boolean) => void;
};

function toggle(pageId: string, expandedPages: object): object {
  return {...expandedPages, [pageId]: !expandedPages[pageId]};
}

function renderPageTree(currPageId: string, pageTree: PageTree, expandedPages: object, setExpandedPages: (newVal: object) => void) {
  return (
    <ol>
      {pageTree.map(({link, children}) => {
        const isTopLevel = link.pageId.lastIndexOf("/") == 0;
        const isParent = (currPageId + "/").startsWith(link.pageId + "/");
        const isCurrent = currPageId == link.pageId;
        const showPlus = !isTopLevel && !isParent && children.length > 0;
        const isExpanded = isParent || expandedPages[link.pageId];

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
              <button className="tree-expand" onClick={() => setExpandedPages(toggle(link.pageId, expandedPages))}>
                <Icon name={expandedPages[link.pageId] ? "chevron-up" : "chevron-down"}/>
              </button>
            }
          </div>
        );
        return (
          <li className={liClasses.join(" ")}>
            {pageItem}
            {isExpanded && renderPageTree(currPageId, children, expandedPages, setExpandedPages)}
          </li>
        );
      })}
    </ol>
  );
}

export default function Nav(props: NavProps) {
  const {localize} = useLocalize(localizations);

  const [expandedPages, setExpandedPages] = useState<object>({});

  return (
    <nav className="wrapper-nav">
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
          <button className="nobg mobile-only" id="toggle-menu" title={localize("menu")} onClick={props.onMenuToggled}>
            <Icon name={props.wrapperState == 0 ? "file-text" : "search"}/>
          </button>
          <button className="nobg mobile-only" id="toggle-toc" title={localize("toc")} onClick={props.onTocToggled}>
            <Icon name={props.wrapperState == 2 ? "file-text" : "list"}/>
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
        {props.pageTree && renderPageTree(props.pageId, props.pageTree, expandedPages, setExpandedPages)}
        <hr/>
        <div className="item-link">
          <a href={DISCORD_URL} target="_blank"><Icon name="message-circle"/>{localize("discord")}</a>
        </div>
      </div>
    </nav>
  );
}