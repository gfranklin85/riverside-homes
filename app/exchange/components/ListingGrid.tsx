import type { Listing } from "@/app/types/listing";
import ListingCard from "./ListingCard";

export default function ListingGrid({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="size-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-slate-300 text-4xl">
            search_off
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          No listings match your filters
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          Try adjusting the listing type or deal type filters to see more
          results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
