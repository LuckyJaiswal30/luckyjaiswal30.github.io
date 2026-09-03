import About from "@/components/About";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative overflow-x-clip bg-[color:var(--background)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div
          className="absolute left-[-8rem] top-[-6rem] h-80 w-80 rounded-full blur-[140px]"
          style={{ background: "var(--glow)" }}
        />
        <div
          className="absolute right-[-10rem] top-[20%] h-[28rem] w-[28rem] rounded-full blur-[180px]"
          style={{ background: "var(--glow-accent)" }}
        />
        <div
          className="absolute bottom-[-8rem] left-[18%] h-72 w-72 rounded-full blur-[150px]"
          style={{ background: "var(--glow)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, var(--glow-overlay), transparent 35%)",
          }}
        />
      </div>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <BlogPreview />
      <Contact />
      <Footer />
    </main>
  );
}
