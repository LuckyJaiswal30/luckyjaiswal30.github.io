import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="p-10">
      <ThemeToggle />
    </main>
  );
}
