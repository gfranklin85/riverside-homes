"use client";

import type { PrequalFormData, AssetType, LoanPurpose } from "@/app/types/lending";

interface Props {
  formData: PrequalFormData;
  onChange: (updates: Partial<PrequalFormData>) => void;
}

const assetTypes: { value: AssetType; label: string; icon: string }[] = [
  { value: "residential", label: "Residential", icon: "home" },
  { value: "industrial", label: "Industrial", icon: "factory" },
  { value: "mixed-use", label: "Mixed Use", icon: "domain" },
  { value: "commercial", label: "Commercial", icon: "store" },
];

const loanPurposes: { value: LoanPurpose; label: string; icon: string }[] = [
  { value: "purchase", label: "Purchase", icon: "shopping_cart" },
  { value: "refinance", label: "Refinance", icon: "autorenew" },
  { value: "cash-out-refi", label: "Cash-Out Refi", icon: "payments" },
  { value: "bridge", label: "Bridge Loan", icon: "swap_horiz" },
];

export default function Step2LoanDetails({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Desired Loan Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              value={formData.desiredLoanAmount}
              onChange={(e) => onChange({ desiredLoanAmount: e.target.value })}
              placeholder="0"
              min="0"
              className="w-full pl-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Down Payment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              value={formData.downPaymentAmount}
              onChange={(e) => onChange({ downPaymentAmount: e.target.value })}
              placeholder="0"
              min="0"
              className="w-full pl-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          Desired Asset Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {assetTypes.map((at) => (
            <button
              key={at.value}
              type="button"
              onClick={() => onChange({ assetType: at.value })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                formData.assetType === at.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  formData.assetType === at.value ? "text-primary" : "text-slate-400"
                }`}
              >
                {at.icon}
              </span>
              <p className="font-bold text-xs text-slate-900 dark:text-white">{at.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          Loan Purpose
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {loanPurposes.map((lp) => (
            <button
              key={lp.value}
              type="button"
              onClick={() => onChange({ loanPurpose: lp.value })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                formData.loanPurpose === lp.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  formData.loanPurpose === lp.value ? "text-primary" : "text-slate-400"
                }`}
              >
                {lp.icon}
              </span>
              <p className="font-bold text-xs text-slate-900 dark:text-white">{lp.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
