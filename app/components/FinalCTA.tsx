import Link from "next/link";

const properties = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHj0w7Oz-rg7mXzdPWI_-QxVw2ybGCzDA57vEcwFXkUrl-Th1DU4DarTsAz0Gm-nSo1kSuAoPMa7-kHwuKK4E8YBPcCYjtVWvpfu_gu4po4-hmhPMv_D93-jrSW4qztFJcOkHAsXoHgsSHFiQkzL7eDWz-ULFd0YxdtbEZrJYnbt-d8ecgp8Zy9pUTs8nyQmKnCJpw58kz3iHdMInp9sPBMWpPdLc9bKi4uopEsYGvzQVF4eCiVFJbm-nhQaNys9eqfIAtMMlkE-Zh",
    badge: "8.2% Cap Rate",
    badgeColor: "bg-green-500",
    title: "Riverside Heights Apt",
    price: "$4.2M",
    desc: "12-unit residential complex, 95% occupancy. Prime location with expansion potential.",
    sqft: "12,500 SF",
    location: "Riverside Center",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz84TWMYMcfwZqIfzwN9Bp8aITfY04BSyIS5-dg4YenRCtiE6pvuAaGy10B_Prok9QOnfUGwE5XcUk9ZAKFWi5bp4mrtzyTjTs0WBkqLVj2bIWA6M6LvtzmkA3BhscxzOpZMt4WlRuIhnQ6UWVuyUEfZWQ34GPnbUGK-vBxw-6_GOcYibSnH6_u3mHxTC6lwlv45AcppYzPhy3xfAsbtczD_Wj34kGDvH7-9b-rwSSB-u9caE3wyzekuqw96_uQo5949fCzxHczcrR",
    badge: "Value-Add",
    badgeColor: "bg-primary",
    title: "East Industrial Park",
    price: "$1.8M",
    desc: "Flex warehouse space. Recently renovated roof and HVAC. Stable long-term tenant.",
    sqft: "8,200 SF",
    location: "East Riverside",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFF36ufVs6YXrDY6jEni-aDKMxf_RJpLHfhSP1Uej14p2aHeWMRuQsvxZwHlu1XPsfEOqQcglYtxn2v464wxF8XRTumWWv8Ct1_2If03v-K1GoY5IzlNEy5SqkAhuefCk-H8kUFp7vRmeK6zUl5glyOSwlU6EJZzV0Px3sqjDDuqRt_ot2uyryDFPhaX1NJtZHtEmB5HpD3PbObcDKGAuXcn4BsCge_YoLvuWBHAMibmoUaHwZdoMvNOyRiWAgRvCxkp2k1vxj9VQN",
    badge: "Off-Market",
    badgeColor: "bg-orange-500",
    title: "The Grand Riverside",
    price: "$7.5M",
    desc: "Boutique hotel redevelopment opportunity. Rare waterfront views and zoning.",
    sqft: "22,000 SF",
    location: "Waterfront Dist.",
  },
];

export default function InvestmentOpportunities() {
  return (
    <section
      className="py-16 sm:py-24 bg-slate-900 text-white overflow-hidden relative"
      id="investment"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                The Exchange Marketplace
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4">
              Featured Investment Opportunities
            </h2>
            <p className="text-slate-400 max-w-xl text-base sm:text-lg">
              Direct access to promising multi-family and commercial assets
              currently live on the Riverside Exchange.
            </p>
          </div>
          <Link href="/exchange" className="bg-primary py-3 px-6 sm:py-4 sm:px-8 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 whitespace-nowrap shadow-xl shadow-primary/20 group text-sm sm:text-base">
            Enter Marketplace
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {properties.map((p) => (
            <div
              key={p.title}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="relative h-56">
                <img
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={p.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <span
                  className={`absolute top-4 left-4 ${p.badgeColor} text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest`}
                >
                  {p.badge}
                </span>
              </div>
              <div className="p-5 sm:p-8">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-xl group-hover:text-primary transition-colors">
                    {p.title}
                  </h4>
                  <span className="text-primary font-bold text-lg">
                    {p.price}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {p.desc}
                </p>
                <div className="flex items-center gap-6 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">
                      square_foot
                    </span>
                    {p.sqft}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">
                      location_on
                    </span>
                    {p.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
