import {REPO_URL} from "../../utils/external-urls";
import {useLocalize} from "../Locale/Locale";
import Icon from "../Icon/Icon";
import {addBreaks} from "../../utils/strings";
import InfoBox from "../InfoBox/InfoBox";
import Md from "../Md/Md";
import ThanksList from "./ThanksList";
import {RenderableTreeNode} from "@markdoc/markdoc";
import {PageFrontMatter} from "../../content/pages";
import Alert from "../Alert/Alert";

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
  stubNotice: {
    en: (
      <p>
        <Icon name="alert-triangle"/> This page is incomplete! You can contribute information using <a href={REPO_URL}>GitHub issues or pull requests</a>.
      </p>
    )
  }
};

export interface ArticleProps {
  front: PageFrontMatter;
  content: RenderableTreeNode | undefined;
}

export default function ArticleBody(props: ArticleProps) {
  const {localize} = useLocalize(localizations);
  const newIssueUrl = `${REPO_URL}/issues/new?title=${encodeURIComponent("[" + props.front.title + "] - <Your issue here>")}&body=${encodeURIComponent("<!---" + localize("issue") + "-->")}`;

  return (
    <article className="article-body">
      <div className="page-title">
        <div className="title-line">
          <h1 className="page-title">{addBreaks(props.front.title, <wbr/>)}</h1>
          <div className="title-extra">
            <a href={`#`} title={localize("edit")}><Icon name="edit"/></a>
            <a href={newIssueUrl} title={localize("reportWiki")}><Icon name="flag"/></a>
          </div>
        </div>
      </div>

      <InfoBox {...props.front}/>
      {props.front?.stub &&
        <Alert>
          {localize("stubNotice")}
        </Alert>
      }
      <Md content={props.content}/>
      {props.front.thanks &&
        <ThanksList thanks={props.front.thanks}/>
      }
    </article>
  );
};
