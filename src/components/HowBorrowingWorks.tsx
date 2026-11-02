
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function HowBorrowingWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B1913] px-4 py-20 sm:px-6 md:px-8 md:py-24">
      {/* Ambient Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#B9DCCB]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-[320px] w-[320px] rounded-full bg-[#C6A58A]/10 blur-[110px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B9DCCB]/60" />
            <span className="badge badge-outline border-[#C6A58A]/50 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C6A58A]">
              A Four Step Journey
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B9DCCB]/60" />
          </div>

          <h2 className="mt-5 font-[var(--font-playfair)] text-3xl font-bold leading-tight sm:text-4xl md:text-[42px]">
            <span className="bg-gradient-to-r from-[#F8F5EE] via-[#B9DCCB] to-[#C6A58A] bg-clip-text text-transparent">
              How Borrowing Works
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#AAB9AD]">
            From joining to your first page — four small steps, zero hassle.
          </p>
        </motion.div>

        {/* Step Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              variants={cardVariants}
              className="card group relative overflow-hidden border border-[#B9DCCB]/20 bg-gradient-to-b from-[#142B20] to-[#091710] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#B9DCCB]/60 hover:shadow-[0_18px_40px_-18px_rgba(185,220,203,0.45)]"
            >
              <div className="card-body relative gap-0 p-6">
                {/* Accent */}
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B9DCCB]/70 to-transparent" />

                {/* Background Number */}
                <span className="pointer-events-none absolute -right-2 -top-3 font-[var(--font-playfair)] text-7xl font-bold leading-none text-[#B9DCCB]/[0.07] transition-colors duration-300 group-hover:text-[#B9DCCB]/[0.15]">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B9DCCB] to-[#7FB99C] text-[#0C1C15] shadow-lg transition-transform duration-300 group-hover:scale-110 [&>svg]:h-7 [&>svg]:w-7">
                  {item.icon}
                </div>

                <div className="mt-6">
                  <span className="badge badge-sm border-0 bg-[#B9DCCB]/10 text-[#B9DCCB]">
                    STEP {item.step}
                  </span>

                  <h3 className="mt-3 font-[var(--font-playfair)] text-lg font-bold text-[#F5F1E8]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[#AAB9AD]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-6 h-[2px] w-10 rounded-full bg-[#B9DCCB]/40 transition-all duration-300 group-hover:w-full group-hover:bg-[#B9DCCB]/80" />
              </div>

              {/* Desktop Connector */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#B9DCCB]/30 bg-[#0B1913] text-[#B9DCCB] lg:flex"
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

{/* Trust Stats */}
<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.7 }}
  className="stats stats-vertical mt-12 w-full overflow-hidden border border-[#B9DCCB]/20 bg-[#10251A]/80 shadow-xl sm:stats-horizontal"
>
  {perks.map((perk, index) => (
    <motion.div
      key={perk.value}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
      className={`stat place-items-center text-center ${
        index > 0
          ? "border-t border-[#B9DCCB]/15 sm:border-l sm:border-t-0"
          : ""
      }`}
    >
      <div className="stat-value font-[var(--font-playfair)] text-2xl text-[#B9DCCB] sm:text-3xl">
        {perk.value}
      </div>

      <div className="stat-desc mt-2 text-[10px] uppercase tracking-[0.14em] text-[#AAB9AD]">
        {perk.label}
      </div>
    </motion.div>
  ))}
</motion.div>
        {/* Call To Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/register"
            className="btn btn-sm min-h-0 rounded-full border-0 bg-[#B9DCCB] px-7 py-3 text-xs font-semibold text-[#0C1C15] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#E7F1EA] sm:btn-md"
          >
            Start Borrowing — It&apos;s Free <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/books"
            className="btn btn-sm min-h-0 rounded-full border border-[#B9DCCB]/40 bg-transparent px-7 py-3 text-xs font-semibold text-[#B9DCCB] transition-all duration-300 hover:-translate-y-1 hover:border-[#B9DCCB] hover:bg-[#B9DCCB]/10 sm:btn-md"
          >
            Browse The Shelf
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
