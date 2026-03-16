import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeadFormProvider from "@/app/components/LeadFormProvider";
import PostFormWrapper from "./components/PostFormWrapper";

export const metadata: Metadata = {
  title: "Post a Property Free | RiversideHomes Exchange",
  description:
    "List your investment property on the RiversideHomes Exchange for free. Reach investors, Realtors, and capital partners in minutes.",
};

export default function PostPage() {
  return (
    <LeadFormProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1">
          {/* Page header */}
          <div className="bg-white dark:bg-background-dark border-b border-slate-100 dark:border-slate-800 py-10 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
                The Exchange
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                Post a Property Free
              </h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Reach investors, fractional buyers, seller-finance seekers, and
                capital pledgers — the audience the MLS doesn&apos;t reach well.
              </p>
            </div>
          </div>
          <PostFormWrapper />
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
