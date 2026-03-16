"use client";

import type { ListingFormData, VisibilityTier } from "@/app/types/listing";

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const tiers: {
  value: VisibilityTier;
  label: string;
  price: string;
  icon: string;
  iconColor: string;
  benefits: string[];
  recommended?: boolean;
}[] = [
  {
    value: "free",
    label: "Free",
    price: "Included",
    icon: "storefront",
    iconColor: "text-slate-400",
    benefits: [
      "Standard listing placement",
      "Searchable by all users",
      "Basic listing card",
    ],
  },
  {
    value: "featured",
    label: "Featured",
    price: "$10 / mo",
    icon: "star",
    iconColor: "text-amber-500",
    benefits: [
      "Gold ★ badge on listing card",
      "Featured section placement",
      "Priority over free listings",
    ],
  },
  {
    value: "priority",
    label: "Priority",
    price: "$20 / mo",
    icon: "rocket_launch",
    iconColor: "text-primary",
    recommended: true,
    benefits: [
      "Top of search results",
      "Included in investor alert emails",
      "Priority + Featured badge",
    ],
  },
  {
    value: "spotlight",
    label: "Spotlight",
    price: "$29 / mo",
    icon: "flash_on",
    iconColor: "text-purple-500",
    benefits: [
      "Homepage feature slot",
      "Investor newsletter inclusion",
      "Dedicated priority support",
    ],
  },
];

export default function Step4Visibility({ formData, onChange, onNext, onBack }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
          Choose Your Visibility
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Every listing is free. Boost options get your deal in front of more
          investors, faster.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {tiers.map((tier) => (
          <button
            key={tier.value}
            type="button"
            onClick={() => onChange({ visibilityTier: tier.value })}
            className={`relative flex flex-col items-start gap-4 p-6 rounded-2xl border-2 text-left transition-all ${
              formData.visibilityTier === tier.value
                ? "border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/20"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
            }`}
          >
            {tier.recommended && (
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-wider">
                Popular
              </span>
            )}

            <div className="flex items-center gap-3 w-full">
              <div
                className={`size-10 rounded-xl flex items-center justify-center ${
                  formData.visibilityTier === tier.value
                    ? "bg-primary/10 dark:bg-primary/20"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <span className={`material-symbols-outlined filled-icon ${tier.iconColor}`}>
                  {tier.icon}
                </span>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white">
                  {tier.label}
                </p>
                <p className="text-sm font-bold text-primary">{tier.price}</p>
              </div>
              {formData.visibilityTier === tier.value && (
                <div className="ml-auto size-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-sm">
                    check
                  </span>
                </div>
              )}
            </div>

            <ul className="space-y-1.5 w-full">
              {tier.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                >
                  <span className="material-symbols-outlined text-primary text-sm shrink-0">
                    check_circle
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
        Paid tiers are for display purposes — no payment is collected during
        this preview.
      </p>

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
          Review Listing
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
