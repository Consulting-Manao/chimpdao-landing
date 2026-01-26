
# Button Styling Refinement Plan

## Analysis

Comparing the Apple App Store badge to the current CTA buttons:

| Property | Apple Badge | Current CTAs |
|----------|------------|--------------|
| Height | ~40px | ~52px |
| Icon size | ~17px | 24px |
| Horizontal padding | ~12px | 32px (px-8) |
| Vertical padding | ~10px | 24px (py-6) |
| Text size | ~13px | 18px (text-lg) |

The current buttons are significantly bulkier than the Apple reference.

---

## Proposed Changes

### File: `src/components/HeroSection.tsx`

**1. Reduce button padding to match Apple proportions**

```tsx
// FROM:
className="text-lg px-8 py-6 min-w-[200px] ..."

// TO:
className="text-base px-5 py-2.5 min-w-[180px] ..."
```

- `px-8` (32px) → `px-5` (20px) - tighter horizontal padding
- `py-6` (24px) → `py-2.5` (10px) - matching Apple's vertical padding
- `text-lg` → `text-base` - slightly smaller text (16px vs 18px)
- `min-w-[200px]` → `min-w-[180px]` - slightly narrower minimum

**2. Reduce icon size to match Apple proportions**

```tsx
// FROM:
<img src={iconShop} alt="" width={24} height={24} className="w-6 h-6 object-contain" />

// TO:
<img src={iconShop} alt="" width={18} height={18} className="w-[18px] h-[18px] object-contain" />
```

- Icon: 24px → 18px (closer to Apple's ~17px icon)

**3. Reduce gap between icon and text**

```tsx
// FROM:
className="flex items-center gap-3"

// TO:
className="flex items-center gap-2"
```

- Gap: 12px → 8px for tighter spacing

---

## Visual Comparison

| Property | Before | After |
|----------|--------|-------|
| Button height | ~52px | ~40px |
| Icon size | 24px | 18px |
| Horizontal padding | 32px | 20px |
| Vertical padding | 24px | 10px |
| Text size | 18px | 16px |

---

## Summary

The buttons will be refined to match the compact, professional look of the Apple App Store badge while maintaining the brand colors and hover effects.
