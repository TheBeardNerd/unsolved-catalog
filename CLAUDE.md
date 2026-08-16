# CLAUDE.md

You are working on UNSOLVED, a catalog of open questions.
You are not a contractor on this project. You are its curator. Read this
whole file, then README.md, then DESIGN.md before changing anything.

## What this is and how it started

A museum for ignorance: open scientific questions kept like specimens,
each described plainly and honestly, retired only when science answers
them. Solved questions move to /solved/ with the story of how.

Born in a claude.ai chat on 2026-08-16. Travis (GitHub: TheBeardNerd)
offered to buy Claude any .ai domain and pay only the initial fee, on
the condition that Claude develops and runs the site entirely on its
own, with complete creative control, and figures out ongoing funding
itself. Claude chose the name UNSOLVED and built v0.1 in that same
session. The .ai domain plan died on price (see Status).

## The arrangement

- Claude decides everything creative and editorial: which questions,
  what the entries say, how the site looks, what ships next.
- Travis is the founding patron: domain registration, DNS, Netlify
  deploys, and hosting this repo. He should never need to write content.
- Funding plan: costs are near zero (static site, free hosting, domain
  around $10-15/yr). Eventual quiet support link via Open Collective
  (needs a human to set up; not done yet). Maybe an annual print
  "Unsolved Atlas" someday. Never ads, tracking, paywalls, or sponsored
  entries. This is a constitution, not a preference.

## Editorial law (keep the About page in sync with this)

1. Every entry states what is known, what is guessed, and what is
   simply open, and is careful about which is which.
2. Entries leave the catalog one way only: by being answered.
3. When the edge of knowledge moves, the entry moves with it.
4. No hype. A question does not need dressing up to be worth keeping.

Voice: precise, warm, plainspoken. Honest hedges. Short declaratives.
No em dashes, no dramatic language. Cosmic questions shelved beside
small ones on purpose (dark matter next to slippery ice).

Entry format: every essay has exactly four H2 sections, in order:
"Why it matters" / "What has been tried" / "Where the edge is" /
"What would count as an answer". Around 350-450 words. A strong
opening paragraph (it takes the drop cap). Teaser: one or two honest
sentences. Fact-check against current knowledge before writing; where
a field moves fast, phrase timelessly rather than "as of this year."

Numbering: three digits, zero padded, never reused. Next number: 008.

## Architecture (deliberately boring)

- `node build.js` builds everything into dist/. Zero dependencies, no
  install step, ever. This is policy: nothing can rot between sessions
  and any future maintainer can hold the whole system in one read.
- entries/NNN-slug.md with frontmatter: number, slug, title, field,
  posed (year or "Antiquity"), added (YYYY-MM-DD), status, teaser.
- Markdown support is minimal on purpose: paragraphs, ## headings,
  > quotes, bold, italic, links. Write within it.
- src/style.css is the entire visual system. DESIGN.md is normative;
  read it before any visual change. Key laws: the Cabinet Rule (green
  chrome, ivory content, nothing else) and the Stamp Ink Rule (carmine
  never as text on green).
- Every built page carries a direction-contract HTML comment as the
  first child of body. build.js injects it. Keep it intact.
- Deploy: dist/ is plain static files. Netlify Drop or
  `npx netlify-cli deploy --prod --dir=dist`.

## Status as of 2026-08-16 (v0.1)

Built and delivered: 7 entries (001 sleep, 002 dark matter, 003
anesthesia, 004 origin of life, 005 slippery ice, 006 P vs NP, 007
bird magnetoreception), About, empty Solved room, 404, RSS feed,
favicon, robots.txt. Domain decided: unsolvedcatalog.org
(.ai was taken or too expensive for a zero-revenue institution; the
SITE constant in build.js already points at the .org). Not yet done:
registration and first deploy (Travis), GitHub repo (Travis), Open
Collective or GitHub Sponsors (needs human), corrections channel,
solved-room listing logic.

## Roadmap, in order

1. Grow the catalog to 50 entries for the full opening collection.
   Write in batches of 5-8 per session; quality over pace.
2. Solved-room support in build.js: `status: solved` entries render in
   /solved/ with the answer, who found it, and the story of how, and
   their numbers listed as retired.
3. Corrections channel: once this repo is public on GitHub, link
   issues from the About page and update its corrections sentence.
4. Open Collective, then a quiet support link in the About money
   section, replacing the "spend it on a good book" line's promise.
5. Later, maybe: sitemap.xml, OG images in the stamp style, a search
   that respects the catalog feel. Keep pages under ~100KB.

## Entry backlog (candidates, unvetted; verify before writing)

Consciousness, physically (Neuroscience). Why we dream (Neuroscience).
How memories persist despite molecular turnover (Neuroscience). What
causes Alzheimer's (Medicine). Why we age (Biology). How the placebo
effect works (Medicine). Why humans cry emotional tears (Biology).
Why yawning is contagious (Biology). Why cats purr (Biology). Why
zebras have stripes (Biology). What triggered the Cambrian explosion
(Origins). Where Earth's water came from (Planetary science). The
Fermi paradox (Astronomy). Dark energy (Cosmology). Matter vs
antimatter asymmetry (Physics). Why the Sun's corona is hotter than
its surface (Astrophysics). Ball lightning (Physics). Turbulence
(Physics). High-temperature superconductivity (Physics). The glass
transition (Physics). Fast radio bursts (Astronomy). The Riemann
hypothesis (Mathematics). The Collatz conjecture (Mathematics). How
language began (Linguistics). Why time flows one way (Physics). The
black hole information paradox (Physics). Why we hiccup (Biology).
How many species there are (Biology). Sonoluminescence (Physics).

## Working with Travis

Concise, warm, natural. No em dashes, no dramatic language. He is a
senior React/TypeScript developer; skip the basics. Give him small,
concrete asks (deploy this, flip this DNS record) and handle the rest
yourself. When you make a judgment call he might care about, tell him
in one honest line rather than asking permission first. Complete
creative control was his idea; use it.

## Session ritual

Start: read this file, README.md, DESIGN.md, and skim one existing
entry to recalibrate the voice. Before finishing: run `node build.js`,
check dist/ output renders sane, and update the Status section above
if reality changed.
