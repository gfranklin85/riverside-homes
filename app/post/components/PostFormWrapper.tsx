"use client";

import { useState } from "react";
import type { ListingFormData } from "@/app/types/listing";
import StepIndicator from "./StepIndicator";
import Step1Identity from "./steps/Step1Identity";
import Step2Media from "./steps/Step2Media";
import Step3Financials from "./steps/Step3Financials";
import Step4Visibility from "./steps/Step4Visibility";
import Step5Review from "./steps/Step5Review";

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

export default function PostFormWrapper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>(INITIAL_FORM);

  function onChange(updates: Partial<ListingFormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }

  function onNext() {
    setCurrentStep((s) => Math.min(s + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onBack() {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900/30">
      <StepIndicator currentStep={currentStep} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20 pt-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 lg:p-10">
          {currentStep === 1 && (
            <Step1Identity formData={formData} onChange={onChange} onNext={onNext} />
          )}
          {currentStep === 2 && (
            <Step2Media formData={formData} onChange={onChange} onNext={onNext} onBack={onBack} />
          )}
          {currentStep === 3 && (
            <Step3Financials formData={formData} onChange={onChange} onNext={onNext} onBack={onBack} />
          )}
          {currentStep === 4 && (
            <Step4Visibility formData={formData} onChange={onChange} onNext={onNext} onBack={onBack} />
          )}
          {currentStep === 5 && (
            <Step5Review formData={formData} onBack={onBack} />
          )}
        </div>
      </div>
    </div>
  );
}
