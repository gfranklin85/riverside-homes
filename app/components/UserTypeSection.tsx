const userTypes = [
  {
    icon: "home",
    label: "Owner Listed",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    role: "Owner / Seller",
    posts: "Free",
    pays: "Optional boost",
    gets: "Investor reach, managed offers",
  },
  {
    icon: "real_estate_agent",
    label: "Realtor Listed",
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    role: "Realtor",
    posts: "Free",
    pays: "Optional boost",
    gets: "Investor leads, deal analysis tools, profile page",
  },
  {
    icon: "apartment",
    label: "Developer Listed",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    role: "Developer / Wholesaler",
    posts: "Free",
    pays: "Optional boost",
    gets: "Capital access, fractional buyers",
  },
  {
    icon: "account_balance",
    label: "Investor",
    badge:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    role: "Investor / Buyer",
    posts: "Free to browse",
    pays: "Optional alerts, exports",
    gets: "Deal board, AI analysis, fractional stakes",
  },
  {
    icon: "savings",
    label: "Capital",
    badge:
      "bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300",
    role: "Capital Participant",
    posts: "Free to pledge",
    pays: "Optional deposit",
    gets: "Coordinated intro, deal docs",
  },
];

export default function UserTypeSection() {
  return (
    <section className="py-24 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
            Open Platform
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Everyone Has a Seat at the Table
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No gatekeeping. Every user type posts free. The platform grows
            because everyone with a deal has a reason to be here.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {userTypes.map((u) => (
            <div
              key={u.role}
              className="bg-background-light dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col gap-4 hover:border-primary/40 transition-all"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {u.icon}
                </span>
              </div>
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${u.badge}`}
                >
                  {u.label}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {u.role}
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 mt-auto">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                    upload
                  </span>
                  <span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Posts:{" "}
                    </span>
                    {u.posts}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                    payments
                  </span>
                  <span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Pays:{" "}
                    </span>
                    {u.pays}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                    star
                  </span>
                  <span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Gets:{" "}
                    </span>
                    {u.gets}
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Key distinction callout */}
        <div className="bg-slate-900 dark:bg-primary/10 rounded-2xl p-8 lg:p-12 border border-slate-800 dark:border-primary/20 flex flex-col lg:flex-row items-center gap-8">
          <div className="size-16 shrink-0 rounded-2xl bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-3xl">
              compare_arrows
            </span>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-2xl font-extrabold text-white mb-2">
              &ldquo;Your MLS gets you buyers. Owner System gets you
              investors.&rdquo;
            </p>
            <p className="text-slate-400 max-w-2xl">
              MLS is broker cooperation infrastructure. Owner System is investor
              discovery infrastructure. They operate in different moments of the
              same transaction — and work better together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
