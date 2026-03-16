import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ExchangeSection from "./components/SellingProcess";
import ResidentialServices from "./components/ModernSelling";
import UserTypeSection from "./components/UserTypeSection";
import ForRealtors from "./components/EasyPaperwork";
import InvestmentOpportunities from "./components/FinalCTA";
import Footer from "./components/Footer";
import LeadFormProvider from "./components/LeadFormProvider";

export default function Home() {
  return (
    <LeadFormProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <ExchangeSection />
          <ResidentialServices />
          <UserTypeSection />
          <ForRealtors />
          <InvestmentOpportunities />
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
