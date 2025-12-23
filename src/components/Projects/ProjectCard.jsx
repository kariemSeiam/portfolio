import { useRef, useState, useCallback, useEffect } from 'react'
import { ExternalLink, Github, Lock, Star, ArrowUpRight, Folder, Sparkles } from 'lucide-react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * ProjectCard - A window into The Navigator's creations
 * 
 * Creative design system with geometric accents, layered gradients,
 * and cinematic animations. Featured cards showcase signature work.
 */
const ProjectCard = ({ project, index, onClick, isFeatured = false }) => {
  const prefersReducedMotion = useReducedMotion()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  const cardRef = useRef(null)

  const animationDelay = prefersReducedMotion ? '0s' : `${0.1 + index * 0.08}s`

  // Mouse tracking for featured cards
  const handleMouseMove = useCallback((e) => {
    if (!isFeatured || prefersReducedMotion || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    // Update CSS custom properties for glow effect
    cardRef.current.style.setProperty('--mouse-x', `${x * 100}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y * 100}%`)
  }, [isFeatured, prefersReducedMotion])

  useEffect(() => {
    const card = cardRef.current
    if (!card || !isFeatured || prefersReducedMotion) return

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, isFeatured, prefersReducedMotion])

  // Category-specific tag colors
  const categoryTags = {
    'Web App': 'tag-navigator',
    'Mobile': 'tag-compass',
    'API': 'tag-horizon',
    'Full-Stack': 'tag-pathfinder',
    'Tools': 'tag-growth',
    'API Platform': 'tag-horizon',
    'Marketing Site': 'tag-growth',
  }

  return (
    <article
      ref={(node) => {
        ref.current = node
        cardRef.current = node
      }}
      onClick={onClick}
      className={`${isFeatured ? 'card-navigator-featured' : 'card-compass'} cursor-pointer group relative p-6 flex flex-col h-full ${
        isFeatured ? 'bento-item-wide' : ''
      } ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: animationDelay }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          Featured Card: Geometric Corner Accents
          ═══════════════════════════════════════════════════════════════════ */}
      {isFeatured && (
        <>
          {/* Top-left corner accent */}
          <div className="project-card-corner project-card-corner-tl" aria-hidden="true">
            <div className="project-card-corner-line project-card-corner-line-h" />
            <div className="project-card-corner-line project-card-corner-line-v" />
            <div className="project-card-corner-dot" />
          </div>
          
          {/* Top-right corner accent */}
          <div className="project-card-corner project-card-corner-tr" aria-hidden="true">
            <div className="project-card-corner-line project-card-corner-line-h" />
            <div className="project-card-corner-line project-card-corner-line-v" />
            <div className="project-card-corner-dot" />
          </div>
          
          {/* Bottom-left corner accent */}
          <div className="project-card-corner project-card-corner-bl" aria-hidden="true">
            <div className="project-card-corner-line project-card-corner-line-h" />
            <div className="project-card-corner-line project-card-corner-line-v" />
            <div className="project-card-corner-dot" />
          </div>
          
          {/* Bottom-right corner accent */}
          <div className="project-card-corner project-card-corner-br" aria-hidden="true">
            <div className="project-card-corner-line project-card-corner-line-h" />
            <div className="project-card-corner-line project-card-corner-line-v" />
            <div className="project-card-corner-dot" />
          </div>

          {/* Featured badge overlay */}
          <div className="project-card-featured-badge" aria-hidden="true">
            <Sparkles size={12} />
            <span>Featured</span>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          Mesh Gradient Overlay (Featured only)
          ═══════════════════════════════════════════════════════════════════ */}
      {isFeatured && (
        <div className="project-card-mesh-overlay" aria-hidden="true" />
      )}
      {/* ═══════════════════════════════════════════════════════════════════
          Header
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex-1 min-w-0 pr-2">
          {/* Icon & Category */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`project-card-icon-wrapper ${isFeatured ? 'project-card-icon-featured' : 'project-card-icon-standard'}`}>
              <Folder size={isFeatured ? 20 : 18} className={isFeatured ? 'text-[rgb(var(--navigator))]' : 'text-[rgb(var(--compass))]'} />
            </div>
            <span className={`${categoryTags[project.category] || 'tag'} project-card-category`}>
              {project.category}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="project-card-title text-title text-lg group-hover:text-[rgb(var(--navigator))] transition-colors flex items-center gap-2">
            {project.title}
            {project.isPrivate && (
              <Lock size={14} className="text-[rgb(var(--ink-tertiary))] group-hover:text-[rgb(var(--navigator))] transition-colors" />
            )}
          </h3>
        </div>

        {/* Stars */}
        {project.stars && project.stars > 0 && (
          <div className={`project-card-stars ${isFeatured ? 'project-card-stars-featured' : ''} flex-shrink-0`}>
            <Star size={14} fill="currentColor" className="project-card-star-icon" />
            <span>{project.stars}</span>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Description
          ═══════════════════════════════════════════════════════════════════ */}
      <p className={`project-card-description text-body ${isFeatured ? 'line-clamp-3' : 'line-clamp-2'} relative z-10`}>
        {project.shortDescription}
      </p>

      {/* ═══════════════════════════════════════════════════════════════════
          Technologies
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="project-card-tech-wrapper relative z-10">
        {project.technologies.slice(0, isFeatured ? 6 : 4).map((tech, i) => {
          const tagVariants = ['tag-navigator', 'tag-horizon', 'tag-pathfinder', 'tag-compass', 'tag-growth']
          return (
            <span 
              key={tech} 
              className={`tag project-card-tech-tag ${tagVariants[i % tagVariants.length]}`}
            >
              {tech}
            </span>
          )
        })}
        {project.technologies.length > (isFeatured ? 6 : 4) && (
          <span className="tag project-card-tech-more">
            +{project.technologies.length - (isFeatured ? 6 : 4)}
          </span>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Footer
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="project-card-footer relative z-10">
        <span className="project-card-cta group-hover:gap-2 transition-all">
          View Details
          <ArrowUpRight size={16} className="project-card-cta-arrow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        <div className="project-card-links">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="project-card-link project-card-link-demo"
              aria-label="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="project-card-link project-card-link-github"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
