# button

2026-07-23 — transformation engine (legacy `new-york` style, no base counterpart). VERDICT: migrated to the real `@base-ui/react/button` primitive; build passes.

## Changed

- `src/components/ui/button.tsx`
  - Import `import { Slot } from '@radix-ui/react-slot'` → `import { Button as ButtonPrimitive } from '@base-ui/react/button'` (the real Base UI Button primitive, per SKILL.md hard rule — NOT a hand-rolled `useRender`/`Slot` wrapper).
  - Removed the manual Slot idiom (`const Comp = asChild ? Slot : 'button'`). `ButtonPrimitive` renders `<button>` natively and supports the `render` prop for polymorphism, so `asChild` is dropped from the wrapper's public surface.
  - `interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps` → `export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>`. `ButtonPrimitive.Props` already carries native button attributes + `render` + `className` + `focusableWhenDisabled`, so all prior `<Button onClick/disabled/type/...>` call sites keep working.
  - `buttonVariants` cva definition + export preserved **verbatim** (all variant/size class strings unchanged). No class-mapping rewrites needed (no `data-[state=...]` hooks in this file).
  - `Button.displayName` preserved.
- Leftover scan CLEAN: `grep -n "radix-ui\|@radix-ui" src/components/ui/button.tsx` → 0 hits.

## Left alone

- Nothing else. `buttonVariants` is imported by other server/client components (Navbar, Hero, CTA) but those consume it as a class-string helper and needed no change — the wrapper NAME and its variant/size API are unchanged.
- No `<Button asChild>` exists anywhere in the codebase (`rg asChild src/` confirmed), so dropping `asChild` broke no call site.

## Behavior changes

- `asChild` removed from `ButtonProps`. If a FUTURE caller needs polymorphism (render Button as an `<a>`, etc.), use Base UI's `render` prop (`<Button render={<a href=... />}>`) instead of `asChild`. No current caller is affected.

## Verify by hand

- Click any `<Button>` (e.g. the "Say hi" CTA, the mobile-nav trigger, the theme toggle) — visual variants (default/outline/ghost/link) + sizes render identically.
- Keyboard: Tab to a Button, press Enter/Space — activates. `disabled` Button is skipped in tab order and shows `opacity-50`.
- Confirm focus-visible ring still appears on keyboard focus (`focus-visible:ring-1`).
