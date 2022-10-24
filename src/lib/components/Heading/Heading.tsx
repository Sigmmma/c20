import preact, {ComponentChildren} from "preact";

export type HeadingProps = {
  level: number;
  id?: string;
  cssClass?: string;
  children?: ComponentChildren;
};

export function Jump(props: {id: string, children?: ComponentChildren}) {
  return <a className="header-anchor" href={`#${props.id}`}>{props.children}</a>;
};

export default function Heading(props: HeadingProps) {
  const tag = `h${props.level}`;
  const id = props.id;

  return preact.createElement(
    tag,
    {className: props.cssClass, id},
    id ? <Jump id={id}>{props.children}</Jump> : props.children
  );
};