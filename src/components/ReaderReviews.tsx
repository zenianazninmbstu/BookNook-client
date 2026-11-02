
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Nusrat Jahan",
    role: "Regular Reader",
    quote:
      "BookNook made it so easy to find books I actually want to read. I borrowed three this month alone and never waited in a queue once.",
    rating: 5,
    badges: ["Verified Reader", "3 borrows this month"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Tanvir Ahmed",
    role: "CS Student",
    quote:
      "Clean, simple and fast. The borrow request took me less than a minute, and returning was even easier. Exactly what a library site should feel like.",
    rating: 5,
    badges: ["Verified Reader", "Top Reviewer"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sadia Rahman",
    role: "Book Club Host",
    quote:
      "We source most of our club reads from BookNook now. The new arrivals section is always fresh, and our whole group finds something in minutes.",
    rating: 4,
    badges: ["Verified Reader", "Club Organiser"],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const summary = [
  { value: "4.9", label: "Average rating" },
  { value: "2,300+", label: "Happy readers" },
  { value: "98%", label: "Would recommend" },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-4 w-4 ${
            index < rating
              ? "fill-[#E7C88A] text-[#E7C88A]"
              : "fill-transparent text-[#E7C88A]/35"
          }`}
        >
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#B9DCCB] to-[#7FB99C] ring-2 ring-[#B9DCCB]/25">
      {image && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-[var(--font-playfair)] text-sm font-bold text-[#0C1C15]">
          {initials}
        </span>
      )}
    </div>
  );
}

export default function ReaderReviews() {
  return (
    <section className="relative w-full overflow-hidden bg-[#081810] px-4 py-20 sm:px-6 md:px-8 md:py-24">
      {/* Ambient Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-[360px] w-[360px] rounded-full bg-[#B9DCCB]/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-[300px] w-[300px] rounded-full bg-[#C6A58A]/10 blur-[110px]"
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
              From The Community
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B9DCCB]/60" />
          </div>

          <h2 className="mt-5 font-[var(--font-playfair)] text-3xl font-bold leading-tight sm:text-4xl md:text-[42px]">
            <span className="bg-gradient-to-r from-[#F8F5EE] via-[#B9DCCB] to-[#C6A58A] bg-clip-text text-transparent">
              Reader Reviews
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#AAB9AD]">
            Real words from the readers who share this little library with you.
          </p>

          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-7 inline-flex items-center gap-4 rounded-full border border-[#B9DCCB]/20 bg-[#0C1C15]/80 px-6 py-3 shadow-lg"
          >
            <div className="flex flex-col items-center">
              <span className="font-[var(--font-playfair)] text-2xl font-bold leading-none text-[#F5F1E8]">
                4.9
              </span>
              <div className="mt-1.5">
                <Stars rating={5} />
              </div>
            </div>

            <span className="h-9 w-px bg-[#B9DCCB]/20" />

            <p className="text-left text-[11px] leading-5 text-[#AAB9AD]">
              <span className="font-semibold text-[#F5F1E8]">2,300+</span>{" "}
              readers rated their
              <br />
              BookNook experience
            </p>
          </motion.div>
        </motion.div>

        {/* Review Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map((review) => (
            <motion.figure
              key={review.name}
              variants={cardVariants}
              className="card group relative overflow-hidden border border-[#B9DCCB]/20 bg-gradient-to-b from-[#142B20] to-[#091710] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#B9DCCB]/60 hover:shadow-[0_18px_40px_-18px_rgba(185,220,203,0.45)]"
            >
              <div className="card-body relative gap-0 p-6">
                {/* Top Accent */}
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B9DCCB]/70 to-transparent" />

                {/* Quote Decoration */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-3 font-[var(--font-playfair)] text-[56px] leading-none text-[#B9DCCB]/10 transition-colors duration-300 group-hover:text-[#B9DCCB]/20"
                >
                  &rdquo;
                </span>

                <div className="relative flex items-center justify-between gap-2">
                  <Stars rating={review.rating} />

                  <span className="badge badge-sm border border-[#B9DCCB]/25 bg-[#B9DCCB]/10 text-[9px] font-semibold uppercase tracking-wide text-[#B9DCCB]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="h-2.5 w-2.5"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Verified
                  </span>
                </div>

                <blockquote className="relative mt-5 flex-1 text-xs leading-7 text-[#D8E4DA] sm:text-[13px]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                {/* Review Badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {review.badges.map((badge) => (
                    <span
                      key={badge}
                      className="badge badge-ghost border border-[#B9DCCB]/10 bg-white/5 px-3 py-3 text-[9px] tracking-wide text-[#91A397]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Reviewer */}
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <Avatar name={review.name} image={review.image} />

                  <div>
                    <p className="text-[13px] font-semibold text-[#F5F1E8]">
                      {review.name}
                    </p>

                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-[#91A397]">
                      {review.role}
                    </p>
                  </div>
                </figcaption>

                {/* Bottom Accent */}
                <div className="mt-5 h-[2px] w-10 rounded-full bg-[#B9DCCB]/40 transition-all duration-300 group-hover:w-full group-hover:bg-[#B9DCCB]/80" />
              </div>
            </motion.figure>
          ))}
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="stats stats-vertical mt-12 w-full overflow-hidden border border-[#B9DCCB]/20 bg-[#10251A]/80 shadow-xl sm:stats-horizontal"
        >
          {summary.map((stat, index) => (
            <motion.div
              key={stat.value}
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
                {stat.value}
              </div>

              <div className="stat-desc mt-2 text-[10px] uppercase tracking-[0.14em] text-[#AAB9AD]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
