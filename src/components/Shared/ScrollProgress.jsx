import { useScrollProgress } from '../../hooks/useScrollProgress'

/**
 * ScrollProgress - Visual journey indicator
 * 
 * Shows the user's progress through the portfolio,
 * like a path being drawn on a map.
 */
const ScrollProgress = () => {
  const progress = useScrollProgress()

  return (
    <div 
      className="scroll-progress"
      style={{ 
        transform: `scaleX(${progress})`,
        transition: 'transform 150ms ease-out'
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Scroll progress"
    />
  )
}

export default ScrollProgress
