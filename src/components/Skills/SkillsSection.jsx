import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { 
  Zap, Code2, Server, Smartphone, Globe2, Map, Languages, 
  Sparkles, ChevronLeft, ChevronRight, Star
} from 'lucide-react'
import { skillCategories } from '../../data/skills'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * SkillsSection - The Navigator's Mastery Atlas
 * 
 * A masterpiece visualization of technical expertise.
 * Clean, elegant, and works perfectly on all devices.
 */
const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  const [contentRef, contentVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const iconMap = {
    Code: Code2,
    Code2: Code2,
    Server: Server,
    Smartphone: Smartphone,
    Globe: Globe2,
    Globe2: Globe2,
  }

  const themeColors = ['navigator', 'compass', 'horizon', 'pathfinder']

  // Category data with averages
  const categoryData = useMemo(() => skillCategories.map((cat, i) => ({
    ...cat,
    average: Math.round(cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length),
    Icon: iconMap[cat.icon] || Code2,
    color: themeColors[i % 4],
  })), [])

  const currentCategory = categoryData[activeCategory]

  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)

  // Navigation handlers
  const goToPrev = () => {
    setActiveCategory(prev => prev === 0 ? categoryData.length - 1 : prev - 1)
  }

  const goToNext = () => {
    setActiveCategory(prev => prev === categoryData.length - 1 ? 0 : prev + 1)
  }

  return (
    <section id="skills" className="skills-masterpiece">
      {/* ═══════════════════════════════════════════════════════════════════
          AMBIENT BACKGROUND
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="skills-ambient" aria-hidden="true">
        <div className="skills-glow skills-glow-1" />
        <div className="skills-glow skills-glow-2" />
      </div>

      <div className="skills-container">
        {/* ═══════════════════════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={headerRef}
          className={`skills-header ${headerVisible ? 'visible' : ''}`}
        >
          <div className="skills-badge">
            <Zap size={14} />
            <span>Technical Expertise</span>
          </div>
          
          <h2 className="skills-title">
            <span className="skills-title-primary">Skills & </span>
            <span className="skills-title-gradient">Mastery</span>
          </h2>
          
          <p className="skills-subtitle">
            A comprehensive toolkit built over
            <span className="skills-highlight"> 6+ years</span> of 
            continuous learning and real-world application
          </p>

          {/* Mastery Overview */}
          <div className="skills-overview">
            <div className="skills-stat-info">
              <Sparkles size={14} />
              <span>{totalSkills} skills across {categoryData.length} domains</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            CATEGORY TABS - Clean horizontal tabs
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={contentRef}
          className={`skills-tabs ${contentVisible ? 'visible' : ''}`}
        >
          {categoryData.map((cat, index) => {
            const Icon = cat.Icon
            const isActive = activeCategory === index
            
            return (
              <TabButton
                key={cat.id}
                cat={cat}
                index={index}
                isActive={isActive}
                Icon={Icon}
                onClick={() => setActiveCategory(index)}
              />
            )
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SKILLS DISPLAY - Beautiful grid
            ═══════════════════════════════════════════════════════════════════ */}
        <div className={`skills-display ${contentVisible ? 'visible' : ''}`}>
          {/* Category Header with Navigation */}
          <div className="skills-category-bar">
            <div className="skills-category-info">
              <div 
                className="skills-category-icon"
                style={{ '--cat-color': `var(--${currentCategory.color})` }}
              >
                {(() => {
                  const Icon = currentCategory.Icon
                  return <Icon size={22} />
                })()}
              </div>
              <div 
                className="skills-category-text"
                style={{ '--cat-color': `var(--${currentCategory.color})` }}
              >
                <h3 className="skills-category-name">{currentCategory.name}</h3>
                <p className="skills-category-count">{currentCategory.skills.length} technologies</p>
              </div>
            </div>
            
            <div className="skills-nav" style={{ '--cat-color': 'var(--navigator)' }}>
              <button onClick={goToPrev} className="skills-nav-btn" aria-label="Previous category">
                <ChevronLeft size={18} />
              </button>
              <span className="skills-nav-counter">{activeCategory + 1} / {categoryData.length}</span>
              <button onClick={goToNext} className="skills-nav-btn" aria-label="Next category">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid">
            {currentCategory.skills.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={index}
                color={currentCategory.color}
                isVisible={contentVisible}
              />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SPECIALIZATIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <div className={`skills-specs ${contentVisible ? 'visible' : ''}`}>
          <div className="skills-specs-label">
            <Star size={12} />
            <span>Core Specializations</span>
          </div>
          <div className="skills-specs-grid">
            <SpecCard icon={<Map size={18} />} title="Geolocation" color="navigator" />
            <SpecCard icon={<Languages size={18} />} title="Arabic/RTL" color="compass" />
            <SpecCard icon={<Server size={18} />} title="Production" color="horizon" />
            <SpecCard icon={<Globe2 size={18} />} title="API Design" color="pathfinder" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * TabButton - Category tab with mouse tracking
 */
const TabButton = ({ cat, index, isActive, Icon, onClick }) => {
  const tabRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !tabRef.current) return
    
    const rect = tabRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    tabRef.current.style.setProperty('--mouse-x', `${x * 100}%`)
    tabRef.current.style.setProperty('--mouse-y', `${y * 100}%`)
  }, [prefersReducedMotion])

  useEffect(() => {
    const tab = tabRef.current
    if (!tab || prefersReducedMotion) return

    tab.addEventListener('mousemove', handleMouseMove)
    return () => tab.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, prefersReducedMotion])

  return (
    <button
      ref={tabRef}
      onClick={onClick}
      className={`skills-tab ${isActive ? 'active' : ''}`}
      style={{ '--tab-color': `var(--${cat.color})` }}
      aria-label={`View ${cat.name} skills`}
    >
      <div className="skills-tab-background" />
      <div className="skills-tab-icon">
        <Icon size={18} />
      </div>
      <span className="skills-tab-name">{cat.name}</span>
      <span className="skills-tab-avg">{cat.average}%</span>
    </button>
  )
}

/**
 * SkillCard - Individual skill visualization
 */
const SkillCard = ({ skill, index, color, isVisible }) => {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef(null)
  const delay = prefersReducedMotion ? 0 : index * 50

  // Determine tier based on level
  const getTier = (level) => {
    if (level >= 95) return { label: 'Legendary', class: 'legendary' }
    if (level >= 90) return { label: 'Master', class: 'master' }
    if (level >= 80) return { label: 'Expert', class: 'expert' }
    return { label: 'Advanced', class: 'advanced' }
  }

  const tier = getTier(skill.level)

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    cardRef.current.style.setProperty('--mouse-x', `${x * 100}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y * 100}%`)
  }, [prefersReducedMotion])

  useEffect(() => {
    const card = cardRef.current
    if (!card || prefersReducedMotion) return

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, prefersReducedMotion])

  return (
    <div 
      ref={cardRef}
      className={`skill-card ${tier.class}`}
      style={{ 
        '--skill-color': `var(--${color})`,
        '--delay': `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      {/* Radial progress */}
      <div className="skill-card-ring">
        <svg viewBox="0 0 80 80">
          <circle 
            cx="40" cy="40" r="34" 
            fill="none" 
            stroke="rgba(var(--border-primary), 0.2)" 
            strokeWidth="4"
          />
          <circle 
            cx="40" cy="40" r="34" 
            fill="none" 
            className="skill-card-progress"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${skill.level * 2.14} ${214 - skill.level * 2.14}`}
            style={{ 
              '--level': skill.level,
              transition: `stroke-dasharray 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay + 300}ms`
            }}
          />
        </svg>
        <span className="skill-card-level">{skill.level}</span>
      </div>

      {/* Info */}
      <div className="skill-card-info">
        <h4 className="skill-card-name">{skill.name}</h4>
        {skill.description && (
          <p className="skill-card-desc">{skill.description}</p>
        )}
      </div>
    </div>
  )
}

/**
 * SpecCard - Specialization card with mouse tracking
 */
const SpecCard = ({ icon, title, color }) => {
  const cardRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    cardRef.current.style.setProperty('--mouse-x', `${x * 100}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y * 100}%`)
  }, [prefersReducedMotion])

  useEffect(() => {
    const card = cardRef.current
    if (!card || prefersReducedMotion) return

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, prefersReducedMotion])

  return (
    <div 
      ref={cardRef}
      className="spec-card"
      style={{ '--spec-color': `var(--${color})` }}
    >
      <div className="spec-icon">{icon}</div>
      <span className="spec-title">{title}</span>
    </div>
  )
}

export default SkillsSection
