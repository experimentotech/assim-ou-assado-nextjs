"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Autocomplete } from "@/components/Autocomplete";
import { Alimento, AlimentoSearchable } from "@/types";
import { calculateNutrition } from "@/services/nutritionCalculator";
import { tracker } from "@/services/monitoring";

interface CompensationModalProps {
  onClose: () => void;
  foods: AlimentoSearchable[];
  kcalIncrease: number | null;
}

export const CompensationModal = ({
  onClose,
  foods,
  kcalIncrease,
}: CompensationModalProps) => {
  const [compensationFood, setCompensationFood] = useState<Alimento | null>(
    null,
  );
  const [compensationSearch, setCompensationSearch] = useState("");

  const compensationWeight = useMemo(() => {
    if (!compensationFood || !kcalIncrease || !compensationFood) {
      return null;
    }
    const nutrition = calculateNutrition(compensationFood, 100);
    return Math.round((kcalIncrease * 100) / nutrition.kcal);
  }, [compensationFood, kcalIncrease]);

  const handleClose = useCallback(() => {
    setCompensationFood(null);
    setCompensationSearch("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-lg p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-base font-semibold text-gray-900">
            Qual alimento você gostaria de compensar?
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>
        <Autocomplete
          value={compensationSearch}
          onChange={(value) => {
            setCompensationSearch(value);
            if (!value) setCompensationFood(null);
          }}
          onSelect={(food) => {
            setCompensationFood(food);
            setCompensationSearch(food.nome);
            tracker.compensationFoodChanged(food.nome);
          }}
          foods={foods}
          placeholder="Selecione um alimento"
        />
        {compensationWeight !== null && (
          <p className="mt-4 text-lg text-gray-700">
            Reduza <strong>{compensationWeight}g</strong> para compensar as
            calorias
          </p>
        )}
      </div>
    </div>
  );
};
