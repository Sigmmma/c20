import {createContext} from "preact";
import {useContext} from "preact/hooks";
const {localizer} = require("../bits");

const Ctx = createContext({});

export function useCtx(): any {
  return useContext(Ctx);
};

type LocalizeFn<L> = (string: keyof L) => any;

export function useLocalize<L>(localizations: L): LocalizeFn<L> {
  const lang: string = useCtx().lang;
  return localizer(localizations)(lang);
};

export default Ctx;
