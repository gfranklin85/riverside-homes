"use client";

interface Props {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  onToggleSidebar: () => void;
}

export default function LendingHeader({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onToggleSidebar,
}: Props) {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Search */}
        <div className="flex items-stretch rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="text-slate-500 flex items-center justify-center pl-3">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search loans..."
            className="w-44 sm:w-64 bg-transparent border-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 px-3 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="hidden sm:block text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-2 focus:border-primary focus:ring-primary"
        >
          <option value="recent">Recently Added</option>
          <option value="amount-high">Highest Amount</option>
          <option value="amount-low">Lowest Amount</option>
          <option value="dti-low">Best DTI</option>
        </select>

        {/* Notifications */}
        <div className="relative">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 cursor-pointer">
            notifications
          </span>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
        </div>

        {/* User avatar */}
        <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[20px]">person</span>
        </div>
      </div>
    </header>
  );
}
