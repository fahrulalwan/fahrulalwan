/**
 * One block is one thing on the page. A study is an ordered list of them.
 *
 * The checkable-versus-asserted split is what the model turns on: whether a
 * stranger can open the thing, or is being asked to take it on trust. A study
 * that carries nothing checkable has to say so on the page — which is what
 * `availability.note` with no `href` already does.
 */
export type Block =
  | HeadingBlock
  | ProseBlock
  | CodeBlock
  | ImageBlock
  | DiagramBlock
  | TrailBlock
  | MetricBlock
  | QuoteBlock
  | ReviewBlock
  | HandoffBlock;

/** Names what a section is about. Always renders h2 — there is no level. */
export interface HeadingBlock {
  type: 'heading';
  text: string;
}

/**
 * A paragraph. Asserted, unless `href` gives the reader somewhere to check.
 *
 * ⛔ `href` and `hrefLabel` travel together, enforced by the type rather than
 * by a comment. An earlier draft made both optional and wrote "Required
 * whenever `href` is set" above them; the renderer needs BOTH to draw a link,
 * so a block with `href` and no `hrefLabel` built green and rendered no link
 * at all — while the evidence assertion counted it as evidence. The study
 * advertised openable work and the reader could open nothing.
 */
export type ProseBlock = {
  type: 'prose';
  text: string;
} & (
  | { href?: undefined; hrefLabel?: undefined }
  | { href: string; hrefLabel: string }
);

/** A fragment with a caption. Only where a reader could open the source. */
export interface CodeBlock {
  type: 'code';
  language: string;
  source: string;
  caption: string;
  href: string;
}

/** A product shot. Asserted. */
export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** A drawn explanation. Asserted — the author drew it. */
export interface DiagramBlock {
  type: 'diagram';
  /** Inline SVG markup, authored in this repo. Never user input. */
  svg: string;
  alt: string;
  caption: string;
}

/** A dated sequence of moves. Not a commit quote. */
export interface TrailBlock {
  type: 'trail';
  steps: TrailStep[];
  /** Said out loud when the source cannot be opened. */
  note?: string;
}

export interface TrailStep {
  when: string;
  what: string;
  href?: string;
}

/**
 * A label, a measured value, and the context that makes it mean something.
 * If the value is not a measurement, it is not a metric.
 * Consecutive metric blocks render as one band.
 */
export interface MetricBlock {
  type: 'metric';
  label: string;
  value: string;
  context?: string;
  /** A link behind the number is what makes a metric checkable. */
  href?: string;
}

/** A verbatim line with its source. */
export interface QuoteBlock {
  type: 'quote';
  text: string;
  attribution: string;
  href?: string;
}

/**
 * A verbatim line from a code review, with the file it was left on.
 *
 * ⛔ `where` is a FILE PATH. Never a person, never a thread, never a
 * description. If the thing being quoted has no file path, it is not a
 * review — it is a `quote`, or a step in a `trail`.
 *
 * `onWhat` says what the change was, in neutral words, and never who wrote it.
 */
export interface ReviewBlock {
  type: 'review';
  text: string;
  where: string;
  onWhat: string;
  href: string;
}

/** Work written down and handed to someone. ⛔ No names — see ReviewBlock. */
export interface HandoffBlock {
  type: 'handoff';
  title: string;
  /** The scope as written, in his own words. */
  scope: string;
  href: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  context?: string;
}

export interface CaseStudy {
  slug: string;
  headline: string;
  tags: string[];
  year: string;

  /**
   * One sentence, at most 160 characters, no markup. Feeds the page's meta
   * description and its OpenGraph description.
   *
   * ⛔ Load-bearing on the CI gate, not just the page: `lighthouserc.json`
   * asserts `categories:seo` at ERROR with minScore 1, and a missing meta
   * description drops SEO below 100. Required for that reason — there is no
   * other field left for `page.tsx` to fall back to.
   */
  summary: string;

  /** The body. Every study is written as blocks; there is no other shape. */
  blocks: Block[];

  /**
   * Render only the fields that exist, and drop the row when none do.
   *
   * These were required, which forced a study to invent a role or a team size
   * where neither was recorded. A required field with no known value is an
   * invitation to make one up, and this project has done it once already.
   */
  metadata: {
    role?: string;
    timeline?: string;
    teamSize?: string;
  };

  /**
   * What a reader can actually do with this one, said plainly.
   *
   * `note` renders next to the card. `href` is present only when the work is
   * genuinely openable — its absence is the signal that this is described
   * rather than shown, which the page states out loud rather than hiding.
   *
   * Required on purpose: a new case study cannot be added without saying what
   * a stranger can verify about it.
   */
  availability: {
    note: string;
    href?: string;
  };
}
