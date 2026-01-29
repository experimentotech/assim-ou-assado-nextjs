"use client";

import { Autocomplete } from "@/components/Autocomplete";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CompensationModal } from "@/components/CompensationModal";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Logo } from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { alimentos } from "@/data/alimentos";
import { prepareSearchableList } from "@/services/foodSearch";
import { tracker } from "@/services/monitoring";
import {
  calculateDestinationQuantity,
  calculateNutrition,
} from "@/services/nutritionCalculator";
import { Alimento, AlimentoSearchable, ComparisonRow } from "@/types";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

const jsonLd: Record<string, string | object> = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Assim ou Assado - Calculadora de Macronutrientes",
  url: baseUrl,
  description:
    "Encontre um substituto para o seu alimento com base nas " +
    "proteínas, carboidratos e gorduras e não perca a sua dieta.",
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  browserRequirements: "requires HTML5 and JavaScript support",
  inLanguage: "pt-BR",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  author: {
    "@type": "Organization",
    name: "ExperimentoTech",
  },
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchableAlimentos, setSearchableAlimentos] = useState<
    AlimentoSearchable[]
  >([]);

  const [fromFood, setFromFood] = useState<Alimento | null>(null);
  const [fromFoodSearch, setFromFoodSearch] = useState("");
  const [fromQuantity, setFromQuantity] = useState("");

  const [toFood, setToFood] = useState<Alimento | null>(null);
  const [toFoodSearch, setToFoodSearch] = useState("");
  const [toQuantity, setToQuantity] = useState("");
  const [isCompensationOpen, setIsCompensationOpen] = useState(false);
  const fromUnit = fromFood?.medida_un != null ? "un" : "gr";
  const toUnit = toFood?.medida_un != null ? "un" : "gr";

  // Mock data for demonstration
  useEffect(() => {
    new Promise<void>((resolve) => {
      setSearchableAlimentos(prepareSearchableList(alimentos));
      resolve();
    });
  }, []);

  useEffect(() => {
    if (!fromFood || !toFood || !fromQuantity) {
      return;
    }

    const qty = parseFloat(fromQuantity);
    if (isNaN(qty) || qty == 0) {
      return;
    }

    const calculatedQty = calculateDestinationQuantity(fromFood, toFood, qty);
    const toQuantity = calculatedQty.toFixed(0);

    new Promise<void>((resolve) => {
      setToQuantity(toQuantity);
      tracker.compare({
        fromFood: fromFood.nome,
        fromQty: fromQuantity,
        fromClassif: fromFood.classif,
        toFood: toFood.nome,
        toQty: toQuantity,
        toClassif: toFood.classif,
      });
      resolve();
    });
  }, [fromFood, toFood, fromQuantity]);

  const handleFromFoodSelect = (food: Alimento) => {
    setFromFood(food);
    setFromFoodSearch(food.nome);
    tracker.initialFoodSelect(food.nome, food.classif);
  };

  const handleFromQuantityChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFromQuantity(val);
    if (!val) setToQuantity("");
  };

  const handleToFoodSelect = (food: Alimento) => {
    setToFood(food);
    setToFoodSearch(food.nome);
    tracker.destinationFoodSelect(food.nome, food.classif);
  };

  const handleFromFoodClear = () => {
    setFromFood(null);
    setFromFoodSearch("");
    setFromQuantity("");
    setToFood(null);
    setToFoodSearch("");
    setToQuantity("");
  };

  const handleToFoodClear = () => {
    setToFood(null);
    setToFoodSearch("");
    setToQuantity("");
  };

  const handleCompensationClose = () => {
    setIsCompensationOpen(false);
  };

  const handleCompensationClicked = () => {
    setIsCompensationOpen(true);
    tracker.compensationClicked();
  };

  const comparisonRows: ComparisonRow[] = useMemo(() => {
    if (!fromFood || !toFood || !fromQuantity || !toQuantity) {
      return [];
    }

    const fromQty = parseFloat(fromQuantity);
    const toQty = parseFloat(toQuantity);
    const fromNutrition = calculateNutrition(fromFood, fromQty);
    const toNutrition = calculateNutrition(toFood, toQty);

    return [
      {
        label: "Gr",
        fromValue: Math.round(fromNutrition.weight),
        toValue: Math.round(toNutrition.weight),
        isSelected: false,
        suffix: "g",
      },
      {
        label: "Kcal",
        fromValue: Math.round(fromNutrition.kcal),
        toValue: Math.round(toNutrition.kcal),
        isSelected: false,
        suffix: "",
      },
      {
        label: "Prot",
        fromValue: parseFloat(fromNutrition.prot.toFixed(1)),
        toValue: parseFloat(toNutrition.prot.toFixed(1)),
        isSelected: fromFood.classif === "P",
        suffix: "g",
      },
      {
        label: "Carb",
        fromValue: parseFloat(fromNutrition.carb.toFixed(1)),
        toValue: parseFloat(toNutrition.carb.toFixed(1)),
        isSelected: fromFood.classif === "C",
        suffix: "g",
      },
      {
        label: "Gord",
        fromValue: parseFloat(fromNutrition.gord.toFixed(1)),
        toValue: parseFloat(toNutrition.gord.toFixed(1)),
        isSelected: fromFood.classif === "L",
        suffix: "g",
      },
    ];
  }, [fromFood, toFood, fromQuantity, toQuantity]);

  const kcalIncreasePercent = useMemo(() => {
    const kcalRow = comparisonRows.find((row) => row.label === "Kcal");
    if (
      !kcalRow ||
      kcalRow.fromValue <= 0 ||
      kcalRow.toValue <= kcalRow.fromValue
    ) {
      return null;
    }

    const increase =
      ((kcalRow.toValue - kcalRow.fromValue) / kcalRow.fromValue) * 100;
    return Math.round(increase);
  }, [comparisonRows]);

  const kcalIncrease = useMemo(() => {
    const kcalRow = comparisonRows.find((row) => row.label === "Kcal");
    if (!kcalRow || kcalRow.toValue <= kcalRow.fromValue) {
      return null;
    }
    return kcalRow.toValue - kcalRow.fromValue;
  }, [comparisonRows]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <Link href="/">Assim ou Assado</Link>
            </h1>
            <p className="text-sm text-gray-600">por @experimentotech</p>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl w-full mx-auto px-4 py-8 flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Encontre a medida certa pra sua substituição
        </h2>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="space-y-4">
            <Autocomplete
              value={fromFoodSearch}
              onChange={(value) => {
                setFromFoodSearch(value);
                if (!value) handleFromFoodClear();
              }}
              onSelect={handleFromFoodSelect}
              foods={searchableAlimentos}
              placeholder="Ingrediente inicial"
            />

            <div className="grid grid-cols-4 gap-2">
              <input
                type="number"
                value={fromQuantity}
                onChange={handleFromQuantityChanged}
                placeholder="Quantidade"
                disabled={!fromFood}
                className="col-span-3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <div className="flex items-center justify-center border border-gray-300 rounded-lg text-gray-600">
                {fromUnit}
              </div>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="p-2 bg-white rounded-full border-gray-300 border-solid border-2">
                <Logo width={40} height={40} />
              </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <Autocomplete
              value={toFoodSearch}
              onChange={(value) => {
                setToFoodSearch(value);
                if (!value) handleToFoodClear();
              }}
              onSelect={handleToFoodSelect}
              foods={searchableAlimentos}
              placeholder="Ingrediente final"
              disabled={!fromFood}
              excludeId={fromFood?.id}
            />

            <div className="grid grid-cols-4 gap-2">
              <input
                type="number"
                value={toQuantity}
                readOnly
                placeholder="Quantidade"
                className="col-span-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
              />
              <div className="flex items-center justify-center border border-gray-300 rounded-lg text-gray-600">
                {toUnit}
              </div>
            </div>
          </div>
        </div>

        {comparisonRows.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Outras alterações
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <ComparisonTable rows={comparisonRows} />
              {kcalIncreasePercent !== null && (
                <div className="mt-6 flex flex-col gap-3">
                  <p className="text-lg text-gray-700">
                    Houve um aumento calorico de{" "}
                    <strong>{kcalIncreasePercent}%</strong> Gostaria de
                    compensar?
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCompensationClicked()}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Compensar
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t mt-auto flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a
              href="/assim-ou-assado/termos-de-uso"
              className="text-gray-600 hover:text-blue-600"
            >
              Termos de Uso
            </a>
            <a
              href="/assim-ou-assado/privacidade"
              className="text-gray-600 hover:text-blue-600"
            >
              Privacidade
            </a>
          </div>
        </div>
      </footer>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ConsentBanner />
      {isCompensationOpen && (
        <CompensationModal
          onClose={handleCompensationClose}
          foods={searchableAlimentos}
          kcalIncrease={kcalIncrease}
        />
      )}
    </div>
  );
}
