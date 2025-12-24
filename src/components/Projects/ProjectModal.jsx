import { useState, useEffect, useRef } from 'react'
import { X, ExternalLink, Github, Lock, Zap, Calendar, BarChart3, Code2, Sparkles, Image as ImageIcon, Monitor, Smartphone, Maximize2, ChevronLeft, ChevronRight, Play, Package, Smartphone as SmartphoneIcon, Info, Layers, Rocket, Clock, GitCommit, Server, Globe } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { skillCategories } from '../../data/skills'

/**
 * ProjectModal - Masterpiece project showcase
 * 
 * A stunning full-screen modal with perfect design system integration,
 * swipe gestures, and exceptional UX for both web and mobile.
 */
const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const contentRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const [activeTab, setActiveTab] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Get category icon - always use navigator color
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Full-Stack': return Code2
      case 'API Platform': return Server
      case 'Mobile App': return Smartphone
      default: return Layers
    }
  }

  const CategoryIcon = getCategoryIcon(project.category)

  // Technology categorization and expertise calculation
  const categorizeTechnologies = (technologies) => {
    const categories = {
      frontend: { techs: [], color: 'navigator', icon: Code2, name: 'Frontend' },
      backend: { techs: [], color: 'horizon', icon: Server, name: 'Backend' },
      mobile: { techs: [], color: 'compass', icon: Smartphone, name: 'Mobile' },
      cloud: { techs: [], color: 'pathfinder', icon: Globe, name: 'Cloud' },
      other: { techs: [], color: 'growth', icon: Layers, name: 'Other' },
    }

    // Technology mapping with exact and partial matches - improved accuracy
    const techMap = {
      frontend: [
        'react', 'javascript', 'typescript', 'html', 'css', 'tailwind', 'vite', 'pwa',
        'vue', 'angular', 'svelte', 'next', 'jsx', 'tsx', 'sass', 'less', 'webpack',
        'context api', 'redux', 'zustand', 'framer motion', 'recharts', 'leaflet',
        'json-ld', 'accessibility', 'seo'
      ],
      backend: [
        'flask', 'python', 'mysql', 'postgresql', 'sqlalchemy', 'rest api', 'wsgi',
        'django', 'fastapi', 'node', 'express', 'gunicorn', 'graphql', 'prisma',
        'mongodb', 'redis', 'celery', 'rabbitmq', 'kafka', 'pusher'
      ],
      mobile: [
        'kotlin', 'android', 'jetpack', 'jetpack compose', 'material design', 'material 3',
        'hilt', 'dagger', 'coroutines', 'mvvm', 'stateflow', 'sharedflow',
        'ios', 'swift', 'react native', 'flutter', 'firebase', 'room', 'datastore',
        'paging', 'geofire', 'maps', 'google maps', 'google maps sdk', 'retrofit',
        'clean architecture'
      ],
      cloud: [
        'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'github', 'git', 'actions',
        'deployment', 'ci/cd', 'linux', 'nginx', 'apache', 'terraform',
        'ansible', 'jenkins', 'github pages'
      ]
    }

    technologies.forEach(tech => {
      let categorized = false
      const techLower = tech.toLowerCase().trim()
      
      // First, check exact matches in skills data
      skillCategories.forEach(category => {
        const categorySkills = category.skills.map(s => s.name.toLowerCase())
        // Exact match or contains match
        if (categorySkills.some(skill => {
          return techLower === skill || 
                 techLower.includes(skill) || 
                 skill.includes(techLower) ||
                 techLower.replace(/\s+/g, '') === skill.replace(/\s+/g, '')
        })) {
          const catId = category.id
          if (categories[catId]) {
            categories[catId].techs.push(tech)
            categorized = true
          }
        }
      })

      // Then check tech map for better categorization
      if (!categorized) {
        for (const [catKey, keywords] of Object.entries(techMap)) {
          if (keywords.some(keyword => techLower.includes(keyword) || keyword.includes(techLower))) {
            if (categories[catKey]) {
              categories[catKey].techs.push(tech)
              categorized = true
              break
            }
          }
        }
      }

      // Special cases for common technologies with exact matching
      if (!categorized) {
        // Material Design 3, Material 3 -> Mobile
        if (techLower.includes('material 3') || techLower.includes('material design 3') || techLower === 'material') {
          categories.mobile.techs.push(tech)
          categorized = true
        }
        // REST API -> Backend (but Context API -> Frontend)
        else if (techLower === 'rest api' || (techLower.includes('api') && !techLower.includes('context'))) {
          categories.backend.techs.push(tech)
          categorized = true
        }
        // Context API -> Frontend
        else if (techLower.includes('context api')) {
          categories.frontend.techs.push(tech)
          categorized = true
        }
        // Clean Architecture -> Mobile (usually Android)
        else if (techLower.includes('clean architecture')) {
          categories.mobile.techs.push(tech)
          categorized = true
        }
        // Jetpack -> Mobile
        else if (techLower.includes('jetpack')) {
          categories.mobile.techs.push(tech)
          categorized = true
        }
        // Google Maps -> Mobile
        else if (techLower.includes('google maps') || techLower.includes('maps sdk')) {
          categories.mobile.techs.push(tech)
          categorized = true
        }
        // Android-specific: Retrofit, Room, Paging, StateFlow, Coroutines, DataStore, Geofire, MVVM
        else if (techLower === 'retrofit' || techLower === 'room' || techLower.includes('paging') ||
                 techLower.includes('stateflow') || techLower === 'coroutines' || techLower === 'datastore' ||
                 techLower === 'geofire' || techLower === 'mvvm') {
          categories.mobile.techs.push(tech)
          categorized = true
        }
        // Frontend-specific: Framer Motion, Recharts, Leaflet, JSON-LD
        else if (techLower.includes('framer') || techLower === 'recharts' || techLower === 'leaflet' ||
                 techLower.includes('json-ld')) {
          categories.frontend.techs.push(tech)
          categorized = true
        }
        // SEO -> Frontend (usually)
        else if (techLower === 'seo' || techLower === 'accessibility') {
          categories.frontend.techs.push(tech)
          categorized = true
        }
        // Pusher -> Backend (WebSocket service)
        else if (techLower === 'pusher') {
          categories.backend.techs.push(tech)
          categorized = true
        }
      }

      // If still not categorized, add to other
      if (!categorized) {
        categories.other.techs.push(tech)
      }
    })

    return categories
  }

  const calculateCategoryExpertise = (categoryId) => {
    const category = skillCategories.find(cat => cat.id === categoryId)
    if (!category || !category.skills.length) return 0
    
    const avgLevel = category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
    return Math.round(avgLevel)
  }

  const techCategories = categorizeTechnologies(project.technologies)
  const totalTechs = project.technologies.length

  // Tabs configuration - View All first, then individual sections
  const tabs = [
    { id: 'view-all', label: 'View All', icon: Layers },
    { id: 'tech', label: 'Tech Stack', icon: Code2 },
    ...(project.features && project.features.length > 0 
      ? [{ id: 'features', label: 'Features', icon: Sparkles }] 
      : []
    ),
    ...(project.images && project.images.length > 0 
      ? [{ id: 'gallery', label: 'Gallery', icon: ImageIcon }] 
      : []
    ),
    ...(project.appLinks && project.appLinks.length > 0 
      ? [{ id: 'downloads', label: 'Live', icon: Smartphone }] 
      : []
    ),
  ]

  // Swipe gesture handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && activeTab < tabs.length - 1) {
        handleTabChange(activeTab + 1)
      } else if (swipeDistance < 0 && activeTab > 0) {
        handleTabChange(activeTab - 1)
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowLeft' && activeTab > 0) {
        handleTabChange(activeTab - 1)
      } else if (e.key === 'ArrowRight' && activeTab < tabs.length - 1) {
        handleTabChange(activeTab + 1)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleArrowKeys)
    document.body.style.overflow = 'hidden'
    document.body.setAttribute('data-modal-open', 'true')

    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleArrowKeys)
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
  }, [onClose, activeTab, tabs.length])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleTabChange = (index) => {
    setActiveTab(index)
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-xl animate-fade-in"
        style={{ backgroundColor: 'rgba(var(--canvas-primary), 0.85)' }}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        className="relative w-full h-full sm:h-[90vh] sm:max-w-5xl lg:max-w-6xl sm:mx-4 lg:mx-auto overflow-hidden sm:rounded-3xl shadow-soft-xl animate-scale-up flex flex-col"
        style={{
          backgroundColor: 'rgb(var(--card-bg))',
          border: '1px solid rgba(var(--border-primary), 0.2)'
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════
            Perfect Header with Creative Tabs (Mobile + Web)
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className="sticky top-0 z-20 backdrop-blur-lg flex-shrink-0"
          style={{ 
            backgroundColor: 'rgba(var(--card-bg), 0.98)',
            borderBottom: '1px solid rgba(var(--border-primary), 0.15)',
            paddingTop: 'max(env(safe-area-inset-top, 0px), 1rem)'
          }}
        >
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-3 sm:gap-4 lg:gap-4 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 lg:pt-5 pb-4 sm:pb-5 lg:pb-5">
            {/* Left: Icon, Title, Subtitle & Badge */}
            <div className="flex items-start gap-2.5 sm:gap-3 lg:gap-3 flex-1 min-w-0">
              {/* Category Icon */}
              <div 
                className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 bg-[rgb(var(--navigator))]/10"
              >
                <CategoryIcon 
                  size={18} 
                  className="sm:w-5 sm:h-5 lg:w-5 lg:h-5"
                  style={{ color: 'rgb(var(--navigator))' }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-2.5 mb-1.5 sm:mb-2 flex-wrap">
                  <h1 
                    id="modal-title" 
                    className="text-base sm:text-lg md:text-xl lg:text-xl font-bold text-[rgb(var(--ink-primary))] leading-tight"
                  >
                    {project.title}
                  </h1>
                  {project.isPrivate && (
                    <Lock size={14} className="sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-[rgb(var(--ink-tertiary))] flex-shrink-0" />
                  )}
                  <span 
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 lg:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-xs font-medium transition-all duration-300 hover:scale-105 flex-shrink-0 bg-[rgb(var(--navigator))]/10 text-[rgb(var(--navigator))]"
                  >
                    {project.category}
                  </span>
                </div>
                {project.shortDescription && (
                  <p className="text-xs sm:text-sm lg:text-sm text-[rgb(var(--ink-secondary))] leading-snug line-clamp-2 mt-1 sm:mt-1.5 opacity-90">
                    {project.shortDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] lg:min-w-[44px] lg:min-h-[44px] flex items-center justify-center p-2 sm:p-2.5 lg:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 flex-shrink-0 touch-manipulation"
              style={{ 
                color: 'rgb(var(--ink-secondary))',
                backgroundColor: 'rgba(var(--canvas-tertiary), 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgb(var(--navigator))'
                e.currentTarget.style.backgroundColor = 'rgba(var(--navigator), 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgb(var(--ink-secondary))'
                e.currentTarget.style.backgroundColor = 'rgba(var(--canvas-tertiary), 0.5)'
              }}
              aria-label="Close modal"
            >
              <X size={20} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
            </button>
          </div>

          {/* Tabs - Creative Underline Design */}
          <div className="px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 lg:pb-4 relative">
            <div className="flex gap-1 sm:gap-1.5 lg:gap-2 overflow-x-auto scrollbar-hide relative">
              {tabs.map((tab, index) => {
                const Icon = tab.icon
                const isActive = activeTab === index
                return (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    Icon={Icon}
                    isActive={isActive}
                    onClick={() => handleTabChange(index)}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Content Area - Swipeable
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* VIEW ALL TAB - Complete Project Showcase */}
          {tabs.find(t => t.id === 'view-all') && activeTab === tabs.findIndex(t => t.id === 'view-all') && (
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-6 space-y-5 sm:space-y-6 lg:space-y-6 animate-fade-up">
              {/* Timeline Cards */}
              {(project.createdDate || project.lastUpdated || project.commits) && (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-3">
                  {project.createdDate && (
                    <div className="card-compass p-4 sm:p-5 lg:p-4 flex items-center gap-2.5 sm:gap-3 lg:gap-2.5 min-w-[120px] sm:min-w-[140px] lg:min-w-[130px] flex-1 sm:flex-none max-w-[180px] sm:max-w-none">
                      <div 
                        className="p-2 sm:p-2.5 lg:p-2 rounded-lg sm:rounded-xl lg:rounded-lg flex-shrink-0"
                        style={{ backgroundColor: 'rgba(var(--compass), 0.15)' }}
                      >
                        <Clock size={16} className="sm:w-[18px] sm:h-[18px] lg:w-4 lg:h-4" style={{ color: 'rgb(var(--compass))' }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs lg:text-[10px] text-[rgb(var(--ink-tertiary))] mb-0.5">Started</div>
                        <div className="font-semibold text-xs sm:text-sm lg:text-xs text-[rgb(var(--ink-primary))] truncate">{project.createdDate}</div>
                      </div>
                    </div>
                  )}
                  
                  {project.lastUpdated && (
                    <div className="card-horizon p-4 sm:p-5 lg:p-4 flex items-center gap-2.5 sm:gap-3 lg:gap-2.5 min-w-[120px] sm:min-w-[140px] lg:min-w-[130px] flex-1 sm:flex-none max-w-[180px] sm:max-w-none">
                      <div 
                        className="p-2 sm:p-2.5 lg:p-2 rounded-lg sm:rounded-xl lg:rounded-lg flex-shrink-0"
                        style={{ backgroundColor: 'rgba(var(--horizon), 0.15)' }}
                      >
                        <Calendar size={16} className="sm:w-[18px] sm:h-[18px] lg:w-4 lg:h-4" style={{ color: 'rgb(var(--horizon))' }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs lg:text-[10px] text-[rgb(var(--ink-tertiary))] mb-0.5">Updated</div>
                        <div className="font-semibold text-xs sm:text-sm lg:text-xs text-[rgb(var(--ink-primary))] truncate">{project.lastUpdated}</div>
                      </div>
                    </div>
                  )}

                  {project.commits && (
                    <div className="card-pathfinder p-4 sm:p-5 lg:p-4 flex items-center gap-2.5 sm:gap-3 lg:gap-2.5 min-w-[120px] sm:min-w-[140px] lg:min-w-[130px] flex-1 sm:flex-none max-w-[180px] sm:max-w-none">
                      <div 
                        className="p-2 sm:p-2.5 lg:p-2 rounded-lg sm:rounded-xl lg:rounded-lg flex-shrink-0"
                        style={{ backgroundColor: 'rgba(var(--pathfinder), 0.15)' }}
                      >
                        <GitCommit size={16} className="sm:w-[18px] sm:h-[18px] lg:w-4 lg:h-4" style={{ color: 'rgb(var(--pathfinder))' }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs lg:text-[10px] text-[rgb(var(--ink-tertiary))] mb-0.5">Commits</div>
                        <div className="font-semibold text-xs sm:text-sm lg:text-xs text-[rgb(var(--ink-primary))]">{project.commits}+</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* About, Tech Stack & Gallery Integrated Layout - 3:2 Ratio */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-5">
                {/* About Section - 3/5 columns */}
                <div className="space-y-4 sm:space-y-5 lg:space-y-4 lg:col-span-3">
                  <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-[rgb(var(--ink-primary))] flex items-center gap-2 sm:gap-2.5 lg:gap-2.5">
                    <Info size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" style={{ color: 'rgb(var(--navigator))' }} />
                    About
                  </h2>
                  <div className="card-horizon p-4 sm:p-5 lg:p-5">
                    <div className="markdown-content">
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-[rgb(var(--ink-primary))] mt-4 sm:mt-5 mb-2 sm:mb-3" {...props} />,
                          h2: ({node, ...props}) => <h3 className="text-base sm:text-lg lg:text-lg font-bold text-[rgb(var(--ink-primary))] mt-3 sm:mt-4 mb-2 sm:mb-2.5" {...props} />,
                          h3: ({node, ...props}) => <h4 className="text-sm sm:text-base lg:text-base font-semibold text-[rgb(var(--ink-primary))] mt-3 sm:mt-3.5 mb-1.5 sm:mb-2" {...props} />,
                          p: ({node, ...props}) => <p className="text-sm sm:text-base lg:text-base mb-3 sm:mb-4 leading-relaxed text-[rgb(var(--ink-secondary))]" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 ml-3 sm:ml-4" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 ml-3 sm:ml-4" {...props} />,
                          li: ({node, ...props}) => <li className="text-sm sm:text-base lg:text-base text-[rgb(var(--ink-secondary))] leading-relaxed" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-[rgb(var(--ink-primary))]" {...props} />,
                          em: ({node, ...props}) => <em className="italic text-[rgb(var(--ink-secondary))]" {...props} />,
                          code: ({node, inline, ...props}) => 
                            inline ? (
                              <code 
                                className="px-1.5 py-0.5 rounded text-xs font-mono"
                                style={{
                                  backgroundColor: 'rgba(var(--pathfinder), 0.15)',
                                  color: 'rgb(var(--pathfinder))'
                                }}
                                {...props} 
                              />
                            ) : (
                              <code 
                                className="block p-3 rounded-lg text-xs font-mono overflow-x-auto mb-4"
                                style={{
                                  backgroundColor: 'rgba(var(--canvas-tertiary), 0.5)',
                                  color: 'rgb(var(--ink-primary))',
                                  border: '1px solid rgba(var(--border-primary), 0.3)'
                                }}
                                {...props} 
                              />
                            ),
                          a: ({node, ...props}) => (
                            <a 
                              className="underline transition-colors duration-200"
                              style={{ color: 'rgb(var(--horizon))' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(var(--horizon-dark))'}
                              onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(var(--horizon))'}
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props} 
                            />
                          ),
                          hr: ({node, ...props}) => (
                            <hr 
                              className="my-6"
                              style={{ borderColor: 'rgba(var(--border-primary), 0.3)' }}
                              {...props} 
                            />
                          ),
                          blockquote: ({node, ...props}) => (
                            <blockquote 
                              className="border-l-4 pl-4 my-4 italic text-sm"
                              style={{
                                borderColor: 'rgb(var(--compass))',
                                backgroundColor: 'rgba(var(--compass), 0.05)',
                                color: 'rgb(var(--ink-secondary))'
                              }}
                              {...props} 
                            />
                          ),
                        }}
                      >
              {project.longDescription}
                      </ReactMarkdown>
                    </div>
                  </div>
          </div>

                {/* Right Column - Dynamic Layout (2/5 columns) */}
                <div className="space-y-4 sm:space-y-5 lg:space-y-4 lg:col-span-2">
                  {/* Priority 1: Gallery Preview (if exists) */}
                  {project.images && project.images.length > 0 && (
                    <GalleryPreviewWithTabs project={project} tabs={tabs} handleTabChange={handleTabChange} />
                  )}
                  
                  {/* Priority 2: Live Section (if exists) */}
                  {project.appLinks && project.appLinks.length > 0 && (
                    <div className="space-y-3 sm:space-y-4 lg:space-y-4">
                      <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-[rgb(var(--ink-primary))] flex items-center gap-2 sm:gap-2.5 lg:gap-2.5">
                        <Smartphone size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" style={{ color: 'rgb(var(--navigator))' }} />
                        Live
                      </h2>
                      <div className="space-y-3 sm:space-y-4 lg:space-y-4">
                        {project.appLinks.map((app, index) => (
                          <CompactAppCard key={index} app={app} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Priority 3: Tech Stack - Under Live if Live exists, or under Gallery if Gallery exists, or on top if neither */}
                  <div className="space-y-3 sm:space-y-4 lg:space-y-4">
                    <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-[rgb(var(--ink-primary))] flex items-center gap-2 sm:gap-2.5 lg:gap-2.5">
                      <Code2 size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" style={{ color: 'rgb(var(--navigator))' }} />
                      Technology Stack
                    </h2>
                    <div className="card-compass p-4 sm:p-5 lg:p-5 space-y-3 sm:space-y-4 lg:space-y-4">
                      {Object.entries(techCategories).map(([key, category]) => {
                        if (category.techs.length === 0) return null
                        const expertise = calculateCategoryExpertise(key)
                        const percentage = Math.round((category.techs.length / totalTechs) * 100)
                        const Icon = category.icon
                        
                        return (
                          <div key={key} className="space-y-2 sm:space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                <Icon 
                                  size={14} 
                                  className="sm:w-4 sm:h-4 flex-shrink-0"
                                  style={{ color: `rgb(var(--${category.color}))` }} 
                                />
                                <span className="text-xs sm:text-sm lg:text-sm font-semibold text-[rgb(var(--ink-primary))] truncate">
                                  {category.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                <span 
                                  className="text-[10px] sm:text-xs font-medium"
                                  style={{ color: `rgb(var(--${category.color}))` }}
                                >
                                  {percentage}%
                                </span>
                                <span 
                                  className="text-[10px] sm:text-xs"
                                  style={{ color: `rgb(var(--${category.color}))` }}
                                >
                                  {expertise}%
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-2">
                              {category.techs.slice(0, 4).map((tech) => (
                                <span 
                                  key={tech} 
                                  className={`px-2 sm:px-2.5 lg:px-2.5 py-1 sm:py-1.5 lg:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs lg:text-xs font-medium transition-all duration-300 ${
                                    category.color === 'navigator' ? 'tag-navigator' :
                                    category.color === 'horizon' ? 'tag-horizon' :
                                    category.color === 'compass' ? 'tag-compass' :
                                    category.color === 'pathfinder' ? 'tag-pathfinder' :
                                    'tag-growth'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                              {category.techs.length > 4 && (
                                <span className="px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 lg:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs lg:text-sm font-medium text-[rgb(var(--ink-tertiary))]">
                                  +{category.techs.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
            </div>
          </div>

              {/* Features Section - Full width below */}
          {project.features && project.features.length > 0 && (
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-[rgb(var(--ink-primary))] mb-4 sm:mb-5 lg:mb-5 flex items-center gap-2 sm:gap-2.5 lg:gap-2.5">
                    <Sparkles size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" style={{ color: 'rgb(var(--navigator))' }} />
                    Key Features
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-4">
                {project.features.map((feature, index) => (
                  <li 
                    key={index} 
                        className="card-horizon flex items-start gap-2.5 sm:gap-3 lg:gap-3 p-4 sm:p-5 lg:p-5 transition-all duration-300"
                  >
                        <Zap size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px] mt-0.5 flex-shrink-0" style={{ color: 'rgb(var(--navigator))' }} />
                        <span className="text-sm sm:text-base lg:text-base text-[rgb(var(--ink-primary))] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}


              {/* Action Links */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-4 pt-5 sm:pt-6 lg:pt-6 border-t border-[rgba(var(--border-primary),0.15)]">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary min-h-[44px] sm:min-h-[48px] lg:min-h-[44px] px-5 sm:px-6 lg:px-6 py-2.5 sm:py-3 lg:py-3 text-sm sm:text-base lg:text-base touch-manipulation"
                  >
                    <ExternalLink size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary min-h-[44px] sm:min-h-[48px] lg:min-h-[44px] px-5 sm:px-6 lg:px-6 py-2.5 sm:py-3 lg:py-3 text-sm sm:text-base lg:text-base touch-manipulation"
                  >
                    <Github size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          )}


          {/* TECH STACK TAB - Creative Categorized View */}
          {tabs.find(t => t.id === 'tech') && activeTab === tabs.findIndex(t => t.id === 'tech') && (
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-6 space-y-5 sm:space-y-6 lg:space-y-6 animate-fade-up">
              {/* Categorized Technologies - Creative Design */}
              <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 lg:space-y-5">
                {Object.entries(techCategories).map(([key, category]) => {
                  if (category.techs.length === 0) return null
                  const expertise = calculateCategoryExpertise(key)
                  const stackPercentage = Math.round((category.techs.length / totalTechs) * 100)
                  const Icon = category.icon
                  
                  return (
                    <div 
                      key={key} 
                      className="card-compass p-4 sm:p-5 lg:p-5 transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Category Header with Visual Stats */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 lg:gap-4 mb-4 sm:mb-5 lg:mb-5">
                        <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-3 flex-1 min-w-0 w-full sm:w-auto">
                          <div 
                            className="p-2.5 sm:p-3 lg:p-3 rounded-lg sm:rounded-xl flex-shrink-0"
                            style={{
                              backgroundColor: `rgba(var(--${category.color}), 0.15)`,
                              color: `rgb(var(--${category.color}))`
                            }}
                          >
                            <Icon size={20} className="sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg lg:text-lg font-bold text-[rgb(var(--ink-primary))] mb-1.5 sm:mb-2">
                              {category.name}
                            </h3>
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                              <div className="flex items-center gap-1 sm:gap-1.5">
                                <span className="text-[10px] sm:text-xs text-[rgb(var(--ink-tertiary))]">Stack:</span>
                                <span 
                                  className="text-xs sm:text-sm font-bold"
                                  style={{ color: `rgb(var(--${category.color}))` }}
                                >
                                  {stackPercentage}%
                                </span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5">
                                <span className="text-[10px] sm:text-xs text-[rgb(var(--ink-tertiary))]">Expertise:</span>
                                <span 
                                  className="text-xs sm:text-sm font-bold"
                                  style={{ color: `rgb(var(--${category.color}))` }}
                                >
                                  {expertise}%
                                </span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5">
                                <span className="text-[10px] sm:text-xs text-[rgb(var(--ink-tertiary))]">Techs:</span>
                                <span className="text-xs sm:text-sm font-semibold text-[rgb(var(--ink-primary))]">
                                  {category.techs.length}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Visual Progress Indicator - Hidden on mobile */}
                        <div className="hidden sm:block flex-shrink-0 w-20 lg:w-24">
                          <div className="relative">
                            <div 
                              className="w-full h-2 sm:h-2.5 rounded-full overflow-hidden mb-1.5 sm:mb-2"
                              style={{ backgroundColor: 'rgba(var(--canvas-tertiary), 0.5)' }}
                            >
                              <div 
                                className="h-full rounded-full transition-all duration-1000"
                                style={{
                                  width: `${stackPercentage}%`,
                                  backgroundColor: `rgb(var(--${category.color}))`,
                                }}
                              />
                            </div>
                            <div className="text-center">
                              <div 
                                className="text-xs sm:text-sm font-bold"
                                style={{ color: `rgb(var(--${category.color}))` }}
                              >
                                {expertise}%
                              </div>
                              <div className="text-[10px] sm:text-xs text-[rgb(var(--ink-tertiary))]">Expert</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Technologies Grid */}
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 lg:gap-2.5">
                        {category.techs.map((tech) => (
                          <span 
                            key={tech}
                            className={`px-2.5 sm:px-3 lg:px-3 py-1.5 sm:py-2 lg:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm lg:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md touch-manipulation ${
                              category.color === 'navigator' ? 'tag-navigator' :
                              category.color === 'horizon' ? 'tag-horizon' :
                              category.color === 'compass' ? 'tag-compass' :
                              category.color === 'pathfinder' ? 'tag-pathfinder' :
                              'tag-growth'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* FEATURES TAB - Custom Section */}
          {tabs.find(t => t.id === 'features') && activeTab === tabs.findIndex(t => t.id === 'features') && (
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-6 space-y-5 sm:space-y-6 lg:space-y-6 animate-fade-up">
              <div className="max-w-4xl mx-auto">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-4">
                  {project.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="card-horizon flex items-start gap-2.5 sm:gap-3 lg:gap-3 p-4 sm:p-5 lg:p-5 transition-all duration-300"
                    >
                      <Zap size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[18px] lg:h-[18px] mt-0.5 flex-shrink-0" style={{ color: 'rgb(var(--navigator))' }} />
                      <span className="text-sm sm:text-base lg:text-base text-[rgb(var(--ink-primary))] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* GALLERY TAB - Custom Section */}
          {tabs.find(t => t.id === 'gallery') && activeTab === tabs.findIndex(t => t.id === 'gallery') && (
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-6 space-y-4 sm:space-y-5 lg:space-y-5 animate-fade-up">
              <ImageGalleryMasonry images={project.images} projectTitle={project.title} />
            </div>
          )}

          {/* APPS TAB - Custom Section */}
          {tabs.find(t => t.id === 'downloads') && activeTab === tabs.findIndex(t => t.id === 'downloads') && (
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-6 space-y-5 sm:space-y-6 lg:space-y-6 animate-fade-up">
              <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-5">
                {project.appLinks.map((app, index) => (
                  <AppCard key={index} app={app} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Swipe Hint */}
        {tabs.length > 1 && (
          <div className="sm:hidden text-center py-2 text-xs text-[rgb(var(--ink-tertiary))] border-t border-[rgba(var(--border-primary),0.15)]">
            Swipe left or right to navigate
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * ImageGalleryMasonry - Eye-catching masonry gallery
 */
const ImageGalleryMasonry = ({ images, projectTitle }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const availableTypes = [...new Set(images.map(img => img.type))]
  const [activeType, setActiveType] = useState(availableTypes[0] || 'web')
  const [imageErrors, setImageErrors] = useState(new Set())

  const getImageUrl = (url) => {
    if (!url) return ''
    const baseUrl = import.meta.env.BASE_URL || '/'
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url
    return `${baseUrl}${cleanUrl}`
  }

  const handleImageError = (url, index) => {
    setImageErrors(prev => new Set([...prev, index]))
  }

  const imageTypes = [...new Set(images.map(img => img.type))]
  const filteredImages = images.filter(img => img.type === activeType)

  const openLightbox = (index) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    document.body.style.overflow = ''
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'web': return Monitor
      case 'mobile': return Smartphone
      default: return ImageIcon
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'web': return 'horizon'
      case 'mobile': return 'compass'
      default: return 'navigator'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6 xl:space-y-8">
        {/* Type Filter */}
        {imageTypes.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-4">
          {imageTypes.map((type) => {
            const Icon = getTypeIcon(type)
            const color = getTypeColor(type)
            const isActive = activeType === type

            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className="min-h-[44px] sm:min-h-[40px] lg:min-h-[36px] flex items-center gap-2 sm:gap-2.5 lg:gap-2 px-4 sm:px-5 lg:px-4 py-2 sm:py-2.5 lg:py-2 rounded-full text-xs sm:text-sm lg:text-xs font-medium transition-all duration-300 touch-manipulation active:scale-95"
                style={{
                  backgroundColor: isActive 
                    ? `rgba(var(--${color}), 0.15)` 
                    : 'rgba(var(--card-bg-elevated), 0.5)',
                  color: isActive 
                    ? `rgb(var(--${color}))` 
                    : 'rgb(var(--ink-secondary))',
                  border: `2px solid ${isActive 
                    ? `rgba(var(--${color}), 0.4)` 
                    : 'transparent'}`
                }}
              >
                <Icon size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="capitalize">{type}</span>
              </button>
            )
          })}
          </div>
        )}

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
        {filteredImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl w-full break-inside-avoid mb-3 sm:mb-4 transition-all duration-500 hover:scale-105 touch-manipulation active:scale-100"
              style={{
                backgroundColor: 'rgb(var(--card-bg-elevated))',
              border: '2px solid rgba(var(--border-primary), 0.2)'
              }}
            >
              {imageErrors.has(index) ? (
              <div className="aspect-video flex items-center justify-center">
                <ImageIcon size={32} className="text-[rgb(var(--ink-tertiary))]" />
                </div>
              ) : (
              <>
                <img
                  src={getImageUrl(image.url)}
                  alt={image.alt || `${projectTitle} ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={() => handleImageError(image.url, index)}
                />

              {/* Overlay */}
              <div 
                  className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%)'
                  }}
                >
                  <div className="flex items-center justify-between w-full">
              {image.caption && (
                      <span className="text-white text-xs font-medium">
                  {image.caption}
                      </span>
                    )}
                    <Maximize2 size={18} className="text-white flex-shrink-0 ml-2" />
                </div>
                </div>
              </>
              )}
            </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <ImageLightbox 
          images={filteredImages}
          selectedIndex={selectedIndex}
          onClose={closeLightbox}
          getImageUrl={getImageUrl}
          projectTitle={projectTitle}
        />
      )}
    </div>
  )
}

/**
 * ImageLightbox - Full-screen image viewer
 */
const ImageLightbox = ({ images, selectedIndex, onClose, getImageUrl, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex)

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
          <div 
            className="absolute inset-0 backdrop-blur-2xl"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
      />

      <div className="relative z-10 w-full h-full flex flex-col p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
          <span className="text-white text-xs sm:text-sm lg:text-base">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors touch-manipulation active:scale-95"
            aria-label="Close lightbox"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-2 sm:px-4" onClick={(e) => e.stopPropagation()}>
          <img
            src={getImageUrl(images[currentIndex].url)}
            alt={images[currentIndex].alt || `${projectTitle} ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg sm:rounded-xl"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-2 sm:left-4 lg:left-6 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all touch-manipulation active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-2 sm:right-4 lg:right-6 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all touch-manipulation active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="sm:w-7 sm:h-7" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * CompactAppCard - Compact version for View All tab right column
 * Uses design system card classes for perfect integration
 */
const CompactAppCard = ({ app }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const getImageUrl = (url) => {
    if (!url) return ''
    const baseUrl = import.meta.env.BASE_URL || '/'
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url
    return `${baseUrl}${cleanUrl}`
  }

  return (
    <div
      className="card-compass p-4 sm:p-5 lg:p-5 transition-all duration-500 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-3 sm:space-y-4 lg:space-y-5">
        {/* App Header */}
        <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4">
          {/* Logo Container */}
          <div 
            className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-500"
            style={{
              backgroundColor: 'rgba(var(--compass), 0.1)',
              border: '1px solid rgba(var(--border-primary), 0.2)',
              transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)'
            }}
          >
            {app.logo && !logoError ? (
              <img
                src={getImageUrl(app.logo)}
                alt={app.name}
                className="w-full h-full object-contain p-1.5 sm:p-2"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Smartphone size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" style={{ color: 'rgb(var(--compass))' }} />
            )}
          </div>
          
          {/* App Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base lg:text-base font-bold text-[rgb(var(--ink-primary))] truncate mb-1 sm:mb-1.5">
              {app.displayName || app.name}
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {app.version && (
                <span className="tag tag-compass text-[10px] sm:text-xs lg:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1">
                  {app.version}
                </span>
              )}
              {app.downloads && (
                <span className="tag tag-horizon text-[10px] sm:text-xs lg:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1">
                  {app.downloads}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Description */}
        {app.description && (
          <p className="text-xs sm:text-sm lg:text-sm text-[rgb(var(--ink-secondary))] line-clamp-2 leading-relaxed">
            {app.description}
          </p>
        )}
        
        {/* Download Button */}
        {app.playStoreUrl ? (
          <a
            href={app.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] sm:min-h-[40px] flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 group/btn touch-manipulation active:scale-95"
            style={{
              backgroundColor: 'rgb(var(--navigator))',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(var(--navigator), 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Play size={14} className="sm:w-4 sm:h-4 lg:w-3 lg:h-3" />
            <span>Get It</span>
            <ExternalLink size={12} className="sm:w-3 sm:h-3 lg:w-2.5 lg:h-2.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
          </a>
        ) : (
          <div 
            className="min-h-[44px] sm:min-h-[40px] lg:min-h-[36px] flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 lg:py-2 rounded-lg sm:rounded-xl lg:rounded-lg font-medium text-xs sm:text-sm lg:text-xs"
            style={{
              backgroundColor: 'rgba(var(--card-bg-elevated), 0.5)',
              color: 'rgb(var(--ink-tertiary))',
              border: '2px dashed rgba(var(--border-primary), 0.5)'
            }}
          >
            <Package size={14} className="sm:w-4 sm:h-4" />
            <span>Coming Soon</span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * AppCard - Elegant app download card using design system card classes
 * Perfect integration with Navigator design vision
 */
const AppCard = ({ app }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const getImageUrl = (url) => {
    if (!url) return ''
    const baseUrl = import.meta.env.BASE_URL || '/'
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url
    return `${baseUrl}${cleanUrl}`
  }

  return (
    <div
      className="card-navigator p-4 sm:p-5 lg:p-5 transition-all duration-500 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4 sm:space-y-5 lg:space-y-5">
        {/* App Header */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-4">
          {/* Logo Container */}
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 flex-shrink-0"
            style={{
              backgroundColor: 'rgba(var(--navigator), 0.1)',
              border: '2px solid rgba(var(--border-primary), 0.2)',
              transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)'
            }}
          >
            {app.logo && !logoError ? (
              <img
                src={getImageUrl(app.logo)}
                alt={app.name}
                className="w-full h-full object-contain p-1.5 sm:p-2 lg:p-2"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Smartphone size={24} className="sm:w-7 sm:h-7 lg:w-7 lg:h-7" style={{ color: 'rgb(var(--navigator))' }} />
            )}
          </div>
          
          {/* App Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg lg:text-lg font-bold text-[rgb(var(--ink-primary))] truncate mb-1.5 sm:mb-2">
              {app.displayName || app.name}
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {app.version && (
                <span className="tag tag-compass text-xs sm:text-sm lg:text-sm px-2.5 sm:px-3 lg:px-3 py-1 sm:py-1.5 lg:py-1.5">
                  {app.version}
                </span>
              )}
              {app.downloads && (
                <span className="tag tag-horizon text-xs sm:text-sm lg:text-sm px-2.5 sm:px-3 lg:px-3 py-1 sm:py-1.5 lg:py-1.5">
                  {app.downloads}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {app.description && (
          <p className="text-sm sm:text-base lg:text-base text-[rgb(var(--ink-secondary))] leading-relaxed line-clamp-2">
            {app.description}
          </p>
        )}

        {/* Download Button */}
        {app.playStoreUrl ? (
          <a
            href={app.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] sm:min-h-[48px] lg:min-h-[44px] flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 lg:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-base transition-all duration-300 group/btn touch-manipulation active:scale-95"
            style={{
              backgroundColor: 'rgb(var(--navigator))',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'
              e.currentTarget.style.boxShadow = '0 8px 24px -8px rgba(var(--navigator), 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Play size={18} className="sm:w-5 sm:h-5 lg:w-4 lg:h-4" />
            <span>Get It on Google Play</span>
            <ExternalLink size={14} className="sm:w-4 sm:h-4 lg:w-3 lg:h-3 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
          </a>
        ) : (
          <div 
            className="min-h-[44px] sm:min-h-[48px] lg:min-h-[40px] flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 lg:py-2.5 rounded-lg sm:rounded-xl lg:rounded-lg font-medium text-sm sm:text-base lg:text-sm"
            style={{
              backgroundColor: 'rgba(var(--card-bg-elevated), 0.5)',
              color: 'rgb(var(--ink-tertiary))',
              border: '2px dashed rgba(var(--border-primary), 0.5)'
            }}
          >
            <Package size={18} className="sm:w-5 sm:h-5 lg:w-4 lg:h-4" />
            <span>Coming Soon</span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * GalleryPreviewWithTabs - Gallery with Web/Mobile tabs if both exist
 */
const GalleryPreviewWithTabs = ({ project, tabs, handleTabChange }) => {
  // Separate images by type
  const webImages = project.images.filter(img => img.type === 'web')
  const mobileImages = project.images.filter(img => img.type === 'mobile')
  const hasBothTypes = webImages.length > 0 && mobileImages.length > 0
  
  // Default to 'web' if both exist, otherwise show all
  const [activeGalleryTab, setActiveGalleryTab] = useState(hasBothTypes ? 'web' : 'all')
  
  // Determine which images to show
  const getImagesToShow = () => {
    if (!hasBothTypes) return project.images.slice(0, 4)
    if (activeGalleryTab === 'web') return webImages.slice(0, 4)
    if (activeGalleryTab === 'mobile') return mobileImages.slice(0, 4)
    return project.images.slice(0, 4)
  }
  
  const imagesToShow = getImagesToShow()
  const getImageUrl = (url) => {
    if (!url) return ''
    const baseUrl = import.meta.env.BASE_URL || '/'
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url
    return `${baseUrl}${cleanUrl}`
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2.5 sm:gap-3 lg:gap-4">
        <h2 className="text-base sm:text-lg lg:text-lg font-bold text-[rgb(var(--ink-primary))] flex items-center gap-2 sm:gap-2.5 lg:gap-2.5">
          <ImageIcon size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" style={{ color: 'rgb(var(--navigator))' }} />
          Gallery Preview
        </h2>
        {hasBothTypes && (
          <div className="flex gap-1.5 sm:gap-2 lg:gap-2 rounded-lg sm:rounded-xl p-1 sm:p-1.5 lg:p-1.5" style={{ backgroundColor: 'rgba(var(--canvas-tertiary), 0.5)' }}>
            <button
              onClick={() => setActiveGalleryTab('web')}
              className="min-h-[44px] sm:min-h-[36px] lg:min-h-[36px] px-3 sm:px-4 lg:px-3.5 py-2 sm:py-2.5 lg:py-2 rounded-md sm:rounded-lg text-[11px] sm:text-xs lg:text-xs font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 lg:gap-1.5 touch-manipulation active:scale-95"
              style={{
                backgroundColor: activeGalleryTab === 'web' ? 'rgba(var(--navigator), 0.15)' : 'transparent',
                color: activeGalleryTab === 'web' ? 'rgb(var(--navigator))' : 'rgb(var(--ink-secondary))',
              }}
            >
              <Monitor size={12} className="sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5" />
              <span>Web</span>
            </button>
            <button
              onClick={() => setActiveGalleryTab('mobile')}
              className="min-h-[44px] sm:min-h-[36px] lg:min-h-[36px] px-3 sm:px-4 lg:px-3.5 py-2 sm:py-2.5 lg:py-2 rounded-md sm:rounded-lg text-[11px] sm:text-xs lg:text-xs font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 lg:gap-1.5 touch-manipulation active:scale-95"
              style={{
                backgroundColor: activeGalleryTab === 'mobile' ? 'rgba(var(--navigator), 0.15)' : 'transparent',
                color: activeGalleryTab === 'mobile' ? 'rgb(var(--navigator))' : 'rgb(var(--ink-secondary))',
              }}
            >
              <Smartphone size={12} className="sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        )}
      </div>
      <div className="card-pathfinder p-3 sm:p-4 lg:p-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:gap-2.5">
          {imagesToShow.map((image, index) => (
            <button
              key={`${activeGalleryTab}-${index}`}
              onClick={() => {
                const galleryIndex = tabs.findIndex(t => t.id === 'gallery')
                if (galleryIndex !== -1) handleTabChange(galleryIndex)
              }}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl aspect-square transition-all duration-300 hover:scale-105 touch-manipulation active:scale-100"
              style={{
                backgroundColor: 'rgb(var(--card-bg-elevated))',
                border: '1px solid rgba(var(--border-primary), 0.2)'
              }}
            >
              <img
                src={getImageUrl(image.url)}
                alt={image.alt || `${project.title} ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%)'
                }}
              >
                <span className="text-white text-[10px] sm:text-xs font-medium">View</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * TabButton - Creative tab button with animated underline
 */
const TabButton = ({ tab, Icon, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-1.5 sm:gap-2 lg:gap-2 px-3 sm:px-4 lg:px-4 min-h-[44px] sm:min-h-[40px] lg:min-h-[40px] py-2.5 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 touch-manipulation active:scale-95"
      style={{
        color: isActive 
          ? 'rgb(var(--navigator))' 
          : 'rgb(var(--ink-secondary))',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon 
        size={14} 
        className="sm:w-4 sm:h-4 lg:w-4 lg:h-4 transition-transform duration-300" 
        style={{ transform: isActive ? 'scale(1.15)' : isHovered ? 'scale(1.05)' : 'scale(1)' }} 
      />
      <span className="font-medium">{tab.label}</span>
      
      {/* Creative Animated Underline - Active */}
      {isActive && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(90deg, rgb(var(--navigator)), rgb(var(--compass)), rgb(var(--navigator)))',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s linear infinite',
            boxShadow: '0 2px 8px rgba(var(--navigator), 0.4)'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Hover Underline - Inactive */}
      {!isActive && isHovered && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(var(--navigator), 0.4), transparent)',
          }}
          aria-hidden="true"
        />
      )}
    </button>
  )
}

export default ProjectModal
