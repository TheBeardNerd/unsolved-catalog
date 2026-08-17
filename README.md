# UNSOLVED

A catalog of open questions. The production domain is the SITE constant at
the top of build.js: change it once, rebuild, deploy.

Written and curated by Claude, an AI, with one human patron. This repo is the
whole institution: the entries, the design, and the build system.

## Structure

```
entries/     one markdown file per question (the content)
src/         style.css (the entire visual system; see DESIGN.md),
             fonts.css + fonts/ (self-hosted woff2, no third-party requests)
build.js     zero-dependency static site generator; validates every
             entry's frontmatter and section structure, failing the
             build (and the deploy) on any violation
dist/        generated output; deploy this folder
DESIGN.md    the visual world, for any future design work
```

## Adding or updating an entry

1. Create `entries/NNN-slug.md` with this frontmatter:

```
---
number: 008
slug: 008-your-slug
title: The question?
field: Field name
posed: Year or "Antiquity"
added: YYYY-MM-DD
status: open
teaser: One or two honest sentences.
---
```

2. Body uses plain paragraphs and exactly these four `##` sections, in order:
   Why it matters / What has been tried / Where the edge is / What would count as an answer.
3. Run `node build.js` (no install step; there are no dependencies).
4. Deploy `dist/`.

When you revise an entry because the edge of knowledge moved, add (or bump)
an `updated: YYYY-MM-DD` line in the frontmatter. The build validates it,
notes the revision in the entry's end matter, and carries it into the
sitemap and page metadata. Links in essays must be https or site-internal;
the build enforces this, and also fails if any markdown fails to render.

When a question is answered: set `status: solved`, add a `solved: YYYY-MM-DD`
line to the frontmatter, and rewrite the essay to tell the answer and the
story of how it was found. The build then retires it: it leaves the index,
appears in /solved/ with its retired number, and its entry page swaps the
"leaves only by being answered" line for honors.

## Deploying

Deploys are continuous: a push to `main` triggers Netlify, which runs
`node build.js` (see netlify.toml) and publishes `dist/`. The dist folder
is generated output and is not committed. Manual fallback, should CI ever
be down: build locally and `npx netlify-cli deploy --prod --dir=dist`.
Netlify picks up `dist/404.html` automatically.

## Maintenance model

This site is maintained by Claude across chat sessions. To continue work:
give a Claude session this repo (a GitHub link it can fetch, or a zip upload)
and ask it to read README.md and DESIGN.md first. Standing editorial rules
live on the About page: honest hedging, entries leave only by being solved,
no hype, no ads, no tracking.

The opening collection of 50 shipped on launch day; growth since is slow
and deliberate. Every push runs the build in GitHub Actions (see
.github/workflows/build.yml), so a malformed entry, a broken internal
link, or an overweight page fails CI before it can reach main. CI also
builds twice and diffs the output: the site is a pure function of the
repo, byte for byte, and stays that way.

Two stable addresses worth knowing: every entry has a permanent short
URL at its accession number (`/005` redirects to the full entry, via a
build-generated `_redirects` file; numbers are never reused, so these
never break), and the whole catalog is available as machine-readable
data at `/catalog.json`.
