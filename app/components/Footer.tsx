export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 pr-12">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined filled-icon text-primary text-3xl">
                holiday_village
              </span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Riverside<span className="text-primary">Homes</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              The technology-first real estate platform in Riverside. MLS
              connects you to buyers. Owner System connects you to investors.
              Both belong here.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">
                  alternate_email
                </span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">
                  rss_feed
                </span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.2em]">
              Services
            </h5>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li>
                <a className="hover:text-primary transition-colors" href="#buy">
                  Buy a Home
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#sell"
                >
                  Sell a Home
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#realtors"
                >
                  For Realtors
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#exchange"
                >
                  The Exchange
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#investment"
                >
                  Investment Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.2em]">
              Company
            </h5>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Our Agents
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Neighborhoods
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.2em]">
              Contact
            </h5>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">
                  location_on
                </span>
                <span>
                  1200 Riverside Dr, Suite 500
                  <br />
                  Riverside, CA 92501
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">
                  call
                </span>
                <span>(800) 555-HOME</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">
                  mail
                </span>
                <span>hello@riversidehomes.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-6">
              Riverside Service Area
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] font-bold text-slate-500 mb-12 uppercase tracking-widest">
              <span>Riverside Central</span>
              <span>Canyon Crest</span>
              <span>Orangecrest</span>
              <span>Woodcrest</span>
              <span>La Sierra</span>
              <span>Mission Grove</span>
              <span>Magnolia Center</span>
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center space-y-2 max-w-2xl">
              <p>&copy; 2025 Riverside Homes, Inc. All Rights Reserved.</p>
              <p>
                Riverside Homes is a licensed real estate brokerage in
                California | DRE License #01234567
              </p>
              <p>Equal Housing Opportunity</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
