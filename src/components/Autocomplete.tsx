"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, Search, X } from "lucide-react";
import { Alimento, AlimentoSearchable } from "@/types";
import { normalizeText, searchFoods } from "@/services/foodSearch";
import { tracker } from "@/services/monitoring";

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (food: Alimento) => void;
  foods: AlimentoSearchable[];
  placeholder: string;
  disabled?: boolean;
  excludeId?: number;
  maxResults?: number;
}

const suggestionsSet = new Set();

export const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  foods,
  placeholder,
  disabled = false,
  excludeId,
  maxResults = 6,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [suggestionStatus, setSuggestionStatus] = useState<
    "idle" | "sent" | "hidden"
  >("idle");
  const hideTimeoutRef = useRef<number | null>(null);

  const results = searchFoods(value, foods, excludeId).slice(0, maxResults);
  const normalizedSuggestion = normalizeText(value).trim().slice(0, 48);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      onSelect(results[selectedIndex]);
      setIsOpen(false);
    }
  };

  const handleNoResultsClick = () => {
    if (!normalizedSuggestion || suggestionStatus !== "idle") return;
    tracker.noResultSuggestion(normalizedSuggestion);
    suggestionsSet.add(normalizedSuggestion);
    setSuggestionStatus("sent");
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      setSuggestionStatus("hidden");
    }, 3000);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
            setSuggestionStatus("idle");
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        {value && (
          <button
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((food, index) => (
              <button
                key={food.id}
                onClick={() => {
                  onSelect(food);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 ${
                  index === selectedIndex ? "bg-gray-100" : ""
                }`}
              >
                {food.nome}
              </button>
            ))
          ) : value ? (
            <div className="flex items-center gap-3 px-4 py-3 text-gray-500">
              <span>Nenhum resultado encontrado</span>
              {suggestionStatus === "idle" &&
                !suggestionsSet.has(normalizedSuggestion) && (
                  <button
                    type="button"
                    onClick={handleNoResultsClick}
                    disabled={
                      !normalizedSuggestion || suggestionStatus !== "idle"
                    }
                    className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                    aria-label="Sugerir"
                  >
                    <span className="text-sm font-medium">Sugerir</span>
                  </button>
                )}
              {suggestionStatus === "sent" && (
                <div className="ml-auto text-green-600">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 text-gray-500">
              <span>Pesquise um alimento</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
