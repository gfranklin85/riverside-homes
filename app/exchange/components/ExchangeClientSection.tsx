"use client";

import { useState } from "react";
import type { Listing, ListingType, DealType } from "@/app/types/listing";
import ExchangeFilterBar from "./ExchangeFilterBar";
import ListingGrid from "./ListingGrid";

type FilterType = ListingType | "all";
type FilterDeal = DealType | "all";

export default function ExchangeClientSection({
  listings,
}: {
  listings: Listing[];
}) {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterDeal, setFilterDeal] = useState<FilterDeal>("all");

  const filtered = listings.filter((l) => {
    const typeMatch = filterType === "all" || l.listingType === filterType;
    const dealMatch = filterDeal === "all" || l.dealType === filterDeal;
    return typeMatch && dealMatch;
  });

  return (
    <>
      <ExchangeFilterBar
        filterType={filterType}
        filterDeal={filterDeal}
        onTypeChange={setFilterType}
        onDealChange={setFilterDeal}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
            {filterType !== "all" || filterDeal !== "all" ? " match your filters" : ""}
          </p>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Sorted by newest
          </span>
        </div>
        <ListingGrid listings={filtered} />
      </div>
    </>
  );
}
