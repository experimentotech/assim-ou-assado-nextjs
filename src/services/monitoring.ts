import { AlimentoClassif } from "@/types";
import { sendGTMEvent } from "@next/third-parties/google";

interface Comparison {
  fromFood: string;
  fromQty: string;
  fromClassif: AlimentoClassif;
  toFood: string;
  toQty: string;
  toClassif: AlimentoClassif;
}

function sendEvent(event: object) {
  console.log('TrackingEvent', event);
  sendGTMEvent(event);
}

export const tracker = {
  noResultSuggestion(suggestion: string) {
    sendEvent({
      event: 'no_results_suggestion',
      suggestion,
    });
  },

  initialFoodChanged(food: string) {
    sendEvent({
      event: 'initial_food_changed',
      food,
    });
  },

  destinationFoodChanged(food: string) {
    sendEvent({
      event: 'dest_food_changed',
      food,
    });
  },

  compensationFoodChanged(food: string) {
    sendEvent({
      event: 'compensation_food_changed',
      food,
    });
  },

  comparison(comparison: Comparison) {
    const compareType = `${comparison.fromClassif}${comparison.toClassif}`;

    sendEvent({
      event: `compare_${compareType}`.toLowerCase(),
      from_food: comparison.fromFood,
      from_qty: comparison.fromQty,
      to_food: comparison.toFood,
      to_qty: comparison.toQty,
    });
  },

  compensationClicked() {
    sendEvent({
      event: 'compensation_clicked',
    });
  },
};
