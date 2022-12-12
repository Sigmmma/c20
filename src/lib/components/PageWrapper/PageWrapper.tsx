import Icon from "../Icon/Icon";
import {useCtx} from "../Ctx/Ctx";
import {type PageLink, type NavTree} from "../../content";
import {type ComponentChildren} from "preact";
import {DISCORD_URL} from "../../utils/external-urls";
import localizations from "./localizations";
import {useLocalize} from "../Locale/Locale";
import TableOfContents, {type NavHeading} from "../Article/TableOfContents";

const COLLAPSE_CHILD_PAGES = 20;
const COLLAPSE_RELATED_PAGES = 4;
const COLLAPSE_MAIN_TOPIC_PAGES = 20;

export type PageWrapperProps = {
  title?: string;
  navRelated?: PageLink[];
  navHeadings?: NavHeading[];
  navTree?: NavTree;
  children?: ComponentChildren;
};

function renderPageTree(pageId: string, navTree: NavTree) {
  return (
    <ol>
      {navTree.map(({link, children}) => {
        const isParent = pageId.startsWith(link.pageId);
        const isCurrent = pageId == link.pageId;
        const title = !isParent && children.length > 0 ?
          <>{link.title} <Icon name="plus"/></> :
          link.title;
        const page = <a href={link.url} aria-current={isCurrent ? "location" : undefined}>{title}</a>;
        return (
          <li>
            {page}
            {isParent && renderPageTree(pageId, children)}
          </li>
        );
      })}
    </ol>
  );
}

/*
{props.navRelated && props.navRelated.length > 0 &&
              <DetailsList
                summary={<h2>{localize("related")}</h2>}
                maxOpen={COLLAPSE_RELATED_PAGES}
                allowInline={false}
                items={props.navRelated?.map(({url, title}) =>
                  <a href={url}>{title}</a>
                )}
              />
            }
*/

export default function PageWrapper(props: PageWrapperProps) {
  const ctx = useCtx();
  const {localize} = useLocalize(localizations);

  return (
    <div className="wrapper">
      <nav className="wrapper-nav">
        <header className="nav-bar">
          <a className="c20-logo" title={localize("siteName")} href={ctx?.resolvePage("/")?.url}>
            <span className="c20-name-long">c20</span>
          </a>
          <div className="button-group">
            <div id="theme-mountpoint"></div>
            <a className="button nobg" href={DISCORD_URL} title="Discord">
              <Icon name="message-square"/>
            </a>
            <button className="nobg mobile-only" id="toggle-menu" title={localize("menu")}>
              <Icon name="menu"/>
            </button>
          </div>
        </header>
        <div id="c20-search-mountpoint"></div>
        <div className="nav-tree">
          {props.navTree && renderPageTree(ctx?.pageId ?? "/", props.navTree)}
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
