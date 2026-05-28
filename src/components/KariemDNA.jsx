import React, { useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';

/**
 * KariemDNA — Card Styles Refined (v2)
 *
 * Visual hierarchy. Color-coded patterns. Better emphasis.
 * Each pattern feels distinct, not generic.
 */

const patterns = [
  {
    id: 'builder',
    name: 'The Builder',
    icon: '🏗️',
    tier: 'core',
    accent: 'from-blue-500 to-cyan-500',
    tagline: 'Full-stack, end-to-end, complete systems',
    description: 'Builds entire ecosystems, not features',
    evidence: [
      'Hvar-Hub: 79K lines, 4 state machines, ERP→Bosta→Customer reconciliation',
      'Taxiarab: Dual-app platform (Rider + Driver), Clean Architecture, 15K+ downloads',
      'Geolink API: Production system, 5M+ req/month, 50+ clients',
    ],
    thinking: 'When I see a problem, I see the system. Not "build a feature"—"build the ecosystem that solves this permanently."',
    strength: 95,
  },
  {
    id: 'specialist',
    name: 'The Specialist',
    icon: '🗺️',
    tier: 'core',
    accent: 'from-emerald-500 to-teal-500',
    tagline: 'Geolocation mastery — 10+ years depth',
    description: 'Domain expertise that compounds. Rare skill.',
    evidence: [
      'Geolink (public API): 8 stars, used in production',
      '10+ geolocation projects: Areo, Taxiarab, GeoEgy, Routing systems',
      'Egyptian market leader in location services',
    ],
    thinking: 'Geolocation isn\'t just a feature—it\'s a domain. I know the whole stack: geocoding, reverse geocoding, routing, real-time tracking, sensor fusion.',
    strength: 98,
  },
  {
    id: 'systems-thinker',
    name: 'The Systems Thinker',
    icon: '🌐',
    tier: 'core',
    accent: 'from-purple-500 to-pink-500',
    tagline: 'Connections > Isolation. Ecosystem > Feature.',
    description: 'Projects form a network, not a portfolio.',
    evidence: [
      'Geolink API used by: Areo, Taxiarab, GeoEgy, multiple startups',
      'Hvar-Hub integrates: ERP, Bosta shipping, customer calls, inventory—atomic across all three',
      'Platform thinking: Frontend + Backend + Mobile + Admin, not separate',
    ],
    thinking: 'Real systems aren\'t monoliths or isolated microservices. They\'re ecosystems. Projects build on each other. Everything connects.',
    strength: 92,
  },
  {
    id: 'producer',
    name: 'The Producer',
    icon: '⚡',
    tier: 'support',
    accent: 'from-amber-500 to-orange-500',
    tagline: 'Production systems. Not prototypes. Not theory.',
    description: 'Deployed, monitored, documented, live.',
    evidence: [
      'WSGI deployment: Gunicorn + production servers, not localhost',
      'PWA capabilities: QR scanning, offline support, background services',
      'Documentation-first: README, deployment guides, architecture docs',
      'Error handling: Comprehensive logging, graceful degradation, retry strategies',
    ],
    thinking: 'If it\'s not in production, it doesn\'t count. Real systems fail. Real systems need recovery.',
    strength: 96,
  },
  {
    id: 'localizer',
    name: 'The Localizer',
    icon: '🌍',
    tier: 'support',
    accent: 'from-red-500 to-rose-500',
    tagline: 'Arabic/RTL first-class, not an afterthought',
    description: 'Not translated. Not adapted. Native.',
    evidence: [
      'Hvar-Hub: Arabic UI from ground up, Cairo + Tajawal fonts, RTL-first architecture',
      'Hvar-Catalog: WCAG AAA accessibility + Arabic diacritics-insensitive search',
      'Taxiarab: Arabic version v4.4 (Rider), v2.6 (Driver), 10K+ downloads',
    ],
    thinking: 'Arabic/RTL isn\'t a feature to add later. It\'s a first-class design requirement. Different font metrics, different layout rules, different UX patterns.',
    strength: 94,
  },
  {
    id: 'evolver',
    name: 'The Evolver',
    icon: '🔄',
    tier: 'support',
    accent: 'from-indigo-500 to-blue-500',
    tagline: 'Continuous learning. Technology adoption. Growth.',
    description: 'Not stuck. Always moving forward.',
    evidence: [
      'Language evolution: Java → Kotlin → Python → TypeScript → Bun',
      'Framework evolution: Android Native → Jetpack Compose, React 16 → 18+',
      'Project evolution: Geolink v1 → Public → v2, GeoEgy → Orders → Traders',
      'Architecture evolution: Monolithic → Modular → Clean Architecture',
    ],
    thinking: 'Every project teaches. Every failure refines. I\'m not the same developer I was 6 months ago—and I won\'t be in 6 more.',
    strength: 88,
  },
  {
    id: 'market-focused',
    name: 'The Market-Focused Builder',
    icon: '💼',
    tier: 'context',
    accent: 'from-cyan-500 to-blue-500',
    tagline: 'Egyptian market. MENA region. Real problems.',
    description: 'Solves actual business problems, not hypothetical ones.',
    evidence: [
      'Bosta integration: Real shipping partner, real API, real coordination',
      'Hvar-Hub: Built for actual retail workflows, tested in production',
      'geolink-eg: Egyptian-first, not global-first-then-localized',
      'Taxiarab: 1000s of real drivers, real earnings tracking, real geographic data',
    ],
    thinking: 'I know this market. I know what problems exist here. I build for here, not for hypothetical Silicon Valley use cases.',
    strength: 91,
  },
  {
    id: 'integrator',
    name: 'The Integrator',
    icon: '🔌',
    tier: 'context',
    accent: 'from-lime-500 to-green-500',
    tagline: 'Real APIs. Third-party services. Complex choreography.',
    description: 'Not isolated. Wired into the real world.',
    evidence: [
      'Google Maps: Deep integration for geocoding, directions, rendering',
      'Bosta API: Shipping state synchronization, tracking updates',
      'Firebase: Auth, real-time sync, push notifications, analytics',
      'Pusher WebSocket: Real-time ride events, presence channels',
      'WhatsApp API: Customer communication integration',
    ],
    thinking: 'Real systems don\'t live in isolation. They integrate. They coordinate. They handle failures gracefully.',
    strength: 89,
  },
];

export default function KariemDNA() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  const displayPatterns =
    filter === 'all'
      ? patterns
      : patterns.filter((p) => p.tier === filter);

  const tierOrder = { core: 0, support: 1, context: 2 };
  const sorted = [...displayPatterns].sort(
    (a, b) => tierOrder[a.tier] - tierOrder[b.tier]
  );

  return (
    <div className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-white mb-2">
            The Patterns That Prove It
          </h2>
          <p className="text-xl text-slate-300 mb-6">
            Eight recurring patterns. Eight ways of thinking. Proven through 75+ projects.
          </p>
          <div className="flex gap-3 flex-wrap">
            {[
              { id: 'all', label: '8 Core Patterns', icon: '🧬' },
              { id: 'core', label: '3 Core', icon: '⭐' },
              { id: 'support', label: '3 Supporting', icon: '🛠️' },
              { id: 'context', label: '2 Context', icon: '🌍' },
            ].map((filter_btn) => (
              <button
                key={filter_btn.id}
                onClick={() => setFilter(filter_btn.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filter === filter_btn.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {filter_btn.icon} {filter_btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sorted.map((pattern) => (
            <div
              key={pattern.id}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                expanded === pattern.id
                  ? 'border-slate-600 ring-2 ring-offset-2 ring-offset-slate-950'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => setExpanded(expanded === pattern.id ? null : pattern.id)}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pattern.accent}`}
              />
              <div className="bg-slate-800/40 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded uppercase tracking-wider ${
                      pattern.tier === 'core'
                        ? 'bg-blue-900/50 text-blue-200'
                        : pattern.tier === 'support'
                          ? 'bg-amber-900/50 text-amber-200'
                          : 'bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    {pattern.tier}
                  </span>
                  <span className="text-xs text-slate-500">
                    {pattern.strength}% proven
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="text-4xl flex-shrink-0">{pattern.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {pattern.name}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {pattern.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 italic">
                  {pattern.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors">
                  <span>
                    {expanded === pattern.id ? 'Less' : 'More'} details
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      expanded === pattern.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {expanded === pattern.id && (
                <div className="p-6 border-t border-slate-700 bg-slate-900/50 space-y-4 max-h-96 overflow-y-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                      <Zap size={14} className="text-amber-400" />
                      Proven By
                    </h4>
                    <ul className="space-y-2">
                      {pattern.evidence.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-300 flex gap-2 leading-relaxed"
                        >
                          <span className="text-amber-400 flex-shrink-0">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded border-l-2 bg-slate-800/50 border-l-slate-600">
                    <p className="text-xs text-slate-200 italic">
                      <strong className="block text-slate-100 mb-1">
                        How I think:
                      </strong>
                      {pattern.thinking}
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${pattern.accent} animate-pulse`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { tier: 'Core', icon: '⭐', color: 'blue', description: 'The foundation. Builder, Specialist, Systems Thinker.' },
            { tier: 'Supporting', icon: '🛠️', color: 'amber', description: 'Enablers. Producer, Localizer, Evolver.' },
            { tier: 'Context', icon: '🌍', color: 'slate', description: 'Situational. Market-Focused, Integrator.' },
          ].map((tier_info) => (
            <div key={tier_info.tier} className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
              <h4 className="text-sm font-bold text-white mb-2">
                {tier_info.icon} {tier_info.tier}
              </h4>
              <p className="text-xs text-slate-400">{tier_info.description}</p>
            </div>
          ))}
        </div>

        <div className="border-l-4 border-slate-600 pl-6">
          <p className="text-slate-300 text-sm leading-relaxed mb-2">
            <strong>These aren't random.</strong> They're proven patterns from 75+ projects.
          </p>
          <p className="text-slate-400 text-xs">
            Every pattern. Every project. Every decision. Documented. Reasoned. Built.
          </p>
        </div>
      </div>
    </div>
  );
}
