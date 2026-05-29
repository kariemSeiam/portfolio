import { useState, useEffect, useRef } from 'react'

/**
 * useCountUp — Animated counter that counts from 0 to target
 * Uses requestAnimationFrame for smooth animation
 * Only triggers when element is in viewport
 */
export function useCountUp(target, { duration = 2000, decimals = 0, startOnView = true } = {}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startOnView)
  const ref = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!startOnView) {
      animate()
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()

    function animate() {
      const startTime = performance.now()
      const startValue = 0

      function step(currentTime) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = startValue + (target - startValue) * eased
        setCount(current)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }
  }, [target, duration, startOnView, hasStarted])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toLocaleString()

  return [display, ref]
}
