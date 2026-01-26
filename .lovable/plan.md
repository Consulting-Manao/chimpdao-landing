

# Button Styling Fix - Remove Conflicting Size Prop

## Problem Identified

The `size="lg"` prop on the Button component adds its own styling that conflicts with the custom classes:

| Source | Applied Styles |
|--------|----------------|
| `size="lg"` prop | `h-11 px-8` (44px height, 32px padding) |
| Custom classes | `px-5 py-2.5` (20px padding, 10px vertical) |

The `h-11` (44px fixed height) is forcing the button to be tall regardless of the custom padding, creating the bulky appearance.

---

## Solution

Remove `size="lg"` from both buttons and rely purely on custom styling for precise control.

### File: `src/components/HeroSection.tsx`

**Shop Merch Button (line 92-94)**

```tsx
// FROM:
<Button
  asChild
  size="lg"
  className="text-base px-5 py-2.5 min-w-[180px] ..."
>

// TO:
<Button
  asChild
  className="text-base px-5 py-2.5 min-w-[180px] ..."
>
```

**View NFT Gallery Button (line 108-110)**

```tsx
// FROM:
<Button
  asChild
  size="lg"
  className="text-base px-5 py-2.5 min-w-[180px] ..."
>

// TO:
<Button
  asChild
  className="text-base px-5 py-2.5 min-w-[180px] ..."
>
```

---

## Expected Result

| Property | Before (with size="lg") | After (custom only) |
|----------|-------------------------|---------------------|
| Height | 44px (forced by h-11) | ~40px (natural from py-2.5) |
| Horizontal padding | Conflicting px-8 + px-5 | Clean 20px (px-5) |
| Overall look | Bulky, mismatched | Compact like Apple badge |

The buttons will now match the Apple App Store badge proportions with no conflicting styles.

