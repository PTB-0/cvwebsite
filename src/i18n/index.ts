import type { Dict, Lang } from "./dict";
import { en } from "./en";
import { tr } from "./tr";

export { locales } from "./dict";
export type { Dict, Lang } from "./dict";

const dicts: Record<Lang, Dict> = { en, tr };

export function getDict(lang: Lang): Dict {
  return dicts[lang];
}

export function other(lang: Lang): Lang {
  return lang === "en" ? "tr" : "en";
}

/** One switch for the whole site: stay out of search results until the owner says otherwise. */
export const NOINDEX = true;
