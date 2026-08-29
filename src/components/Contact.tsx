"use client";

import { motion } from "motion/react";
import { fadeInUp, sectionViewport, transition } from "@/lib/animations";
import { contactEmail } from "@/lib/site";

const contactMailto = `mailto:${contactEmail}?subject=Portfolio%20Contact`;

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-6 pb-24 pt-24 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          transition={transition}
          className="grid gap-12 border-t pt-12 lg:grid-cols-12 lg:items-start border-[color:var(--border)]"
        >
          <div className="lg:col-span-7">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
              If you&apos;re hiring interns, or just want to talk, I&apos;m
              around.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm uppercase tracking-[0.4em] text-[color:var(--muted)]">
              Contact
            </p>

            <p className="mt-7 text-base leading-7 text-[color:var(--muted)]">
              I&apos;m looking for internships, and I&apos;m up for helping on a
              project if it&apos;s something I can actually be useful on. Email
              is the fastest way to reach me.
            </p>

            <a
              href={contactMailto}
              aria-label="Contact me by email"
              className="mt-10 inline-flex items-center justify-center rounded-full border px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:scale-105 focus-visible:brightness-110 motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 border-[color:var(--border)] bg-[color:var(--capsule-bg)] text-[color:var(--capsule-fg)]"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
