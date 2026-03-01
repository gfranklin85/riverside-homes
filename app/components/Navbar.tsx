"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary rounded-lg text-white">
            <span className="material-symbols-outlined block">home_work</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            RiversideHomes<span className="text-primary">.co</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#process"
          >
            Selling Process
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#modern"
          >
            Modern Selling
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#paperwork"
          >
            Paperwork
          </a>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20">
            Book Appointment
          </button>
        </nav>

        <button
          className="md:hidden text-slate-900 dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-4">
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
          >
            Selling Process
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#modern"
            onClick={() => setMobileMenuOpen(false)}
          >
            Modern Selling
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#paperwork"
            onClick={() => setMobileMenuOpen(false)}
          >
            Paperwork
          </a>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20 w-full">
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
}
