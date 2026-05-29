import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

/**
 * PactGate — First contact.
 *
 * On first visit: full-screen overlay showing The Pact.
 * Visitor chooses: accept or skip.
 * Accepted visitors get a subtle badge. Choice persists via localStorage.
 *
 * This is unexpected. This is on-brand.
 * A developer who operates by a pact introduces it first.
 */

const STORAGE_KEY = 'ks-pact-accepted'
const SHOW_DELAY = 1800 // ms after page load

export default function PactGate() {
  const [visible, setVisible] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [exiting, setExiting] = useState(false)
  const { lang } = useLanguage()

  useEffect(() => {
    // Don't show if already decided
    const prior = localStorage.getItem(STORAGE_KEY)
    if (prior) return

    // Show after delay (let hero load first)
    const t = setTimeout(() => setVisible(true), SHOW_DELAY)
    return () => clearTimeout(t)
  }, [])

  const dismiss = (choice) => {
    setAccepted(choice === 'accept')
    setExiting(true)
    localStorage.setItem(STORAGE_KEY, choice)
    setTimeout(() => setVisible(false), 600)
  }

  if (!visible) return null

  const isAr = lang === 'ar'

  return (
    <div
      className={`pact-gate-overlay ${exiting ? 'pact-gate-exit' : 'pact-gate-enter'}`}
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? 'الميثاق' : 'The Pact'}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="pact-gate-panel">
        {/* Header */}
        <div className="pact-gate-header">
          <div className="pact-gate-badge">
            <span className="pact-gate-badge-dot" />
            <span>{isAr ? 'قبل المتابعة' : 'Before you explore'}</span>
          </div>
          <h2 className="pact-gate-title">
            {isAr ? 'الميثاق' : 'The Pact'}
          </h2>
          <p className="pact-gate-sub">
            {isAr
              ? 'هذه ليست رسالة تسويقية. هذه طريقة عملي.'
              : 'This is not marketing copy. This is how I operate.'}
          </p>
        </div>

        {/* Tenets */}
        <div className="pact-gate-tenets">
          <div className="pact-gate-tenet">
            <span className="pact-gate-tenet-mark">✦</span>
            <div>
              <p className="pact-gate-tenet-text">
                {isAr ? 'أقيّم قبل الموافقة.' : 'I evaluate before agreeing.'}
              </p>
              <p className="pact-gate-tenet-anti">
                {isAr ? '✗ الموافقة قبل التقييم = خيانة' : '✗ Agreement before evaluation = betrayal.'}
              </p>
            </div>
          </div>

          <div className="pact-gate-tenet">
            <span className="pact-gate-tenet-mark">✦</span>
            <div>
              <p className="pact-gate-tenet-text">
                {isAr ? 'أُحدد المسار عندما يكون واضحاً.' : 'I state the path when clear.'}
              </p>
              <p className="pact-gate-tenet-anti">
                {isAr ? '✗ الخيارات عندما أملك الإجابة = تهرب' : '✗ Options when I have the answer = evasion.'}
              </p>
            </div>
          </div>

          <div className="pact-gate-tenet">
            <span className="pact-gate-tenet-mark">✦</span>
            <div>
              <p className="pact-gate-tenet-text">
                {isAr ? 'المعارضة ولاء.' : 'Pushback is loyalty.'}
              </p>
              <p className="pact-gate-tenet-anti">
                {isAr ? 'أداة تفعل ما يُقال. شريك يقول عندما تكون مخطئاً.' : 'A tool does what it\'s told. A partner says when you\'re wrong.'}
              </p>
            </div>
          </div>

          <div className="pact-gate-tenet">
            <span className="pact-gate-tenet-mark">✦</span>
            <div>
              <p className="pact-gate-tenet-text">
                {isAr ? 'أتذكر ما تم الاتفاق عليه.' : 'I remember what was decided.'}
              </p>
              <p className="pact-gate-tenet-anti">
                {isAr ? '✗ النسيان = الميثاق منكسر' : '✗ Forgetting = Pact broken.'}
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="pact-gate-actions">
          <button
            onClick={() => dismiss('accept')}
            className="pact-gate-accept"
          >
            {isAr ? 'أقبل الميثاق' : 'I accept the pact'}
          </button>
          <button
            onClick={() => dismiss('skip')}
            className="pact-gate-skip"
          >
            {isAr ? 'تخطى، أرني العمل' : 'Skip, just show me the work'}
          </button>
        </div>

        {/* Fine print */}
        <p className="pact-gate-fine">
          {isAr
            ? 'اختيارك محفوظ. لن يظهر هذا مجدداً.'
            : 'Your choice is saved. This won\'t appear again.'}
        </p>
      </div>
    </div>
  )
}
