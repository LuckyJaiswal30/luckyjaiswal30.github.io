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
  imageSquare?: string;
  imageAlt?: string;
  liveUrl?: string;
  githubUrl?: string;
  writeUp?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "akhra",
    title: "Akhra",
    description:
      "People in Jharkhand report local problems in Hindi, English or Hinglish. A district officer sends each one to the department that can fix it, or to a university team when it needs more than a repair, and the report only closes when the person who filed it says the fix is real.",
    longDescription: [
      "Akhra is our Smart India Hackathon prototype for problem statement 26043, set by the Government of Jharkhand. The brief asks for a platform that crowdsources societal problems and routes them to universities and industry. We cleared the college's internal round and submitted to the SIH portal. I did the development, design and architecture; five teammates handled research, testing, UI feedback and the presentation.",
      "The first thing I changed was the brief's own shape. Most of what people actually report is ordinary: a chapakal that stopped working, a blocked drain. Routing that to a research team is theatre. So an officer chooses one of two tracks. Routine problems go to the line department with a 21-day deadline. Problems bigger than one repair become university projects with proposals, milestones and field tests, with industry partners offering funding, mentoring or pilots. Either way the reporter follows one timeline, confirms the fix, and can reopen it within 30 days.",
      "A report can't be allowed to fail because an AI service is busy, so classification is a chain: Gemini, then Groq, then a TF-IDF model that runs on our own server. Duplicate detection had the same problem across languages. \"Chapakal kharab hai\" and \"handpump broken\" share no words, so a small lexicon folds Hindi, Devanagari and Hinglish spellings onto the same concepts before comparing, and the dashboard shows which tier actually answered.",
      "District officers see only their own district's reports. That's enforced by PostgreSQL row-level security as well as the application, so a leak needs two mistakes rather than one forgotten where-clause. We also had a rule: nothing that needs money or a registered company. SMS was removed entirely rather than stubbed, because Indian transactional SMS requires a DLT-registered legal entity, and a feature that can't be shown working shouldn't pretend to exist.",
    ],
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "Clerk",
      "Gemini",
      "next-intl",
    ],
    status: "Completed",
    highlight:
      "A broken chapakal goes to the water department with a 21-day deadline. A contaminated water source becomes a university project with industry behind it. Same report form, two very different journeys.",
    image: "/projects/akhra-cover.png",
    imageSquare: "/projects/akhra-cover-square.png",
    imageAlt:
      "Akhra, the meeting ground for all of Jharkhand: the report form in Hindi on a phone, the tracker for a soil testing report at stage 7 of 8, and the district map of where reports come from.",
    liveUrl: "https://akhra.imlucky.dev",
    githubUrl: "https://github.com/LuckyJaiswal30/Akhra",
    writeUp: "/blog/building-akhra",
    featured: true,
  },
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
    image: "/projects/resumefit-cover.png",
    imageSquare: "/projects/resumefit-cover-square.png",
    imageAlt:
      "ResumeFit, know what your resume proves: an overall fit of 69 out of 100, a React match backed by a quoted resume line, Next.js listed but never shown, and a skill the resume words differently from the posting.",
    liveUrl: "https://resume-fit-rosy.vercel.app",
    githubUrl: "https://github.com/LuckyJaiswal30/ResumeFit",
    featured: true,
  },
  {
    slug: "portfolio",
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
    image: "/projects/portfolio-cover.png",
    imageSquare: "/projects/portfolio-cover-square.png",
    imageAlt:
      "Portfolio, things I've built and what building them taught me: a blog post, the homepage in light mode and the blog index, stacked in layers.",
    githubUrl: "https://github.com/LuckyJaiswal30/luckyjaiswal30.github.io",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
