import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { ArrowRight } from 'lucide-react'

const machines = [
  {
    id: 'replacement',
    name: 'Replacement',
    icon: '⇄',
    states: ['Confirm', 'Prepare', 'Dispatch', 'Receive', 'Validate', 'Complete', 'Cancel'],
    transitions: 12,
    description: 'Reserve at confirm, commit at dispatch, receive at validation — three different stock operations in one atomic flow.',
    color: 'var(--navigator)',
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: '🔧',
    states: ['Report', 'Inspect', 'IN_PROCESS', 'Repair', 'Quality Check', 'Return'],
    transitions: 10,
    description: 'Status stays IN_PROCESS while three internal actions happen — tracked via history counting, not status flags.',
    color: 'var(--compass)',
  },
  {
    id: 'return',
    name: 'Return',
    icon: '↩',
    states: ['Request', 'Approve', 'Receive', 'Validate Condition', 'Refund'],
    transitions: 5,
    description: 'Clean by design. Receive, validate condition, done. The shortest path with zero ambiguity.',
    color: 'var(--horizon)',
  },
  {
    id: 'sell',
    name: 'Sell',
    icon: '💰',
    states: ['Order', 'Pick', 'Pack', 'Ship', 'Deliver', 'Complete'],
    transitions: 8,
    description: 'Products are reference-only. Only parts get reserved. Different rules for different item types within one flow.',
    color: 'var(--growth)',
  },
]

function MachineCard({ machine, active, onClick, index, visible }) {
  return (
    <div
      className={`diagram-machine ${active === machine.id ? 'active' : ''}`}
      onClick={() => onClick(machine.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(machine.id)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <div className="diagram-machine-header">
        <span className="diagram-machine-icon">{machine.icon}</span>
        <div>
          <div className="diagram-machine-name">{machine.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgb(var(--ink-tertiary))', fontFamily: '"JetBrains Mono", monospace' }}>
            {machine.transitions} transitions
          </div>
        </div>
      </div>

      <div className="diagram-machine-states">
        {machine.states.map((state) => (
          <span
            key={state}
            className={`diagram-state ${
              active === machine.id ? 'active-state' : ''
            }`}
            style={
              active === machine.id
                ? { background: `${machine.color}15`, color: machine.color }
                : {}
            }
          >
            {state}
          </span>
        ))}
      </div>

      {active === machine.id && (
        <div className="diagram-flow">
          <ArrowRight size={12} className="diagram-flow-arrow" />
          <span>{machine.description}</span>
        </div>
      )}
    </div>
  )
}

export default function SystemDiagram() {
  const { t } = useLanguage()
  const [active, setActive] = useState(null)
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })
  const [gridRef, gridVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="diagram-section" id="architecture">
      <div
        ref={headerRef}
        className="diagram-header"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="gate-section-label">{t('diagram.title')}</div>
        <h2 className="diagram-title">
          <span className="gradient-text-static">Hvar-Hub</span>
        </h2>
        <p className="diagram-subtitle">{t('diagram.subtitle')}</p>
      </div>

      <div
        ref={gridRef}
        className="diagram-machines"
      >
        {machines.map((machine, i) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            active={active}
            onClick={setActive}
            index={i}
            visible={gridVisible}
          />
        ))}
      </div>

      {active && (
        <div
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.8125rem',
            color: 'rgb(var(--ink-tertiary))',
            fontFamily: '"JetBrains Mono", monospace',
            opacity: 0,
            animation: 'gateContentAppear 0.5s ease forwards',
          }}
        >
          Click another machine to explore
        </div>
      )}
    </section>
  )
}
