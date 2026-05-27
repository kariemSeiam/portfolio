import React from 'react';
import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

/**
 * What I Actually Believe Component
 * 
 * Not mission statements. Not marketing copy.
 * The actual principles that guide every decision.
 * The truth that decisions are made around.
 */

const beliefs = [
  {
    principle: 'Production > Theory',
    description: 'If it\'s not in production handling real load with real consequences, it doesn\'t count.',
    decisions: [
      'WSGI deployment over "it works on my machine"',
      'Error handling over clean code',
      'Monitoring over clever architecture',
      'Documentation for future-you, not for interviews',
    ],
    color: 'blue',
  },
  {
    principle: 'Complete > Feature',
    description: 'Build entire ecosystems that solve problems permanently. Not features. Not MVPs. Systems.',
    decisions: [
      'Hvar-Hub: 4 state machines, not 1 workflow',
      'Taxiarab: Both Rider + Driver apps, not just one',
      'Geolink: Full platform, not just a wrapper',
    ],
    color: 'emerald',
  },
  {
    principle: 'Market Understanding > Best Practices',
    description: 'Know your market. Build for your market. Generic solutions don\'t work for specific problems.',
    decisions: [
      'Arabic/RTL first-class, not translated later',
      'Bosta integration because Egyptian logistics work this way',
      'Geolocation specialization because this market needs it',
    ],
    color: 'amber',
  },
  {
    principle: 'Integration > Isolation',
    description: 'Real systems don\'t live alone. They coordinate. They fail together. That\'s the price of completeness.',
    decisions: [
      'Real API integrations (not mock data)',
      'Database transactions for consistency (not eventual)',
      'Synchronous coordination where consistency matters',
    ],
    color: 'purple',
  },
  {
    principle: 'Reliability > Velocity',
    description: 'Speed matters less than recovery. When failures happen—and they do—graceful degradation saves everything.',
    decisions: [
      'Comprehensive logging over performance optimization',
      'Circuit breakers over retry storms',
      'Health checks over hoping nothing breaks',
    ],
    color: 'rose',
  },
  {
    principle: 'Depth > Breadth',
    description: 'Go deep in one direction. Become rare. Specialization is more valuable than generalization.',
    decisions: [
      'Geolocation mastery over "full-stack generalist"',
      'Android native over every framework',
      'Building platforms over building features',
    ],
    color: 'indigo',
  },
  {
    principle: 'Evolution > Perfection',
    description: 'Ship. Learn. Iterate. Perfect is the enemy of good enough to learn from.',
    decisions: [
      'Version v1 taught what v2 needed',
      'Private versions became public versions',
      'Every language shift taught something',
    ],
    color: 'cyan',
  },
  {
    principle: 'Systems > Frameworks',
    description: 'Frameworks are tools. Systems are thinking. You can use any framework if you understand the system.',
    decisions: [
      'React or Vue doesn\'t matter if architecture is sound',
      'Python or TypeScript depends on the problem',
      'The framework changes, the systems thinking remains',
    ],
    color: 'lime',
  },
];

const colorClasses = {
  blue: 'from-blue-500/10 to-blue-400/5 border-blue-900/20 text-blue-300',
  emerald: 'from-emerald-500/10 to-emerald-400/5 border-emerald-900/20 text-emerald-300',
  amber: 'from-amber-500/10 to-amber-400/5 border-amber-900/20 text-amber-300',
  purple: 'from-purple-500/10 to-purple-400/5 border-purple-900/20 text-purple-300',
  rose: 'from-rose-500/10 to-rose-400/5 border-rose-900/20 text-rose-300',
  indigo: 'from-indigo-500/10 to-indigo-400/5 border-indigo-900/20 text-indigo-300',
  cyan: 'from-cyan-500/10 to-cyan-400/5 border-cyan-900/20 text-cyan-300',
  lime: 'from-lime-500/10 to-lime-400/5 border-lime-900/20 text-lime-300',
};

export default function WhatIBelieve() {
  return (
    <div className="py-16 bg-slate-900 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">
            What I Actually Believe
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl">
            Not mission statements. Not marketing. The actual principles that guide every decision. The non-negotiables.
          </p>
        </div>

        {/* Beliefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {beliefs.map((belief, idx) => (
            <div
              key={idx}
              className={`relative p-6 rounded-lg border bg-gradient-to-br ${colorClasses[belief.color]} backdrop-blur-sm`}
            >
              {/* Principle Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {belief.principle}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {belief.description}
                </p>
              </div>

              {/* Decisions This Leads To */}
              <div className="space-y-2">
                {belief.decisions.map((decision, i) => (
                  <div key={i} className="flex gap-2 text-xs">
                    <CheckCircle2
                      size={14}
                      className="text-slate-400 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-slate-400">{decision}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Core Insight */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8">
          <div className="flex gap-4">
            <Lightbulb size={24} className="text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Why This Matters
              </h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                These beliefs sound simple. But they make hard trade-offs clear. When I choose between "ship faster" vs "ship right," I choose right—because production costs are real. When I choose between "use this popular framework" vs "build for my market," I choose my market.
              </p>
              <p className="text-slate-300 leading-relaxed">
                These aren't ideals. They're responses to what actually broke. Every principle here comes from a project that failed, or succeeded, and taught me what mattered.
              </p>
            </div>
          </div>
        </div>

        {/* The Real Truth */}
        <div className="border-l-4 border-slate-600 pl-6 space-y-3">
          <p className="text-slate-300 leading-relaxed">
            <strong>I'm not interested in being hired to write code.</strong>
          </p>
          <p className="text-slate-300 leading-relaxed">
            I'm interested in solving problems that matter. Building systems that survive production. Creating platforms that scale. Teaching teams how to think about these problems.
          </p>
          <p className="text-slate-400 text-sm">
            If that aligns with what you need, let's talk.
          </p>
        </div>
      </div>
    </div>
  );
}
