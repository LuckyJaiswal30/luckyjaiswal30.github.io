export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  year: string;
  stack: string[];
  status: "Completed" | "In Progress";
  highlight?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "resumefit",
    title: "ResumeFit",
    description:
      "I got tired of applying and hearing nothing back. Most checkers match keywords, so listing \"Kubernetes\" means you match Kubernetes. Mine won't count a requirement unless it can quote the line in your resume that proves it.",
    longDescription:
      "I started this after sending out a pile of applications and hearing nothing back, because you never find out why. The first version matched keywords like everything else does, and it was useless: it told me I matched Kubernetes because the word sat in a skills list. So I rewrote it around one rule, that a requirement only counts if the analysis can quote the sentence in your experience that demonstrates it. Everything else followed from that. Missing and unproven are shown separately, because a requirement you never mentioned needs experience you might not have, while one you listed but never demonstrated just needs a sentence. Bullet rewrites that introduce a number your original never had get thrown out before you see them, since a tool that quietly invents a percentage for you is worse than no tool. And when the model call fails, the page says so instead of passing a keyword match off as a considered read. Most of my time now goes on staying inside a free tier: results are cached by hash, there is a ceiling shared across everyone, and running out falls back to keyword matching rather than erroring.",
    year: "2026 — ongoing",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini", "Zod"],
    status: "Completed",
    highlight:
      "On one run the model claimed Next.js, Jest and Figma as covered, citing nothing but a skills list. All three were rejected and the score dropped.",
    liveUrl: "https://resume-fit-rosy.vercel.app",
    githubUrl: "https://github.com/LuckyJaiswal30/ResumeFit",
    featured: true,
  },
  {
    slug: "this-portfolio",
    title: "This Portfolio",
    description:
      "I built this to learn the Next.js App Router properly. Routing, theming, animation, accessibility, deployment. Most of it was new to me.",
    longDescription:
      "Most of this site started out as a template and got rewritten, some parts more than once. I ran Lighthouse on it early and failed the color contrast checks, so I went back and worked out the muted text colors by hand until they passed WCAG AA. Then I added the things I'd read about but never actually done: dynamic OG images, a sitemap, structured data, all through Next's file conventions. Keyboard accessibility took longer than I expected. Focus states, a skip link, a mobile menu that locks the scroll and closes on Escape. Getting the MDX blog working was its own mess and took a couple of days on its own. I still change something here most weeks.",
    year: "2026",
    stack: ["Next.js", "Tailwind CSS", "Motion", "Lenis"],
    status: "Completed",
    githubUrl: "https://github.com/LuckyJaiswal30/luckyjaiswal30.github.io",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
