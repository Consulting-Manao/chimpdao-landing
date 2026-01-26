
# Gorilla Sound Effect Implementation

## Overview

Add the cleaned gorilla chest-beating sound effect to the "Let's Collaborate" button in the Partnerships section.

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `public/sounds/gorilla-chest.m4a` | Create | Copy the cleaned audio file |
| `src/hooks/useSound.ts` | Create | Reusable sound hook using native Audio API |
| `src/components/PartnershipsSection.tsx` | Modify | Add sound playback on button click |

---

## Implementation Details

### 1. Copy Audio to Public Folder

Copy `user-uploads://gorilla_chest_post.m4a` to `public/sounds/gorilla-chest.m4a`

Using `public/` folder because audio files need to be loaded via URL at runtime, not bundled as ES modules.

### 2. Create Sound Hook

```typescript
// src/hooks/useSound.ts
import { useCallback, useRef } from 'react';

export const useSound = (src: string, volume = 0.7) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
    }
    
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Handle autoplay restrictions gracefully
    });
  }, [src, volume]);

  return { play };
};
```

### 3. Update PartnershipsSection

Add sound playback to the "Let's Collaborate" button:

```tsx
import { useSound } from '@/hooks/useSound';

// Inside component:
const { play: playGorillaSound } = useSound('/sounds/gorilla-chest.m4a', 0.6);

const handleCollaborateClick = () => {
  playGorillaSound();
};

// Button:
<a
  href="mailto:legal@consulting-manao.com"
  onClick={handleCollaborateClick}
  // ... existing classes
>
```

---

## Sound Behavior

| Aspect | Value |
|--------|-------|
| Trigger | Button click |
| Volume | 60% |
| Multiple clicks | Resets and replays |
| Mobile | Works after first user interaction |
| Loading | Lazy loaded on first play |
