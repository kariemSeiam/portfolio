import { useState } from 'react'
import { ChevronRight, ChevronDown, Calendar, MapPin, Sparkles, Trophy, Zap } from 'lucide-react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * TimelineCard - A Luminous Waypoint on The Navigator's Journey
 * 
 * Each card represents a chapter in the story:
 * - Emerges from the timeline with depth and presence
 * - Glows with phase-appropriate colors
 * - Expands to reveal achievements like opening a treasure chest
 */
const TimelineCard = ({ position, index, isLeft }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const animationDelay = prefersReducedMotion ? '0s' : `${0.2 + index * 0.15}s`

  // Phase colors based on timeline position
  const phaseColors = [
    { primary: 'navigator', secondary: 'compass' },    // Current - Warm
    { primary: 'compass', secondary: 'horizon' },      // Recent
    { primary: 'horizon', secondary: 'pathfinder' },   // Growth
    { primary: 'pathfinder', secondary: 'horizon' },   // Foundation
  ]

  const colors = phaseColors[index] || phaseColors[3]

  return (
    <div
      ref={ref}
      className={`timeline-card-wrapper ${isLeft ? 'timeline-left' : 'timeline-right'} ${
        !prefersReducedMotion ? 'animate-on-scroll' : ''
      } ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: animationDelay }}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          Timeline Node (Desktop only)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="timeline-node-container" aria-hidden="true">
        <div className={`timeline-node ${position.isCurrent ? 'timeline-node-current' : ''}`}>
          <div className="timeline-node-ring" style={{ '--node-color': `var(--${colors.primary})` }} />
          <div className="timeline-node-core" style={{ '--node-color': `var(--${colors.primary})` }} />
          <div className="timeline-node-pulse" style={{ '--node-color': `var(--${colors.primary})` }} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Card Content - Redesigned to match site design system
          ═══════════════════════════════════════════════════════════════════ */}
      <article 
        className={`card-compass p-6 flex flex-col h-full group ${position.isCurrent ? 'timeline-card-current' : ''}`}
        style={{ 
          '--primary-color': `var(--${colors.primary})`,
          '--secondary-color': `var(--${colors.secondary})`,
        }}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1 min-w-0">
            {/* Period Badge - Matching portfolio-main design */}
            <div 
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                position.isCurrent 
                  ? 'bg-[rgb(var(--navigator))]/10 text-[rgb(var(--navigator))]'
                  : 'bg-[rgb(var(--pathfinder))]/10 text-[rgb(var(--pathfinder))]'
              }`}
            >
              <Calendar size={12} />
              <span>{position.period}</span>
            </div>
            
            {/* Role Title */}
            <h3 className="text-title text-lg group-hover:text-[rgb(var(--navigator))] transition-colors mb-2">
              {position.role}
            </h3>
            
            {/* Company & Location */}
            <div className="flex items-center gap-1.5 text-sm text-[rgb(var(--ink-secondary))] flex-wrap">
              {position.location && (
                <>
                  <MapPin size={14} className="text-[rgb(var(--horizon))]" />
                  <span>{position.location}</span>
                  <span className="text-[rgb(var(--ink-tertiary))]">•</span>
                </>
              )}
              <span>{position.company}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-body mb-4 flex-grow line-clamp-3 relative z-10">
          {position.description}
        </p>

        {/* Technologies */}
        {position.technologies && (
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {position.technologies.slice(0, 4).map((tech, i) => {
              const tagColors = ['tag-navigator', 'tag-horizon', 'tag-pathfinder', 'tag-compass']
              return (
                <span 
                  key={tech} 
                  className={`tag ${tagColors[i % tagColors.length]}`}
                >
                  {tech}
                </span>
              )
            })}
            {position.technologies.length > 4 && (
              <span className="tag">+{position.technologies.length - 4}</span>
            )}
          </div>
        )}

        {/* Achievements Section */}
        {position.achievements && position.achievements.length > 0 && (
          <div className="pt-4 border-t border-[rgb(var(--border-primary))]/50 relative z-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-sm font-semibold text-[rgb(var(--ink-secondary))] hover:text-[rgb(var(--navigator))] transition-colors group/btn"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-[rgb(var(--navigator))]" />
                <span>{isExpanded ? 'Hide' : 'Show'} Achievements</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Achievements List */}
            <div className={`mt-4 space-y-2 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {position.achievements.map((achievement, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-2 text-sm text-[rgb(var(--ink-secondary))]"
                >
                  <Zap size={14} className="text-[rgb(var(--navigator))] mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Spacer for alternating layout */}
      <div className="timeline-spacer" />
    </div>
  )
}

export default TimelineCard
