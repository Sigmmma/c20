import preact from "preact";
const {slugify} = require("../bits");

export type HeadingProps = {
  title: string;
  level: number;
  cssClass?: string;
};

export default function Heading(props: HeadingProps) {
  const tag = `h${props.level}`;
  const id = slugify(props.title);

  return preact.createElement(
    tag,
    {className: props.cssClass, id},
    <a class="header-anchor" href={`#${id}`}>{props.title}</a>
  );
};