import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {Lang, LocalizeFn, Localizations, localizer} from "../../utils/localization";
import {PageDataLite} from "..";

export type RenderContext = {
  lang: Lang;
  pageId: string;
  logicalPath: string[];
  title?: string;
  localData?: any;

  //todo: these all require non-local information... can we find another way?
  //what about doing these at the transform phase, optionally async?
  children?: PageDataLite[];
  allThanks?: string[];
  resolvePage: (idTail: string, headingId?: string) => PageDataLite;
  data: any;
};

const Ctx = createContext<RenderContext | undefined>(undefined);

export function useCtx(): RenderContext | undefined {
  return useContext(Ctx);
};

export function useLocalize<L extends Localizations>(localizations: L): LocalizeFn<L> {
  const lang = useCtx()?.lang;
  return localizer(localizations, lang ?? "en");
};

export default Ctx;
