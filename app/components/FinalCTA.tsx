import CTAButton from "./CTAButton";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto bg-slate-900 dark:bg-primary rounded-[2.5rem] p-12 lg:p-20 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 size-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 size-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">
          Ready to Start?
        </h2>

        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <CTAButton
            source="book-appointment"
            className="bg-primary dark:bg-white dark:text-primary hover:scale-105 transition-transform text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/20"
          >
            Book Appointment
          </CTAButton>
          <CTAButton
            source="talk-to-matthew"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-all"
          >
            Talk to Matthew
          </CTAButton>
          <CTAButton
            source="start-process"
            className="bg-transparent text-white/80 underline underline-offset-8 px-8 py-4 font-bold text-lg transition-all hover:text-white"
          >
            Start the Process
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
