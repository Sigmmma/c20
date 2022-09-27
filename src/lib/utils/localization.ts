export type Lang = string;
export type Localizations = Record<string, Record<Lang, any>>;
export type LocalizeFn<L extends Localizations> = (key: keyof L | string, safe?: boolean) => any;

const reportedMissingKeys = new Set();

export function localizer<L extends Localizations>(bundle: L, lang: Lang): LocalizeFn<L> {
  return (key, safe) => {
    if (!bundle[key] && !safe) {
      throw new Error(`Missing localizations for key ${String(key)}`);
    } else if (!bundle[key]) {
      if (!reportedMissingKeys.has(key)) {
        console.warn(`Missing localisation key "${String(key)}"`);
        reportedMissingKeys.add(key);
      }
      return null;
    }

    return bundle[key][lang] ?? bundle[key]["en"];
  };
};