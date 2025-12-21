import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * ThemeToggle - Light/Dark mode switcher
 * 
 * A beautiful, accessible toggle that lets users
 * switch between light (day) and dark (night) themes.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full 
        shadow-soft-lg hover:shadow-soft-xl
        transition-all duration-300 ease-out-expo
        hover:scale-110 active:scale-95
        group
        ${prefersReducedMotion ? '' : 'animate-fade-up'}
      `}
      style={{ 
        animationDelay: prefersReducedMotion ? '0ms' : '2000ms',
        backgroundColor: 'rgb(var(--card-bg))',
        border: '1px solid rgba(var(--border-primary), 0.3)'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Sun 
          size={24}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark 
              ? 'opacity-0 rotate-90 scale-50' 
              : 'opacity-100 rotate-0 scale-100'
          }`}
          style={{ color: 'rgb(var(--compass))' }}
        />
        {/* Moon icon */}
        <Moon 
          size={24}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-50'
          }`}
          style={{ color: 'rgb(var(--pathfinder))' }}
        />
      </div>

      {/* Tooltip */}
      <span 
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 
          px-3 py-1.5 rounded-lg
          text-sm font-medium whitespace-nowrap
          opacity-0 pointer-events-none
          group-hover:opacity-100 group-hover:pointer-events-auto
          transition-opacity duration-300
          shadow-soft-md
        "
        style={{
          backgroundColor: 'rgb(var(--ink-primary))',
          color: 'rgb(var(--canvas-primary))'
        }}
      >
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  )
}

export default ThemeToggle
