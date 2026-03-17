"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Listing, OwnershipStake } from "@/app/types/listing";
import { submitOffer } from "@/app/actions/submitOffer";

const DEAL_TYPE_LABEL: Record<string, string> = {
  "off-market": "Off-Market",
  "seller-finance": "Seller Finance",
  "value-add": "Value-Add",
  fractional: "Fractional",
};

const PROPERTY_TYPE_LABEL: Record<string, string> = {
  "single-family": "Single-Family",
  "multi-family": "Multi-Family",
  condo: "Condo",
  commercial: "Commercial",
  land: "Land",
  "mixed-use": "Mixed-Use",
};

function fmt(n: number) {
  return n.toLocaleString();
}

function fmtMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

// Simple SVG donut chart for ownership
function OwnershipDonut({ stakes, yourPercentage }: { stakes: OwnershipStake[], yourPercentage: number }) {
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const r = 52;
  const stroke = 18;

  const allSegments = [
    ...stakes.filter((s) => s.ownerName !== "Available"),
    { id: "your-stake", ownerName: "Your Stake", percentage: yourPercentage, type: "Offer", color: "#3b82f6" },
    {
      id: "remaining",
      ownerName: "Remaining",
      percentage: Math.max(0, (stakes.find((s) => s.ownerName === "Available")?.percentage ?? 0) - yourPercentage),
      type: "Available",
      color: "#e2e8f0",
    },
  ].filter((s) => s.percentage > 0);

  const total = allSegments.reduce((sum, s) => sum + s.percentage, 0);
  let cumulative = 0;
  const circumference = 2 * Math.PI * r;

  const paths = allSegments.map((seg) => {
    const pct = (seg.percentage / total) * 100;
    const dashArray = (pct / 100) * circumference;
    const dashOffset = circumference - cumulative * circumference / 100;
    cumulative += pct;
    return { ...seg, dashArray, dashOffset };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} className="shrink-0 -rotate-90">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        {paths.map((p) => (
          <circle
            key={p.id}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={p.color}
            strokeWidth={stroke}
            strokeDasharray={`${p.dashArray} ${circumference}`}
            strokeDashoffset={-((circumference - p.dashOffset) % circumference)}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="space-y-2 text-xs">
        {paths.map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
            <span className="text-slate-600 dark:text-slate-400">{p.ownerName}</span>
            <span className="ml-auto font-bold text-slate-900 dark:text-white pl-3">{p.percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PropertyDetailClient({ listing }: { listing: Listing }) {
  // Offer type
  const [offerType, setOfferType] = useState<"Full" | "Fractional">("Full");
  const [equityType, setEquityType] = useState<"Cash" | "Sweat" | "Performance">("Cash");

  // Offer amount / fractional stake
  const [offerAmount, setOfferAmount] = useState(listing.askingPrice);
  const [requestedPct, setRequestedPct] = useState(listing.availableFraction ?? 25);

  // Financing
  const [downPct, setDownPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [targetPayment, setTargetPayment] = useState(0);

  // Taxes / insurance / HOA (monthly)
  const [taxes, setTaxes] = useState(Math.round((listing.financials.propertyTaxes ?? 0) / 12));
  const [insurance, setInsurance] = useState(150);
  const [hoa, setHoa] = useState(listing.financials.hoa ?? 0);

  // Income Analysis
  const [rentType, setRentType] = useState<"current" | "market" | "potential">("current");
  const [units, setUnits] = useState(
    listing.propertyType === "multi-family" ? 2 : 1
  );

  // Underwriting (annual)
  const [annInsurance, setAnnInsurance] = useState(5250);
  const [annWater, setAnnWater] = useState(1200);
  const [annRepairs, setAnnRepairs] = useState(1800);
  const [annLandscape, setAnnLandscape] = useState(600);
  const [annMarketing, setAnnMarketing] = useState(400);
  const [annGa, setAnnGa] = useState(800);
  const [annMgmt, setAnnMgmt] = useState(8);

  // Offer form fields
  const [buyerName, setBuyerName] = useState("Gregory Franklin");
  const [buyerRole, setBuyerRole] = useState("Individual Investor");
  const [emd, setEmd] = useState("5000");
  const [inspectionDays, setInspectionDays] = useState("10");
  const [financingContingency, setFinancingContingency] = useState(true);
  const [appraisalContingency, setAppraisalContingency] = useState(true);
  const [personalMessage, setPersonalMessage] = useState("");
  const [closingTimeline, setClosingTimeline] = useState("30 days");
  const [offerExpiry, setOfferExpiry] = useState("3");
  const [hasEscalation, setHasEscalation] = useState(false);
  const [escalationLimit, setEscalationLimit] = useState("");
  const [sweatDetails, setSweatDetails] = useState("");

  // Status
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ---- Derived financials ----
  const baseRent =
    rentType === "market"
      ? (listing.financials.marketRent ?? 0)
      : rentType === "potential"
      ? (listing.financials.potentialRent ?? 0)
      : (listing.financials.monthlyRent ?? 0);

  const currentPrice =
    offerType === "Full"
      ? offerAmount
      : listing.askingPrice * (requestedPct / 100);

  const grossAnnual = baseRent * units * 12;
  const mgmtFee = grossAnnual * (annMgmt / 100);
  const totalExpenses = annInsurance + annWater + annRepairs + annLandscape + annMarketing + annGa + mgmtFee;
  const noi = grossAnnual - totalExpenses;
  const capRate = currentPrice > 0 ? (noi / currentPrice) * 100 : 0;
  const grm = grossAnnual > 0 ? currentPrice / grossAnnual : 0;

  const downAmount = currentPrice * (downPct / 100);
  const loanAmount = Math.max(0, currentPrice - downAmount);
  const monthlyRate = interestRate / 100 / 12;
  const nPmt = loanTerm * 12;

  const calcPayment =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, nPmt)) /
        (Math.pow(1 + monthlyRate, nPmt) - 1)
      : loanAmount / (nPmt || 1);

  const totalInterest = Math.max(0, calcPayment * nPmt - loanAmount);
  const estMonthlyRent =
    offerType === "Full" ? baseRent : baseRent * (requestedPct / 100);
  const netCashFlow = estMonthlyRent - calcPayment - taxes - insurance - hoa;
  const annualDebt = calcPayment * 12;
  const dscr = annualDebt > 0 ? noi / annualDebt : 0;

  // Sync target payment when price/terms change
  useEffect(() => {
    setTargetPayment(Math.round(calcPayment));
  }, [offerAmount, requestedPct, downPct, interestRate, loanTerm, offerType]);

  const handleTargetPaymentChange = (val: number) => {
    setTargetPayment(val);
    if (val <= 0) return;
    const supported =
      monthlyRate > 0
        ? (val * (1 - Math.pow(1 + monthlyRate, -nPmt))) / monthlyRate
        : val * nPmt;
    const supportedPrice = supported / (1 - downPct / 100);
    if (offerType === "Fractional") {
      const pct = (supportedPrice / listing.askingPrice) * 100;
      setRequestedPct(
        Math.min(listing.availableFraction ?? 100, Math.max(0, Math.round(pct * 10) / 10))
      );
    } else {
      setOfferAmount(Math.round(supportedPrice));
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const result = await submitOffer({
        listingId: listing.id,
        buyerName,
        buyerRole,
        offerAmount: offerType === "Full" ? offerAmount : currentPrice,
        offerType,
        equityType,
        requestedPct: offerType === "Fractional" ? requestedPct : 100,
        emd,
        financingContingency,
        appraisalContingency,
        personalMessage,
        closingTimeline,
        offerExpiry,
        hasEscalation,
        escalationLimit,
        sweatDetails,
        sensitivity: { interestRate, loanTerm, downPct, monthlyPayment: targetPayment },
      });
      if (result.status === "error") {
        setSubmitError(result.message);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const typeLabel = PROPERTY_TYPE_LABEL[listing.propertyType] ?? listing.propertyType;
  const dealLabel = DEAL_TYPE_LABEL[listing.dealType] ?? listing.dealType;
  const image = listing.imageUrls[0] ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs">
        <Link
          href="/exchange"
          className="text-primary font-bold flex items-center gap-1 hover:opacity-75 transition-opacity"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Exchange
        </Link>
        <span className="text-slate-400 dark:text-slate-500">/</span>
        <span className="text-slate-500 dark:text-slate-400">{typeLabel}</span>
        <span className="text-slate-400 dark:text-slate-500">/</span>
        <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{listing.title}</span>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "NOI / Year", value: `$${fmt(Math.round(noi))}`, color: "text-slate-900 dark:text-white" },
          { label: "Cap Rate", value: `${capRate.toFixed(2)}%`, color: "text-green-600" },
          { label: "GRM", value: `${grm.toFixed(2)}x`, color: "text-slate-900 dark:text-white" },
          { label: "DSCR", value: dscr.toFixed(2), color: "text-primary" },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm"
          >
            <div className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">{m.label}</div>
            <div className={`text-xl font-black font-mono ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Image */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 aspect-video sm:aspect-[21/9] relative flex items-center justify-center group shadow-md">
            {image ? (
              <img
                src={image}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <span className="material-symbols-outlined text-slate-300 text-8xl">home</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary text-white shadow">
                {typeLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                {dealLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Info sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-2">
                {listing.title}
              </h1>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                {listing.address}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">List Price</div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                ${fmt(listing.askingPrice)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {listing.sqft && (
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Sq Ft</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{fmt(listing.sqft)}</div>
                </div>
              )}
              {listing.yearBuilt && (
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Built</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{listing.yearBuilt}</div>
                </div>
              )}
              {listing.beds && (
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Beds</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{listing.beds}</div>
                </div>
              )}
              {listing.baths && (
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Baths</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{listing.baths}</div>
                </div>
              )}
            </div>
          </div>

          {/* Poster */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-base">
                  {listing.listingType === "realtor" ? "real_estate_agent" : "person"}
                </span>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {listing.listingType === "realtor" ? "Listing Agent" : listing.listingType === "developer" ? "Developer" : "Owner"}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{listing.posterName}</div>
                {listing.posterBrokerage && (
                  <div className="text-[10px] text-slate-400">{listing.posterBrokerage}</div>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-sm text-slate-500">chat</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-sm text-slate-500">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body: two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* ---- Left Column ---- */}
        <div className="lg:col-span-5 space-y-8">
          {/* Property Overview */}
          <section className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">info</span>
              Property Overview
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{listing.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {listing.sqft && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Square Feet</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{fmt(listing.sqft)}</div>
                </div>
              )}
              {listing.lotSize && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Lot Size</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{listing.lotSize}</div>
                </div>
              )}
              {listing.yearBuilt && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Year Built</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{listing.yearBuilt}</div>
                </div>
              )}
              {listing.financials.capRate && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Cap Rate</div>
                  <div className="text-base font-bold text-green-600">{listing.financials.capRate}%</div>
                </div>
              )}
              {listing.financials.coopCommission && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Co-op Commission</div>
                  <div className="text-base font-bold text-purple-600">{listing.financials.coopCommission}%</div>
                </div>
              )}
              {listing.posterDreNumber && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">DRE #</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{listing.posterDreNumber}</div>
                </div>
              )}
            </div>

            {listing.features.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Key Features</div>
                <div className="flex flex-wrap gap-1.5">
                  {listing.features.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Income Assessment */}
          <section className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 text-base">trending_up</span>
              Income Assessment
            </h2>

            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Rent for Analysis</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Units</span>
                <input
                  type="number"
                  value={units}
                  min={1}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-12 text-center bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-1.5 py-1 text-xs font-black focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {(
                [
                  { key: "current", label: "Current", val: listing.financials.monthlyRent },
                  { key: "market", label: "Market", val: listing.financials.marketRent },
                  { key: "potential", label: "Potential", val: listing.financials.potentialRent },
                ] as const
              ).map(({ key, label, val }) => (
                <button
                  key={key}
                  onClick={() => setRentType(key)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    rentType === key
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-slate-200 dark:border-slate-600 hover:border-primary/30"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-0.5">{label}</div>
                  <div className="text-sm font-black font-mono text-slate-900 dark:text-white">
                    {val != null ? `$${fmt(val)}` : "—"}
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
              <Row label="Gross Annual Income" value={`$${fmt(grossAnnual)}`} />
              {listing.sqft && (
                <Row label="Price per SqFt" value={`$${fmt(Math.round(listing.askingPrice / listing.sqft))}`} />
              )}
              <Row label="Est. Cap Rate" value={`${capRate.toFixed(2)}%`} valueClass="text-green-600 font-black" />
            </div>
          </section>

          {/* Underwriting */}
          <section className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">calculate</span>
              Underwriting — Annual Expenses
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  { label: "Insurance", val: annInsurance, set: setAnnInsurance },
                  { label: "Water / Sewer", val: annWater, set: setAnnWater },
                  { label: "Repairs / Maint", val: annRepairs, set: setAnnRepairs },
                  { label: "Landscaping", val: annLandscape, set: setAnnLandscape },
                  { label: "Marketing", val: annMarketing, set: setAnnMarketing },
                  { label: "G&A", val: annGa, set: setAnnGa },
                ] as const
              ).map(({ label, val, set }) => (
                <div key={label} className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => set(Number(e.target.value))}
                      className="w-full pl-6 pr-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-mono focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
              ))}
              <div className="col-span-2 space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mgmt Fee</label>
                  <span className="text-xs font-bold text-primary">{annMgmt}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.5}
                  value={annMgmt}
                  onChange={(e) => setAnnMgmt(Number(e.target.value))}
                  className="w-full accent-primary h-1.5"
                />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Annual Expenses</span>
              <span className="text-sm font-black font-mono text-slate-900 dark:text-white">${fmt(Math.round(totalExpenses))}</span>
            </div>
          </section>
        </div>

        {/* ---- Right Column: Offer Builder ---- */}
        <div className="lg:col-span-7 lg:sticky lg:top-8">
          <section className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: 200 }}>calculate</span>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Offer Submitted</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                  Your offer has been logged. The seller will review and follow up with you directly.
                </p>
                <Link
                  href="/exchange"
                  className="mt-6 px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Back to Exchange
                </Link>
              </div>
            ) : (
              <div>
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
                      <span className="material-symbols-outlined">person_search</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Offer Builder</h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-primary">{buyerName}</span>
                        <span className="text-[10px] text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full uppercase tracking-widest">
                          {buyerRole}
                        </span>
                      </div>
                    </div>
                  </div>
                  {listing.fractionalEnabled && (
                    <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl self-start">
                      {(["Full", "Fractional"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setOfferType(t)}
                          className={`px-5 py-2 text-[11px] font-black rounded-lg transition-all uppercase tracking-widest ${
                            offerType === t
                              ? "bg-primary text-white shadow-lg"
                              : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                          }`}
                        >
                          {t === "Full" ? "Full Buyout" : "Fractional"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Financial Parameters */}
                  <div className="space-y-6">
                    <SectionLabel icon="payments" text="Financial Parameters" />

                    <div className="p-5 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600 space-y-6">
                      {/* Offer Amount / Stake */}
                      {offerType === "Full" ? (
                        <SliderField
                          label="Offer Amount"
                          value={offerAmount}
                          min={Math.round(listing.askingPrice * 0.5)}
                          max={Math.round(listing.askingPrice * 1.5)}
                          step={1000}
                          prefix="$"
                          onChange={setOfferAmount}
                          accentClass="accent-primary"
                        />
                      ) : (
                        <SliderField
                          label={`Stake (${requestedPct}% = ${fmtMoney(currentPrice)})`}
                          value={requestedPct}
                          min={1}
                          max={listing.availableFraction ?? 100}
                          step={0.5}
                          suffix="%"
                          onChange={setRequestedPct}
                          accentClass="accent-primary"
                        />
                      )}

                      {/* Target Monthly Payment */}
                      <SliderField
                        label="Target Monthly Payment"
                        value={targetPayment}
                        min={0}
                        max={Math.round(listing.askingPrice / 50)}
                        step={10}
                        prefix="$"
                        onChange={handleTargetPaymentChange}
                        accentClass="accent-green-500"
                        valueClass="text-green-600"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SliderField
                          label={`Down Payment — ${downPct}%`}
                          value={downPct}
                          min={0}
                          max={100}
                          step={5}
                          suffix="%"
                          onChange={setDownPct}
                          accentClass="accent-slate-400"
                          compact
                        />
                        <SliderField
                          label={`Interest Rate — ${interestRate}%`}
                          value={interestRate}
                          min={0}
                          max={15}
                          step={0.1}
                          suffix="%"
                          onChange={setInterestRate}
                          accentClass="accent-slate-400"
                          compact
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black uppercase tracking-widest text-slate-400">Loan Term</span>
                        <div className="flex gap-1">
                          {[10, 15, 20, 30].map((y) => (
                            <button
                              key={y}
                              onClick={() => setLoanTerm(y)}
                              className={`px-2.5 py-1 rounded-lg font-black text-[10px] transition-all ${
                                loanTerm === y
                                  ? "bg-primary text-white"
                                  : "bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300 hover:bg-slate-300"
                              }`}
                            >
                              {y}yr
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2.5">
                      <SectionLabel icon="bar_chart" text="Sensitivity Summary" />
                      <div className="space-y-2">
                        <SummaryRow label="Loan Amount" value={`$${fmt(Math.round(loanAmount))}`} />
                        <SummaryRow label="Monthly Payment" value={`$${fmt(Math.round(calcPayment))}`} />
                        <SummaryRow
                          label="Net Cash Flow / mo"
                          value={`${netCashFlow >= 0 ? "+" : ""}$${fmt(Math.round(netCashFlow))}`}
                          valueClass={netCashFlow >= 0 ? "text-green-600" : "text-red-500"}
                        />
                        <SummaryRow label="Total Interest" value={`$${fmtMoney(Math.round(totalInterest))}`} />
                        <SummaryRow label="Down Payment" value={`$${fmt(Math.round(downAmount))}`} />
                      </div>
                    </div>

                    {/* Fractional ownership chart */}
                    {offerType === "Fractional" && listing.ownership && (
                      <div className="space-y-2.5">
                        <SectionLabel icon="pie_chart" text="Ownership Breakdown" />
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600">
                          <OwnershipDonut stakes={listing.ownership} yourPercentage={requestedPct} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Offer Form Fields */}
                  <div className="space-y-5">
                    <SectionLabel icon="edit_note" text="Offer Details" />

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField label="Your Name" value={buyerName} onChange={setBuyerName} />
                        <FormField label="Your Role" value={buyerRole} onChange={setBuyerRole} />
                      </div>

                      {listing.fractionalEnabled && offerType === "Fractional" && (
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                            Equity Type
                          </label>
                          <div className="flex gap-2">
                            {(["Cash", "Sweat", "Performance"] as const).map((t) => (
                              <button
                                key={t}
                                onClick={() => setEquityType(t)}
                                className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all uppercase tracking-wider ${
                                  equityType === t
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-slate-200 dark:border-slate-600 text-slate-400 hover:border-primary/30"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                          {equityType === "Sweat" && (
                            <textarea
                              value={sweatDetails}
                              onChange={(e) => setSweatDetails(e.target.value)}
                              placeholder="Describe your sweat equity contribution..."
                              rows={2}
                              className="mt-2 w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm sm:text-xs focus:ring-2 focus:ring-primary outline-none resize-none"
                            />
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField label="EMD ($)" value={emd} onChange={setEmd} type="number" />
                        <FormField label="Inspection Days" value={inspectionDays} onChange={setInspectionDays} type="number" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                          Closing Timeline
                        </label>
                        <select
                          value={closingTimeline}
                          onChange={(e) => setClosingTimeline(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm sm:text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
                        >
                          {["15 days", "21 days", "30 days", "45 days", "60 days", "As-Is / Quick Close"].map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={financingContingency}
                            onChange={(e) => setFinancingContingency(e.target.checked)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm sm:text-xs font-medium text-slate-600 dark:text-slate-300">Financing Contingency</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={appraisalContingency}
                            onChange={(e) => setAppraisalContingency(e.target.checked)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm sm:text-xs font-medium text-slate-600 dark:text-slate-300">Appraisal Contingency</span>
                        </label>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasEscalation}
                          onChange={(e) => setHasEscalation(e.target.checked)}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Escalation Clause</span>
                      </label>
                      {hasEscalation && (
                        <FormField
                          label="Escalation Limit ($)"
                          value={escalationLimit}
                          onChange={setEscalationLimit}
                          placeholder="e.g. 510000"
                        />
                      )}

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                          Personal Message (Optional)
                        </label>
                        <textarea
                          value={personalMessage}
                          onChange={(e) => setPersonalMessage(e.target.value)}
                          placeholder="Introduce yourself and your intentions..."
                          rows={3}
                          className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm sm:text-xs focus:ring-2 focus:ring-primary outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                            Offer Expires (days)
                          </label>
                          <select
                            value={offerExpiry}
                            onChange={(e) => setOfferExpiry(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm sm:text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
                          >
                            {["1", "2", "3", "5", "7"].map((v) => (
                              <option key={v} value={v}>{v} day{v !== "1" ? "s" : ""}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {submitError && (
                      <p className="text-xs text-red-500 font-medium">{submitError}</p>
                    )}

                    {/* Offer Summary + Submit */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                            {offerType === "Fractional" ? `${requestedPct}% Stake` : "Full Offer"}
                          </div>
                          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                            {fmtMoney(offerType === "Full" ? offerAmount : currentPrice)}
                          </div>
                        </div>
                        <button
                          onClick={handleSubmit}
                          disabled={submitting}
                          className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-black text-sm rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-60 flex items-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <span className="material-symbols-outlined text-base animate-spin">autorenew</span>
                              Sending…
                            </>
                          ) : (
                            <>
                              Submit Offer
                              <span className="material-symbols-outlined text-base">send</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        This is a non-binding expression of interest. No obligation is created until a formal purchase agreement is executed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// ---- Small helper components ----

function Row({
  label,
  value,
  valueClass = "text-slate-900 dark:text-white font-black",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      <span className={`text-sm font-mono ${valueClass}`}>{value}</span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  valueClass = "text-slate-900 dark:text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
      <span className={`text-xs font-black font-mono ${valueClass}`}>{value}</span>
    </div>
  );
}

function SectionLabel({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-sm text-primary">{icon}</span>
      <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{text}</span>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm sm:text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
      />
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
  accentClass,
  valueClass = "text-slate-900 dark:text-white",
  compact = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
  accentClass: string;
  valueClass?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <div className={`flex justify-between items-center ${compact ? "text-[10px]" : "text-xs"}`}>
        <span className="font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</span>
        {!compact && (
          <div className="relative">
            {prefix && <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{prefix}</span>}
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className={`w-28 ${prefix ? "pl-5" : "pl-2"} pr-2 py-0.5 text-xs font-mono font-black text-right bg-transparent border-b border-slate-200 dark:border-slate-600 focus:border-primary outline-none ${valueClass}`}
            />
            {suffix && <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{suffix}</span>}
          </div>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${accentClass}`}
      />
    </div>
  );
}
