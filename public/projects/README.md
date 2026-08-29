Project screenshots go here, named after the project's slug.

    public/projects/resumefit.png

Then reference it from `src/lib/projects.ts`:

    image: "/projects/resumefit.png"

Omit `image` and the card uses generated cover art instead. A project with
`status: "In Progress"` always shows the "Coming soon" cover, so give it an
image only once it is finished.
