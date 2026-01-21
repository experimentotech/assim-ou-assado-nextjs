import { AlimentoClassif } from "@/types";
import { sendGTMEvent } from "@next/third-parties/google";
import { normalizeText } from "./foodSearch";

interface Comparison {
  fromFood: string;
  fromQty: string;
  fromClassif: AlimentoClassif;
  toFood: string;
  toQty: string;
  toClassif: AlimentoClassif;
}

function sendEvent(event: object) {
  console.log("TrackingEvent", event);
  sendGTMEvent(event);
}

export const tracker = {
  noResultSuggestion(suggestion: string) {
    sendEvent({
      event: "no_results_suggestion",
      suggestion: normalizeText(suggestion),
    });
  },

  initialFoodChanged(food: string) {
    sendEvent({
      event: "initial_food_changed",
      food: normalizeText(food),
    });
  },

  destinationFoodChanged(food: string) {
    sendEvent({
      event: "dest_food_changed",
      food: normalizeText(food),
    });
  },

  compensationFoodChanged(food: string) {
    sendEvent({
      event: "compensation_food_changed",
      food: normalizeText(food),
    });
  },

  comparison(comparison: Comparison) {
    const compareType = `${comparison.fromClassif}${comparison.toClassif}`;

    sendEvent({
      event: "compare",
      comp_type: compareType.toLowerCase(),
      from_food: normalizeText(comparison.fromFood),
      from_qty: comparison.fromQty,
      to_food: normalizeText(comparison.toFood),
      to_qty: comparison.toQty,
    });
  },

  compensationClicked() {
    sendEvent({
      event: "compensation_clicked",
    });
  },
};
