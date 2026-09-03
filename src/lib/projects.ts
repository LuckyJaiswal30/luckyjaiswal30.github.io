export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: readonly string[];
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
      "Software screens most resumes before a person sees them, and most checkers only match keywords. This one won't credit a requirement unless it can quote the line that proves it.",
    longDescription: [
      "Applicant tracking software reads most resumes before a person does, and it is looking for particular words in a particular shape. The tools built to help with that inherited the same weakness: if a word appears anywhere, a skills list included, it counts as a match. A resume can score well on a requirement it never actually evidences.",
      "ResumeFit is built around one rule instead. A requirement only counts if the analysis can quote the sentence in your experience that demonstrates it, and every quote is checked back against your text before it is shown, so a line the model invented never reaches the page. On a live run the model claimed Next.js, Jest and Figma as covered while citing nothing but a skills list. The grounding check rejected all three and the score dropped accordingly.",
      "The rest follows from that rule. What is missing and what was listed but never demonstrated are reported separately, because the first needs experience and the second only needs a sentence. Suggested bullet rewrites that introduce a number the original never had are discarded before you see them. And when a model call fails, the page says the analysis fell back to comparing wording rather than passing that off as a considered read.",
      "It runs on a free tier, so results are cached by a hash of the inputs and each analysis reserves against a ceiling shared across everyone using the site. Running out degrades to keyword matching rather than failing the request.",
    ],
    year: "2026 — ongoing",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini", "Zod"],
    status: "Completed",
    highlight:
      "Every quote is checked against your resume before it is shown, so a claim the model invented never reaches the page. What is missing and what is unproven are reported separately.",
    liveUrl: "https://resume-fit-rosy.vercel.app",
    githubUrl: "https://github.com/LuckyJaiswal30/ResumeFit",
    featured: true,
  },
  {
    slug: "this-portfolio",
    title: "This Portfolio",
    description:
      "I built this to learn the Next.js App Router properly: routing, theming, animation, deployment. The blog runs on a remark plugin that stamps heading anchors and builds its table of contents in one pass.",
    longDescription: [
      "This is the second version. The first one worked, but enough of it was propped up by workarounds that rebuilding on Next 16 was easier than unpicking them. The blog was the clearest case: the old site compiled MDX at runtime because the bundler path crashed on it, and that entire layer turned out to be unnecessary once the compile moved to @next/mdx through Turbopack.",
      "Most of what I learned came from things that were quietly wrong rather than obviously broken. A single unlayered CSS rule, `a { color: inherit }`, was overriding every text colour utility on the site, because Tailwind puts its utilities in a layer and an unlayered rule beats a layered one whatever the specificity. The contact button was rendering near-black text on a black capsule at a contrast ratio of 1.18, where 4.5 is the minimum. Nothing errored. It just looked slightly off until it was measured.",
      "The blog runs on a remark plugin that stamps heading anchors, collects the table of contents and counts reading time in one pass over the parsed post, so an anchor and the contents entry pointing at it cannot drift apart. Frontmatter is validated at build time and the build fails naming the file and the field, which is how a date like 2026-02-31 gets caught: it parses happily and silently becomes 3 March.",
      "The parts that took longest were the ones nobody sees. Heading levels that skipped from h1 to h3 on the index pages, a mobile drawer that covered the screen while leaving keyboard focus behind it, links whose target was smaller than the minimum. CI runs lint, typecheck, the test suite and a build on every push, because a static site's build is the only thing that catches a broken MDX compile or a bad frontmatter value.",
    ],
    year: "2026",
    stack: ["Next.js", "Tailwind CSS", "Motion", "Lenis"],
    status: "Completed",
    highlight:
      "Every page is generated at build time, link previews included, drawn from the same content that renders the pages. Posts are validated as the site builds, so a broken one fails the build instead of shipping.",
    githubUrl: "https://github.com/LuckyJaiswal30/luckyjaiswal30.github.io",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
