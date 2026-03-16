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
  { value: "single-family", label: "Single Family Home" },
  { value: "multi-family", label: "Multi-Family" },
  { value: "condo", label: "Apartment/Condo" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "mixed-use", label: "Mixed-Use" },
];

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
}

export default function Step1Identity({ formData, onChange }: Props) {
  const [aiLoading, setAiLoading] = useState(false);

  function handleAiFill() {
    setAiLoading(true);
    setTimeout(() => setAiLoading(false), 1800);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end -mb-2">
        <button
          type="button"
          onClick={handleAiFill}
          disabled={aiLoading}
          className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-sm">
            {aiLoading ? "hourglass_empty" : "auto_awesome"}
          </span>
          {aiLoading ? "Filling…" : "Auto-fill with AI"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Property Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="e.g. 123 Riverside Dr, Riverside, CA"
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Property Type
          </label>
          <select
            value={formData.propertyType ?? ""}
            onChange={(e) =>
              onChange({ propertyType: (e.target.value as PropertyType) || null })
            }
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select type…</option>
            {propertyTypes.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Tell us about the property features, location highlights..."
          rows={4}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
        />
      </div>

      {/* Additional fields */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Listing Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Canyon Crest 4-Plex"
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Asking Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input
              type="number"
              value={formData.askingPrice}
              onChange={(e) => onChange({ askingPrice: e.target.value })}
              placeholder="500000"
              className="w-full pl-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Beds</label>
          <input
            type="number"
            value={formData.beds}
            onChange={(e) => onChange({ beds: e.target.value })}
            placeholder="e.g. 3"
            min="0"
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Baths</label>
          <input
            type="number"
            value={formData.baths}
            onChange={(e) => onChange({ baths: e.target.value })}
            placeholder="e.g. 2"
            min="0"
            step="0.5"
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Sq Ft</label>
          <input
            type="number"
            value={formData.sqft}
            onChange={(e) => onChange({ sqft: e.target.value })}
            placeholder="e.g. 1800"
            min="0"
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name</label>
          <input
            type="text"
            value={formData.posterName}
            onChange={(e) => onChange({ posterName: e.target.value })}
            placeholder="Full name"
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Listing type */}
      <div className="pt-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-3">
          I am posting as…
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {listingTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange({ listingType: t.value })}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all ${
                formData.listingType === t.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  formData.listingType === t.value ? "text-primary" : "text-slate-400"
                }`}
              >
                {t.icon}
              </span>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{t.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {formData.listingType === "realtor" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Brokerage</label>
            <input
              type="text"
              value={formData.posterBrokerage}
              onChange={(e) => onChange({ posterBrokerage: e.target.value })}
              placeholder="Brokerage name"
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">DRE License #</label>
            <input
              type="text"
              value={formData.posterDreNumber}
              onChange={(e) => onChange({ posterDreNumber: e.target.value })}
              placeholder="e.g. 02145678"
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}
