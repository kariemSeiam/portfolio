import React, { useState } from 'react';
import { ChevronDown, Code2, Award, Zap, BookOpen } from 'lucide-react';

/**
 * The Journey Component
 * 
 * Not "timeline of projects." Not "career milestones."
 * The arc of becoming a systems builder. What was learned. Why it matters.
 * 
 * Show: Progression. Growth. Deliberate choices. Real decisions.
 */

const journey = [
  {
    period: '2020-2021: The Native Builder',
    theme: 'Learning Android, Building Instinct',
    narrative: `
Started with Android development. Kotlin. The fundamentals. Not jumping straight to web stacks.

Why this matters: **Deep platform knowledge.** When you build native, you learn how systems actually work. Lifecycle management. State. Memory. Threading. These aren't theoretical—you feel them break in your hands.

Projects: Dinamo (fitness app), Scriptor (scripts), Ramadan Task (countdown)

The lesson: **Foundation matters. You can't fake it later.**
    `,
    insights: [
      'Android lifecycle is like project lifecycle—state matters',
      'Threading/async teaches you why coordination is hard',
      'Testing on real devices teaches you what theory misses',
    ],
  },
  {
    period: '2021-2022: The API Builder',
    theme: 'Discovering Geolocation, Building APIs',
    narrative: `
Transitioned from pure mobile to API development. Built Geolink v1. Private. Just for learning.

Why this matters: **Found the domain.** Geolocation isn't just a feature—it's an entire vertical with its own complexity. Geocoding algorithms. Reverse geocoding. Routing. Cache strategies. Performance under load.

Projects: Geolink (private), GeoEgy (backend), multiple location-based apps

The lesson: **Specialization > Generalization. Go deep in one direction.**
    `,
    insights: [
      'APIs are harder than apps because they must scale horizontally',
      'Caching strategies change everything about performance',
      'Production monitoring reveals problems that testing never catches',
    ],
  },
  {
    period: '2022-2023: The Systems Builder',
    theme: 'Building Complete Ecosystems',
    narrative: `
Hvar-Hub changed everything. Not an API. Not an app. A complete system: ERP → Bosta → Customers. Four parallel state machines. 79K lines of production code. Real business logic. Real consequences for bugs.

Why this matters: **State machine thinking.** When inventory is reserved, it must stay reserved until shipped. When a replacement is dispatched, the stock count changes atomically. This isn't optional—the business breaks if it's wrong.

Projects: Hvar-Hub (production), Taxiarab (dual-app), Hvar-Catalog (production)

The lesson: **Systems are harder than solutions. But systems are what matter.**
    `,
    insights: [
      'Consistency matters more than speed when real money is involved',
      'State machines force you to think through edge cases you\'d otherwise miss',
      'Documentation isn\'t overhead—it\'s how you communicate intent to your future self',
      'Arabic/RTL isn\'t a feature—it\'s an architectural requirement when your users expect it',
    ],
  },
  {
    period: '2023-2024: The Production Master',
    theme: 'Production Deployment, Reliability, Scale',
    narrative: `
Not enough to build systems. They have to survive reality: 5M+ requests/month, 50+ clients, 10K+ downloads, real downtime costs real money.

Why this matters: **Production teaches you what matters.** In development, you optimize for code clarity. In production, you optimize for mean-time-to-recovery. Comprehensive logging. Health checks. Graceful degradation. Retry strategies. Circuit breakers.

Projects: Geolink (public API, 5M req/month), Taxiarab (production apps), Hvar-Hub (MCRM live)

The lesson: **Production is a different skill. It has to be learned by doing.**
    `,
    insights: [
      'Logging is more important than performance until you\'re debugging a production issue',
      'Graceful degradation saves your entire system from cascading failures',
      'Rate limiting isn\'t about fairness—it\'s about preventing your system from dying',
      'Your error messages are your documentation to your users',
    ],
  },
  {
    period: '2024-2025: The Architect',
    theme: 'Seeing Systems, Building Platforms',
    narrative: `
Current phase. Shifted from building individual projects to designing platforms. Not "what should this app do?"—"how do all these pieces fit together?"

Why this matters: **Architecture is about trade-offs.** Monolith vs microservices. Synchronous vs async. Strong consistency vs eventual consistency. These aren't right/wrong—they're right/for-this-problem.

Projects: Plumb (agent transport), Pi integration, Orchestration thinking

The lesson: **You can't optimize for everything. You optimize for what matters for this problem.**
    `,
    insights: [
      'Orchestration is harder than just making things work independently',
      'Transport (wire) matters more than control (decision-making)',
      'Systems thinking means understanding where the bottlenecks actually are',
    ],
  },
];

export default function TheJourney() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="py-16 bg-slate-900 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">The Arc</h2>
          <p className="text-lg text-slate-300 max-w-2xl">
            Not a timeline of projects. The actual progression of becoming a systems builder. What was learned. Why it changed everything.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {journey.map((phase, idx) => (
            <div key={idx} className="border-l-2 border-slate-700 hover:border-slate-600 transition-colors">
              {/* Phase Header */}
              <button
                onClick={() =>
                  setExpanded(expanded === idx ? null : idx)
                }
                className="w-full p-6 hover:bg-slate-800/50 text-left transition-colors flex items-start gap-6 cursor-pointer relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-4 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center flex-shrink-0 hover:border-slate-600 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                </div>

                <div className="flex-1 ml-2">
                  <div className="text-sm font-mono text-slate-500 mb-1">
                    {phase.period}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {phase.theme}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {phase.narrative.trim().split('\n')[0]}
                  </p>
                </div>

                <ChevronDown
                  size={24}
                  className={`text-slate-400 transition-transform flex-shrink-0 mt-1 ${
                    expanded === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {expanded === idx && (
                <div className="px-6 pb-6 ml-2 space-y-6 border-t border-slate-700 pt-6">
                  {/* Narrative */}
                  <div className="bg-slate-800/30 p-4 rounded border border-slate-700/50">
                    <div className="space-y-3">
                      {phase.narrative
                        .trim()
                        .split('\n\n')
                        .map((para, i) => (
                          <p
                            key={i}
                            className="text-slate-300 text-sm leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" />
                      What This Taught Me
                    </h4>
                    <ul className="space-y-2">
                      {phase.insights.map((insight, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-300 flex gap-2"
                        >
                          <span className="text-slate-500 flex-shrink-0">→</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* The Result */}
        <div className="mt-12 p-8 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">The Result</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Each phase built on the last. Android taught me state management. APIs taught me scale. Systems taught me consistency. Production taught me reliability. Architecture taught me trade-offs.
          </p>
          <p className="text-slate-300 leading-relaxed">
            I'm not a generalist who happens to build things. I'm a specialist who went from deep expertise in one domain (Android) → found another domain (geolocation) → learned to build systems → scaled them to production → now thinking about architecture.
          </p>
          <p className="text-slate-400 text-sm mt-4">
            This progression isn't accidental. Each decision led to the next. Each project taught something that the next project needed.
          </p>
        </div>
      </div>
    </div>
  );
}
