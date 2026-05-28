import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Lightbulb, GitBranch, Scale, TrendingUp, ArrowRight } from 'lucide-react';

/**
 * ThinkingAmplified — Infinite Depth Pattern Explorer
 *
 * Left: Pattern selector (click to explore)
 * Right: Deep dive (reasoning → evidence chain → tradeoffs → trajectory)
 *
 * Shows how Kariem thinks, not just what he built.
 */

const patterns = [
  {
    id: 'builder',
    name: 'The Builder',
    icon: '🏗️',
    accent: 'from-blue-500 to-cyan-500',
    tagline: 'Full-stack, end-to-end, complete systems',
    summary: 'I don\'t build features. I build ecosystems that solve problems permanently.',
    reasoning: `Every project starts with the same question: "What is the system that makes this problem go away forever?" 

Not "what feature solves the immediate need" — that creates technical debt disguised as progress. 

The answer is always a system: a layer between two things that weren't connected, a state machine that guarantees consistency, a bridge that replaces a manual process. Hvar Hub isn't a feature — it's the nervous system between ERP, shipping, and customers. Geolink isn't an API — it's the geolocation layer Egypt was missing.

When I build, I ask: "If I leave this project today, does it survive without me?" If no, I haven't built a system. I've built a feature.`,
    evidenceChain: [
      { project: 'Hvar Hub', detail: '79K lines, 4 state machines, ERP→Bosta→Customer', impact: 'Production 7+ months, zero inventory corruption' },
      { project: 'Taxiarab', detail: 'Dual-app platform, Clean Architecture', impact: 'Rider v4.4 + Driver v2.6, 15K+ downloads' },
      { project: 'Geolink API', detail: '8 Blueprints, 50+ endpoints', impact: '5M+ req/month, 50+ clients' },
    ],
    tradeoffs: {
      gained: 'Systems that outlast their creator. Consistency guarantees. Production resilience.',
      sacrificed: 'Short-term velocity. "Good enough" simplicity. Single-purpose tools.',
    },
    trajectory: 'Next: Documentation infrastructure that survives me. Systems that train their own operators.',
    strength: 95,
  },
  {
    id: 'specialist',
    name: 'The Specialist',
    icon: '🗺️',
    accent: 'from-emerald-500 to-teal-500',
    tagline: 'Geolocation mastery — 10+ years depth',
    summary: 'I don\'t use geolocation APIs. I build the geolocation layer that others build on.',
    reasoning: `Most developers integrate Google Maps and move on. I went deeper — into the math of coordinate systems, the complexity of reverse geocoding in Arabic, the economics of location data in a market where Google isn't optimized.

Specialization isn't about doing one thing for 10 years. It's about compounding depth — every geolocation project teaches something the previous one didn't. Areo taught me sensor fusion (accelerometer + magnetometer for custom compass). Taxiarab taught me real-time location streaming with adaptive intervals and battery optimization. Geolink taught me to build the API layer that all of them consume.

Now geolocation is a platform, not a feature. Geolink serves 5M+ requests/month. Other startups build on it. The specialist became the infrastructure.`,
    evidenceChain: [
      { project: 'Geolink API', detail: 'Public geolocation API, credit billing', impact: '5M+ req/month, 50+ clients, 2+ years production' },
      { project: 'Areo', detail: 'Custom compass via sensor fusion', impact: 'Production Android app with background tracking' },
      { project: 'Taxiarab', detail: 'Real-time location with adaptive intervals', impact: '15K+ downloads, dual-app platform' },
    ],
    tradeoffs: {
      gained: 'Domain depth that compounds. Infrastructure layer. Market leadership.',
      sacrificed: 'Broader technology range. Generic "full-stack" positioning.',
    },
    trajectory: 'Next: Geolink v2 with real-time tracking API. Location layer for the entire MENA region.',
    strength: 98,
  },
  {
    id: 'systems-thinker',
    name: 'The Systems Thinker',
    icon: '🌐',
    accent: 'from-purple-500 to-pink-500',
    tagline: 'Connections > Isolation. Ecosystem > Feature.',
    summary: 'I don\'t build isolated projects. I build ecosystems where projects feed each other.',
    reasoning: `A portfolio is not a list of projects. It's a network. Geolink API powers Areo, Taxiarab, and GeoEgy. Hvar Hub integrates ERP, Bosta shipping, and customer calls into one organism. Plumb connects Pi, Cursor, Claude, and Wolfy into an agent mesh.

I don't think in features. I think in connections: what does this enable? What can build on it? What breaks if this fails?

This is why I build infrastructure layers — APIs, state machines, bridges — because infrastructure compounds. A framework project is done when shipped. An infrastructure project grows as others build on it.`,
    evidenceChain: [
      { project: 'Geolink API', detail: 'Used by Areo, Taxiarab, GeoEgy, 50+ clients', impact: 'Ecosystem of dependent products' },
      { project: 'Hvar Hub', detail: 'ERP → Bosta → Customer, three-way reconciliation', impact: 'Connected three previously isolated systems' },
      { project: 'Plumb', detail: '8 adapters, A2A bridge for CLI agents', impact: '4-agent production fleet, zero orchestration' },
    ],
    tradeoffs: {
      gained: 'Compounding value across projects. Infrastructure that others build on.',
      sacrificed: 'Simple isolated projects. Clear project boundaries.',
    },
    trajectory: 'Next: Agent mesh infrastructure. Systems that coordinate other systems.',
    strength: 92,
  },
  {
    id: 'producer',
    name: 'The Producer',
    icon: '⚡',
    accent: 'from-amber-500 to-orange-500',
    tagline: 'Production systems. Not prototypes. Not theory.',
    summary: 'If it\'s not in production, it doesn\'t count.',
    reasoning: `Code that hasn't been deployed is fiction. It hasn't failed under real load. It hasn't been debugged at 2 AM. It hasn't had a user do something you never expected.

Every project I build ships to production. Gunicorn + WSGI, not localhost. Connection pooling with tested limits. Error handling that degrades gracefully. Logging that actually helps debug production issues.

Production thinking changes everything. You don't write "happy path" code — you write for the S3 outage, the MySQL deadlock, the API rate limit. You test the failure, not just the success.`,
    evidenceChain: [
      { project: 'Geolink API', detail: 'Gunicorn + WSGI, connection pooling, caching', impact: '5M+ req/month, zero architecture-caused downtime' },
      { project: 'Hvar Hub', detail: 'Atomic transactions, error recovery', impact: '56 state transitions, zero inventory corruption' },
      { project: 'Taxiarab', detail: 'Battery optimization, boot recovery, foreground services', impact: '15K+ downloads, production on Google Play' },
    ],
    tradeoffs: {
      gained: 'Production reliability. Real-world testing. User trust.',
      sacrificed: 'Rapid prototyping velocity. Code that "works on my machine."',
    },
    trajectory: 'Next: Production monitoring dashboards. Automated failure detection before users report it.',
    strength: 96,
  },
  {
    id: 'localizer',
    name: 'The Localizer',
    icon: '🌍',
    accent: 'from-red-500 to-rose-500',
    tagline: 'Arabic/RTL first-class, not an afterthought',
    summary: 'Translation is the easy part. Designing for Arabic from day one is the hard part.',
    reasoning: `"Just add Arabic later" is the most expensive shortcut in MENA-market software. Every team that says this ships a product that feels translated, not native.

Arabic-first means different font metrics (Cairo is wider than Inter), different layout constraints (Arabic is 35% longer than English), different UX patterns (right-to-left reading flow changes navigation hierarchy), different search requirements (diacritics-insensitive matching).

I don't translate after building. I build in Arabic from day one. The English version is the translation.`,
    evidenceChain: [
      { project: 'Hvar Hub', detail: 'Arabic UI, Cairo + Tajawal fonts, RTL-first', impact: 'Production in Egyptian market, zero RTL bugs' },
      { project: 'Hvar-Catalog', detail: 'WCAG AAA + Arabic diacritics search', impact: '98 Lighthouse score, accessible Arabic e-commerce' },
      { project: 'Taxiarab', detail: 'Arabic v4.4 (Rider), v2.6 (Driver)', impact: '10K+ downloads, Arabic market' },
    ],
    tradeoffs: {
      gained: 'Native Arabic experience. Market trust. Accessibility compliance.',
      sacrificed: 'Simpler global-ready CSS. Easier font selection.',
    },
    trajectory: 'Next: Arabic NLP for search. Regional design system that goes beyond RTL mirroring.',
    strength: 94,
  },
  {
    id: 'evolver',
    name: 'The Evolver',
    icon: '🔄',
    accent: 'from-indigo-500 to-blue-500',
    tagline: 'Continuous learning. Technology adoption. Growth.',
    summary: 'I\'m not the same developer I was 6 months ago — and I won\'t be in 6 more.',
    reasoning: `Technology evolution isn't about chasing trends. It's about recognizing when your current tools are the bottleneck.

Java served me well for Android. Then Kotlin came with null safety, coroutines, and 40% less boilerplate. The switch wasn't about "Kotlin is newer" — it was about "Kotlin lets me build better apps."

Python came when I needed to build APIs faster than Android allowed. TypeScript came when I needed type safety across distributed agent systems. Each switch was domain-driven, not hype-driven.

The pattern: stay in a language until it limits what you can build. Then evolve. Never rewrite — add the new language for the new domain.`,
    evidenceChain: [
      { project: 'Geolink API (Python)', detail: 'API platform with Flask 3', impact: '5M+ req/month, 50+ clients' },
      { project: 'Plumb (TypeScript)', detail: 'A2A bridge with 8 adapters', impact: '4-agent production fleet' },
      { project: 'Taxiarab (Kotlin)', detail: 'Clean Architecture, 5 modules', impact: '15K+ downloads, 40+ releases combined' },
    ],
    tradeoffs: {
      gained: 'Right tool for each domain. Continuous capability growth.',
      sacrificed: 'Single-language mastery depth. Toolchain simplicity.',
    },
    trajectory: 'Next: Rust for performance-critical infrastructure. Continued evolution as problems demand.',
    strength: 88,
  },
  {
    id: 'market-focused',
    name: 'The Market-Focused Builder',
    icon: '💼',
    accent: 'from-cyan-500 to-blue-500',
    tagline: 'Egyptian market. MENA region. Real problems.',
    summary: 'I build for here, not for hypothetical Silicon Valley use cases.',
    reasoning: `The Egyptian market has different problems than Silicon Valley. Cash on delivery isn't a legacy payment method — it's the dominant e-commerce model. Arabic isn't a localization feature — it's the primary language. Bosta isn't a niche shipping provider — it's the dominant logistics partner.

Building for this market means integrating with Bosta's actual API (not Stripe), handling COD workflows (not credit cards), supporting Arabic search with diacritics (not English tokenization), and designing for mobile-first with modest data plans (not gigabit WiFi).

I don't build "global products that happen to work in Egypt." I build Egyptian products that could expand globally.`,
    evidenceChain: [
      { project: 'Hvar Hub', detail: 'Bosta integration, COD workflows, Arabic UI', impact: 'Production in Egyptian retail' },
      { project: 'Geolink API', detail: 'Egyptian-first geolocation, Arabic search', impact: '50+ Egyptian clients' },
      { project: 'Taxiarab', detail: 'Real drivers, real earnings, real geographic data', impact: '1000s of real drivers' },
    ],
    tradeoffs: {
      gained: 'Deep market fit. Real user trust. Local integration expertise.',
      sacrificed: 'Global-first positioning. Broader market appeal.',
    },
    trajectory: 'Next: Regional expansion within MENA. Cross-country logistics integration.',
    strength: 91,
  },
  {
    id: 'integrator',
    name: 'The Integrator',
    icon: '🔌',
    accent: 'from-lime-500 to-green-500',
    tagline: 'Real APIs. Third-party services. Complex choreography.',
    summary: 'Real systems don\'t live in isolation. They integrate. They coordinate.',
    reasoning: `A system that doesn't integrate with anything is a toy. Real systems talk to Google Maps, Bosta, Firebase, Pusher, WhatsApp — each with different auth, rate limits, data formats, and failure modes.

Integration thinking means: every external API will change without notice. Every webhook will arrive late or not at all. Every third-party service will have an outage.

I build integration layers that handle this. Retry with exponential backoff. Circuit breakers. Graceful degradation. Audit trails so you can see exactly what happened when the integration failed.`,
    evidenceChain: [
      { project: 'Hvar Hub', detail: 'ERP proxy + Bosta API + WhatsApp', impact: 'Three-way reconciliation across different systems' },
      { project: 'Taxiarab', detail: 'Google Maps + Pusher + Firebase + Geolink', impact: 'Multi-service real-time coordination' },
      { project: 'Plumb', detail: '8 A2A adapters for different CLI agents', impact: 'Standard protocol over heterogeneous tools' },
    ],
    tradeoffs: {
      gained: 'Real-world system resilience. Multi-service choreography.',
      sacrificed: 'Simpler single-service architecture. Easier testing.',
    },
    trajectory: 'Next: Integration testing framework. Simulated failure scenarios for every integration.',
    strength: 89,
  },
];

const tierOrder = { core: 0, support: 1, context: 2 };

export default function ThinkingAmplified() {
  const [activePattern, setActivePattern] = useState(patterns[0].id);
  const [showAll, setShowAll] = useState(false);

  const active = patterns.find(p => p.id === activePattern) || patterns[0];
  const displayPatterns = showAll ? patterns : patterns.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            The Patterns That Prove It
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Eight recurring patterns. Eight ways of thinking. 
            Each one proven through real projects, real metrics, real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── LEFT: Pattern Selector ─── */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Explore Patterns
            </h3>
            {patterns.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePattern(p.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  activePattern === p.id
                    ? 'border-blue-500/50 bg-blue-900/20 ring-1 ring-blue-500/30'
                    : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${
                      activePattern === p.id ? 'text-white' : 'text-slate-200'
                    }`}>
                      {p.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {p.strength}% proven
                    </p>
                  </div>
                  {activePattern === p.id && (
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${p.accent} animate-pulse`} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* ─── RIGHT: Deep Dive ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Pattern Header */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{active.icon}</div>
                <div>
                  <div className={`inline-block h-1 w-16 rounded-full bg-gradient-to-r ${active.accent} mb-3`} />
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {active.name}
                  </h3>
                  <p className="text-lg text-slate-300">{active.tagline}</p>
                </div>
              </div>

              {/* Summary */}
              <p className="text-slate-200 text-base leading-relaxed mb-6 p-4 bg-slate-900/50 rounded-lg border-l-2 border-blue-500">
                "{active.summary}"
              </p>

              {/* Reasoning */}
              <div className="mb-8">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  <Lightbulb size={14} className="text-amber-400" />
                  How I think
                </h4>
                <div className="text-slate-400 text-sm leading-relaxed space-y-2 whitespace-pre-line">
                  {active.reasoning}
                </div>
              </div>
            </div>

            {/* Evidence Chain */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">
                <GitBranch size={14} className="text-emerald-400" />
                Evidence Chain
              </h4>
              <div className="space-y-4">
                {active.evidenceChain.map((item, i) => (
                  <div key={i} className="relative pl-8 pb-4 border-l-2 border-slate-700 last:border-l-2 last:border-transparent last:pb-0">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${active.accent}`} />
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">{item.project}</span>
                        <ArrowRight size={12} className="text-slate-600" />
                      </div>
                      <p className="text-xs text-slate-300 mb-2">{item.detail}</p>
                      <span className="inline-block text-xs font-medium px-2 py-1 rounded bg-emerald-900/30 text-emerald-300">
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tradeoffs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-300 uppercase tracking-wider mb-3">
                  <Scale size={14} />
                  Gained
                </h4>
                <p className="text-slate-300 text-sm">{active.tradeoffs.gained}</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <Scale size={14} />
                  Sacrificed
                </h4>
                <p className="text-slate-400 text-sm">{active.tradeoffs.sacrificed}</p>
              </div>
            </div>

            {/* Trajectory */}
            <div className="bg-gradient-to-r from-slate-800/40 to-slate-800/20 border border-slate-700/50 rounded-2xl p-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
                <TrendingUp size={14} />
                Next Evolution
              </h4>
              <p className="text-slate-300 text-sm">{active.trajectory}</p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            These aren't labels. They're proven patterns from 75+ projects.
          </p>
        </div>
      </div>
    </section>
  );
}
