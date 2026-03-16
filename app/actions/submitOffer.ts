"use server";

import { createServerSupabaseClient } from "@/lib/supabase";

export interface OfferPayload {
  listingId: string;
  buyerName: string;
  buyerRole: string;
  offerAmount: number;
  offerType: "Full" | "Fractional";
  equityType: "Cash" | "Sweat" | "Performance";
  requestedPct: number;
  emd: string;
  financingContingency: boolean;
  appraisalContingency: boolean;
  personalMessage: string;
  closingTimeline: string;
  offerExpiry: string;
  hasEscalation: boolean;
  escalationLimit: string;
  sweatDetails: string;
  sensitivity: {
    interestRate: number;
    loanTerm: number;
    downPct: number;
    monthlyPayment: number;
  };
}

export type OfferState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitOffer(payload: OfferPayload): Promise<OfferState> {
  if (!payload.buyerName?.trim()) {
    return { status: "error", message: "Buyer name is required." };
  }
  if (!payload.listingId) {
    return { status: "error", message: "Invalid listing." };
  }
  if (!payload.offerAmount || payload.offerAmount <= 0) {
    return { status: "error", message: "Offer amount must be greater than zero." };
  }

  try {
    const supabase = createServerSupabaseClient();

    const { error } = await supabase.from("offers").insert({
      listing_id: payload.listingId,
      buyer_name: payload.buyerName.trim(),
      buyer_role: payload.buyerRole?.trim() || null,
      offer_amount: payload.offerAmount,
      offer_type: payload.offerType,
      equity_type: payload.equityType,
      requested_pct: payload.requestedPct,
      emd: payload.emd ? parseFloat(payload.emd) : null,
      financing_contingency: payload.financingContingency,
      appraisal_contingency: payload.appraisalContingency,
      personal_message: payload.personalMessage?.trim() || null,
      closing_timeline: payload.closingTimeline || null,
      offer_expiry_days: payload.offerExpiry ? parseInt(payload.offerExpiry) : null,
      has_escalation: payload.hasEscalation,
      escalation_limit: payload.escalationLimit ? parseFloat(payload.escalationLimit) : null,
      sweat_details: payload.sweatDetails?.trim() || null,
      sensitivity: payload.sensitivity,
    });

    if (error) {
      console.error("Supabase offer insert error:", error);
      return { status: "error", message: "Something went wrong. Please try again." };
    }

    return { status: "success", message: "Offer submitted successfully." };
  } catch (err) {
    console.error("Offer submission error:", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
