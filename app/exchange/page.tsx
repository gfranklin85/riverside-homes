import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeadFormProvider from "@/app/components/LeadFormProvider";
import ExchangeHero from "./components/ExchangeHero";
import ExchangeClientSection from "./components/ExchangeClientSection";
import ExchangeCTAStrip from "./components/ExchangeCTAStrip";
import { MOCK_LISTINGS } from "./data/mockListings";

export const metadata: Metadata = {
  title: "Browse the Exchange | RiversideHomes Investment Marketplace",
  description:
    "Explore off-market, seller finance, value-add, and fractional investment properties on the RiversideHomes Exchange. Free to browse, free to post.",
};

export default function ExchangePage() {
  return (
    <LeadFormProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1">
          <ExchangeHero />
          <ExchangeClientSection listings={MOCK_LISTINGS} />
          <ExchangeCTAStrip />
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
