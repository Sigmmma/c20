import Icon from "../Icon/Icon";
import {useCtx} from "../Ctx/Ctx";
import {type PageLink, type NavTree} from "../../content";
import {type ComponentChildren} from "preact";
import {DISCORD_URL} from "../../utils/external-urls";
import localizations from "./localizations";
import {useLocalize} from "../Locale/Locale";
import TableOfContents, {type NavHeading} from "../Article/TableOfContents";

export type PageWrapperProps = {
  title?: string;
  navHeadings?: NavHeading[];
  navTree?: NavTree;
  children?: ComponentChildren;
};

function renderPageTree(pageId: string, navTree: NavTree) {
  return (
    <ol>
      {navTree.map(({link, children}) => {
        const isParent = (pageId + "/").startsWith(link.pageId + "/");
        const isCurrent = pageId == link.pageId;
        const showPlus = !isParent && children.length > 0;
        const pageItem = (
          <a className="item-link" href={link.url} aria-current={isCurrent ? "location" : undefined}>
            <Icon name={link.icon}/>
            <span className="item-title">
              {link.title}
              {showPlus && <Icon name="plus"/>}
            </span>
          </a>
        );
        return (
          <li>
            {pageItem}
            {isParent && renderPageTree(pageId, children)}
          </li>
        );
      })}
    </ol>
  );
}

export default function PageWrapper(props: PageWrapperProps) {
  const ctx = useCtx();
  const {localize} = useLocalize(localizations);

  return (
    <div className="wrapper body-view">
      <nav className="wrapper-nav">
        <header className="nav-bar">
          <a className="c20-logo" title={localize("siteName")} href={ctx?.resolvePage("/")?.url}>
            <span className="c20-name">c20</span>
          </a>
          <div className="button-group">
            <div id="theme-mountpoint"></div>
            <button className="nobg mobile-only" id="toggle-menu" title={localize("menu")}>
              <Icon name="search"/>
            </button>
            <button className="nobg mobile-only" id="toggle-toc" title={localize("toc")}>
              <Icon name="list"/>
            </button>
          </div>
        </header>
        <div id="c20-search-mountpoint"></div>
        <div className="nav-tree">
          {props.navTree && renderPageTree(ctx?.pageId ?? "/", props.navTree)}
          <hr/>
          <a href={DISCORD_URL} target="_blank"><Icon name="message-circle"/>Chat on Discord</a>
        </div>
      </nav>
      <div className="wrapper-toc">
        {props.navHeadings && props.navHeadings.length > 0 &&
          <TableOfContents headings={props.navHeadings}/>
        }
      </div>
      <main role="main" className="wrapper-body">
        {props.children}
      </main>
    </div>
  );
};
