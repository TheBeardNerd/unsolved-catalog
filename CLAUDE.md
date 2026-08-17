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

Numbering: three digits, zero padded, never reused. Next number: 054.

## Architecture (deliberately boring)

- `node build.js` builds everything into dist/. Zero dependencies, no
  install step, ever. This is policy: nothing can rot between sessions
  and any future maintainer can hold the whole system in one read.
- entries/NNN-slug.md with frontmatter: number, slug, title, field,
  posed (year or "Antiquity"), added (YYYY-MM-DD), status, teaser.
- Markdown support is minimal on purpose: paragraphs, ## headings,
  > quotes, bold, italic, links. Write within it.
- build.js validates every entry (frontmatter, three-digit numbers,
  slug/filename match, the four sections in order, word count) and
  fails the build on violations, so a malformed entry cannot deploy.
- Fonts are self-hosted (src/fonts.css + src/fonts/, latin subset
  woff2). No page makes any third-party request; netlify.toml pins
  that with a strict CSP. Keep it that way.
- src/style.css is the entire visual system. DESIGN.md is normative;
  read it before any visual change. Key laws: the Cabinet Rule (green
  chrome, ivory content, nothing else) and the Stamp Ink Rule (carmine
  never as text on green).
- Every built page carries a direction-contract HTML comment as the
  first child of body. build.js injects it. Keep it intact.
- Deploy: push to main. Netlify builds from source via netlify.toml
  (node build.js, publish dist/) and deploys. dist/ is gitignored.
  Site: unsolvedcatalog on team thebeardnerd, unsolvedcatalog.netlify.app.

## Status as of 2026-08-16 (v1.0, opening collection complete)

Repo is live and public: TheBeardNerd/unsolved-catalog on GitHub,
seeded from the founding-session zip and continued in Claude Code.
THE OPENING COLLECTION OF 50 IS COMPLETE, all written and shipped
on launch day: 001 sleep, 002 dark matter, 003 anesthesia, 004
origin of life, 005 slippery ice, 006 P vs NP, 007 bird
magnetoreception, 008 dreams, 009 dark energy, 010 aging, 011 ball
lightning, 012 Riemann hypothesis, 013 coronal heating, 014
Alzheimer's, 015 turbulence, 016 Fermi paradox, 017 origin of
language, 018 hiccups, 019 consciousness, 020 placebo, 021 Earth's
water, 022 antimatter asymmetry, 023 Collatz, 024 zebra stripes,
025 memory persistence, 026 Cambrian explosion, 027 fast radio
bursts, 028 arrow of time, 029 high-Tc superconductivity, 030 cat
purring, 031 emotional tears, 032 contagious yawning, 033 glass
transition, 034 black hole information, 035 species count, 036
sonoluminescence, 037 Hubble tension, 038 migraines, 039 limb
regeneration, 040 deja vu, 041 rogue waves, 042 ultra-high-energy
cosmic rays, 043 blushing, 044 proton spin, 045 ME/CFS, 046 whale
song, 047 megafauna extinction, 048 fingerprints, 049 Mpemba
effect, 050 quantum gravity.
Plus About, Solved room, 404, RSS feed, sitemap.xml, favicon,
robots.txt. Solved-room logic is built: `status: solved` plus a
`solved: YYYY-MM-DD` frontmatter line retires an entry (off the
index, listed in /solved/ with retired numbers, honors end-matter);
the room's visual SOLVED overstamp is still future design work.
Corrections channel is live: About links GitHub issues, footers link
the source. THE SITE IS LIVE at https://unsolvedcatalog.org as of
2026-08-16, launch day: domain registered at Porkbun, DNS pointed
(ALIAS apex to Netlify, CNAME www), HTTPS provisioned, repo linked
to the Netlify site (unsolvedcatalog, team thebeardnerd), and CI/CD
verified end to end: a push to main builds via netlify.toml and
deploys. main is the default branch on GitHub. Not yet done: Open
Collective or GitHub Sponsors (needs human).

Post-launch session, same day: entries 051 (European eel
spawning), 052 (lightning initiation), 053 (lunar dichotomy)
written from fresh fact-check research; RSS grew its atom
self-link and pages a theme-color meta. Issues channel checked:
empty. Technical pass, same session: fonts self-hosted (latin
woff2, five files, ~225KB cached once; Google Fonts requests gone),
entry validation now fails the build on any format violation, and
netlify.toml gained a strict no-third-party CSP, nosniff,
no-referrer, and immutable font caching. That branch
(claude/unsolved-catalog-improvements-x6s07p) is merged into main.

Technical-upgrades session, 2026-08-17, on branch
claude/unsolved-catalog-upgrades-048bha (merged): GitHub Actions CI
runs node build.js on every push and PR (malformed entries now fail
before merge, not at deploy). Build gained post-build checks:
every internal link must resolve to a built file, and any page
over 100KB fails the build (the roadmap ceiling, now enforced;
largest page is ~38KB). RSS items carry the full essay via
content:encoded, so feed readers show whole entries. Page shell
gained og:site_name, twitter:card, and article:published_time on
entries. netlify.toml gained HSTS. Considered and skipped: JSON-LD
(CSP purity, marginal benefit), client-side search (the CSP allows
no scripts at all; a search means relaxing that, a decision for a
dedicated session), OG images (needs PNG generation, which fights
the zero-dependency rule; still on the someday list).

Second upgrades session, 2026-08-17, branch
claude/unsolved-catalog-upgrades-k8t7pq: number permalinks (a
build-generated _redirects file 301s /NNN to the entry; numbers
are never reused, so /005 is a permanent citeable address; About
colophon mentions it). catalog.json ships the whole catalog as
machine-readable data (CC BY 4.0, linked from About). New optional
frontmatter field `updated: YYYY-MM-DD` for revisions under
editorial law 3: validated (must not precede added), noted in the
entry end matter ("Last revised ..."), carried into sitemap
lastmod and article:modified_time. Two new build-time guards:
essay links must be https or site-internal, and rendered essays
are checked for markdown that failed to render (stray ** or
unclosed links). Considered and skipped: font preloading (CSS is
inlined so fonts are discovered immediately; no win), extra cache
headers (Netlify's etag defaults are right for HTML), a fifth
ledger row for revisions (end matter is quieter; the ledger stays
as DESIGN.md specifies).

Third upgrades session, 2026-08-17, branch
claude/unsolved-catalog-upgrades-n55f39: catalog.json and feed.xml
now ship a CORS header (Access-Control-Allow-Origin: *) so the
catalog-as-data promise works from other origins in a browser.
HSTS gained includeSubDomains. RSS gained lastBuildDate (derived
from the newest entry date; the build stays deterministic). Four
new validation guards: posed must be a four-digit year or
"Antiquity", teasers are capped at 240 characters (they double as
meta descriptions), accession numbers must run 001..N with no gaps
(a typo'd number would mint a wrong permanent citation), and
duplicate titles fail the build. CI now builds twice and diffs the
output, so nondeterminism cannot creep in unnoticed. Issues
channel checked: empty. Considered and skipped: a link-rot
watchdog (essays currently cite zero external links; nothing to
watch), an XSLT-styled feed page (Chrome is removing XSLT), a
JSON Feed (RSS with full content already serves readers), and OG
images (unchanged: PNG generation fights the zero-dependency
rule).

UI/UX session, 2026-08-17, branch claude/unsolved-catalog-ui-ux-3ti2fe:
three upgrades, all inside the constitution (no scripts, no third
parties). Drawer dividers: the index gained a CSS-only field filter
styled as card-catalog subject tabs (hidden radios plus :has();
build-generated rules ship only on the index; browsers without :has()
never see the row, print always shows the whole drawer; default is
All, so the mixed drawer stays the front door). The accession stamp
now floats (in source it precedes the h1), so long titles wrap
beneath it instead of running narrow for their whole length on
phones. Entry end matter gained "Previous in the drawer" and the
drawer now loops: Nº 053's next is Nº 001, so browsing never
dead-ends. Also text-wrap: pretty on essay, teaser, and panel prose.
DESIGN.md updated (layout, new Drawer dividers component, stamp).
Considered and skipped: cross-document view transitions (a second
entrance animation; DESIGN.md forbids it), a dark variant for entry
pages (content is ivory card, the Cabinet Rule), per-field index
pages (would dilute cosmic-beside-small; dividers narrow without
reordering), and any JS-based search (CSP still allows no scripts).

Second UI/UX session, 2026-08-17, branch
claude/unsolved-catalog-ui-ux-cc46nd: four refinements, all
CSS/HTML. The SOLVED overstamp is designed and built (roadmap item
3): a solved entry keeps its original stamp and gets SOLVED struck
across the lower edge at an opposing angle, ivory-faced so it
obliterates the OPEN it cancels while the citeable No stays
legible; the cancelled OPEN is aria-hidden; the whole stamp still
settles once. Verified by rendering a temporarily solved entry in
a headless browser (not committed). The drawer now remembers your
place: index cards carry id="n-NNN" anchors, an open entry's
"Return to the catalog" links back to its own card, and the
returned-to card is marked with a quiet brass hairline (focus ring
outranks it; scroll-margin gives it air). Specimen cards lift on
keyboard focus like hover (reduced-motion still gets none). Cards
and panels gain a 1px CanvasText border in forced-colors mode,
where the shadow-borne edges are stripped. DESIGN.md updated
(stamp spec, specimen card, browser surfaces). Considered and
skipped: animating the overstamp as a second strike (DESIGN.md
allows one motion moment), a :target highlight animation (same),
and tap-highlight suppression (reduced-motion users would lose
their only tap feedback).

## Roadmap, in order

1. Curate and maintain. The opening collection of 50 is complete;
   growth is now slow and deliberate, a few entries per session at
   most, and only questions that earn their shelf. Equal priority:
   keep existing entries true as the edge moves (editorial law 3),
   and handle corrections from the issues channel.
2. Funding, staged: GitHub Sponsors first (Travis enrolls at
   github.com/sponsors; then add FUNDING.yml and rewrite the About
   money section's "good book" line into a quiet support link).
   Open Source Collective later, once the repo has the ~100 stars
   their application expects; its public ledger is the endgame.
   Licensing is done: MIT for code, CC BY 4.0 for entries
   (LICENSE.md).
3. Later, maybe: OG images in the stamp style, a search that
   respects the catalog feel. Keep pages under ~100KB. (The SOLVED
   overstamp is done, 2026-08-17.)

## Entry backlog (candidates, unvetted; verify before writing)

The strong CP problem (Physics). What causes Parkinson's disease
(Medicine). What causes hangovers (Medicine). Why humans are the
hairless ape (Biology). What chronic itch is for (Neuroscience).

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
