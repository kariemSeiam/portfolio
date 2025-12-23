/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // THE NAVIGATOR - A Developer Who Builds Bridges Between Worlds
        // ═══════════════════════════════════════════════════════════════
        
        // Canvas - The foundation (warm ivory in light, cosmic black in dark)
        canvas: {
          50: '#FFFEFB',    // Warm white
          100: '#FBF9F4',   // Ivory
          200: '#F5F1E8',   // Cream
          300: '#E8E2D4',   // Warm gray
        },
        
        // Ink - Primary text colors
        ink: {
          50: '#F8FAFC',    // Light mode heading on dark
          100: '#E2E8F0',   // Muted text dark mode
          200: '#94A3B8',   // Secondary text
          300: '#64748B',   // Muted
          400: '#475569',   // Body text light mode
          500: '#1E293B',   // Primary text light mode
          600: '#0F172A',   // Headings
          700: '#020617',   // Deep black
        },
        
        // Cosmos - Dark theme base (starry night over desert)
        cosmos: {
          50: '#1E293B',    // Elevated surface
          100: '#151B2B',   // Cards
          200: '#0F1420',   // Background
          300: '#0A0E17',   // Deep background
          400: '#050810',   // Deepest black
        },
        
        // Navigator Coral - Your signature (sunset over the Nile)
        navigator: {
          50: '#FFF7F5',
          100: '#FFEDE8',
          200: '#FFD4C9',
          300: '#FFB5A3',
          400: '#FF8F73',
          500: '#FF6B4A',    // PRIMARY ACCENT
          600: '#E54D2E',
          700: '#C03A1E',
          800: '#9C2F18',
          900: '#7A2614',
        },
        
        // Compass Gold - Secondary accent (desert sun, guidance)
        compass: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',    // SECONDARY ACCENT
          600: '#D97706',
        },
        
        // Horizon Teal - Tertiary (where sky meets sea, exploration)
        horizon: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        
        // Pathfinder Blue - Technical/code accent
        pathfinder: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        },
      },
      
      fontFamily: {
        // Display - Geometric, architectural, bold presence
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        // Body - Clean, professional readability
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // Code - Technical precision
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      
      fontSize: {
        // Massive display for hero
        'hero': ['clamp(3.5rem, 12vw, 10rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '900' }],
        // Large section headers
        'section': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        // Medium headers
        'title': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        // Subheaders
        'subtitle': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        // Small labels
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      
      animation: {
        // Floating elements (like waypoints)
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 10s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        
        // Pulse effects (like radar)
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'ping-slow': 'pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        
        // Entrance animations
        'rise': 'rise 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-left': 'fadeLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-right': 'fadeRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-in': 'blurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        
        // Path drawing
        'draw-path': 'drawPath 2s ease-out forwards',
        'path-glow': 'pathGlow 3s ease-in-out infinite',
        
        // Continuous
        'spin-slow': 'spin 40s linear infinite',
        'spin-reverse': 'spinReverse 30s linear infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'gradient-y': 'gradientY 6s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        
        // Marquee
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        
        // Orbit
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbitReverse 25s linear infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(1deg)' },
          '50%': { transform: 'translateY(-15px) rotate(0deg)' },
          '75%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-30px) translateX(10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(20px) rotate(-2deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        },
        pingSlow: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)', transform: 'scale(0.95)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drawPath: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        pathGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 3px rgba(255,107,74,0.5))' },
          '50%': { filter: 'drop-shadow(0 0 10px rgba(255,107,74,0.8))' },
        },
        spinReverse: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbit: {
          'from': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          'to': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        orbitReverse: {
          'from': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
          'to': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
        },
      },
      
      backgroundImage: {
        // Navigator gradients
        'gradient-navigator': 'linear-gradient(135deg, #FF6B4A 0%, #FF8F73 50%, #FBBF24 100%)',
        'gradient-navigator-subtle': 'linear-gradient(135deg, rgba(255,107,74,0.15) 0%, rgba(251,191,36,0.1) 100%)',
        'gradient-horizon': 'linear-gradient(135deg, #0D9488 0%, #14B8A6 50%, #3B82F6 100%)',
        'gradient-cosmos': 'linear-gradient(180deg, #0A0E17 0%, #151B2B 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #FFFEFB 0%, #FFF7F5 50%, #FFEDE8 100%)',
        
        // Mesh gradients for depth
        'mesh-light': 'radial-gradient(at 20% 30%, rgba(255,107,74,0.08) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(251,191,36,0.06) 0%, transparent 50%), radial-gradient(at 40% 80%, rgba(20,184,166,0.05) 0%, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 20% 30%, rgba(255,107,74,0.12) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(251,191,36,0.08) 0%, transparent 50%), radial-gradient(at 40% 80%, rgba(20,184,166,0.06) 0%, transparent 50%)',
        
        // Grid pattern (coordinates)
        'grid-dot': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        'grid-line': 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        
        // Shimmer
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        'shimmer-dark': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      },
      
      boxShadow: {
        // Soft shadows for cards
        'soft-xs': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 16px rgba(0, 0, 0, 0.06), 0 8px 32px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.08), 0 16px 48px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 16px 48px rgba(0, 0, 0, 0.1), 0 32px 80px rgba(0, 0, 0, 0.08)',
        
        // Navigator glow
        'glow-navigator': '0 0 30px rgba(255, 107, 74, 0.25)',
        'glow-navigator-lg': '0 0 60px rgba(255, 107, 74, 0.35)',
        'glow-compass': '0 0 30px rgba(251, 191, 36, 0.25)',
        'glow-horizon': '0 0 30px rgba(20, 184, 166, 0.25)',
        
        // Inner shadows
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
        'inner-deep': 'inset 0 4px 12px rgba(0, 0, 0, 0.08)',
        
        // Colored shadows for depth
        'navigator': '0 8px 30px -5px rgba(255, 107, 74, 0.3)',
        'navigator-lg': '0 15px 50px -10px rgba(255, 107, 74, 0.4)',
        'compass': '0 8px 30px -5px rgba(251, 191, 36, 0.3)',
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring': 'cubic-bezier(0.5, 1.5, 0.5, 1)',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      
      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '40px 40px',
        'grid-lg': '60px 60px',
      },
    },
  },
  plugins: [
    // Custom plugin for hiding scrollbars
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}
