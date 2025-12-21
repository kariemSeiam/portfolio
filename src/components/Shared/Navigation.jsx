import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, Code2 } from 'lucide-react'
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
            {/* Logo / Home */}
            <button
              onClick={() => handleNavClick('hero')}
              className="px-4 py-2 rounded-full font-display font-bold text-sm transition-all duration-300"
              style={activeSection === 'hero' ? {
                background: 'linear-gradient(135deg, rgb(var(--navigator)), rgb(var(--navigator-dark)))',
                color: 'white',
                boxShadow: '0 4px 15px rgba(var(--navigator), 0.3)'
              } : {
                color: 'rgb(var(--ink-primary))'
              }}
              aria-current={activeSection === 'hero' ? 'page' : undefined}
            >
              <Code2 size={18} />
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
          Mobile Menu Overlay
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 backdrop-blur-xl"
          style={{ backgroundColor: 'rgba(var(--canvas-primary), 0.8)' }}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div 
          className={`absolute top-20 left-4 right-4 rounded-3xl p-6 shadow-soft-xl transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{
            backgroundColor: 'rgb(var(--card-bg))',
            border: '1px solid rgba(var(--border-primary), 0.3)'
          }}
        >
          {/* Navigation Links */}
          <div className="space-y-2 mb-6">
            {NAV_SECTIONS.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300"
                style={activeSection === section.id ? {
                  background: 'linear-gradient(135deg, rgb(var(--navigator)), rgb(var(--navigator-dark)))',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(var(--navigator), 0.3)'
                } : {
                  color: 'rgb(var(--ink-primary))'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--ink-primary), 0.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="divider mb-6" />

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <SocialLink 
              href="https://github.com/kariemSeiam" 
              icon={<Github size={20} />} 
              label="GitHub"
            />
            <SocialLink 
              href="https://linkedin.com/in/kariemseiam" 
              icon={<Linkedin size={20} />} 
              label="LinkedIn"
            />
            <SocialLink 
              href="mailto:kariem.seiam@gmail.com" 
              icon={<Mail size={20} />} 
              label="Email"
            />
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * SocialLink - Social media link with hover effect
 */
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-xl transition-all duration-300"
    style={{
      backgroundColor: 'rgba(var(--ink-primary), 0.05)',
      color: 'rgb(var(--ink-secondary))'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(var(--navigator), 0.1)'
      e.currentTarget.style.color = 'rgb(var(--navigator))'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(var(--ink-primary), 0.05)'
      e.currentTarget.style.color = 'rgb(var(--ink-secondary))'
    }}
    aria-label={label}
  >
    {icon}
  </a>
)

export default Navigation
