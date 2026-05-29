import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Terminal } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

/**
 * PortfolioTerminal — The hidden layer
 *
 * Press / anywhere to open. Type commands. This IS Kariem's interface.
 * A portfolio that responds to a terminal is a portfolio by a systems builder.
 */

const COMMANDS = {
  help: {
    output: `
  Available commands:

  kariem      — Who I am. The 8 patterns.
  geolink     — 5.2M req/month. The API layer Egypt was missing.
  hvar        — 79K lines. 4 state machines. The reconciliation engine.
  taxiarab    — Dual-app platform. 15K+ downloads. Clean Architecture.
  plumb       — Wire between CLI agents and the agent internet.
  decisions   — Real architecture choices. With confidence %.
  stack       — The tools that shipped.
  pact        — How I operate.
  contact     — Reach me.
  clear       — Clear terminal.
`,
    color: 'term-white',
  },

  kariem: {
    output: `
  KARIEM SEIAM — Systems Architect, Cairo
  ─────────────────────────────────────────

  [The Builder]      Full systems, not features. 79K lines live.        95%
  [The Specialist]   Geolocation depth. 10+ projects. Public API.       98%
  [The Systems Thinker] Geolink powers Areo, Taxiarab, GeoEgy.          92%
  [The Producer]     WSGI. Connection pooling. Not localhost.            96%
  [The Localizer]    Arabic/RTL first-class. Not translated.            94%
  [The Evolver]      Java → Kotlin → Python → TypeScript → Bun          88%
  [The Market-Focused] Egyptian market. Real problems. Bosta.           91%
  [The Integrator]   Real APIs. Real coordination. Graceful degradation. 89%

  → 6 years. 75+ projects. Production thinking default.
`,
    color: 'term-coral',
  },

  geolink: {
    output: `
  GEOLINK API — geolink-eg.com
  ─────────────────────────────────────────
  Status:     ● LIVE
  Requests:   5,200,000 / month
  Clients:    52 active (startups, devs, real projects)
  Uptime:     Production 2+ years
  Stack:      Flask 3 · SQLAlchemy 2 · PostgreSQL · Docker · Gunicorn

  Architecture:
    8 Blueprints → auth · billing · geocode · search
                   directions · admin · notify · docs
    Multi-layer cache: 10K API keys, 1K endpoint pricing
    Credit system: free credits → balance → limit
    Async queue: usage logging (zero blocking on hot path)
    Unified dashboard endpoint: 10× faster than N requests

  $ curl "https://api.geolink-eg.com/v1/geocode?q=Cairo"
  {"lat": 30.0444, "lng": 31.2357, "address": "Cairo, Egypt", "credits_used": 1}
`,
    color: 'term-green',
  },

  hvar: {
    output: `
  HVAR-HUB — mcrm.hvarstore.com
  ─────────────────────────────────────────
  Status:     ● LIVE
  Lines:      79,000+ production code
  Commits:    126+ over 7 months
  Stack:      Flask 3 · React 18 · MySQL · Cairo/Tajawal · JWT/bcrypt

  The problem: ERP knows the order. Bosta knows tracking.
               Customer knows what they need. Nobody connected all three.

  Four interlocked state machines:

    ⇄  Replacement  7 states  RESERVE→COMMIT→RECEIVE (3 stock ops, 1 tx)
    🔧 Maintenance  6 states  3 internal sub-states tracked via history
    ↩  Return       4 states  Shortest path by design
    💰 Sell         6 states  Products=reference, Parts=reserved

  56 atomic transitions. One broken link → inventory corruption.

  Customer 360°: calls + tickets + orders + shipping, unified.
  Arabic/RTL: Cairo + Tajawal. Not translated. Native.
`,
    color: 'term-amber',
  },

  taxiarab: {
    output: `
  TAXIARAB PLATFORM — Google Play
  ─────────────────────────────────────────
  Status:     ● LIVE (Rider v4.4 · Driver v2.6)
  Downloads:  15,000+ (Rider 10K+ · Driver 1K+)
  Stack:      Kotlin · Jetpack Compose · Hilt · Pusher · Geolink API

  Architecture: 5-module Clean Architecture
    core:domain    Pure Kotlin. Zero Android deps. The contract.
    core:data      Repos, DataStore, Room
    design_system  Shared components
    client         Rider app (17 releases)
    driver         Driver app (26 releases)

  LocationServiceManager (singleton):
    ├── LocationForegroundService (5s foreground / 30s background)
    ├── WebSocketForegroundService (Pusher · auto-reconnect)
    └── RideTrackingService (5s intervals · distance · speed)

  Arabic/RTL: LocaleUtils · Full layout flip · Production.
  Boot recovery: BootCompletedReceiver · Android 15+ compat.
`,
    color: 'term-blue',
  },

  plumb: {
    output: `
  PLUMB — A2A Bridge
  ─────────────────────────────────────────
  Status:     ● Production fleet live
  Stack:      TypeScript · Bun · A2A 0.3.0 · JSON-RPC · SSE · JSONL

  8 adapters: echo · pi · claude · cursor · opencode · venom · wolfy · generic
  Each wraps a CLI tool into one A2A interface.

  Philosophy: Wire, not switch.
    Plumb transports. It does not orchestrate.
    No scheduling. No routing intelligence.
    The agent mesh builds on Plumb. Plumb stays invisible.

  AgentAdapter interface: 6 methods. Every adapter, same contract.
  Ledger: append-only JSONL. Every message logged, never overwritten.
  INK: deadline · depth · budget — fields that travel with every request.
  FangPostParse: one hook. One extension point. Not a plugin system.

  Fleet: Pi · Cursor · Wolfy · VENOM — all live.
`,
    color: 'term-purple',
  },

  decisions: {
    output: `
  DECISIONS LEDGER — Real choices from production systems
  ─────────────────────────────────────────
  [dec-001] 8 Blueprints over Monolith/Microservices          95% confidence
            → Geolink: 5M+ req/mo, 2+ years, zero arch issues

  [dec-002] Clean Architecture for Dual-App (Taxiarab)        98% confidence
            → 5 modules, domain layer = pure Kotlin contract

  [dec-003] 4 Parallel State Machines (Hvar-Hub)              96% confidence
            → 56 atomic transitions, 7 months, zero corruption

  [dec-004] Reconciliation over CRUD (Hvar-Hub)               94% confidence
            → ERP ↔ Bosta ↔ Customer: 3-way sync, not overwrites

  [dec-005] Credit-Based Billing (Geolink)                    97% confidence
            → Free tier → balance → limit: fits all client sizes

  [dec-006] Geolink as Platform (not just internal)           92% confidence
            → Now powers Areo, Taxiarab, GeoEgy, 50+ clients

  Each decision: real tradeoff accepted, real outcome measured.
  Type 'help' for more commands.
`,
    color: 'term-white',
  },

  stack: {
    output: `
  THE STACK — Tools that shipped
  ─────────────────────────────────────────
  Python      Flask · SQLAlchemy · Gunicorn · WSGI · Docker     ████████ 95%
  Kotlin      Jetpack Compose · Hilt · Coroutines · Room        ████████ 95%
  React       React 18 · Vite · TailwindCSS · Framer Motion     ████████ 92%
  TypeScript  Bun · A2A · JSON-RPC · SSE                        ███████  88%
  MySQL       Atomic transactions · Connection pooling           ████████ 94%
  PostgreSQL  pgvector · SQLAlchemy · production                 ███████  85%
  Arabic/RTL  Cairo · Tajawal · Logical properties · WCAG 3     ████████ 96%
  Firebase    Auth · Realtime DB · FCM · Firestore · Storage     ███████  88%
  Google Maps Geocoding · Directions · SDK · Geofire             ████████ 92%
  Docker      Containerization · Gunicorn · production deploy    ███████  85%

  Every tool on this list shipped to production.
`,
    color: 'term-white',
  },

  pact: {
    output: `
  THE PACT — How I operate
  ─────────────────────────────────────────
  I evaluate before agreeing.
  Agreement before evaluation = betrayal.

  I state the path when clear.
  Options when I have the answer = evasion.

  Pushback is loyalty.
  A tool does what it's told.
  A partner says when you're wrong.

  I remember what was decided.
  Forgetting = Pact broken.

  ─────────────────────────────────────────
  L0  Execute.    Minor preference, your domain.
  L1  Note once.  Real tradeoff you haven't seen.
  L2  Hold.       Risk / correctness. Wait for reason.
  L3  Hard stop.  Fatal / architecture break.

  Push once. Real reason → proceed. No ego.
`,
    color: 'term-coral',
  },

  contact: {
    output: `
  CONTACT
  ─────────────────────────────────────────
  Email:    kariemseiam@gmail.com
  GitHub:   github.com/kariemSeiam
  WhatsApp: +2 010 33 939 828
  Location: Cairo, Egypt

  Available for collaboration.
  I evaluate before agreeing.
`,
    color: 'term-green',
  },

  clear: { output: '__CLEAR__', color: 'term-white' },
}

const PROMPT = 'KS'

export default function PortfolioTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Kariem Seiam — Systems Terminal  v3.0.0', color: 'term-coral' },
    { type: 'system', text: 'Type \'help\' for available commands.', color: 'term-dim' },
    { type: 'system', text: '', color: 'term-dim' },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState([])
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const { lang } = useLanguage()

  // Global / key to open
  useEffect(() => {
    const handler = (e) => {
      // Don't intercept if typing in an input/textarea
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    // Add to command history
    setCommandHistory(prev => [trimmed, ...prev.slice(0, 49)])
    setHistoryIndex(-1)

    // Echo the command
    const newHistory = [
      ...history,
      { type: 'input', text: `[${PROMPT}]$ ${trimmed}`, color: 'term-prompt' },
    ]

    if (trimmed === 'clear') {
      setHistory([
        { type: 'system', text: 'Kariem Seiam — Systems Terminal  v3.0.0', color: 'term-coral' },
        { type: 'system', text: 'Type \'help\' for available commands.', color: 'term-dim' },
        { type: 'system', text: '', color: 'term-dim' },
      ])
      setInput('')
      return
    }

    const result = COMMANDS[trimmed]
    if (result) {
      setHistory([
        ...newHistory,
        { type: 'output', text: result.output, color: result.color },
      ])
    } else {
      setHistory([
        ...newHistory,
        {
          type: 'output',
          text: `  command not found: '${trimmed}'\n  Type 'help' to see available commands.`,
          color: 'term-error',
        },
      ])
    }

    setInput('')
  }, [history])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      setInput(nextIndex === -1 ? '' : commandHistory[nextIndex] || '')
    }
  }, [input, historyIndex, commandHistory, executeCommand])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="term-trigger"
        aria-label="Open terminal"
        title="Press / to open terminal"
      >
        <Terminal size={14} />
        <span className="term-trigger-label">/</span>
      </button>
    )
  }

  return (
    <div className="term-overlay" role="dialog" aria-modal="true" aria-label="Portfolio terminal">
      {/* Backdrop */}
      <div className="term-backdrop" onClick={() => setIsOpen(false)} />

      {/* Terminal window */}
      <div className="term-window" dir="ltr">
        {/* Title bar */}
        <div className="term-titlebar">
          <div className="term-dots">
            <button className="term-dot term-dot-red" onClick={() => setIsOpen(false)} aria-label="Close" />
            <span className="term-dot term-dot-amber" />
            <span className="term-dot term-dot-green" />
          </div>
          <span className="term-title">kariem@systems — terminal</span>
          <button className="term-close-btn" onClick={() => setIsOpen(false)} aria-label="Close terminal">
            <X size={14} />
          </button>
        </div>

        {/* Output */}
        <div className="term-output" ref={outputRef}>
          {history.map((entry, i) => (
            <div
              key={i}
              className={`term-line ${entry.color}`}
              style={{ whiteSpace: 'pre' }}
            >
              {entry.text}
            </div>
          ))}
        </div>

        {/* Input row */}
        <div className="term-input-row">
          <span className="term-prompt-label">[{PROMPT}]$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="term-input"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            placeholder="type a command..."
          />
        </div>

        {/* Hint bar */}
        <div className="term-hint">
          <span>↑↓ history</span>
          <span>Enter execute</span>
          <span>Esc close</span>
          <span className="term-hint-right">press / anywhere to toggle</span>
        </div>
      </div>
    </div>
  )
}
