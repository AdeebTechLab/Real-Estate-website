import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { AGENTS } from '../../../data/agents.js';
import { useFavorites } from '../../../context/FavoritesContext.jsx';
import PropertyCard from '../../../components/property/PropertyCard.jsx';
import {
  Star,
  Phone,
  Mail,
  Award,
  ArrowLeft,
  CheckCircle,
  Building2,
  Calendar,
  Languages
} from 'lucide-react';

export default function AgentProfilePage({ params: propParams }) {
  const hookParams = useParams();
  const params = propParams || hookParams;
  const { allProperties } = useFavorites();

  const agentId = params?.id;
  const agent = AGENTS.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Agent Not Found</h1>
        <p className="text-xs text-slate-500 mb-6">
          The requested advisor profile does not exist in our active directory.
        </p>
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Agent Directory</span>
        </Link>
      </div>
    );
  }

  // Active listings by this agent
  const agentListings = allProperties.filter((p) => p.agentId === agent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top back link */}
      <div>
        <Link
          href="/agents"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Advisors</span>
        </Link>
      </div>

      {/* Hero Profile Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {agent.name}
                </h1>
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" title="Verified Agent" />
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{agent.title}</p>
              <p className="text-xs font-semibold text-emerald-700 mt-1">{agent.agency}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Rating</span>
                <div className="flex items-center gap-1 font-bold text-amber-600 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="tabular-nums">{agent.rating}</span>
                  <span className="text-slate-400 font-normal">({agent.reviewCount})</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Experience</span>
                <span className="font-bold text-slate-900 mt-0.5 block tabular-nums">
                  {agent.experienceYears} Years
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Active Listings</span>
                <span className="font-bold text-slate-900 mt-0.5 block tabular-nums">
                  {agentListings.length} Listed
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Deals Closed</span>
                <span className="font-bold text-slate-900 mt-0.5 block tabular-nums">
                  {agent.soldListingsCount}+
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              {agent.bio}
            </p>

            {/* Languages & Contact */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Languages className="w-4 h-4 text-slate-400" />
                <span>Languages: {agent.languages.join(', ')}</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a
                href={`tel:${agent.phone}`}
                className="font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{agent.phone}</span>
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a
                href={`mailto:${agent.email}`}
                className="font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{agent.email}</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Active Listings by This Agent */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Current Properties Represented by {agent.name} ({agentListings.length})
          </h2>
        </div>

        {agentListings.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            No active listings currently assigned to this advisor.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentListings.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
