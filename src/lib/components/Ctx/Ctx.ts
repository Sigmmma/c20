import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {Lang, LocalizeFn, Localizations, localizer} from "../../utils/localization";
import {PageDataLite} from "..";

export type RenderContext = {
  lang: Lang;
  pageId: string;
  logicalPath: string[];
  title: string;
  children?: PageDataLite[];

  //todo: should already be resolved by time we render?
  resolvePage: (idTail: string, headingId?: string) => PageDataLite;
  data: any; //maybe only via specialize macros; not generic access?
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
