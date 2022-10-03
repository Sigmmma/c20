import {MdSrc} from "../Md/markdown";
import { slugify } from "../../utils/strings";
import {useLocalize} from "../Ctx/Ctx";
import Heading from "../Heading/Heading";
import Md from "../Md/Md";

export const localizations = {
  thanksHeadingText: {
    en: "Acknowledgements",
    es: "Agradecimientos"
  },
  intro: {
    en: "Thanks to the following individuals for their research or contributions to this topic:",
    es: "Gracias a las siguientes personas por sus investigaciones o contribuciones a este tema:"
  }
} as const;

export type ThanksListProps = {
  thanks?: Record<string, MdSrc>;
};

export default function ThanksList(props: ThanksListProps) {
  const thanksEntries = Object.entries(props.thanks ?? {});
  if (thanksEntries.length == 0) {
    return null;
  }
  thanksEntries.sort(([aTo], [bTo]) => aTo.localeCompare(bTo));

  const localize = useLocalize(localizations);
  const headingText = localize("thanksHeadingText");

  return (
    <>
      <Heading id={slugify(headingText)} level={1}>{headingText}</Heading>
      <p>{localize("intro")}</p>
      <ul>
        {thanksEntries.map(([to, forEntry]: [string, MdSrc]) => {
          {to}
          <em> (<Md src={forEntry}/>)</em>
        })}
      </ul>
    </>
  );
};
