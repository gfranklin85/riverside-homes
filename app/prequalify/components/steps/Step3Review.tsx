"use client";

import type { PrequalFormData } from "@/app/types/lending";
import {
  computeDTI,
  computeBuyingPower,
  computeDownPaymentPct,
  formatCurrency,
  getDTIColor,
  getCreditLabel,
} from "@/app/lending/utils/calculations";

interface Props {
  formData: PrequalFormData;
}

const assetLabels: Record<string, string> = {
  residential: "Residential",
  industrial: "Industrial",
  "mixed-use": "Mixed Use",
  commercial: "Commercial",
};

const purposeLabels: Record<string, string> = {
  purchase: "Purchase",
  refinance: "Refinance",
  "cash-out-refi": "Cash-Out Refi",
  bridge: "Bridge Loan",
};

const employmentLabels: Record<string, string> = {
  employed: "Employed",
  "self-employed": "Self-Employed",
  retired: "Retired",
  other: "Other",
};

export default function Step3Review({ formData }: Props) {
  const income = parseFloat(formData.grossMonthlyIncome) || 0;
  const debt = parseFloat(formData.monthlyDebtObligations) || 0;
  const loanAmt = parseFloat(formData.desiredLoanAmount) || 0;
  const downPmt = parseFloat(formData.downPaymentAmount) || 0;

  const dti = computeDTI(debt, income);
  const buyingPower = computeBuyingPower(loanAmt, downPmt);
  const downPct = computeDownPaymentPct(downPmt, loanAmt);
  const creditInfo = formData.creditScoreRange ? getCreditLabel(formData.creditScoreRange) : null;

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {income > 0 && (
          <div
            className={`flex items-center gap-4 p-5 rounded-xl border ${getDTIColor(dti)} ${
              dti < 36
                ? "border-green-200 dark:border-green-800"
                : dti < 43
                  ? "border-amber-200 dark:border-amber-800"
                  : "border-red-200 dark:border-red-800"
            }`}
          >
            <div
              className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${
                dti < 36 ? "bg-green-500" : dti < 43 ? "bg-amber-500" : "bg-red-500"
              }`}
            >
              <span className="material-symbols-outlined text-white text-sm">monitoring</span>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider mb-0.5">DTI Ratio</p>
              <p className="text-2xl font-extrabold">{dti}%</p>
            </div>
          </div>
        )}

        {buyingPower > 0 && (
          <div className="flex items-center gap-4 p-5 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
            <div className="size-10 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-sm">account_balance</span>
            </div>
            <div>
              <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">
                Buying Power
              </p>
              <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                {formatCurrency(buyingPower)}
              </p>
            </div>
          </div>
        )}

        {downPct > 0 && (
          <div className="flex items-center gap-4 p-5 rounded-xl bg-purple-50 border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
            <div className="size-10 rounded-lg bg-purple-500 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-sm">savings</span>
            </div>
            <div>
              <p className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-0.5">
                Down Payment
              </p>
              <p className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">
                {downPct}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Summary table */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">
          Application Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Gross Monthly Income</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {income > 0 ? formatCurrency(income) : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Monthly Debt</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {debt > 0 ? formatCurrency(debt) : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Employment</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {formData.employmentStatus ? employmentLabels[formData.employmentStatus] : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Credit Score</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {creditInfo ? `${creditInfo.label} (${creditInfo.score})` : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Loan Amount</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {loanAmt > 0 ? formatCurrency(loanAmt) : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Down Payment</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {downPmt > 0 ? formatCurrency(downPmt) : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Asset Type</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {formData.assetType ? assetLabels[formData.assetType] : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-sm text-slate-500">Loan Purpose</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {formData.loanPurpose ? purposeLabels[formData.loanPurpose] : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* DTI guidance */}
      {income > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            DTI Guidance
          </h4>
          <div className="flex flex-col gap-1 text-xs text-slate-500">
            <p>
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2 align-middle" />
              <strong>Below 36%</strong> — Healthy. Most lenders consider this ideal.
            </p>
            <p>
              <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2 align-middle" />
              <strong>36%–43%</strong> — Acceptable. Some lenders may approve with conditions.
            </p>
            <p>
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2 align-middle" />
              <strong>Above 43%</strong> — High risk. May need to reduce debt before qualifying.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
