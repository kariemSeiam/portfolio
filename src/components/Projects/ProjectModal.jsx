import { useState, useEffect, useRef } from 'react'
import { X, ExternalLink, Github, Star, Lock, Zap, Calendar, BarChart3, Code2, Sparkles, Image as ImageIcon, Monitor, Smartphone, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * ProjectModal - Detailed project view
 * 
 * A full-screen modal showing comprehensive project details
 * with beautiful animations and full accessibility.
 */
const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Focus management and keyboard handling
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    document.body.setAttribute('data-modal-open', 'true')

    // Focus the close button
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    // Trap focus inside modal
    const handleTabKey = (e) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTabKey)
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(var(--canvas-primary), 0.8)' }}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-soft-xl animate-scale-up"
        style={{
          backgroundColor: 'rgb(var(--card-bg))',
          border: '1px solid rgba(var(--border-primary), 0.3)'
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════
            Header
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className="sticky top-0 z-10 flex items-start justify-between p-6 backdrop-blur-md"
          style={{ 
            borderBottom: '1px solid rgba(var(--border-primary), 0.3)',
            backgroundColor: 'rgba(var(--card-bg), 0.9)'
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 
                id="modal-title" 
                className="text-title text-[rgb(var(--ink-primary))]"
              >
                {project.title}
              </h2>
              {project.isPrivate && (
                <Lock size={18} className="text-[rgb(var(--ink-tertiary))]" />
              )}
              {project.stars && project.stars > 0 && (
                <div 
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: 'rgba(var(--compass), 0.1)',
                    color: 'rgb(var(--compass))'
                  }}
                >
                  <Star size={14} fill="currentColor" />
                  <span>{project.stars}</span>
                </div>
              )}
            </div>
            <span className="tag-navigator">
              {project.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-full transition-all duration-300"
            style={{ color: 'rgb(var(--ink-secondary))' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgb(var(--navigator))'
              e.currentTarget.style.backgroundColor = 'rgba(var(--navigator), 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgb(var(--ink-secondary))'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Content
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] px-6 pt-6 pb-10 space-y-8">
          
          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <ImageGallery images={project.images} projectTitle={project.title} />
          )}

          {/* Description */}
          <div>
            <h3 className="text-subtitle text-[rgb(var(--ink-primary))] mb-3 flex items-center gap-2">
              <Zap size={18} style={{ color: 'rgb(var(--navigator))' }} />
              About
            </h3>
            <p className="text-body whitespace-pre-line">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-subtitle text-[rgb(var(--ink-primary))] mb-3 flex items-center gap-2">
              <Code2 size={18} style={{ color: 'rgb(var(--navigator))' }} />
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span 
                  key={tech} 
                  className={`tag ${i % 3 === 0 ? 'tag-navigator' : i % 3 === 1 ? 'tag-horizon' : 'tag-pathfinder'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-subtitle text-[rgb(var(--ink-primary))] mb-3 flex items-center gap-2">
                <Sparkles size={18} style={{ color: 'rgb(var(--navigator))' }} />
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-2"
                  >
                    <Zap size={14} className="mt-1 flex-shrink-0" style={{ color: 'rgb(var(--navigator))' }} />
                    <span className="text-body">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Performance Metrics */}
          {project.performanceMetrics && (
            project.performanceMetrics.lighthouseScore || 
            project.performanceMetrics.loadTime
          ) && (
            <div>
              <h3 className="text-subtitle text-[rgb(var(--ink-primary))] mb-3 flex items-center gap-2">
                <BarChart3 size={18} style={{ color: 'rgb(var(--navigator))' }} />
                Performance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.performanceMetrics.lighthouseScore && (
                  <MetricCard 
                    label="Lighthouse"
                    value={project.performanceMetrics.lighthouseScore}
                    color={
                      project.performanceMetrics.lighthouseScore >= 90 ? 'horizon' :
                      project.performanceMetrics.lighthouseScore >= 70 ? 'compass' : 'navigator'
                    }
                  />
                )}
                {project.performanceMetrics.loadTime && (
                  <MetricCard 
                    label="Load Time"
                    value={project.performanceMetrics.loadTime}
                    color="navigator"
                  />
                )}
                {project.performanceMetrics.bundleSize && (
                  <MetricCard 
                    label="Bundle Size"
                    value={project.performanceMetrics.bundleSize}
                    color="compass"
                  />
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          {project.createdDate && (
            <div className="flex items-center gap-2 text-sm text-[rgb(var(--ink-tertiary))]">
              <Calendar size={14} />
              <span>Created: {project.createdDate}</span>
              {project.lastUpdated && (
                <span>• Updated: {project.lastUpdated}</span>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              Action Links
              ═══════════════════════════════════════════════════════════════════ */}
          <div 
            className="flex flex-wrap gap-4 pt-6 pb-4 mt-2"
            style={{ borderTop: '1px solid rgba(var(--border-primary), 0.3)' }}
          >
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * ImageGallery - Project images gallery with fullscreen viewer
 * Supports web, mobile, and custom image types
 */
const ImageGallery = ({ images, projectTitle }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  // Get unique image types and set default to first one (no 'all' option)
  const availableTypes = [...new Set(images.map(img => img.type))]
  const [activeType, setActiveType] = useState(availableTypes[0] || 'web')
  const [imageErrors, setImageErrors] = useState(new Set())

  // Helper to get correct image URL (handles Vite base path)
  // Vite base path is /portfolio/, so we need to prepend it to public assets
  const getImageUrl = (url) => {
    if (!url) return ''
    
    // Get base URL from Vite config (will be '/portfolio/' in this project)
    const baseUrl = import.meta.env.BASE_URL || '/'
    
    // Remove leading slash from URL if present
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url
    
    // Combine base URL with image path
    // baseUrl already ends with /, so we don't need to add another
    return `${baseUrl}${cleanUrl}`
  }

  const handleImageError = (url, index) => {
    console.error('❌ Image failed to load:', url)
    console.error('📁 Expected path:', getImageUrl(url))
    console.error('🌐 Try accessing directly:', `${window.location.origin}${getImageUrl(url)}`)
    setImageErrors(prev => new Set([...prev, index]))
  }

  // Get unique image types (excluding 'all')
  const imageTypes = [...new Set(images.map(img => img.type))]

  // Filter images based on active type
  const filteredImages = images.filter(img => img.type === activeType)
  
  // Set default to first available type if activeType doesn't match
  useEffect(() => {
    if (availableTypes.length > 0 && !availableTypes.includes(activeType)) {
      setActiveType(availableTypes[0])
    }
  }, [availableTypes.join(','), activeType])

  const openLightbox = (index) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    document.body.style.overflow = ''
  }

  const goToPrevious = () => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1))
  }

  const goToNext = () => {
    setSelectedIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') goToPrevious()
        if (e.key === 'ArrowRight') goToNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filteredImages.length])

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
    <div>
      {/* Header with Filters */}
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <h3 className="text-subtitle text-[rgb(var(--ink-primary))] flex items-center gap-2">
          <ImageIcon size={18} style={{ color: 'rgb(var(--navigator))' }} />
          Gallery
        </h3>

        {/* Type Filter */}
        {imageTypes.length > 1 && (
          <div className="flex flex-wrap gap-2">
          {imageTypes.map((type) => {
            const Icon = getTypeIcon(type)
            const color = getTypeColor(type)
            const isActive = activeType === type

            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'shadow-soft-sm' 
                    : 'hover:shadow-soft-sm'
                }`}
                style={{
                  backgroundColor: isActive 
                    ? `rgba(var(--${color}), 0.15)` 
                    : 'rgba(var(--card-bg-elevated), 0.5)',
                  color: isActive 
                    ? `rgb(var(--${color}))` 
                    : 'rgb(var(--ink-secondary))',
                  border: `1px solid ${isActive 
                    ? `rgba(var(--${color}), 0.3)` 
                    : 'rgba(var(--border-primary), 0.5)'}`
                }}
              >
                <Icon size={14} />
                <span className="capitalize">{type}</span>
              </button>
            )
          })}
          </div>
        )}
      </div>

      {/* Image Grid */}
      <div className={`flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth snap-x snap-mandatory ${
        activeType === 'mobile' ? '-mx-6 px-6' : ''
      }`}>
        {filteredImages.map((image, index) => {
          const Icon = getTypeIcon(image.type)
          const color = getTypeColor(image.type)
          
          // Mobile images use phone aspect ratio (9:16), web uses video aspect ratio (16:9)
          const aspectClass = activeType === 'mobile' 
            ? 'aspect-[9/16] w-[45vw] md:w-[200px]' // Phone portrait ratio with fixed widths
            : 'aspect-video w-[80vw] md:w-[400px]'  // Standard 16:9 with fixed widths

          return (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-xl ${aspectClass} cursor-pointer flex-shrink-0 snap-center`}
              style={{
                backgroundColor: 'rgb(var(--card-bg-elevated))',
                border: '1px solid rgba(var(--border-primary), 0.3)'
              }}
            >
              {/* Image */}
              {imageErrors.has(index) ? (
                <div className="w-full h-full flex items-center justify-center bg-[rgb(var(--card-bg-elevated))]">
                  <div className="text-center p-4">
                    <ImageIcon size={32} className="mx-auto mb-2 text-[rgb(var(--ink-tertiary))]" />
                    <p className="text-xs text-[rgb(var(--ink-tertiary))]">Image not found</p>
                    <p className="text-xs text-[rgb(var(--ink-tertiary))] mt-1 break-all">{image.url}</p>
                  </div>
                </div>
              ) : (
                <img
                  src={getImageUrl(image.url)}
                  alt={image.alt || `${projectTitle} screenshot ${index + 1}`}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={() => handleImageError(image.url, index)}
                />
              )}

              {/* Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)'
                }}
              >
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <div 
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{
                      backgroundColor: `rgba(var(--${color}), 0.9)`
                    }}
                  >
                    <Icon size={12} />
                    <span className="capitalize">{image.type}</span>
                  </div>
                  <Maximize2 size={16} className="text-white" />
                </div>
              </div>

              {/* Caption if exists */}
              {image.caption && (
                <div 
                  className="absolute top-2 left-2 right-2 px-2 py-1 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  {image.caption}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 backdrop-blur-2xl"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
            aria-hidden="true"
          />

          {/* Navigation & Controls */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6">
              <div className="flex items-center gap-3 text-white">
                {(() => {
                  const Icon = getTypeIcon(filteredImages[selectedIndex].type)
                  const color = getTypeColor(filteredImages[selectedIndex].type)
                  return (
                    <div 
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `rgba(var(--${color}), 0.2)`,
                        color: `rgb(var(--${color}-light))`
                      }}
                    >
                      <Icon size={14} />
                      <span className="capitalize">{filteredImages[selectedIndex].type}</span>
                    </div>
                  )
                })()}
                <span className="text-sm text-gray-400">
                  {selectedIndex + 1} / {filteredImages.length}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeLightbox()
                }}
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="relative max-w-6xl max-h-full">
                <img
                  src={getImageUrl(filteredImages[selectedIndex].url)}
                  alt={filteredImages[selectedIndex].alt || `${projectTitle} screenshot ${selectedIndex + 1}`}
                  className="max-w-full max-h-[calc(100vh-200px)] object-contain rounded-xl shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                  onError={(e) => {
                    console.error('Failed to load image in lightbox:', filteredImages[selectedIndex].url)
                    console.error('Attempted URL:', getImageUrl(filteredImages[selectedIndex].url))
                  }}
                />

                {/* Navigation Buttons */}
                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        goToPrevious()
                      }}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        goToNext()
                      }}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Caption */}
            {filteredImages[selectedIndex].caption && (
              <div className="p-4 md:p-6 text-center">
                <p className="text-white text-sm md:text-base">
                  {filteredImages[selectedIndex].caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * MetricCard - Performance metric display
 */
const MetricCard = ({ label, value, color }) => {
  const colorStyles = {
    navigator: 'rgb(var(--navigator))',
    compass: 'rgb(var(--compass))',
    horizon: 'rgb(var(--horizon))',
  }

  return (
    <div className="card-growth p-4 text-center">
      <div className="text-2xl font-bold" style={{ color: colorStyles[color] }}>
        {value}
      </div>
      <div className="text-sm text-[rgb(var(--ink-tertiary))]">
        {label}
      </div>
    </div>
  )
}

export default ProjectModal
