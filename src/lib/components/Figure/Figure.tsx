import {ComponentChildren} from "preact";
import { useCtx } from "../Ctx/Ctx";

export type FigureProps = {
  src: string;
  inline?: boolean;
  alt?: string;
  children?: ComponentChildren;
};

export default function Figure(props: FigureProps) {
  const ctx = useCtx();
  return (
    <figure className={props.inline ? "inline-figure" : undefined}>
      {props.src.endsWith(".mp4") ? (() => {
        const poster = props.src.replace(".mp4", ".thumb_1.jpg");
        return (
          <video alt={props.alt} controls preload={ctx?.noThumbs ? "auto" : "none"} poster={ctx?.noThumbs ? undefined : poster}>
            <source src={props.src} type="video/mp4"/>
          </video>
        );
      })() : (
        <a href={props.src} target="_blank">
          <img src={props.src} alt={props.alt ?? ""}/>
        </a>
      )}
      {props.children &&
        <figcaption>{props.children}</figcaption>
      }
    </figure>
  );
};