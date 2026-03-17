"use client";

import { useState, useMemo } from "react";
import type { BorrowerProfile, AssetType, CreditScoreRange } from "@/app/types/lending";
import LendingSidebar from "./LendingSidebar";
import LendingHeader from "./LendingHeader";
import BorrowerProfileGrid from "./BorrowerProfileGrid";
import BidModal from "./BidModal";

interface Props {
  profiles: BorrowerProfile[];
}

export default function LendingDashboard({ profiles }: Props) {
  const [activeAssetType, setActiveAssetType] = useState<AssetType | null>(null);
  const [activeCreditRange, setActiveCreditRange] = useState<CreditScoreRange | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bidProfile, setBidProfile] = useState<BorrowerProfile | null>(null);

  const filtered = useMemo(() => {
    let result = [...profiles];

    if (activeAssetType) {
      result = result.filter((p) => p.asset_type === activeAssetType);
    }
    if (activeCreditRange) {
      result = result.filter((p) => p.credit_score_range === activeCreditRange);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.asset_type.toLowerCase().includes(q) ||
          p.loan_purpose.toLowerCase().includes(q) ||
          p.employment_status.toLowerCase().includes(q) ||
          p.credit_score_range.toLowerCase().includes(q) ||
          p.desired_loan_amount.toString().includes(q)
      );
    }

    switch (sortBy) {
      case "amount-high":
        result.sort((a, b) => b.desired_loan_amount - a.desired_loan_amount);
        break;
      case "amount-low":
        result.sort((a, b) => a.desired_loan_amount - b.desired_loan_amount);
        break;
      case "dti-low":
        result.sort((a, b) => a.dti_ratio - b.dti_ratio);
        break;
      default:
        result.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return result;
  }, [profiles, activeAssetType, activeCreditRange, searchQuery, sortBy]);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      <LendingSidebar
        activeAssetType={activeAssetType}
        activeCreditRange={activeCreditRange}
        onAssetTypeChange={setActiveAssetType}
        onCreditRangeChange={setActiveCreditRange}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <LendingHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Active Financing Requests
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Review borrower profiles and submit competitive pre-qualification offers.
              </p>
            </div>
            <BorrowerProfileGrid profiles={filtered} onBid={setBidProfile} />
          </div>
        </main>
      </div>

      {bidProfile && <BidModal profile={bidProfile} onClose={() => setBidProfile(null)} />}
    </div>
  );
}
