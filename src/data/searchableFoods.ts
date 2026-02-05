import { foods } from "@/data/foods";
import { prepareSearchableList } from "@/services/foodSearch";
import { FoodSearchable } from "@/types";

export const searchableFoods: FoodSearchable[] = prepareSearchableList(foods);
