"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { submitPrequalification } from "@/app/actions/submitPrequalification";
import type { PrequalFormData } from "@/app/types/lending";
import {
  computeDTI,
  computeBuyingPower,
  formatCurrency,
  getDTIColor,
} from "@/app/lending/utils/calculations";
import Step1Financials from "./steps/Step1Financials";
import Step2LoanDetails from "./steps/Step2LoanDetails";
import Step3Review from "./steps/Step3Review";

const STEP_NAMES = ["Financial Profile", "Loan Details", "Review & Submit"];

const INITIAL_FORM: PrequalFormData = {
  grossMonthlyIncome: "",
  monthlyDebtObligations: "",
  employmentStatus: null,
  creditScoreRange: null,
  desiredLoanAmount: "",
  downPaymentAmount: "",
  assetType: null,
  loanPurpose: null,
};

function StepSection({
  step,
  title,
  active,
  children,
}: {
  step: number;
  title: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-10" id={`step-${step}`}>
      <div className="flex items-center gap-3 mb-6">
        <span
          className={`flex items-center justify-center size-8 rounded-full font-bold text-sm shrink-0 transition-colors ${
            active
              ? "bg-primary text-white"
              : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          {step}
        </span>
        <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold">{title}</h2>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
        {children}
      </div>
    </section>
  );
}

export default function PrequalFormWrapper() {
  const [formData, setFormData] = useState<PrequalFormData>(INITIAL_FORM);
  const [state, action, isPending] = useActionState(submitPrequalification, {
    status: "idle",
    message: "",
  });

  function onChange(updates: Partial<PrequalFormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }

  const step1Done =
    formData.grossMonthlyIncome.trim() !== "" &&
    formData.employmentStatus !== null &&
    formData.creditScoreRange !== null;
  const step2Done =
    formData.desiredLoanAmount.trim() !== "" &&
    formData.assetType !== null &&
    formData.loanPurpose !== null;

  const activeStep = !step1Done ? 1 : !step2Done ? 2 : 3;
  const progress = Math.round((activeStep / 3) * 100);
  const stepName = STEP_NAMES[activeStep - 1];

  if (state.status === "success") {
    const income = parseFloat(formData.grossMonthlyIncome) || 0;
    const debt = parseFloat(formData.monthlyDebtObligations) || 0;
    const loanAmt = parseFloat(formData.desiredLoanAmount) || 0;
    const downPmt = parseFloat(formData.downPaymentAmount) || 0;
    const dti = computeDTI(debt, income);
    const buyingPower = computeBuyingPower(loanAmt, downPmt);

    return (
      <div className="flex flex-col items-center text-center py-20 gap-6">
        <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">
            check_circle
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Pre-Qualification Submitted!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">{state.message}</p>
        </div>

        <div className="flex gap-6 items-center justify-center">
          <div
            className={`px-6 py-4 rounded-xl ${getDTIColor(dti)} ${
              dti < 36
                ? "border border-green-200"
                : dti < 43
                  ? "border border-amber-200"
                  : "border border-red-200"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-wider mb-1">DTI Ratio</p>
            <p className="text-3xl font-extrabold">{dti}%</p>
          </div>
          <div className="px-6 py-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-xs font-black text-blue-600 uppercase tracking-wider mb-1">
              Buying Power
            </p>
            <p className="text-3xl font-extrabold text-blue-700">{formatCurrency(buyingPower)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Link
            href="/lending"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-xl transition-all"
          >
            View Lender Marketplace
          </Link>
          <Link
            href="/"
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold py-3.5 px-8 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-10">
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-end">
            <div>
              <p className="text-slate-900 dark:text-slate-100 text-lg font-bold">
                Progress: {stepName}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Step {activeStep} of 3
              </p>
            </div>
            <p className="text-primary text-xl font-black">{progress}%</p>
          </div>
          <div className="rounded-full bg-slate-100 dark:bg-slate-800 h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step sections */}
      <div className="flex flex-col gap-12">
        <StepSection step={1} title="Financial Profile" active={true}>
          <Step1Financials formData={formData} onChange={onChange} />
        </StepSection>

        <StepSection step={2} title="Loan Details" active={activeStep >= 2}>
          <Step2LoanDetails formData={formData} onChange={onChange} />
        </StepSection>

        <StepSection step={3} title="Review & Submit" active={activeStep >= 3}>
          <Step3Review formData={formData} />
        </StepSection>

        {/* Error */}
        {state.status === "error" && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <span className="material-symbols-outlined text-red-500">error</span>
            <p className="text-sm text-red-700 dark:text-red-400">{state.message}</p>
          </div>
        )}

        {/* Bottom actions */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 mb-20">
          <p className="text-slate-500 dark:text-slate-400 text-sm italic">
            Your financial profile is anonymized — no personal information is shared with lenders.
          </p>
          <form action={action}>
            <input type="hidden" name="grossMonthlyIncome" value={formData.grossMonthlyIncome} />
            <input
              type="hidden"
              name="monthlyDebtObligations"
              value={formData.monthlyDebtObligations}
            />
            <input
              type="hidden"
              name="employmentStatus"
              value={formData.employmentStatus ?? ""}
            />
            <input
              type="hidden"
              name="creditScoreRange"
              value={formData.creditScoreRange ?? ""}
            />
            <input type="hidden" name="desiredLoanAmount" value={formData.desiredLoanAmount} />
            <input type="hidden" name="downPaymentAmount" value={formData.downPaymentAmount} />
            <input type="hidden" name="assetType" value={formData.assetType ?? ""} />
            <input type="hidden" name="loanPurpose" value={formData.loanPurpose ?? ""} />
            <button
              type="submit"
              disabled={isPending}
              className="px-12 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-60 transition-all"
            >
              {isPending ? "Submitting…" : "Submit Pre-Qualification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
