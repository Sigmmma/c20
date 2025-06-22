import {useCtx} from "../Ctx/Ctx";
import {resolvePageGlobal} from "../../content/pages";

export type WatProps = {
  href?: string;
  //or
  idTail?: string;
  headingId?: string;
};

export default function Wat(props: WatProps) {
  const ctx = useCtx();
  const href = props.href ??
    ((props.idTail && ctx) ? resolvePageGlobal(ctx.pageIndex, ctx.pageId, props.idTail, props.headingId)?.url : undefined);
  return href ? <sup><a href={href}>?</a></sup> : null;
}