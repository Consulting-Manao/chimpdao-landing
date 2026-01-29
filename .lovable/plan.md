

# Update OG Image to Match NFT Collection Site

## Exact Specifications from chimpdao-nft Repository

From the live site screenshot and source code analysis:

### Background Styling (from `LandingPage.tsx` lines 57-67)
```tsx
// Main container
<div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">

// Pattern overlay
<div
  className="absolute inset-0 opacity-[0.08] pointer-events-none"
  style={{
    backgroundImage: 'url(/token-bg-pattern.png)',
    backgroundSize: '600px',
    backgroundRepeat: 'repeat'
  }}
/>
```

| Property | Exact Value |
|----------|-------------|
| Background color | `hsl(30 25% 32%)` = approximately #6B5D50 (warm brown/tan) |
| Pattern asset | `/token-bg-pattern.png` (the uploaded pixel-art pattern) |
| Pattern opacity | `0.08` (8%) |
| Pattern size | `600px` (repeating) |

### Logo Used
The site uses `chimp-joystick.png` (same as in the landing page footer) - the yellow square with the pixel-art hanger/joystick icon.

---

## Implementation Steps

### Step 1: Save the Pattern Asset
Copy the uploaded pixel-art pattern to the public folder:
```
user-uploads://Rectangle-2.png → public/token-bg-pattern.png
```

### Step 2: Regenerate OG Image
Create `public/og-image.png` with these exact specifications:

| Property | Value |
|----------|-------|
| Dimensions | 1200 x 630 (standard OG image) |
| Background | `hsl(30 25% 32%)` - warm brown/tan (#6B5D50) |
| Pattern | Pixel-art gaming icons at exactly 8% opacity, 600px tile size |
| Logo | `chimp-joystick.png` centered, prominent size (~120-150px) |
| Title | "ChimpDAO" in white/light cream, bold |
| Tagline | "NFC-Powered NFTs on Stellar" in muted white/gray |
| Glow | None or very subtle - the NFT site has no dramatic glow effects |

### Visual Reference
The OG image should match the warm, understated aesthetic of the NFT collection site:
- Brown background (NOT black)
- Subtle repeating pixel-art pattern barely visible
- Clean, professional look without dramatic glowing effects
- Same branding consistency as https://nft.chimpdao.xyz/

