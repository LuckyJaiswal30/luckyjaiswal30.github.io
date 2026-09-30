// Stand-in for a project that has no cover image yet: the site's dot grid on a
// neutral surface, so an unfinished entry still sits quietly among the others.
export default function ProjectCover() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[color:var(--surface)] bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:22px_22px]"
    />
  );
}
