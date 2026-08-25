# Mohammad Fahrul Alwan

Software engineering lead in Jakarta. I run the frontend team at Bareksa, an OJK-licensed investment platform with 2.5M+ investors. Before that: consulting, a telco, and a few years splicing fiber into villas in Bali.

**[fahrulalwan.vercel.app](https://fahrulalwan.vercel.app)** — three case studies, with the work behind them open where it can be.

[LinkedIn](https://linkedin.com/in/fahrulalwan) · [fahrulalwan@gmail.com](mailto:fahrulalwan@gmail.com)

---

### This repository

The site above. Next.js 16, React 19, TypeScript, Tailwind, deployed on Vercel.

Most decisions are explained in a comment next to the thing they govern rather than in a document. `src/content/case-studies/types.ts` is a fair place to start: it holds the block types a case study is written in, and the reasons each field is required or optional.

Seven checks block a merge: overall accessibility, overall SEO, colour contrast, heading order, page language, viewport, and cumulative layout shift. Performance only warns, on purpose — that score moves with how loaded the runner is, and a gate that fails at random is one people turn off. `lighthouserc.json` holds the line.

Released into the public domain under the [Unlicense](LICENSE).
