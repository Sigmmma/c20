import * as R from "ramda";

export type KeyProps = {
  input: string;
};

export default function Key(props: KeyProps) {
  return R.intersperse(
    " + ",
    props.input.split("+").map(k =>
      <kbd>{k.trim()}</kbd>
    )
  );
};