import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {type PageLink} from "../../content";

export type RenderContext = {
  //local
  pageId: string;
  title?: string;

  //global
  noThumbs?: boolean;

  //non-local
  allThanks?: string[];
  resolvePage: (idTail: string, headingId?: string) => PageLink;
  children: PageLink[];
  data: any;
};

const Ctx = createContext<RenderContext | undefined>(undefined);

export function useCtx(): RenderContext | undefined {
  return useContext(Ctx);
}

export default Ctx;
