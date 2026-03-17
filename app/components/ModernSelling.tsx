export default function ResidentialServices() {
  return (
    <section
      className="py-16 sm:py-24 bg-background-light/30 dark:bg-transparent"
      id="buy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6">
            Real Estate for Everyone
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Whether you&apos;re buying your first home or selling a lifelong
            estate, we provide the tools and talent to make it seamless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10" id="sell">
          {/* Buying Card */}
          <div className="group relative overflow-hidden rounded-[1.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                alt="Happy couple receiving keys to their new home"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIuLoROyREXAcz5TuxH-HyoHq7XnnzwCzn14JLI5dADXlXkLv2xjTIuuFbgy5OA9YgWn5UeSSdGILkl1TKvxesC6OEp4xI9UQea7WGxjHWD8GgexgvMZAQnBOPC2NuKVBBCz4_StK_Rl2BSLPUbH1dDnr3Few4l1v3yv_NtGKTNZn1ct3Vh-0UwMwWEbWxiHGTeP4BOwKMpBoZNLq_YlMLv29w-Nz1jl55duj-ZlHvnDjGZa2eJRwlIWQYI1fIpooJw8ntasLSK_bf"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Buying a Home</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 leading-relaxed">
                Our local experts help you navigate the competitive Riverside
                market to find a place that fits your lifestyle and budget.
              </p>
              <a
                className="inline-flex items-center text-primary font-bold gap-2 hover:gap-4 transition-all"
                href="#"
              >
                Search Homes
                <span className="material-symbols-outlined text-xl">
                  arrow_right_alt
                </span>
              </a>
            </div>
          </div>

          {/* Selling Card */}
          <div className="group relative overflow-hidden rounded-[1.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                alt="Modern house with For Sale sign in the front yard"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmpF_CqcR0_dpw6W__w99qQQET2QKbM_8YB-fTLd8R7J0WliiNUsRMSmXSVne_tcYsCk5d3aF2vQbZC2LLuyGSD4OFHVDNtj7AiSPopsvmOxv6_exmUSV-8MDdpRd-EnGhTCGGT_Rf5VAfSf4lanlgAgsBWopvuCQhUyZdpoRkcWunPx5q9Y8fHXW0iRSDSVi5Hsq7TGyqmCclNwkFB8LrssH4ExaEtbHGvvupYWqS3HY4UTCg111JANlI20yoGHBjB6GQCBQNFPdN"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Selling Your Property</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 leading-relaxed">
                Get a data-backed valuation and list with Riverside&apos;s most
                trusted name. We maximize your equity with precision marketing.
              </p>
              <a
                className="inline-flex items-center text-primary font-bold gap-2 hover:gap-4 transition-all"
                href="#"
              >
                Get a Valuation
                <span className="material-symbols-outlined text-xl">
                  arrow_right_alt
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
