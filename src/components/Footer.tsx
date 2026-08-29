import { Mail } from "lucide-react";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/BrandIcons";
import { contactEmail, socialUrls } from "@/lib/site";

const socialLinks = [
  { label: "GitHub", href: socialUrls.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: socialUrls.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", href: socialUrls.instagram, Icon: InstagramIcon },
  {
    label: "Email",
    href: `mailto:${contactEmail}?subject=Portfolio%20Contact`,
    Icon: Mail,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 pb-14 pt-10 sm:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 border-t pt-10 sm:flex-row sm:items-center sm:justify-between border-[color:var(--border)]">
        <p className="text-sm tracking-[0.08em] text-[color:var(--muted-soft)]">
          © {year} Lucky Jaiswal. All rights reserved.
        </p>

        <ul className="flex items-center gap-4 sm:gap-5">
          {socialLinks.map(({ label, href, Icon }) => {
            const external = href.startsWith("http");

            return (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative inline-flex h-11 w-11 items-center justify-center text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--foreground)] focus-visible:text-[color:var(--foreground)] sm:h-12 sm:w-12"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none text-[color:var(--foreground)] border-[color:var(--border)] bg-[color:var(--surface-strong)]"
                  >
                    {label}
                  </span>

                  <Icon
                    aria-hidden="true"
                    className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-px group-hover:scale-105 group-focus-visible:-translate-y-px group-focus-visible:scale-105 motion-reduce:transform-none"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
