# Portfolio Website - AI Documentation

> **Complete context for AI assistants working on this project**

## Project Overview

**Type:** Single-page React developer portfolio  
**Stack:** React 18.3.1 + Vite 6.0.3 + Tailwind CSS 3.4.17  
**Status:** Production-ready  
**Deployment:** GitHub Pages with automatic deployment via GitHub Actions

## Architecture

### Component Structure

```
src/components/
├── About/              # About section
│   ├── AboutSection.jsx    - Main about component with bio, stats, contact
│   ├── PhilosophyCard.jsx  - Philosophy statement cards
│   └── StatsCard.jsx       - 3D animated stats cards
├── Career/             # Career timeline
│   ├── CareerTimeline.jsx  - Timeline with alternating layout
│   └── TimelineCard.jsx    - Expandable career cards
├── Hero/               # Hero section
│   ├── FloatingCodeBlocks.jsx - Animated code snippets
│   └── HeroSection.jsx     - Full hero with stats, CTAs
├── Projects/           # Project gallery
│   ├── ProjectCard.jsx     - 3D project cards
│   ├── ProjectGallery.jsx  - Filterable gallery
│   └── ProjectModal.jsx    - Full-screen project details
├── Shared/             # Reusable components
│   ├── Navigation.jsx      - Fixed nav with mobile menu
│   ├── ScrollProgress.jsx  - Top scroll progress bar
│   ├── ThemeSwitcher.jsx   - Color theme switcher
│   └── ThreeDCard.jsx      - Reusable 3D perspective card
└── Skills/             # Skills section
    ├── SkillBar.jsx        - Animated progress bars
    └── SkillsSection.jsx   - Category tabs with skills
```

### Custom Hooks

| Hook | Purpose |
|------|---------|
| `useTheme` | Theme management with localStorage persistence |
| `useScrollProgress` | Scroll progress tracking (0-1) |
| `useSmoothScroll` | Smooth scroll navigation |
| `useIntersectionObserver` | Entrance animations |
| `useReducedMotion` | Respects user motion preferences |

### Data Files

All content is stored in `src/data/`:

- `about.js` - Bio, statistics, philosophy, contact
- `career.js` - Career positions with achievements
- `projects.js` - Featured projects with full details
- `skills.js` - Skill categories with proficiency levels

## Key Patterns

### Lazy Loading

Below-fold sections are lazy loaded:

```jsx
const CareerTimeline = lazy(() => import('./components/Career/CareerTimeline'))
```

### Theme System

Three color themes stored in constants:
- Purple/Indigo (default)
- Teal/Emerald
- Amber/Orange

Theme persisted to localStorage and applied via CSS classes.

### 3D Card Effect

`ThreeDCard` component provides perspective transforms on hover:
- Configurable intensity
- GPU-accelerated transforms
- Smooth transitions

### Glass Effect

Utility classes for glassmorphism:
- `.glass` - Light glass with backdrop blur
- `.glass-dark` - Dark glass variant

## Commands

```bash
npm run dev      # Start dev server on :5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## File Locations

| Purpose | Location |
|---------|----------|
| Entry point | `src/main.jsx` |
| Global styles | `src/index.css` |
| SEO/Meta | `index.html` |
| Build config | `vite.config.js` |
| Tailwind config | `tailwind.config.js` |
| Deployment | `.github/workflows/deploy.yml` |

## Accessibility Features

- Skip link to main content
- Focus visible styles
- Reduced motion CSS media query
- High contrast mode support
- ARIA labels on interactive elements
- Semantic HTML structure

## Performance Optimizations

- Lazy loading with Suspense
- Manual chunk splitting (react-vendor, icons)
- Terser minification with console drops
- Asset naming for caching
- Optimized dependency pre-bundling

## Common Tasks

### Add a new project

Edit `src/data/projects.js`:

```javascript
{
  id: 6,
  title: 'New Project',
  shortDescription: '...',
  longDescription: '...',
  technologies: ['...'],
  category: 'Full-Stack',
  features: ['...'],
  performanceMetrics: { ... },
  githubUrl: '...',
}
```

### Add a new skill category

Edit `src/data/skills.js`:

```javascript
{
  id: 'newcategory',
  name: 'New Category',
  icon: 'Code', // Lucide icon name
  skills: [
    { name: 'Skill', level: 90, description: '...' },
  ],
}
```

### Change theme colors

Edit `src/utils/constants.js`:

```javascript
export const THEMES = {
  custom: {
    name: 'Custom Theme',
    gradient: 'from-red-500 to-pink-500',
  },
}
```

## Deployment

Automatic deployment via GitHub Actions on push to `main`.

Manual deployment:
1. Run `npm run build`
2. Deploy `dist/` folder to any static host

For custom domains, update `vite.config.js`:
```javascript
base: '/', // Instead of '/portfolio-website/'
```

---

*Last updated: December 2025*

