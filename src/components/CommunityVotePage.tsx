import React, { useState, useEffect, useMemo } from 'react';
import { CommunitySuggestion } from '../types';
import {
  subscribeToSuggestions,
  submitCommunitySuggestion,
  voteForSuggestion,
} from '../firebase/dbService';
import {
  ThumbsUp,
  Plus,
  X,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Scissors,
  ArrowRight,
} from 'lucide-react';

interface CommunityVotePageProps {
  onBackToHome: () => void;
  onNavigateArchive: () => void;
}

export const CommunityVotePage: React.FC<CommunityVotePageProps> = ({
  onBackToHome,
  onNavigateArchive,
}) => {
  const [suggestions, setSuggestions] = useState<CommunitySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'top' | 'all' | 'commissioned'>('top');
  const [votedIds, setVotedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('zejesh_user_voted_sug_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Proposal submission modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Outerwear');
  const [desiredFabric, setDesiredFabric] = useState('');
  const [description, setDescription] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Real-time subscription to suggestions
  useEffect(() => {
    const unsub = subscribeToSuggestions((data) => {
      setSuggestions(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleVote = async (id: string) => {
    if (votedIds.includes(id)) return;

    const newVoted = [...votedIds, id];
    setVotedIds(newVoted);
    try {
      localStorage.setItem('zejesh_user_voted_sug_ids', JSON.stringify(newVoted));
    } catch {}

    // Optimistic UI update
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s))
    );

    // Commit to Firestore
    const voterId = `patron-${Date.now().toString(36)}`;
    await voteForSuggestion(id, voterId);
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setSubmitError('Please provide a garment title and silhouette description.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const res = await submitCommunitySuggestion({
      title: title.trim(),
      category: category.trim(),
      desiredFabric: desiredFabric.trim() || 'Natural Virgin Wool or Cotton',
      description: description.trim(),
      submittedBy: submitterName.trim() || 'Atelier Patron',
      submitterEmail: submitterEmail.trim() || undefined,
      status: 'under_review',
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setTitle('');
      setDesiredFabric('');
      setDescription('');
      setSubmitterName('');
      setSubmitterEmail('');
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
      }, 2000);
    } else {
      setSubmitError(res.error || 'Failed to submit proposal.');
    }
  };

  const filteredSuggestions = useMemo(() => {
    let list = [...suggestions];
    if (activeFilter === 'top') {
      list.sort((a, b) => b.votes - a.votes);
    } else if (activeFilter === 'commissioned') {
      list = list.filter((s) => s.status === 'commissioned' || s.status === 'in_sampling');
      list.sort((a, b) => b.votes - a.votes);
    }
    return list;
  }, [suggestions, activeFilter]);

  const totalVotesCast = useMemo(
    () => suggestions.reduce((sum, s) => sum + (s.votes || 0), 0),
    [suggestions]
  );
  const commissionedCount = useMemo(
    () => suggestions.filter((s) => s.status === 'commissioned').length,
    [suggestions]
  );

  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] min-h-screen pt-24 sm:pt-32 pb-32 select-none font-mono">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-8 sm:mb-12 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors cursor-pointer uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span className="hover:underline underline-offset-4">Return Home</span>
        </button>
        <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-black/40">
          CO-CREATION ARCHIVE · PATRON BALLOT
        </span>
      </div>

      {/* Main Hero Header */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-16 sm:mb-24">
        <div className="max-w-4xl space-y-4">
          <span className="text-[10.5px] uppercase tracking-[0.3em] text-black/40 block">
            DEMOCRATIC PATRON ARCHIVE
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-8xl font-normal tracking-tight text-black leading-[1.05]">
            What Should Zejesh Craft Next?
          </h1>
          <p className="text-xs sm:text-base font-sans text-black/70 max-w-2xl leading-relaxed font-light pt-2">
            We reject seasonal commercial forecasting. Tell us what garment you want made. The pieces that earn the most patron votes advance directly into pattern drafting and European loom weaving.
          </p>
        </div>

        {/* Live Metrics & Pure Typographic Action */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-8 sm:gap-12 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/40 block">Proposals Registered</span>
              <span className="font-editorial text-3xl font-normal text-black">{suggestions.length}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/40 block">Total Votes Cast</span>
              <span className="font-editorial text-3xl font-normal text-black">{totalVotesCast}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/40 block">In Production</span>
              <span className="font-editorial text-3xl font-normal text-black">{commissionedCount} Pieces</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-2 py-2 text-xs uppercase font-mono tracking-[0.22em] text-black cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[1.5]" />
            <span className="underline underline-offset-8 group-hover:opacity-60 transition-opacity">
              Propose a New Piece
            </span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar (Pure typography, NO box borders) */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-12 flex items-center justify-between text-xs">
        <div className="flex items-center gap-6 sm:gap-8">
          {(['top', 'all', 'commissioned'] as const).map((filterKey) => (
            <button
              key={filterKey}
              type="button"
              onClick={() => setActiveFilter(filterKey)}
              className={`py-1.5 uppercase tracking-[0.2em] text-[11px] sm:text-xs cursor-pointer transition-colors relative ${
                activeFilter === filterKey
                  ? 'text-black font-semibold'
                  : 'text-black/50 hover:text-black font-normal'
              }`}
            >
              <span>
                {filterKey === 'top' && 'Most Voted (Priority)'}
                {filterKey === 'all' && 'All Proposals'}
                {filterKey === 'commissioned' && 'Commissioned Pieces'}
              </span>
              {activeFilter === filterKey && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black" />
              )}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-black/40 hidden sm:inline">
          {filteredSuggestions.length} registered proposals
        </span>
      </div>

      {/* Proposals Grid: Borderless editorial layout */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10">
        {loading ? (
          <div className="py-24 text-center text-xs text-black/40">
            Consulting atelier archives...
          </div>
        ) : filteredSuggestions.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="text-xs text-black/50">No proposals recorded under this selection.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="text-xs uppercase tracking-[0.2em] underline underline-offset-8 cursor-pointer text-black"
            >
              View all proposals →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {filteredSuggestions.map((item, idx) => {
              const hasVoted = votedIds.includes(item.id);
              const isCommissioned = item.status === 'commissioned';
              const isInSampling = item.status === 'in_sampling';
              const isTop = idx === 0 && activeFilter === 'top';

              return (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between space-y-6 pb-8 border-b border-black/[0.08]"
                >
                  <div className="space-y-4">
                    {/* Status & Category Tag */}
                    <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-black/40">
                      <span className="font-semibold text-black">{item.category}</span>
                      {isCommissioned ? (
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>In Atelier Production</span>
                        </span>
                      ) : isInSampling ? (
                        <span className="text-amber-800 flex items-center gap-1 font-semibold">
                          <Scissors className="w-3 h-3" />
                          <span>Sample Drafting</span>
                        </span>
                      ) : isTop ? (
                        <span className="text-black flex items-center gap-1 font-semibold">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Leading Atelier Vote</span>
                        </span>
                      ) : (
                        <span className="text-black/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Under Review</span>
                        </span>
                      )}
                    </div>

                    {/* Proposal Title */}
                    <h3 className="font-editorial text-2xl sm:text-4xl font-normal text-black leading-snug">
                      {item.title}
                    </h3>

                    {/* Proposal Description */}
                    <p className="font-sans text-xs sm:text-sm text-black/70 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {/* Fabric spec */}
                    <div className="pt-2 text-[11px] text-black/50 flex items-center gap-2">
                      <span className="text-black/30 uppercase text-[9px] tracking-widest">Fabric:</span>
                      <span>{item.desiredFabric}</span>
                    </div>
                  </div>

                  {/* Vote Action Bar (Pure Typography, Zero Box) */}
                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleVote(item.id)}
                        disabled={hasVoted}
                        className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono cursor-pointer transition-opacity ${
                          hasVoted
                            ? 'text-black opacity-100 font-semibold'
                            : 'text-black/60 hover:text-black'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
                        <span>{hasVoted ? 'Voted' : 'Vote to Make This'}</span>
                      </button>
                      <span className="text-black/30">·</span>
                      <span className="text-xs font-semibold text-black">
                        {item.votes} {item.votes === 1 ? 'Vote' : 'Votes'}
                      </span>
                    </div>

                    <span className="text-[10px] text-black/30 uppercase tracking-widest">
                      By {item.submittedBy || 'Patron'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SUBMISSION MODAL: Pure minimalist luxury form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-xl w-full p-8 sm:p-12 relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-black/40 hover:text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-black/40 block mb-2">
              COMMISSION BALLOT
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-black mb-2">
              Propose a Garment
            </h2>
            <p className="font-sans text-xs text-black/60 leading-relaxed font-light mb-8">
              Describe the cut, fabric, or piece you want the atelier to weave. Once submitted, other patrons can vote for it.
            </p>

            {submitSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 stroke-[1.5]" />
                <h3 className="font-editorial text-2xl">Proposal Registered</h3>
                <p className="text-xs text-black/60">
                  Your piece is live on the ballot and ready for votes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-black/60 mb-1">
                    Garment Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Heavy Double-Faced Alpaca Trench"
                    className="w-full py-2.5 text-xs font-sans text-black border-b border-black/20 focus:border-black focus:outline-none placeholder-black/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/60 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full py-2.5 text-xs font-sans text-black border-b border-black/20 focus:border-black focus:outline-none bg-transparent cursor-pointer"
                    >
                      <option value="Outerwear">Outerwear</option>
                      <option value="Knitwear">Knitwear</option>
                      <option value="Tailoring">Tailoring</option>
                      <option value="Trousers">Trousers</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/60 mb-1">
                      Desired Fabric
                    </label>
                    <input
                      type="text"
                      value={desiredFabric}
                      onChange={(e) => setDesiredFabric(e.target.value)}
                      placeholder="e.g. 780 gsm Virgin Wool"
                      className="w-full py-2.5 text-xs font-sans text-black border-b border-black/20 focus:border-black focus:outline-none placeholder-black/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-black/60 mb-1">
                    Silhouette & Detail Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe cut, lapel, collar height, length, or functional details..."
                    className="w-full py-2.5 text-xs font-sans text-black border-b border-black/20 focus:border-black focus:outline-none placeholder-black/30 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/60 mb-1">
                      Your Name / Handle
                    </label>
                    <input
                      type="text"
                      value={submitterName}
                      onChange={(e) => setSubmitterName(e.target.value)}
                      placeholder="Atelier Patron"
                      className="w-full py-2.5 text-xs font-sans text-black border-b border-black/20 focus:border-black focus:outline-none placeholder-black/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/60 mb-1">
                      Email (Optional, for commission notice)
                    </label>
                    <input
                      type="email"
                      value={submitterEmail}
                      onChange={(e) => setSubmitterEmail(e.target.value)}
                      placeholder="patron@example.com"
                      className="w-full py-2.5 text-xs font-sans text-black border-b border-black/20 focus:border-black focus:outline-none placeholder-black/30"
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="text-xs text-rose-600 font-sans">{submitError}</p>
                )}

                <div className="pt-4 flex items-center justify-end gap-6 text-xs uppercase tracking-[0.2em]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-black/50 hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-black font-semibold underline underline-offset-8 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Submit to Ballot →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
