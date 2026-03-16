"use client";

const STEPS = [
  "Identity",
  "Media",
  "Financials",
  "Visibility",
  "Review",
];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center">
          {STEPS.map((label, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isActive = step === currentStep;

            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div
                    className={`size-9 rounded-full flex items-center justify-center text-sm font-extrabold transition-all ${
                      isCompleted
                        ? "bg-primary text-white"
                        : isActive
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-base">check</span>
                    ) : (
                      step
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : isCompleted
                        ? "text-slate-600 dark:text-slate-400"
                        : "text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${
                      step < currentStep
                        ? "bg-primary"
                        : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
