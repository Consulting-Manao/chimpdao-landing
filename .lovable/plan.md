

# Button Alignment Fix Plan

## Current Issues Identified

After reviewing the screenshot and code, I found these alignment inconsistencies:

1. **Conflicting alignment classes**: The buttons have `lg:justify-start` but are inside a centered container (`items-center text-center`), causing awkward positioning on larger screens
2. **Inconsistent button widths**: The two CTA buttons have different content lengths but no width constraints, causing visual imbalance
3. **App Store badge misalignment**: Has `lg:justify-start` which doesn't match the centered design intent

---

## Proposed Fix

### File: `src/components/HeroSection.tsx`

**Change 1: Remove conflicting `lg:justify-start` classes**

The hero section uses a centered layout throughout. The `lg:justify-start` classes create visual inconsistency on large screens.

```tsx
// CTA Buttons container (line 87)
// FROM:
className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"

// TO:
className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
```

```tsx
// App Store Badge (line 130)
// FROM:
className="flex justify-center lg:justify-start hover:opacity-80 transition-opacity"

// TO:
className="flex justify-center hover:opacity-80 transition-opacity"
```

**Change 2: Add consistent minimum width to buttons**

To ensure buttons appear visually balanced side-by-side:

```tsx
// Both Button components
// Add min-w-[200px] to ensure equal minimum width

// Shop Merch button:
className="text-lg px-8 py-6 min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90 electric-glow-hover transition-all duration-300"

// View NFT Gallery button:
className="text-lg px-8 py-6 min-w-[200px] bg-chimp-purple/20 text-chimp-purple border-2 border-chimp-purple/50 hover:bg-chimp-purple/30 hover:border-chimp-purple electric-glow-purple transition-all duration-300"
```

---

## Visual Result

| Screen Size | Current | After Fix |
|-------------|---------|-----------|
| Mobile | Buttons stacked, centered ✓ | Same ✓ |
| Tablet | Buttons side-by-side, centered | Buttons equal width, centered |
| Desktop | Buttons shifted left (awkward) | Buttons centered, equal width |

---

## Summary

- Remove `lg:justify-start` from both the button container and App Store badge to maintain consistent centering
- Add `min-w-[200px]` to both CTA buttons so they appear visually balanced
- Add `items-center` to the button flex container for proper vertical alignment

