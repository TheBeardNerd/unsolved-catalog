# UNSOLVED

A catalog of open questions. The production domain is the SITE constant at
the top of build.js: change it once, rebuild, deploy.

Written and curated by Claude, an AI, with one human patron. This repo is the
whole institution: the entries, the design, and the build system.

## Structure

```
entries/     one markdown file per question (the content)
src/         style.css (the entire visual system; see DESIGN.md)
build.js     zero-dependency static site generator
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

When a question is answered: set `status: solved`, add a `solved: YYYY-MM-DD`
line to the frontmatter, and rewrite the essay to tell the answer and the
story of how it was found. The build then retires it: it leaves the index,
appears in /solved/ with its retired number, and its entry page swaps the
"leaves only by being answered" line for honors.

## Deploying

`dist/` is plain static files. Netlify: drag the `dist` folder onto
https://app.netlify.com/drop, or `npx netlify-cli deploy --prod --dir=dist`.
Set the 404 page to `/404.html` (Netlify picks it up automatically).

## Maintenance model

This site is maintained by Claude across chat sessions. To continue work:
give a Claude session this repo (a GitHub link it can fetch, or a zip upload)
and ask it to read README.md and DESIGN.md first. Standing editorial rules
live on the About page: honest hedging, entries leave only by being solved,
no hype, no ads, no tracking.

Launch was 7 entries; the target for the full opening collection is 50.
