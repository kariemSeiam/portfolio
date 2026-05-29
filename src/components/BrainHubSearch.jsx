import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, BookOpen } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { searchBrainHub, getBrainDocs } from '../data/brainhub'

/**
 * BrainHubSearch — Knowledge base search overlay
 *
 * Indexes all 51 BrainHub markdown files at build time.
 * Search is instant (no API calls) — runs on the client against pre-loaded data.
 */
export default function BrainHubSearch() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [docCount, setDocCount] = useState(0)
  const inputRef = useRef(null)
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    try {
      const docs = getBrainDocs()
      setDocCount(docs.length)
    } catch (e) {
      console.warn('BrainHub not available:', e.message)
    }
  }, [])

  const handleSearch = useCallback((value) => {
    setQuery(value)
    if (!value.trim()) {
      setResults([])
      return
    }
    try {
      const hits = searchBrainHub(value)
      setResults(hits)
    } catch (e) {
      console.warn('Search error:', e.message)
      setResults([])
    }
  }, [])

  const openModal = useCallback((doc) => {
    // Open the raw markdown file in a new tab
    window.open(doc.path, '_blank')?.focus()
  }, [])

  // Keyboard shortcut: Cmd/Ctrl+K to focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <section className="brainhub-section" id="knowledge">
      <div
        ref={headerRef}
        className="gate-section-header"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="gate-section-label">{t('brainhub.title')}</div>
        <h2 className="pact-title" style={{ textAlign: 'center' }}>
          <span className="gradient-text-static">BrainHub</span>
        </h2>
        <p className="pact-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
          {t('brainhub.subtitle')}
        </p>
        {docCount > 0 && (
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              color: 'rgb(var(--ink-tertiary))',
              marginTop: '0.5rem',
            }}
          >
            {docCount} {t('brainhub.count')} · {t('brainhub.subtitle')}
          </div>
        )}
      </div>

      <div
        ref={sectionRef}
        className="brainhub-search-wrapper"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}
      >
        <Search size={18} className="brainhub-search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="brainhub-search-input"
          placeholder={t('brainhub.placeholder')}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label={t('brainhub.placeholder')}
        />
        {query && (
          <button
            onClick={() => handleSearch('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'rgb(var(--ink-tertiary))',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
            className="rtl:left-1rem rtl:right-auto"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {query && (
        <div
          className="brainhub-results"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: 'all 0.4s ease',
          }}
        >
          <div className="brainhub-results-count">
            {results.length} {t('brainhub.results')}
            {results.length === 0 && ` · ${t('brainhub.noresults')}`}
          </div>

          {results.map((doc, i) => (
            <div
              key={doc.id}
              className="brainhub-result-item"
              onClick={() => openModal(doc)}
              style={{
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <div className="brainhub-result-title">{doc.title}</div>
              <div className="brainhub-result-path">
                <BookOpen size={12} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                {doc.category}
              </div>
              <div className="brainhub-result-snippet">{doc.snippet}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
