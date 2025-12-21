import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for intersection observer
 * Tracks when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {[ref, isVisible]}
 */
export const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        // Optionally disconnect after first intersection
        if (options.triggerOnce !== false) {
          observer.disconnect()
        }
      } else if (options.triggerOnce === false) {
        setIsVisible(false)
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      ...options,
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.triggerOnce])

  return [ref, isVisible]
}

