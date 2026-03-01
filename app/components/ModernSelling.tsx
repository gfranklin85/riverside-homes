const features = [
  "Virtual walkthroughs to filter out window shoppers",
  "Online documents: sign everything from your phone",
  "Mobile photo sharing for quick prep updates",
  "No unnecessary visits: only qualified buyers enter",
  "Move at your pace with flexible closing timelines",
];

export default function ModernSelling() {
  return (
    <section className="py-20 px-6" id="modern">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <img
            alt="Remote Selling"
            className="rounded-3xl shadow-2xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAstI-WyTB5Ay7BrYuPqWQ_5O-V-fdmoPn5TevdSxb9bMpLYT_6LU6YQLjBOFtQvbGmrc0gbMrAy2kejTueVOqIs736OFKy7ydTtctaat_gFbXzeDeWbTUF0j9ClaNB_xMMhb3B6jTtWlB4g_RPfoGKi10BcWNPRqMYDaRgU-IdkE_Gc6HYQgk9l275tI8pylSzynyocg1-JyrSmjZmn2jO5wLfYbJUjOipjrLEyGr7NbkMBFBzwgCQtHMnAjqby7eJpYsBaV9S6Md8"
          />
        </div>

        <div className="order-1 lg:order-2 flex flex-col gap-6">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white">
            Sell Without Disrupting Your Life
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            The old way of selling meant endless interruptions. We built a modern
            alternative that keeps you in control.
          </p>

          <ul className="grid gap-4 mt-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="bg-primary/20 text-primary p-1 rounded-full flex shrink-0">
                  <span className="material-symbols-outlined text-base">
                    check
                  </span>
                </div>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
