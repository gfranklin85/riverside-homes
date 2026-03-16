import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 py-10 px-4">
          <div className="max-w-[800px] mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/exchange"
                className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
              >
                Exchange
              </Link>
              <span className="text-slate-400 text-sm">/</span>
              <span className="text-primary text-sm font-bold">New Listing</span>
            </div>
            <div className="mb-8">
              <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">
                Post Your Property to the Exchange
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-normal mt-2">
                Complete the details below to list your property on our network.
              </p>
            </div>
            <PostFormWrapper />
          </div>
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
