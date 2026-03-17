"use client";

import type { PrequalFormData, EmploymentStatus, CreditScoreRange } from "@/app/types/lending";

interface Props {
  formData: PrequalFormData;
  onChange: (updates: Partial<PrequalFormData>) => void;
}

const employmentOptions: { value: EmploymentStatus; label: string; icon: string }[] = [
  { value: "employed", label: "Employed", icon: "badge" },
  { value: "self-employed", label: "Self-Employed", icon: "storefront" },
  { value: "retired", label: "Retired", icon: "elderly" },
  { value: "other", label: "Other", icon: "more_horiz" },
];

const creditOptions: { value: CreditScoreRange; label: string; score: string }[] = [
  { value: "excellent", label: "Excellent", score: "800-850" },
  { value: "very-good", label: "Very Good", score: "740-799" },
  { value: "good", label: "Good", score: "680-739" },
  { value: "fair", label: "Fair", score: "620-679" },
  { value: "poor", label: "Poor", score: "Below 620" },
];

export default function Step1Financials({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Gross Monthly Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              value={formData.grossMonthlyIncome}
              onChange={(e) => onChange({ grossMonthlyIncome: e.target.value })}
              placeholder="0"
              min="0"
              className="w-full pl-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <p className="text-xs text-slate-400">Before taxes, all sources</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Monthly Debt Obligations
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              value={formData.monthlyDebtObligations}
              onChange={(e) => onChange({ monthlyDebtObligations: e.target.value })}
              placeholder="0"
              min="0"
              className="w-full pl-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <p className="text-xs text-slate-400">Car loans, credit cards, student loans, etc.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          Employment Status
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {employmentOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ employmentStatus: opt.value })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                formData.employmentStatus === opt.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  formData.employmentStatus === opt.value ? "text-primary" : "text-slate-400"
                }`}
              >
                {opt.icon}
              </span>
              <p className="font-bold text-xs text-slate-900 dark:text-white">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          Credit Score Range
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {creditOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ creditScoreRange: opt.value })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all ${
                formData.creditScoreRange === opt.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <p className="font-bold text-xs text-slate-900 dark:text-white">{opt.label}</p>
              <p
                className={`text-[10px] font-semibold ${
                  formData.creditScoreRange === opt.value ? "text-primary" : "text-slate-400"
                }`}
              >
                {opt.score}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
