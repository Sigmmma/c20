import {VNode} from "preact";

const DEFAULT_OPEN_THRESHOLD = 8;

export type DetailsListProps = {
  summary: VNode;
  items?: VNode[];
  maxOpen?: number;
  allowInline?: boolean;
};

export default function DetailsList(props: DetailsListProps) {
  const maxOpen = props.maxOpen ?? DEFAULT_OPEN_THRESHOLD;
  const allowInline = props.allowInline ?? true;
  const items = props.items ?? [];

  if (items.length == 0) {
    return null;
  } else if (items.length <= maxOpen) {
    if (items.length == 1 && allowInline) {
      return <span>{props.summary}: {items[0]}</span>;
    } else {
      return (
        <details open>
          <summary>{props.summary}</summary>
          <ul>{items.map(item => <li>{item}</li>)}</ul>
        </details>
      );
    }
  } else {
    return (
      <details>
        <summary>{props.summary} ({items.length})</summary>
        <ul>{items.map(item => <li>{item}</li>)}</ul>
      </details>
    );
  }
};