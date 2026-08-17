---
name: UNSOLVED
description: A catalog of open questions, presented as a Victorian natural-history vitrine
colors:
  case-green: "#17251e"
  case-deep: "#101a14"
  ivory-on-case: "#efe8d6"
  sage-on-case: "#a9b8a6"
  brass: "#c6a55c"
  card-ivory: "#f0e9d6"
  iron-gall-ink: "#221d13"
  faded-ink: "#665b41"
  stamp-carmine: "#a8321f"
typography:
  display:
    fontFamily: "Besley, Clarendon, Georgia, serif"
    fontSize: "clamp(2rem, 7vw, 3.2rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Besley, Clarendon, Georgia, serif"
    fontSize: "1.32rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Besley, Clarendon, Georgia, serif"
    fontSize: "clamp(1.35rem, 4.6vw, 1.7rem)"
    fontWeight: 700
    lineHeight: 1.16
  body:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.72
  lede:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 400
  body-small:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  card: "3px"
spacing:
  page-gutter: "1.25rem"
  card-gap: "1.1rem"
  content-max: "46rem"
components:
  specimen-card:
    backgroundColor: "{colors.card-ivory}"
    textColor: "{colors.iron-gall-ink}"
    rounded: "{rounded.card}"
    padding: "1.15rem 1.25rem 1.05rem"
  nav-link:
    textColor: "{colors.brass}"
    typography: "{typography.label}"
    padding: "0.55rem 0.2rem"
---

## Overview

UNSOLVED is a museum for ignorance: open scientific questions kept as catalogued specimens. The visual world is a Victorian natural-history vitrine. The site chrome is the painted cabinet (deep bottle green with brass fittings); every piece of content is an ivory card-stock specimen sitting inside it or pulled out of it. The index is the drawer; an entry page is the card itself, read up close. The world refuses the two category defaults: the warm-cream minimal science blog and the near-black "mystery" theme.

**The Cabinet Rule.** Chrome is always case green; content is always ivory card. Nothing else gets a surface color.

## Colors

Primary: stamp-carmine (#a8321f), the carmine of accession-stamp ink. It marks identity and status only: the stamp, accession numbers, the drop cap, links and focus on ivory, and the word OPEN. It never fills a region.

Secondary: brass (#c6a55c), the case fittings. Links, hairline rules (at 28% opacity), and focus rings on the green case.

Neutral surfaces: case-green (#17251e) for all chrome and rooms; case-deep (#101a14) only as the scrollbar track. Card-ivory (#f0e9d6) for every content surface.

Neutral text: ivory-on-case (#efe8d6) and sage-on-case (#a9b8a6, secondary, tinted from the case hue, never gray) on green; iron-gall-ink (#221d13) and faded-ink (#665b41) on ivory. All pairs meet 4.5:1 or better.

**The Stamp Ink Rule.** Carmine appears only on ivory, never as text on the green case (the contrast fails there); on green, accent duty belongs to brass.

## Typography

Display and headings: Besley, a revival of the Clarendon style cut by the Besley foundry in 1845, the lettering tradition of actual museum labels. Weights 700 to 900 only; 900 is reserved for the wordmark. Tracking never tighter than -0.01em. Headings use text-wrap: balance.

Body: Literata on a fluid step, clamp(1.0625rem, 1rem + 0.35vw, 1.125rem) at 1.72, a long-form reading face. Essays hold a 66ch measure and open with a drop cap in stamp carmine.

Data: Courier Prime, the typed catalog label. Uppercase, 0.08em tracked, tabular numerals, one size: 0.78rem (12.5px), above the 12px floor. Used only for metadata: nav, holdings counts, ledger rows, label lines, colophon. Monospace never appears in running prose.

## Layout

Single-column, mobile-first, everything constrained to a 46rem inner measure with 1.25rem gutters. Header and footer are full-bleed green bars with constrained inner wrappers. Index: thesis block, then a typed ledger head (holdings line, hairline, drawer dividers) between brass hairlines, then the drawer (a vertical stack of specimen cards, 1.1rem gap), then a typed end-of-drawer line (the drawer's back panel: "End of the drawer" plus a back-to-top link) closing the scroll before the footer. Entry: green header bar, then the page becomes the ivory card edge to edge; the stamp floats top-right of the entry head and the title wraps beneath it, so long questions keep the full measure once they clear the stamp. End matter closes the card in three typed lines: the file line, a cite line naming the entry's permanent number address (unsolvedcatalog.org/NNN), and drawer navigation; in print the navigation and all chrome drop away, so a printed entry is the card itself. One breakpoint at 40rem (ledger 2 columns to 4, roomier card padding); body size is fluid via clamp.

## Elevation & Depth

Cards float above the case with soft offset shadows: resting `0 3px 14px rgba(6,10,8,0.45), 0 1px 3px rgba(6,10,8,0.5)`; lifted (hover) `0 10px 26px rgba(6,10,8,0.5), 0 2px 5px rgba(6,10,8,0.45)` with a -3px translateY. Ivory surfaces themselves are flat; depth exists only between card and case. No glows, no zero-offset halos.

## Shapes

Corners are 3px everywhere a shape has them: cards, panels, the stamp border. Rules are 1px hairlines: brass at 28% opacity on green, ink at 18% opacity on ivory ("ledger ruling"). The stamp is a 2px carmine border, rotated -2.5deg, flat: no texture, no emboss, no fake ink bleed.

## Components

### Specimen card (index)
An ivory card that is one whole link: accession number (Besley 700, carmine), question (Besley 700, balanced), teaser (faded ink), and a typed label line above a top ledger rule. Hover and keyboard focus lift it 3px with the deeper shadow; reduced-motion gets no transform. An entry's "Return to the catalog" link targets the card's own anchor, and the returned-to card is marked with a brass hairline outline at 5px offset (the spot the card was pulled from); a focus ring outranks the marker.

### Drawer dividers (index)
The subject tabs of a card catalog: a fieldset of hidden radios styled as typed Courier labels in sage with tabular counts, the checked divider brass and underlined like the nav, in a row under the holdings line. Selecting one narrows the drawer to that field, pure CSS via `:has()`. Browsers without `:has()` never see the row; print always shows the whole drawer. The default divider is All: the mixed drawer, cosmic beside small, stays the front door. At 40rem and up the row is sticky: it rides at the top of the case (case-green fill, its own hairline as the edge, no new shadow) so the drawer can be re-narrowed from anywhere in the scroll; anchored cards carry extra scroll-margin to land clear of it. On phones it stays in flow, so the wrapped rows never eat the viewport.

### Accession stamp (signature)
The identity mark. Carmine bordered block, Besley caps + Courier number, rotated -2.5deg, floated top-right of every entry head with the title wrapping beneath it (in source it precedes the h1, so the card reads stamp-first, as a real specimen card does). It settles into place once on load (0.45s, ease `cubic-bezier(0.16,1,0.3,1)`, from +1.5deg and 114% scale), the site's single authored motion moment; reduced-motion renders it static.

The SOLVED state overstamps it: the original stamp is kept (a card's history is part of the card) and a second impression is struck across its lower edge at an opposing angle (+6deg against the stamp's -2.5deg), wider than the stamp so it crosses both borders. Same carmine, same flat 2px-border grammar, ivory face, the word SOLVED at 0.92rem tracked 0.24em. It obliterates the OPEN line it cancels while UNSOLVED and the citeable Nº stay legible above it. The cancelled OPEN is aria-hidden; the overstamp rides inside the stamp so the single settle covers both impressions, never a second moment.

### Ledger
A dl of typed metadata (Field, First posed, Catalogued, Status) between two card rules; values bold ink, OPEN in carmine.

### Navigation
Courier caps in brass on the green bar, 0.55rem vertical padding for tap targets, current page underlined in brass. The header wraps as a unit: wordmark and nav share one baseline row where they fit; where they don't, the whole nav drops below the wordmark as its own flush-left row, never wrapping mid-list. The links' 0.2rem tap padding is cancelled at the list's edges (negative margins) so link text sits flush with the measure.

### Browser surfaces
Selection is carmine with ivory text; caret carmine; scrollbar brass-on-deep-green; focus rings 2px, brass on green surfaces and carmine on ivory. Scroll-to-text highlights (`::target-text`) take the selection treatment, carmine with ivory. Ordered-list markers on panels are typed: Courier in faded ink. In forced-colors mode (card depth lives in shadows, which it strips) specimen cards and panels gain a 1px CanvasText border so the drawer keeps its structure. Under `prefers-contrast: more` the quiet end of the palette firms up: faded inks deepen (brighten on green) and hairlines press harder, while carmine, brass, and both surfaces stay exactly themselves.

## Do's and Don'ts

### Do:
- **Do** keep every new page inside the Cabinet Rule: green chrome, ivory content, nothing else.
- **Do** give any new metadata the typed treatment (Courier Prime, uppercase, 0.08em, 0.78rem, tabular numerals).
- **Do** keep essays at a 66ch measure with the carmine drop cap and the four-part heading structure (Why it matters / What has been tried / Where the edge is / What would count as an answer).
- **Do** respect prefers-reduced-motion on anything that moves.

### Don't:
- **Don't** set carmine text on the green case; it fails contrast. Brass carries accent on green.
- **Don't** add texture, grunge, or embossing to the stamp; it stays a flat graphic mark.
- **Don't** introduce gray text; secondary text is sage on green, faded ink on ivory.
- **Don't** add a second entrance animation; the stamp settle is the page's one moment.
- **Don't** use monospace outside data and labels.
