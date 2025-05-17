import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {PageIndex} from "../../content/pages";

export type RenderContext = {
  //local
  pageId: string;
  pageTitle?: string;
  //global
  pageIndex: PageIndex;
  data: any;
  noThumbs?: boolean;
};

const Ctx = createContext<RenderContext | undefined>(undefined);

export function useCtx(): RenderContext | undefined {
  return useContext(Ctx);
}

export default Ctx;
