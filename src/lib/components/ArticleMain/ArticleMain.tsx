import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ArticleFooter from "../ArticleFooter/ArticleFooter";
import {
  createPageLink,
  logicalToPageId,
  PageFrontMatter,
  PageId,
  pageIdToLogical,
  PageIndex,
  PageLink
} from "../../content/pages";
import {RenderableTreeNode} from "@markdoc/markdoc";
import ArticleBody from "../ArticleBody/ArticleBody";
import TableOfContents, {NavHeading} from "../TableOfContents/TableOfContents";
import {RenderContext, useCtx} from "../Ctx/Ctx";
import findHeadings from "../Md/headings";
import Expander from "../Expander/Expander";
import {useLocalize} from "../Locale/Locale";

const localizations = {
  toc: {
    en: "Page contents",
  },
}

export interface ArticleMainProps {
  pageId: string;
  pageIndex: PageIndex;
  front: PageFrontMatter;
  content: RenderableTreeNode | undefined;
}

export default function ArticleMain(props: ArticleMainProps) {
  const {localize} = useLocalize(localizations);
  const ctx = useCtx();
  const navParents = getPageParents(props.pageIndex, props.pageId);
  const navHeadings = ctx ? getNavHeadings(ctx, props.content) : undefined;

  return (
    <div className="article-main">
      <div className="content-column">
        <Breadcrumbs parents={navParents}/>
        {navHeadings && navHeadings.length > 0 &&
          <Expander className="inline-toc" title={localize("toc")} icon="list" open={false}>
            <TableOfContents style="inline" id="toc" navHeadings={navHeadings}/>
          </Expander>
        }
        <ArticleBody
          front={props.front}
          content={props.content}
        />
        <ArticleFooter/>
      </div>
      <div className="toc-column">
        {navHeadings && navHeadings.length > 0 &&
          <TableOfContents heading={<h2>{localize("toc")}</h2>} style="sidebar" id="toc" navHeadings={navHeadings}/>
        }
      </div>
    </div>
  );
}

function getPageParents(pageIndex: PageIndex, pageId: PageId): PageLink[] {
  const parents: PageLink[] = [];
  const parentLogicalPath = pageIdToLogical(pageId);
  while (parentLogicalPath.pop()) {
    const parentId = logicalToPageId(parentLogicalPath);
    const parent = pageIndex[parentId];
    if (parent) {
      parents.unshift(createPageLink(pageIndex, parentId)!);
    }
  }
  return parents;
}

function getNavHeadings(ctx: RenderContext, content: RenderableTreeNode | undefined): NavHeading[] {
  const foundHeadings = findHeadings(ctx, content);
  //we want to have the headings in a nice hierarchy for rendering
  const res: NavHeading[] = [{level: 0, title: "root", sub: []}];
  foundHeadings.forEach(hdg => {
    let sub = res;
    let last = res[res.length - 1];
    while (last && hdg.level > last.level) {
      sub = last.sub;
      last = last.sub[last.sub.length - 1];
    }
    sub.push({...hdg, sub: []});
  });
  return res[0].sub;
}
