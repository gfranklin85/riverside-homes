"use client";

import type { ListingFormData, DealType } from "@/app/types/listing";

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const dealTypes: { value: DealType; label: string; desc: string }[] = [
  { value: "off-market", label: "Off-Market", desc: "Not listed on MLS" },
  { value: "seller-finance", label: "Seller Finance", desc: "Owner carries paper" },
  { value: "value-add", label: "Value-Add", desc: "Below-market rents or renovation play" },
  { value: "fractional", label: "Fractional", desc: "Equity share or partnership" },
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

export default function Step3Financials({ formData, onChange, onNext, onBack }: Props) {
  const capRate = computeCapRate(formData);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
          Financial Details
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          These numbers get embedded in your listing so investors can analyze
          the deal without emailing you first.
        </p>
      </div>

      {/* Deal type */}
      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          Deal Type
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {dealTypes.map((dt) => (
            <button
              key={dt.value}
              type="button"
              onClick={() => onChange({ dealType: dt.value })}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                formData.dealType === dt.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <div
                className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                  formData.dealType === dt.value
                    ? "bg-primary text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {dt.value === "off-market"
                    ? "visibility_off"
                    : dt.value === "seller-finance"
                    ? "account_balance"
                    : dt.value === "value-add"
                    ? "construction"
                    : "pie_chart"}
                </span>
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {dt.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {dt.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Income / expense fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Monthly Rent (gross)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
            <input
              type="number"
              value={formData.monthlyRent}
              onChange={(e) => onChange({ monthlyRent: e.target.value })}
              placeholder="3200"
              min="0"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Monthly Expenses (excl. taxes)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
            <input
              type="number"
              value={formData.monthlyExpenses}
              onChange={(e) => onChange({ monthlyExpenses: e.target.value })}
              placeholder="450"
              min="0"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Annual Property Taxes
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
            <input
              type="number"
              value={formData.propertyTaxes}
              onChange={(e) => onChange({ propertyTaxes: e.target.value })}
              placeholder="6000"
              min="0"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Monthly HOA
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
            <input
              type="number"
              value={formData.hoa}
              onChange={(e) => onChange({ hoa: e.target.value })}
              placeholder="0"
              min="0"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Realtor-only: co-op commission */}
      {formData.listingType === "realtor" && (
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Co-op Commission (%)
          </label>
          <div className="relative max-w-xs">
            <input
              type="number"
              value={formData.coopCommission}
              onChange={(e) => onChange({ coopCommission: e.target.value })}
              placeholder="2.5"
              min="0"
              max="10"
              step="0.25"
              className="w-full rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 px-4 py-3 pr-10 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              %
            </span>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1.5 font-medium">
            Shown to buyer agents and investors on your listing card.
          </p>
        </div>
      )}

      {/* Live cap rate display */}
      {capRate !== null && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="size-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white">trending_up</span>
          </div>
          <div>
            <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-wider mb-0.5">
              Estimated Cap Rate
            </p>
            <p className="text-3xl font-extrabold text-green-700 dark:text-green-300">
              {capRate.toFixed(2)}%
            </p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
              Based on the numbers you entered — investors will see this on your
              listing.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold py-3.5 px-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 transition-all"
        >
          Next: Visibility
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
