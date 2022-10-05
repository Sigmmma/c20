import {ComponentChildren} from "preact";

export type FigureProps = {
  src: string;
  inline?: boolean;
  alt?: string;
  children?: ComponentChildren;
};

export default function Figure(props: FigureProps) {
  return (
    <figure className={props.inline ? "inline-figure" : undefined}>
      <a href={props.src}>
        <img src={props.src} alt={props.alt ?? ""}/>
      </a>
      {props.children &&
        <figcaption>{props.children}</figcaption>
      }
    </figure>
  );
};