# L’Italia nel cuore – Con Mariniello

Campaign site for the Com.It.Es. Mexico 2026–2031 election. Built with SvelteKit.
Six pages, all in Spanish (default), Italian and English:
Home, About us, Candidates (+ a page per candidate), Program, Our record, How to vote.

## Where things live

| What | File |
| --- | --- |
| All text, in es / it / en | `src/lib/content/*.json` (one file per page, plus `candidates.json` and `ui.json` for menus and buttons) |
| Candidate photos | `src/lib/assets/candidates/<slug>.jpg` (large) and `<slug>-sm.jpg` (grid). Replace a file with the same name to change a photo |
| Candidate signatures (taken from the campaign cards) | `src/lib/assets/signatures/<slug>.png` |
| Logo, signature, background photos | `src/lib/assets/brand/` |
| Tower photo with the slogan (one per language) | `src/lib/assets/brand/tower-es.jpg`, `-it`, `-en`. Italian is the campaign design itself; Spanish and English are rebuilt in the same style by `scripts/slogan/make-tower-slogan.py` |
| Colors and fonts | `src/lib/styles/app.css` (brand colors are at the top) |
| Header, footer, menu | `src/routes/+layout.svelte` |
| Each page | `src/routes/<page>/+page.svelte` |
| Backend example (`/api/candidates`) | `src/routes/api/candidates/+server.js` |

Every piece of text is stored like `{ "es": "…", "it": "…", "en": "…" }`.
After editing, run `node scripts/check-translations.js` to catch any missing language.

Candidate quotes are word for word from the campaign materials in their original language
(`"original"` in `candidates.json`); the other two languages are translations.

## Language switch

The site opens in Spanish. A visitor's choice is kept while they browse and is reset on a new visit.
Links can force a language: add `?lang=it` or `?lang=en` to any address.

## Font

The style guide's font is Anantason, which isn't available for websites. Inter Tight stands in.
To switch once you have licensed web font files: put them in `static/fonts/`, add an `@font-face`
in `src/lib/styles/app.css`, and put its name first in `--font`.

## Put it online

1. Create a repository on github.com and upload this folder (skip `node_modules`).
2. On vercel.com: **Add New → Project**, import the repository, **Deploy**.
3. Every change pushed to the repository redeploys in about a minute.

## On a computer (optional)

```
npm install
npm run dev                  # http://localhost:5173
npm run build                # production build
npm run build:preview-page   # single-file preview copy in preview-page/index.html
```
