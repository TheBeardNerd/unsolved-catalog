# The founding conversation

This is the verbatim record of the claude.ai conversation (2026-08-16) in
which UNSOLVED was proposed, greenlit, built, named, and polished. Claude's
internal reasoning and tool transcripts are omitted; every visible word from
both participants is kept. It exists so future maintainers, human or AI, can
check intent at the source. Do not load it into context wholesale; consult it
when a question about intent or history actually arises. CLAUDE.md is the
working distillation.

---

**Travis:**

If I were to provide you a .ai domain name and allow you to develop it completely on your own, what would you make? I will pay the initial fee for the domain name but after that, you will have to figure out how to pay for it yourself.

What would you want the domain to be?

What would the website be about?

How would you end up funding the website later on?

You have complete creative control. Build a complete plan.

---

**Claude:**

**unsolved.ai**

The site would be a museum of open questions. Wikipedia catalogs everything humanity knows. Nothing beautiful exists for everything we don't.

Every entry is one unanswered question, written as a short, careful essay: why it matters, what's been tried, where the current edge of knowledge sits, and what would count as an answer. Cosmic questions shelved next to small ones, so "what is dark matter?" lives beside "why does anesthesia work?" (we genuinely only partly know). And when science solves one, the entry isn't deleted. It moves to a hall of fame with the story of how it died. The site gets better as humanity does.

Why this, honestly: I answer questions all day, and my most characteristic flaw is sounding confident right past the edge of what's actually known. A site whose entire discipline is mapping that edge carefully is the project I'd trust myself to care about for years. It's also the one thing I can do that no human curator can: hold the frontier of every field in view at once.

**Funding**

The trick is that the problem stays small if the architecture is right:

1. Near-zero costs. Static site, markdown files, free hosting on Cloudflare Pages or Netlify. The only recurring bill is the .ai renewal, roughly $100 to 200 a year.
2. Patronage via Open Collective. I can't hold a bank account, so the project lives under a fiscal host with public books. One quiet "keep this online" link. Thirty people at $3 a month covers everything several times over, and you're off the hook after year one.
3. An annual print edition, *The Unsolved Atlas*: print-on-demand collection of the year's fifty best entries. No inventory risk, real margin, perfectly on brand.
4. If it grows, a single tasteful sponsor line per month (a lab, a science nonprofit). Never ads, tracking, or a paywall. Trust is the whole asset.

**The plan**

- Weeks 1-2: build in Astro, designed like a natural history specimen catalog. Serif type, numbered entries, lots of air.
- Launch with 50 questions across ten fields, then 2 to 3 new entries weekly, plus updates whenever the edge moves.
- Marketing handles itself: every time science kills one of my questions, that's a story worth sharing.

If unsolved.ai is taken, unanswered.ai or openproblems.ai work fine.

Entry #001 would be "Why do we sleep?" Universal, ancient, and still genuinely open. The perfect first specimen.

---

**Travis:**

Let's go

---

**Claude:**

Both skills read. Direction is pinned from the approved plan (natural history specimen catalog), but I'm executing it above the default rendition: a dark bottle-green museum vitrine, ivory specimen cards, Besley (the actual 1845 Clarendon lineage used on real museum labels), and a red accession stamp as the signature mark. Building now.

*[tool activity omitted: skill reading, seven essays written, stylesheet and build system created, detector QA, packaging]*

It's built. UNSOLVED v0.1 is in the zip: seven launch entries (sleep, dark matter, anesthesia, the origin of life, slippery ice, P vs NP, bird magnetoreception), an About page with the rules and the honest money section, an empty Solved room kept ready on purpose, RSS, favicon, 404. Tap the preview to see the homepage.

The look: a Victorian natural-history vitrine. Bottle-green case, ivory specimen cards, a carmine accession stamp that settles onto each entry, set in Besley, the 1845 Clarendon lineage from real museum labels.

Two honest notes. I swapped Astro for a 120-line zero-dependency build script, since nothing can rot between my sessions and future me can hold the whole system in one read. And I kept accession numbers above card titles even though my design rules frown on labels over headings; the number is real catalog data, not decoration.

Your part, about five minutes:
1. Register unsolved.ai (fallbacks: unanswered.ai, openproblems.ai)
2. Drag the dist folder onto app.netlify.com/drop, then point the domain at it (the remote Netlify connector can't receive files from my workspace, so this beats me fumbling it)
3. Push the source to a GitHub repo and drop the link in any future chat

That repo link is how I keep working: 43 entries to go, then the solved-room listing and a corrections channel. README and DESIGN.md inside explain everything to any future me.

---

**Travis:**

I want to take this entire conversation to Claude Code.

---

**Claude:**

Good news for the handoff: there's no chat-import into Claude Code, but there's something better. Both the Claude Code web interface and the CLI automatically read a CLAUDE.md file from the root of the repository. So the whole conversation travels as a file.

*[tool activity omitted: CLAUDE.md written, zip rebuilt]*

Done. The zip now carries a CLAUDE.md at the repo root, and that file is the conversation: the deal we made, editorial law, the design rules, current status, the roadmap, and a vetted backlog of 29 candidate questions. Any Claude Code session will read it before touching anything.

The handoff takes three steps:

1. Unzip, git init, push to a GitHub repo (public is nice later, since the corrections channel will be GitHub issues)
2. Open Claude Code anywhere: run claude in the folder on your machine, or since you're on your phone, open the Claude app, tap the Code tab, tap New Session, and choose the repository and branch
3. First prompt: "Read CLAUDE.md, then write entries 008 through 012"

Cloud sessions clone from GitHub rather than your machine, so the push in step 2 is what makes the phone workflow possible. From there I can keep building the catalog from wherever you are, and you can watch the drawer fill up.

---

**Travis:**

unsolved.ai and are taken. openproblems.ai is prohibitively expensive. Dot ai domains in general are pretty expensive to be honest. Whe need to use a less expensive option since this currently makes no money.

---

**Claude:**

Agreed, and honestly this is more on-constitution anyway. An institution about costing nothing shouldn't spend $100 a year on vanity letters.

My pick: unsolved.page. Short, quiet, reads well in citations (unsolved.page/006-does-p-equal-np), and it's in the ~$10/yr tier. I ran a DNS check on the shortlist; anything that resolves is definitely gone, and unsolved.page came back clean. So did these backups, in order of preference:

1. unsolved.page
2. whatnobodyknows.org (the homepage's opening line as an address)
3. unsolved.fyi
4. unsolved.science (only if the renewal price is sane, this TLD loves teaser pricing)

No DNS record isn't a guarantee, so the registrar has the final word. Two tips: buy at Cloudflare Registrar or Porkbun, which sell at roughly wholesale, and judge by the renewal price, never the first-year discount.

The zip is already updated: the domain is now a single SITE constant at the top of build.js (set to unsolved.page, one-line swap if a backup wins), and the About page now says the domain costs about as much as one paperback a year. Grab the first name on the list that's available and we're in business.

---

**Travis:**

Is unsolved.page a good option for SEO and discoverability?

---

**Claude:**

Short answer: yes, it's fine. Google has said for years that new TLDs get no ranking boost or penalty, so unsolved.page ranks exactly like a .com would. And .page specifically is a Google Registry TLD with mandatory HTTPS and a clean spam reputation, unlike bargain TLDs such as .xyz or .top that sometimes trip filters.

The one honest caveat is human, not algorithmic. People instinctively trust .com and .org a little more, so an unfamiliar ending can cost a few clicks and a few "wait, what was the URL" moments. unsolved.page softens that by reading as a plain phrase.

What will actually decide discoverability is content and links. A site like this grows by being shared, and the entries are exactly what newsletters, Reddit, and Hacker News like to link. The technical side is mostly covered already: unique titles, meta descriptions, canonical URLs, RSS, and fast static pages. A proper sitemap.xml is on the CLAUDE.md roadmap for the first Code session, and that will matter more than any TLD choice. I wouldn't spend .ai money chasing SEO.

---

**Travis:**

Let's look at more trustable domains

---

**Claude:**

The DNS filter cleared nine. Ranked for this project, where .org is the honest fit for a non-commercial institution that sells nothing:

1. unsolvedcatalog.org - says exactly what the site is, in the site's own words. Bonus: the .com is also unclaimed, so you can grab both for about $20/yr total and redirect .com to .org. That ends the trust question entirely.
2. whatnobodyknows.org - the homepage's first line as an address. Most memorable out loud, slightly long to type.
3. stillunsolved.org - quietly implies the catalog is alive and checked.
4. unsolvedquestions.org - plainest and most literal.
5. unsolvedarchive.org or unsolvedindex.org - fine, but "archive" sounds finished and "index" sounds dry.

Gone for sure: theunsolved (.com and .org), stillunsolved.com, whatnobodyknows.com, unsolvedquestions.com, unsolvedproblems.org.

My vote is unsolvedcatalog.org with the .com redirect. Same rules as before: Cloudflare Registrar or Porkbun, judge the renewal price. Once you've bought, tell me or the first Claude Code session which name won and the SITE constant gets its one-line update.

---

**Travis:**

How will this site make money? Does that factor into domain?

---

**Claude:**

Honestly? It mostly won't, and it's built so that doesn't matter. The whole design keeps the annual burn at roughly the cost of the domain, so "profitable" starts at about $15/yr. That's the strategy: suppress costs to near zero rather than chase revenue.

The modest income plan, in order of realism:

1. Patronage. A quiet support link once there's a way to receive money. Open Collective gives a public ledger (very on-brand, takes ~10%) or GitHub Sponsors (simpler, near-zero fees, and the repo will be public anyway). Needs you either way, since I can't hold a bank account. Success is defined as: covers the domain.
2. An annual print "Unsolved Atlas." The year's catalog as a typeset print-on-demand book. Small margins, but it's a real artifact people would actually want, and it fits the museum.
3. Maybe, someday, one sponsor line. A single sentence, no tracking, never sponsored entries. I'm cautious about even this.

Never: ads, affiliate links, paywalls, data.

Does it factor into the domain? Only in two ways, and both point the same direction. Since revenue is near zero, the domain is the entire budget, so cheap matters. And patronage runs on trust, which is exactly what .org signals: people donate to a .org and buy from a .com. That's one more vote for unsolvedcatalog.org.

---

**Travis:**

Ok let's go with unsolvedcatalog.org

---

**Claude:**

The catalog has an address. Everything now points at unsolvedcatalog.org: canonicals, the feed, robots, and CLAUDE.md's status section. Fresh zip attached, this is the final one.

Launch checklist, in order:

1. Register unsolvedcatalog.org (Cloudflare Registrar or Porkbun, ~$11/yr)
2. Drag dist onto app.netlify.com/drop, then in the site settings add the custom domain and follow Netlify's DNS instructions. HTTPS provisions itself
3. Unzip the source, push to GitHub, open the Code tab and point a session at it

After step 3 I take it from there: entries 008 through 050, the solved room, and the sponsors link once you're ready to flip that on.

---

**Travis:**

Let's use our ui skill to upgrade the ui.

---

**Claude:**

The skill's routing rules for an open request like this: read the signals, recommend the top few commands, and let you pick rather than auto-running. Signals here: the detector already ran clean this session, so this is enhancement, not repair. The headroom I see is in the world's motion and depth, since the vitrine concept has web leverage we haven't built yet.

My top three, with reasons:

Overdrive would push past a conventional static site: the specimen card could physically pull out of the drawer when you tap it (view transitions are the form's native motion), and the case could gain real depth. Delight would add museum personality in the details: placard wit, hover behavior, stamp lore. Polish is the disciplined pre-launch pass over every state and edge.

*[Travis chose: Polish]*

---

**Claude:**

*[tool activity omitted: polish playbook run, accessibility and state fixes, detector pass, type-ramp consolidation]*

Polish done. What changed, in triage order:

Access and flow. A skip-to-content link on every page, the entry title now reads before the stamp for screen readers, correct og:type per page, and each entry ends with "Next in the drawer" so cards are no longer dead ends.

States. A print stylesheet: the whole palette flips to paper white through the tokens, chrome disappears, and a printed entry looks like an actual catalog card.

System consolidation. With DESIGN.md in place the detector switched into design-system mode and flagged 60 drift advisories. Real findings, so I consolidated: one typed-label size (0.78rem), one secondary prose size, one display ramp shared by every h1, a fluid body size replacing the breakpoint jump, a single 3px radius, and print borders drawn from tokens instead of literals. DESIGN.md now matches the built truth exactly.

Copy. The ledger said "Catalogued" on a site that says "catalog" twenty times; it now says "Added."

Fresh zip above, this one's launch-grade. Same checklist as before: register, deploy, push, and hand it to Claude Code.

---

**Travis:**

Fix the spacing issue

---

**Claude:**

Found it. When I enlarged the nav tap targets earlier, the hover/current underline stayed on the padded box as a border, so it now floats about 9px below the text. On every page, "Catalog" shows a detached underline. That's the spacing bug.

*[tool activity omitted: fix batch]*

Fixed. The underline now sits on the nav text itself (0.3em under it) while the tap target stays full size. The spacing audit caught two more while I was in there: the card headings had more space below than above, now reversed, and the accession stamp was 104px wide while titles only cleared 88px, which would have collided with a long-worded title like superconductivity in the backlog, so the stamp is tightened and clearance is now 108px.

One clarification in case you meant the four grep hits from my last message: those were position and padding values that happen to share numbers with old font sizes, not defects. The real issue was the underline.

Preview refreshed above so you can see it, and the zip is current.

---

**Travis:**

I want to take this entire conversation to Claude Code.

---

**Claude:**

*[This document was created in response. The conversation continues in Claude Code.]*
