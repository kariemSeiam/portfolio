import { Briefcase, Rocket, Code2, Globe2, Zap } from 'lucide-react'
import { careerPositions } from '../../data/career'
import TimelineCard from './TimelineCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * CareerTimeline - The Navigator's Journey
 * 
 * A visual timeline showing the evolution from first code
 * to production systems - a journey of continuous growth.
 */
const CareerTimeline = () => {
  const prefersReducedMotion = useReducedMotion()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  return (
    <section 
      id="career" 
      className="section relative overflow-hidden"
      aria-label="Career journey"
    >
      {/* Background decorations */}
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
            Evolution Stats
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 ${!prefersReducedMotion ? 'animate-on-scroll delay-2' : ''} ${headerVisible ? 'visible' : ''}`}
        >
          <EvolutionStat 
            icon={<Code2 size={20} />}
            year="2019"
            label="First Code"
            colorVar="navigator"
          />
          <EvolutionStat 
            icon={<Rocket size={20} />}
            year="2021"
            label="Kotlin Mastery"
            colorVar="compass"
          />
          <EvolutionStat 
            icon={<Globe2 size={20} />}
            year="2024"
            label="Full-Stack"
            colorVar="horizon"
          />
          <EvolutionStat 
            icon={<Zap size={20} />}
            year="2025"
            label="Production"
            colorVar="pathfinder"
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Timeline
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div 
            className="timeline-line hidden md:block"
            aria-hidden="true"
          />

          {/* Timeline cards */}
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

/**
 * EvolutionStat - Key milestone indicator
 */
const EvolutionStat = ({ icon, year, label, colorVar }) => (
  <div className="card-growth p-4 text-center">
    <div 
      className="inline-flex p-2 rounded-xl mb-3"
      style={{
        backgroundColor: `rgba(var(--${colorVar}), 0.1)`,
        color: `rgb(var(--${colorVar}))`
      }}
    >
      {icon}
    </div>
    <p className="text-title text-lg text-[rgb(var(--ink-primary))]">{year}</p>
    <p className="text-sm text-[rgb(var(--ink-tertiary))]">{label}</p>
  </div>
)

export default CareerTimeline
