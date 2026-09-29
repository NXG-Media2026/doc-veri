# Homepage design audit — 29 September 2026

Reference: https://alisavitti.com/ (visually inspected). Only composition principles are adapted; no reference copy, images, logos or brand assets are used.

## Before

The Astro homepage repeats centered headings, evenly spaced icon features, rounded white cards, drop shadows and dark photographic overlays. Verena's introduction is a small circular portrait after the offer. Shared styling uses Playfair Display/Inter, petrol #1F4E5F, cream #F5EFE6 and terracotta #C17B5A. These brand values remain unchanged.

## Reference and translation

| Dimension | Observed reference | doc.veri decision |
| --- | --- | --- |
| Typography | Very large personal name; serif editorial headings and sans-serif explanation | Retain both existing fonts; fluid display scale, narrow reading measure and small uppercase labels |
| Space and rhythm | Full-width opening, generous portrait/text sections, compact contrasting bands | Alternate an asymmetric hero, founder spread, dark approach section and staggered offer images |
| Photography | Personality-led, large portraits; alternating image placement | Existing Verena photographs, natural colour, rectangular crops and captions; no obscuring hero gradient |
| Grids | Broad two-column compositions interspersed with multi-image grids | Unequal desktop columns and offset offer layouts; linear, readable mobile order |
| Navigation | Clean wordmark, horizontal links, clear primary action | Keep doc.veri branding and destinations; simplify top level and provide keyboard-operable disclosures |
| Buttons/cards | Solid pill buttons; some rounded containers, but many unboxed sections | Deliberately sharper buttons; restrained outlines and open layouts instead of repeated cards |
| Backgrounds/borders | Light neutrals, contrasting bands, thin list separators | Existing cream/petrol/terracotta only; hairline rules establish structure |
| Transitions | Understated UI changes; moving hero media | No autoplay media; restrained colour/underline feedback; respect reduced motion |

## Content integrity

Reuse existing DE/EN copy, routes, optimized image pipeline, analytics and SEO metadata. Keep both homepages aligned. Existing testimonial data explicitly identifies itself as demo content: omit it and its review schema from the redesigned homepage. Existing social captions also identify themselves as placeholders: replace the simulated post grid with an honest personal photo strip linking to the profile. Do not promote a product marked hidden.

## Validation

Record build, responsive, keyboard, image and link results here after implementation. Baseline build initially fails under Windows filesystem permissions before any source changes.

## Completed implementation
- Rebuilt the two homepages using shared hero, founder, approach, offers and next-step components.
- Kept the existing colour values and font files. Shared radius tokens now use 2px; added fluid type, spacing, button/link and focus styles. The home layout CSS is separate from product/article composition.
- Selected the existing 800px professional portrait for the hero and Ironman finish photograph for the founder spread. Lower-resolution beach photographs remain in secondary sections.
- Replaced hover-only navigation with native keyboard-operable disclosures; mobile menu closes on Escape and desktop resize.
- Removed only homepage demo reviews/review schema and simulated social-post captions. Data remains available for the rest of the site.
- Removed the hidden Perimenopause product cover from the homepage offer illustration.

## Validation results
- Production build: passed, 88 pages, no build warnings or errors.
- Both DE and EN homepages: 320, 390, 768, 1024 and 1440px viewport checks passed; no horizontal document overflow; one H1 per homepage.
- Mobile navigation open/close, nested disclosure, Escape focus return and closing on desktop resize passed. Desktop disclosure opens with Enter and closes with Escape.
- Native FAQ opens/closes from the keyboard; visible answer confirmed.
- Homepage images: no failed loaded images; browser console: no errors/warnings in the homepage check.
- Homepage links, including navigation and footer: 32 unique local route targets returned HTTP 200. Sixteen local resource paths and fragment targets exist.
- Existing external Instagram and LinkedIn profile URLs were retained, but availability behind their login/bot controls was not certified.
- A repeatable local link check is included: `node scripts/check-home-links.mjs`. Run after the build; optionally set `PREVIEW_URL` to a running preview to check HTTP responses too.
- Newsletter/checkout submissions were not exercised; this task changes presentation and retains the existing integrations.

## Local environment note
The unmodified checkout and new source both encounter inherited Windows access restrictions when esbuild traverses the user directory. Validation therefore ran on a temporary copy of the project using the same installed dependencies, a temporary drive mapping and symlink-preserving module resolution. Those local validation settings are not part of the production config. Git metadata writes were also denied locally; the review branch and commit are created through the GitHub connector. Local source changes remain in the original checkout.
