import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SellingProcess from "./components/SellingProcess";
import ModernSelling from "./components/ModernSelling";
import EasyPaperwork from "./components/EasyPaperwork";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import LeadFormProvider from "./components/LeadFormProvider";

export default function Home() {
  return (
    <LeadFormProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <SellingProcess />
          <ModernSelling />
          <EasyPaperwork />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
