import React, { useState } from 'react';
import { Scale, TrendingUp, Calendar, Tag, CheckCircle, ChevronDown, ArrowRight, AlertTriangle } from 'lucide-react';
import { decisions, decisionDomains, decisionStats } from '../data/decisions';

/**
 * DecisionsLedger — Public Decision Ledger
 *
 * Every major architecture decision, documented with:
 * what was decided, why, the tradeoff accepted, the outcome.
 *
 * Not theory. Real choices from production systems.
 */

export default function DecisionsLedger() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? decisions
    : decisions.filter(d => d.domain === filter);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Decisions That Built This
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Every architecture decision, documented with reasoning, tradeoffs, and outcomes.
            Not theory — real choices from production systems.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white">{decisionStats.total}</p>
            <p className="text-xs text-slate-400 mt-1">Key Decisions</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">{decisionStats.averageConfidence}%</p>
            <p className="text-xs text-slate-400 mt-1">Avg. Confidence</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-400">{decisionStats.domains}</p>
            <p className="text-xs text-slate-400 mt-1">Domains</p>
          </div>
        </div>

        {/* Domain Filters */}
        <div className="flex gap-2 flex-wrap mb-10">
          {decisionDomains.map((domain) => (
            <button
              key={domain}
              onClick={() => setFilter(domain)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === domain
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Decision Cards */}
        <div className="space-y-6">
          {filtered.map((decision) => (
            <div
              key={decision.id}
              className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-600"
            >
              {/* Card Header — always visible */}
              <button
                onClick={() => setExpanded(expanded === decision.id ? null : decision.id)}
                className="w-full text-left p-6 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">
                      {decision.domain}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={10} />
                      {decision.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {decision.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {decision.context}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">{decision.confidence}%</p>
                    <p className="text-xs text-slate-500">confident</p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-slate-500 transition-transform flex-shrink-0 ${
                      expanded === decision.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {expanded === decision.id && (
                <div className="border-t border-slate-700/50">
                  {/* Decision */}
                  <div className="p-6 bg-slate-900/30">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                      <CheckCircle size={14} className="text-emerald-400" />
                      The Decision
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {decision.decision}
                    </p>
                  </div>

                  {/* Reasoning */}
                  <div className="px-6 pb-6 pt-4">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                      <TrendingUp size={14} className="text-blue-400" />
                      Why
                    </h4>
                    <ul className="space-y-2">
                      {decision.reasoning.map((reason, i) => (
                        <li key={i} className="flex gap-2 text-xs text-slate-400">
                          <span className="text-blue-400 flex-shrink-0 mt-0.5">▸</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tradeoffs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
                    <div className="bg-emerald-900/10 border border-emerald-900/30 rounded-lg p-4">
                      <h5 className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mb-2">
                        <Scale size={12} />
                        Chosen
                      </h5>
                      <p className="text-xs text-slate-300">{decision.tradeoff.chosen}</p>
                    </div>
                    <div className="bg-amber-900/10 border border-amber-900/30 rounded-lg p-4">
                      <h5 className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-2">
                        <AlertTriangle size={12} />
                        Sacrificed
                      </h5>
                      <p className="text-xs text-slate-400">{decision.tradeoff.sacrificed}</p>
                    </div>
                  </div>

                  {/* Outcome + Evidence */}
                  <div className="px-6 pb-6">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                      <CheckCircle size={14} className="text-emerald-400" />
                      Outcome
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {decision.outcome}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Evidence:</span>
                      <span className="text-xs font-medium text-slate-300">{decision.evidence}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
