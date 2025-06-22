import {ComponentChildren} from "preact";
import Icon from "../Icon/Icon";
import {IconName} from "../Icon/names";

export const alertTypes = ["info", "danger", "success"] as const;
export type AlertType = (typeof alertTypes)[number];

export interface AlertProps {
  type?: AlertType;
  icon?: IconName;
  children: ComponentChildren;
}

export default function Alert(props: AlertProps) {
  return (
    <div className={`alert type-${props.type || "info"}`}>
      {props.icon &&
        <div className="alert-icon">
          <Icon name={props.icon}/>
        </div>
      }
      <div className="alert-body">
        {props.children}
      </div>
    </div>
  );
};