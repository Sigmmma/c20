import { useCtx } from "../Ctx/Ctx";

export type WatProps = {
  href?: string;
  //or
  idTail?: string;
  headingId?: string;
};

export default function Wat(props: WatProps) {
  const ctx = useCtx();
  const href = props.href ?? (props.idTail ?
    ctx?.resolvePage(props.idTail, props.headingId)?.url :
    undefined
  );
  return href ? <sup><a href={href}>?</a></sup> : null;
};