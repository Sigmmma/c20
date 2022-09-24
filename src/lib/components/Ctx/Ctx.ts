import {createContext} from "preact";
import {useContext} from "preact/hooks";
import {RenderContext} from "../../render";
const {localizer} = require("../bits");

const Ctx = createContext<RenderContext>({} as any);

export function useCtx(): RenderContext {
  return useContext(Ctx);
};

type LocalizeFn<L> = (string: keyof L) => any;

export function useLocalize<L>(localizations: L): LocalizeFn<L> {
  const lang = useCtx().lang;
  return localizer(localizations)(lang);
};

export default Ctx;
