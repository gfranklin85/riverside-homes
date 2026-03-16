"use client";

import type { ListingType, DealType } from "@/app/types/listing";

type FilterType = ListingType | "all";
type FilterDeal = DealType | "all";

interface Props {
  filterType: FilterType;
  filterDeal: FilterDeal;
  onTypeChange: (v: FilterType) => void;
  onDealChange: (v: FilterDeal) => void;
}

const typeFilters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Listings" },
  { value: "owner", label: "Owner Listed" },
  { value: "realtor", label: "Realtor Listed" },
  { value: "developer", label: "Developer Listed" },
];

const dealFilters: { value: FilterDeal; label: string }[] = [
  { value: "all", label: "All Deal Types" },
  { value: "off-market", label: "Off-Market" },
  { value: "seller-finance", label: "Seller Finance" },
  { value: "value-add", label: "Value-Add" },
  { value: "fractional", label: "Fractional" },
];

export default function ExchangeFilterBar({
  filterType,
  filterDeal,
  onTypeChange,
  onDealChange,
}: Props) {
  return (
    <div
      className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-[80px] z-40 py-4 px-4 sm:px-6 lg:px-8"
      id="filters"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Listing type pills */}
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => onTypeChange(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                filterType === f.value
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Deal type select */}
        <select
          value={filterDeal}
          onChange={(e) => onDealChange(e.target.value as FilterDeal)}
          className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-2 text-slate-600 dark:text-slate-300 cursor-pointer focus:ring-2 focus:ring-primary outline-none"
        >
          {dealFilters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
