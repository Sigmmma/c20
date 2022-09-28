import {ComponentChildren} from "preact";
import Icon from "../Icon/Icon";
import {IconName} from "../Icon/names";

export const alertTypes = ["info", "danger", "success"] as const;
export type AlertType = (typeof alertTypes)[number];

export type AlertProps = {
  type?: AlertType;
  icon?: IconName;
  children: ComponentChildren;
};

export default function Alert(props: AlertProps) {
  return (
    <div class={`alert type-${props.type || "info"}`}>
      {props.icon &&
        <div class="alert-icon">
          <Icon name={props.icon}/>
        </div>
      }
      <div class="alert-body">
        {props.children}
      </div>
    </div>
  );
};