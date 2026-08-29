import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--foreground)]"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-[color:var(--foreground)] border-[color:var(--border)]"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
          strokeWidth={2}
        />
      </span>
      {label}
    </Link>
  );
}
