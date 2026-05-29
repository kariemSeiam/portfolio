import { useEffect, lazy, Suspense } from 'react'
import Navigation from './components/Shared/Navigation'
import ScrollProgress from './components/Shared/ScrollProgress'
import ThemeToggle from './components/Shared/ThemeToggle'
import HeroSection from './components/Hero/HeroSection'
import MetricsHub from './components/MetricsHub'
import PactSection from './components/PactSection'
import SystemDiagram from './components/SystemDiagram'
import BrainHubSearch from './components/BrainHubSearch'
import PortfolioTerminal from './components/Terminal/PortfolioTerminal'
import PactGate from './components/PactGate/PactGate'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme } from './hooks/useTheme'
import './styles/gate.css'

const CareerTimeline = lazy(() => import('./components/Career/CareerTimeline'))
const ProjectGallery = lazy(() => import('./components/Projects/ProjectGallery'))
const KariemDNA = lazy(() => import('./components/KariemDNA'))
const TheJourney = lazy(() => import('./components/TheJourney'))
const WhatIBelieve = lazy(() => import('./components/WhatIBelieve'))
const ThinkingAmplified = lazy(() => import('./components/ThinkingAmplified'))
const DecisionsLedger = lazy(() => import('./components/DecisionsLedger'))
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
 * Language Toggle Button — fixed position top-right
 */
function LangToggle() {
  const { lang, toggleLang } = useLanguage()
  return (
    <button
      onClick={toggleLang}
      className="lang-toggle-btn"
      aria-label={`Switch to ${lang === 'en' ? 'Arabic' : 'English'}`}
    >
      {lang === 'en' ? 'عربي' : 'English'}
    </button>
  )
}

/**
 * AppShell — Inner component that accesses language context
 */
function AppShell() {
  useSmoothScroll()
  const { theme } = useTheme()
  const { lang } = useLanguage()

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
        {lang === 'ar' ? 'تخطى إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {/* Pact Gate — first visit only */}
      <PactGate />

      {/* Portfolio Terminal — press / anywhere */}
      <PortfolioTerminal />

      {/* Navigation */}
      <Navigation />
      
      {/* Language toggle */}
      <LangToggle />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* ═══════════════════════════════════════════════════════════════════
          Main Content
          ═══════════════════════════════════════════════════════════════════ */}
      <main id="main-content" role="main">
        {/* Hero - The Gate */}
        <HeroSection />

        {/* Live Metrics - First proof: real numbers, no fluff */}
        <MetricsHub />

        {/* Thinking Amplified - How I think: PROMOTED to position 2 */}
        <Suspense fallback={<SectionLoader />}>
          <ThinkingAmplified />
        </Suspense>

        {/* Kariem DNA - 8 patterns proven by production */}
        <Suspense fallback={<SectionLoader />}>
          <KariemDNA />
        </Suspense>

        {/* Projects - The systems: 6 real production builds */}
        <Suspense fallback={<SectionLoader />}>
          <ProjectGallery />
        </Suspense>

        {/* System Architecture - Interactive diagram */}
        <SystemDiagram />

        {/* Decisions Ledger - Public decision documentation: PROMOTED */}
        <Suspense fallback={<SectionLoader />}>
          <DecisionsLedger />
        </Suspense>

        {/* Career Timeline - The arc */}
        <Suspense fallback={<SectionLoader />}>
          <CareerTimeline />
        </Suspense>

        {/* The Pact - Operating principles */}
        <PactSection />

        {/* BrainHub - Knowledge base search */}
        <BrainHubSearch />

        {/* The Journey - How it all connects */}
        <Suspense fallback={<SectionLoader />}>
          <TheJourney />
        </Suspense>

        {/* What I Believe - The actual principles */}
        <Suspense fallback={<SectionLoader />}>
          <WhatIBelieve />
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
            <span style={{ color: 'rgb(var(--navigator))' }}>Kariem Seiam</span>
            {lang === 'ar' ? ' — معمار أنظمة — القاهرة' : ' — Systems Architect — Cairo'}
          </p>
          <p className="mt-2 text-sm text-[rgb(var(--ink-tertiary))]">
            Geolink · Hvar-Hub · Taxiarab · Plumb · Areo · Hvar-Catalog
          </p>
          <p className="mt-4 font-mono text-xs" style={{ color: 'rgba(var(--ink-tertiary), 0.4)', letterSpacing: '0.08em' }}>
            {new Date().getFullYear()} · v3.0.0 · {lang === 'ar' ? 'أنظمة تتجاوز منشئيها' : 'systems that outlast their creator'}
          </p>
        </div>
      </footer>

      {/* Theme Toggle - Fixed position */}
      <ThemeToggle />
    </div>
  )
}

/**
 * App — Root component with LanguageProvider
 */
function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  )
}

export default App
