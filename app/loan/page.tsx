import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeadFormProvider from "@/app/components/LeadFormProvider";
import LoanAppClient from "./components/LoanAppClient";

export const metadata: Metadata = {
  title: "Loan Application | RiversideHomes Exchange",
  description:
    "One application connects you with the right lenders for your situation — residential, commercial, industrial, or land. No credit pull, no commitment.",
};

export default function LoanPage() {
  return (
    <LeadFormProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#09090b] text-[#f2f2f0]">
        <Navbar />
        <main className="flex-1">
          <LoanAppClient />
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
