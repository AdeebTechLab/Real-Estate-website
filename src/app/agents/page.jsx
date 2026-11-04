import React, { useState } from 'react';
import AgentCard from '../../components/agent/AgentCard.jsx';
import { AGENTS } from '../../data/agents.js';
import { Users, Search, ShieldCheck } from 'lucide-react';

export default function AgentsPage() {
  const [search, setSearch] = useState('');

  const filteredAgents = AGENTS.filter((agent) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      agent.name.toLowerCase().includes(q) ||
      agent.agency.toLowerCase().includes(q) ||
      agent.specialties.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Advisory Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
            Certified EstatePro Advisors
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Connect with seasoned real estate principals and legal advisors specializing in high-value DHA, Bahria, and CDA sectors across Pakistan.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agent name or specialty..."
            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Trust Callout */}
      <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-xs text-slate-700">
            <span className="font-bold text-slate-900 block">Strict Verification Standard</span>
            <span>All EstatePro agents hold accredited real estate association memberships and verifiable transaction records.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
