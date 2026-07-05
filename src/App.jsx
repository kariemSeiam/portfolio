import { useEffect, lazy, Suspense } from 'react'
import Navigation from './components/Shared/Navigation'
import ScrollProgress from './components/Shared/ScrollProgress'
import ThemeToggle from './components/Shared/ThemeToggle'
import HeroSection from './components/Hero/HeroSection'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme } from './hooks/useTheme'

// Lazy load below-the-fold sections for performance
const CareerTimeline = lazy(() => import('./components/Career/CareerTimeline'))
const ProjectGallery = lazy(() => import('./components/Projects/ProjectGallery'))
const SkillsSection = lazy(() => import('./components/Skills/SkillsSection'))
const AboutSection = lazy(() => import('./components/About/AboutSection'))

/**
 * SectionLoader - Beautiful loading state for lazy sections
 */
const SectionLoader = () => (
  <div className="section flex items-center justify-center min-h-[50vh]">
    <div className="relative">
      {/* Outer ring */}
      <div 
        className="w-16 h-16 rounded-full"
        style={{ border: '4px solid rgba(var(--border-primary), 0.3)' }}
      />
      {/* Spinning arc */}
      <div 
        className="absolute inset-0 w-16 h-16 rounded-full animate-spin"
        style={{ 
          border: '4px solid transparent',
          borderTopColor: 'rgb(var(--navigator))'
        }}
      />
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: 'rgb(var(--navigator))' }}
        />
      </div>
    </div>
  </div>
)

/**
 * App - The Navigator's Portfolio
 * 
 * A masterpiece portfolio showcasing Kariem Seiam's journey
 * as a developer who builds bridges between worlds.
 */
function App() {
  useSmoothScroll()
  const { theme } = useTheme()

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden"
      style={{ 
        backgroundColor: 'rgb(var(--canvas-primary))',
        color: 'rgb(var(--ink-primary))'
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          Global UI Elements
          ═══════════════════════════════════════════════════════════════════ */}
      
      {/* Noise texture overlay for depth */}
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <Navigation />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* ═══════════════════════════════════════════════════════════════════
          Main Content
          ═══════════════════════════════════════════════════════════════════ */}
      <main id="main-content" role="main">
        {/* Hero - First impression */}
        <HeroSection />

        {/* Career Timeline - The journey */}
        <Suspense fallback={<SectionLoader />}>
          <CareerTimeline />
        </Suspense>

        {/* Projects - The work */}
        <Suspense fallback={<SectionLoader />}>
          <ProjectGallery />
        </Suspense>

        {/* Skills - The expertise */}
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>

        {/* About - The person */}
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          Footer
          ═══════════════════════════════════════════════════════════════════ */}
      <footer 
        className="relative py-16"
        style={{ borderTop: '1px solid rgba(var(--border-primary), 0.3)' }}
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-body">
            Crafted with{' '}
            <span style={{ color: 'rgb(var(--navigator))' }}>passion</span>
            {' '}and{' '}
            <span style={{ color: 'rgb(var(--compass))' }}>precision</span>
          </p>
          <p className="mt-2 text-sm text-[rgb(var(--ink-tertiary))]">
            © {new Date().getFullYear()} Kariem Seiam. All rights reserved.
          </p>
          <p className="mt-4 text-mono text-xs" style={{ color: 'rgba(var(--ink-tertiary), 0.6)' }}>
            v1.0.0 • The Navigator
          </p>
        </div>
      </footer>

      {/* Theme Toggle - Fixed position */}
      <ThemeToggle />
    </div>
  )
}

export default App
