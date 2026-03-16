import type { CreditScoreRange } from "@/app/types/lending";

export function computeDTI(monthlyDebt: number, grossIncome: number): number {
  if (grossIncome <= 0) return 0;
  return Math.round((monthlyDebt / grossIncome) * 1000) / 10;
}

export function computeBuyingPower(loanAmount: number, downPayment: number): number {
  return loanAmount + downPayment;
}

export function computeDownPaymentPct(downPayment: number, loanAmount: number): number {
  const total = loanAmount + downPayment;
  if (total <= 0) return 0;
  return Math.round((downPayment / total) * 1000) / 10;
}

export function computeMonthlyPayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (principal <= 0 || annualRate <= 0 || termYears <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  return Math.round(payment * 100) / 100;
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function getDTIColor(dti: number): string {
  if (dti < 36) return "text-green-600 bg-green-50";
  if (dti < 43) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

export function getCreditLabel(range: CreditScoreRange): { label: string; score: string } {
  const map: Record<CreditScoreRange, { label: string; score: string }> = {
    excellent: { label: "Excellent", score: "800-850" },
    "very-good": { label: "Very Good", score: "740-799" },
    good: { label: "Good", score: "680-739" },
    fair: { label: "Fair", score: "620-679" },
    poor: { label: "Poor", score: "Below 620" },
  };
  return map[range];
}
