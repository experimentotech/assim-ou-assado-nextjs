import { alimentos } from "@/data/alimentos";
import { prepareSearchableList } from "@/services/foodSearch";
import { Alimento } from "@/types";

export const alimentosSlugMap: Record<string, Alimento> = prepareSearchableList(
  alimentos,
).reduce((acc: Record<string, Alimento>, cur) => {
  const slug = cur.searchTerms.replace(/\s+/g, "-");
  acc[slug] = cur;
  return acc;
}, {});

export const alimentosSlugList = Object.keys(alimentosSlugMap);
