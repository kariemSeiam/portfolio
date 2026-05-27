import React, { useState } from 'react';
import { ChevronRight, Zap, Layers, Globe, GitBranch } from 'lucide-react';

/**
 * KariemDNA Component
 * 
 * Not portfolio architecture. Not clever meta.
 * Who Kariem actually is, through the patterns proven in the work.
 * 
 * 8 core patterns. 75+ projects prove them. This component shows the truth.
 */

const patterns = [
  {
    id: 'builder',
    name: 'The Builder',
    icon: '🏗️',
    tagline: 'Full-stack, end-to-end, complete systems',
    description: 'Builds entire ecosystems, not features',
    evidence: [
      'Hvar-Hub: 79K lines, 4 state machines, ERP→Bosta→Customer reconciliation',
      'Taxiarab: Dual-app platform (Rider + Driver), Clean Architecture, 15K+ downloads',
      'Geolink API: Production system, 5M+ req/month, 50+ clients',
    ],
    thinking: 'When I see a problem, I see the system. Not "build a feature"—"build the ecosystem that solves this permanently."',
  },
  {
    id: 'specialist',
    name: 'The Specialist',
    icon: '🗺️',
    tagline: 'Geolocation mastery — 10+ years depth',
    description: 'Domain expertise that compounds. Rare skill.',
    evidence: [
      'Geolink (public API): 8 stars, used in production',
      '10+ geolocation projects: Areo, Taxiarab, GeoEgy, Routing systems',
      'Egyptian market leader in location services',
    ],
    thinking: 'Geolocation isn\'t just a feature—it\'s a domain. I know the whole stack: geocoding, reverse geocoding, routing, real-time tracking, sensor fusion.',
  },
  {
    id: 'localizer',
    name: 'The Localizer',
    icon: '🌍',
    tagline: 'Arabic/RTL first-class, not an afterthought',
    description: 'Not translated. Not adapted. Native.',
    evidence: [
      'Hvar-Hub: Arabic UI from ground up, Cairo + Tajawal fonts, RTL-first architecture',
      'Hvar-Catalog: WCAG AAA accessibility + Arabic diacritics-insensitive search',
      'Taxiarab: Arabic version v4.4 (Rider), v2.6 (Driver), 10K+ downloads',
    ],
    thinking: 'Arabic/RTL isn\'t a feature to add later. It\'s a first-class design requirement. Different font metrics, different layout rules, different UX patterns.',
  },
  {
    id: 'producer',
    name: 'The Producer',
    icon: '⚡',
    tagline: 'Production systems. Not prototypes. Not theory.',
    description: 'Deployed, monitored, documented, live.',
    evidence: [
      'WSGI deployment: Gunicorn + production servers, not localhost',
      'PWA capabilities: QR scanning, offline support, background services',
      'Documentation-first: README, deployment guides, architecture docs',
      'Error handling: Comprehensive logging, graceful degradation, retry strategies',
    ],
    thinking: 'If it\'s not in production, it doesn\'t count. Real systems fail. Real systems need recovery.',
  },
  {
    id: 'evolver',
    name: 'The Evolver',
    icon: '🔄',
    tagline: 'Continuous learning. Technology adoption. Growth.',
    description: 'Not stuck. Always moving forward.',
    evidence: [
      'Language evolution: Java → Kotlin → Python → TypeScript → Bun',
      'Framework evolution: Android Native → Jetpack Compose, React 16 → 18+',
      'Project evolution: Geolink v1 → Public → v2, GeoEgy → Orders → Traders',
      'Architecture evolution: Monolithic → Modular → Clean Architecture',
    ],
    thinking: 'Every project teaches. Every failure refines. I\'m not the same developer I was 6 months ago—and I won\'t be in 6 more.',
  },
  {
    id: 'systems-thinker',
    name: 'The Systems Thinker',
    icon: '🌐',
    tagline: 'Connections > Isolation. Ecosystem > Feature.',
    description: 'Projects form a network, not a portfolio.',
    evidence: [
      'Geolink API used by: Areo, Taxiarab, GeoEgy, multiple startups',
      'Hvar-Hub integrates: ERP, Bosta shipping, customer calls, inventory—atomic across all three',
      'Platform thinking: Frontend + Backend + Mobile + Admin, not separate',
    ],
    thinking: 'Real systems aren\'t monoliths or isolated microservices. They\'re ecosystems. Projects build on each other. Everything connects.',
  },
  {
    id: 'market-focused',
    name: 'The Market-Focused Builder',
    icon: '💼',
    tagline: 'Egyptian market. MENA region. Real problems.',
    description: 'Solves actual business problems, not hypothetical ones.',
    evidence: [
      'Bosta integration: Real shipping partner, real API, real coordination',
      'Hvar-Hub: Built for actual retail workflows, tested in production',
      'geolink-eg: Egyptian-first, not global-first-then-localized',
      'Taxiarab: 1000s of real drivers, real earnings tracking, real geographic data',
    ],
    thinking: 'I know this market. I know what problems exist here. I build for here, not for hypothetical Silicon Valley use cases.',
  },
  {
    id: 'integrator',
    name: 'The Integrator',
    icon: '🔌',
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
  },
];

export default function KariemDNA() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4">
            <h2 className="text-5xl font-bold text-white mb-2">
              The Patterns That Prove It
            </h2>
            <p className="text-xl text-slate-300">
              Not claimed. Not marketed. Proven through 75+ projects.
            </p>
          </div>
          <p className="text-slate-400 max-w-3xl leading-relaxed">
            Eight recurring patterns. Eight ways of thinking. They appear in every project because they're not strategies—they're how I actually build.
          </p>
        </div>

        {/* Pattern Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          {patterns.map((pattern) => (
            <div
              key={pattern.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-all"
            >
              {/* Header */}
              <button
                onClick={() =>
                  setExpanded(expanded === pattern.id ? null : pattern.id)
                }
                className="w-full p-6 hover:bg-slate-800/60 flex items-start gap-4 cursor-pointer transition-colors"
              >
                <div className="text-4xl flex-shrink-0">{pattern.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {pattern.name}
                  </h3>
                  <p className="text-sm text-slate-300 mb-2">
                    {pattern.tagline}
                  </p>
                  <p className="text-xs text-slate-500">{pattern.description}</p>
                </div>
                <ChevronRight
                  size={24}
                  className={`text-slate-400 transition-transform flex-shrink-0 ${
                    expanded === pattern.id ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Expanded: Evidence + Thinking */}
              {expanded === pattern.id && (
                <div className="p-6 border-t border-slate-700 bg-slate-900/50 space-y-6">
                  {/* Evidence */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                      <Zap size={16} className="text-amber-400" />
                      Proven By
                    </h4>
                    <ul className="space-y-2">
                      {pattern.evidence.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-300 flex gap-3 leading-relaxed"
                        >
                          <span className="text-amber-400 flex-shrink-0 mt-0.5">
                            ▸
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Thinking */}
                  <div className="p-4 bg-slate-800 border-l-2 border-blue-500 rounded">
                    <p className="text-sm text-slate-200 italic">
                      <strong className="text-blue-300">My thinking:</strong>{' '}
                      {pattern.thinking}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Insight: What This Means */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">What This Means</h3>
          <div className="space-y-4 text-slate-300">
            <p>
              These 8 patterns aren't random. They're not "best practices I read about." They're responses to real problems I've solved.
            </p>
            <p>
              When you hire me, you're not hiring someone who <em>knows</em> these patterns. You're hiring someone who <em>is</em> these patterns. It's how I think. It's how I build.
            </p>
            <p>
              The builder ships complete systems. The specialist knows geolocation deeper than most people know their home city. The localizer doesn't translate—they design natively. The producer deploys to production, not just to localhost.
            </p>
            <p>
              And when a project breaks—and they do break—the systems thinker knows where the cracks come from because they understand how all the pieces connect.
            </p>
          </div>
        </div>

        {/* Reality Check */}
        <div className="border-l-4 border-slate-600 pl-6 space-y-2">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>This portfolio shows what I do. The BrainHub shows why.</strong>
          </p>
          <p className="text-slate-400 text-xs">
            Every project. Every pattern. Every decision. Documented. Reasoned. Built.
          </p>
        </div>
      </div>
    </div>
  );
}
