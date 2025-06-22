import {ComponentChildren} from "preact";
import {IconName} from "../Icon/names";
import Icon from "../Icon/Icon";
import {joinClasses} from "../../utils/web";

export interface ExpanderProps {
  id?: string;
  className?: string;
  title: string;
  icon?: IconName;
  children: ComponentChildren;
  open?: boolean;
}

export default function Expander(props: ExpanderProps) {
  return (
    <details id={props.id} className={joinClasses("expander", props.className)} open={props.open}>
      <summary>
        <div className="expander-title">
          {props.icon &&
            <Icon name={props.icon}/>
          }
          {props.title}
        </div>
        <Icon name="chevron-down"/>
      </summary>
      <div className="expander-body">
        {props.children}
      </div>
    </details>
  );
}