import {rawHelper} from "..";
import {MdSrc} from "../Md/markdown";
import Md from "../Md/Md";
import Icon, {type IconName} from "../Icon/Icon";
import {VNode} from "preact";

export type MetaboxProps = {
  metaTitle?: VNode | string;
  metaIcon?: IconName;
  metaIconTitle?: string;
  metaClass?: string;
  img?: string;
  imgCaption?: MdSrc;
  metaSections?: {
    body: VNode | string;
    cssClass?: string;
  }[];
}

export default function Metabox(props: MetaboxProps) {
  if (!props.img && !props.imgCaption && (!props.metaSections || props.metaSections.length == 0)) {
    return null;
  }

  return (
    <aside className="metabox">
      <section className={`header ${props.metaClass}`}>
        <p>
          {props.metaIcon &&
            <Icon name={props.metaIcon} title={props.metaIconTitle}/>
          }
          <strong>{props.metaTitle}</strong>
        </p>
      </section>
      {props.img &&
        <section className="img">
          <a href={props.img}><img src={props.img} alt=""/></a>
        </section>
      }
      {props.imgCaption &&
        <section className="caption">
          <p><em><Md src={props.imgCaption}/></em></p>
        </section>
      }
      {props.metaSections?.filter(it => it)?.map(({body, cssClass}) =>
        typeof(body) === "string" ?
          <section className={`info ${cssClass}`} {...rawHelper(body)}></section> :
          <section className={`info ${cssClass}`}>{body}</section>
      )}
    </aside>
  );
};

