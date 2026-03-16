"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { submitListing } from "@/app/actions/submitListing";
import type { ListingFormData } from "@/app/types/listing";
import Step1Identity from "./steps/Step1Identity";
import Step2Media from "./steps/Step2Media";
import Step3Financials from "./steps/Step3Financials";
import Step4Visibility from "./steps/Step4Visibility";

const STEP_NAMES = ["Basic Info", "Media", "Financials", "Visibility", "Review"];

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

export default function PostFormWrapper() {
  const [formData, setFormData] = useState<ListingFormData>(INITIAL_FORM);
  const [state, action, isPending] = useActionState(submitListing, {
    status: "idle",
    message: "",
  });

  function onChange(updates: Partial<ListingFormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }

  const step1Done = formData.address.trim() !== "" && formData.propertyType !== null;
  const step2Done = formData.imageUrls.some((u) => u.trim() !== "");
  const step3Done = formData.monthlyRent.trim() !== "";

  const activeStep = !step1Done ? 1 : !step2Done ? 2 : !step3Done ? 3 : 4;
  const progress = Math.round((activeStep / 5) * 100);
  const stepName = STEP_NAMES[activeStep - 1];

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-20 gap-6">
        <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">
            check_circle
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Listing Submitted!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">{state.message}</p>
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
                Step {activeStep} of 5
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
        <StepSection step={1} title="Basic Information" active={true}>
          <Step1Identity formData={formData} onChange={onChange} />
        </StepSection>

        <StepSection step={2} title="Media & Photos" active={activeStep >= 2}>
          <Step2Media formData={formData} onChange={onChange} />
        </StepSection>

        <StepSection step={3} title="Financial Details" active={activeStep >= 3}>
          <Step3Financials formData={formData} onChange={onChange} />
        </StepSection>

        <StepSection step={4} title="Visibility Options" active={activeStep >= 4}>
          <Step4Visibility formData={formData} onChange={onChange} />
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
            You can save your progress and finish later.
          </p>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              type="button"
              className="flex-1 md:flex-none px-8 py-3 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Save Draft
            </button>
            <form action={action} className="flex-1 md:flex-none">
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
                className="w-full px-12 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-60 transition-all"
              >
                {isPending ? "Publishing…" : "Publish Listing"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
