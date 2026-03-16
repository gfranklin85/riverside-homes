"use client";

import { useState } from "react";
import type { ListingFormData, ListingType, PropertyType } from "@/app/types/listing";

const listingTypes: { value: ListingType; label: string; icon: string; desc: string }[] = [
  {
    value: "owner",
    label: "Owner / Seller",
    icon: "home",
    desc: "I own this property and want to reach investors directly.",
  },
  {
    value: "realtor",
    label: "Realtor",
    icon: "real_estate_agent",
    desc: "I'm a licensed agent posting a client's deal to reach investors.",
  },
  {
    value: "developer",
    label: "Developer / Wholesaler",
    icon: "apartment",
    desc: "I'm sourcing capital or fractional buyers for a development deal.",
  },
];

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "single-family", label: "Single-Family" },
  { value: "multi-family", label: "Multi-Family" },
  { value: "condo", label: "Condo / Townhome" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "mixed-use", label: "Mixed-Use" },
];

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
  onNext: () => void;
}

export default function Step1Identity({ formData, onChange, onNext }: Props) {
  const [aiLoading, setAiLoading] = useState(false);

  const isValid =
    formData.listingType !== null &&
    formData.posterName.trim() !== "" &&
    formData.title.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.askingPrice.trim() !== "";

  function handleAiFill() {
    setAiLoading(true);
    setTimeout(() => setAiLoading(false), 1800);
  }

  return (
    <div className="space-y-8">
      {/* Listing type selector */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
          Who are you?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Select your role — it determines which fields appear in later steps.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {listingTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange({ listingType: t.value })}
              className={`flex flex-col items-start gap-3 p-5 rounded-2xl border-2 text-left transition-all ${
                formData.listingType === t.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <div
                className={`size-10 rounded-xl flex items-center justify-center ${
                  formData.listingType === t.value
                    ? "bg-primary text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                <span className="material-symbols-outlined">{t.icon}</span>
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {t.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Your info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.posterName}
            onChange={(e) => onChange({ posterName: e.target.value })}
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {formData.listingType === "realtor" && (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Brokerage
              </label>
              <input
                type="text"
                value={formData.posterBrokerage}
                onChange={(e) => onChange({ posterBrokerage: e.target.value })}
                placeholder="Brokerage name"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                DRE License #
              </label>
              <input
                type="text"
                value={formData.posterDreNumber}
                onChange={(e) => onChange({ posterDreNumber: e.target.value })}
                placeholder="e.g. 02145678"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </>
        )}
      </div>

      {/* Property basics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Property Details
          </h3>
          <button
            type="button"
            onClick={handleAiFill}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-black uppercase tracking-wider transition-colors disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-sm">
              {aiLoading ? "hourglass_empty" : "auto_awesome"}
            </span>
            {aiLoading ? "Filling…" : "Auto-fill with AI"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Listing Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Canyon Crest 4-Plex"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Street address, Riverside, CA"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Property Type
            </label>
            <select
              value={formData.propertyType ?? ""}
              onChange={(e) =>
                onChange({ propertyType: (e.target.value as PropertyType) || null })
              }
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select type…</option>
              {propertyTypes.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Asking Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                value={formData.askingPrice}
                onChange={(e) => onChange({ askingPrice: e.target.value })}
                placeholder="500000"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Beds
            </label>
            <input
              type="number"
              value={formData.beds}
              onChange={(e) => onChange({ beds: e.target.value })}
              placeholder="e.g. 3"
              min="0"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Baths
            </label>
            <input
              type="number"
              value={formData.baths}
              onChange={(e) => onChange({ baths: e.target.value })}
              placeholder="e.g. 2"
              min="0"
              step="0.5"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Sq Ft
          </label>
          <input
            type="number"
            value={formData.sqft}
            onChange={(e) => onChange({ sqft: e.target.value })}
            placeholder="e.g. 1800"
            min="0"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={4}
            placeholder="Describe the property, the opportunity, and what makes it attractive to investors…"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 transition-all"
        >
          Next: Media
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
