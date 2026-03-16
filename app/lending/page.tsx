import type { Metadata } from "next";
import { MOCK_BORROWER_PROFILES } from "./data/mockBorrowerProfiles";
import LendingDashboard from "./components/LendingDashboard";

export const metadata: Metadata = {
  title: "Lender Marketplace | RiversideHomes",
  description:
    "Browse anonymized borrower profiles and submit competitive pre-qualification offers on the Riverside lending marketplace.",
};

export default function LendingPage() {
  // Use mock data for now; swap with fetchBorrowerProfiles() when Supabase tables are live
  const profiles = MOCK_BORROWER_PROFILES;

  return <LendingDashboard profiles={profiles} />;
}
