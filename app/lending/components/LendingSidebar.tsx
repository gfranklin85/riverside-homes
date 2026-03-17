"use client";

import Link from "next/link";
import type { AssetType, CreditScoreRange } from "@/app/types/lending";

interface Props {
  activeAssetType: AssetType | null;
  activeCreditRange: CreditScoreRange | null;
  onAssetTypeChange: (val: AssetType | null) => void;
  onCreditRangeChange: (val: CreditScoreRange | null) => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const assetTypes: { value: AssetType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "industrial", label: "Industrial" },
  { value: "mixed-use", label: "Mixed Use" },
  { value: "commercial", label: "Commercial" },
];

const navItems = [
  { icon: "explore", label: "Opportunities", active: true },
  { icon: "history", label: "Bidding History", active: false },
  { icon: "bar_chart", label: "Performance", active: false },
];

export default function LendingSidebar({
  activeAssetType,
  activeCreditRange,
  onAssetTypeChange,
  onCreditRangeChange,
  sidebarOpen,
  onCloseSidebar,
}: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onCloseSidebar}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined filled-icon text-primary text-3xl">
              holiday_village
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Riverside<span className="text-primary">Homes</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="px-4 py-4">
          <h3 className="text-slate-900 dark:text-white font-bold mb-3 px-2 text-sm">
            Lender Portal
          </h3>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left w-full ${
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            ))}
            <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 w-full text-left">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 flex-1 overflow-y-auto">
          <h3 className="text-slate-900 dark:text-white font-bold mb-4 px-2 text-sm">
            Filter Requests
          </h3>

          {/* Asset type */}
          <div className="mb-5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block px-2">
              Asset Type
            </label>
            <div className="flex flex-wrap gap-2 px-2">
              {assetTypes.map((at) => (
                <button
                  key={at.value}
                  onClick={() =>
                    onAssetTypeChange(activeAssetType === at.value ? null : at.value)
                  }
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                    activeAssetType === at.value
                      ? "bg-primary text-white border-primary"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary"
                  }`}
                >
                  {at.label}
                </button>
              ))}
            </div>
          </div>

          {/* Credit range */}
          <div className="mb-5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block px-2">
              Credit Range
            </label>
            <div className="px-2">
              <select
                value={activeCreditRange ?? ""}
                onChange={(e) =>
                  onCreditRangeChange(
                    e.target.value ? (e.target.value as CreditScoreRange) : null
                  )
                }
                className="w-full text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary"
              >
                <option value="">Any Credit</option>
                <option value="excellent">Excellent (800-850)</option>
                <option value="very-good">Very Good (740-799)</option>
                <option value="good">Good (680-739)</option>
                <option value="fair">Fair (620-679)</option>
                <option value="poor">Below 620</option>
              </select>
            </div>
          </div>

          {/* Clear filters */}
          {(activeAssetType || activeCreditRange) && (
            <div className="px-2">
              <button
                onClick={() => {
                  onAssetTypeChange(null);
                  onCreditRangeChange(null);
                }}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
