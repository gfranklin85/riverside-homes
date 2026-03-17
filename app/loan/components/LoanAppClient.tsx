"use client";

import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Purpose = "Purchase" | "Refinance" | "Cash-out" | "";
type PropType = "Residential" | "Industrial" | "Commercial" | "Land" | "";
type RateKey = "conv30" | "conv15" | "va" | "fha" | "arm" | "hard" | "none";

interface RateInfo {
  rate: number;
  term: number; // months
  label: string;
  termLabel: string;
  typeLabel: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RATES: Record<RateKey, RateInfo> = {
  conv30: { rate: 6.27, term: 360, label: "30-yr Fixed",  termLabel: "30 yr",  typeLabel: "Fixed"         },
  conv15: { rate: 5.72, term: 180, label: "15-yr Fixed",  termLabel: "15 yr",  typeLabel: "Fixed"         },
  va:     { rate: 5.75, term: 360, label: "VA 30-yr",     termLabel: "30 yr",  typeLabel: "Fixed"         },
  fha:    { rate: 6.50, term: 360, label: "FHA 30-yr",    termLabel: "30 yr",  typeLabel: "Fixed"         },
  arm:    { rate: 6.47, term: 360, label: "5/1 ARM",      termLabel: "30 yr",  typeLabel: "Adjustable"    },
  hard:   { rate: 10.5, term: 18,  label: "Hard Money",   termLabel: "18 mo",  typeLabel: "Interest-only" },
  none:   { rate: 6.27, term: 360, label: "30-yr Fixed",  termLabel: "30 yr",  typeLabel: "Fixed"         },
};

const LOAN_TYPE_OPTIONS: { value: RateKey | ""; label: string }[] = [
  { value: "",       label: "Select type"         },
  { value: "conv30", label: "Conventional 30-yr"  },
  { value: "conv15", label: "Conventional 15-yr"  },
  { value: "va",     label: "VA Loan"             },
  { value: "fha",    label: "FHA"                 },
  { value: "arm",    label: "5/1 ARM"             },
  { value: "hard",   label: "Hard Money / Bridge" },
  { value: "none",   label: "No preference"       },
];

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

function pmtToLoan(monthly: number, annualRate: number, termMonths: number): number {
  if (annualRate === 0) return monthly * termMonths;
  const r = annualRate / 100 / 12;
  return Math.round((monthly * (1 - Math.pow(1 + r, -termMonths))) / r);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div
      className="w-[18px] h-[18px] rounded-full border flex-shrink-0 transition-all"
      style={{
        border: selected ? "1.5px solid #10b981" : "1.5px solid rgba(255,255,255,0.18)",
        background: selected ? "#10b981" : "transparent",
      }}
    />
  );
}

function SectionNum({ n }: { n: string | number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] mr-2.5 flex-shrink-0 font-sans"
      style={{ background: "#18181b", border: "0.5px solid rgba(255,255,255,0.18)", color: "#a1a1a0" }}
    >
      {n}
    </span>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[12px] uppercase tracking-widest font-sans mb-1.5" style={{ color: "#a1a1a0", letterSpacing: "0.06em" }}>
      {children}
    </label>
  );
}

function Input({
  id, type = "text", placeholder, value, onChange, prefix, step, rows,
}: {
  id?: string; type?: string; placeholder?: string; value?: string | number;
  onChange?: (v: string) => void; prefix?: string; step?: number; rows?: number;
}) {
  const base =
    "w-full px-3.5 py-[10px] rounded-lg text-[15px] font-sans outline-none transition-colors appearance-none " +
    "bg-[#111113] text-[#f2f2f0] placeholder-[#555553] focus:border-[#10b981] ";
  const borderStyle = "border border-[rgba(255,255,255,0.18)]";

  if (rows) {
    return (
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value as string}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${base} ${borderStyle}`}
      />
    );
  }

  return (
    <div className={prefix ? "relative" : ""}>
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-sans" style={{ color: "#555553" }}>
          {prefix}
        </span>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        step={step}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${base} ${borderStyle} ${prefix ? "pl-7" : ""}`}
      />
    </div>
  );
}

function Select({
  id, value, onChange, options,
}: {
  id?: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-[10px] rounded-lg text-[15px] font-sans outline-none appearance-none transition-colors bg-[#111113] text-[#f2f2f0] border border-[rgba(255,255,255,0.18)] focus:border-[#10b981]"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} style={{ background: "#111113", color: "#f2f2f0" }}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LoanAppClient() {
  const [step, setStep] = useState(0);

  // Step 1
  const [purpose, setPurpose] = useState<Purpose>("");
  const [propType, setPropType] = useState<PropType>("");

  // Step 2
  const [credit, setCredit] = useState("");
  const [income, setIncome] = useState("");
  const [downpay, setDownpay] = useState("");
  const [loanTypeKey, setLoanTypeKey] = useState<RateKey | "">("");
  const [chosenPmt, setChosenPmt] = useState(1500);

  // Step 3
  const [address, setAddress] = useState("");
  const [propValue, setPropValue] = useState("");
  const [condition, setCondition] = useState("");
  const [useType, setUseType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");

  // Step 4
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cTime, setCTime] = useState("");

  // Success
  const [refNum, setRefNum] = useState("");

  // Derived
  const activeRate: RateInfo = loanTypeKey ? RATES[loanTypeKey] : RATES.conv30;
  const monthlyIncome = parseFloat(income) || 0;
  const maxMonthlyPmt = Math.round(monthlyIncome * 0.5);
  const downpayNum = parseFloat(downpay) || 0;

  const affordanceUnlocked = monthlyIncome > 0;

  // Recalc when relevant values change
  const safeChosen = Math.min(chosenPmt, maxMonthlyPmt || chosenPmt);

  const calcResult = (() => {
    if (!safeChosen) return null;
    const r = activeRate;
    const roughLoan = r === RATES.hard
      ? Math.round(safeChosen / (r.rate / 100 / 12))
      : pmtToLoan(safeChosen, r.rate, r.term);
    const roughHomeVal = roughLoan + downpayNum;
    const ltv = roughHomeVal > 0 ? downpayNum / roughHomeVal : 0;
    const needsPMI = ltv < 0.2 && r !== RATES.va && r !== RATES.hard;
    const taxEst = Math.round(roughHomeVal * 0.011 / 12);
    const insEst = Math.round(roughHomeVal * 0.0035 / 12);
    const pmiEst = needsPMI ? Math.round(roughLoan * 0.006 / 12) : 0;
    const piBudget = Math.max(safeChosen - taxEst - insEst - pmiEst, 50);
    const loanAmt = r === RATES.hard
      ? Math.round(piBudget / (r.rate / 100 / 12))
      : pmtToLoan(piBudget, r.rate, r.term);
    const homeVal = loanAmt + downpayNum;
    const finalTax = Math.round(homeVal * 0.011 / 12);
    const finalIns = Math.round(homeVal * 0.0035 / 12);
    const finalPMI = needsPMI ? Math.round(loanAmt * 0.006 / 12) : 0;
    const piActual = safeChosen - finalTax - finalIns - finalPMI;
    const total = piActual + finalTax + finalIns + finalPMI;
    return { loanAmt, piActual, finalTax, finalIns, finalPMI, total, homeVal, needsPMI };
  })();

  // Clamp slider when income changes
  useEffect(() => {
    if (maxMonthlyPmt > 0) {
      const suggested = Math.min(Math.round(monthlyIncome * 0.3 / 50) * 50, maxMonthlyPmt);
      setChosenPmt(suggested);
    }
  }, [income]);

  function goStep(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function step1Next() {
    if (!purpose || !propType) { alert("Please select a loan purpose and property type."); return; }
    goStep(2);
  }

  function step2Next() {
    if (!credit) { alert("Please select an approximate credit score range."); return; }
    goStep(3);
  }

  function step3Next() {
    if (!timeline) { alert("Please select a closing timeline."); return; }
    goStep(4);
  }

  function submitApp() {
    if (!cName || (!cEmail && !cPhone)) {
      alert("Please provide your name and at least one contact method.");
      return;
    }
    const ref = "LMR-" + Math.floor(100000 + Math.random() * 900000);
    setRefNum(ref);
    console.log("Loan Application:", { purpose, propType, credit, income, downpay, loanTypeKey, loan: calcResult?.loanAmt, address, propValue, condition, useType, timeline, notes, cName, cEmail, cPhone, cTime, ref });
    goStep(5);
  }

  const stepTitles = ["", "Loan & Property", "Financials", "Property Details", "Review & Submit"];
  const stepPcts = [0, 25, 50, 75, 100];

  const surface = "#111113";
  const surface2 = "#18181b";
  const border = "rgba(255,255,255,0.1)";
  const border2 = "rgba(255,255,255,0.18)";
  const green = "#10b981";
  const muted = "#a1a1a0";
  const dim = "#555553";

  const cardStyle = { background: surface, border: `0.5px solid ${border2}`, borderRadius: 10 };
  const cardPad = { padding: "1.25rem 1.5rem" };

  return (
    <div style={{ background: "#09090b", minHeight: "100vh", color: "#f2f2f0" }}>

      {/* Progress header */}
      {step > 0 && step < 5 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: green, marginBottom: "0.5rem", fontFamily: "system-ui,sans-serif" }}>
            Application Process
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <div style={{ fontSize: 24, fontWeight: 400 }}>{stepTitles[step]}</div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: muted, fontFamily: "system-ui,sans-serif" }}>Step {step} of 4</div>
              <div style={{ fontSize: 13, color: green, fontFamily: "system-ui,sans-serif", fontWeight: 500 }}>{stepPcts[step]}% complete</div>
            </div>
          </div>
          <div style={{ height: 2, background: border, borderRadius: 2, marginBottom: "2rem" }}>
            <div style={{ height: 2, background: green, borderRadius: 2, width: `${stepPcts[step]}%`, transition: "width 0.5s ease" }} />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem 4rem" }}>

        {/* ── INTRO ─────────────────────────────────────────────── */}
        {step === 0 && (
          <div style={{ paddingTop: "2rem" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: green, marginBottom: "1rem", fontFamily: "system-ui,sans-serif" }}>
              Riverside · Inland Empire
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.2, marginBottom: "1rem" }}>
              Get lenders competing<br />for your loan.
            </h1>
            <p style={{ fontSize: 16, color: muted, lineHeight: 1.7, marginBottom: "2rem", fontFamily: "system-ui,sans-serif", maxWidth: 500 }}>
              Fill out one application. We connect you with the right lenders for your situation — no cold calls, no pressure, no mystery fees.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: "2.5rem", maxWidth: 500 }}>
              {[["4", "Steps"], ["~5", "Minutes"], ["0", "Credit pull"]].map(([val, lbl]) => (
                <div key={lbl} style={{ ...cardStyle, padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontSize: 22, color: green, fontFamily: "system-ui,sans-serif", fontWeight: 500, marginBottom: 4 }}>{val}</div>
                  <div style={{ fontSize: 11, color: muted, fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{lbl}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => goStep(1)}
              style={{ padding: "12px 28px", background: green, border: "none", borderRadius: 8, color: "white", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              Start Application →
            </button>
            <p style={{ fontSize: 12, color: dim, marginTop: "1rem", fontFamily: "system-ui,sans-serif" }}>
              No credit check. No commitment. Your info goes only to our team.
            </p>
          </div>
        )}

        {/* ── STEP 1 ────────────────────────────────────────────── */}
        {step === 1 && (
          <div>
            {/* Loan Purpose */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", alignItems: "center", marginBottom: "0.35rem" }}>
                <SectionNum n={1} />Loan Purpose
              </div>
              <div style={{ fontSize: 13, color: muted, marginBottom: "1.25rem", fontFamily: "system-ui,sans-serif", paddingLeft: 34 }}>
                What is the primary reason for this financing request?
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {(["Purchase", "Refinance", "Cash-out"] as Purpose[]).map((p) => {
                  const sel = purpose === p;
                  return (
                    <div
                      key={p}
                      onClick={() => setPurpose(p)}
                      style={{ padding: "1rem", border: `0.5px solid ${sel ? green : border2}`, borderRadius: 10, cursor: "pointer", background: sel ? surface2 : surface, position: "relative", transition: "all 0.15s" }}
                    >
                      <div style={{ position: "absolute", top: 10, right: 10, width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${sel ? green : border2}`, background: sel ? green : "transparent" }}>
                        {sel && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white", position: "relative", top: 3, left: 3 }} />}
                      </div>
                      {p === "Purchase"  && <svg className="w-7 h-7 mb-2 opacity-60" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                      {p === "Refinance" && <svg className="w-7 h-7 mb-2 opacity-60" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>}
                      {p === "Cash-out"  && <svg className="w-7 h-7 mb-2 opacity-60" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
                      <div style={{ fontSize: 14, color: "#f2f2f0", marginBottom: 3 }}>{p}</div>
                      <div style={{ fontSize: 12, color: dim, fontFamily: "system-ui,sans-serif" }}>
                        {p === "Purchase" ? "Buying a new property" : p === "Refinance" ? "Optimize current debt" : "Extract liquid equity"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Property Type */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", alignItems: "center", marginBottom: "0.35rem" }}>
                <SectionNum n={2} />Property Type
              </div>
              <div style={{ fontSize: 13, color: muted, marginBottom: "1.25rem", fontFamily: "system-ui,sans-serif", paddingLeft: 34 }}>
                What kind of property is this loan for?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {([
                  ["Residential", "🏠", "Single family, condos, multi-family"],
                  ["Industrial",  "🏭", "Warehouses, manufacturing, plants"],
                  ["Commercial",  "🏢", "Office space, retail, hospitality"],
                  ["Land",        "🌿", "Undeveloped parcels, ag land"],
                ] as [PropType, string, string][]).map(([val, icon, sub]) => {
                  const sel = propType === val;
                  return (
                    <div
                      key={val}
                      onClick={() => setPropType(val)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", border: `0.5px solid ${sel ? green : border2}`, borderRadius: 8, cursor: "pointer", background: sel ? surface2 : surface, transition: "all 0.15s" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 6, background: surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{icon}</div>
                        <div>
                          <div style={{ fontSize: 15, color: "#f2f2f0" }}>{val}</div>
                          <div style={{ fontSize: 12, color: dim, fontFamily: "system-ui,sans-serif" }}>{sub}</div>
                        </div>
                      </div>
                      <RadioCircle selected={sel} />
                    </div>
                  );
                })}
              </div>
            </div>

            <BtnRow onBack={() => goStep(0)} onNext={step1Next} />
          </div>
        )}

        {/* ── STEP 2 ────────────────────────────────────────────── */}
        {step === 2 && (
          <div>
            {/* Financials */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", alignItems: "center", marginBottom: "0.35rem" }}>
                <SectionNum n={3} />Financials
              </div>
              <div style={{ fontSize: 13, color: muted, marginBottom: "1.25rem", fontFamily: "system-ui,sans-serif", paddingLeft: 34 }}>
                Approximate figures are fine — this helps match you with the right lenders.
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <FieldLabel>Approximate Credit Score</FieldLabel>
                  <Select value={credit} onChange={setCredit} options={[
                    { value: "", label: "Select range" },
                    { value: "740+", label: "740+" },
                    { value: "700–739", label: "700–739" },
                    { value: "680–699", label: "680–699" },
                    { value: "660–679", label: "660–679" },
                    { value: "640–659", label: "640–659" },
                    { value: "Below 640", label: "Below 640" },
                  ]} />
                </div>
                <div>
                  <FieldLabel>Monthly Household Income</FieldLabel>
                  <Input type="number" placeholder="0.00" value={income} onChange={setIncome} prefix="$" step={100} />
                  <div style={{ fontSize: 11, color: dim, marginTop: 4, fontFamily: "system-ui,sans-serif" }}>Used to calculate max monthly payment (50% DTI)</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <FieldLabel>Down Payment Amount</FieldLabel>
                  <Input type="number" placeholder="0.00" value={downpay} onChange={setDownpay} prefix="$" step={1000} />
                  <div style={{ fontSize: 11, color: dim, marginTop: 4, fontFamily: "system-ui,sans-serif" }}>Min 3.5% FHA · 0% VA · 5–20% conventional</div>
                </div>
                <div>
                  <FieldLabel>Loan Type Preference</FieldLabel>
                  <Select
                    value={loanTypeKey}
                    onChange={(v) => setLoanTypeKey(v as RateKey | "")}
                    options={LOAN_TYPE_OPTIONS}
                  />
                </div>
              </div>
            </div>

            {/* Rate card */}
            {loanTypeKey && (
              <div style={{ ...cardStyle, padding: "1rem 1.25rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: muted, fontFamily: "system-ui,sans-serif" }}>
                    Current Rate — {activeRate.label}
                  </div>
                  <div style={{ fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif" }}>Freddie Mac · Mar 16, 2026</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    ["Rate", `${activeRate.rate.toFixed(2)}%`, green],
                    ["Term", activeRate.termLabel, "#f2f2f0"],
                    ["Type", activeRate.typeLabel, "#f2f2f0"],
                  ].map(([lbl, val, col]) => (
                    <div key={lbl} style={{ background: surface2, borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif", marginBottom: 3 }}>{lbl}</div>
                      <div style={{ fontSize: 20, color: col, fontFamily: "system-ui,sans-serif", fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Affordability */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", alignItems: "center", marginBottom: "0.35rem" }}>
                <SectionNum n={4} />What you qualify for
              </div>
              <div style={{ fontSize: 13, color: muted, marginBottom: "1.25rem", fontFamily: "system-ui,sans-serif", paddingLeft: 34 }}>
                {affordanceUnlocked ? "Drag the slider to see how your monthly payment affects your loan amount." : "Enter your income above to unlock the affordability slider."}
              </div>

              {!affordanceUnlocked ? (
                <div style={{ ...cardStyle, padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: dim, fontFamily: "system-ui,sans-serif" }}>Enter monthly income to calculate</div>
                </div>
              ) : (
                <div>
                  {/* Max payment banner */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(16,185,129,0.07)", border: "0.5px solid rgba(16,185,129,0.25)", borderRadius: 10, padding: "12px 16px", marginBottom: "1.25rem" }}>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: green, fontFamily: "system-ui,sans-serif", marginBottom: 2 }}>Max monthly payment (50% DTI)</div>
                      <div style={{ fontSize: 22, color: "#f2f2f0", fontFamily: "system-ui,sans-serif", fontWeight: 500 }}>{fmt(maxMonthlyPmt)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif", marginBottom: 2 }}>Monthly income</div>
                      <div style={{ fontSize: 14, color: muted, fontFamily: "system-ui,sans-serif" }}>{fmt(monthlyIncome)}/mo</div>
                    </div>
                  </div>

                  {/* Slider */}
                  <div style={{ ...cardStyle, padding: "1.5rem", marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                      <div style={{ fontSize: 13, color: muted, fontFamily: "system-ui,sans-serif" }}>Monthly payment I&apos;m comfortable with</div>
                      <div style={{ fontSize: 26, color: green, fontFamily: "system-ui,sans-serif", fontWeight: 500 }}>{fmt(safeChosen)}</div>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={maxMonthlyPmt}
                      step={50}
                      value={safeChosen}
                      onChange={(e) => setChosenPmt(parseInt(e.target.value))}
                      style={{ width: "100%", accentColor: green, margin: "0.75rem 0" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif" }}>
                      <span>$200</span>
                      <span>Max: {fmt(maxMonthlyPmt)}</span>
                    </div>
                  </div>

                  {/* Loan result card */}
                  {calcResult && (
                    <div style={{ ...cardStyle, padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                        <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: muted, fontFamily: "system-ui,sans-serif" }}>Estimated loan you qualify for</div>
                        <div style={{ fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif" }}>{activeRate.label}</div>
                      </div>
                      <div style={{ fontSize: 40, color: green, fontFamily: "system-ui,sans-serif", fontWeight: 500, marginBottom: "1rem" }}>{fmt(calcResult.loanAmt)}</div>

                      <div style={{ height: "0.5px", background: border, marginBottom: "1rem" }} />
                      <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: muted, fontFamily: "system-ui,sans-serif", marginBottom: "0.6rem" }}>Monthly payment breakdown (PITI)</div>

                      {/* Stacked bar */}
                      <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", marginBottom: "0.75rem", gap: 2 }}>
                        {[
                          { color: "#10b981", pct: calcResult.piActual },
                          { color: "#2563eb", pct: calcResult.finalTax },
                          { color: "#555553", pct: calcResult.finalIns },
                          ...(calcResult.needsPMI ? [{ color: "#e24b4a", pct: calcResult.finalPMI }] : []),
                        ].map(({ color, pct }, i) => {
                          const total = calcResult.piActual + calcResult.finalTax + calcResult.finalIns + calcResult.finalPMI;
                          return <div key={i} style={{ background: color, height: "100%", borderRadius: 2, width: `${Math.round(pct / Math.max(total, 1) * 100)}%`, transition: "width 0.3s" }} />;
                        })}
                      </div>

                      {/* PITI rows */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "1rem" }}>
                        {[
                          { color: "#10b981", label: "Principal & Interest",                   val: calcResult.piActual  },
                          { color: "#2563eb", label: "Property Tax (est. 1.1%/yr)",            val: calcResult.finalTax  },
                          { color: "#555553", label: "Homeowner's Insurance (est. 0.35%/yr)",  val: calcResult.finalIns  },
                          ...(calcResult.needsPMI ? [{ color: "#e24b4a", label: "PMI (<20% down)", val: calcResult.finalPMI }] : []),
                        ].map(({ color, label, val }) => (
                          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
                              <div style={{ fontSize: 13, color: muted, fontFamily: "system-ui,sans-serif" }}>{label}</div>
                            </div>
                            <div style={{ fontSize: 14, color: "#f2f2f0", fontFamily: "system-ui,sans-serif", fontWeight: 500 }}>{fmt(val)}</div>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: surface2, borderRadius: 8, marginBottom: "0.75rem" }}>
                        <div style={{ fontSize: 13, color: "#f2f2f0", fontFamily: "system-ui,sans-serif", fontWeight: 500 }}>Total PITI</div>
                        <div style={{ fontSize: 16, color: green, fontFamily: "system-ui,sans-serif", fontWeight: 500 }}>{fmt(calcResult.total)}</div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "0.75rem" }}>
                        <div>
                          <div style={{ fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif", marginBottom: 2 }}>Rate / term</div>
                          <div style={{ fontSize: 13, color: "#f2f2f0", fontFamily: "system-ui,sans-serif" }}>{activeRate.rate.toFixed(2)}% · {activeRate.termLabel}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif", marginBottom: 2 }}>Total purchase power</div>
                          <div style={{ fontSize: 13, color: "#f2f2f0", fontFamily: "system-ui,sans-serif" }}>
                            {downpayNum > 0 ? fmt(calcResult.loanAmt + downpayNum) : "No down payment entered"}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: 11, color: dim, fontFamily: "system-ui,sans-serif", lineHeight: 1.5 }}>
                        {loanTypeKey === "hard"
                          ? "Hard money is interest-only. Balloon due at term end. Not a loan commitment."
                          : "Tax: 1.1% (Riverside County avg). Insurance: 0.35%. PMI applies when down payment < 20%. Estimates only — not a loan commitment."}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <BtnRow onBack={() => goStep(1)} onNext={step2Next} />
          </div>
        )}

        {/* ── STEP 3 ────────────────────────────────────────────── */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", alignItems: "center", marginBottom: "0.35rem" }}>
                <SectionNum n={5} />Property Details
              </div>
              <div style={{ fontSize: 13, color: muted, marginBottom: "1.25rem", fontFamily: "system-ui,sans-serif", paddingLeft: 34 }}>
                Tell us about the specific property.
              </div>

              <div style={{ marginBottom: 12 }}>
                <FieldLabel>Property Address or Area</FieldLabel>
                <Input placeholder="123 Main St, Riverside CA — or just 'near March ARB'" value={address} onChange={setAddress} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <FieldLabel>Estimated Property Value</FieldLabel>
                  <Input type="number" placeholder="0.00" value={propValue} onChange={setPropValue} prefix="$" />
                </div>
                <div>
                  <FieldLabel>Property Condition</FieldLabel>
                  <Select value={condition} onChange={setCondition} options={[
                    { value: "", label: "Select condition" },
                    { value: "Move-in ready", label: "Move-in ready" },
                    { value: "Good — needs minor updates", label: "Good — needs minor updates" },
                    { value: "Needs significant work", label: "Needs significant work" },
                    { value: "Under construction", label: "Under construction" },
                    { value: "Vacant / non-functional", label: "Vacant / non-functional" },
                  ]} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <FieldLabel>Intended Use</FieldLabel>
                  <Select value={useType} onChange={setUseType} options={[
                    { value: "", label: "Select use" },
                    { value: "Primary residence", label: "Primary residence" },
                    { value: "Investment / rental", label: "Investment / rental" },
                    { value: "Fix and flip", label: "Fix and flip" },
                    { value: "Commercial / business use", label: "Commercial / business use" },
                    { value: "Undecided", label: "Undecided" },
                  ]} />
                </div>
                <div>
                  <FieldLabel>Closing Timeline</FieldLabel>
                  <Select value={timeline} onChange={setTimeline} options={[
                    { value: "", label: "Select timeline" },
                    { value: "ASAP — within 30 days", label: "ASAP — within 30 days" },
                    { value: "30–60 days", label: "30–60 days" },
                    { value: "60–90 days", label: "60–90 days" },
                    { value: "3–6 months", label: "3–6 months" },
                    { value: "Just exploring", label: "Just exploring" },
                  ]} />
                </div>
              </div>

              <div>
                <FieldLabel>Additional Context (optional)</FieldLabel>
                <Input rows={3} placeholder="VA eligibility, 1031 exchange, PCS orders, tenants in place, anything that affects the deal..." value={notes} onChange={setNotes} />
              </div>
            </div>

            <BtnRow onBack={() => goStep(2)} onNext={step3Next} />
          </div>
        )}

        {/* ── STEP 4 ────────────────────────────────────────────── */}
        {step === 4 && (
          <div>
            {/* Contact */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", alignItems: "center", marginBottom: "0.35rem" }}>
                <SectionNum n={6} />Contact Information
              </div>
              <div style={{ fontSize: 13, color: muted, marginBottom: "1.25rem", fontFamily: "system-ui,sans-serif", paddingLeft: 34 }}>
                Where should we send your lender matches?
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input placeholder="Your name" value={cName} onChange={setCName} />
                </div>
                <div>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" placeholder="you@email.com" value={cEmail} onChange={setCEmail} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <FieldLabel>Phone</FieldLabel>
                  <Input type="tel" placeholder="(951) 000-0000" value={cPhone} onChange={setCPhone} />
                </div>
                <div>
                  <FieldLabel>Best Time to Reach You</FieldLabel>
                  <Select value={cTime} onChange={setCTime} options={[
                    { value: "", label: "Select time" },
                    { value: "Morning (8am–12pm)", label: "Morning (8am–12pm)" },
                    { value: "Afternoon (12pm–5pm)", label: "Afternoon (12pm–5pm)" },
                    { value: "Evening (5pm–8pm)", label: "Evening (5pm–8pm)" },
                    { value: "Anytime", label: "Anytime" },
                  ]} />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <SectionNum n="✓" />Application Summary
              </div>
              <div style={{ ...cardStyle, ...cardPad }}>
                {[
                  ["Loan purpose",     purpose || "—"],
                  ["Property type",    propType || "—"],
                  ["Loan amount",      calcResult ? fmt(calcResult.loanAmt) : "—"],
                  ["Credit score",     credit || "—"],
                  ["Down payment",     downpayNum > 0 ? fmt(downpayNum) : "—"],
                  ["Loan type",        LOAN_TYPE_OPTIONS.find(o => o.value === loanTypeKey)?.label || "No preference"],
                  ["Timeline",         timeline || "—"],
                  ["Property address", address || "Not provided"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `0.5px solid ${border}`, fontFamily: "system-ui,sans-serif" }}>
                    <span style={{ fontSize: 13, color: muted }}>{k}</span>
                    <span style={{ fontSize: 13, color: k === "Loan amount" ? green : "#f2f2f0", fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", padding: "1.5rem 0", borderTop: `0.5px solid ${border}`, borderBottom: `0.5px solid ${border}`, marginBottom: "2rem" }}>
              {["No credit pull", "Private — our team only", "No commitment"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: dim, fontFamily: "system-ui,sans-serif" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: green, flexShrink: 0 }} />
                  {t}
                </div>
              ))}
            </div>

            <button
              onClick={submitApp}
              style={{ width: "100%", padding: "14px 36px", background: green, border: "none", borderRadius: 8, color: "white", fontSize: 16, cursor: "pointer" }}
            >
              Submit Application →
            </button>
            <div style={{ fontSize: 12, color: dim, textAlign: "center", marginTop: "0.75rem", fontFamily: "system-ui,sans-serif" }}>
              By submitting, your information goes only to our licensed team. No data shared with third parties without your consent.
            </div>

            <div style={{ display: "flex", marginTop: "1rem" }}>
              <button onClick={() => goStep(3)} style={{ fontSize: 14, color: muted, background: "none", border: "none", cursor: "pointer", padding: "8px 0", fontFamily: "inherit" }}>
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* ── SUCCESS ───────────────────────────────────────────── */}
        {step === 5 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: green, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: "0.75rem" }}>Application received.</h2>
            <p style={{ fontSize: 15, color: muted, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 2rem", fontFamily: "system-ui,sans-serif" }}>
              Our team will review your request and reach out within one business day with lender options matched to your situation. No pressure, just the honest picture.
            </p>
            <div style={{ display: "inline-block", background: surface, border: `0.5px solid ${border2}`, borderRadius: 8, padding: "10px 20px", fontFamily: "system-ui,sans-serif" }}>
              <div style={{ fontSize: 13, color: muted }}>Your reference number</div>
              <div style={{ fontSize: 18, color: green, fontWeight: 500, marginTop: 4 }}>{refNum}</div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <a href="/exchange" style={{ fontSize: 14, color: green, fontFamily: "system-ui,sans-serif" }}>← Back to Exchange</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shared button row ────────────────────────────────────────────────────────

function BtnRow({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem", gap: 12 }}>
      <button onClick={onBack} style={{ fontSize: 14, color: "#a1a1a0", background: "none", border: "none", cursor: "pointer", padding: "8px 0", fontFamily: "inherit" }}>
        ← Back
      </button>
      <button
        onClick={onNext}
        style={{ padding: "12px 28px", background: "#10b981", border: "none", borderRadius: 8, color: "white", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
      >
        Next Step →
      </button>
    </div>
  );
}
