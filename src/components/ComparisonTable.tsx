import { ComparisonRow } from "@/types";
import { ChevronRight } from "lucide-react";

export const ComparisonTable: React.FC<{ rows: ComparisonRow[] }> = ({ rows }) => (
  <div className="space-y-3">
    {rows.map((row, index) => (
      <div
        key={index}
        className={`flex items-center gap-2 text-lg ${
          row.isSelected ? 'text-gray-500' : 'text-black'
        }`}
      >
        <div className="font-medium w-12 flex-shrink-0">{row.label}</div>
        <div className={`flex-1 border-b-2 border-dotted min-w-0 ${
          row.isSelected ? 'border-gray-500' : 'border-black'
        }`}></div>
        <div className="text-right w-16 flex-shrink-0">{row.fromValue}{row.suffix}</div>
        <div className="flex items-center flex-shrink-0">
          <div className={`border-b-2 border-dotted w-4 ${
            row.isSelected ? 'border-gray-500' : 'border-black'
          }`}></div>
          <ChevronRight className="w-4 h-4" />
        </div>
        <div className="text-left w-32 flex-shrink-0">
          {row.toValue}{row.suffix}
          {!row.isSelected && row.toValue !== row.fromValue && (
            <sup className="ml-1">
              <strong>
                <em>
                  ({row.toValue > row.fromValue ? '+' : ''}
                  {(row.toValue - row.fromValue).toFixed(row.label === 'Gr' || row.label === 'Kcal' ? 0 : 1)})
                </em>
              </strong>
            </sup>
          )}
        </div>
      </div>
    ))}
  </div>
);
