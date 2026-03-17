import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeadFormProvider from "@/app/components/LeadFormProvider";
import PrequalFormWrapper from "./components/PrequalFormWrapper";

export const metadata: Metadata = {
  title: "Loan Pre-Qualification | RiversideHomes",
  description:
    "Get pre-qualified for a home loan based on your financial profile. See your buying power and connect with competitive lenders.",
};

export default function PrequalifyPage() {
  return (
    <LeadFormProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 py-10 px-4">
          <div className="max-w-[800px] mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/"
                className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <span className="text-slate-400 text-sm">/</span>
              <span className="text-primary text-sm font-bold">Pre-Qualify</span>
            </div>
            <div className="mb-8">
              <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">
                Loan Pre-Qualification
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-normal mt-2">
                Complete your financial profile to see your buying power and get competitive offers
                from lenders.
              </p>
            </div>
            <PrequalFormWrapper />
          </div>
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
