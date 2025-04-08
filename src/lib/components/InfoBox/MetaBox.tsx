import * as R from "ramda";
import {MdSrc} from "../../markdown/markdown";
import Icon, {type IconName} from "../Icon/Icon";
import {ComponentChildren, VNode} from "preact";
import Md from "../Md/Md";

export type MetaboxSectionProps = {
  class?: string;
  body: ComponentChildren
};

export type MetaboxProps = {
  title?: VNode | string;
  icon?: IconName;
  iconTitle?: string;
  class?: string;
  img?: string;
  caption?: MdSrc;
  info?: MdSrc;
  sections?: MetaboxSectionProps[];
};

export default function MetaBox(props: MetaboxProps) {
  const hasSections = props.sections && props.sections.length > 0;
  const empty = !hasSections && R.pipe(
    R.pick(["img", "caption", "info"]),
    R.values,
    R.filter(R.identity),
    R.isEmpty
  )(props);
  if (empty) return null;

  return (
    <aside className="metabox">
      <section className={`header ${props.class}`}>
        <p>
          <strong>
            {props.icon &&
              <Icon name={props.icon} title={props.iconTitle}/>
            }
            {props.title}
          </strong>
        </p>
      </section>
      {props.img &&
        <section className="img">
          <a href={props.img}><img src={props.img} alt=""/></a>
        </section>
      }
      {props.caption &&
        <section className="caption">
          <Md src={props.caption}/>
        </section>
      }
      {props.info &&
        <section>
          <Md src={props.info}/>
        </section>
      }
      {props.sections?.map(section =>
        <section className={section.class}>{section.body}</section>
      )}
    </aside>
  );
};

