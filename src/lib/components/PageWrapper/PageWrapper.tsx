import {type PageLink, type NavTree} from "../../content";
import {type ComponentChildren} from "preact";
import TableOfContents, {type NavHeading} from "../Article/TableOfContents";
import Nav from "../Nav/Nav";
import { useCtx } from "../Ctx/Ctx";

export type PageWrapperProps = {
  title?: string;
  navHeadings?: NavHeading[];
  pageTree?: NavTree;
  children?: ComponentChildren;
};

export default function PageWrapper(props: PageWrapperProps) {
  const ctx = useCtx();
  const pageId = ctx?.pageId ?? "/";
  return (
    <div className="wrapper body-view">
      <div id="nav-mountpoint" data-pageid={pageId}>
        <Nav
          pageId={pageId}
          pageTree={props.pageTree}
        />
      </div>
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
