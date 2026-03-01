const steps = [
  {
    icon: "calendar_month",
    title: "1. Appointment",
    description:
      "Virtual or in-person consultation to understand your goals.",
  },
  {
    icon: "description",
    title: "2. Agreement",
    description: "Secure online completion of all required disclosures.",
  },
  {
    icon: "photo_camera",
    title: "3. Prep & Media",
    description: "Professional staging guidance and high-end photography.",
  },
  {
    icon: "campaign",
    title: "4. Go Live",
    description:
      "Launch on the market and review multiple offers with strategy.",
  },
  {
    icon: "vpn_key",
    title: "5. Close",
    description: "Smooth escrow management and final key handover.",
  },
];

export default function SellingProcess() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 px-6" id="process">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
          Sell Your Home in 5 Simple Steps
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We&apos;ve refined the selling experience into a frictionless journey,
          leveraging technology to save you time and stress.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Progress Line */}
        <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 z-0">
          <div className="h-full bg-primary/30 w-full"></div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center group"
            >
              <div className="size-20 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined text-4xl">
                  {step.icon}
                </span>
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                {step.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
