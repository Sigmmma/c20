import {type IconName} from "./names";
export * from "./names";

export type IconProps = {
  name: IconName;
  title?: string;
};

// See https://feathericons.com/ for available icons
export default function Icon(props: IconProps) {
  return (
    <svg className="feather" aria-labelledby={props.title}>
      {props.title &&
        <title>{props.title}</title>
      }
      <use xlinkHref={`/assets/feather-sprite.svg#${props.name}`}/>
    </svg>
  );
}