import {useLocalize} from "../Ctx/Ctx";
import Heading from "../Heading/Heading";

const localizations = {
  thanksHeadingText: {
    en: "Acknowledgements",
    es: "Agradecimientos"
  },
  intro: {
    en: "Thanks to the following individuals for their research or contributions to this topic:",
    es: "Gracias a las siguientes personas por sus investigaciones o contribuciones a este tema:"
  }
};

export function getThanksHeading() {
  const localize = useLocalize(localizations);
  return localize("thanksHeadingText");
};

export default function ThanksList({thanks}) {
  const thanksEntries = Object.entries(thanks);
  if (thanksEntries.length == 0) {
    return null;
  }

  const localize = useLocalize(localizations);
  thanksEntries.sort(([aTo], [bTo]) => aTo.localeCompare(bTo));

  return (
    <>
      <Heading level={1} title={localize("thanksHeadingText")}/>
      <p>{localize("intro")}</p>
      <ul>
        {thanksEntries.map(([to, forEntries]: [string, string[]]) => {
          {to}
          {forEntries.length > 0 &&
            <em> ({forEntries.join("; ")})</em>
          }
        })}
      </ul>
    </>
  );
};
