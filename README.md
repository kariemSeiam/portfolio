# 🎨 Portfolio Website

> **Extraordinary Developer Portfolio - Production-Ready React Application**

An extraordinary, production-ready one-page React/JSX developer portfolio featuring cutting-edge visual techniques, 3D effects, glassmorphism, animated gradients, and flawless implementation.

[![Deploy to GitHub Pages](https://github.com/kariemSeiam/portfolio-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/kariemSeiam/portfolio-website/actions/workflows/deploy.yml)

## ✨ Features

- **Modern Design** - Dark theme with glassmorphism, 3D cards, and gradient effects
- **Responsive** - Mobile-first design that works on all devices
- **Accessible** - WCAG compliant with keyboard navigation and screen reader support
- **Performant** - Lazy loading, code splitting, optimized builds
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Theme Switching** - Multiple color themes with smooth transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kariemSeiam/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📐 Project Structure

```
portfolio-website/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
├── public/
│   └── favicon.svg           # Site favicon
├── src/
│   ├── components/
│   │   ├── About/            # About section components
│   │   ├── Career/           # Career timeline components
│   │   ├── Hero/             # Hero section components
│   │   ├── Projects/         # Project gallery components
│   │   ├── Shared/           # Shared/reusable components
│   │   └── Skills/           # Skills section components
│   ├── data/
│   │   ├── about.js          # About section content
│   │   ├── career.js         # Career history data
│   │   ├── projects.js       # Featured projects data
│   │   └── skills.js         # Technical skills data
│   ├── hooks/
│   │   ├── useIntersectionObserver.js
│   │   ├── useReducedMotion.js
│   │   ├── useScrollProgress.js
│   │   ├── useSmoothScroll.js
│   │   └── useTheme.js
│   ├── utils/
│   │   ├── animations.js     # Animation utilities
│   │   └── constants.js      # App constants
│   ├── App.jsx               # Main application
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point
├── index.html                # HTML template with SEO
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Sections

### Hero
- Animated gradient backgrounds
- Floating 3D code blocks
- Professional introduction
- Key statistics

### Career Journey
- Interactive timeline
- Expandable achievement cards
- 3D perspective effects

### Featured Projects
- Filterable project gallery
- Detailed project modals
- Technology badges
- Performance metrics

### Technical Expertise
- Category-based skill tabs
- Animated progress bars
- Proficiency indicators

### About Me
- Professional biography
- Statistics cards
- Philosophy statements
- Contact information

## 🛠️ Technology Stack

- **React 18.3.1** - Component-based UI
- **Vite 6.0.3** - Fast build tool
- **Tailwind CSS 3.4.17** - Utility-first styling
- **Lucide React** - Modern icons

## 🎯 Customization

### Update Content

Edit the data files in `src/data/`:

- `about.js` - Personal information, bio, statistics
- `career.js` - Work history and achievements
- `projects.js` - Featured projects
- `skills.js` - Technical skills by category

### Change Theme Colors

Edit `src/utils/constants.js` to modify color themes:

```javascript
export const THEMES = {
  purple: {
    name: 'Purple/Indigo',
    gradient: 'from-purple-500 to-indigo-500',
  },
  // Add custom themes
}
```

### Update SEO

Edit `index.html` to update:
- Page title and description
- Open Graph tags
- Twitter Card tags
- Structured data

## 🚀 Deployment

### GitHub Pages (Automatic)

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Site available at `https://username.github.io/portfolio-website/`

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to any static hosting
```

### Environment Variables

Update `vite.config.js` base path for custom domains:

```javascript
export default defineConfig({
  base: '/', // For custom domain
  // base: '/portfolio-website/', // For GitHub Pages subdirectory
})
```

## ♿ Accessibility

- Skip link for keyboard navigation
- ARIA labels on interactive elements
- Focus visible styles
- Reduced motion support
- High contrast mode support
- Semantic HTML structure

## 📈 Performance

- Lazy loading for below-fold sections
- Code splitting with manual chunks
- Optimized images and assets
- Compressed builds with Terser
- Efficient caching strategy

## 📝 License

Private project - All rights reserved.

---

**Built with React, Tailwind CSS, and passion.** ✨
