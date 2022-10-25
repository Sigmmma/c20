import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {type Lang, type LocalizeFn, type Localizations, localizer} from "../../utils/localization";

const Locale = createContext<Lang>("en");

export function useLocalize<L extends Localizations>(localizations?: L): {localize: LocalizeFn<keyof L>, lang: Lang} {
  const lang = useContext(Locale);
  return {localize: localizer(localizations ?? {}, lang), lang};
};

export default Locale;