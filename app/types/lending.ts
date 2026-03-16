export type EmploymentStatus = "employed" | "self-employed" | "retired" | "other";
export type CreditScoreRange = "excellent" | "very-good" | "good" | "fair" | "poor";
export type AssetType = "residential" | "industrial" | "mixed-use" | "commercial";
export type LoanPurpose = "purchase" | "refinance" | "cash-out-refi" | "bridge";

export interface BorrowerProfile {
  id: string;
  gross_monthly_income: number;
  monthly_debt_obligations: number;
  employment_status: EmploymentStatus;
  credit_score_range: CreditScoreRange;
  desired_loan_amount: number;
  down_payment_amount: number;
  asset_type: AssetType;
  loan_purpose: LoanPurpose;
  dti_ratio: number;
  buying_power: number;
  created_at: string;
}

export interface PrequalFormData {
  grossMonthlyIncome: string;
  monthlyDebtObligations: string;
  employmentStatus: EmploymentStatus | null;
  creditScoreRange: CreditScoreRange | null;
  desiredLoanAmount: string;
  downPaymentAmount: string;
  assetType: AssetType | null;
  loanPurpose: LoanPurpose | null;
}

export type PrequalFormState = {
  status: "idle" | "success" | "error";
  message: string;
  profileId?: string;
};

export interface LenderOffer {
  id: string;
  borrower_profile_id: string;
  lender_name: string;
  lender_company: string;
  interest_rate: number;
  points: number;
  loan_term_years: number;
  monthly_payment_estimate: number;
  notes: string | null;
  created_at: string;
}

export type LenderOfferFormState = {
  status: "idle" | "success" | "error";
  message: string;
};
