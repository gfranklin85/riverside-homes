export default function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-background-light dark:bg-slate-900/50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background-light via-background-light/90 to-transparent dark:from-background-dark dark:via-background-dark/90 z-10"></div>
        <img
          alt="Modern luxury riverside home exterior"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvjSlIzPUvIEOu1pv_705FCw17IgRmXggDcRHwBbkmAQcBN8_Va4XihABKa9HqMlHKrL96xSrDflA5k30-Ba6hfqmW_bXu8H1zRd2_KA86Hlx4RfL7gSaa1x3JesgUpcKIiUK2f6bt2RkO4SZREQg-gXaaOtplhPnOftcy_ewJBxAnnf_VQX9Mcklac7v2ZyDeZ9ri7RTrqV5exRra2aGcNu8GkhiTDpOvCdicMuPtwLjsA5UBy1lJkN7UgLlgz1m52DZCrY95QHZ0"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Riverside Real Estate,{" "}
            <span className="text-primary">Reinvented.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
            The modern standard for residential and investment property.
            Data-driven insights, local expertise, and an exclusive investor
            marketplace.
          </p>

          <div className="mt-10 max-w-xl">
            <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-2xl shadow-primary/10 border border-slate-200 dark:border-slate-700">
              <div className="flex-1 flex items-center px-4 gap-3 py-2 sm:py-0">
                <span className="material-symbols-outlined text-slate-400">
                  search
                </span>
                <input
                  className="w-full border-none bg-transparent focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 font-medium outline-none"
                  placeholder="Address, City, or ZIP Code"
                  type="text"
                />
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-lg transition-all flex items-center justify-center gap-2">
                Search Properties
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined filled-icon text-primary text-lg">
                  verified
                </span>
                1,200+ Active Listings
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined filled-icon text-primary text-lg">
                  verified
                </span>
                Top Verified Agents
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
      </div>
    </section>
  );
}
