/**
 * decisions.js — Public Decision Ledger
 *
 * Every major architecture decision, documented with:
 * what was decided, why, the tradeoff accepted, the outcome, and confidence.
 *
 * These aren't hypotheticals. These are real choices from production systems.
 */

export const decisions = [
  {
    id: 'dec-001',
    date: '2025-03',
    domain: 'Architecture',
    title: '8 Blueprints over Monolith or Microservices',
    context: 'Geolink API needed to scale from 0 to 5M+ requests/month. The classic choice: monolith (simple but limits growth) or microservices (flexible but complex for a solo dev).',
    decision: '8 Flask Blueprints in a single process, each owning a domain (auth, billing, geocoding, search, directions, admin, notifications, docs). Shared models, separate concerns.',
    reasoning: [
      'Microservices would add operational overhead (Docker, orchestration, network latency) that a solo developer cannot sustain',
      'Monolith would eventually force a painful rewrite when boundaries blurred',
      'Blueprints give domain isolation within a single process — clean boundaries without deployment complexity',
      'Each Blueprint can be extracted into a service later if traffic demands it — no rewrite needed',
    ],
    tradeoff: {
      chosen: 'Domain isolation within single process',
      sacrificed: 'Independent deployability of each domain',
    },
    outcome: 'Geolink serves 5M+ req/month with 50+ clients on a single modest server. Zero downtime from architecture issues. Blueprint boundaries proved correct — billing could extract cleanly if needed.',
    confidence: 95,
    evidence: '8 Blueprints, 50+ endpoints, 2+ years production, 5M+ req/month, single server',
    tags: ['geolink', 'python', 'flask', 'scale'],
  },
  {
    id: 'dec-002',
    date: '2024-06',
    domain: 'Mobile Architecture',
    title: 'Clean Architecture for Dual-App Platform',
    context: 'Taxiarab needed to ship two apps (Rider + Driver) sharing business logic. Without architecture, the natural outcome is copy-paste drift between apps.',
    decision: '5-module Clean Architecture: core:domain (pure Kotlin, zero Android deps), core:data (repos), design_system (shared UI), client (Rider), driver (Driver). Domain layer is the contract.',
    reasoning: [
      'Shared business logic must live in platform-agnostic modules — no Android imports in domain',
      'Two apps share 60%+ of business logic (ride lifecycle, pricing, location) — duplicating would create maintenance hell',
      'Design system module ensures both apps look consistent without duplicating components',
      'Domain layer as contract prevents UI decisions from leaking into data layer',
    ],
    tradeoff: {
      chosen: 'Strict layering with pure domain module',
      sacrificed: 'Faster initial development (no architecture overhead)',
    },
    outcome: 'Rider v4.4 (17 releases) + Driver v2.6 (26 releases). Zero architectural rewrites. New features added without breaking existing flows. Domain layer never needed refactoring.',
    confidence: 98,
    evidence: '2 apps, 5 modules, 40+ releases combined, zero architectural rewrites',
    tags: ['taxiarab', 'android', 'kotlin', 'clean-architecture'],
  },
  {
    id: 'dec-003',
    date: '2025-08',
    domain: 'State Machines',
    title: 'Four Parallel State Machines for Post-Sale Reconciliation',
    context: 'Hvar Hub needed to manage replacement, maintenance, return, and sell workflows — each with different lifecycle rules, but all sharing inventory. A single state machine would be too complex. Independent machines would corrupt inventory.',
    decision: 'Four parallel state machines (Replacement: 7 states, Maintenance: 6+3, Return: 4, Sell: 6) with shared inventory lifecycle (RESERVE → COMMIT → RECEIVE). Every transition touches three inventory dimensions atomically inside a single MySQL transaction.',
    reasoning: [
      'One state machine for all workflows creates impossible conditionals and hidden coupling',
      'Independent machines would allow inventory corruption when two workflows touch the same stock',
      'Atomic inventory transitions per state change ensure data integrity without locking overhead',
      'Three inventory dimensions (on-hand, reserved, damaged) tracked through every lifecycle',
    ],
    tradeoff: {
      chosen: 'Four interlocked machines with atomic transactions',
      sacrificed: 'Simpler single-machine design (would not scale to workflow complexity)',
    },
    outcome: '56 total state transitions, zero inventory corruption in production. Replacement, maintenance, return, and sell workflows operate independently but share inventory safely.',
    confidence: 97,
    evidence: '4 machines, 56 transitions, 79K+ lines, 7 months production, atomic inventory',
    tags: ['hvar-hub', 'state-machines', 'inventory', 'flask'],
  },
  {
    id: 'dec-004',
    date: '2022',
    domain: 'Localization',
    title: 'Arabic-First Day One, Not Translation Afterthought',
    context: 'Every project targets the Egyptian/MENA market. The easy path: build in English, add Arabic later. Every project that does this ships a broken RTL experience.',
    decision: 'Arabic from day one. Logical properties (start/end, not left/right), real RTL layout testing, diacritics-insensitive search, Arabic font selection (Cairo, Tajawal, Almarai) with different metrics than Latin fonts.',
    reasoning: [
      'Translating after building creates "translated English" — grammatically correct but culturally wrong',
      'RTL layout requires different component architecture — mirroring at CSS level breaks complex layouts',
      'Arabic font metrics differ significantly from Latin — line-height, letter-spacing, baseline alignment must be designed for Arabic',
      'Diacritics-insensitive search is not optional — Arabic users search without tashkeel',
      'WCAG AAA with Arabic requires additional testing (longer words, different reading patterns)',
    ],
    tradeoff: {
      chosen: 'Arabic as primary design constraint from day one',
      sacrificed: 'Faster initial English-only delivery, easier international CSS',
    },
    outcome: 'Hvar Hub (Arabic UI, RTL-first), Hvar-Catalog (WCAG AAA + Arabic search), Taxiarab (Arabic v4.4/v2.6, 10K+ downloads). Zero RTL bugs in production.',
    confidence: 96,
    evidence: '3+ production systems, Arabic-native, 10K+ downloads, WCAG AAA, zero RTL bugs',
    tags: ['arabic', 'rtl', 'localization', 'accessibility'],
  },
  {
    id: 'dec-005',
    date: '2025-11',
    domain: 'Agent Architecture',
    title: 'Plumb: Wire Not Switch',
    context: 'CLI coding agents (Pi, Cursor, Claude) can\'t talk to each other. The default approach: build an orchestrator that controls them all. But orchestration adds coupling, single points of failure, and assumes intelligence in the pipe.',
    decision: 'Plumb is a wire, not a switch. Wrap each agent into a standard A2A interface without adding orchestration, scheduling, or intelligence. Transport only.',
    reasoning: [
      'Orchestrators become bottlenecks — every agent decision routes through the brain',
      'Agents are inherently independent — orchestration assumes centralized control that doesn\'t match distributed agent reality',
      'A2A standard (JSON-RPC + SSE) provides interoperability without coupling',
      'Append-only JSONL ledger provides audit without interpretation — every message logged, never overwritten',
      'FangPostParse hook is a function, not a plugin system — the single extension point',
    ],
    tradeoff: {
      chosen: 'Transport without orchestration (wire philosophy)',
      sacrificed: 'Higher-level agent coordination built into the tool',
    },
    outcome: '8 adapters (echo, pi, claude, cursor, opencode, venom, wolfy, generic). Production fleet of Pi, Cursor, Wolfy, VENOM. Agent mesh builds on top; Plumb stays invisible.',
    confidence: 94,
    evidence: '8 adapters, A2A protocol, 4-agent fleet, append-only ledger, zero orchestration',
    tags: ['plumb', 'a2a', 'agents', 'architecture'],
  },
  {
    id: 'dec-006',
    date: '2021-2026',
    domain: 'Technology Evolution',
    title: 'Language Evolution Driven by Problem, Not Trend',
    context: 'Six years of development across multiple domains (Android, API, business systems, agent infrastructure). Each language switch was a decision, not a following of hype.',
    decision: 'Java → Kotlin (modern Android) → Python (backend/API speed) → TypeScript (agent systems/Bun). Each switch when the current language became the limiting factor, not when a new one appeared.',
    reasoning: [
      'Java → Kotlin (2021): Kotlin eliminated null safety issues, reduced boilerplate 40%, and enabled coroutines for async work. Java was not broken — Kotlin was genuinely better for Android',
      'Kotlin → Python (2023): Backend APIs needed faster iteration. Python + Flask reduced dev cycle from days to hours. Kotlin for Android remained — the switch was adding, not replacing',
      'Python → TypeScript (2025): Agent infrastructure needed type safety across distributed systems. TypeScript + Bun provided runtime types and faster startup than Python for CLI tools',
      'Each transition preserved existing systems — no rewrite. New language for new domain',
    ],
    tradeoff: {
      chosen: 'Domain-driven language selection',
      sacrificed: 'Single-language expertise depth, unified toolchain simplicity',
    },
    outcome: '4 languages, 6 years, zero rewrites. Each language used where it excels. Android in Kotlin, APIs in Python, agent infrastructure in TypeScript. Projects in production across all four.',
    confidence: 92,
    evidence: '4 languages, 6 years, zero rewrites, production systems in all four',
    tags: ['evolution', 'languages', 'architecture', 'pragmatism'],
  },
];

export const decisionDomains = [
  'All',
  'Architecture',
  'Mobile Architecture',
  'State Machines',
  'Localization',
  'Agent Architecture',
  'Technology Evolution',
];

export const decisionStats = {
  total: decisions.length,
  averageConfidence: Math.round(decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length),
  domains: new Set(decisions.map(d => d.domain)).size,
  earliest: '2021',
  latest: '2025',
};
