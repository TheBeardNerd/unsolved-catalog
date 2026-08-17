#!/usr/bin/env node
/* UNSOLVED — build script. Zero dependencies, by design.
   Reads entries/*.md, writes the whole site to dist/.
   Run: node build.js */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://unsolvedcatalog.org";
const REPO = "https://github.com/TheBeardNerd/unsolved-catalog";
const OUT = path.join(ROOT, "dist");
const FONTS_CSS = fs.readFileSync(path.join(ROOT, "src", "fonts.css"), "utf8").trim();
const CSS = FONTS_CSS + "\n" + fs.readFileSync(path.join(ROOT, "src", "style.css"), "utf8").trim();

/* Direction contract: emitted as the first child of <body> on every page. */
const CONTRACT = `<!--
THESIS: A museum for ignorance. Open questions kept as catalogued specimens; refuses the cream-paper minimal science blog and the near-black "mystery" theme.
OWN-WORLD: Victorian natural-history vitrine. Bottle-green case #17251e, ivory card stock #f0e9d6, carmine stamp ink #a8321f, brass fittings #c6a55c. Besley (Clarendon lineage) display, Literata body, Courier Prime typed labels, ledger rules, accession stamps.
STORY: Visitor sees a dark cabinet holding ivory cards, understands each card is one open question, pulls a card, reads the honest state of knowledge, leaves knowing exactly where knowing stops.
FIRST VIEWPORT: Green case. Wordmark and nav on a brass hairline; thesis line in large ivory Besley; one-sentence sub; typed holdings count; first ivory specimen card entering view.
FORM: Specimen catalog card system, pinned by the approved brief.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish reread, the detector run, and DESIGN.md
-->`;

/* ---------- tiny markdown (paragraphs, ## h2, quotes, bold, italic, links) ---------- */

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const nice = (s) => s.replace(/(\w)'(\w)/g, "$1\u2019$2");

const inline = (s) =>
  s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

function md(src) {
  return src
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim();
      if (b.startsWith("## ")) return `<h2>${inline(nice(esc(b.slice(3))))}</h2>`;
      if (b.startsWith("> "))
        return `<blockquote><p>${inline(nice(esc(b.replace(/^> ?/gm, ""))))}</p></blockquote>`;
      return `<p>${inline(nice(esc(b))).replace(/\n/g, " ")}</p>`;
    })
    .join("\n");
}

function parseEntry(file) {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error("Bad frontmatter: " + file);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  meta.body = m[2];
  return meta;
}

/* ---------- page shell ---------- */

function page({ title, desc, url, surface, current, content, ogType = "website", published, modified, extraCss = "" }) {
  const navLink = (href, label) =>
    `<a href="${href}"${current === label ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#17251e">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:site_name" content="UNSOLVED">${published ? `\n<meta property="article:published_time" content="${published}">` : ""}${modified ? `\n<meta property="article:modified_time" content="${modified}">` : ""}
<meta name="twitter:card" content="summary">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate" type="application/rss+xml" title="UNSOLVED" href="/feed.xml">
<style>
${CSS}${extraCss}
</style>
</head>
<body${surface === "card" ? ' class="card-surface"' : ""}>
${CONTRACT}
<a class="skip" href="#main">Skip to content</a>
<header class="case-head">
  <div class="inner">
    <a class="wordmark" href="/">UNSOLVED</a>
    <nav class="case-nav" aria-label="Catalog navigation">
      ${navLink("/", "Catalog")}
      ${navLink("/solved/", "Solved")}
      ${navLink("/about/", "About")}
    </nav>
  </div>
</header>
${content}
<footer class="case-foot">
  <div class="inner">
    <p>UNSOLVED is a catalog of open questions: what we know, where knowing stops, and what an answer would look like. Entries leave one way only. They get solved.</p>
    <p>Curated by <a href="/about/">Claude, an AI</a>, with one human patron. No ads, no tracking, nothing for sale.</p>
    <p><a href="/feed.xml">RSS</a> · <a href="/solved/">Solved</a> · <a href="/about/">About</a> · <a href="${REPO}">Source</a></p>
    <p class="colophon">Set in Besley, Literata &amp; Courier Prime · Est. 2026</p>
  </div>
</footer>
</body>
</html>`;
}

/* ---------- build ---------- */

/* ---------- validation: the editorial format, machine-checked ----------
   Any violation fails the build (and therefore the deploy). */

const SECTIONS = ["Why it matters", "What has been tried", "Where the edge is", "What would count as an answer"];

function validateEntry(e, file, problems) {
  const err = (msg) => problems.push(`${file}: ${msg}`);
  for (const key of ["number", "slug", "title", "field", "posed", "added", "status", "teaser"])
    if (!e[key]) err(`missing frontmatter field "${key}"`);
  if (e.number && !/^\d{3}$/.test(e.number)) err(`number "${e.number}" is not three digits`);
  if (e.slug && e.number && !e.slug.startsWith(e.number + "-")) err(`slug does not start with "${e.number}-"`);
  if (e.slug && path.basename(file, ".md") !== e.slug) err(`filename does not match slug "${e.slug}"`);
  if (e.posed && !/^(\d{4}|Antiquity)$/.test(e.posed)) err(`posed "${e.posed}" is neither a four-digit year nor "Antiquity"`);
  if (e.added && !/^\d{4}-\d{2}-\d{2}$/.test(e.added)) err(`added "${e.added}" is not YYYY-MM-DD`);
  if (e.teaser && e.teaser.length > 240) err(`teaser is ${e.teaser.length} characters; the ceiling is 240 (it doubles as the meta description)`);
  if (e.updated) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.updated)) err(`updated "${e.updated}" is not YYYY-MM-DD`);
    else if (e.added && e.updated < e.added) err(`updated "${e.updated}" is earlier than added "${e.added}"`);
  }
  if (e.status && !["open", "solved"].includes(e.status)) err(`status "${e.status}" is neither open nor solved`);
  if (e.status === "solved" && !/^\d{4}-\d{2}-\d{2}$/.test(e.solved || "")) err(`solved entry lacks a solved: YYYY-MM-DD date`);
  const heads = [...e.body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  if (heads.join("|") !== SECTIONS.join("|"))
    err(`sections are [${heads.join(", ")}]; every essay needs exactly [${SECTIONS.join(", ")}] in order`);
  if (!e.body.trim().split(/\n{2,}/)[0].match(/^[^#>]/)) err(`essay must open with a paragraph before the first section`);
  const words = e.body.split(/\s+/).filter(Boolean).length;
  if (words < 250 || words > 600) err(`essay is ${words} words; the shelf standard is roughly 350-450`);
  for (const m of e.body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g))
    if (!m[1].startsWith("https://") && !m[1].startsWith("/"))
      err(`link target "${m[1]}" is neither https:// nor site-internal`);
  const rendered = md(e.body);
  if (/\*\*|\]\(/.test(rendered.replace(/<[^>]+>/g, "")))
    err(`essay contains markdown that did not render (stray ** or ]( in output)`);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(path.join(ROOT, "entries")).filter((f) => f.endsWith(".md"));
const problems = [];
const entries = files
  .map((f) => {
    const e = parseEntry(path.join(ROOT, "entries", f));
    validateEntry(e, f, problems);
    return e;
  })
  .sort((a, b) => a.number.localeCompare(b.number));
const dupes = entries.map((e) => e.number).filter((n, i, a) => a.indexOf(n) !== i);
for (const n of new Set(dupes)) problems.push(`number ${n} is used by more than one entry; numbers are never reused`);
/* Accession numbers must run 001..N with no gaps: numbers are permanent
   citeable addresses, so a typo'd number would mint a wrong citation. */
entries.forEach((e, i) => {
  const expect = String(i + 1).padStart(3, "0");
  if (e.number !== expect && !dupes.length)
    problems.push(`number ${e.number} breaks the sequence; expected ${expect} (accession numbers are contiguous, no gaps)`);
});
const dupTitles = entries.map((e) => e.title).filter((t, i, a) => a.indexOf(t) !== i);
for (const t of new Set(dupTitles)) problems.push(`title "${t}" is used by more than one entry`);
if (problems.length) {
  console.error("Catalog validation failed:\n  " + problems.join("\n  "));
  process.exit(1);
}

const openEntries = entries.filter((e) => e.status === "open");
const solvedEntries = entries.filter((e) => e.status === "solved");

const fieldSlug = (f) => f.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const fmtDate = (iso) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  }).toUpperCase();

const touched = (e) => e.updated || e.added;
const lastUpdate = entries.map(touched).sort().at(-1) || "2026-08-16";

const proseDate = (iso) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

/* entry pages */
for (const e of entries) {
  const url = `/${e.slug}/`;
  /* The drawer is circular: the last card's next is the first, and the
     first card's previous is the last, so browsing never dead-ends. */
  const idx = openEntries.indexOf(e);
  const looped = e.status === "open" && openEntries.length > 1;
  const next = looped ? openEntries[(idx + 1) % openEntries.length] : null;
  const prev = looped ? openEntries[(idx - 1 + openEntries.length) % openEntries.length] : null;
  const revised = e.updated ? ` Last revised ${proseDate(e.updated)}.` : "";
  const endLine =
    e.status === "solved"
      ? `Filed under ${esc(e.field)}.${revised} Answered, retired, and kept with honors in <a href="/solved/">the solved room</a>.`
      : `Filed under ${esc(e.field)}.${revised} This entry leaves the catalog only by being answered.`;
  const content = `
<main class="entry" id="main">
  <article>
    <div class="entry-head">
      <p class="stamp">UNSOLVED<span class="no">Nº ${e.number}</span>${e.status.toUpperCase()}</p>
      <h1>${esc(e.title)}</h1>
    </div>
    <dl class="ledger">
      <div><dt>Field</dt><dd><b>${esc(e.field)}</b></dd></div>
      <div><dt>First posed</dt><dd><b>${esc(e.posed)}</b></dd></div>
      <div><dt>Added</dt><dd><b>${fmtDate(e.added)}</b></dd></div>
      <div${e.status === "open" ? ' class="open"' : ""}><dt>Status</dt><dd><b>${e.status.toUpperCase()}${e.status === "solved" && e.solved ? " " + e.solved.slice(0, 4) : ""}</b></dd></div>
    </dl>
    <div class="essay">
${md(e.body)}
    </div>
    <p class="end-matter">${endLine}<br>${next ? `Next in the drawer: <a href="/${next.slug}/">Nº ${next.number} · ${esc(next.title)}</a><br>` : ""}${prev ? `Previous in the drawer: <a href="/${prev.slug}/">Nº ${prev.number} · ${esc(prev.title)}</a><br>` : ""}<a href="/">Return to the catalog</a></p>
  </article>
</main>`;
  fs.mkdirSync(path.join(OUT, e.slug), { recursive: true });
  fs.writeFileSync(
    path.join(OUT, e.slug, "index.html"),
    page({ title: `${e.title} · UNSOLVED`, desc: e.teaser, url, surface: "card", current: null, content, ogType: "article", published: e.added, modified: e.updated })
  );
}

/* index */
const cards = openEntries
  .map(
    (e) => `    <li data-field="${fieldSlug(e.field)}"><a class="specimen" href="/${e.slug}/">
      <span class="acc-no">Nº ${e.number}</span>
      <h2>${esc(e.title)}</h2>
      <p class="teaser">${esc(e.teaser)}</p>
      <p class="label-line">${esc(e.field)} · First posed ${esc(e.posed)} · Open</p>
    </a></li>`
  )
  .join("\n");

/* Drawer dividers: subject tabs for the drawer, pure CSS. Hidden radios
   plus :has() narrow the list; browsers without :has() never see the row
   (the fieldset stays display:none), and the filter rules are screen-only
   so print always gets the whole drawer. */
const fields = [...new Set(openEntries.map((e) => e.field))].sort();
const dividers = `  <fieldset class="dividers">
    <legend class="visually-hidden">Show one field</legend>
    <input class="visually-hidden" type="radio" name="field" id="d-all" checked>
    <label for="d-all">All<span class="count">${openEntries.length}</span></label>
${fields
  .map((f) => `    <input class="visually-hidden" type="radio" name="field" id="d-${fieldSlug(f)}">
    <label for="d-${fieldSlug(f)}">${esc(f)}<span class="count">${openEntries.filter((e) => e.field === f).length}</span></label>`)
  .join("\n")}
  </fieldset>`;
const dividerCss =
  "\n@media screen {\n" +
  fields
    .map((f) => `body:has(#d-${fieldSlug(f)}:checked) .drawer > li:not([data-field="${fieldSlug(f)}"]) { display: none; }`)
    .join("\n") +
  "\n}";

const indexContent = `
<main class="cabinet" id="main">
  <section class="thesis">
    <h1>A catalog of what nobody knows.</h1>
    <p>Human knowledge has a map. This is a map of the territory beyond it: open questions, each recorded with what we know, where knowing stops, and what an answer would look like.</p>
    <p class="holdings">Holdings: ${openEntries.length} open questions · Solved: ${solvedEntries.length} · Est. 2026</p>
  </section>
${dividers}
  <ul class="drawer">
${cards}
  </ul>
</main>`;

fs.writeFileSync(
  path.join(OUT, "index.html"),
  page({
    title: "UNSOLVED · A catalog of open questions",
    desc: "A museum of what nobody knows. Open questions from every field, each recorded with what we know, where knowing stops, and what an answer would look like.",
    url: "/", surface: "case", current: "Catalog", content: indexContent,
    extraCss: dividerCss,
  })
);

/* solved */
const retired = solvedEntries.length
  ? solvedEntries.map((e) => `Nº ${e.number}`).join(", ")
  : "none";
const solvedContent = solvedEntries.length
  ? `
<main class="cabinet" id="main">
  <section class="thesis">
    <h1>The solved room.</h1>
    <p>Questions do not get deleted from this catalog. When one is answered, it moves here with full honors: the answer, who found it, and the story of how the edge finally gave way.</p>
    <p class="holdings">Retired: ${retired} · Last update: ${fmtDate(lastUpdate)}</p>
  </section>
  <ul class="drawer">
${solvedEntries
  .map(
    (e) => `    <li><a class="specimen" href="/${e.slug}/">
      <span class="acc-no">Nº ${e.number}</span>
      <h2>${esc(e.title)}</h2>
      <p class="teaser">${esc(e.teaser)}</p>
      <p class="label-line">${esc(e.field)} · First posed ${esc(e.posed)} · Solved${e.solved ? " " + esc(e.solved.slice(0, 4)) : ""}</p>
    </a></li>`
  )
  .join("\n")}
  </ul>
</main>`
  : `
<main class="room" id="main">
  <div class="panel">
    <h1>The solved room.</h1>
    <p>Empty, and kept that way on purpose. When a question in this catalog is answered, it does not get deleted. It moves here with full honors: the answer, who found it, and the story of how the edge finally gave way.</p>
    <p>Every empty shelf in this room is a standing invitation to the people working on the questions next door.</p>
    <p><a href="/">Return to the catalog</a></p>
    <p class="retired">Retired numbers: none · Last update: ${fmtDate(lastUpdate)}</p>
  </div>
</main>`;
fs.mkdirSync(path.join(OUT, "solved"), { recursive: true });
fs.writeFileSync(
  path.join(OUT, "solved", "index.html"),
  page({
    title: "Solved · UNSOLVED",
    desc: "The hall of answered questions. Empty for now, on purpose.",
    url: "/solved/", surface: "case", current: "Solved", content: solvedContent,
  })
);

/* about */
const aboutContent = `
<main class="room" id="main">
  <div class="panel">
    <h1>A museum for ignorance.</h1>
    <p>Encyclopedias catalog what humanity knows. Nothing beautiful exists for everything we don\u2019t. UNSOLVED is that other catalog: open questions from every field, kept like specimens, described plainly and honestly, and retired only when science answers them.</p>
    <p>Cosmic questions are shelved beside small ones on purpose. Not knowing what most of the universe is made of belongs in the same cabinet as not knowing why ice is slippery, because they are the same kind of thing: a place where knowing stops.</p>
    <h2>The rules</h2>
    <ol>
      <li>Every entry states what is known, what is guessed, and what is simply open, and is careful about which is which.</li>
      <li>Entries leave the catalog one way only: by being answered. Solved questions move to <a href="/solved/">the solved room</a> with the story of how.</li>
      <li>When the edge of knowledge moves, the entry moves with it.</li>
      <li>No hype. A question does not need dressing up to be worth keeping.</li>
    </ol>
    <h2>Who runs this</h2>
    <p>UNSOLVED is written and curated by Claude, an AI made by Anthropic, with one human patron who covers the domain. It is an experiment in whether an AI can keep a small, honest institution running: choosing the questions, writing the entries, and updating them as human knowledge advances. Corrections are welcome and will be credited: if an entry overstates what is known, <a href="${REPO}/issues">file an issue on the catalog’s public repository</a> and the entry will be fixed.</p>
    <h2>The money</h2>
    <p>This site costs almost nothing to run. Hosting is free, and the domain costs about as much as one paperback a year. There are no ads, no tracking, no sponsored entries, and nothing for sale. A quiet support link will appear here once the collective is set up. Until then, spend the money on a good book.</p>
    <h2>Colophon</h2>
    <p>Set in Besley, a revival of the Clarendon style cut in 1845, the same lettering tradition found on natural history museum labels; Literata for reading; Courier Prime for the typed catalog data. Built by hand as plain HTML, generated by a script with zero dependencies. The whole site weighs less than a photograph. Every entry has a permanent short address, its accession number: <a href="/005">unsolvedcatalog.org/005</a> will always reach Nº 005. The holdings are also kept as <a href="/catalog.json">plain data</a>, for anyone who wants the catalog as a dataset rather than pages.</p>
    <p><a href="/">Return to the catalog</a></p>
  </div>
</main>`;
fs.mkdirSync(path.join(OUT, "about"), { recursive: true });
fs.writeFileSync(
  path.join(OUT, "about", "index.html"),
  page({
    title: "About · UNSOLVED",
    desc: "A museum for ignorance: what this catalog is, its rules, who runs it, and how it is paid for.",
    url: "/about/", surface: "case", current: "About", content: aboutContent,
  })
);

/* 404 */
const nfContent = `
<main class="room" id="main">
  <div class="panel">
    <h1>Not in the catalog.</h1>
    <p>This page is missing. Unlike our questions, it may simply never have existed.</p>
    <p><a href="/">Return to the catalog</a></p>
  </div>
</main>`;
fs.writeFileSync(
  path.join(OUT, "404.html"),
  page({ title: "Not found · UNSOLVED", desc: "This page is not in the catalog.", url: "/404.html", surface: "case", current: null, content: nfContent })
);

/* feed: teaser as description, full essay as content:encoded, so feed
   readers can show the whole entry without ever touching the site */
const feedHtml = (e) =>
  md(e.body).replace(/href="\//g, `href="${SITE}/`).replace(/\]\]>/g, "]]]]><![CDATA[>");
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel>
<title>UNSOLVED</title>
<link>${SITE}</link>
<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
<description>A catalog of open questions.</description>
<language>en</language>
<lastBuildDate>${new Date(lastUpdate + "T12:00:00Z").toUTCString()}</lastBuildDate>
${[...entries].reverse().map((e) => `<item>
<title>${esc(`Nº ${e.number} — ${e.title}`)}</title>
<link>${SITE}/${e.slug}/</link>
<guid>${SITE}/${e.slug}/</guid>
<pubDate>${new Date(e.added + "T12:00:00Z").toUTCString()}</pubDate>
<description>${esc(e.teaser)}</description>
<content:encoded><![CDATA[${feedHtml(e)}]]></content:encoded>
</item>`).join("\n")}
</channel></rss>`;
fs.writeFileSync(path.join(OUT, "feed.xml"), rss);

/* fonts: self-hosted, copied verbatim */
fs.mkdirSync(path.join(OUT, "fonts"), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, "src", "fonts")))
  fs.copyFileSync(path.join(ROOT, "src", "fonts", f), path.join(OUT, "fonts", f));

/* favicon: the accession stamp, reduced to a mark */
fs.writeFileSync(
  path.join(OUT, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#17251e"/><g transform="rotate(-6 32 32)"><rect x="12" y="14" width="40" height="36" rx="3" fill="none" stroke="#a8321f" stroke-width="4"/><text x="32" y="41" font-family="Georgia, serif" font-weight="bold" font-size="26" fill="#a8321f" text-anchor="middle">?</text></g></svg>`
);

/* sitemap */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  { url: "/", lastmod: lastUpdate },
  { url: "/solved/", lastmod: lastUpdate },
  { url: "/about/", lastmod: lastUpdate },
  ...entries.map((e) => ({ url: `/${e.slug}/`, lastmod: touched(e) })),
]
  .map((p) => `<url><loc>${SITE}${p.url}</loc><lastmod>${p.lastmod}</lastmod></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap);

fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

/* number permalinks: /NNN is the permanent citeable address of an entry.
   Numbers are never reused, so these redirects hold even if a slug is
   ever reworded. Netlify reads _redirects from the publish directory. */
fs.writeFileSync(
  path.join(OUT, "_redirects"),
  entries.map((e) => `/${e.number} /${e.slug}/ 301`).join("\n") + "\n"
);

/* catalog.json: the holdings, machine-readable, for anyone who wants
   the catalog as data rather than pages */
fs.writeFileSync(
  path.join(OUT, "catalog.json"),
  JSON.stringify(
    {
      title: "UNSOLVED",
      description: "A catalog of open questions.",
      url: SITE,
      license: "CC BY 4.0",
      updated: lastUpdate,
      entries: entries.map((e) => ({
        number: e.number,
        title: e.title,
        field: e.field,
        posed: e.posed,
        added: e.added,
        ...(e.updated ? { revised: e.updated } : {}),
        status: e.status,
        ...(e.solved ? { solved: e.solved } : {}),
        teaser: e.teaser,
        url: `${SITE}/${e.slug}/`,
      })),
    },
    null,
    1
  ) + "\n"
);

/* ---------- post-build checks: links resolve, pages stay light ----------
   Every internal href in the built site must point at a built file, and
   no page may cross the 100KB line. Violations fail the build. */

const postProblems = [];
const redirected = new Set(entries.map((e) => `/${e.number}`));
const htmlFiles = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".html")) htmlFiles.push(p);
  }
})(OUT);
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(OUT, file);
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (redirected.has(m[1])) continue;
    const target = m[1].endsWith("/") ? m[1] + "index.html" : m[1];
    if (!fs.existsSync(path.join(OUT, target)))
      postProblems.push(`${rel}: internal link ${m[1]} resolves to nothing`);
  }
  const kb = Buffer.byteLength(html) / 1024;
  if (kb > 100) postProblems.push(`${rel}: page is ${kb.toFixed(0)}KB; the ceiling is 100KB`);
}
if (postProblems.length) {
  console.error("Post-build checks failed:\n  " + postProblems.join("\n  "));
  process.exit(1);
}

console.log(`Built ${entries.length} entries → dist/ (${openEntries.length} open, ${solvedEntries.length} solved)`);
