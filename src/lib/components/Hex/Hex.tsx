export type HexProps = {
  value?: number;
  base?: number;
};

const basePrefixes = {
  16: "0x",
  8: "0o",
  2: "0b",
};

export default function(props: HexProps) {
  if (props.value === undefined) return null;
  const base = props.base ?? 16;
  const baseN = props.value.toString(base).toUpperCase();
  const prefix = basePrefixes[base] ?? `(base${base}) `;
  return <code title={props.value.toString()}>{prefix}{baseN}</code>;
}