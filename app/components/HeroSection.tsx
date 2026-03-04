import CTAButton from "./CTAButton";

export default function HeroSection() {
  return (
    <section className="relative py-16 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase">
              Real Estate Reinvented
            </span>
            <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Selling your Riverside home doesn&apos;t have to be{" "}
              <span className="text-primary">complicated.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl">
              Simple process. Clear guidance. Real strategy from start to close.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton
              source="book-appointment"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">calendar_today</span>
              Book Your Appointment
            </CTAButton>
            <CTAButton
              source="request-callback"
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all"
            >
              Request a Call Back
            </CTAButton>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 w-fit">
            <div className="size-16 rounded-full overflow-hidden bg-slate-200 border-2 border-primary/20">
              <img
                alt="Matthew - Riverside Expert"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwtaDPVLtgcKFSa1Brdss_yx9-JNUf1FokGZYJhRJvUhN0gc-w-kko6Hmth83PiPuupP4fSQdkY_nNVI5EOzySKXhfpHt7D-Ho-qw2vhUhkxWphnai5qxrpq8_PP3x79S8VwXIixB8FuIkY2nm6nisGkldR63fI_zC4epe24sH5OZp8tZmpjqLOCWXnCoOkWKW5g5PrFFWZtW_kVJ0e_-Xl0VIOGF1mkJmgKqUOw3yKI1e3r7COURMp3zQhFYEDppGIzB9xadUCj86"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Matthew
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Riverside Focus
              </p>
              <div className="flex items-center gap-1 mt-1 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-[18px]">
                  phone
                </span>
                (951) 555-0123
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-primary/10 rounded-3xl -rotate-2"></div>
          <img
            alt="Beautiful Riverside Home"
            className="relative rounded-2xl shadow-2xl object-cover aspect-[4/3]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCifxbT-C4yZZvno6Tr7CpxoJBI8F0M6NYe54t6L_IbS-6DWAEbjsJG-L7_G1gKrGMlq5EUuEITzkDL1vKVgAsi4owpUKHgUbNhGxsvUwKDfTwdTOH0vCBFBRL0n2g8ARL57qYybLcPkngQ53x3XiFvQyvV2Cfm_t8F1TOei6wP9onHrPVsSTJN5_ZLdLmuLxMRnc6gUFsaYNIhjq5XUZs8c0ho3RMNfRYsFvZDEbkOGAO23x8Ml8qA47Dz4Ll6RMEraxZQWKMEASj8"
          />
        </div>
      </div>
    </section>
  );
}
