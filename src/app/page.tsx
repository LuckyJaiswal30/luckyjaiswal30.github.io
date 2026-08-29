const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen scroll-mt-24 items-center justify-center px-6"
        >
          <h2 className="text-4xl font-semibold">{section.label}</h2>
        </section>
      ))}
    </main>
  );
}
