# Changelog — Hemaya UI/UX Refinement

Tracking the page-by-page audit and refinement pass described in `CLAUDE.md`.
Design language, layout, navigation, and color palette are unchanged throughout — every entry below is a refinement, not a redesign.

---

## Pages completed (6 / 12)

- [x] Home
- [x] About
- [x] AI Analysis
- [x] Community
- [x] Contact
- [x] Dashboard
- [ ] FAQ
- [ ] Knowledge
- [ ] Login
- [ ] Places
- [ ] Register
- [ ] Shared chrome (nav / footer) — partially addressed while fixing Home, revisit at the end for a final pass

---

## Home

**Internationalization**
- Page was 100% hardcoded English despite a complete, correct AR/EN dictionary already existing for it (`i18n-dict.ts` → `home`). Wired every string to `useLanguage()`.
- Added two dictionary keys that had no entry at all (`reportLine`, `verifiedBy`), in both languages.
- Translated two nav `aria-label`s (`"Primary"`, `"Mobile"`) that were invisible-but-English regardless of selected language.

**RTL/LTR**
- Fixed a floating hero card pinned with physical `left-6` — it stayed on the visual left even in RTL instead of mirroring to the reading-start side. Now `start-6`.
- CTA arrow icons now flip via `rtl:rotate-180` so they always point in the reading direction.

**Accessibility**
- Added `focus-visible` rings to every custom CTA, nav link, mobile menu toggle, and footer link — many had none at all (WCAG 2.4.7).

**Refactoring**
- Extracted `PillLink` and `ArrowLink` (`components/site/`) to remove ~6 duplicated inline CTA style strings, fixing an inconsistency where one CTA had no hover state as a side effect of the duplication.

---

## About

**Refactoring**
- `head()` hardcoded meta title/description that already existed verbatim in `dictionaries.en.about.metaTitle/metaDesc`. Deduped to reference the dictionary directly (traced this pattern to every route in the dictionary — will dedupe per-page as encountered).

**Design consistency**
- Content section used flat `py-16` with no responsive scaling; brought to `py-16 md:py-20` to match `PageHeader`'s own rhythm.

*(Page was otherwise already fully i18n-correct; intentionally left info cards without hover states since they're non-interactive.)*

---

## AI Analysis

**Accessibility**
- "Choose a file" button had no hover, no focus-visible ring, and no explicit `type="button"`.
- Heading hierarchy skipped a level (`h1` → `h3`, no `h2` anywhere). Promoted "Observations" / "Questions for you" to `h2`.

**Internationalization / RTL**
- A hardcoded "· " bullet was glued directly onto translated question text; replaced with a decorative bullet element.
- Deduped `head()` meta against the dictionary.

**Refactoring**
- Extracted the CVA pill styling into `pill-variants.ts` so `PillLink` (navigation) and the new `PillButton` (in-page actions) share one definition instead of drifting apart.
- Replaced an implicit-global `React.ComponentType` reference with an explicit `import type { ComponentType }`.

---

## Community

**RTL/LTR**
- Real bug: the Save button used physical `ml-auto` to push itself to the row end — wrong side in RTL. Fixed to logical `ms-auto`.

**Internationalization**
- `anonMeta: "· Anonymous parent · 2h"` glued two separators and a static, always-identical relative timestamp into one dictionary string. Split into a clean `anonLabel` plus a proper translated `times` array (relative-time phrasing genuinely differs by language, unlike bare numerals).

**Accessibility**
- Category filter buttons and the Save button had no `onClick` at all (dead buttons). Added local UI state so selection/save-toggling give honest feedback; added `aria-current` / `aria-pressed` accordingly.
- Added missing `aria-hidden` to three decorative icons (Heart, MessageCircle, Bookmark) that were being redundantly announced next to their text.
- Fixed the same heading-hierarchy skip pattern (post titles `h3` → `h2`).

**Refactoring**
- Extracted `Post` into its own component now that it owns real interactive state.

---

## Contact

**Bug fix (not cosmetic)**
- Found and removed a stray, accidental duplicate form field — a single-line input labeled/placeholder'd "How can we help?" sitting directly above the real message textarea using the same placeholder text. Two inputs asking the same question.

**UX**
- Submitting the form previously did nothing visible at all. Added an honest `idle → sending → sent` flow (clearly local/simulated, no backend exists yet) — spinner + "Sending…" on the button, then a calm success panel, instead of a dead-end click.
- Name/email fields were forced into a 2-column grid with no mobile stacking — cramped on small phones. Now stacks below `sm:`.

**Accessibility**
- Submit button had no hover/focus state — replaced with the shared `PillButton`.
- Added `required` to all three fields.

**Refactoring**
- Merged the single-line `Field` and a hand-rolled `<textarea>` (duplicate styling) into one `FormField` component with a `multiline` variant.
- Deduped `head()` meta against the dictionary.

**Visual**
- Added two section labels ("Other ways to reach us" / "Send us a message") to give the two columns distinct visual identity.

---

## Dashboard

**Accessibility**
- "Add journal note" button had no hover, no focus-visible ring, no `type="button"`. "View all" (timeline) button was missing both a focus ring and `aria-hidden` on its icon.
- ~6 decorative icons across stat cards, medication rows, and toolbar buttons were missing `aria-hidden`, so screen readers would announce redundant icon names next to text that already says the same thing.
- The goal-progress bars had no accessible treatment. Since the same percentage is already shown as visible text right above each bar, marked the decorative bar `aria-hidden` rather than adding redundant `role="progressbar"` semantics that would double-announce the same number.
- The single-letter avatar ("L") was being read aloud as loose text; marked `aria-hidden` since the full name is already in the adjacent heading.

**Responsive**
- The header used an unusual grid-then-flex hybrid (`grid-cols-[minmax(0,1fr)_auto] sm:flex`) that pinned the two toolbar buttons to a content-sized column with no wrapping — a real overflow risk on narrow phones, especially in Arabic where "إضافة ملاحظة يومية" is notably longer than its English counterpart. Simplified to a straightforward `flex-col` (stacked) → `sm:flex-row` (side-by-side) pattern with `flex-wrap` on the actions, removing the fragile hybrid entirely.

**Refactoring / design system**
- The two toolbar buttons needed the same pill styling as `PillLink`/`PillButton` but at a smaller, denser size appropriate for an app toolbar (vs. marketing-page CTA size). Rather than hand-roll a third variant, extended `pillVariants` with a `size: "default" | "sm"` option — both shared components immediately gained the new size for free.
- Deduped `head()` meta against the dictionary.
- Replaced the ambient-global `React.ComponentType` icon typing with lucide-react's own `LucideIcon` type (correctly typed for all SVG/ARIA props, unlike the hand-rolled `{ className?: string }` shape used before).

*(Heading hierarchy was already correct on this page — h1 → sibling h2s, no skips. Confirmed rather than changed.)*

---

| Pattern | Status |
|---|---|
| Duplicated pill CTA styling | Fixed → `PillLink` / `PillButton` / `pill-variants.ts`, now with a shared `size` variant (default / sm) for toolbar-density buttons |
| Missing `focus-visible` on custom interactive elements | Fixing per-page as found |
| `head()` meta duplicating existing dictionary `metaTitle`/`metaDesc` | Deduping per-page; every remaining route has the same unused keys |
| Hardcoded "·" separators glued into JSX or dictionary strings | Fixed 3 occurrences so far; sweeping remaining pages as I go |
| Physical `ml-`/`mr-`/`left-`/`right-` instead of logical properties | Fixed 2 real bugs so far (Home, Community) |
| Heading hierarchy skipping a level (`h1` → `h3`, no `h2`) | Fixed on 2 pages so far; checking each remaining page |
| Interactive-looking elements with no `onClick` | Judgment call per case — wiring honest local state where the action is presentational, leaving inert where it implies unbuilt backend functionality |

---

## Remaining pages

FAQ, Knowledge, Login, Places, Register — continuing in that order, same audit-first workflow.
