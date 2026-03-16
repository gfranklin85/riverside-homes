import Link from "next/link";

export default function ExchangeHero() {
  return (
    <section className="relative py-20 lg:py-28 bg-slate-900 text-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">
              Owner System · The Exchange
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Browse the{" "}
            <span className="text-primary">Exchange.</span>
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-10">
            A free marketplace where owners, Realtors, and developers post
            investment properties. No gatekeeping — every deal type, every
            listing type, all in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#filters"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/25 transition-all"
            >
              <span className="material-symbols-outlined filled-icon">
                filter_list
              </span>
              Browse Listings
            </a>
            <Link
              href="/post"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl border border-white/20 flex items-center gap-2 transition-all backdrop-blur-sm"
            >
              Post a Property Free
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined filled-icon text-primary text-lg">
                verified
              </span>
              12 Active Listings
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined filled-icon text-primary text-lg">
                verified
              </span>
              3 Listing Types
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined filled-icon text-primary text-lg">
                verified
              </span>
              Free to Post
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
