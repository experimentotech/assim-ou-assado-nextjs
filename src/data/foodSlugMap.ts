import { foods } from "@/data/foods";
import { prepareSearchableList } from "@/services/foodSearch";
import { Food } from "@/types";

export const foodsSlugMap: Record<string, Food> = prepareSearchableList(
  foods,
).reduce((acc: Record<string, Food>, cur) => {
  const slug = cur.searchTerms.replace(/\s+/g, "-");
  acc[slug] = cur;
  return acc;
}, {});
