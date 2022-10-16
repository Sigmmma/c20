import * as R from "ramda";
import {MdSrc} from "../Md/markdown";
import Md from "../Md/Md";
import Icon, {type IconName} from "../Icon/Icon";
import {VNode} from "preact";
import Workflows from "./Workflows";

export type MetaboxProps = {
  title?: VNode | string;
  icon?: IconName;
  iconTitle?: string;
  class?: string;
  img?: string;
  caption?: MdSrc;
  info?: MdSrc;
  workflows?: string;
}


export default function Metabox(props: MetaboxProps) {
  const empty = R.pipe(
    R.pick(["img", "caption", "info", "workflows"]),
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
      {props.workflows &&
        <Workflows itemName={props.workflows}/>
      }
    </aside>
  );
};

