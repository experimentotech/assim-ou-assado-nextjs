"use client";

import { Autocomplete } from "@/components/Autocomplete";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Logo } from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { alimentos } from "@/data/alimentos";
import { prepareSearchableList } from "@/services/foodSearch";
import { calculateDestinationQuantity, calculateNutrition } from "@/services/nutritionCalculator";
import { Alimento, AlimentoSearchable, ComparisonRow } from "@/types";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchableAlimentos, setSearchableAlimentos] = useState<AlimentoSearchable[]>([]);
  
  const [fromFood, setFromFood] = useState<Alimento | null>(null);
  const [fromFoodSearch, setFromFoodSearch] = useState('');
  const [fromQuantity, setFromQuantity] = useState('');
  
  const [toFood, setToFood] = useState<Alimento | null>(null);
  const [toFoodSearch, setToFoodSearch] = useState('');
  const [toQuantity, setToQuantity] = useState('');
  
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

    new Promise<void>((resolve) => {
      setToQuantity(calculatedQty.toFixed(0));
      resolve();
    });
  }, [fromFood, toFood, fromQuantity]);
  
  const handleFromFoodSelect = (food: Alimento) => {
    setFromFood(food);
    setFromFoodSearch(food.nome);
  };
  
  const handleToFoodSelect = (food: Alimento) => {
    setToFood(food);
    setToFoodSearch(food.nome);
  };
  
  const handleFromFoodClear = () => {
    setFromFood(null);
    setFromFoodSearch('');
    setFromQuantity('');
    setToFood(null);
    setToFoodSearch('');
    setToQuantity('');
  };
  
  const handleToFoodClear = () => {
    setToFood(null);
    setToFoodSearch('');
    setToQuantity('');
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
        label: 'Gr',
        fromValue: Math.round(fromNutrition.weight),
        toValue: Math.round(toNutrition.weight),
        isSelected: false,
        suffix: 'g'
      },
      {
        label: 'Kcal',
        fromValue: Math.round(fromNutrition.kcal),
        toValue: Math.round(toNutrition.kcal),
        isSelected: false,
        suffix: ''
      },
      {
        label: 'Prot',
        fromValue: parseFloat(fromNutrition.prot.toFixed(1)),
        toValue: parseFloat(toNutrition.prot.toFixed(1)),
        isSelected: fromFood.classif === 'P',
        suffix: 'g'
      },
      {
        label: 'Carb',
        fromValue: parseFloat(fromNutrition.carb.toFixed(1)),
        toValue: parseFloat(toNutrition.carb.toFixed(1)),
        isSelected: fromFood.classif === 'C',
        suffix: 'g'
      },
      {
        label: 'Gord',
        fromValue: parseFloat(fromNutrition.gord.toFixed(1)),
        toValue: parseFloat(toNutrition.gord.toFixed(1)),
        isSelected: fromFood.classif === 'L',
        suffix: 'g'
      }
    ];
  }, [fromFood, toFood, fromQuantity, toQuantity]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900"><Link href="/">Assim ou Assado</Link></h1>
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
                onChange={(e) => {
                  setFromQuantity(e.target.value);
                  if (!e.target.value) setToQuantity('');
                }}
                placeholder="Quantidade"
                disabled={!fromFood}
                className="col-span-3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <div className="flex items-center justify-center border border-gray-300 rounded-lg text-gray-600">
                gr
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
                gr
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
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-white border-t mt-auto flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a href="/assim-ou-assado/termos-de-uso" className="text-gray-600 hover:text-blue-600">
              Termos de Uso
            </a>
            <a href="/assim-ou-assado/privacidade" className="text-gray-600 hover:text-blue-600">
              Privacidade
            </a>
            <a
              href="https://github.com/experimentotech/assim-ou-assado-webapp"
              className="text-gray-600 hover:text-blue-600"
            >
              GitHub
            </a>
            <a
              href="https://youtube.com/@ExperimentoTech"
              className="text-gray-600 hover:text-blue-600"
            >
              YouTube
            </a>
            <a
              href="https://www.experimentotech.com"
              className="text-gray-600 hover:text-blue-600"
            >
              Site
            </a>
          </div>
        </div>
      </footer>
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ConsentBanner />
    </div>
  );
};
