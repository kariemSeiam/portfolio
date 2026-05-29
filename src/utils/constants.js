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
  { id: 'hero', label: 'Home', labelKey: 'nav.home' },
  { id: 'career', label: 'Journey', labelKey: 'nav.journey' },
  { id: 'metrics', label: 'Metrics', labelKey: 'nav.metrics' },
  { id: 'architecture', label: 'Systems', labelKey: 'nav.systems' },
  { id: 'projects', label: 'Projects', labelKey: 'nav.projects' },
  { id: 'knowledge', label: 'Knowledge', labelKey: 'nav.knowledge' },
  { id: 'philosophy', label: 'Philosophy', labelKey: 'nav.philosophy' },
  { id: 'skills', label: 'Skills', labelKey: 'nav.skills' },
  { id: 'about', label: 'About', labelKey: 'nav.about' },
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
