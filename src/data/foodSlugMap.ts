import { searchableFoods } from "@/data/searchableFoods";
import { Food } from "@/types";

export const foodsSlugMap: Record<string, Food> = searchableFoods.reduce(
  (acc: Record<string, Food>, cur) => {
    const slug = cur.searchTerms.replace(/\s+/g, "-");
    acc[slug] = cur;
    return acc;
  },
  {},
);
