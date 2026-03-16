"use client";

import type { BorrowerProfile } from "@/app/types/lending";
import {
  formatCurrency,
  getDTIColor,
  getCreditLabel,
  computeDownPaymentPct,
} from "@/app/lending/utils/calculations";

interface Props {
  profile: BorrowerProfile;
  onBid: (profile: BorrowerProfile) => void;
}

const assetColors: Record<string, { bg: string; text: string }> = {
  residential: { bg: "bg-orange-50", text: "text-orange-700" },
  industrial: { bg: "bg-blue-50", text: "text-blue-700" },
  "mixed-use": { bg: "bg-purple-50", text: "text-purple-700" },
  commercial: { bg: "bg-green-50", text: "text-green-700" },
};

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
  bridge: "Bridge",
};

const employmentLabels: Record<string, string> = {
  employed: "Employed",
  "self-employed": "Self-Employed",
  retired: "Retired",
  other: "Other",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function BorrowerProfileCard({ profile, onBid }: Props) {
  const creditInfo = getCreditLabel(profile.credit_score_range);
  const downPct = computeDownPaymentPct(profile.down_payment_amount, profile.desired_loan_amount);
  const assetColor = assetColors[profile.asset_type] ?? { bg: "bg-slate-50", text: "text-slate-700" };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all group">
      {/* Colored header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`${assetColor.bg} ${assetColor.text} text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded`}
          >
            {assetLabels[profile.asset_type]} {purposeLabels[profile.loan_purpose]}
          </span>
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {timeAgo(profile.created_at)}
          </span>
        </div>
        <p className="text-white text-xl font-bold">
          {formatCurrency(profile.desired_loan_amount)}
        </p>
        <p className="text-slate-300 text-xs mt-1">Requested Loan Amount</p>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase">
              Credit Score
            </p>
            <p className="text-slate-900 dark:text-white font-semibold text-sm">
              {creditInfo.label}
              <span className="text-slate-400 ml-1 text-xs">({creditInfo.score})</span>
            </p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase">
              DTI Ratio
            </p>
            <p className={`font-semibold text-sm ${getDTIColor(profile.dti_ratio).split(" ")[0]}`}>
              {profile.dti_ratio}%
            </p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase">
              Down Payment
            </p>
            <p className="text-slate-900 dark:text-white font-semibold text-sm">
              {formatCurrency(profile.down_payment_amount)}{" "}
              <span className="text-slate-400 text-xs">({downPct}%)</span>
            </p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase">
              Employment
            </p>
            <p className="text-slate-900 dark:text-white font-semibold text-sm">
              {employmentLabels[profile.employment_status]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
          <span>Buying Power: {formatCurrency(profile.buying_power)}</span>
        </div>

        <button
          onClick={() => onBid(profile)}
          className="w-full bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors"
        >
          Submit Offer
        </button>
      </div>
    </div>
  );
}
