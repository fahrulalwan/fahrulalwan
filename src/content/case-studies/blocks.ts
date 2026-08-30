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
 * ⛔ Do not delete as redundant. TypeScript will NOT catch a missing union case
 * here on its own: React 19 types a component's return as `ReactNode`, which
 * includes `undefined`, and this repo does not set `noImplicitReturns`, so a
 * `switch` with a gap compiles clean and renders blank. Passing the value into
 * a `never` parameter is what actually fails the build.
 */
export const assertNever = (value: never): null => {
  void value;
  return null;
};
