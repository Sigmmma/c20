import { useCtx } from "../Ctx/Ctx";

export default function ChildList(props: {}) {
  const ctx = useCtx();
  if (!ctx?.children) return null;
  return (
    <ul>
      {ctx.children.map(child =>
        <li><a href={child.url}>{child.title}</a></li>
      )}
    </ul>
  );
};