import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { 
  ArrowDown, ArrowRight, Layers, GitBranch, Cpu
} from 'lucide-react'
import { scrollToSection } from '../../utils/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * HeroSection - Kariem Seiam — Systems Architect
 * 
 * An architectural, cinematic hero with flowing geometric forms.
 * Inspired by maps, horizons, and the journey of navigation.
 */
const HeroSection = () => {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredOrbit, setHoveredOrbit] = useState(null)
  const [bootDone, setBootDone] = useState(prefersReducedMotion)

  // Gate boot sequence: show terminal output, then reveal
  useEffect(() => {
    if (prefersReducedMotion) {
      setBootDone(true)
      setIsLoaded(true)
      return
    }
    const bootTimer = setTimeout(() => setBootDone(true), 2500)
    const loadTimer = setTimeout(() => setIsLoaded(true), 100)
    return () => {
      clearTimeout(bootTimer)
      clearTimeout(loadTimer)
    }
  }, [prefersReducedMotion])

  // Smooth cursor tracking
  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    setMousePosition({ x, y })
  }, [prefersReducedMotion])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion) return
    
    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, prefersReducedMotion])

  // Dynamic parallax
  const getParallax = (intensity = 1) => {
    if (prefersReducedMotion) return {}
    const xOffset = (mousePosition.x - 0.5) * 30 * intensity
    const yOffset = (mousePosition.y - 0.5) * 30 * intensity
    return { transform: `translate(${xOffset}px, ${yOffset}px)` }
  }

  // Generate geometric shapes for the architectural background
  const geometricShapes = useMemo(() => {
    const shapes = []
    const types = ['diamond', 'triangle', 'line', 'hexagon']
    for (let i = 0; i < 12; i++) {
      shapes.push({
        type: types[i % types.length],
        x: 10 + (i % 4) * 25 + Math.random() * 10,
        y: 15 + Math.floor(i / 4) * 30 + Math.random() * 10,
        size: 20 + Math.random() * 40,
        delay: i * 0.3,
        duration: 20 + Math.random() * 15,
        rotation: Math.random() * 360,
      })
    }
    return shapes
  }, [])

  const bootLines = [
    '> Geolink API ........... 5.2M req/mo · 52 clients · live',
    '> Hvar-Hub .............. 79K lines · 4 machines · production',
    '> Taxiarab .............. Rider v4.4 · Driver v2.6 · 15K+ downloads',
    '> Systems online ........ Cairo → production',
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          GATE BOOT SEQUENCE — Terminal overlay before reveal
          ═══════════════════════════════════════════════════════════════════ */}
      {!bootDone && (
        <div className="gate-boot-sequence" aria-hidden="true">
          {bootLines.map((line, i) => (
            <div key={i} className="gate-boot-line" style={{ animationDelay: `${i * 0.4}s` }}>
              {line}
            </div>
          ))}
        </div>
      )}
      {/* ═══════════════════════════════════════════════════════════════════
          SYSTEM TOPOLOGY BACKGROUND — architecture made visible
          Precise, purposeful, not decorative
          ═══════════════════════════════════════════════════════════════════ */}
      
      {/* Base gradient - Pure & Clean */}
      <div className="absolute inset-0 hero-horizon-base" aria-hidden="true" />

      {/* Elegant geometric constellation - CSS styled */}
      <div 
        className="hero-constellation-art" 
        style={getParallax(0.08)}
        aria-hidden="true"
      >
        {/* Flowing curves */}
        <div className="hero-flow-line hero-flow-1" />
        <div className="hero-flow-line hero-flow-2" />
        <div className="hero-flow-line hero-flow-3" />
        
        {/* Accent nodes */}
        <div className="hero-node hero-node-1" />
        <div className="hero-node hero-node-2" />
        <div className="hero-node hero-node-3" />
        <div className="hero-node hero-node-4" />
        <div className="hero-node hero-node-5" />
      </div>

      {/* Floating accent orbs - artistic depth */}
      <div className="hero-orbs" aria-hidden="true">
        <div className="hero-orb hero-orb-1" style={getParallax(0.15)} />
        <div className="hero-orb hero-orb-2" style={getParallax(-0.1)} />
        <div className="hero-orb hero-orb-3" style={getParallax(0.12)} />
      </div>

      {/* Two signature icons - system topology */}
      <div 
        className="hero-signature-icon hero-signature-nav"
        style={getParallax(0.18)}
        aria-hidden="true"
      >
        <div className="hero-signature-glow" />
        <Layers size={80} strokeWidth={0.4} />
      </div>
      
      <div 
        className="hero-signature-icon hero-signature-code"
        style={getParallax(0.14)}
        aria-hidden="true"
      >
        <div className="hero-signature-glow" />
        <GitBranch size={70} strokeWidth={0.4} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN CONTENT - ULTRA MINIMAL
          ═══════════════════════════════════════════════════════════════════ */}
      {/* Hide main content during boot sequence */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20"
        style={{ opacity: bootDone ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <div className="text-center">
          
          {/* Status beacon */}
          <div 
            className={`inline-flex items-center gap-2.5 hero-beacon mb-6 sm:mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '200ms' }}
          >
            <span className="hero-beacon-pulse" />
            <span className="hero-beacon-text">Available for Collaboration</span>
          </div>

          {/* Identity marker */}
          <div 
            className={`hero-identity mb-4 sm:mb-6 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '400ms' }}
          >
            <span className="hero-identity-bracket">{'{'}</span>
            <span className="hero-identity-text">Systems Architect · Cairo</span>
            <span className="hero-identity-bracket">{'}'}</span>
          </div>

          {/* Ultra Display Name */}
          <div 
            className={`mb-6 sm:mb-8 transition-all duration-1200 ${
              isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '600ms' }}
          >
            <h1 className="hero-ultra-title">
              <span className="hero-ultra-name">Kariem</span>
              <span className="hero-ultra-accent">Seiam</span>
            </h1>
            {/* Underline accent */}
            <div className="hero-title-underline" />
          </div>

          {/* Role declaration */}
          <div 
            className={`hero-role mb-6 sm:mb-10 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '900ms' }}
          >
            <span className="hero-role-text">Infrastructure Builder</span>
            <span className="hero-role-divider">/</span>
            <span className="hero-role-text">Geolocation Specialist</span>
            <span className="hero-role-divider">/</span>
            <span className="hero-role-text">Arabic-Native Systems</span>
          </div>

          {/* Poetic tagline */}
          <p 
            className={`hero-poetry max-w-2xl mx-auto mb-8 sm:mb-12 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1100ms' }}
          >
            Production systems that<span className="hero-poetry-highlight"> outlast their creator</span>.
            Infrastructure that<span className="hero-poetry-highlight"> others build on</span>.
            Problems solved<span className="hero-poetry-highlight"> permanently</span>.
          </p>

          {/* Orbit Stats - Creative floating stats around center */}
          <div 
            className={`hero-orbit-stats mb-10 sm:mb-14 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1200ms' }}
          >
            <div className="hero-orbit-stats-ring">
              <OrbitStat 
                value="79K" 
                label="Lines in Production" 
                angle={-60}
                icon={<Layers size={14} />}
                isHovered={hoveredOrbit === 0}
                onHover={() => setHoveredOrbit(0)}
                onLeave={() => setHoveredOrbit(null)}
              />
              <OrbitStat 
                value="5.2M" 
                label="API Calls / Month" 
                angle={0}
                icon={<Cpu size={14} />}
                isHovered={hoveredOrbit === 1}
                onHover={() => setHoveredOrbit(1)}
                onLeave={() => setHoveredOrbit(null)}
              />
              <OrbitStat 
                value="56" 
                label="Atomic State Transitions" 
                angle={60}
                icon={<GitBranch size={14} />}
                isHovered={hoveredOrbit === 2}
                onHover={() => setHoveredOrbit(2)}
                onLeave={() => setHoveredOrbit(null)}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1400ms' }}
          >
            <button
              onClick={() => scrollToSection('projects', 80)}
              className="hero-cta-primary group"
            >
              <span className="hero-cta-glow" />
              <span className="hero-cta-text">Explore the Systems</span>
              <ArrowRight size={18} className="hero-cta-icon group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('thinking', 80)}
              className="hero-cta-secondary group"
            >
              <span className="hero-cta-secondary-ripple" />
              <span>How I Think</span>
              <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LIVE SYSTEM PULSE — bottom bar showing active production
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1800ms' }}
        aria-hidden="true"
      >
        <div className="hero-live-bar">
          <div className="hero-live-system">
            <span className="hero-live-dot" />
            <span className="hero-live-label">geolink-eg.com</span>
            <span className="hero-live-stat">5.2M req/mo</span>
          </div>
          <div className="hero-live-divider" />
          <div className="hero-live-system">
            <span className="hero-live-dot hero-live-dot-amber" />
            <span className="hero-live-label">mcrm.hvarstore.com</span>
            <span className="hero-live-stat">production</span>
          </div>
          <div className="hero-live-divider" />
          <div className="hero-live-system hero-live-hide-sm">
            <span className="hero-live-dot hero-live-dot-blue" />
            <span className="hero-live-label">taxiarab</span>
            <span className="hero-live-stat">15K+ downloads</span>
          </div>
        </div>
      </div>

      {/* Scroll hint — minimal */}
      <div 
        className={`absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isLoaded ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1700ms' }}
      >
        <button
          onClick={() => scrollToSection('metrics', 80)}
          className="hero-scroll-btn group"
          aria-label="Scroll to metrics"
        >
          <span className="hero-scroll-line" />
          <ArrowDown size={16} className="hero-scroll-arrow" />
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CORNER ACCENTS
          ═══════════════════════════════════════════════════════════════════ */}
      <CornerAccents isLoaded={isLoaded} prefersReducedMotion={prefersReducedMotion} />
    </section>
  )
}

/**
 * OrbitStat - Floating orbital statistic
 */
const OrbitStat = ({ value, label, angle, icon, isHovered, onHover, onLeave }) => {
  return (
    <div 
      className={`hero-orbit-stat ${isHovered ? 'hero-orbit-stat-active' : ''}`}
      style={{ '--angle': `${angle}deg` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="hero-orbit-stat-inner">
        <span className="hero-orbit-stat-icon">{icon}</span>
        <span className="hero-orbit-stat-value">{value}</span>
        <span className="hero-orbit-stat-label">{label}</span>
      </div>
    </div>
  )
}

/**
 * CornerAccents - Minimal corner decorations
 */
const CornerAccents = ({ isLoaded, prefersReducedMotion }) => (
  <>
    <div 
      className={`hero-corner hero-corner-tl transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1800ms' }}
      aria-hidden="true"
    >
      <div className="hero-corner-line hero-corner-line-h" />
      <div className="hero-corner-line hero-corner-line-v" />
      <div className="hero-corner-dot" />
    </div>
    <div 
      className={`hero-corner hero-corner-tr transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1900ms' }}
      aria-hidden="true"
    >
      <div className="hero-corner-line hero-corner-line-h" />
      <div className="hero-corner-line hero-corner-line-v" />
      <div className="hero-corner-dot" />
    </div>
    <div 
      className={`hero-corner hero-corner-bl transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : '2000ms' }}
      aria-hidden="true"
    >
      <div className="hero-corner-line hero-corner-line-h" />
      <div className="hero-corner-line hero-corner-line-v" />
      <div className="hero-corner-dot" />
    </div>
    <div 
      className={`hero-corner hero-corner-br transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : '2100ms' }}
      aria-hidden="true"
    >
      <div className="hero-corner-line hero-corner-line-h" />
      <div className="hero-corner-line hero-corner-line-v" />
      <div className="hero-corner-dot" />
    </div>
  </>
)

export default HeroSection
