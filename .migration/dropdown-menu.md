# dropdown-menu

2026-07-23 — transformation engine (legacy `new-york` style). Radix `@radix-ui/react-dropdown-menu` → `@base-ui/react/menu` (RENAMED family). `@radix-ui/react-icons` → `lucide-react`. VERDICT: migrated; build passes.

## Changed

- `src/components/ui/dropdown-menu.tsx`
  - Import `import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'` → `import { Menu as DropdownMenuPrimitive } from '@base-ui/react/menu'`. Added `'use client'` (the wrapper now composes interactive Base UI client primitives directly).
  - **Icons swapped to lucide** (radix-icons removed): `CheckIcon` → `Check`, `ChevronRightIcon` → `ChevronRight`, `DotFilledIcon` → `Circle` (rendered `size-2 fill-current` as the radio dot). `import type { HTMLAttributes }` kept for `DropdownMenuShortcut`; `ComponentProps` import dropped.
  - Part renames (menus.md ground truth): `Sub` → `SubmenuRoot`, `SubTrigger` → `SubmenuTrigger`, `Label` → `GroupLabel`, `ItemIndicator` → `CheckboxItemIndicator` (in CheckboxItem) / `RadioItemIndicator` (in RadioItem). Root/Trigger/Group/Portal/RadioGroup/Item/CheckboxItem/RadioItem/Separator unchanged in name.
  - **Content → `Portal > Positioner > Popup`.** `sideOffset` (default 4) + `align`/`alignOffset`/`side` are now typed via `Pick<…Positioner.Props, …>`, **destructured, and forwarded to `Positioner`** (the "Pick means FORWARD" rule — declare→destructure→forward, so `<DropdownMenuContent align="start">` from theme-toggle lands on the Positioner, not the Popup). Positioner: `className="isolate z-50 outline-none"`; Popup keeps `z-50 outline-none`.
  - **SubContent** rebuilt as a compose of the public `DropdownMenuContent` with the load-bearing submenu defaults `align="start" alignOffset={-3} side="right" sideOffset={0}` (+ `shadow-lg`), guaranteeing the `Portal > Positioner > Popup` shape inside the `SubmenuRoot` context.
  - **Animation rewrite** (class-mapping.md): the `data-[state=open]:animate-in …fade/zoom/slide` block on Content/SubContent → Base UI transition idiom on the Popup: `origin-(--transform-origin) transition-[opacity,transform] data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95` + per-side `data-[side=…]:data-starting-style:{±translate}` (restates the directional slide). `--radix-dropdown-menu-content-transform-origin` → `--transform-origin`.
  - **Highlight hook rewrite** (correctness): menu items are highlighted via `data-highlighted` in Base UI, not `:focus` (items are not DOM-focused). `focus:bg-accent focus:text-accent-foreground` → `data-highlighted:bg-accent data-highlighted:text-accent-foreground` on Item/CheckboxItem/RadioItem/SubmenuTrigger. Without this the keyboard-nav highlight would be dead.
  - **SubmenuTrigger open styling**: `data-[state=open]:bg-accent` → `data-popup-open:bg-accent data-popup-open:text-accent-foreground` (wrapper-shapes.md SubTrigger convention).
  - `data-disabled:pointer-events-none data-disabled:opacity-50` kept as-is (already Base-compatible). All export names preserved verbatim (15 exports unchanged).
- Leftover scan CLEAN: `grep -n "radix-ui\|@radix-ui" src/components/ui/dropdown-menu.tsx` → 0 hits.

## Left alone

- `lucide-react` is already a project dep; only the 3 `@radix-ui/react-icons` were replaced. No other icon library touched.
- `DropdownMenuShortcut` is a plain `<span>` helper (never radix) — unchanged.

## Behavior changes

- **`CheckboxItem` / `RadioItem` no longer close the menu on select.** Radix closed the menu on select by default; Base UI defaults `closeOnClick={false}` on both (verified: `MenuCheckboxItem` / `MenuRadioItem` `@default false`; `MenuItem` stays `@default true`). These two wrappers are exported but **not used anywhere in this project** (only `DropdownMenuItem`, which retains close-on-click, is consumed by theme-toggle). If a future caller adds a checkbox/radio item and wants Radix's close-on-select, pass `closeOnClick` explicitly. FLAGGED, not patched.
- **`DropdownMenuLabel` → Base `GroupLabel` is auto-associated with its parent `Group`.** Radix `Label` could float freely; Base `GroupLabel` wires `aria-labelledby` to the enclosing `DropdownMenuGroup`. Use Labels inside a `<DropdownMenuGroup>` for correct a11y. Not used in this project. FLAGGED.
- **`onOpenChange` / item `onSelect` signature changes** (Base adds `eventDetails`; `onSelect`→`onClick`+`closeOnClick`). `DropdownMenuItem onClick={() => setTheme(...)}` in theme-toggle is a plain DOM click handler and works unchanged (fires + closes the menu). Radix `dir` / collision props (`avoidCollisions`, `sticky`, `hideWhenDetached`) are dropped/renamed but none are used here.
- Radio dot glyph changed from radix `DotFilledIcon` to lucide `Circle` + `fill-current` — visually a filled dot, cosmetically near-identical. (Unused in project.)

## Verify by hand

- Click the theme toggle (Sun/Moon button) → menu opens, fades+scales in near the trigger, `align="start"` still left-aligns it under the button.
- Keyboard: focus the trigger, press Enter/Down → menu opens and the first item shows the accent **highlight background** (confirms the `:focus`→`data-highlighted` rewrite). Arrow Up/Down moves the highlight; type-ahead ("L"/"D"/"S") jumps to Light/Dark/System.
- Press Enter on an item → theme changes AND the menu closes (Item close-on-click intact). `Esc` closes without changing theme; focus returns to the trigger.
