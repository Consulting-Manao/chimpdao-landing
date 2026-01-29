

# Adjust Glow Effects and Purple Button Styling

## Current vs. Target Comparison

| Element | Current (Landing) | Target (NFT Site) |
|---------|-------------------|-------------------|
| Text glow | Heavy text-shadow with multiple yellow layers | NO text-shadow - just pure white color |
| Yellow button glow | Heavy multi-layer box-shadow on hover | Subtle single-layer yellow glow |
| Purple button | Purple bg/text/border with purple glow effect | Not used in NFT site - should use subtle styling |

## Changes Required

### 1. Update `src/index.css` - Remove Heavy Glow Effects

**Text glow class (lines 115-120):**
- Current: Heavy text-shadow with 10px and 20px blur
- Target: Pure white color, no glow (matching NFT site style)

```css
/* Before */
.text-glow {
  text-shadow: 
    0 0 10px hsl(var(--chimp-yellow) / 0.5),
    0 0 20px hsl(var(--chimp-yellow) / 0.3);
}

/* After */
.text-glow {
  color: hsl(0 0% 100%);
}
```

**Electric glow classes (lines 86-105):**
- Current: Heavy multi-layer box-shadows
- Target: Subtle, single-layer yellow glow matching NFT site's card hover effect

```css
/* Before */
.electric-glow-hover:hover {
  box-shadow: 
    0 0 25px hsl(var(--chimp-yellow) / 0.5),
    0 0 50px hsl(var(--chimp-yellow) / 0.3),
    0 0 75px hsl(var(--chimp-yellow) / 0.2);
}

/* After - matching NFT site glass-card-hover */
.electric-glow-hover:hover {
  box-shadow:
    0 20px 40px -10px hsl(var(--chimp-yellow) / 0.25),
    0 0 30px 0 hsl(var(--chimp-yellow) / 0.1);
}
```

**Remove purple glow entirely or make it subtle:**
```css
/* After - subtle or removed */
.electric-glow-purple:hover {
  box-shadow:
    0 20px 40px -10px hsl(var(--chimp-purple) / 0.2),
    0 0 20px 0 hsl(var(--chimp-purple) / 0.08);
}
```

### 2. Update `src/components/HeroSection.tsx` - Restyle Purple Button

**Current purple button (lines 107-120):**
```tsx
<Button
  className="... bg-chimp-purple/20 text-chimp-purple border border-chimp-purple/50 ... electric-glow-purple ..."
>
```

**Updated styling - cleaner, less aggressive:**
- Use more subtle purple transparency
- Remove the heavy border
- Use the softer glow effect
- Match the professional aesthetic of NFT site

```tsx
<Button
  className="h-[60px] px-4 rounded-xl bg-[hsl(270_100%_60%/0.12)] text-[hsl(270_100%_75%)] border border-[hsl(270_100%_60%/0.25)] hover:bg-[hsl(270_100%_60%/0.18)] hover:border-[hsl(270_100%_60%/0.35)] transition-all duration-300"
>
```

## Summary of Visual Changes

1. **Yellow "Shop Merch" button**: Subtle yellow glow on hover instead of aggressive radiating effect
2. **Purple "NFT Collection" button**: Softer purple styling, less saturated, no heavy glow
3. **Headline text**: Clean white color instead of yellow glow bleeding effect
4. **Overall feel**: Cleaner, more professional - matching the polished NFT collection site

