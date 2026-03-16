"use client";

import type { ListingFormData, DealType } from "@/app/types/listing";

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
}

const dealTypes: { value: DealType; label: string; icon: string }[] = [
  { value: "off-market", label: "Off-Market", icon: "visibility_off" },
  { value: "seller-finance", label: "Seller Finance", icon: "account_balance" },
  { value: "value-add", label: "Value-Add", icon: "construction" },
  { value: "fractional", label: "Fractional", icon: "pie_chart" },
];

function computeCapRate(formData: ListingFormData): number | null {
  const price = parseFloat(formData.askingPrice) || 0;
  const rent = (parseFloat(formData.monthlyRent) || 0) * 12;
  const expenses = (parseFloat(formData.monthlyExpenses) || 0) * 12;
  const taxes = parseFloat(formData.propertyTaxes) || 0;
  const hoa = (parseFloat(formData.hoa) || 0) * 12;
  if (price <= 0 || rent <= 0) return null;
  const noi = rent - expenses - taxes - hoa;
  return parseFloat(((noi / price) * 100).toFixed(2));
}

export default function Step3Financials({ formData, onChange }: Props) {
  const capRate = computeCapRate(formData);

  return (
    <div className="space-y-6">
      {/* Primary 3-col grid matching mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Monthly Rent/Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              value={formData.monthlyRent}
              onChange={(e) => onChange({ monthlyRent: e.target.value })}
              placeholder="0.00"
              min="0"
              className="w-full pl-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Est. Operating Expenses
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              value={formData.monthlyExpenses}
              onChange={(e) => onChange({ monthlyExpenses: e.target.value })}
              placeholder="0.00"
              min="0"
              className="w-full pl-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Property Tax (Annual)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              value={formData.propertyTaxes}
              onChange={(e) => onChange({ propertyTaxes: e.target.value })}
              placeholder="0.00"
              min="0"
              className="w-full pl-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Deal type */}
      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          Deal Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dealTypes.map((dt) => (
            <button
              key={dt.value}
              type="button"
              onClick={() => onChange({ dealType: dt.value })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                formData.dealType === dt.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  formData.dealType === dt.value ? "text-primary" : "text-slate-400"
                }`}
              >
                {dt.icon}
              </span>
              <p className="font-bold text-xs text-slate-900 dark:text-white">{dt.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Realtor co-op commission */}
      {formData.listingType === "realtor" && (
        <div className="flex flex-col gap-2 max-w-xs">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Co-op Commission (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.coopCommission}
              onChange={(e) => onChange({ coopCommission: e.target.value })}
              placeholder="2.5"
              min="0"
              max="10"
              step="0.25"
              className="w-full rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
              %
            </span>
          </div>
        </div>
      )}

      {/* Live cap rate */}
      {capRate !== null && (
        <div className="flex items-center gap-4 p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="size-10 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-sm">trending_up</span>
          </div>
          <div>
            <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-wider mb-0.5">
              Estimated Cap Rate
            </p>
            <p className="text-2xl font-extrabold text-green-700 dark:text-green-300">
              {capRate.toFixed(2)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
