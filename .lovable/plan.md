
# Updated Implementation Plan

## Overview

This plan addresses two updates:

1. **How It Works Section** - Add richer content explaining the NFC-NFT relationship, community access, and IP rights based on the terms documentation. Also fix the hover/illumination timing logic.

2. **Partnerships Section** - Create a 2-tier partnership section (Silverback for Public Drops, Bonobo for Private Collections) with sub-options. Remove any mention of royalties.

---

## Part 1: How It Works Section Enhancements

### 1.1 Enhanced Content

Based on the IP Rights & Licensing Guidelines, the current descriptions are too minimal. Here's the improved content:

**Current:**
```text
Step 1: "Buy NFC Merch" - "Get exclusive merch with embedded NFC chips"
Step 2: "Tap Your Phone" - "Scan the NFC chip with your smartphone"  
Step 3: "Reveal Your NFT" - "Claim your NFT on the Stellar blockchain"
```

**Enhanced:**
```text
Step 1: "Buy NFC Merch" - "Premium apparel with embedded NFC chips cryptographically bound to your NFT"
Step 2: "Tap & Verify" - "Scan the chip to authenticate ownership and access the Chimp app"
Step 3: "Claim Your NFT" - "Your NFT is minted on Stellar, permanently linked to your physical item"
```

**Add a subtitle** below the 3 steps explaining the key value proposition:

> "Each ChimpDAO NFT is inseparably linked to its physical item via tamper-proof NFC technology. Ownership transfers with the NFT, granting community access and commercial usage rights."

### 1.2 Fix Illumination/Hover Timing

The current implementation has a timing conflict where hover events can interfere with the initial scroll-triggered animation.

**Solution:** Add a cooldown period after the initial animation completes before allowing hover interactions:

```tsx
// New state to track animation cooldown
const [isAnimationCooldown, setIsAnimationCooldown] = useState(true);

// After initial animation completes, enable hover after 1.5s
useEffect(() => {
  if (hasPlayedInitial) {
    const timer = setTimeout(() => setIsAnimationCooldown(false), 1500);
    return () => clearTimeout(timer);
  }
}, [hasPlayedInitial]);

const handleHover = (index: number, hovered: boolean) => {
  if (isAnimationCooldown) return; // Skip during cooldown
  // ... existing logic
};
```

### 1.3 Fix Component Ref Warnings

Wrap `PCBTrace` and `Footer` with `React.forwardRef` to resolve console warnings about function components receiving refs.

---

## Part 2: Partnerships Section

### 2.1 Tier Structure

Two main tiers based on Public vs Private model:

| Tier | Name | Description |
|------|------|-------------|
| **Tier 1** | Silverback | Public Drops - Sold on Chi//mp Shop |
| **Tier 2** | Bonobo | Private Collection - B2B / Events / Internal Use |

### 2.2 Silverback (Public Drops) - 3 Sub-Options

| Sub-Option | Description | Value Share |
|------------|-------------|-------------|
| Full Service | Chi//mp designs & handles everything | 20% revenue / 10% units / hybrid |
| Partner-Designed | You provide design, we execute | 25% revenue / 15% units / hybrid |
| Curated Edition | Independent designer creates limited editions | 15% of net sales (NO royalties mentioned) |

### 2.3 Bonobo (Private Collection)

Single offering for B2B/events:
- Production & sourcing by Chi//mp
- Optional design service
- Fixed pricing based on quantity & materials
- No public sale

### 2.4 Visual Design

```text
+------------------------------------------------------------------+
|                      Partner With Us                              |
|     Premium merch drops, designed for the Stellar ecosystem       |
+------------------------------------------------------------------+

+-----------------------------------+  +-----------------------------------+
|           SILVERBACK              |  |            BONOBO                 |
|          Public Drops             |  |       Private Collection          |
|      Sold on Chi//mp Shop         |  |       B2B / Events / Teams        |
+-----------------------------------+  +-----------------------------------+
|                                   |  |                                   |
| Choose your collaboration model:  |  | Your merch, your usage            |
|                                   |  |                                   |
| ○ Full Service                    |  | • Production by Chi//mp           |
|   We design & handle everything   |  | • Optional design service         |
|   → 20% revenue or 10% units      |  | • Delivered to your destination   |
|                                   |  |                                   |
| ○ Partner-Designed                |  | Fixed pricing based on:           |
|   You design, we execute          |  | • Quantities                      |
|   → 25% revenue or 15% units      |  | • Materials & finishing           |
|                                   |  |                                   |
| ○ Curated Edition                 |  | Ideal for conferences, teams,     |
|   Artist-designed limited drops   |  | ambassador programs               |
|   → 15% of net sales              |  |                                   |
|                                   |  |                                   |
+-----------------------------------+  +-----------------------------------+

+------------------------------------------------------------------+
| Core Principles: Premium materials | Transparent costs |            |
| Professional fulfillment | NFC + NFT                                |
+------------------------------------------------------------------+

                  [ Let's Collaborate → ]
```

### 2.5 Core Principles Banner

Display the shared principles that apply to all offers:
- High-quality materials and finishing
- Transparent cost structure
- Professional logistics & fulfillment
- Web3 layer: NFC, NFT, on-chain features

### 2.6 Call-to-Action

"Let's Collaborate" button linking to `mailto:legal@consulting-manao.com`

---

## Files to Modify

| File | Action | Changes |
|------|--------|---------|
| `src/components/HowItWorksSection.tsx` | Modify | Enhanced step descriptions, add subtitle, add hover cooldown |
| `src/components/PCBTrace.tsx` | Modify | Wrap with `React.forwardRef` |
| `src/components/Footer.tsx` | Modify | Wrap with `React.forwardRef`, fix XIcon |
| `src/components/PartnershipsSection.tsx` | Create | New 2-tier partnership cards section |
| `src/pages/Index.tsx` | Modify | Add PartnershipsSection to lazy imports |

---

## Technical Details

### HowItWorksSection.tsx Changes

```tsx
const steps = [
  {
    image: tshirtMerch,
    title: "Buy NFC Merch",
    description: "Premium apparel with embedded NFC chips cryptographically bound to your NFT",
  },
  {
    image: nfcChip,
    title: "Tap & Verify",
    description: "Scan the chip to authenticate ownership and access the Chimp app",
  },
  {
    image: chimpLogo,
    title: "Claim Your NFT",
    description: "Your NFT is minted on Stellar, permanently linked to your physical item",
  },
];

// Add subtitle after the steps
const subtitle = "Each ChimpDAO NFT is inseparably linked to its physical item via tamper-proof NFC technology. Ownership transfers with the NFT, granting community access and commercial usage rights.";
```

### PartnershipsSection.tsx Structure

```tsx
const tiers = [
  {
    name: "Silverback",
    tagline: "Public Drops",
    description: "Sold on the Chi//mp Shop",
    highlighted: true,
    subOptions: [
      { 
        name: "Full Service", 
        description: "We design & handle everything",
        value: "20% revenue or 10% units" 
      },
      { 
        name: "Partner-Designed", 
        description: "You design, we execute",
        value: "25% revenue or 15% units" 
      },
      { 
        name: "Curated Edition", 
        description: "Artist-designed limited drops",
        value: "15% of net sales" // NO royalties
      },
    ]
  },
  {
    name: "Bonobo",
    tagline: "Private Collection",
    description: "B2B / Events / Internal Use",
    features: [
      "Production & sourcing by Chi//mp",
      "Optional design service",
      "Delivered to your destination"
    ],
    pricing: "Fixed pricing per project"
  }
];
```

### Styling Notes

- Dark card backgrounds consistent with existing theme
- Yellow accent border/glow for Silverback (highlighted tier)
- Staggered fade-in animation on scroll using `motion/react`
- Responsive: 2-column grid on desktop, stacked on mobile
- Hover states with subtle scale and glow effects
