import Link from "next/link";

export default function ExchangeSection() {
  return (
    <section className="py-24 bg-white dark:bg-background-dark" id="exchange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary/5 dark:bg-primary/10 rounded-[2rem] p-8 lg:p-16 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-6">
                New Feature
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                Introducing the Exchange
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                A free marketplace for owners, agents, and investors to post
                properties, explore opportunities, and analyze deals with more
                clarity. No gatekeeping — everyone with a deal has a reason to
                be here.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/exchange" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/25 transition-all">
                  <span className="material-symbols-outlined filled-icon">
                    analytics
                  </span>
                  Browse the Exchange
                </Link>
                <Link href="/post" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-4 px-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Post a Property Free
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block group-hover:scale-110 transition-transform">
                    trending_up
                  </span>
                  <h3 className="font-bold text-xl mb-2">Market Data</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Real-time valuation and cap rate analytics.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block group-hover:scale-110 transition-transform">
                    handshake
                  </span>
                  <h3 className="font-bold text-xl mb-2">Direct Access</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Connect directly with verified sellers and agents.
                  </p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block group-hover:scale-110 transition-transform">
                    verified_user
                  </span>
                  <h3 className="font-bold text-xl mb-2">Off-Market</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Exclusive listings you won&apos;t find on MLS platforms.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block group-hover:scale-110 transition-transform">
                    group
                  </span>
                  <h3 className="font-bold text-xl mb-2">Investor Network</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Join a global network of active property buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
