import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {Lang, LocalizeFn, Localizations, localizer} from "../../utils/localization";

export interface LocalizeHook<L> {
  localize: LocalizeFn<keyof L>;
  lang: Lang;
}

export const Locale = createContext<Lang>("en");

export function useLocalize<L extends Localizations>(localizations?: L): LocalizeHook<L> {
  const lang = useContext(Locale);
  return {localize: localizer(localizations ?? {}, lang), lang};
}
