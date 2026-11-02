import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up with your email in seconds and join a community of curious readers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Discover A Book",
    description:
      "Search by title, author or category and preview what is new on the shelf.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Borrow In One Click",
    description:
      "Send a borrow request and the book is reserved just for you — no queues, no paperwork.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Read, Return, Repeat",
    description:
      "Enjoy every page, then return it so the next reader can fall in love with it too.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </svg>
    ),
  },
];

const perks = [
  { value: "Free", label: "Membership, forever" },
  { value: "7 days", label: "Standard loan period" },
  { value: "500+", label: "Books on the shelf" },
];

export default function HowBorrowingWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B1913] px-6 py-20 sm:px-10 md:py-24">
      {/* Ambient glow decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#B9DCCB]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-[320px] w-[320px] rounded-full bg-[#C6A58A]/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B9DCCB]/60" />
            <p className="font-[var(--font-playfair)] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C6A58A] sm:text-xs">
              A Four Step Journey
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B9DCCB]/60" />
          </div>

          <h2 className="mt-4 font-[var(--font-playfair)] text-[26px] font-bold leading-tight sm:text-4xl md:text-[42px]">
            <span className="bg-gradient-to-r from-[#F8F5EE] via-[#B9DCCB] to-[#C6A58A] bg-clip-text text-transparent">
              How Borrowing Works
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-xs leading-6 text-[#AAB9AD] sm:text-[13px]">
            From joining to your first page — four small steps, zero hassle.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-2xl border border-[#B9DCCB]/15 bg-gradient-to-b from-[#0F211A] to-[#0A1712] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B9DCCB]/50 hover:shadow-[0_18px_40px_-18px_rgba(185,220,203,0.45)]"
            >
              {/* Top accent line */}
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B9DCCB]/50 to-transparent" />

              {/* Ghost number */}
              <span className="pointer-events-none absolute -right-2 -top-3 font-[var(--font-playfair)] text-[64px] font-bold leading-none text-[#B9DCCB]/[0.07] transition-colors duration-300 group-hover:text-[#B9DCCB]/[0.14]">
                {item.step}
              </span>

              {/* Icon tile */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#B9DCCB] to-[#7FB99C] text-[#0C1C15] shadow-[0_10px_25px_-12px_rgba(185,220,203,0.9)] transition-transform duration-300 group-hover:scale-105 [&>svg]:h-7 [&>svg]:w-7">
                {item.icon}
              </div>

              {/* Step label */}
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B9DCCB]/80">
                Step {item.step}
              </p>

              <h3 className="mt-2 font-[var(--font-playfair)] text-lg font-semibold text-[#F5F1E8]">
                {item.title}
              </h3>

              <p className="mt-2.5 text-xs leading-6 text-[#AAB9AD]">
                {item.description}
              </p>

              {/* Connector arrow (desktop) */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[15px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#B9DCCB]/25 bg-[#0C1C15] text-[#B9DCCB] lg:flex"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#B9DCCB]/15 bg-[#0C1C15]/70 sm:grid-cols-3">
          {perks.map((perk, index) => (
            <div
              key={perk.value}
              className={`px-6 py-6 text-center ${
                index > 0 ? "border-t border-[#B9DCCB]/12 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <p className="font-[var(--font-playfair)] text-2xl font-bold text-[#B9DCCB] sm:text-3xl">
                {perk.value}
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-[#91A397]">
                {perk.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#B9DCCB] px-8 py-3 text-xs font-semibold tracking-wide text-[#0C1C15] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#E7F1EA] sm:text-sm"
          >
            Start Borrowing — It&apos;s Free
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full border border-[#B9DCCB]/40 px-8 py-3 text-xs font-semibold tracking-wide text-[#B9DCCB] transition-all duration-300 hover:border-[#B9DCCB] hover:bg-[#B9DCCB]/10 sm:text-sm"
          >
            Browse The Shelf
          </Link>
        </div>
      </div>
    </section>
  );
}
