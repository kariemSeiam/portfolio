import { useEffect } from 'react'
import { scrollToSection } from '../utils/animations'

/**
 * Custom hook for smooth scroll navigation
 * Handles anchor link clicks and smooth scrolling
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const href = target.getAttribute('href')
        const sectionId = href.substring(1) // Remove #
        if (sectionId) {
          scrollToSection(sectionId, 80) // 80px offset for fixed header
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
}

