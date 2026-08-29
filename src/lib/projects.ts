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
      "I got tired of applying for internships and hearing nothing back. You paste in your resume and a job posting, and it tells you how well they actually match, which words you're missing, and which bullet points aren't saying anything.",
    longDescription:
      "I started this after sending out a pile of internship applications and hearing nothing back. You never find out why, which is the part that gets to you. Then I read that most resumes get filtered by software before a person ever opens them, and that the software is mostly looking for specific words in a specific shape. So the idea is simple: paste in your resume and the job description, get back a match score, the words the posting keeps using that your resume never says, and rewrites for the bullet points that describe duties instead of results. Getting a model to produce suggestions took an evening, and that was never the hard part. The hard part, which I'm still on, is making the score mean the same thing twice. Ask it the same question and you get a different number back, and a score you can't trust is worse than no score. The other thing I keep coming back to is stopping it from making things up. It will happily write you a bullet about leading a team you were never on, and a resume tool that quietly lies for you is worse than nothing.",
    year: "2026 — ongoing",

    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    status: "In Progress",

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

export const featuredProjects = projects.filter((project) => project.featured);
