"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import type { LenderOfferFormState } from "@/app/types/lending";

export async function submitLenderOffer(payload: {
  borrowerProfileId: string;
  lenderName: string;
  lenderCompany: string;
  interestRate: number;
  points: number;
  loanTermYears: number;
  monthlyPaymentEstimate: number;
  notes: string;
}): Promise<LenderOfferFormState> {
  if (!payload.lenderName?.trim()) {
    return { status: "error", message: "Lender name is required." };
  }
  if (!payload.lenderCompany?.trim()) {
    return { status: "error", message: "Lender company is required." };
  }
  if (!payload.borrowerProfileId) {
    return { status: "error", message: "Borrower profile ID is required." };
  }
  if (payload.interestRate <= 0) {
    return { status: "error", message: "Interest rate must be positive." };
  }
  if (payload.loanTermYears <= 0) {
    return { status: "error", message: "Loan term must be positive." };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("lender_offers").insert({
      borrower_profile_id: payload.borrowerProfileId,
      lender_name: payload.lenderName,
      lender_company: payload.lenderCompany,
      interest_rate: payload.interestRate,
      points: payload.points,
      loan_term_years: payload.loanTermYears,
      monthly_payment_estimate: payload.monthlyPaymentEstimate,
      notes: payload.notes || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return { status: "error", message: "Failed to submit offer. Please try again." };
    }

    return { status: "success", message: "Offer submitted successfully!" };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { status: "error", message: "An unexpected error occurred." };
  }
}
