export default function EasyPaperwork() {
  return (
    <section className="py-20 bg-primary/5 dark:bg-primary/10 px-6" id="paperwork">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-6">
          <span className="material-symbols-outlined text-primary text-4xl">
            chat_bubble
          </span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">
          No Confusing Paperwork
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          We believe in a{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            &ldquo;conversation instead of paperwork&rdquo;
          </span>{" "}
          approach. You shouldn&apos;t have to be a legal expert to sell your
          home. We use simple, guided questions to help you fill out forms
          correctly, ensuring everything is handled legally and smoothly without
          the headache.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500">
              lock
            </span>
            <span className="text-sm font-bold">Secure e-Signing</span>
          </div>
          <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">
              support_agent
            </span>
            <span className="text-sm font-bold">24/7 Doc Assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
