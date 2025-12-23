import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { Mail, Github, Linkedin, ArrowRight, Compass, Navigation, Map, Layers, Anchor, Wind, Zap, Globe2, Sparkles, Terminal, Lightbulb, Target, Heart, FileText, MessageCircle, Phone, Facebook, Copy, Check } from 'lucide-react'
import { aboutContent } from '../../data/about'
import { scrollToSection } from '../../utils/animations'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import profileImage from '../../assets/images/profile.jpg'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * AboutSection - The Navigator's Atlas
 * 
 * A masterpiece profile section that tells the story of a developer
 * who builds bridges between worlds. Inspired by ancient maps,
 * navigation charts, and the journey from code to impact.
 * 
 * Design Philosophy:
 * - Every element tells a story
 * - Layers create depth and discovery
 * - Motion reveals meaning
 * - Geometry speaks architecture
 */
const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  const atlasRef = useRef(null)
  const [activeConstellation, setActiveConstellation] = useState(null)
  const [phoneCopied, setPhoneCopied] = useState(false)

  const socialIcons = { github: Github, linkedin: Linkedin, facebook: Facebook }

  // Format phone number for display (remove +2010, show only 01033939828)
  const displayPhone = useMemo(() => {
    const phone = aboutContent.contact.phone.replace(/\s/g, '')
    // Remove +2010 prefix to show only 01033939828
    if (phone.startsWith('+2010')) {
      return phone.replace('+2010', '010')
    }
    // Fallback: if starts with +2, replace with 0
    return phone.replace(/^\+2/, '0')
  }, [])

  // Copy phone number to clipboard (with +2010 prefix)
  const handleCopyPhone = useCallback(async () => {
    try {
      const phone = aboutContent.contact.phone.replace(/\s/g, '')
      // Ensure it starts with +2010
      const phoneToCopy = phone.startsWith('+2010') ? phone : phone.replace(/^\+2/, '+2010')
      await navigator.clipboard.writeText(phoneToCopy)
      setPhoneCopied(true)
      setTimeout(() => setPhoneCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy phone number:', err)
    }
  }, [])

  // Mouse tracking for parallax effects
  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !atlasRef.current) return
    
    const rect = atlasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    atlasRef.current.style.setProperty('--atlas-x', `${x * 100}%`)
    atlasRef.current.style.setProperty('--atlas-y', `${y * 100}%`)
  }, [prefersReducedMotion])

  useEffect(() => {
    const atlas = atlasRef.current
    if (!atlas || prefersReducedMotion) return

    atlas.addEventListener('mousemove', handleMouseMove)
    return () => atlas.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, prefersReducedMotion])

  // Developer DNA - The four core traits (stats-style)
  const developerDNA = useMemo(() => [
    { 
      id: 'builder', 
      value: '10+',
      label: 'Systems Built',
      color: 'navigator'
    },
    { 
      id: 'specialist', 
      value: '10+',
      label: 'Location Projects',
      color: 'compass'
    },
    { 
      id: 'localizer', 
      value: '100%',
      label: 'RTL Native',
      color: 'horizon'
    },
    { 
      id: 'producer', 
      value: '700',
      label: 'Avg Commits',
      color: 'pathfinder'
    }
  ], [])



  return (
    <section 
      id="about" 
      className="section relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Atmospheric Background */}
      <div className="absolute inset-0 about-atlas-atmosphere" aria-hidden="true" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ═══════════════════════════════════════════════════════════════════
            Section Header - The Navigator's Title
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={headerRef}
          className={`section-header ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">
            <Navigation size={16} />
            <span>About Me</span>
          </div>
          
          <h2 id="about-heading" className="text-section mb-4">
            <span className="text-[rgb(var(--ink-primary))]">The </span>
            <span className="gradient-text">Navigator</span>
          </h2>
          
          <p className="text-body-lg max-w-2xl mx-auto">
            A developer who builds bridges between worlds—
            code to impact, problems to solutions, ideas to reality.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            THE ATLAS - Main Profile Card
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={atlasRef}
          className={`about-atlas relative ${!prefersReducedMotion ? 'animate-on-scroll delay-2' : ''} ${headerVisible ? 'visible' : ''}`}
        >

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pr-6 pl-0 lg:pr-10 lg:pl-0">
            {/* gap-6 = 24px (8pt grid), gap-8 = 32px (8pt grid) */}
            
            {/* ═══════════════════════════════════════════════════════════════════
                Left Column - The Navigator's Profile
                ═══════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7">
              <div className="about-profile-masterpiece">
                
                {/* ═══════════════════════════════════════════════════════════════════
                    Profile Hero - Compact Horizontal Masterpiece
                    ═══════════════════════════════════════════════════════════════════ */}
                <div className="about-profile-hero-horizontal">
                  {/* Decorative Background */}
                  <div className="about-hero-horizontal-bg" aria-hidden="true">
                    <div className="about-hero-bg-gradient" />
                    <div className="about-hero-bg-pattern" />
                    <div className="about-hero-bg-shapes">
                      <div className="about-hero-bg-shape about-bg-shape-1" />
                      <div className="about-hero-bg-shape about-bg-shape-2" />
                    </div>
                  </div>

                  {/* Main Content - Horizontal Layout */}
                  <div className="about-hero-horizontal-content">
                    {/* Left: Avatar Section */}
                    <div className="about-hero-avatar-section">
                      <div className="about-hero-avatar-wrapper">
                        {/* Avatar with gradient border */}
                        <div className="about-hero-avatar-gradient-border">
                          <div className="about-hero-avatar-inner">
                            <img 
                              src={profileImage} 
                              alt="Kariem Seiam" 
                              className="about-hero-avatar-image"
                              loading="eager"
                            />
                          </div>
                          {/* Status Indicator */}
                          <div className="about-hero-status-dot" />
                        </div>
                      </div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="about-hero-info-section">
                      {/* Identity Marker - Navigator Badge */}
                      <div className="about-hero-identity-marker">
                        <div className="about-hero-identity-bracket">[</div>
                        <Compass size={12} className="about-hero-identity-icon" />
                        <span className="about-hero-identity-text">THE NAVIGATOR</span>
                        <div className="about-hero-identity-bracket">]</div>
                      </div>

                      {/* Name - Architectural Typography */}
                      <h3 className="about-hero-name">
                        <span className="about-hero-name-first">Kariem</span>
                        <span className="about-hero-name-divider">×</span>
                        <span className="about-hero-name-last">Seiam</span>
                      </h3>

                      {/* Title */}
                      <div className="about-hero-title-wrapper">
                        <p className="about-hero-title-text">{aboutContent.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="about-hero-bottom-accent-compact" aria-hidden="true">
                    <div className="about-hero-bottom-line" />
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    The Narrative - The Navigator's Story
                    ═══════════════════════════════════════════════════════════════════ */}
                <div className="about-narrative">
                  <div className="about-narrative-marker" aria-hidden="true">
                    <Terminal size={16} />
                  </div>
                  <div className="about-narrative-content">
                    {aboutContent.bio.map((paragraph, index) => (
                      <p 
                        key={index} 
                        className="about-narrative-paragraph"
                        style={{ 
                          animationDelay: prefersReducedMotion ? '0ms' : `${index * 200}ms`
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    Action Section - Comprehensive Contact Hub
                    ═══════════════════════════════════════════════════════════════════ */}
                <div className="about-profile-actions-hub">
                  {/* Primary Actions - Resume, Icons & Email */}
                  <div className="about-actions-primary-group">
                    {/* Resume Button */}
                    <a
                      href={aboutContent.contact.resumeUrl}
                      download
                      className="about-action-btn about-action-resume group"
                      aria-label="Download Resume"
                    >
                      <div className="about-action-bg" />
                      <div className="about-action-content">
                        <FileText size={20} className="about-action-icon" />
                        <span className="about-action-text">Download Resume</span>
                      </div>
                      <div className="about-action-shine" />
                    </a>

                    {/* Email Button */}
                    <a
                      href={`mailto:${aboutContent.contact.email}`}
                      className="about-action-btn about-action-email-icon group"
                      aria-label="Send Email"
                    >
                      <div className="about-action-content">
                        <Mail size={20} className="about-action-icon" />
                        <span className="about-action-text">Let's Talk</span>
                        <ArrowRight size={16} className="about-action-arrow group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  </div>

                  {/* Contact Information - Mobile Only */}
                  <div className="about-actions-contact-row">
                    {/* Action Icons Bar - Copy, Call, WhatsApp */}
                    <div className="about-contact-info-row">
                      <div className="about-contact-icons-bar">
                        {/* Copy Button */}
                        <button
                          onClick={handleCopyPhone}
                          className="about-contact-icon-btn about-contact-copy-icon-btn group"
                          aria-label="Copy phone number"
                        >
                          {phoneCopied ? (
                            <Check size={24} className="about-contact-icon-btn-icon" />
                          ) : (
                            <Copy size={24} className="about-contact-icon-btn-icon" />
                          )}
                        </button>

                        {/* Call Button */}
                        <a
                          href={`tel:${aboutContent.contact.phone.replace(/\s/g, '')}`}
                          className="about-contact-icon-btn about-contact-call-icon-btn group"
                          aria-label="Phone Call"
                        >
                          <Phone size={24} className="about-contact-icon-btn-icon" />
                        </a>

                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/${aboutContent.contact.whatsapp.replace(/\s/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="about-contact-icon-btn about-contact-whatsapp-icon-btn group"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle size={24} className="about-contact-icon-btn-icon" />
                        </a>
                      </div>
                    </div>
                  </div>


                  {/* Social Links - GitHub, LinkedIn, Facebook, Phone, WhatsApp */}
                  <div className="about-actions-social-group">
                    <div className="about-social-divider">
                      <span className="about-social-divider-text">Connect on Social</span>
                    </div>
                    <div className="about-social-grid">
                      {Object.entries(aboutContent.contact.socialLinks).map(([platform, url], index) => {
                        const Icon = socialIcons[platform]
                        if (!Icon || url === '#') return null
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`about-social-link about-social-${platform}`}
                            aria-label={`Visit ${platform} profile`}
                            style={{ 
                              animationDelay: prefersReducedMotion ? '0ms' : `${index * 80}ms` 
                            }}
                          >
                            <div className="about-social-link-bg" />
                            <Icon size={20} className="about-social-link-icon" />
                            <span className="about-social-link-text">{platform}</span>
                            <div className="about-social-link-glow" />
                          </a>
                        )
                      })}
                      {/* Phone Link */}
                      <a
                        href={`tel:${aboutContent.contact.phone.replace(/\s/g, '')}`}
                        className="about-social-link about-social-phone"
                        aria-label="Phone Call"
                        style={{ 
                          animationDelay: prefersReducedMotion ? '0ms' : `${Object.keys(aboutContent.contact.socialLinks).length * 80}ms` 
                        }}
                      >
                        <div className="about-social-link-bg" />
                        <Phone size={20} className="about-social-link-icon" />
                        <span className="about-social-link-text">Phone</span>
                        <div className="about-social-link-glow" />
                      </a>
                      {/* WhatsApp Link */}
                      <a
                        href={`https://wa.me/${aboutContent.contact.whatsapp.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-social-link about-social-whatsapp"
                        aria-label="WhatsApp"
                        style={{ 
                          animationDelay: prefersReducedMotion ? '0ms' : `${(Object.keys(aboutContent.contact.socialLinks).length + 1) * 80}ms` 
                        }}
                      >
                        <div className="about-social-link-bg" />
                        <MessageCircle size={20} className="about-social-link-icon" />
                        <span className="about-social-link-text">WhatsApp</span>
                        <div className="about-social-link-glow" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                Right Column - DNA & Philosophy
                ═══════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 space-y-8">

              {/* Developer DNA - The Four Pillars */}
              <div className="about-dna-section">
                <div className="about-dna-header">
                  <Sparkles size={16} className="text-[rgb(var(--navigator))]" />
                  <span>Developer DNA</span>
                </div>
                <div className="about-dna-grid">
                  {developerDNA.map((trait, index) => (
                    <DNACard 
                      key={trait.id}
                      trait={trait}
                      index={index}
                      isActive={activeConstellation === trait.id}
                      onHover={() => setActiveConstellation(trait.id)}
                      onLeave={() => setActiveConstellation(null)}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ))}
                </div>
              </div>

              {/* My Philosophy - The Guiding Principles */}
              <div className="about-philosophy-section">
                <div className="about-dna-header">
                  <Lightbulb size={16} className="text-[rgb(var(--compass))]" />
                  <span>My Philosophy</span>
                </div>
                <div className="about-philosophy-list">
                  {aboutContent.philosophy.map((item, index) => (
                    <PhilosophyCard 
                      key={index}
                      item={item}
                      index={index}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ))}
                </div>
              </div>

              {/* CTA to Projects */}
              <div className="about-explore-cta-wrapper">
                <button
                  onClick={() => scrollToSection('projects', 80)}
                  className="w-full btn btn-secondary justify-center group"
                  aria-label="Explore my work - navigate to projects section"
                >
                  <span>Explore My Work</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/**
 * DNACard - Individual developer DNA trait card
 */
const DNACard = ({ trait, index, isActive, onHover, onLeave, prefersReducedMotion }) => {
  return (
    <div 
      className={`about-dna-card about-dna-card-${trait.color} ${isActive ? 'about-dna-card-active' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="presentation"
      aria-label={`${trait.value} ${trait.label}`}
      style={{ 
        animationDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms`
      }}
    >
      <div className="about-dna-card-content">
        <div className="about-dna-value-wrapper">
          <span className="about-dna-value">{trait.value}</span>
        </div>
        <span className="about-dna-label">{trait.label}</span>
      </div>
    </div>
  )
}

/**
 * PhilosophyCard - Guiding principle card (matches reference styling)
 */
const PhilosophyCard = ({ item, index, prefersReducedMotion }) => {
  const philosophyIcons = [Target, Lightbulb, Heart]
  const Icon = philosophyIcons[index % philosophyIcons.length]
  
  const colorClasses = [
    { bg: 'bg-[rgba(var(--navigator),0.1)]', text: 'text-[rgb(var(--navigator))]', hoverBg: 'group-hover:bg-[rgb(var(--navigator))]' },
    { bg: 'bg-[rgba(var(--compass),0.1)]', text: 'text-[rgb(var(--compass))]', hoverBg: 'group-hover:bg-[rgb(var(--compass))]' },
    { bg: 'bg-[rgba(var(--horizon),0.1)]', text: 'text-[rgb(var(--horizon))]', hoverBg: 'group-hover:bg-[rgb(var(--horizon))]' },
  ]
  const colors = colorClasses[index % colorClasses.length]
  
  return (
    <div className="card-compass p-4 group">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl transition-all ${colors.bg} ${colors.text} ${colors.hoverBg} group-hover:text-white`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="font-semibold text-[rgb(var(--ink-primary))] mb-1">{item.title}</h5>
          <p className="text-sm text-[rgb(var(--ink-secondary))]">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
