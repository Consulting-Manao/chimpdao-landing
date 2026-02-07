
## Add Discord Link to Footer

A simple update to the footer's social links array to include a Discord icon and link after the existing X/Twitter entry.

### What Changes

**File: `src/components/Footer.tsx`**

1. Add a Discord SVG icon component (similar to the existing `XIcon` custom component), since `lucide-react` does not include a Discord icon.
2. Add a new entry to the `socialLinks` array after the X link:
   - Label: "Discord"
   - URL: `https://discord.gg/Uvvk2kMtJw`
   - Icon: the new Discord SVG icon

The Discord icon will render in the same circular button style as the existing GitHub and X icons, maintaining visual consistency.

### Technical Details

- A new `DiscordIcon` component will be created using the standard Discord SVG path, following the same `forwardRef` pattern as the existing `XIcon`.
- The `socialLinks` array on line 15-18 will get a third entry for Discord.
- No new dependencies or assets are needed -- it's a pure SVG inline icon.
