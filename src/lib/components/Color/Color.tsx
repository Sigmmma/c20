export type ColorProps = {
  hex: string;
};

export default function Color(props: ColorProps) {
  const hex = props.hex.startsWith("#") ? props.hex : `#${props.hex}`;
  return <div style={{background: hex}}>&nbsp;</div>;
};