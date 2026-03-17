"use client";

import { useState } from "react";
import Link from "next/link";
import { useLeadForm } from "./LeadFormProvider";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openForm } = useLeadForm();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined filled-icon text-primary text-4xl">
              holiday_village
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Riverside<span className="text-primary">Homes</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              href="#buy"
            >
              Buy
            </a>
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              href="#sell"
            >
              Sell
            </a>
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              href="#realtors"
            >
              For Realtors
            </a>
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              href="#investment"
            >
              Investor Opportunities
            </a>
            <Link
              className="text-sm font-semibold text-primary flex items-center gap-1"
              href="/exchange"
            >
              Exchange
              <span className="material-symbols-outlined filled-icon text-[10px]">
                fiber_manual_record
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-4 py-2">
              Sign In
            </button>
            <button
              onClick={() => openForm("get-started")}
              className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all"
            >
              Get Started
            </button>
            <button
              className="md:hidden text-slate-900 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-4">
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#buy"
            onClick={() => setMobileMenuOpen(false)}
          >
            Buy
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#sell"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sell
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#realtors"
            onClick={() => setMobileMenuOpen(false)}
          >
            For Realtors
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#investment"
            onClick={() => setMobileMenuOpen(false)}
          >
            Investor Opportunities
          </a>
          <Link
            className="text-sm font-semibold text-primary"
            href="/exchange"
            onClick={() => setMobileMenuOpen(false)}
          >
            Exchange
          </Link>
          <button
            onClick={() => {
              openForm("get-started");
              setMobileMenuOpen(false);
            }}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20 w-full"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
