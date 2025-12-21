import { User, Mail, MapPin, Github, Linkedin, ArrowRight, Heart, Target, Lightbulb, Sparkles, Map, Code2, Globe2 } from 'lucide-react'
import { aboutContent } from '../../data/about'
import { scrollToSection } from '../../utils/animations'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * AboutSection - The Navigator's Story
 * 
 * Uses card-navigator for the main profile (featured)
 * and card-growth for stats (achievements).
 */
const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const socialIcons = { github: Github, linkedin: Linkedin }
  const philosophyIcons = [Target, Lightbulb, Heart, Sparkles]

  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" aria-hidden="true" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ═══════════════════════════════════════════════════════════════════
            Section Header
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={headerRef}
          className={`section-header ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">
            <User size={16} />
            <span>About Me</span>
          </div>
          
          <h2 className="text-section mb-4">
            <span className="text-[rgb(var(--ink-primary))]">The </span>
            <span className="gradient-text">Navigator</span>
          </h2>
          
          <p className="text-body-lg max-w-2xl mx-auto">
            A developer who builds bridges between worlds—
            code to impact, problems to solutions.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Main Content Grid
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Profile Card (Navigator Style) */}
          <div 
            className={`lg:col-span-7 ${!prefersReducedMotion ? 'animate-on-scroll delay-2' : ''} ${headerVisible ? 'visible' : ''}`}
          >
            <div className="card-navigator p-8">
              {/* Profile Header */}
              <div className="flex items-center gap-5 mb-8">
                {/* Avatar with gradient ring */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[rgb(var(--navigator))] via-[rgb(var(--compass))] to-[rgb(var(--horizon))] p-1">
                    <div className="w-full h-full rounded-xl bg-[rgb(var(--card-bg))] flex items-center justify-center">
                      <span className="text-4xl font-display font-black gradient-text-static">
                        {aboutContent.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[rgb(var(--growth))] border-4 border-[rgb(var(--card-bg))] shadow-lg" />
                </div>

                <div>
                  <h3 className="text-title text-xl">{aboutContent.name}</h3>
                  <p className="text-[rgb(var(--navigator))] font-semibold">{aboutContent.title}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-[rgb(var(--ink-tertiary))]">
                    <MapPin size={14} className="text-[rgb(var(--horizon))]" />
                    <span>{aboutContent.contact.location}</span>
                  </div>
                </div>
              </div>

              {/* Identity Cards */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all hover:-translate-y-1 bg-[rgba(var(--navigator),0.05)] border-[rgba(var(--navigator),0.2)] hover:border-[rgba(var(--navigator),0.4)]">
                  <Map size={18} className="text-[rgb(var(--navigator))]" />
                  <span className="text-xs font-medium text-[rgb(var(--ink-secondary))]">Navigator</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all hover:-translate-y-1 bg-[rgba(var(--compass),0.05)] border-[rgba(var(--compass),0.2)] hover:border-[rgba(var(--compass),0.4)]">
                  <Globe2 size={18} className="text-[rgb(var(--compass))]" />
                  <span className="text-xs font-medium text-[rgb(var(--ink-secondary))]">Bridge Builder</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all hover:-translate-y-1 bg-[rgba(var(--horizon),0.05)] border-[rgba(var(--horizon),0.2)] hover:border-[rgba(var(--horizon),0.4)]">
                  <Code2 size={18} className="text-[rgb(var(--horizon))]" />
                  <span className="text-xs font-medium text-[rgb(var(--ink-secondary))]">Architect</span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4 mb-8">
                {aboutContent.bio.map((paragraph, index) => (
                  <p key={index} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tagline Quote */}
              <blockquote className="relative pl-5 py-3 mb-8 border-l-4 border-[rgb(var(--navigator))]">
                <p className="text-subtitle italic text-[rgb(var(--ink-primary))]">
                  "{aboutContent.tagline}"
                </p>
              </blockquote>

              {/* Contact & Social */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${aboutContent.contact.email}`}
                  className="btn btn-primary group"
                >
                  <Mail size={18} />
                  <span>Get in Touch</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {Object.entries(aboutContent.contact.socialLinks).map(([platform, url]) => {
                  const Icon = socialIcons[platform]
                  if (!Icon || url === '#') return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[rgb(var(--border-secondary))] text-[rgb(var(--ink-secondary))] hover:bg-[rgba(var(--navigator),0.1)] hover:text-[rgb(var(--navigator))] transition-all shadow-sm hover:shadow-md"
                      aria-label={platform}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Philosophy */}
          <div 
            className={`lg:col-span-5 space-y-6 ${!prefersReducedMotion ? 'animate-on-scroll delay-3' : ''} ${headerVisible ? 'visible' : ''}`}
          >
            {/* Stats Grid (Growth Style) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-growth p-5 text-center">
                <div className="text-3xl font-display font-black text-[rgb(var(--navigator))]">
                  {aboutContent.statistics.yearsExperience}+
                </div>
                <div className="text-sm text-[rgb(var(--ink-tertiary))] mt-1">Years Experience</div>
              </div>
              <div className="card-growth p-5 text-center">
                <div className="text-3xl font-display font-black text-[rgb(var(--compass))]">
                  {aboutContent.statistics.projectsCompleted}+
                </div>
                <div className="text-sm text-[rgb(var(--ink-tertiary))] mt-1">Projects Built</div>
              </div>
              <div className="card-growth p-5 text-center">
                <div className="text-3xl font-display font-black text-[rgb(var(--horizon))]">
                  {aboutContent.statistics.publicProjects}
                </div>
                <div className="text-sm text-[rgb(var(--ink-tertiary))] mt-1">Public Repos</div>
              </div>
              <div className="card-growth p-5 text-center">
                <div className="text-3xl font-display font-black text-[rgb(var(--growth))]">
                  {aboutContent.statistics.githubStars}+
                </div>
                <div className="text-sm text-[rgb(var(--ink-tertiary))] mt-1">GitHub Stars</div>
              </div>
            </div>

            {/* Philosophy Cards */}
            <div className="space-y-4">
              <h4 className="text-label">My Philosophy</h4>
              {aboutContent.philosophy.map((item, index) => {
                const Icon = philosophyIcons[index % philosophyIcons.length]
                const colorClasses = [
                  { bg: 'bg-[rgba(var(--navigator),0.1)]', text: 'text-[rgb(var(--navigator))]', hoverBg: 'group-hover:bg-[rgb(var(--navigator))]' },
                  { bg: 'bg-[rgba(var(--compass),0.1)]', text: 'text-[rgb(var(--compass))]', hoverBg: 'group-hover:bg-[rgb(var(--compass))]' },
                  { bg: 'bg-[rgba(var(--horizon),0.1)]', text: 'text-[rgb(var(--horizon))]', hoverBg: 'group-hover:bg-[rgb(var(--horizon))]' },
                  { bg: 'bg-[rgba(var(--pathfinder),0.1)]', text: 'text-[rgb(var(--pathfinder))]', hoverBg: 'group-hover:bg-[rgb(var(--pathfinder))]' },
                ]
                const colors = colorClasses[index % colorClasses.length]
                
                return (
                  <div key={index} className="card-compass p-4 group">
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
              })}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('projects', 80)}
              className="w-full btn btn-secondary justify-center group"
            >
              <span>Explore My Work</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
