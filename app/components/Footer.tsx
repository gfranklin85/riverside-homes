export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-primary rounded text-white">
                <span className="material-symbols-outlined text-sm">
                  home_work
                </span>
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                RiversideHomes.co
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Riverside&apos;s premier tech-enabled real estate brokerage. We
              combine local expertise with modern tools to deliver a superior
              selling experience.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="material-symbols-outlined">
                social_leaderboard
              </span>
              <span className="material-symbols-outlined">camera_indoor</span>
              <span className="material-symbols-outlined">
                alternate_email
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-sm">
              <li>123 Main St, Riverside, CA</li>
              <li>hello@riversidehomes.co</li>
              <li>(951) 555-0123</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-sm">
              <li>DRE License #01234567</li>
              <li>Brokerage: RH Real Estate</li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">house</span>
                Equal Housing Opportunity
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-400 uppercase tracking-widest font-bold">
          <p>&copy; 2024 RiversideHomes.co. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
