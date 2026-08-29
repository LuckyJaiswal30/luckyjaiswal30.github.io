export type Project = {
  /** URL segment. Lowercase, hyphenated, and never changed once shared. */
  slug: string;

  title: string;

  /** One line. Used on cards, meta descriptions and the OG image. */
  description: string;

  /** The case study shown on the project page. Falls back to `description`. */
  longDescription?: string;

  /** When you built it, e.g. "2026" or "2026 — ongoing". Shown on the card. */
  year: string;

  /** Tech chips, in the order you want them read. */
  stack: string[];

  /** Drives the card treatment: completed cards get generated cover art,
   *  in-progress ones get a dashed border and a "Coming soon" cover. */
  status: "Completed" | "In Progress";

  /** One concrete outcome. A number is worth more than an adjective here. */
  highlight?: string;

  /** Screenshot at public/projects/<slug>.png. Omit for generated cover art. */
  image?: string;

  /** Deployed URL, if there is one. */
  liveUrl?: string;

  githubUrl?: string;

  /** Surfaces it in the homepage Projects section. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "resumefit",
    title: "ResumeFit",
    description:
      "An AI résumé and ATS optimiser. Give it your résumé and a job description, and it scores how well you match, flags the keywords you're missing, and rewrites the bullet points that aren't pulling their weight.",
    longDescription:
      "Applying for something and hearing nothing back tells you almost nothing about why. Most résumés are read by an applicant tracking system before a person ever sees them, and the reasons one gets filtered out are mechanical and mostly invisible: missing terms the posting used, bullets that describe duties instead of results, formatting the parser cannot read. ResumeFit takes a résumé and a job description together and reports on that gap — an overall match score, the keywords the posting expects that the résumé never says, an ATS-compatibility score for how cleanly it parses, and suggested rewrites for the weakest bullet points. The hard part has not been getting a model to produce suggestions; it has been making the scores mean something consistent rather than a different number each time you ask, and keeping the rewrites honest, so it strengthens claims the résumé is actually making instead of inventing experience nobody has.",
    year: "2026 — ongoing",
    // TODO: confirm the stack once ResumeFit settles; this is a placeholder.
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    status: "In Progress",
    // TODO: swap for the ResumeFit repository once it is public. This is the
    // profile URL standing in, so the card is not linkless in the meantime.
    githubUrl: "https://github.com/LuckyJaiswal30",
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
    githubUrl: "https://github.com/LuckyJaiswal30/lucky-jaiswal",
    featured: true,
  },
];

/** Projects shown on the homepage, in config order. */
export const featuredProjects = projects.filter((project) => project.featured);
