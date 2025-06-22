import {useState} from "preact/hooks";
import {useLocalize} from "../Locale/Locale";
import {localizations, conversions, presets} from "./config";

type State = {
  basisType: string;
  basisValue: string;
};

export default function UnitConverter(props: {}) {
  const {localize} = useLocalize(localizations);
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
        <table>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(conversions).map(([type, {label, rel}]) => {
              const name = `conversion-${type}`;
              let entryValue = state.basisValue;
              if (type != state.basisType) {
                const jmsValue = Number(state.basisValue) * conversions[state.basisType].rel;
                entryValue = Number.isNaN(jmsValue) ? "" : String(jmsValue / conversions[type].rel);
              }
              return (
                <tr>
                  <td>
                    <label htmlFor={name}>{localize(label as keyof typeof localizations)}</label>
                  </td>
                  <td>
                    <input
                      name={name}
                      type="text"
                      value={entryValue}
                      onInput={(e: any) => handleChange(type, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="presets">
        {presets.map(({label, basisValue, basisType}) => {
          const clickHandler = () => {handleChange(basisType, basisValue)};
          return <>
            <button onClick={clickHandler}>{localize(label as keyof typeof localizations)}</button>
            <br/>
          </>;
        })}
      </div>
    </div>
  );
}

export function UnitConverterMountpoint(props: {}) {
  return (
    <div id="unit-converter-mountpoint"></div>
  );
}