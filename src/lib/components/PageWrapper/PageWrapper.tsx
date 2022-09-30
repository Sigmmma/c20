import Icon from "../Icon/Icon";
import {useCtx, useLocalize} from "../Ctx/Ctx";
import {PageDataLite, rawHelper} from "..";
import {ComponentChildren} from "preact";
import {JIF_ISSUE_URL, REPO_URL, DISCORD_URL, LICENSE_URL} from "../../utils/external-urls";
import DetailsList from "../DetailsList/DetailsList";
import localizations from "./localizations";
import TableOfContents, {NavHeading} from "./TableOfContents";
const toc = require("./toc");

const TOC_MIN_HEADERS = 2;
const COLLAPSE_CHILD_PAGES = 20;
const COLLAPSE_RELATED_PAGES = 4;
const COLLAPSE_MAIN_TOPIC_PAGES = 20;

const mainTopics = [
  "/general",

  "/h1",
  "/h1/tags",
  "/h1/guides",
  "/h1/tools/h1a-ek",

  "/h2",
  "/h2/tags",
  //"/h2/guides",
  "/h2/tools/h2-ek",

  "/h3",
  "/h3/tags",
  //"/h3/guides",
  "/h3/h3-ek",
  
  "/hr",
  "/hr/tags",
  //"/hr/guides",
  "/hr/hr-ek",
];

const mccToolkitPages = [
  "/h1/tools/h1a-ek",
  "/h2/tools/h2-ek",
  "/h3/h3-ek",
  "/h3odst/h3odst-ek"
];

export type PageWrapperProps = {
  title?: string;
  navRelated?: PageDataLite[];
  navChildren?: PageDataLite[];
  children?: ComponentChildren;
  navHeadings?: NavHeading[];
  /** @deprecated */
  navHeadingsLegacy?: any;
}

export default function PageWrapper(props: PageWrapperProps) {
  const ctx = useCtx();
  const localize = useLocalize(localizations);
  const isToolkitPage = ctx ? mccToolkitPages.some(prefix => ctx.pageId.startsWith(prefix)) : undefined;
  const newIssueUrl = `${REPO_URL}/issues/new?title=${encodeURIComponent("[" + props.title + "] - <Your issue here>")}&body=${encodeURIComponent("<!---" + localize("issue") + "-->")}`;

  return (
    <div className="page-layout">
      <div className="page-sidebar">
        <div className="sidebar-inner">
          <header className="sidebar-header">
            <a className="c20-logo" href={ctx?.resolvePage("/")?.url}>
              <span className="c20-name-short">c20</span>
              <span className="c20-name-long">{localize("siteName")}</span>
            </a>
            <button className="nobg" id="toggle-theme">
              <span className="dark"><Icon name="moon" title={localize("darkMode")}/></span>
              <span className="light"><Icon name="sun" title={localize("lightMode")}/></span>
            </button>
          </header>
          <nav className="sidebar-nav">
            <div id="c20-search-mountpoint"></div>
            {props.navHeadings && props.navHeadings.length > 0 &&
              <TableOfContents headings={props.navHeadings}/>
            }
            {props.navHeadingsLegacy && props.navHeadingsLegacy.length > TOC_MIN_HEADERS &&
              <div className="sidebar-toc">
                <h2 id="table-of-contents"><Icon name="list"/> {localize("toc")}</h2>
                <div {...rawHelper(toc(props.navHeadingsLegacy))}></div>
              </div>
            }
            {props.navChildren && props.navChildren.length > 0 &&
              <DetailsList
                summary={<h2>{localize("children")}</h2>}
                maxOpen={COLLAPSE_CHILD_PAGES}
                allowInline={false}
                items={props.navChildren?.map(({url, title}) =>
                  <a href={url}>{title}</a>
                )}
              />
            }
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
            {ctx &&
              <DetailsList
                summary={<h2>{localize("main")}</h2>}
                maxOpen={COLLAPSE_MAIN_TOPIC_PAGES}
                allowInline={false}
                items={mainTopics.map((pageId) => {
                  const {url, title} = ctx.resolvePage(pageId);
                  return <a href={url}>{title}</a>;
                })}
              />
            }

            <p><a href={DISCORD_URL}><Icon name="message-square"/> Discord</a></p>
            <p><a href={newIssueUrl}><Icon name="flag"/> {localize("reportWiki")}.</a></p>
            {isToolkitPage &&
              <p><a href={JIF_ISSUE_URL}><Icon name="flag"/> {localize("reportToolkit")}.</a></p>
            }
          </nav>
        </div>
      </div>
      <main role="main" className="page-content-main">
        {props.children}
      </main>
      <footer className="content-footer">
        <p>
          <small>
            {localize("license")(<a href={LICENSE_URL}>CC BY-SA 3.0</a>)}
            {" • "}
            <a href={REPO_URL}>c20 on GitHub</a>
            {" • "}
            <a href="#">{localize("goTop")}</a>
          </small>
        </p>
      </footer>
    </div>
  );
};
