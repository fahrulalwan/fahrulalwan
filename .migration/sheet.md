# sheet

2026-07-23 — transformation engine (legacy `new-york` style). Radix `@radix-ui/react-dialog` → `@base-ui/react/dialog`. VERDICT: migrated; build passes.

## Changed

- `src/components/ui/sheet.tsx`
  - Import `import * as SheetPrimitive from '@radix-ui/react-dialog'` → `import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'` (namespace `* as` → named alias, one subpath). Removed `import * as React` (was only used for `forwardRef`/types); added `import type { HTMLAttributes } from 'react'` for the plain `SheetHeader`/`SheetFooter` div wrappers.
  - Part renames: `Overlay` → `Backdrop`, `Content` → `Popup`. Root/Trigger/Close/Portal/Title/Description unchanged. A sheet is an edge-anchored dialog: positioning is done entirely by the `fixed inset-y-0 right-0 …` cva classes, so **no `Positioner`** is introduced (same as centered modals — dialog has no Positioner part at all).
  - Dropped `React.forwardRef` on every part → plain function components typed with Base UI part props (`SheetPrimitive.Backdrop.Props`, `.Popup.Props`, `.Title.Props`, `.Description.Props`). No consumer passes a ref to a Sheet part, so this is safe and matches the Base UI registry shape. `React.ComponentPropsWithoutRef<typeof …>` → `….Props`.
  - **Animation rewrite (class-mapping.md idiom)** — `animate-in`/`animate-out` keyframe utilities → Base UI transition + `data-starting-style:` / `data-ending-style:`:
    - Overlay/Backdrop: `data-[state=open]:animate-in data-[state=closed]:animate-out …fade-…` → `transition-opacity duration-300 data-starting-style:opacity-0 data-ending-style:opacity-0`.
    - `sheetVariants`: `transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 …animate-in/out` → `transition ease-in-out data-starting-style:duration-500 data-ending-style:duration-300` (enter 500ms / exit 300ms preserved). Per-side `slide-in-from-*`/`slide-out-to-*` → `data-starting-style:{±translate}` + `data-ending-style:{±translate}` (right → `translate-x-full`, left → `-translate-x-full`, top → `-translate-y-full`, bottom → `translate-y-full`), keeping the `side` parameterization.
    - Close button: `data-[state=open]:bg-secondary` → `data-open:bg-secondary` (class-mapping table).
  - `SheetHeader`/`SheetFooter`/`SheetTitle`/`SheetDescription` layout classes unchanged; only types/refs updated.
- Leftover scan CLEAN: `grep -n "radix-ui\|@radix-ui" src/components/ui/sheet.tsx` → 0 hits.

## Left alone

- `lucide-react` `X` icon in the Close button — not radix, unchanged.
- `SheetHeader`/`SheetFooter` are plain `<div>` helpers (never radix) — logic untouched, only the `HTMLAttributes` import source changed.

## Behavior changes

- **Enter/exit animation is now transition-based, not keyframe-based.** The slide+fade reads the same (500ms in / 300ms out, slide from the anchored edge), but the exact easing curve of `tailwindcss-animate`'s `slide-in-from-right` keyframes is replaced by a CSS `transition` on `translate`/`opacity`. Visually equivalent; pixel-identical timing is not guaranteed. FLAGGED, not patched.
- **`onOpenChange` signature widened** (Base UI adds a second `eventDetails` arg) and Radix dismiss callbacks (`onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`) are gone — replaced by `onOpenChange(open, eventDetails)` + `eventDetails.reason`/`.cancel()`. The wrapper does not surface any of these and no consumer uses them, so nothing to change. `onOpenAutoFocus`/`onCloseAutoFocus` → Popup `initialFocus`/`finalFocus` (also unused here).
- Focus return: Base UI Dialog restores focus to the trigger on close by default (`finalFocus`), matching Radix. No change needed.

## Verify by hand

- Resize to mobile (`md` breakpoint), tap the hamburger → sheet slides in from the right, backdrop fades in.
- Press `Esc` or click the backdrop → sheet slides out; **focus returns to the hamburger trigger** (keyboard focus ring reappears on it).
- Tab through the sheet — focus is trapped inside while open (modal); the Close (X) button is reachable and closes on Enter.
- Confirm the `sr-only` "Navigation menu" title + "Close" label are present for screen readers (no visual regression).
