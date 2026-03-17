"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { submitListing } from "@/app/actions/submitListing";
import type {
  ListingFormData,
  ListingType,
  PropertyType,
  DealType,
  VisibilityTier,
} from "@/app/types/listing";

/* ── step definitions ─────────────────────────────────────────────── */

const STEPS = [
  { key: "address", label: "Property Address", icon: "location_on" },
  { key: "type", label: "Property Type", icon: "home_work" },
  { key: "price", label: "Asking Price", icon: "payments" },
  { key: "rent", label: "Monthly Income", icon: "account_balance_wallet" },
  { key: "expenses", label: "Operating Expenses", icon: "receipt_long" },
  { key: "photos", label: "Upload Photos", icon: "add_photo_alternate" },
  { key: "visibility", label: "Visibility", icon: "campaign" },
  { key: "review", label: "Review & Submit", icon: "task_alt" },
] as const;

const PROPERTY_TYPES: { value: PropertyType; label: string; icon: string }[] = [
  { value: "single-family", label: "Single Family", icon: "house" },
  { value: "multi-family", label: "Multi-Family", icon: "holiday_village" },
  { value: "condo", label: "Apartment / Condo", icon: "apartment" },
  { value: "commercial", label: "Commercial", icon: "storefront" },
  { value: "land", label: "Land", icon: "landscape" },
  { value: "mixed-use", label: "Mixed-Use", icon: "domain" },
];

const VISIBILITY_TIERS: {
  value: VisibilityTier;
  label: string;
  price: string;
  desc: string;
  badge?: string;
}[] = [
  {
    value: "free",
    label: "Free Posting",
    price: "$0",
    desc: "Visible to all registered investors on the exchange.",
  },
  {
    value: "spotlight",
    label: "Spotlight Boost",
    price: "$29",
    badge: "Popular",
    desc: "Priority ranking + featured on the home dashboard for 3 days.",
  },
];

/* ── initial state ────────────────────────────────────────────────── */

const INITIAL_FORM: ListingFormData = {
  listingType: null,
  title: "",
  address: "",
  propertyType: null,
  beds: "",
  baths: "",
  sqft: "",
  askingPrice: "",
  description: "",
  posterName: "",
  posterBrokerage: "",
  posterDreNumber: "",
  imageUrls: [""],
  monthlyRent: "",
  monthlyExpenses: "",
  propertyTaxes: "",
  hoa: "",
  dealType: null,
  coopCommission: "",
  visibilityTier: "free",
};

/* ── helpers ──────────────────────────────────────────────────────── */

function fmt$(v: string) {
  const n = parseFloat(v);
  if (!v || isNaN(n)) return "—";
  return "$" + n.toLocaleString("en-US");
}

function capRate(fd: ListingFormData): string | null {
  const price = parseFloat(fd.askingPrice) || 0;
  const rent = (parseFloat(fd.monthlyRent) || 0) * 12;
  const exp = (parseFloat(fd.monthlyExpenses) || 0) * 12;
  if (price <= 0 || rent <= 0) return null;
  return ((rent - exp) / price * 100).toFixed(2);
}

/* ── component ────────────────────────────────────────────────────── */

export default function PostFormWrapper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ListingFormData>(INITIAL_FORM);
  const [state, action, isPending] = useActionState(submitListing, {
    status: "idle",
    message: "",
  });

  const current = STEPS[step];
  const total = STEPS.length;

  function onChange(updates: Partial<ListingFormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function next() {
    setStep((s) => Math.min(total - 1, s + 1));
  }

  /* ── success screen ─── */
  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 gap-6 min-h-[60vh]">
        <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">
            check_circle
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Listing Submitted!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            {state.message}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/exchange"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-xl transition-all"
          >
            Browse the Exchange
          </Link>
          <Link
            href="/post"
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold py-3.5 px-8 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            Post Another
          </Link>
        </div>
      </div>
    );
  }

  /* ── wizard ─── */
  return (
    <div className="flex flex-col min-h-[70vh]">
      {/* ── header ─── */}
      <div className="mb-2">
        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-1">
          Step {step + 1} of {total}
        </p>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">
            {current.icon}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {current.label}
          </h2>
        </div>
      </div>

      {/* ── progress bar ─── */}
      <div className="rounded-full bg-slate-100 dark:bg-slate-800 h-1.5 overflow-hidden mb-10">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {/* ── content ─── */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="w-full max-w-lg">
          {current.key === "address" && (
            <div className="space-y-2">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => onChange({ address: e.target.value })}
                placeholder="123 Riverside Dr, Riverside, CA"
                className="w-full text-xl sm:text-2xl font-semibold text-center border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
                Enter the full street address of the property
              </p>
            </div>
          )}

          {current.key === "type" && (
            <div className="grid grid-cols-2 gap-3">
              {PROPERTY_TYPES.map((pt) => {
                const selected = formData.propertyType === pt.value;
                return (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => onChange({ propertyType: pt.value })}
                    className={`flex flex-col items-center gap-3 rounded-2xl border-2 py-6 px-4 transition-all ${
                      selected
                        ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-primary/40 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-3xl ${
                        selected ? "text-primary" : "text-slate-400"
                      }`}
                    >
                      {pt.icon}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        selected
                          ? "text-primary"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {pt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {current.key === "price" && (
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-2xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={formData.askingPrice}
                  onChange={(e) => onChange({ askingPrice: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full pl-10 text-xl sm:text-2xl font-semibold text-center border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
                What are you asking for this property?
              </p>
            </div>
          )}

          {current.key === "rent" && (
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-2xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={formData.monthlyRent}
                  onChange={(e) => onChange({ monthlyRent: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full pl-10 text-xl sm:text-2xl font-semibold text-center border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
                Total monthly rental or lease income
              </p>
            </div>
          )}

          {current.key === "expenses" && (
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-2xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={formData.monthlyExpenses}
                  onChange={(e) => onChange({ monthlyExpenses: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full pl-10 text-xl sm:text-2xl font-semibold text-center border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
                Estimated monthly operating expenses (maintenance, insurance, etc.)
              </p>
            </div>
          )}

          {current.key === "photos" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors bg-slate-50/50 dark:bg-slate-800/30">
                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">
                  cloud_upload
                </span>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                  Drag and drop photos
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                  JPG, PNG up to 10MB each
                </p>
                <button
                  type="button"
                  className="mt-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Browse Files
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Or paste image URLs
                </p>
                {formData.imageUrls.map((url, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const next = [...formData.imageUrls];
                        next[i] = e.target.value;
                        onChange({ imageUrls: next });
                      }}
                      placeholder={`Image URL ${i + 1}`}
                      className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    {formData.imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const next = formData.imageUrls.filter(
                            (_, j) => j !== i
                          );
                          onChange({
                            imageUrls: next.length > 0 ? next : [""],
                          });
                        }}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          close
                        </span>
                      </button>
                    )}
                  </div>
                ))}
                {formData.imageUrls.length < 3 && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange({ imageUrls: [...formData.imageUrls, ""] })
                    }
                    className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary/40 hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-base">
                      add
                    </span>
                    Add another photo
                  </button>
                )}
              </div>
            </div>
          )}

          {current.key === "visibility" && (
            <div className="space-y-3">
              {VISIBILITY_TIERS.map((tier) => {
                const selected = formData.visibilityTier === tier.value;
                return (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => onChange({ visibilityTier: tier.value })}
                    className={`w-full flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                      selected
                        ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-primary/40 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div
                      className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        selected
                          ? "border-primary bg-primary"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {selected && (
                        <div className="size-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 dark:text-white">
                          {tier.label}
                        </p>
                        {tier.badge && (
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                        {tier.desc}
                      </p>
                    </div>
                    <span
                      className={`text-lg font-extrabold shrink-0 ${
                        selected ? "text-primary" : "text-slate-400"
                      }`}
                    >
                      {tier.price}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {current.key === "review" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                {[
                  { label: "Address", value: formData.address || "—" },
                  {
                    label: "Type",
                    value:
                      PROPERTY_TYPES.find(
                        (p) => p.value === formData.propertyType
                      )?.label || "—",
                  },
                  { label: "Asking Price", value: fmt$(formData.askingPrice) },
                  {
                    label: "Monthly Income",
                    value: fmt$(formData.monthlyRent),
                  },
                  { label: "Expenses", value: fmt$(formData.monthlyExpenses) },
                  {
                    label: "Photos",
                    value: `${formData.imageUrls.filter((u) => u.trim()).length} uploaded`,
                  },
                  {
                    label: "Visibility",
                    value:
                      VISIBILITY_TIERS.find(
                        (t) => t.value === formData.visibilityTier
                      )?.label || "Free",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center px-5 py-3.5"
                  >
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {row.label}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {capRate(formData) && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <span className="material-symbols-outlined text-green-500">
                    trending_up
                  </span>
                  <div>
                    <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                      Est. Cap Rate
                    </p>
                    <p className="text-xl font-extrabold text-green-700 dark:text-green-300">
                      {capRate(formData)}%
                    </p>
                  </div>
                </div>
              )}

              {state.status === "error" && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <span className="material-symbols-outlined text-red-500">
                    error
                  </span>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {state.message}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── actions ─── */}
      <div className="pt-6 mt-auto">
        <div className="flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="flex-1 border-2 border-slate-200 dark:border-slate-700 rounded-xl py-3.5 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Back
            </button>
          )}

          {current.key === "review" ? (
            <form action={action} className="flex-1">
              <input type="hidden" name="listingType" value={formData.listingType ?? ""} />
              <input type="hidden" name="posterName" value={formData.posterName} />
              <input type="hidden" name="posterBrokerage" value={formData.posterBrokerage} />
              <input type="hidden" name="posterDreNumber" value={formData.posterDreNumber} />
              <input type="hidden" name="title" value={formData.title} />
              <input type="hidden" name="address" value={formData.address} />
              <input type="hidden" name="description" value={formData.description} />
              <input type="hidden" name="propertyType" value={formData.propertyType ?? ""} />
              <input type="hidden" name="beds" value={formData.beds} />
              <input type="hidden" name="baths" value={formData.baths} />
              <input type="hidden" name="sqft" value={formData.sqft} />
              <input type="hidden" name="askingPrice" value={formData.askingPrice} />
              <input type="hidden" name="dealType" value={formData.dealType ?? ""} />
              {formData.imageUrls.map((url, i) => (
                <input key={i} type="hidden" name="imageUrls" value={url} />
              ))}
              <input type="hidden" name="monthlyRent" value={formData.monthlyRent} />
              <input type="hidden" name="monthlyExpenses" value={formData.monthlyExpenses} />
              <input type="hidden" name="propertyTaxes" value={formData.propertyTaxes} />
              <input type="hidden" name="hoa" value={formData.hoa} />
              <input type="hidden" name="coopCommission" value={formData.coopCommission} />
              <input type="hidden" name="visibilityTier" value={formData.visibilityTier} />
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 disabled:opacity-60 transition-all"
              >
                {isPending ? "Publishing…" : "Publish Listing"}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={next}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
