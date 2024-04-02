import { useState } from "preact/hooks";

type DataTableFilterProps = {
  tableId?: string;
};

export default function DataTableFilter(props: DataTableFilterProps) {
  if (!props.tableId) return null;

  const [filterVal, setFilterVal] = useState<string | undefined>();

  const handleValueChanged = (e) => {
    const strVal: string = e.target.value;
    document.querySelectorAll(`table#${props.tableId} tbody tr`).forEach((row: HTMLTableRowElement) => {
      if (row.dataset?.slug?.includes(strVal.trim().toLowerCase())) {
        row.classList.remove("filtered");
      } else {
        row.classList.add("filtered");
      }
    });
    setFilterVal(strVal);
  };

  return (
    <input
      type="text"
      value={filterVal}
      onInput={handleValueChanged}
      placeholder="Filter"
    />
  );
}