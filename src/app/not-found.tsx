import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const destinations = [
  { href: "/", label: "Home", hint: "Start from the top" },
  { href: "/blog", label: "Blog", hint: "Notes on what I'm learning" },
  { href: "/projects", label: "Projects", hint: "What I've built so far" },
];

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-screen flex-col bg-[color:var(--background)]"
    >
      <section className="flex flex-1 items-center px-6 pb-24 pt-36 sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--muted-soft)]">
            Error 404
          </p>

          <h1 className="mt-6 text-[2rem] font-semibold leading-[1.06] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-[3.25rem]">
            This page doesn&apos;t exist.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
            Either the link is wrong or I moved something and forgot to leave a
            redirect. Here&apos;s the way back.
          </p>

          <ul className="mt-12 border-t border-[color:var(--border)]">
            {destinations.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline justify-between gap-6 border-b py-5 transition-colors duration-300 border-[color:var(--border)]"
                >
                  <span className="text-lg font-semibold tracking-[-0.02em] text-[color:var(--foreground)] transition-opacity duration-300 group-hover:opacity-70">
                    {item.label}
                  </span>
                  <span className="text-right text-sm text-[color:var(--muted)]">
                    {item.hint}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
