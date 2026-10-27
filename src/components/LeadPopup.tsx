import React, { useState } from 'react';
import { X, Sparkles, Heart, Check, BookOpen } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { ProductPreference, ShadeFamily } from '../types/leads';

export const LeadPopup: React.FC = () => {
  const { isPopupOpen, dismissPopup, addLead, setIsLipGuideOpen } = useLeads();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteProduct, setFavoriteProduct] = useState<ProductPreference>('Both');
  const [favoriteShadeFamily, setFavoriteShadeFamily] = useState<ShadeFamily>('Pink');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isPopupOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address ♡');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    const result = addLead({
      firstName: firstName.trim() || 'Gloss Bestie',
      email,
      favoriteProduct,
      favoriteShadeFamily,
      marketingConsent,
      source: 'lead_popup'
    });

    setIsSubmitting(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        dismissPopup();
      }, 3000);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={dismissPopup}
      />

      {/* Modal Card */}
      <div className="relative bg-gradient-to-br from-[#FFF9F4] via-[#F8DCE7]/40 to-[#FFF9F4] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#FFC4DC] z-10 animate-in fade-in zoom-in-95 my-6">
        
        {/* Dismiss Button */}
        <button
          onClick={dismissPopup}
          className="absolute top-4 right-4 p-1.5 text-[#563A45]/60 hover:text-[#563A45] hover:bg-white/80 rounded-full transition-colors cursor-pointer"
          aria-label="Dismiss pop-up"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 bg-[#FFC4DC] text-[#F04F87] rounded-full mx-auto flex items-center justify-center shadow-md">
              <Heart className="w-8 h-8 fill-[#F04F87]" />
            </div>
            <h3 className="font-brand text-2xl font-extrabold text-[#563A45]">
              Welcome to the Gloss Club, Bestie! ♡
            </h3>
            <p className="text-xs text-[#563A45]/80 max-w-xs mx-auto leading-relaxed">
              Your 10% welcome perk and <strong>The Ultimate Glossip Lip Combo Guide</strong> are on their way to {email}!
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  dismissPopup();
                  setIsLipGuideOpen(true);
                }}
                className="px-5 py-2.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read The Lip Combo Guide Now</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Realistic Product Image & Sparkles Banner */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/8] bg-white border border-[#FFC4DC]">
              <img
                src="/src/assets/images/hero_glossip_tubes_1793100403832.jpg"
                alt="Glossip Lip Gloss Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-white bg-[#F04F87]/90 px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>VIP Early Access Drops</span>
                </span>
              </div>
            </div>

            {/* Copy */}
            <div className="text-center space-y-1">
              <h3 className="font-brand text-2xl font-extrabold text-[#563A45] tracking-tight">
                A little gloss, a lot of perks ✨
              </h3>
              <p className="text-xs sm:text-sm text-[#563A45]/80 max-w-sm mx-auto">
                Be the first to know when your new lip obsession drops. Join our Gloss Club!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="px-3.5 py-2.5 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] placeholder-[#563A45]/50 focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address *"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="px-3.5 py-2.5 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] placeholder-[#563A45]/50 focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                />
              </div>

              {/* Quick Preferences */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#563A45]/70 block mb-1">
                    Favourite Finish
                  </label>
                  <select
                    value={favoriteProduct}
                    onChange={(e) => setFavoriteProduct(e.target.value as ProductPreference)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#F8DCE7] rounded-lg text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  >
                    <option value="Lip Gloss">Lip Gloss (High Shine)</option>
                    <option value="Lip Oil">Lip Oil (Juicy Moisture)</option>
                    <option value="Both">Both! (Besties Combo)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#563A45]/70 block mb-1">
                    Favourite Shade Tone
                  </label>
                  <select
                    value={favoriteShadeFamily}
                    onChange={(e) => setFavoriteShadeFamily(e.target.value as ShadeFamily)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#F8DCE7] rounded-lg text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  >
                    <option value="Pink">Pink (Baby Princess)</option>
                    <option value="Nude">Nude (Nude Squeeze)</option>
                    <option value="Peach">Peach (Peach Bellini)</option>
                    <option value="Cherry">Cherry (Juicy Cherry)</option>
                    <option value="Clear">Clear (Glass Milk)</option>
                  </select>
                </div>
              </div>

              {/* Marketing Consent Checkbox (Unchecked by Default) */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="w-3.5 h-3.5 mt-0.5 accent-[#F04F87] cursor-pointer"
                />
                <span className="text-[10px] text-[#563A45]/75 leading-tight">
                  I agree to receive new shade drops, launch perks, and lip combo inspiration. You can unsubscribe anytime via one-click link.
                </span>
              </label>

              {errorMessage && (
                <p className="text-xs text-rose-600 font-semibold">{errorMessage}</p>
              )}

              {/* Primary & Secondary Actions */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#F04F87] hover:bg-[#D83870] disabled:opacity-50 text-white font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>I'M IN, GLOSS BESTIE</span>
                </button>

                <button
                  type="button"
                  onClick={dismissPopup}
                  className="w-full py-1.5 text-xs text-[#563A45]/60 hover:text-[#563A45] font-semibold transition-colors cursor-pointer"
                >
                  Maybe later
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
