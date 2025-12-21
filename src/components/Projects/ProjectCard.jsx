import { ExternalLink, Github, Lock, Star, ArrowUpRight, Folder } from 'lucide-react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * ProjectCard - A window into The Navigator's creations
 * 
 * Uses card-compass style representing guidance and direction.
 * Each project is a destination on the map.
 */
const ProjectCard = ({ project, index, onClick, isFeatured = false }) => {
  const prefersReducedMotion = useReducedMotion()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const animationDelay = prefersReducedMotion ? '0s' : `${0.1 + index * 0.08}s`

  // Category-specific tag colors
  const categoryTags = {
    'Web App': 'tag-navigator',
    'Mobile': 'tag-compass',
    'API': 'tag-horizon',
    'Full-Stack': 'tag-pathfinder',
    'Tools': 'tag-growth',
  }

  return (
    <article
      ref={ref}
      onClick={onClick}
      className={`${isFeatured ? 'card-navigator' : 'card-compass'} cursor-pointer group relative p-6 flex flex-col h-full ${
        isFeatured ? 'bento-item-wide' : ''
      } ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: animationDelay }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          Header
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex-1 min-w-0">
          {/* Icon & Category */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-xl ${isFeatured ? 'bg-[rgb(var(--navigator))]/10' : 'bg-[rgb(var(--compass))]/10'}`}>
              <Folder size={18} className={isFeatured ? 'text-[rgb(var(--navigator))]' : 'text-[rgb(var(--compass))]'} />
            </div>
            <span className={categoryTags[project.category] || 'tag'}>
              {project.category}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-title text-lg group-hover:text-[rgb(var(--navigator))] transition-colors flex items-center gap-2">
            {project.title}
            {project.isPrivate && <Lock size={14} className="text-[rgb(var(--ink-tertiary))]" />}
          </h3>
        </div>

        {/* Stars */}
        {project.stars && project.stars > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[rgb(var(--compass))]/20 to-[rgb(var(--compass))]/10 text-[rgb(var(--compass-dark))] dark:text-[rgb(var(--compass))] font-semibold text-sm">
            <Star size={14} fill="currentColor" />
            <span>{project.stars}</span>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Description
          ═══════════════════════════════════════════════════════════════════ */}
      <p className="text-body mb-4 flex-grow line-clamp-2 relative z-10">
        {project.shortDescription}
      </p>

      {/* ═══════════════════════════════════════════════════════════════════
          Technologies
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        {project.technologies.slice(0, isFeatured ? 6 : 4).map((tech, i) => (
          <span 
            key={tech} 
            className={`tag ${i % 3 === 0 ? 'tag-navigator' : i % 3 === 1 ? 'tag-horizon' : 'tag-pathfinder'}`}
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > (isFeatured ? 6 : 4) && (
          <span className="tag">+{project.technologies.length - (isFeatured ? 6 : 4)}</span>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Footer
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between pt-4 border-t border-[rgb(var(--border-primary))]/50 relative z-10">
        <span className="text-sm font-semibold text-[rgb(var(--navigator))] flex items-center gap-1 group-hover:gap-2 transition-all">
          View Details
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        <div className="flex items-center gap-2">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full text-[rgb(var(--ink-tertiary))] hover:text-[rgb(var(--horizon))] hover:bg-[rgb(var(--horizon))]/10 transition-all"
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
              className="p-2 rounded-full text-[rgb(var(--ink-tertiary))] hover:text-[rgb(var(--pathfinder))] hover:bg-[rgb(var(--pathfinder))]/10 transition-all"
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
