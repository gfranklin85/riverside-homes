"use client";

import type { ListingFormData, VisibilityTier } from "@/app/types/listing";

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
}

const tiers: {
  value: VisibilityTier;
  label: string;
  badge?: string;
  price: string;
  desc: string;
}[] = [
  {
    value: "free",
    label: "Free Posting",
    price: "$0.00",
    desc: "Visible to all registered investors on the exchange network.",
  },
  {
    value: "spotlight",
    label: "Boost for 3 days",
    badge: "Most Popular",
    price: "$29.00",
    desc: "Priority ranking in searches and featured on the home dashboard.",
  },
];

export default function Step4Visibility({ formData, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tiers.map((tier) => {
        const selected = formData.visibilityTier === tier.value;
        return (
          <button
            key={tier.value}
            type="button"
            onClick={() => onChange({ visibilityTier: tier.value })}
            className={`relative flex cursor-pointer rounded-xl border-2 p-6 text-left transition-all ${
              selected
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/40"
            }`}
          >
            <div className="flex flex-col flex-1">
              {tier.badge && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {tier.badge}
                  </span>
                  <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                </div>
              )}
              {!tier.badge && (
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Standard
                </span>
              )}
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{tier.label}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{tier.desc}</p>
              <p
                className={`font-black mt-4 ${
                  tier.value === "spotlight" ? "text-primary" : "text-slate-900 dark:text-slate-100"
                }`}
              >
                {tier.price}
              </p>
            </div>
            <div className="ml-4 shrink-0">
              <div
                className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selected
                    ? "border-primary bg-primary"
                    : "border-slate-300 dark:border-slate-700"
                }`}
              >
                {selected && <div className="size-2 rounded-full bg-white" />}
              </div>
            </div>
          </button>
        );
      })}
      <p className="col-span-full text-xs text-slate-400 dark:text-slate-500 text-center">
        Paid tiers are for display purposes — no payment is collected during this preview.
      </p>
    </div>
  );
}
