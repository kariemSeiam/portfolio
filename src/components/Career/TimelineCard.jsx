import { useState } from 'react'
import { ChevronRight, ChevronDown, Calendar, MapPin, Star, Sparkles } from 'lucide-react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * TimelineCard - A milestone in The Navigator's journey
 * 
 * Uses card-pathfinder style to represent progress and path.
 * Each card is a waypoint on the journey map.
 */
const TimelineCard = ({ position, index, isLeft }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const animationDelay = prefersReducedMotion ? '0s' : `${0.1 + index * 0.15}s`

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } mb-8 md:mb-16 ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: animationDelay }}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          Timeline Dot (Desktop only)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
        <div className={`timeline-dot ${position.isCurrent ? 'current' : ''}`} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Card - Pathfinder Style
          ═══════════════════════════════════════════════════════════════════ */}
      <div className={`w-full md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:pr-6' : 'md:pl-6'}`}>
        <div className={`card-pathfinder p-6 ${position.isCurrent ? 'ring-2 ring-[rgb(var(--navigator))]/30' : ''}`}>
          
          {/* Current Badge */}
          {position.isCurrent && (
            <div className="absolute -top-3 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[rgb(var(--navigator))] to-[rgb(var(--compass))] text-white text-xs font-semibold shadow-lg">
              <Sparkles size={12} />
              <span>Current</span>
            </div>
          )}

          {/* Header */}
          <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}>
            <div className="flex-1">
              {/* Period */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                position.isCurrent 
                  ? 'bg-[rgb(var(--navigator))]/10 text-[rgb(var(--navigator))]'
                  : 'bg-[rgb(var(--pathfinder))]/10 text-[rgb(var(--pathfinder))]'
              }`}>
                <Calendar size={12} />
                <span>{position.period}</span>
              </div>
              
              {/* Role */}
              <h3 className="text-title text-lg mb-1">{position.role}</h3>
              
              {/* Company */}
              <p className="text-[rgb(var(--ink-secondary))] font-medium flex items-center gap-1.5">
                {position.location && <MapPin size={14} className="text-[rgb(var(--horizon))]" />}
                {position.company}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className={`text-body mb-4 ${isLeft ? 'md:text-right' : ''}`}>
            {position.description}
          </p>

          {/* Technologies */}
          {position.technologies && (
            <div className={`flex flex-wrap gap-2 mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
              {position.technologies.slice(0, 4).map((tech, i) => (
                <span 
                  key={tech} 
                  className={`tag ${i % 2 === 0 ? 'tag-navigator' : 'tag-pathfinder'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Expand Button */}
          {position.achievements && position.achievements.length > 0 && (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center gap-1.5 text-sm font-semibold text-[rgb(var(--navigator))] hover:text-[rgb(var(--navigator-dark))] transition-colors ${
                  isLeft ? 'md:ml-auto' : ''
                }`}
              >
                <span>{isExpanded ? 'Hide' : 'Show'} Achievements</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Achievements */}
              <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
                <div className="pt-4 border-t border-[rgb(var(--border-primary))]/50">
                  <ul className="space-y-2">
                    {position.achievements.map((achievement, i) => (
                      <li 
                        key={i} 
                        className={`flex items-start gap-2 text-sm text-[rgb(var(--ink-secondary))] ${
                          isLeft ? 'md:flex-row-reverse md:text-right' : ''
                        }`}
                      >
                        <ChevronRight 
                          size={14} 
                          className={`text-[rgb(var(--growth))] mt-0.5 flex-shrink-0 ${isLeft ? 'md:rotate-180' : ''}`}
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </div>
  )
}

export default TimelineCard
