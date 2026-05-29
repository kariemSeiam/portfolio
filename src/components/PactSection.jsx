import { useLanguage } from '../context/LanguageContext'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const tenets = [
  { key: 'evaluate', textKey: 'pact.evaluate', antiTextKey: 'pact.betrayal', violation: true },
  { key: 'path', textKey: 'pact.path', antiTextKey: 'pact.evasion', violation: true },
  { key: 'pushback', textKey: 'pact.pushback', antiTextKey: 'pact.tool', violation: false },
  { key: 'remember', textKey: 'pact.remember', antiTextKey: 'pact.forgetting', violation: true },
]

const pushScale = [
  { level: 'L0', nameKey: 'pact.push.l0', descKey: 'pact.push.desc', subset: 'Execute. Minor preference.' },
  { level: 'L1', nameKey: 'pact.push.l1', descKey: 'pact.push.desc', subset: 'Note once. Real trade-off.' },
  { level: 'L2', nameKey: 'pact.push.l2', descKey: 'pact.push.desc', subset: 'Hold. Risk or correctness.' },
  { level: 'L3', nameKey: 'pact.push.l3', descKey: 'pact.push.desc', subset: 'Hard stop. Fatal.' },
]

function TenetCard({ tenet, index, visible }) {
  const { t } = useLanguage()
  return (
    <div
      className={`pact-tenet ${tenet.violation ? 'pact-tenet-violation' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <div className="pact-tenet-label">
        {tenet.violation ? '✦ THE TENET' : '✦ THE PRINCIPLE'}
      </div>
      <div className="pact-tenet-text">{t(tenet.textKey)}</div>
      <div className="pact-tenet-antitext">
        {tenet.antiTextKey ? `✗ ${t(tenet.antiTextKey)}` : ''}
      </div>
    </div>
  )
}

export default function PactSection() {
  const { t } = useLanguage()
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.15, triggerOnce: true })
  const [scaleRef, scaleVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })
  const [tenetsVisible, setTenetsVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="gate-section" id="philosophy" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(var(--navigator), 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div
        ref={headerRef}
        className="gate-section-header"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="gate-section-label">{t('pact.title')}</div>
        <h2 className="pact-title" style={{ textAlign: 'center' }}>
          The <span className="gradient-text-static">Pact</span>
        </h2>
        <p className="pact-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
          {t('pact.subtitle')}
        </p>
      </div>

      {/* The Tenets */}
      <div
        className="pact-grid"
        style={{ maxWidth: '48rem', margin: '0 auto 3rem' }}
      >
        {tenets.map((tenet, i) => (
          <TenetCard key={tenet.key} tenet={tenet} index={i} visible={tenetsVisible} />
        ))}
      </div>

      {/* Partner line */}
      <div
        className="pact-tenet"
        style={{
          maxWidth: '48rem',
          margin: '0 auto 3rem',
          textAlign: 'center',
          opacity: tenetsVisible ? 1 : 0,
          transition: 'all 0.5s ease 0.5s',
        }}
      >
        <div className="pact-tenet-label">✦ THE PARTNERSHIP</div>
        <div className="pact-tenet-text">{t('pact.partner')}</div>
      </div>

      {/* Push Scale */}
      <div
        ref={scaleRef}
        className="pact-scale"
        style={{
          maxWidth: '48rem',
          margin: '0 auto',
          opacity: scaleVisible ? 1 : 0,
          transform: scaleVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="pact-scale-title">{t('pact.push.desc')}</div>
        <div className="pact-scale-items">
          {pushScale.map((item) => (
            <div key={item.level} className="pact-scale-item">
              <div className="pact-scale-level">{item.level}</div>
              <div className="pact-scale-name">{t(item.nameKey)}</div>
              <div className="pact-scale-desc">{item.subset}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
