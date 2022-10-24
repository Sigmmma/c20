import { useState } from "preact/hooks";
import {conversions, presets} from "./config";

type State = {
  basisType: string;
  basisValue: string;
};

export default function UnitConverter(props: {}) {
  const [state, setState] = useState<State>({
    basisType: "world",
    basisValue: "1",
  });

  const handleChange = (basisType, basisValue) => {
    setState({basisType, basisValue});
  };

  return (
    <div className="unit-converter">
      <div className="inputs">
        {Object.entries(conversions).map(([type, {label, rel}]) => {
          const name = `conversion-${type}`;
          let entryValue = state.basisValue;
          if (type != state.basisType) {
            const jmsValue = Number(state.basisValue) * conversions[state.basisType].rel;
            entryValue = Number.isNaN(jmsValue) ? "" : String(jmsValue / conversions[type].rel);
          }
          return <>
            <br/>
            <label htmlFor={name}>{label}</label>
            <input
              name={name}
              type="text"
              value={entryValue}
              onInput={(e: any) => handleChange(type, e.target.value)}
            />
          </>;
        })}
      </div>
      <div className="presets">
        <h2>Presets</h2>
        {presets.map(({label, basisValue, basisType}) => {
          const clickHandler = () => {handleChange(basisType, basisValue)};
          return <>
            <button onClick={clickHandler}>{label}</button>
            <br/>
          </>;
        })}
      </div>
    </div>
  );
};

export function UnitConverterMountpoint(props: {}) {
  return (
    <div id="unit-converter-mountpoint"></div>
  );
};