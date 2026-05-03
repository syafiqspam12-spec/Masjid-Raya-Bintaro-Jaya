---
name: Sacred Geometry
colors:
  surface: '#f8faf8'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f2'
  surface-container: '#eceeec'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#3f4945'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#707975'
  outline-variant: '#bfc9c4'
  surface-tint: '#29695b'
  primary: '#00342b'
  on-primary: '#ffffff'
  primary-container: '#004d40'
  on-primary-container: '#7ebdac'
  inverse-primary: '#94d3c1'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#253028'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b463e'
  on-tertiary-container: '#a7b4a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#afefdd'
  primary-fixed-dim: '#94d3c1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#065043'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#d9e6da'
  tertiary-fixed-dim: '#bdcabe'
  on-tertiary-fixed: '#131e17'
  on-tertiary-fixed-variant: '#3e4a41'
  background: '#f8faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 48px
---

## Brand & Style

This design system is built to evoke a sense of serenity, reverence, and modern professionalism for the Masjid Raya Bintaro Jaya community. The brand personality is **Devout yet Progressive**, bridging the gap between sacred traditions and the digital age.

The visual direction follows a **Refined Minimalism** approach. It utilizes expansive white space to represent clarity and peace, while incorporating subtle geometric patterns inspired by Islamic art (Girih) to provide texture. The emotional response should be one of "Digital Tranquility"—reducing cognitive load so the user can focus on spiritual obligations, community news, and prayer.

## Colors

The palette is anchored by **Deep Emerald**, a color deeply rooted in Islamic tradition, representing life and paradise. We use a slightly more muted, professional emerald (#004D40) to ensure high legibility and a premium feel. 

**Metallic Gold** acts as the secondary accent, reserved for "Divine moments" such as current prayer time highlights, donation call-to-actions, or highlighting significant Sunnah dates. 

The background is a crisp **Off-White**, which prevents the starkness of pure hex white and reduces eye strain during night-time reading of the Quran or supplications.

## Typography

This design system utilizes **Manrope** as the primary typeface. Its geometric yet humanist qualities provide a balanced, modern look that remains highly readable across various screen sizes. 

For Arabic script (Quranic verses or Duas), use a high-contrast Naskh-style font to ensure classical beauty is preserved. When pairing English and Arabic, the Arabic should be sized 125% larger than the English counterpart to maintain visual optical balance. Headlines should be tight and authoritative, while body text maintains generous line height for a relaxed reading experience.

## Layout & Spacing

The layout utilizes a **Fixed Grid** system for mobile (4 columns) and a **Fluid Grid** for tablet/web (12 columns). We employ an 8px rhythmic scale to ensure consistent vertical flow. 

Emphasis is placed on "Breathable Containers." Cards and sections should have generous internal padding (minimum 20px) to mirror the architectural openness of a physical Masjid. Vertical stacks are used to prioritize information, such as the chronological order of prayer times.

## Elevation & Depth

Hierarchy is conveyed through **Tonal Layering** and **Soft Ambient Shadows**. 

Surface elevations are subtle; we avoid heavy dropshadows. Instead, we use 1px borders in a very light tint of the primary color (Emerald at 10% opacity) to define boundaries. For "active" elements like the current prayer card, a soft, diffused shadow with a hint of emerald (#004D40 at 8% opacity) is used to create a "lifting" effect, suggesting importance without breaking the minimalist aesthetic.

## Shapes

The shape language is **Rounded**, utilizing a 0.5rem (8px) base radius. This softens the interface, making it feel welcoming and communal. 

For specific ornamental containers (like the Prayer Time display or featured Hadith quotes), a "Modified Arch" shape can be used, where the top-left and top-right corners have a significantly larger radius (2rem) or a subtle pointed arch inspired by Islamic architecture.

## Components

### Buttons
- **Primary:** Solid Deep Emerald with White text. High-waisted (vertical padding 16px).
- **Secondary:** Outlined Emerald or Solid Gold for high-urgency community needs (e.g., "Zakat Now").

### Cards
Cards are the primary information carriers. They should use a white background with a subtle 1px border (#E0E0E0). Header sections within cards may use a light green tint (#E8F5E9) to differentiate sections.

### Prayer Time Tracker
A specialized component featuring a horizontal or vertical list where the "Active" time is highlighted using a Gold gradient border and a subtle glow effect.

### Input Fields
Clean, bottom-border only or fully enclosed with a 1px soft-gray border. The focus state must transition the border color to Emerald.

### Chips/Tags
Used for categorizing events (e.g., "Youth," "Study," "Charity"). Chips use semi-transparent versions of the primary color to keep the UI light.

### Progress Bars
Used for "Fundraising Goals" for mosque renovations. These should use the Gold accent color to signify the value and "preciousness" of the community's contribution.