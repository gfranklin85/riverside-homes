import Link from "next/link";

export default function ExchangeCTAStrip() {
  return (
    <section className="py-16 bg-primary/5 dark:bg-primary/10 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
            Ready to post your deal?
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            It&apos;s free. Reach investors who aren&apos;t browsing the MLS.
          </p>
        </div>
        <Link
          href="/post"
          className="shrink-0 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/25 transition-all"
        >
          <span className="material-symbols-outlined">add_home</span>
          Post a Property Free
        </Link>
      </div>
    </section>
  );
}
