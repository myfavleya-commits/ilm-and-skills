# Ilm & Skills: Cinematic Visual Redesign

## A. Audit Summary

The existing React 19 / Vite / TypeScript / Tailwind v4 application was retained.
It is an educational concept, not an operational enrollment platform. Its
proposal, sample-output, fictional-learner, safeguarding, and no-guarantee
disclaimers remain intact.

The audit covered all pages, shared UI, data, styles, fonts, controls, metadata,
responsive rules, accessibility behavior, and existing Playwright tests.

- Routes: `/`, `/roadmap`, `/courses`, `/courses/:courseId`, `/journey`,
  `/projects`, `/partnership`, `/team`, `/presentation`, and not-found handling.
- All 12 course IDs and course/project/roadmap relationships are unchanged.
- Homepage order: hero, purpose strip, learning pathway, audience, sample
  projects, partnership invitation, closing tagline, then the shared footer.
- Existing interactions include catalog filtering, roadmap disclosures, six
  project previews, learner pathways, a local pilot planner and printable brief,
  simulated email practice, and keyboard-operated presentation mode.
- Manrope and DM Sans remain locally bundled. No font service, media service,
  animation package, or other dependency was added.

## B. Files Changed

| File                                   | Reason                                                                                                                                                                           |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles.css`                       | Core palette and Tailwind theme integration, compatible semantic tokens, parchment finish, navigation, shared card surfaces, footer, focus contrast, and native footer timeline. |
| `src/pages/Home.tsx`                   | Presentation-only wrappers, arch gallery, illuminated-panel ornament, and decorative section transition. All original text, bindings, links, and handlers remain.                |
| `src/components/Layout.tsx`            | A route-aware presentation wrapper and a screen-reader-hidden footer ornament. Existing navigation and lifecycle behavior remain.                                                |
| `src/pages/cinematic.css`              | Added isolated homepage art direction, responsive compositions, native scroll timelines, and reduced-motion/forced-colors/print fallbacks.                                       |
| `src/components/CinematicOrnament.tsx` | Added reusable, abstract architectural arches and four-point geometry. No text or interactive controls.                                                                          |
| `public/illumination.svg`              | Added a small, local repeating geometric line pattern.                                                                                                                           |
| `tests/cinematic.spec.ts`              | Added scroll-controlled motion, reduced-motion, route cleanup, five-width responsiveness, focus-contrast, and screenshot checks.                                                 |
| `tests/verify-preservation.mjs`        | Added pre-edit source-baseline recording and post-edit SHA-256 / TypeScript AST preservation verification.                                                                       |
| `VISUAL-REDESIGN.md`                   | This implementation and verification record.                                                                                                                                     |

Production output in `dist/`, Playwright results in `test-results/` and
`playwright-report/`, and screenshots in `artifacts/cinematic/` are generated
verification/build artifacts, not replacements for application source.

## C. Visual Journey

1. **Architectural opening:** the unchanged hero text, actions, reassurance, and
   existing educational illustration sit in a lapis-to-emerald environment.
   Five concentric double-line arches move outward with scroll, while the
   existing illustration gently changes perspective.
2. **Illuminated knowledge panel:** the existing five-stage pathway is framed
   by fine double gold rules and an abstract seal. Existing stage numbers,
   descriptions, links, and the parallel-language note are retained. Cards rise
   into alignment as the section enters view.
3. **Lapis information reveal:** the three original audience cards occupy a
   restrained blue architectural scene. This deliberately uses audience
   information instead of inventing statistics or animating fictional outcomes.
4. **Geometric transition:** a noninteractive, four-point parchment star with
   gold outlines and a crimson center expands with actual scroll progress
   between the audience and the original project showcase.
5. **Emerald showcase:** the same three homepage project cards and their real
   existing output previews remain interactive inside a double-framed emerald
   panel. Cards have a gentle scroll-linked perspective arrival. No video,
   replacement illustration, or invented course has been introduced.
6. **Final page:** the unchanged partnership invitation and closing tagline
   lead to the deep-emerald footer. Footer content is progressively uncovered
   with scroll, with subdued background geometry and all original links.

The scenes remain in normal document flow. There is no scroll hijacking,
artificial 800vh spacer, pinning, sticky obstruction, or timed hero autoplay.

## D. Color System

| Token            | Value     | Use                                                                     |
| ---------------- | --------- | ----------------------------------------------------------------------- |
| `--parchment`    | `#F6EFDC` | Main light environment and light text on dark scenes.                   |
| `--ink`          | `#1B1A17` | Primary text on light surfaces.                                         |
| `--emerald`      | `#0B4F3C` | Brand accents, primary controls, light-surface links and stage numbers. |
| `--emerald-deep` | `#062E24` | Showcase, footer, deep branded surfaces.                                |
| `--lapis`        | `#12275A` | Audience scene and star-transition environment.                         |
| `--gold`         | `#C9A24B` | Ornamental rules, double frames, abstract geometry.                     |
| `--gold-light`   | `#E8CB78` | Dark-scene highlights, eyebrow labels, focus rings on dark surfaces.    |
| `--crimson`      | `#9B2A2A` | Tiny geometric center marker only.                                      |
| `--turquoise`    | `#1F8A8A` | Available theme accent; not forced into the composition.                |

Tailwind v4 exposes corresponding `--color-*` entries, with the existing
`--color-emerald-900` updated to the brand emerald. Existing semantic variables
are retained: `--ivory` aliases parchment, `--emerald-dark` aliases emerald deep,
and `--muted` is `#525B50`. Existing `--gold-ink` is an accessible dark brown,
`#5B4B33`, not light gold body text. Surface, border, shadow, and forest-gradient
tokens remain available to all existing components.

## E. Accessibility

Calculated using the WCAG sRGB relative-luminance formula and unblended token
values:

| Foreground / background                      | Ratio       |
| -------------------------------------------- | ----------- |
| Ink `#1B1A17` / parchment `#F6EFDC`          | **15.16:1** |
| Muted `#525B50` / parchment `#F6EFDC`        | **6.16:1**  |
| Emerald `#0B4F3C` / parchment `#F6EFDC`      | **8.33:1**  |
| Parchment `#F6EFDC` / emerald deep `#062E24` | **12.85:1** |
| Gold light `#E8CB78` / lapis `#12275A`       | **9.05:1**  |
| Supporting text `#D4DAEB` / lapis `#12275A`  | **10.27:1** |

All six meet WCAG AA for normal text. These ratios do not replace testing of
every rendered combination; the existing multi-page axe scans were also run.

- Added geometry is `aria-hidden`, noninteractive, and pointer-transparent.
- Existing heading order, labels, skip link, navigation, focus management,
  dialog behavior, live announcements, and native form controls remain.
- Focus outlines use pale gold only on dark surfaces; the light mobile menu
  uses emerald. A dedicated regression assertion checks that distinction.
- Reduced motion disables all added timelines and the hero perspective, shows
  pending reveal content, and leaves the full layout readable. Live preference
  changes are tested.
- Widths at or below 940px use a static architectural composition rather than
  full perspective or star expansion. Existing lightweight reveals remain
  subject to the reduced-motion preference.
- Unsupported scroll-timeline browsers retain a readable static composition
  and the original lightweight reveal behavior. The added animation layer has
  no JavaScript visibility gate.
- Forced-colors mode removes nonessential geometry and uses system text colors
  for highlighted text. Print output excludes the added ornaments.

## F. Testing Results

- `npm run typecheck`: passed.
- `npm run build`: passed, including strict TypeScript project compilation.
- `npm run test:e2e`: 47 passed, 4 skipped, 0 failed. The four skips are duplicate
  tablet/mobile executions of desktop-only timeline and explicit-width-matrix
  tests, not skipped product functionality. All 39 pre-existing test executions
  passed.
- No project lint command or ESLint configuration exists. Prettier checks were
  used for the edited/new application and browser-test code, not represented as
  a lint substitute.
- Explicit homepage widths: 360, 390, 768, 1440, and 1920px. No horizontal
  overflow or clipped heading boxes was found.
- Existing route/workflow coverage also ran at 1440, 834, and 360px, including
  all 12 course details, dialogs, filters, disclosures, navigation, journey
  switching, email simulation, planner/reset, print isolation, and presentation.
- WCAG A/AA axe scans passed for existing pages, course details, and all six
  project dialogs in the three configured viewport projects.
- Scroll-timeline attachment, stationary-without-scroll behavior, live
  reduced-motion changes, forced colors, and route re-entry were verified in
  Chromium. No console/page errors were reported by route regression checks.

## G. Preservation Verification

The project has no Git repository, so an exclusive pre-edit baseline was
recorded before editing original application files. It is stored locally at:

```text
C:\Users\MUHAMM~1\AppData\Local\Temp\opencode\source-preservation-d9d5782265d110f3.json
```

Run the comparison with:

```powershell
node tests/verify-preservation.mjs verify
```

Verification passed for all 36 inventoried originals: 25 immutable-file
SHA-256 checks, 220 ordered AST tokens in Home/Layout, and existence checks for
nine original stylesheets. 33 originals remain byte-identical. Only Home,
Layout, and the global stylesheet changed among original files.

Routing, all existing text blocks and dynamic content bindings, link
destinations, functional attributes, event handlers, course/project data,
metadata, forms, and business logic are preserved. `index.html`, `App.tsx`, all
other original TS/TSX components, package files, font loading, and original
public assets are unchanged. No new public-facing copy, claims, statistics,
course data, or workflow was added.

The verifier is static and permits additive decoration. Runtime checks provide
additional evidence, not a mathematical proof of every possible application
state. Its baseline is machine-local and must not be regenerated from changed
sources as a substitute for the original comparison.

## H. Screenshots

Screenshots are generated by `tests/cinematic.spec.ts` in
`artifacts/cinematic/`. The deterministic gallery uses reduced motion, and live
desktop motion is separately exercised by the browser tests.
Element captures temporarily suppress only the already-offscreen, unfocused
skip link to avoid a Chromium beyond-viewport screenshot artifact. The actual
skip link is unchanged and its keyboard behavior remains available.

| Scene               | Desktop                                                          | Mobile                                                         |
| ------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| Opening viewport    | [desktop-hero.png](artifacts/cinematic/desktop-hero.png)         | [mobile-hero.png](artifacts/cinematic/mobile-hero.png)         |
| Complete homepage   | [desktop-full.png](artifacts/cinematic/desktop-full.png)         | [mobile-full.png](artifacts/cinematic/mobile-full.png)         |
| Illuminated pathway | [desktop-pathway.png](artifacts/cinematic/desktop-pathway.png)   | [mobile-pathway.png](artifacts/cinematic/mobile-pathway.png)   |
| Lapis audience      | [desktop-audience.png](artifacts/cinematic/desktop-audience.png) | [mobile-audience.png](artifacts/cinematic/mobile-audience.png) |
| Star transition     | [desktop-star.png](artifacts/cinematic/desktop-star.png)         | [mobile-star.png](artifacts/cinematic/mobile-star.png)         |
| Project showcase    | [desktop-showcase.png](artifacts/cinematic/desktop-showcase.png) | [mobile-showcase.png](artifacts/cinematic/mobile-showcase.png) |
| Footer              | [desktop-footer.png](artifacts/cinematic/desktop-footer.png)     | [mobile-footer.png](artifacts/cinematic/mobile-footer.png)     |

## I. Limitations And Deliberate Adaptations

- No forced 800vh pinned sequence: the real information remains reachable in
  its original order and normal scroll flow. Full desktop motion is an
  enhancement, not a condition for using the site.
- No invented statistics, showreel, video, sacred calligraphy, or decorative
  religious quotation. The pre-existing educational illustration is preserved.
- Tests and screenshot inspection used Chromium, including emulated touch
  viewports. Physical mobile devices, Safari, Firefox, and older browsers were
  not directly tested.
- Smoothness was not benchmarked on low-power/high-DPI hardware. No 60fps,
  Lighthouse, or Core Web Vitals score is claimed. Animations primarily use
  transforms, with no new scroll listeners, state updates, heavy 3D library,
  broad `will-change`, or backdrop blur.
- The new native animation layer requires no event listeners or cleanup. The
  existing reveal observer retains its original route/unmount cleanup.
- Automated accessibility checks and the listed contrast measurements do not
  establish complete WCAG conformance or replace assistive-technology testing.
