import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Phone, Mail, Award, CheckCircle } from 'lucide-react';

export default function AgentCard({ agent }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Header with Avatar and Credentials */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-900 truncate">
                <Link href={`/agents/${agent.id}`} className="hover:text-emerald-700 transition-colors">
                  {agent.name}
                </Link>
              </h3>
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" title="Verified EstatePro Advisor" />
            </div>
            <p className="text-xs text-slate-500 truncate">{agent.title}</p>
            <p className="text-[11px] font-medium text-emerald-700 mt-0.5 truncate">{agent.agency}</p>
          </div>
        </div>

        {/* Rating and Experience Badges */}
        <div className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-xl mb-4 text-xs">
          <div className="flex items-center gap-1 text-amber-600 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="tabular-nums">{agent.rating}</span>
            <span className="text-slate-400 font-normal">({agent.reviewCount})</span>
          </div>
          <div className="text-slate-600">
            <span className="font-semibold text-slate-900 tabular-nums">{agent.experienceYears}</span> yrs exp.
          </div>
          <div className="text-slate-600">
            <span className="font-semibold text-slate-900 tabular-nums">{agent.activeListingsCount}</span> active
          </div>
        </div>

        {/* Bio preview */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {agent.bio}
        </p>

        {/* Specialties */}
        {agent.specialties && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.specialties.slice(0, 2).map((s, idx) => (
              <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium truncate max-w-full">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Links */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <a
          href={`tel:${agent.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-slate-500" />
          <span>Call</span>
        </a>
        <Link
          href={`/agents/${agent.id}`}
          className="flex-1 inline-flex items-center justify-center py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <span>View Profile</span>
        </Link>
      </div>

    </div>
  );
}
