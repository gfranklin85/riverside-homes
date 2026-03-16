"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import type { BorrowerProfile } from "@/app/types/lending";

export async function fetchBorrowerProfiles(filters?: {
  assetType?: string;
  creditRange?: string;
  minLoanAmount?: number;
  maxLoanAmount?: number;
}): Promise<BorrowerProfile[]> {
  try {
    const supabase = createServerSupabaseClient();
    let query = supabase
      .from("borrower_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.assetType) {
      query = query.eq("asset_type", filters.assetType);
    }
    if (filters?.creditRange) {
      query = query.eq("credit_score_range", filters.creditRange);
    }
    if (filters?.minLoanAmount) {
      query = query.gte("desired_loan_amount", filters.minLoanAmount);
    }
    if (filters?.maxLoanAmount) {
      query = query.lte("desired_loan_amount", filters.maxLoanAmount);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase fetch error:", error);
      return [];
    }

    return (data as BorrowerProfile[]) ?? [];
  } catch (err) {
    console.error("Unexpected error fetching profiles:", err);
    return [];
  }
}
