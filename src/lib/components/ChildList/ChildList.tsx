import {useCtx} from "../Ctx/Ctx";
import {formatUrlPath} from "../../content/pages";

export default function ChildList(props: {}) {
  const ctx = useCtx();
  if (!ctx) return null;

  const children = ctx.pageIndex[ctx.pageId].children;
  if (!children) return null;

  return (
    <ul>
      {children.map(childPageId =>
        <li><a href={formatUrlPath(childPageId)}>{ctx.pageIndex[childPageId].title}</a></li>
      )}
    </ul>
  );
};