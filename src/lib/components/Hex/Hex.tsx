export type HexProps = {
  value?: number;
  base?: number;
};

const basePrefixes = {
  16: "0x",
  8: "0o",
  2: "0b",
};

export function format(value: number, base?: number): string {
  base = base ?? 16;
  const baseN = value.toString(base).toUpperCase();
  const prefix = basePrefixes[base] ?? `(base${base}) `;
  return `${prefix}${baseN}`;
};

export default function(props: HexProps) {
  if (props.value === undefined) return null;
  const formatted = format(props.value, props.base);
  return <code title={props.value.toString()}>{formatted}</code>;
};