import { useEffect, useRef } from 'react'
import { X, ExternalLink, Github, Star, Lock, Zap, Calendar, BarChart3 } from 'lucide-react'

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
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6 space-y-8">
          
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
            <h3 className="text-subtitle text-[rgb(var(--ink-primary))] mb-3">
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
              <h3 className="text-subtitle text-[rgb(var(--ink-primary))] mb-3">
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
            className="flex flex-wrap gap-4 pt-6"
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
