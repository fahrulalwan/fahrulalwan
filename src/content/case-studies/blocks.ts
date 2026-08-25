import type { Block, MetricBlock } from './types';

/**
 * Consecutive metric blocks render as one full-bleed band, so the renderer
 * needs them collapsed before it maps. Everything else passes through alone.
 */
export type RenderGroup =
  | { kind: 'metrics'; metrics: MetricBlock[] }
  | { kind: 'single'; block: Exclude<Block, MetricBlock> };

export const groupBlocks = (blocks: Block[]): RenderGroup[] => {
  const groups: RenderGroup[] = [];

  for (const block of blocks) {
    if (block.type === 'metric') {
      const last = groups.at(-1);
      if (last?.kind === 'metrics') {
        last.metrics.push(block);
      } else {
        groups.push({ kind: 'metrics', metrics: [block] });
      }
      continue;
    }
    groups.push({ kind: 'single', block });
  }

  return groups;
};

/**
 * ⛔ This exists because TypeScript will NOT catch an unhandled union member
 * on its own here, and an earlier draft assumed it would.
 *
 * React 19 types a function component's return as `ReactNode`, which includes
 * `undefined`, and this repo does not set `noImplicitReturns`. So a `switch`
 * with a missing case compiles clean and renders a blank space. Measured
 * against this repo's exact compiler options and React types on 2026-08-25.
 *
 * Passing the unhandled value into a `never` parameter is what actually fails
 * the build. Add an eleventh block type without a case, and this line is the
 * error.
 */
export const assertNever = (value: never): null => {
  void value;
  return null;
};
