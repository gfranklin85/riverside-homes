const realtorFeatures = [
  {
    icon: "person_pin",
    title: "Realtor Profile Page",
    description:
      "Every listing links back to your profile — showing all your posted deals, areas served, and brokerage info. Free marketing with every post.",
  },
  {
    icon: "percent",
    title: "Commission Field",
    description:
      "Optional co-op commission field on every listing so buyer agents and investors know exactly what's on the table.",
  },
  {
    icon: "share",
    title: "Share Deal Analysis Link",
    description:
      "Send investors a URL where they can run their own numbers. Your listing answers their questions before they even reach out.",
  },
  {
    icon: "verified",
    title: "Realtor Badge on Listings",
    description:
      "\"Realtor Listed\" badge distinguishes your posts from owner and developer listings so investors know who they're dealing with.",
  },
];

export default function ForRealtors() {
  return (
    <section className="py-16 sm:py-24 bg-background-light/50 dark:bg-slate-900/30" id="realtors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mb-12 sm:mb-20">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-black uppercase tracking-widest mb-6">
              For Realtors
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-[1.1]">
              Built for Realtors Who Work With Investors
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Realtors aren&apos;t posting here to replace their MLS workflow.
              They&apos;re posting to reach the investor audience the MLS
              doesn&apos;t reach well — fractional buyers, seller-finance
              seekers, capital pledgers, and sweat equity participants.
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              When an investor finds your listing and submits an offer, it routes
              through Owner System first. You get a{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                warm, pre-qualified lead
              </span>{" "}
              instead of a cold call — a better outcome than most lead sources
              deliver.
            </p>
          </div>

          <div className="lg:pt-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">
                    real_estate_agent
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    Sarah Chen · DRE #02145678
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pacific Coast Realty · 12 active listings
                  </p>
                </div>
                <span className="ml-auto inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-[10px] font-black uppercase tracking-wider">
                  Realtor Listed
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">
                    Property
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    4bd/2ba · Orangecrest
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">
                    Asking Price
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    $649,000
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">
                    Est. Cap Rate
                  </span>
                  <span className="font-bold text-green-600">6.4%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 dark:text-slate-400">
                    Co-op Commission
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    2.5%
                  </span>
                </div>
              </div>
              <button className="mt-6 w-full bg-primary/10 hover:bg-primary/20 text-primary font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-lg">share</span>
                Share Deal Analysis Link
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {realtorFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary">
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
