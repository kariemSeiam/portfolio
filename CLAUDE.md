# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with code in this repository.

## Project Overview

**Kariem Seiam's Portfolio Website** - "The Navigator" themed production-ready React/JSX single-page application. Showcases a full-stack developer's work, skills, and career journey with a distinctive design inspired by desert sunsets, cosmic imagery, and navigation/exploration metaphors.

**Live URL**: https://kariemseiam.github.io/portfolio/

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | Component-based UI with hooks |
| Vite | 6.0.3 | Build tool and dev server |
| Tailwind CSS | 3.4.17 | Utility-first styling with extensive customizations |
| Lucide React | 0.469.0 | Icon library |
| ESLint | 9.39.1 | Code linting |

## Commands

```bash
npm run dev      # Start dev server (--host enabled, port 5173)
npm run build    # Production build with Terser minification
npm run preview  # Preview production build
npm run lint     # ESLint check (js, jsx files)
```

## Project Architecture

```
src/
├── components/              # React components by section
│   ├── About/
│   │   └── AboutSection.jsx
│   ├── Career/
│   │   ├── CareerTimeline.jsx
│   │   └── TimelineCard.jsx
│   ├── Hero/
│   │   └── HeroSection.jsx
│   ├── Projects/
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectGallery.jsx
│   │   └── ProjectModal.jsx
│   ├── Shared/
│   │   ├── Navigation.jsx
│   │   ├── NoiseOverlay.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── ThemeToggle.jsx
│   └── Skills/
│       ├── SkillBar.jsx
│       └── SkillsSection.jsx
├── data/                    # Content data files (edit to update site)
│   ├── about.js             # Bio, statistics, philosophy, journey
│   ├── career.js            # Work history (careerPositions array)
│   ├── projects.js          # Featured projects (featuredProjects array)
│   └── skills.js            # Skills by category (skillCategories array)
├── hooks/                   # Custom React hooks
│   ├── useIntersectionObserver.js  # Visibility detection
│   ├── useReducedMotion.js         # Motion preference detection
│   ├── useScrollProgress.js        # Scroll position tracking
│   ├── useSmoothScroll.js          # Smooth scroll behavior
│   └── useTheme.js                 # Dark/light theme management
├── utils/
│   ├── animations.js        # scrollToSection, isInViewport, debounce
│   └── constants.js         # NAV_SECTIONS, ANIMATIONS, BREAKPOINTS, SOCIAL_LINKS, SITE_CONFIG
├── App.jsx                  # Main app with lazy-loaded sections
├── index.css                # Global styles with CSS variables (very large file)
└── main.jsx                 # Entry point
```

## Key Conventions

### Component Patterns

1. **Lazy Loading**: Below-fold sections use `React.lazy()` for code splitting
   ```jsx
   const CareerTimeline = lazy(() => import('./components/Career/CareerTimeline'))
   ```

2. **Animation-Aware Components**: Use `useReducedMotion()` hook to respect user preferences
   ```jsx
   const prefersReducedMotion = useReducedMotion()
   if (prefersReducedMotion) return {}  // Skip animation
   ```

3. **Intersection Observer**: Use `useIntersectionObserver()` for scroll-triggered animations
   ```jsx
   const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
   ```

### Theming System

- **Theme Toggle**: `useTheme()` hook manages dark/light mode
- **Storage Key**: `localStorage.getItem('navigator-theme')`
- **CSS Class**: `dark` class on `<html>` element toggles themes
- **CSS Variables**: Defined in `index.css` under `:root` and `.dark`

**Core CSS Variables**:
```css
--canvas-primary      /* Background */
--ink-primary         /* Text */
--navigator           /* Primary accent (coral) */
--compass             /* Secondary accent (gold) */
--horizon             /* Tertiary accent (teal) */
--pathfinder          /* Code accent (indigo) */
--growth              /* Success accent (green) */
```

### Color System (Tailwind)

Custom color palettes in `tailwind.config.js`:
- `navigator` - Coral/sunset tones (primary brand color)
- `compass` - Gold/amber tones (guidance, CTAs)
- `horizon` - Teal tones (exploration, links)
- `pathfinder` - Blue/indigo (technical, code)
- `canvas` - Background shades
- `ink` - Text shades
- `cosmos` - Dark theme backgrounds

### CSS Class Naming

Custom component classes in `index.css`:
- `card-navigator`, `card-compass` - Card styles
- `tag-navigator`, `tag-horizon`, `tag-pathfinder` - Tag variants
- `hero-*` - Hero section elements
- `nav-*` - Navigation elements
- `section-badge` - Section header badges
- `text-body`, `text-title` - Typography utilities

### Data Structure Patterns

**Projects** (`src/data/projects.js`):
```js
{
  id: number,
  title: string,
  shortDescription: string,
  longDescription: string,
  technologies: string[],
  category: 'Full-Stack' | 'API Platform' | 'Mobile App' | 'Marketing Site',
  features: string[],
  performanceMetrics: { loadTime, bundleSize, lighthouseScore },
  liveDemoUrl: string | null,
  githubUrl: string,
  isPrivate: boolean,
  stars?: number
}
```

**Career** (`src/data/career.js`):
```js
{
  id: number,
  company: string,
  role: string,
  period: string,
  description: string,
  achievements: string[],
  isCurrent: boolean
}
```

**Skills** (`src/data/skills.js`):
```js
{
  id: string,
  name: string,
  icon: string,  // Lucide icon name
  skills: [{ name, level, description }]
}
```

## Build Configuration

### Vite Config (`vite.config.js`)

- **Base Path**: `/portfolio/` (GitHub Pages subdirectory)
- **Minification**: Terser with console/debugger removal
- **Compression**: Gzip + Brotli via `vite-plugin-compression`
- **Chunks**: Manual splitting for `react-vendor` and `icons`
- **Asset Naming**: Hash-based for cache busting

### GitHub Actions (`.github/workflows/deploy.yml`)

- Triggers on push to `main` or manual dispatch
- Node 18, npm ci, build, deploy to GitHub Pages
- Output in `dist/` folder

## Content Updates

To update site content, edit files in `src/data/`:

| File | Content |
|------|---------|
| `about.js` | Name, bio, statistics, philosophy, journey milestones |
| `career.js` | Work history positions and achievements |
| `projects.js` | Featured projects with details |
| `skills.js` | Technical skills organized by category |

## Accessibility

- Skip link: `<a href="#main-content" className="skip-link">`
- ARIA labels on all interactive elements
- `useReducedMotion()` respects `prefers-reduced-motion`
- Semantic HTML structure (`<main>`, `<nav>`, `<article>`, etc.)
- Keyboard navigation support (focusable elements, Enter key handlers)

## Performance Optimizations

1. **Lazy Loading**: Sections below fold are lazily loaded
2. **Code Splitting**: Manual chunks for vendor libraries
3. **Compression**: Gzip and Brotli compressed assets
4. **Console Removal**: Production builds strip console.log
5. **Font Preconnect**: Google Fonts and Fontshare preconnected
6. **Critical Font Preload**: Satoshi 900 weight preloaded

## SEO

- Complete meta tags in `index.html`
- Open Graph and Twitter Card support
- JSON-LD structured data (Person schema)
- Canonical URL configured
- Robots meta allowing indexing

## Important Notes

- **index.css is very large**: Contains extensive custom CSS. Read portions with offset/limit if needed.
- **Scrollbar hidden**: Custom CSS hides native scrollbars site-wide.
- **Fonts**: Satoshi (display), Plus Jakarta Sans (body), JetBrains Mono (code)
- **Animation library**: Custom keyframes in Tailwind config, no external animation library
