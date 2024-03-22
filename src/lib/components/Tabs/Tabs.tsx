import { ComponentChildren } from "preact";

export type TabsProps = {
  selectedIndex?: number;
  id: string;
  tabs: {
    label: string;
    body: ComponentChildren;
  }[];
};

export default function Tabs(props: TabsProps) {
  const selectedIndex = props.selectedIndex ?? 0;
  return (
    <div className="tabs" id={`tabs-${props.id}`}>
      {props.tabs.map((tab, i) => <>
        <input
          className={`tab-input i${i}`}
          type="radio"
          id={`tabset-${props.id}-${i}-input`}
          name={`tabset-${props.id}`}
          checked={i == selectedIndex}
          aria-controls={`tabset-${props.id}-${i}-tab`}
        />
        <label className="tab-header" for={`tabset-${props.id}-${i}-input`}>
          {tab.label}
        </label>
      </>)}
      {props.tabs.map((tab, i) =>
        <section className={`tab-body i${i}`} id={`tabset-${props.id}-${i}-tab`}>
          {tab.body}
        </section>
      )}
    </div>
  );
};