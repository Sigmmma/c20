import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {type PageLink} from "../../content";
import {Lang, LocalizeFn, Localizations, localizer} from "../../utils/localization";

export type RenderContext = {
  //local
  lang: Lang;
  pageId: string;
  title?: string;

  //global
  noThumbs?: boolean;

  //non-local
  allThanks?: string[];
  resolvePage: (idTail: string, headingId?: string) => PageLink;
  data: any;
};

const Ctx = createContext<RenderContext | undefined>(undefined);

export function useCtx(): RenderContext | undefined {
  return useContext(Ctx);
};

export function useLocalize<L extends Localizations>(localizations: L): LocalizeFn<keyof L> {
  const lang = useCtx()?.lang;
  return localizer(localizations, lang ?? "en");
};

export default Ctx;
