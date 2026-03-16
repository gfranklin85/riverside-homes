"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitListing } from "@/app/actions/submitListing";
import type { ListingFormData } from "@/app/types/listing";

interface Props {
  formData: ListingFormData;
  onBack: () => void;
}

function formatPrice(v: string): string {
  const n = parseFloat(v);
  if (isNaN(n)) return "—";
  return `$${n.toLocaleString()}`;
}

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-900 dark:text-white text-right">
        {value || "—"}
      </span>
    </div>
  );
}

const tierLabels: Record<string, string> = {
  free: "Free",
  featured: "Featured — $10/mo",
  priority: "Priority — $20/mo",
  spotlight: "Spotlight — $29/mo",
};

const typeLabels: Record<string, string> = {
  owner: "Owner / Seller",
  realtor: "Realtor",
  developer: "Developer / Wholesaler",
};

export default function Step5Review({ formData, onBack }: Props) {
  const [state, action, isPending] = useActionState(submitListing, {
    status: "idle",
    message: "",
  });

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-12 gap-6">
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
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined filled-icon">analytics</span>
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
          Review Your Listing
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Everything look right? Hit Submit to go live.
        </p>
      </div>

      {/* Image preview */}
      {formData.imageUrls.some((u) => u.trim() !== "") && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {formData.imageUrls
            .filter((u) => u.trim() !== "")
            .map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Preview ${i + 1}`}
                className="h-32 w-48 object-cover rounded-xl shrink-0 border border-slate-200 dark:border-slate-700"
              />
            ))}
        </div>
      )}

      {/* Summary sections */}
      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            Identity
          </h3>
          <Row label="Listing Type" value={typeLabels[formData.listingType ?? ""] ?? "—"} />
          <Row label="Your Name" value={formData.posterName} />
          {formData.listingType === "realtor" && (
            <>
              <Row label="Brokerage" value={formData.posterBrokerage} />
              <Row label="DRE #" value={formData.posterDreNumber} />
            </>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            Property
          </h3>
          <Row label="Title" value={formData.title} />
          <Row label="Address" value={formData.address} />
          <Row label="Type" value={formData.propertyType?.replace(/-/g, " ")} />
          <Row label="Beds / Baths" value={`${formData.beds || "—"} bd / ${formData.baths || "—"} ba`} />
          <Row label="Sq Ft" value={formData.sqft ? `${parseInt(formData.sqft).toLocaleString()} SF` : "—"} />
          <Row label="Asking Price" value={formatPrice(formData.askingPrice)} />
          {formData.description && (
            <div className="py-2.5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Description
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {formData.description}
              </p>
            </div>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            Financials
          </h3>
          <Row label="Deal Type" value={formData.dealType?.replace(/-/g, " ")} />
          <Row label="Monthly Rent" value={formData.monthlyRent ? `$${parseFloat(formData.monthlyRent).toLocaleString()}/mo` : "—"} />
          <Row label="Monthly Expenses" value={formData.monthlyExpenses ? `$${parseFloat(formData.monthlyExpenses).toLocaleString()}/mo` : "—"} />
          <Row label="Annual Taxes" value={formData.propertyTaxes ? `$${parseFloat(formData.propertyTaxes).toLocaleString()}/yr` : "—"} />
          <Row label="HOA" value={formData.hoa ? `$${parseFloat(formData.hoa).toLocaleString()}/mo` : "—"} />
          {formData.listingType === "realtor" && (
            <Row label="Co-op Commission" value={formData.coopCommission ? `${formData.coopCommission}%` : "—"} />
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            Visibility
          </h3>
          <Row label="Boost Tier" value={tierLabels[formData.visibilityTier]} />
        </div>
      </div>

      {state.status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-700 dark:text-red-400">{state.message}</p>
        </div>
      )}

      <form action={action}>
        {/* Hidden inputs — serialize all formData fields */}
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

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold py-3.5 px-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/25"
          >
            {isPending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">
                  progress_activity
                </span>
                Submitting…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">send</span>
                Submit Listing
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
