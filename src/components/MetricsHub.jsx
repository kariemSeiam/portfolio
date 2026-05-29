import { useLanguage } from '../context/LanguageContext'
import { useCountUp } from '../hooks/useCountUp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useReducedMotion } from '../hooks/useReducedMotion'

const metrics = [
  {
    key: 'requests',
    value: 5_200_000,
    labelKey: 'metrics.requests',
    icon: '📡',
    accent: 'var(--navigator)',
    sparkline: [2.1, 2.8, 3.2, 3.8, 4.1, 4.5, 4.8, 5.2],
  },
  {
    key: 'clients',
    value: 52,
    labelKey: 'metrics.clients',
    icon: '🏢',
    accent: 'var(--compass)',
    sparkline: [8, 15, 22, 30, 38, 44, 48, 52],
  },
  {
    key: 'lines',
    value: 79000,
    labelKey: 'metrics.lines',
    icon: '⚡',
    accent: 'var(--horizon)',
    sparkline: [5000, 15000, 32000, 45000, 58000, 65000, 72000, 79000],
  },
  {
    key: 'downloads',
    value: 15000,
    labelKey: 'metrics.downloads',
    icon: '📱',
    accent: 'var(--pathfinder)',
    sparkline: [500, 2000, 4500, 7000, 9500, 11500, 13500, 15000],
  },
  {
    key: 'states',
    value: 56,
    labelKey: 'metrics.states',
    icon: '⚙️',
    accent: 'var(--growth)',
  },
  {
    key: 'projects',
    value: 75,
    labelKey: 'metrics.projects',
    icon: '🗂️',
    accent: 'var(--navigator)',
  },
]

function Sparkline({ data, color }) {
  if (!data) return null
  const w = 80
  const h = 32
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  const polyPoints = points + ` ${w},${h} 0,${h}`

  return (
    <svg width={w} height={h} className="metric-card-sparkline" viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`spark-fill-${color.replace(/\W/g, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={polyPoints} fill={`url(#spark-fill-${color.replace(/\W/g, '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MetricCard({ metric, index }) {
  const { t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const [display, countRef] = useCountUp(
    prefersReducedMotion ? metric.value : 0,
    {
      duration: 2000 + index * 200,
      startOnView: true,
    }
  )
  const [sectionRef, visible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

  // If reduced motion, show the actual value immediately
  const value = prefersReducedMotion
    ? metric.value.toLocaleString()
    : (visible ? display : '0')

  return (
    <div
      ref={sectionRef}
      className="metric-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <div className="metric-card-accent" style={{ background: metric.accent }} />
      <div className="metric-card-icon" style={{ background: `${metric.accent}15`, color: metric.accent }}>
        {metric.icon}
      </div>
      <div className="metric-card-value" ref={countRef}>
        {metric.key === 'requests' || metric.key === 'lines' || metric.key === 'downloads'
          ? value
          : value}
        {metric.key === 'requests' && <span style={{ fontSize: '0.6em', color: metric.accent }}>+</span>}
        {metric.key === 'downloads' && <span style={{ fontSize: '0.6em', color: metric.accent }}>+</span>}
      </div>
      <div className="metric-card-label">{t(metric.labelKey)}</div>
      <Sparkline data={metric.sparkline} color={metric.accent} />
    </div>
  )
}

export default function MetricsHub() {
  const { t } = useLanguage()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="gate-section" id="metrics">
      <div
        ref={headerRef}
        className="gate-section-header"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="gate-section-label">{t('metrics.title')}</div>
        <h2 className="pact-title" style={{ textAlign: 'center' }}>
          <span className="gradient-text-static">{t('metrics.subtitle')}</span>
        </h2>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, i) => (
          <MetricCard key={metric.key} metric={metric} index={i} />
        ))}
      </div>
    </section>
  )
}
