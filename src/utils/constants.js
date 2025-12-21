/**
 * Constants - The Navigator's Configuration
 * 
 * Central configuration for themes, navigation, and app-wide constants.
 */

// ═══════════════════════════════════════════════════════════════════════════
// Theme Constants
// ═══════════════════════════════════════════════════════════════════════════

export const LIGHT_THEME = 'light'
export const DARK_THEME = 'dark'
export const DEFAULT_THEME = LIGHT_THEME

// ═══════════════════════════════════════════════════════════════════════════
// Navigation Sections
// ═══════════════════════════════════════════════════════════════════════════

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'career', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
]

// ═══════════════════════════════════════════════════════════════════════════
// Animation Durations
// ═══════════════════════════════════════════════════════════════════════════

export const ANIMATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '800ms',
}

// ═══════════════════════════════════════════════════════════════════════════
// Breakpoints (matching Tailwind defaults)
// ═══════════════════════════════════════════════════════════════════════════

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// ═══════════════════════════════════════════════════════════════════════════
// Social Links
// ═══════════════════════════════════════════════════════════════════════════

export const SOCIAL_LINKS = {
  github: 'https://github.com/kariemSeiam',
  linkedin: 'https://linkedin.com/in/kariemseiam',
  email: 'kariem.seiam@gmail.com',
}

// ═══════════════════════════════════════════════════════════════════════════
// Site Metadata
// ═══════════════════════════════════════════════════════════════════════════

export const SITE_CONFIG = {
  name: 'Kariem Seiam',
  title: 'The Navigator',
  subtitle: 'Full-Stack Developer & Digital Architect',
  description: 'A developer who builds bridges between worlds.',
  url: 'https://kariemseiam.github.io/portfolio-website/',
}
