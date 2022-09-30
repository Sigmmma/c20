import preact, {ComponentChildren} from "preact";

export type HeadingProps = {
  level: number;
  id?: string;
  cssClass?: string;
  children?: ComponentChildren;
};

export default function Heading(props: HeadingProps) {
  const tag = `h${props.level}`;
  const id = props.id;

  return preact.createElement(
    tag,
    {className: props.cssClass, id},
    id ? <a class="header-anchor" href={`#${id}`}>{props.children}</a> : props.children
  );
};