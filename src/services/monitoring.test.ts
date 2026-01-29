import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@next/third-parties/google", () => ({
  sendGTMEvent: vi.fn(),
}));

import { tracker } from "./monitoring";
import { sendGTMEvent } from "@next/third-parties/google";

const mockedSendGTMEvent = vi.mocked(sendGTMEvent);

describe("tracker", () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  beforeEach(() => {
    mockedSendGTMEvent.mockClear();
    logSpy.mockClear();
  });

  it("tracks no result suggestion", () => {
    tracker.noResultSuggestion("Pao de queijo");

    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: "no_results_suggestion",
      suggestion: "pao de queijo",
    });
  });

  it("tracks initial food selection", () => {
    tracker.initialFoodSelect("Frango Grelhado", "P");

    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: "initial_food_select",
      food: "frango grelhado",
      classif: "p",
    });
  });

  it("tracks destination food selection", () => {
    tracker.destinationFoodSelect("Arroz", "C");

    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: "dest_food_select",
      food: "arroz",
      classif: "c",
    });
  });

  it("tracks compensation food selection", () => {
    tracker.compensationFoodSelect("Azeite", "L");

    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: "compensation_food_select",
      food: "azeite",
      classif: "l",
    });
  });

  it("tracks compare event", () => {
    tracker.compare({
      fromFood: "Arroz Integral",
      fromQty: "100g",
      fromClassif: "C",
      toFood: "Batata",
      toQty: "130g",
      toClassif: "C",
    });

    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: "compare",
      comp_type: "cc",
      from_food: "arroz integral",
      from_qty: "100g",
      to_food: "batata",
      to_qty: "130g",
    });
  });

  it("tracks compensation clicked", () => {
    tracker.compensationClicked();

    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: "compensation_clicked",
    });
  });
});
