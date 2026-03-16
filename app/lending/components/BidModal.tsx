"use client";

import { useState } from "react";
import type { BorrowerProfile } from "@/app/types/lending";
import { submitLenderOffer } from "@/app/actions/submitLenderOffer";
import { computeMonthlyPayment, formatCurrency } from "@/app/lending/utils/calculations";

interface Props {
  profile: BorrowerProfile;
  onClose: () => void;
}

export default function BidModal({ profile, onClose }: Props) {
  const [lenderName, setLenderName] = useState("");
  const [lenderCompany, setLenderCompany] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [points, setPoints] = useState("0");
  const [loanTermYears, setLoanTermYears] = useState("30");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const rate = parseFloat(interestRate) || 0;
  const term = parseInt(loanTermYears) || 30;
  const monthlyPayment = computeMonthlyPayment(profile.desired_loan_amount, rate, term);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const result = await submitLenderOffer({
      borrowerProfileId: profile.id,
      lenderName,
      lenderCompany,
      interestRate: rate,
      points: parseFloat(points) || 0,
      loanTermYears: term,
      monthlyPaymentEstimate: monthlyPayment,
      notes,
    });

    if (result.status === "success") {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Submit Offer</h2>
            <p className="text-sm text-slate-500">
              Loan: {formatCurrency(profile.desired_loan_amount)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center text-center p-10 gap-4">
            <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-3xl">
                check_circle
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Offer Submitted!</h3>
            <p className="text-sm text-slate-500">
              Your pre-qualification offer has been sent to the borrower.
            </p>
            <button
              onClick={onClose}
              className="mt-2 bg-primary text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Your Name
                </label>
                <input
                  type="text"
                  value={lenderName}
                  onChange={(e) => setLenderName(e.target.value)}
                  required
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Company
                </label>
                <input
                  type="text"
                  value={lenderCompany}
                  onChange={(e) => setLenderCompany(e.target.value)}
                  required
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.75"
                    step="0.125"
                    min="0"
                    required
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                    %
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Points
                </label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  step="0.25"
                  min="0"
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Term (Years)
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(e.target.value)}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>

            {/* Auto-computed payment */}
            {monthlyPayment > 0 && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <span className="material-symbols-outlined text-primary">calculate</span>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">
                    Est. Monthly Payment
                  </p>
                  <p className="text-lg font-extrabold text-primary">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Additional terms, conditions, or notes for the borrower..."
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <span className="material-symbols-outlined text-red-500 text-[18px]">error</span>
                <p className="text-xs text-red-700 dark:text-red-400">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-60 transition-all"
            >
              {status === "submitting" ? "Submitting…" : "Submit Offer"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
