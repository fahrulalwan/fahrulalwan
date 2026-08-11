# Vendored fonts

Read at build time by `../opengraph-image.tsx` and never shipped to a visitor.

They are vendored because `ImageResponse` registers exactly one font when none
is passed — Geist at weight 400 — which appears nowhere on this site. Without
these, the link preview card would be typographically foreign to the page it
advertises. `next/font` cannot help here: it emits hashed WOFF2, and satori
reads TTF, OTF and WOFF only.

| File | Family | Licence |
|---|---|---|
| `Newsreader-Medium.ttf` | Newsreader 500 — the site's display face | SIL Open Font License 1.1 |
| `NotoSans-Regular.ttf` | Noto Sans 400 — the site's body face | SIL Open Font License 1.1 |

Both are redistributed under the OFL, which permits bundling provided the
licence travels with the files. Full text: https://openfontlicense.org

Fetched from Google Fonts 2026-08-11.
