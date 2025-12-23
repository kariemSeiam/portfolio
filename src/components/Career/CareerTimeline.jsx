import { Briefcase, Rocket, Code2, Globe2, Zap } from 'lucide-react'
import { careerPositions } from '../../data/career'
import TimelineCard from './TimelineCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * CareerTimeline - The Navigator's Ascending Path
 * 
 * Compact, responsive timeline from 2019 to 2025.
 * Clean design matching the overall theme.
 */
const CareerTimeline = () => {
  const prefersReducedMotion = useReducedMotion()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  const [milestonesRef, milestonesVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  const [mobileMilestonesRef, mobileMilestonesVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const milestones = [
    { year: '2019', label: 'First Code', icon: Code2, color: 'pathfinder', phase: 'Foundation' },
    { year: '2021', label: 'Kotlin Mastery', icon: Rocket, color: 'horizon', phase: 'Growth' },
    { year: '2024', label: 'Full-Stack', icon: Globe2, color: 'compass', phase: 'Expansion' },
    { year: '2025', label: 'Production', icon: Zap, color: 'navigator', phase: 'Mastery', isCurrent: true },
  ]

  return (
    <section 
      id="career" 
      className="section relative overflow-hidden"
      aria-label="Career journey"
    >
      {/* Background */}
      <div className="absolute inset-0 career-gradient-base" aria-hidden="true" />
      <div className="career-atmosphere" aria-hidden="true">
        <div className="career-atmo-layer career-atmo-1" />
        <div className="career-atmo-layer career-atmo-2" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`section-header ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">
            <Briefcase size={16} />
            <span>Career Journey</span>
          </div>
          
          <h2 className="text-section mb-4">
            <span className="text-[rgb(var(--ink-primary))]">My </span>
            <span className="gradient-text">Evolution</span>
          </h2>
          
          <p className="text-body-lg max-w-2xl mx-auto">
            From first code to production systems—a journey of continuous learning, 
            building, and growing over <span className="font-semibold" style={{ color: 'rgb(var(--navigator))' }}>6+ years</span>.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            MILESTONE TIMELINE - Desktop Horizontal Layout
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={milestonesRef}
          className={`milestone-timeline-container hidden md:block ${!prefersReducedMotion ? 'animate-on-scroll delay-2' : ''} ${milestonesVisible ? 'visible' : ''}`}
        >
          {/* Start marker */}
          <div className="milestone-marker milestone-start">
            <span>START</span>
          </div>

          {/* Timeline path */}
          <div className="milestone-path-wrapper">
            <div className="milestone-path-line" />
            <div className="milestone-path-glow" />
            <div className="milestone-path-fill" />
          </div>

          {/* Milestone nodes */}
          <div className="milestone-nodes-grid">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              return (
                <div 
                  key={milestone.year}
                  className={`milestone-item ${milestone.isCurrent ? 'milestone-item-current' : ''}`}
                  style={{ 
                    '--index': index,
                    '--color': `var(--${milestone.color})`,
                    '--delay': `${0.2 + index * 0.1}s`
                  }}
                >
                  {/* Dot on line */}
                  <div className="milestone-dot-wrapper">
                    <div className="milestone-dot-ring" />
                    <div className="milestone-dot-core" />
                    {milestone.isCurrent && <div className="milestone-dot-pulse" />}
                  </div>

                  {/* Card - Always above */}
                  <div className="milestone-item-card milestone-card-top">
                    <div className="milestone-icon-box">
                      <Icon size={16} />
                    </div>
                    
                    <div className="milestone-year-text">{milestone.year}</div>
                    <div className="milestone-phase-text">{milestone.phase}</div>
                    <div className="milestone-label-text">{milestone.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* End marker */}
          <div className="milestone-marker milestone-end">
            <span>TODAY</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            MILESTONE CARDS - Mobile Grid Layout (EvolutionStat Style)
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={mobileMilestonesRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-12 md:hidden ${!prefersReducedMotion ? 'animate-on-scroll delay-2' : ''} ${mobileMilestonesVisible ? 'visible' : ''}`}
        >
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            const colorVar = milestone.color
            
            return (
              <div
                key={milestone.year}
                className="card-compass milestone-card-no-bubble p-4 text-center"
                style={{ 
                  '--delay': `${0.1 + index * 0.1}s`,
                  transitionDelay: `${0.1 + index * 0.1}s`
                }}
              >
                {/* Icon in colored box */}
                <div 
                  className="inline-flex p-2 rounded-xl mb-3"
                  style={{
                    backgroundColor: `rgba(var(--${colorVar}), 0.1)`,
                    color: `rgb(var(--${colorVar}))`
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Year */}
                <p className="text-title text-lg text-[rgb(var(--ink-primary))]">
                  {milestone.year}
                </p>

                {/* Label */}
                <p className="text-sm text-[rgb(var(--ink-tertiary))]">
                  {milestone.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Timeline Cards */}
        <div className="relative mt-12 md:mt-20">
          <div className="career-timeline-flow" aria-hidden="true">
            <div className="career-timeline-line" />
          </div>

          <div className="space-y-8 md:space-y-0">
            {careerPositions.map((position, index) => (
              <TimelineCard
                key={position.id}
                position={position}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Future Vision Teaser
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className={`mt-16 text-center ${!prefersReducedMotion ? 'animate-on-scroll delay-4' : ''} ${headerVisible ? 'visible' : ''}`}
        >
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-soft-sm"
            style={{
              backgroundColor: 'rgb(var(--card-bg))',
              border: '1px solid rgba(var(--border-primary), 0.3)'
            }}
          >
            <div className="relative">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'rgb(var(--navigator))' }}
              />
              <div 
                className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: 'rgb(var(--navigator))' }}
              />
            </div>
            <span className="text-sm font-medium text-[rgb(var(--ink-secondary))]">
              The journey continues...
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerTimeline
