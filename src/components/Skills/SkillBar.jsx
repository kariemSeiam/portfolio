import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * SkillBar - Individual skill visualization
 * 
 * Animated progress bar with skill-level-based coloring
 * and shimmer effect for visual interest.
 */
const SkillBar = ({ skill, index }) => {
  const prefersReducedMotion = useReducedMotion()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const animationDelay = prefersReducedMotion ? '0s' : `${0.2 + index * 0.08}s`

  // Dynamic gradient based on skill level
  const getGradientStyle = (level) => {
    if (level >= 90) {
      return { background: 'linear-gradient(90deg, rgb(var(--growth)), rgb(var(--horizon)))' }
    }
    if (level >= 75) {
      return { background: 'linear-gradient(90deg, rgb(var(--navigator)), rgb(var(--compass)))' }
    }
    if (level >= 60) {
      return { background: 'linear-gradient(90deg, rgb(var(--compass)), rgb(var(--horizon)))' }
    }
    return { background: 'linear-gradient(90deg, rgb(var(--pathfinder)), rgb(var(--horizon)))' }
  }

  return (
    <div
      ref={ref}
      className={`group ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: animationDelay }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-[rgb(var(--ink-primary))]">
            {skill.name}
          </span>
          {skill.description && (
            <span className="text-sm text-[rgb(var(--ink-tertiary))] block truncate">
              {skill.description}
            </span>
          )}
        </div>
        <span 
          className="text-sm font-bold ml-3 transition-colors"
          style={{ color: isVisible ? 'rgb(var(--navigator))' : 'rgb(var(--ink-tertiary))' }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="skill-bar-bg group-hover:bg-[rgb(var(--border-primary))] transition-colors">
        <div
          className="skill-bar-fill"
          style={{
            ...getGradientStyle(skill.level),
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: animationDelay,
          }}
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${skill.name}: ${skill.level}%`}
        />
      </div>

      {/* Years indicator */}
      {skill.years && (
        <div className="mt-2 text-xs text-[rgb(var(--ink-tertiary))]">
          {skill.years} years experience
        </div>
      )}
    </div>
  )
}

export default SkillBar
