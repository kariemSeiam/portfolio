import { useState, useMemo } from 'react'
import { FolderOpen, Sparkles, Filter } from 'lucide-react'
import { featuredProjects, projectCategories } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * ProjectGallery - The Navigator's Creations
 * 
 * A beautiful Bento-grid showcase of projects,
 * with filtering and interactive details.
 */
const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const prefersReducedMotion = useReducedMotion()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return featuredProjects
    return featuredProjects.filter(project => project.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section 
      id="projects" 
      className="section relative overflow-hidden"
      aria-label="Featured projects"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" aria-hidden="true" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ═══════════════════════════════════════════════════════════════════
            Section Header
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          ref={headerRef}
          className={`section-header ${!prefersReducedMotion ? 'animate-on-scroll' : ''} ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">
            <FolderOpen size={16} />
            <span>Featured Work</span>
          </div>
          
          <h2 className="text-section mb-4">
            <span className="text-[rgb(var(--ink-primary))]">My </span>
            <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-body-lg max-w-2xl mx-auto">
            From production systems to public APIs—
            <span className="font-semibold" style={{ color: 'rgb(var(--navigator))' }}> 75+ projects</span> showcasing 
            full-stack development, mobile apps, and creative solutions.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Category Filter
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-2 mb-12 ${
            !prefersReducedMotion ? 'animate-on-scroll delay-2' : ''
          } ${headerVisible ? 'visible' : ''}`}
        >
          <span className="mr-2" style={{ color: 'rgb(var(--ink-tertiary))' }}>
            <Filter size={16} />
          </span>
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={selectedCategory === category ? {
                background: 'linear-gradient(135deg, rgb(var(--navigator)), rgb(var(--navigator-dark)))',
                color: 'white',
                boxShadow: '0 4px 15px rgba(var(--navigator), 0.3)'
              } : {
                backgroundColor: 'rgb(var(--card-bg))',
                color: 'rgb(var(--ink-secondary))',
                border: '1px solid rgba(var(--border-primary), 0.3)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(var(--navigator), 0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(var(--border-primary), 0.3)'
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            Projects Grid (Bento-style)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="bento-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
              // First project is featured (wide)
              isFeatured={index === 0}
            />
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            View More CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <div 
          className={`mt-12 text-center ${
            !prefersReducedMotion ? 'animate-on-scroll delay-4' : ''
          } ${headerVisible ? 'visible' : ''}`}
        >
          <a
            href="https://github.com/kariemSeiam"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary group"
          >
            <span>View All on GitHub</span>
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Project Modal
          ═══════════════════════════════════════════════════════════════════ */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export default ProjectGallery
