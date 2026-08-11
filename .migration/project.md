# project — whole-project Radix → Base UI migration

2026-07-23 · branch `feat/portfolio-refactor` · mode: **whole project** · strategy: **transformation engine** (legacy `new-york` style has no `base-new-york` counterpart, so wrappers keep their own classes; primitives rewired + class-mapping applied). VERDICT: complete — all Radix removed, build green, 0 wrappers remain on Radix.

## Scope

Radix lived in exactly 3 ui wrappers + 2 consumers (verified by `rg @radix-ui src/`). Dependency order followed leaf-first: **button → sheet → dropdown-menu**, then consumer sweep.

| File | Radix | Base UI | Report |
|---|---|---|---|
| `src/components/ui/button.tsx` | `@radix-ui/react-slot` | `@base-ui/react/button` (real primitive) | `button.md` |
| `src/components/ui/sheet.tsx` | `@radix-ui/react-dialog` | `@base-ui/react/dialog` | `sheet.md` |
| `src/components/ui/dropdown-menu.tsx` | `@radix-ui/react-dropdown-menu` + `@radix-ui/react-icons` | `@base-ui/react/menu` + `lucide-react` | `dropdown-menu.md` |

## Consumer sweep (consumer-props.md)

- `src/components/shared/mobile-nav.tsx` — `<SheetTrigger asChild><Button/></SheetTrigger>` → `<SheetTrigger render={<Button…>…</Button>} />`.
- `src/components/ui/theme-toggle.tsx` — `<DropdownMenuTrigger asChild><Button/></DropdownMenuTrigger>` → `<DropdownMenuTrigger render={<Button…>…</Button>} />`. Its `<DropdownMenuContent align="start">` + `<DropdownMenuItem onClick=…>` need no call-site change (align is forwarded to the Positioner inside the wrapper; onClick is a plain DOM handler).
- Full `rg asChild src/` = 0 remaining. No other consumers import the migrated wrappers (`Button` variant/size callers elsewhere are unaffected — the wrapper API is unchanged).

## Dependency swap

- Added: `@base-ui/react@^1.6.0` (the stable package — NOT the old `@base-ui-components/react` RC).
- Removed from `package.json`: `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-icons`, `@radix-ui/react-slot`.
- `bun.lock` updated (0 `@radix-ui` references remain). Stale orphaned `node_modules/@radix-ui/*` directories (not in the lockfile, left un-pruned by bun) were removed manually; build re-verified green afterward → confirms nothing transitively depends on Radix.
- Package manager: **bun** throughout (`bun add`/`bun remove`/`bun install`). Stray untracked `yarn.lock` left untouched as instructed (still `?? yarn.lock`).

## Build result

- **Baseline** (before any change): `bun run build` ✓ Compiled + TypeScript check passed, 14/14 static pages generated. No pre-existing failures.
- **Final** (Radix fully removed): `bun run build` ✓ Compiled in ~4s, TypeScript passed, 14/14 static pages generated. No new warnings or errors.
- Verification: `rg "@radix-ui|radix-ui" src/` → **0 hits**.

## ⚠️ FLAG — legacy style name (not fixed, by design)

`components.json` still reads `"style": "new-york"` (unprefixed legacy style; `iconLibrary: null`, `baseColor: zinc`). There is no `base-new-york` registry variant, so the style name was intentionally left as-is. **Consequence:** a future `bunx shadcn@latest add <component>` will deliver the **Radix** variant of that component, re-introducing Radix. The owner decides whether to (a) switch to a base-prefixed style, (b) hand-add + migrate new components, or (c) copy Base UI registry components manually. Do not treat the unchanged style name as a bug.

## Behavior deltas (consolidated — details per-component report)

- **sheet**: enter/exit animation is now transition-based (`data-starting-style`/`data-ending-style`) instead of keyframe `animate-in/out` — visually equivalent (500ms in / 300ms out, slide from edge), timing not pixel-identical.
- **dropdown-menu**: `CheckboxItem`/`RadioItem` default to `closeOnClick={false}` (Radix closed on select) — unused in this project; `GroupLabel` auto-associates to a parent `Group` — unused here. Menu-item highlight rewired from `:focus` to `data-highlighted` (correctness, keeps keyboard-nav highlight working).
- **button**: `asChild` dropped from the public API (use Base UI `render` for future polymorphism) — no current caller used it.

## Untouched / not applicable

- No cmdk / vaul / sonner / input-otp / react-day-picker / recharts in this project — nothing in the "never touch" list was present.
- No AspectRatio / Label-primitive / VisuallyHidden / Tooltip / Popover / Accordion / Select / Tabs etc. — the only Radix families present were slot, dialog, dropdown-menu, icons.

## Guessed / couldn't map

- None. Every mapping was verified against `node_modules/@base-ui/react/**/*.d.ts`: Button primitive props (`render`, `focusableWhenDisabled`), the `Dialog`/`Menu` namespace part exports (incl. `Menu.Separator` re-exported from the standalone Separator), Popup `initialFocus`/`finalFocus`, and the `closeOnClick` defaults (`Item` `@default true`, `CheckboxItem`/`RadioItem` `@default false`). No unresolved gaps.

## Derived status

**0 wrappers remain on Radix** (`rg @radix-ui src/components/ui` → empty).
