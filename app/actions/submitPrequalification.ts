"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import type { PrequalFormState } from "@/app/types/lending";

const VALID_EMPLOYMENT = ["employed", "self-employed", "retired", "other"];
const VALID_CREDIT = ["excellent", "very-good", "good", "fair", "poor"];
const VALID_ASSET = ["residential", "industrial", "mixed-use", "commercial"];
const VALID_PURPOSE = ["purchase", "refinance", "cash-out-refi", "bridge"];

export async function submitPrequalification(
  _prevState: PrequalFormState,
  formData: FormData
): Promise<PrequalFormState> {
  const grossMonthlyIncome = formData.get("grossMonthlyIncome") as string;
  const monthlyDebtObligations = formData.get("monthlyDebtObligations") as string;
  const employmentStatus = formData.get("employmentStatus") as string;
  const creditScoreRange = formData.get("creditScoreRange") as string;
  const desiredLoanAmount = formData.get("desiredLoanAmount") as string;
  const downPaymentAmount = formData.get("downPaymentAmount") as string;
  const assetType = formData.get("assetType") as string;
  const loanPurpose = formData.get("loanPurpose") as string;

  if (!grossMonthlyIncome || parseFloat(grossMonthlyIncome) <= 0) {
    return { status: "error", message: "Gross monthly income is required and must be positive." };
  }
  if (!monthlyDebtObligations || parseFloat(monthlyDebtObligations) < 0) {
    return { status: "error", message: "Monthly debt obligations must be zero or positive." };
  }
  if (!employmentStatus || !VALID_EMPLOYMENT.includes(employmentStatus)) {
    return { status: "error", message: "Please select your employment status." };
  }
  if (!creditScoreRange || !VALID_CREDIT.includes(creditScoreRange)) {
    return { status: "error", message: "Please select your credit score range." };
  }
  if (!desiredLoanAmount || parseFloat(desiredLoanAmount) <= 0) {
    return { status: "error", message: "Desired loan amount is required and must be positive." };
  }
  if (!downPaymentAmount || parseFloat(downPaymentAmount) < 0) {
    return { status: "error", message: "Down payment must be zero or positive." };
  }
  if (!assetType || !VALID_ASSET.includes(assetType)) {
    return { status: "error", message: "Please select an asset type." };
  }
  if (!loanPurpose || !VALID_PURPOSE.includes(loanPurpose)) {
    return { status: "error", message: "Please select a loan purpose." };
  }

  const income = parseFloat(grossMonthlyIncome);
  const debt = parseFloat(monthlyDebtObligations);
  const loanAmt = parseFloat(desiredLoanAmount);
  const downPmt = parseFloat(downPaymentAmount);

  const dtiRatio = Math.round((debt / income) * 1000) / 10;
  const buyingPower = loanAmt + downPmt;

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("borrower_profiles")
      .insert({
        gross_monthly_income: income,
        monthly_debt_obligations: debt,
        employment_status: employmentStatus,
        credit_score_range: creditScoreRange,
        desired_loan_amount: loanAmt,
        down_payment_amount: downPmt,
        asset_type: assetType,
        loan_purpose: loanPurpose,
        dti_ratio: dtiRatio,
        buying_power: buyingPower,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return { status: "error", message: "Failed to submit pre-qualification. Please try again." };
    }

    return {
      status: "success",
      message: "Pre-qualification submitted successfully!",
      profileId: data?.id,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { status: "error", message: "An unexpected error occurred. Please try again." };
  }
}
