# Lucky Jaiswal's Portfolio

Live at **[imlucky.dev](https://imlucky.dev)**.

My personal site. I'm a second-year Computer Science (AI) student at BBD University in Lucknow, learning full-stack development. This is where I put the things I've built and write about what I'm figuring out.

Built with Next.js, Tailwind CSS and Motion. The main sections live on one scrolling page, with separate routes for projects and blog posts.

## Features

- **Home** with hero, about, skills, featured projects, recent posts and contact, on one scrollable page. The nav tracks whichever section you're in.
- **Projects** (`/projects`) lists everything, with generated cover art, and gives each project its own page at `/projects/[slug]`.
- **Blog** (`/blog`) runs on MDX with search and tag filtering. Drop a `.mdx` file into `src/content/blog/` and it shows up. Nothing to register.
- **Dark / light mode** via `next-themes`, with no flash on load and the palette cross-fading rather than cutting.
- **Smooth scrolling** via Lenis, which switches off entirely when `prefers-reduced-motion` is set.
- **Accessibility**: WCAG AA colour contrast, visible focus states, a skip-to-content link, no skipped heading levels, and a mobile nav that locks scroll, traps focus and closes on Escape.
- **SEO**: dynamic OG images, sitemap, robots.txt and JSON-LD, all generated from the same content that renders the pages.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, React Compiler)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animation
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx) for the blog
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- TypeScript throughout

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # vitest
```

CI runs lint, typecheck, tests and a build on every push and pull request
(`.github/workflows/ci.yml`).

## Adding a blog post

Drop a new `.mdx` file into `src/content/blog/`. Each file needs a `metadata` export at the top:

```mdx
export const metadata = {
  title: "Post Title",
  description: "One sentence for the card and the SEO description.",
  date: "2026-08-23",
  tags: ["Learning", "Next.js"],
  featured: true, // optional, pins it to the top of the /blog index
  draft: true,    // optional, keeps it out of the build; visible in dev only
};

Your content starts here, in Markdown/MDX.
```

The filename becomes the slug. Nothing else needs updating. The homepage preview, the `/blog` index, the sitemap and the post's OG image all read `src/content/blog/` through `src/lib/blog.ts`.

Frontmatter is validated at build time. A missing field, a date that isn't a real calendar day, or an empty tag fails the build with the file and field named, rather than shipping a broken page.

## Adding a project

Add an entry to the `projects` array in `src/lib/projects.ts`. Setting `featured: true` puts it on the homepage. Every project gets a page at `/projects/[slug]` either way.

Screenshots go in `public/projects/`, named after the slug. Omit `image` and the card uses generated cover art instead. A project marked `status: "In Progress"` always shows the "Coming soon" cover, so only give it an image once it's finished.

## Environment variables

| Variable               | Purpose                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, canonical URLs, OG images, sitemap and robots.txt |

Resolution order: `NEXT_PUBLIC_SITE_URL`, then `https://imlucky.dev` on a Vercel
production build, then the deployment URL on previews, then
`http://localhost:3000`. Production deliberately never falls through to a
`*.vercel.app` URL, since that would compete with the real domain in search
results.

Set it explicitly in Vercel anyway, so the value is visible rather than implied.
For local work, copy `.env.example` to `.env.local`.

## Project structure

```
src/
  app/                 routes (App Router)
    blog/               /blog and /blog/[slug]
    projects/           /projects and /projects/[slug]
    *opengraph-image    per-route link preview cards
    sitemap.ts          generated from the same data the pages render
  components/
    blog/               blog-specific UI (rows, explorer, table of contents)
  content/blog/         .mdx posts, drop a file here to publish
  lib/
    active-section.ts   which nav item the scroll position belongs to
    blog.ts             post discovery and frontmatter validation
    blog-utils.ts       shared types and date formatting (client-safe)
    remark-post-data.ts heading anchors, table of contents, reading time
    json-ld.ts          escaping for structured-data script tags
    og-image.tsx        shared Open Graph card renderer
    page-copy.ts        index page headline copy, in one place
    projects.ts         project data
    site.ts             site-wide constants (name, description, URL)
    *.test.ts           vitest suites
  mdx-components.tsx    custom rendering for MDX (headings, code, tables, ...)
```

## How the blog is built

Posts are compiled by `@next/mdx` through Turbopack, so compilation is the
bundler's job: cached, incremental, and hot-reloading while you write.

A local remark plugin, `src/lib/remark-post-data.ts`, does one pass over each
post and stamps anchor ids onto the headings while collecting the table of
contents and the reading time. Doing both in the same pass is the point — the id
on a heading and the id its contents entry links to cannot drift apart, including
the numeric suffix on repeated headings. Reading time counts words from the parsed
tree and skips code blocks structurally, so fenced and indented code are both
excluded. The plugin attaches its results to the compiled module as `toc` and
`readingTime` exports, and `src/lib/blog.ts` reads them straight off the import.

Two details worth knowing if you touch this. Turbopack passes loader options
across to Rust, so remark plugins are named by module specifier rather than
passed as functions, and the specifier has to be an absolute path — see
`next.config.ts`. And the plugin itself is evaluated by Node outside the
bundler's alias and extension resolution, so it can only import *types* from
elsewhere in `src/lib`, never values.

## Deployment

Deployed on [Vercel](https://vercel.com) at [imlucky.dev](https://imlucky.dev); pushes to `main` deploy automatically. Set `NEXT_PUBLIC_SITE_URL` to `https://imlucky.dev` in the project's environment variables (Production, Preview and Development), then redeploy, because env var changes don't apply to existing deployments.

## Contact

- Email: [luckyjaiswal3405@gmail.com](mailto:luckyjaiswal3405@gmail.com)
- GitHub: [@LuckyJaiswal30](https://github.com/LuckyJaiswal30)
- LinkedIn: [luckyjaiswaldev](https://www.linkedin.com/in/luckyjaiswaldev/)
