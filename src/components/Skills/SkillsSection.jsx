import { useState } from 'react'
import { Zap, Code2, Server, Smartphone, Globe2, Map, Languages, Database, Navigation, Rocket } from 'lucide-react'
import { skillCategories } from '../../data/skills'
import SkillBar from './SkillBar'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * SkillsSection - The Navigator's Toolkit
 * 
 * Uses card-horizon style representing exploration and discovery.
 * Skills are horizons to reach and master.
 */
const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]?.id || 'frontend')
  const prefersReducedMotion = useReducedMotion()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const iconMap = {
    Code: Code2,
    Code2: Code2,
    Server: Server,
    Smartphone: Smartphone,
    Globe: Globe2,
    Globe2: Globe2,
    Map: Map,
    Languages: Languages,
    Database: Database,
  }

  const currentCategory = skillCategories.find(cat => cat.id === activeCategory)

  // Category data with averages
  const categoryStats = skillCategories.map((cat, i) => ({
    ...cat,
    average: Math.round(cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length),
    Icon: iconMap[cat.icon] || Code2,
  }))

  // Color styles for each category
  const colorStyles = {
    0: { // Navigator
      active: { backgroundColor: 'rgb(var(--navigator))', color: 'white' },
      inactive: { backgroundColor: 'rgba(var(--navigator), 0.1)', color: 'rgb(var(--navigator))' },
      ring: { boxShadow: '0 0 0 2px rgba(var(--navigator), 0.3)' },
      text: { color: 'rgb(var(--navigator))' },
    },
    1: { // Compass
      active: { backgroundColor: 'rgb(var(--compass))', color: 'white' },
      inactive: { backgroundColor: 'rgba(var(--compass), 0.1)', color: 'rgb(var(--compass))' },
      ring: { boxShadow: '0 0 0 2px rgba(var(--compass), 0.3)' },
      text: { color: 'rgb(var(--compass))' },
    },
    2: { // Horizon
      active: { backgroundColor: 'rgb(var(--horizon))', color: 'white' },
      inactive: { backgroundColor: 'rgba(var(--horizon), 0.1)', color: 'rgb(var(--horizon))' },
      ring: { boxShadow: '0 0 0 2px rgba(var(--horizon), 0.3)' },
      text: { color: 'rgb(var(--horizon))' },
    },
    3: { // Pathfinder
      active: { backgroundColor: 'rgb(var(--pathfinder))', color: 'white' },
      inactive: { backgroundColor: 'rgba(var(--pathfinder), 0.1)', color: 'rgb(var(--pathfinder))' },
      ring: { boxShadow: '0 0 0 2px rgba(var(--pathfinder), 0.3)' },
      text: { color: 'rgb(var(--pathfinder))' },
    },
  }

  return (
    <section id="skills" className="section relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40" aria-hidden="true" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ═══════════════════════════════════════════════════════════════════
            Section Header
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={headerRef}
          className={`section-header ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">
            <Zap size={16} />
            <span>Technical Expertise</span>
          </div>
          
          <h2 className="text-section mb-4">
            <span className="text-[rgb(var(--ink-primary))]">Skills & </span>
            <span className="gradient-text">Mastery</span>
          </h2>
          
          <p className="text-body-lg max-w-2xl mx-auto">
            A comprehensive toolkit built over 
            <span className="font-semibold" style={{ color: 'rgb(var(--navigator))' }}> 6+ years</span> of 
            continuous learning and real-world application.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Category Cards - Horizon Style
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 ${
            !prefersReducedMotion ? 'animate-on-scroll delay-2' : ''
          } ${headerVisible ? 'visible' : ''}`}
        >
          {categoryStats.map((cat, index) => {
            const Icon = cat.Icon
            const isActive = activeCategory === cat.id
            const styles = colorStyles[index % 4]
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="card-horizon p-3 sm:p-4 text-center transition-all"
                style={isActive ? styles.ring : {}}
              >
                <div 
                  className="inline-flex p-2 sm:p-3 rounded-xl sm:rounded-2xl mb-2 sm:mb-3 transition-all shadow-sm"
                  style={isActive ? styles.active : styles.inactive}
                >
                  <Icon size={20} className="sm:w-6 sm:h-6" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[rgb(var(--ink-primary))] mb-0.5 sm:mb-1">
                  {cat.name}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <span 
                    className="text-base sm:text-xl font-bold"
                    style={isActive ? styles.text : { color: 'rgb(var(--ink-secondary))' }}
                  >
                    {cat.average}%
                  </span>
                  <span className="text-[10px] sm:text-xs text-[rgb(var(--ink-tertiary))]">avg</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Skills Detail - Navigator Style (Featured)
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className={`card-navigator p-4 sm:p-6 lg:p-8 ${
            !prefersReducedMotion ? 'animate-on-scroll delay-3' : ''
          } ${headerVisible ? 'visible' : ''}`}
        >
          {/* Category Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b" style={{ borderColor: 'rgba(var(--border-primary), 0.5)' }}>
            {currentCategory && (
              <>
                {(() => {
                  const Icon = iconMap[currentCategory.icon] || Code2
                  return (
                    <div 
                      className="p-2 sm:p-3 rounded-xl sm:rounded-2xl text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, rgb(var(--navigator)), rgb(var(--compass)))' }}
                    >
                      <Icon size={20} className="sm:w-6 sm:h-6" />
                    </div>
                  )
                })()}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[rgb(var(--ink-primary))]">{currentCategory.name}</h3>
                  <p className="text-xs sm:text-sm text-[rgb(var(--ink-tertiary))]">
                    {currentCategory.skills.length} skills mastered
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {currentCategory?.skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SPECIALIZATIONS - Elegant Compact Pills
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className={`mt-8 sm:mt-12 text-center ${
            !prefersReducedMotion ? 'animate-on-scroll delay-4' : ''
          } ${headerVisible ? 'visible' : ''}`}
        >
          <p className="text-label text-[rgb(var(--ink-tertiary))] mb-4 sm:mb-5">Core Specializations</p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <SpecialtyPill
              icon={<Map size={14} />}
              label="Geolocation"
              colorVar="navigator"
              prefersReducedMotion={prefersReducedMotion}
            />
            <SpecialtyPill
              icon={<Languages size={14} />}
              label="Arabic/RTL"
              colorVar="compass"
              prefersReducedMotion={prefersReducedMotion}
            />
            <SpecialtyPill
              icon={<Server size={14} />}
              label="Production"
              colorVar="horizon"
              prefersReducedMotion={prefersReducedMotion}
            />
            <SpecialtyPill
              icon={<Rocket size={14} />}
              label="API Design"
              colorVar="pathfinder"
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * SpecialtyPill - Elegant compact specialty badge
 * Masterpiece-level minimal design with subtle interactions
 */
const SpecialtyPill = ({ icon, label, colorVar, prefersReducedMotion }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-default transition-all duration-300"
      style={{
        backgroundColor: isHovered 
          ? `rgba(var(--${colorVar}), 0.15)` 
          : `rgba(var(--${colorVar}), 0.08)`,
        border: `1px solid ${isHovered ? `rgba(var(--${colorVar}), 0.4)` : `rgba(var(--${colorVar}), 0.2)`}`,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 4px 12px -2px rgba(var(--${colorVar}), 0.25)` 
          : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <span 
        className="transition-all duration-300"
        style={{ 
          color: `rgb(var(--${colorVar}))`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {icon}
      </span>
      
      {/* Label */}
      <span 
        className="text-xs sm:text-sm font-medium transition-colors duration-300"
        style={{ 
          color: isHovered ? `rgb(var(--${colorVar}))` : 'rgb(var(--ink-primary))',
        }}
      >
        {label}
      </span>

      {/* Subtle shine effect on hover */}
      {isHovered && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div 
            className="absolute inset-0 -translate-x-full animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(var(--${colorVar}), 0.1), transparent)`,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default SkillsSection
