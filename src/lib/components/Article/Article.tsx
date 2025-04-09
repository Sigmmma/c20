import Stub from "../Article/Stub";
import Breadcrumbs from "./Breadcrumbs";
import {useCtx} from "../Ctx/Ctx";
import {REPO_URL, LICENSE_URL} from "../../utils/external-urls";
import {ComponentChildren} from "preact";
import {type PageLink} from "../../content";
import {useLocalize} from "../Locale/Locale";
import Icon from "../Icon/Icon";
import { addBreaks } from "../../utils/strings";

const localizations = {
  edit: {
    en: "Edit",
  },
  reportWiki: {
    en: "Report a wiki issue",
  },
  issue: {
    en: "Please describe the issue with the wiki page in as much detail as you can and make sure to update the title.",
  },
  goTop: {
    en: "Go to top",
  },
  license: {
    en: (link) => <span>This text is available under the {link} license</span>,
  },
};

export type ArticleProps = {
  title?: string;
  navParents?: PageLink[];
  children?: ComponentChildren;
};

export default function Article(props: ArticleProps) {
  const ctx = useCtx();
  const {localize} = useLocalize(localizations);
  const editPageUrl = ctx ? `${REPO_URL}/edit/master/src/content${ctx.pageId}/readme.md` : undefined;
  const newIssueUrl = `${REPO_URL}/issues/new?title=${encodeURIComponent("[" + props.title + "] - <Your issue here>")}&body=${encodeURIComponent("<!---" + localize("issue") + "-->")}`;

  return (
    <article className="article">
      <div className="article-main">
        <div className="page-title">
          {props.navParents &&
            <nav className="breadcrumbs">
              <Breadcrumbs parents={props.navParents}/>
            </nav>
          }
          <div className="title-line">
            <h1 className="page-title">{addBreaks(props.title, <wbr/>)}</h1>
            <div className="title-extra">
              {editPageUrl &&
                <a href={editPageUrl} title={localize("edit")}><Icon name="edit"/></a>
              }
              <a href={newIssueUrl} title={localize("reportWiki")}><Icon name="flag"/></a>
            </div>
          </div>
        </div>
        {props.children}
        <footer className="article-footer">
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
    </article>
  );
};