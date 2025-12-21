import { useState, useEffect, useCallback } from 'react'
import { LIGHT_THEME, DARK_THEME, DEFAULT_THEME } from '../utils/constants'

/**
 * useTheme - Theme management hook
 * 
 * Handles theme switching between light and dark modes,
 * with system preference detection and localStorage persistence.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('navigator-theme')
      if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME) {
        return savedTheme
      }

      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return DARK_THEME
      }
    }

    return DEFAULT_THEME
  })

  // Persist theme to localStorage and apply class
  useEffect(() => {
    localStorage.setItem('navigator-theme', theme)
    
    // Apply theme class to documentElement
    if (theme === DARK_THEME) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Update theme-color meta tag
    const themeColor = theme === DARK_THEME ? '#0A0E17' : '#FFFEFB'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', themeColor)
  }, [theme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('navigator-theme')
      // Only auto-switch if user hasn't explicitly set a preference
      if (!savedTheme) {
        setTheme(e.matches ? DARK_THEME : LIGHT_THEME)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === LIGHT_THEME ? DARK_THEME : LIGHT_THEME))
  }, [])

  const setLightTheme = useCallback(() => setTheme(LIGHT_THEME), [])
  const setDarkTheme = useCallback(() => setTheme(DARK_THEME), [])

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === DARK_THEME,
    isLight: theme === LIGHT_THEME,
  }
}
