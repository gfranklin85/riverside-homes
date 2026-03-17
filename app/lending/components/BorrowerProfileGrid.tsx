"use client";

import type { BorrowerProfile } from "@/app/types/lending";
import BorrowerProfileCard from "./BorrowerProfileCard";

interface Props {
  profiles: BorrowerProfile[];
  onBid: (profile: BorrowerProfile) => void;
}

export default function BorrowerProfileGrid({ profiles, onBid }: Props) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">
          search_off
        </span>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">
          No matching requests
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        {profiles.length} active request{profiles.length !== 1 ? "s" : ""}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <BorrowerProfileCard key={profile.id} profile={profile} onBid={onBid} />
        ))}
      </div>
    </div>
  );
}
