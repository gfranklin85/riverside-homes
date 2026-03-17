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
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 flex flex-col py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">
            <PostFormWrapper />
          </div>
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
