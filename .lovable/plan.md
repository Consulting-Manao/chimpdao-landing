
# Exact Apple Badge Match - Clean Fix

## Problem Analysis

From the screenshot and code review:

| Element | App Store Badge | Current Buttons |
|---------|-----------------|-----------------|
| Height | 48px (h-12 class) | 40px (default h-10) |
| Icon size | ~17px (Apple logo) | 18px |
| Text size | ~13px | 16px (text-base) |
| Horizontal padding | ~12px | 20px (px-5) |
| Border radius | ~8px | 6px (rounded-md) |

The App Store badge is rendered at `h-12` (48px) on line 136. The buttons need to match this exactly.

---

## Solution

Remove all conflicting styles and match the Apple badge precisely.

### File: `src/components/HeroSection.tsx`

**Step 1: Match exact height to App Store badge (h-10 = 40px)**

The SVG is 40px tall, but it's being displayed at `h-12` (48px). We need to either:
- Make buttons 48px to match the displayed badge, OR
- Make the badge 40px and buttons 40px

I recommend making everything 40px (the Apple standard) for a cleaner look.

**Step 2: Match internal proportions exactly**

Apple badge internal layout:
- Icon: 17px x 17px
- Text: 13px (~text-xs)
- Horizontal padding: ~12px (px-3)
- Gap between icon and text: ~6px (gap-1.5)

**Changes to buttons (lines 92-120):**

```tsx
<Button
  asChild
  className="h-10 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 electric-glow-hover transition-all duration-300"
>
  <a
    href="https://shop.chimpdao.xyz"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5"
  >
    <img src={iconShop} alt="" className="w-[17px] h-[17px] object-contain" />
    <span className="text-[13px] font-medium">Shop Merch</span>
  </a>
</Button>

<Button
  asChild
  className="h-10 px-3 rounded-lg bg-chimp-purple/20 text-chimp-purple border border-chimp-purple/50 hover:bg-chimp-purple/30 hover:border-chimp-purple electric-glow-purple transition-all duration-300"
>
  <a
    href="https://nft.chimpdao.xyz"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5"
  >
    <img src={iconNft} alt="" className="w-[17px] h-[17px] object-contain" />
    <span className="text-[13px] font-medium">View NFT Gallery</span>
  </a>
</Button>
```

**Step 3: Match App Store badge height (line 136):**

```tsx
// FROM:
className="h-12"

// TO:
className="h-10"
```

---

## Exact Specifications Applied

| Property | Value | Matches Apple |
|----------|-------|---------------|
| Height | 40px (h-10) | Yes |
| Horizontal padding | 12px (px-3) | Yes |
| Icon size | 17px | Yes |
| Text size | 13px | Yes |
| Gap | 6px (gap-1.5) | Yes |
| Border radius | 8px (rounded-lg) | Yes |
| Border | 1px (changed from 2px) | Yes |

---

## Technical Notes

- Removed `min-w-[180px]` - let content dictate width naturally like Apple badge
- Changed `border-2` to `border` (1px) to match Apple's subtle border
- Changed `rounded-md` (6px) to `rounded-lg` (8px) to match Apple's radius
- Using explicit `text-[13px]` for precise font size control
- Icons set to exactly 17px to match Apple logo size
