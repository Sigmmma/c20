import {ComponentChildren} from "preact";

export type AlertProps = {
  type?: "info" | "danger" | "success";
  children: ComponentChildren;
};

export default function Alert(props: AlertProps) {
  return (
    <div class={`alert type-${props.type || "info"}`}>
      {props.children}
    </div>
  );
};