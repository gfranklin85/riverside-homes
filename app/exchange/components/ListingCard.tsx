import Link from "next/link";
import type { Listing, ListingType, DealType } from "@/app/types/listing";

const listingTypeBadge: Record<ListingType, { label: string; className: string }> = {
  owner: { label: "Owner Listed", className: "bg-blue-500 text-white" },
  realtor: { label: "Realtor Listed", className: "bg-purple-600 text-white" },
  developer: { label: "Developer Listed", className: "bg-orange-500 text-white" },
};

const dealTypeLabel: Record<DealType, string> = {
  "off-market": "Off-Market",
  "seller-finance": "Seller Finance",
  "value-add": "Value-Add",
  fractional: "Fractional",
};

function formatPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const badge = listingTypeBadge[listing.listingType];
  const image = listing.imageUrls[0] ?? "";

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        {image ? (
          <img
            src={image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-300 text-5xl">
              home
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Listing type badge */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${badge.className}`}
        >
          {badge.label}
        </span>

        {/* Deal type tag */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
          {dealTypeLabel[listing.dealType]}
        </span>

        {/* Price */}
        <span className="absolute bottom-3 right-3 text-white font-extrabold text-lg drop-shadow-md">
          {formatPrice(listing.askingPrice)}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-primary transition-colors">
          {listing.title}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
          {listing.beds !== null && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">bed</span>
              {listing.beds}bd
            </span>
          )}
          {listing.baths !== null && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">bathtub</span>
              {listing.baths}ba
            </span>
          )}
          {listing.sqft !== null && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">square_foot</span>
              {listing.sqft.toLocaleString()} SF
            </span>
          )}
        </div>

        {/* Cap rate */}
        {listing.financials.capRate !== null && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Est. Cap Rate:
            </span>
            <span className="text-sm font-extrabold text-green-600">
              {listing.financials.capRate.toFixed(1)}%
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {listing.description}
        </p>

        {/* Posted by */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-700">
          <span className="material-symbols-outlined text-sm">
            {listing.listingType === "realtor" ? "real_estate_agent" : "person"}
          </span>
          <span className="font-medium truncate">
            {listing.posterName}
            {listing.posterBrokerage && (
              <span className="text-slate-300 dark:text-slate-600">
                {" "}
                · {listing.posterBrokerage}
              </span>
            )}
          </span>
          {listing.financials.coopCommission !== null && (
            <span className="ml-auto shrink-0 text-purple-600 dark:text-purple-400 font-bold">
              {listing.financials.coopCommission}% co-op
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/exchange/${listing.id}`}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-1.5"
        >
          View Deal
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
