import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, Code2, Briefcase, FolderOpen, Zap, User } from 'lucide-react'
import { NAV_SECTIONS } from '../../utils/constants'
import { scrollToSection } from '../../utils/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Navigation - The Navigator's Compass
 * 
 * A floating, minimal navigation that guides visitors through
 * the portfolio journey. Elegant, unobtrusive, always accessible.
 */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Icon mapping for each section
  const sectionIcons = {
    hero: Code2,
    career: Briefcase,
    projects: FolderOpen,
    skills: Zap,
    about: User,
  }

  // Get current section icon
  const CurrentIcon = sectionIcons[activeSection] || Code2

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for nav background
      setIsScrolled(window.scrollY > 50)
      
      // Show nav after initial scroll
      if (window.scrollY > 100) {
        setIsVisible(true)
      }

      // Find active section
      const sections = NAV_SECTIONS.map(section => section.id)
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Initial visibility
    setTimeout(() => setIsVisible(true), 1000)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (sectionId) => {
    setIsOpen(false)
    scrollToSection(sectionId, 80)
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          Main Navigation Bar
          ═══════════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out-expo ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4'
        } ${
          prefersReducedMotion ? '' : 'transition-all'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={`nav-glass rounded-full px-2 py-2 transition-all duration-300 ${
          isScrolled ? 'shadow-soft-lg' : 'shadow-soft-sm'
        }`}>
          <div className="flex items-center gap-1">
            {/* Dynamic Icon Button - Shows current section icon */}
            <button
              onClick={() => handleNavClick(activeSection)}
              className="nav-icon-button px-4 py-2 rounded-full font-display font-bold text-sm transition-all duration-300 relative"
              style={{
                background: 'linear-gradient(135deg, rgb(var(--navigator)), rgb(var(--navigator-dark)))',
                color: 'white',
                boxShadow: '0 4px 15px rgba(var(--navigator), 0.3)'
              }}
              aria-current="page"
              title={`Current section: ${NAV_SECTIONS.find(s => s.id === activeSection)?.label || 'Home'}`}
            >
              <div className="nav-icon-wrapper relative inline-flex items-center justify-center">
                <CurrentIcon 
                  key={activeSection}
                  size={18} 
                  className="nav-icon"
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_SECTIONS.filter(s => s.id !== 'hero').map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div 
              className="hidden md:flex items-center gap-1 ml-2 pl-2"
              style={{ borderLeft: '1px solid rgba(var(--border-primary), 0.3)' }}
            >
              <a
                href="https://github.com/kariemSeiam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-colors duration-300"
                style={{ color: 'rgb(var(--ink-tertiary))' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgb(var(--navigator))'
                  e.currentTarget.style.backgroundColor = 'rgba(var(--navigator), 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(var(--ink-tertiary))'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full transition-colors duration-300"
              style={{ color: 'rgb(var(--ink-primary))' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          Mobile Menu - The Navigator's Atlas
          Masterpiece design matching portfolio's design language
          ═══════════════════════════════════════════════════════════════════ */}
      {/* Transparent backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 md:hidden ${
          isOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
        style={{
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          willChange: 'opacity, transform',
          transform: isOpen ? 'translate(-50%, 0) translateZ(0)' : 'translate(-50%, -2rem) translateZ(0)'
        }}
        aria-hidden={!isOpen}
      >
        {/* Main Container - Clean and minimal */}
        <div 
          className="relative overflow-hidden"
          style={{
            width: 'min(380px, calc(100vw - 2rem))',
            minWidth: '320px',
            willChange: isOpen ? 'auto' : 'transform',
            transform: isOpen ? 'translateZ(0) scale(1)' : 'translateZ(0) scale(0.98)',
            backfaceVisibility: 'hidden',
            transition: 'transform 0.2s ease-out',
            // Solid background with glass effect overlay
            background: 'rgb(var(--card-bg))',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            // Card styling
            borderRadius: '2rem',
            border: '1px solid rgba(var(--border-primary), 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Navigation Items - Using Card System from Portfolio */}
          <div className="p-4 space-y-2">
            {NAV_SECTIONS.map((section) => {
              const Icon = sectionIcons[section.id] || Code2
              const isActive = activeSection === section.id
              
              // Color schemes for each card type
              const colorSchemes = {
                'hero': { 
                  main: 'navigator', 
                  bg: 'rgba(var(--card-bg-elevated), 0.6)',
                  hoverBg: 'rgba(var(--navigator), 0.08)'
                },
                'career': { 
                  main: 'compass', 
                  bg: 'rgba(var(--card-bg-elevated), 0.6)',
                  hoverBg: 'rgba(var(--compass), 0.08)'
                },
                'projects': { 
                  main: 'horizon', 
                  bg: 'rgba(var(--card-bg-elevated), 0.6)',
                  hoverBg: 'rgba(var(--horizon), 0.08)'
                },
                'skills': { 
                  main: 'pathfinder', 
                  bg: 'rgba(var(--card-bg-elevated), 0.6)',
                  hoverBg: 'rgba(var(--pathfinder), 0.08)'
                },
                'about': { 
                  main: 'growth', 
                  bg: 'rgba(var(--card-bg-elevated), 0.6)',
                  hoverBg: 'rgba(var(--growth), 0.08)'
                },
              }
              
              const scheme = colorSchemes[section.id] || colorSchemes['hero']
              
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className="group relative w-full px-4 py-3 flex items-center gap-3 transition-all duration-300 rounded-xl overflow-hidden"
                  style={{
                    minHeight: '48px', // Touch target standard
                    backgroundColor: isActive 
                      ? `rgb(var(--${scheme.main}))`
                      : 'transparent',
                    color: isActive ? 'white' : 'rgb(var(--ink-primary))',
                    transform: isActive ? 'scale(1)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(var(--card-bg-elevated), 0.5)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Icon - Simple and clean */}
                  <Icon 
                    size={20} 
                    className="flex-shrink-0 transition-all duration-300"
                    style={{ 
                      color: isActive ? 'white' : `rgb(var(--ink-secondary))`,
                      opacity: isActive ? 1 : 0.7
                    }}
                  />
                  
                  {/* Label */}
                  <div className="flex-1 text-left min-w-0">
                    <p 
                      className={`text-base font-medium transition-colors ${
                        isActive ? 'font-semibold' : ''
                      }`}
                      style={{ 
                        color: isActive ? 'white' : 'rgb(var(--ink-primary))'
                      }}
                    >
                      {section.label}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Social Links - Enhanced Design */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-center gap-3">
              <SocialLink 
                href="https://github.com/kariemSeiam" 
                icon={<Github size={20} />} 
                label="GitHub"
                color="navigator"
              />
              <SocialLink 
                href="https://linkedin.com/in/kariemseiam" 
                icon={<Linkedin size={20} />} 
                label="LinkedIn"
                color="horizon"
              />
              <SocialLink 
                href="mailto:kariem.seiam@gmail.com" 
                icon={<Mail size={20} />} 
                label="Email"
                color="compass"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * SocialLink - Enhanced button design with color themes
 */
const SocialLink = ({ href, icon, label, color = 'navigator' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative group/social flex items-center justify-center p-3 rounded-xl transition-all duration-300"
    style={{
      minWidth: '48px', // Touch target standard
      minHeight: '48px', // Touch target standard
      backgroundColor: `rgba(var(--${color}), 0.08)`,
      border: `1.5px solid rgba(var(--${color}), 0.2)`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = `rgba(var(--${color}), 0.15)`
      e.currentTarget.style.borderColor = `rgba(var(--${color}), 0.4)`
      e.currentTarget.style.boxShadow = `0 4px 16px -2px rgba(var(--${color}), 0.3)`
      e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = `rgba(var(--${color}), 0.08)`
      e.currentTarget.style.borderColor = `rgba(var(--${color}), 0.2)`
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)'
      e.currentTarget.style.transform = 'scale(1) translateY(0)'
    }}
    aria-label={label}
  >
    <span 
      className="relative z-10 inline-flex transition-transform duration-300"
      style={{ color: `rgb(var(--${color}))` }}
    >
      {icon}
    </span>
    
    {/* Hover glow effect */}
    <div 
      className="absolute inset-0 rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{
        background: `radial-gradient(circle at center, rgba(var(--${color}), 0.15) 0%, transparent 70%)`,
      }}
    />
  </a>
)

export default Navigation
