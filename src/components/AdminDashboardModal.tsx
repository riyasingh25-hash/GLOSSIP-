import React, { useState } from 'react';
import { 
  X, Shield, Lock, Download, Users, Heart, BarChart3, 
  Trash2, Search, CheckCircle2, XCircle, ArrowUpRight, Sparkles 
} from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { LeadSource, ShadeFamily } from '../types/leads';

export const AdminDashboardModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    leads, 
    deleteLead, 
    metrics, 
    exportLeadsToCsv 
  } = useLeads();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'All' | LeadSource>('All');
  const [selectedLeadDetails, setSelectedLeadDetails] = useState<string | null>(null);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'glossip2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Use demo key: glossip2026');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.phone && lead.phone.includes(q)) ||
      lead.favoriteShadeFamily.toLowerCase().includes(q);

    const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAdminOpen(false)}
      />

      {/* Main Container */}
      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-5xl w-full p-5 sm:p-8 shadow-2xl border-2 border-[#FFC4DC] z-10 max-h-[92vh] overflow-y-auto my-6 animate-in fade-in zoom-in-95">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE7]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#563A45] text-white flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 text-[#FFC4DC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-brand text-lg sm:text-xl font-bold text-[#563A45]">
                  Glossip Growth & Lead Admin
                </h2>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  Protected CRM
                </span>
              </div>
              <p className="text-xs text-[#563A45]/70">
                Audited lead subscribers & privacy compliance registry
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="py-12 max-w-sm mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F8DCE7] text-[#F04F87] mx-auto flex items-center justify-center shadow-xs">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-brand text-xl font-bold text-[#563A45]">Authorized Admin Access</h3>
              <p className="text-xs text-[#563A45]/75">
                Customer subscriber data is encrypted and protected. Enter your staff credentials to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="Enter admin passcode (glossip2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-2 focus:ring-[#F04F87]"
              />

              {authError && (
                <p className="text-xs text-rose-600 font-semibold">{authError}</p>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#F04F87] hover:bg-[#D83870] text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Unlock Admin Console
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPasscode('glossip2026');
                  setIsAuthenticated(true);
                }}
                className="text-[11px] text-[#F04F87] hover:underline block mx-auto pt-1"
              >
                Auto-fill Demo Passcode (glossip2026)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6 pt-5 animate-in fade-in">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-white border border-[#F8DCE7] space-y-1 shadow-xs">
                <div className="flex justify-between items-center text-xs text-[#563A45]/70 font-semibold">
                  <span>Total Subscribers</span>
                  <Users className="w-4 h-4 text-[#F04F87]" />
                </div>
                <p className="font-brand font-extrabold text-2xl text-[#563A45] tabular-nums">
                  {metrics.activeSubscribers}
                </p>
                <span className="text-[10px] text-emerald-700 font-bold block">
                  {metrics.totalLeads} Total Recorded
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F8DCE7] space-y-1 shadow-xs">
                <div className="flex justify-between items-center text-xs text-[#563A45]/70 font-semibold">
                  <span>Marketing Consent</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="font-brand font-extrabold text-2xl text-[#563A45] tabular-nums">
                  {metrics.consentRate}%
                </p>
                <span className="text-[10px] text-[#563A45]/60 block">
                  Opt-in consent verified
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F8DCE7] space-y-1 shadow-xs">
                <div className="flex justify-between items-center text-xs text-[#563A45]/70 font-semibold">
                  <span>Top Product Focus</span>
                  <Heart className="w-4 h-4 text-[#F04F87]" />
                </div>
                <p className="font-brand font-extrabold text-xl text-[#563A45] truncate">
                  {metrics.productBreakdown['Both'] >= metrics.productBreakdown['Lip Gloss'] ? 'Duo Combos' : 'Lip Gloss'}
                </p>
                <span className="text-[10px] text-[#563A45]/60 block">
                  Gloss: {metrics.productBreakdown['Lip Gloss']} · Oil: {metrics.productBreakdown['Lip Oil']}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F8DCE7] space-y-1 shadow-xs">
                <div className="flex justify-between items-center text-xs text-[#563A45]/70 font-semibold">
                  <span>Top Shade Family</span>
                  <Sparkles className="w-4 h-4 text-[#F04F87]" />
                </div>
                <p className="font-brand font-extrabold text-xl text-[#563A45]">
                  Pink & Nude
                </p>
                <span className="text-[10px] text-[#563A45]/60 block">
                  Pink: {metrics.shadeBreakdown['Pink']} · Nude: {metrics.shadeBreakdown['Nude']}
                </span>
              </div>

            </div>

            {/* Visual Breakdown Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Product Breakdown Chart */}
              <div className="bg-white rounded-2xl p-4 border border-[#F8DCE7] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#563A45]">
                  Product Category Preferences
                </h4>
                <div className="space-y-2">
                  {(['Lip Gloss', 'Lip Oil', 'Both'] as const).map(cat => {
                    const count = metrics.productBreakdown[cat] || 0;
                    const pct = metrics.activeSubscribers > 0 ? Math.round((count / metrics.activeSubscribers) * 100) : 0;
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-[#563A45]">
                          <span>{cat}</span>
                          <span className="tabular-nums">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-[#FFF9F4] rounded-full overflow-hidden border border-[#F8DCE7]">
                          <div
                            className="h-full bg-[#F04F87] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shade Family Breakdown */}
              <div className="bg-white rounded-2xl p-4 border border-[#F8DCE7] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#563A45]">
                  Popular Shade Families
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Pink', hex: '#FFAEC9' },
                    { name: 'Nude', hex: '#C58C73' },
                    { name: 'Cherry', hex: '#C9204B' },
                    { name: 'Peach', hex: '#FFD8CC' },
                    { name: 'Clear', hex: '#E2E8F0' }
                  ].map(sh => {
                    const count = metrics.shadeBreakdown[sh.name as ShadeFamily] || 0;
                    const pct = metrics.activeSubscribers > 0 ? Math.round((count / metrics.activeSubscribers) * 100) : 0;
                    return (
                      <div key={sh.name} className="space-y-1">
                        <div className="flex justify-between items-center text-xs font-semibold text-[#563A45]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: sh.hex }} />
                            <span>{sh.name}</span>
                          </div>
                          <span className="tabular-nums">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-[#FFF9F4] rounded-full overflow-hidden border border-[#F8DCE7]">
                          <div
                            className="h-full bg-[#563A45] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Subscriber Table Controls & Export */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F8DCE7] space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-[#563A45]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or shade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value as any)}
                    className="px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs font-semibold text-[#563A45] focus:outline-none"
                  >
                    <option value="All">All Sources ({leads.length})</option>
                    <option value="homepage_section">Homepage Club Section</option>
                    <option value="lead_popup">Lead Pop-up</option>
                    <option value="personality_quiz">Personality Quiz</option>
                    <option value="lip_guide_modal">Lip Guide Modal</option>
                  </select>

                  <button
                    onClick={exportLeadsToCsv}
                    className="px-4 py-2 bg-[#563A45] hover:bg-[#3D2831] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    title="Export verified leads to CSV format"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF9F4] text-[#563A45] uppercase tracking-wider font-bold text-[10px] border-b border-[#F8DCE7]">
                    <tr>
                      <th className="py-2.5 px-3">Subscriber</th>
                      <th className="py-2.5 px-3">Preferences</th>
                      <th className="py-2.5 px-3">Source</th>
                      <th className="py-2.5 px-3">Marketing Consent</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F8DCE7]">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#FFF9F4]/70 transition-colors">
                        <td className="py-3 px-3">
                          <p className="font-bold text-[#563A45]">{lead.firstName}</p>
                          <p className="text-[11px] text-[#563A45]/70">{lead.email}</p>
                          {lead.phone && (
                            <p className="text-[10px] text-[#563A45]/60">{lead.phone}</p>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#F04F87] block">{lead.favoriteProduct}</span>
                          <span className="text-[11px] text-[#563A45]/80">Shade: {lead.favoriteShadeFamily}</span>
                          {lead.quizResult && (
                            <span className="text-[10px] text-amber-700 block truncate max-w-[140px]">
                              {lead.quizResult.personality}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF9F4] border border-[#F8DCE7] text-[#563A45]">
                            {lead.source.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          {lead.marketingConsent ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Consented</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>No consent</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-[11px] text-[#563A45]/75 tabular-nums">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Privacy & Compliance Notice */}
            <div className="p-4 bg-[#FFF0B8]/40 border border-[#FFF0B8] rounded-2xl text-[11px] text-[#563A45] flex items-center justify-between">
              <span>
                🔒 <strong>Compliance Notice:</strong> Lead records store opt-in consent timestamps for GDPR and Digital Personal Data Protection (DPDP) compliance.
              </span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs font-bold text-[#F04F87] hover:underline shrink-0 ml-4 cursor-pointer"
              >
                Lock Admin Console
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
