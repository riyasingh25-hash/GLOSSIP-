import React, { useState } from 'react';
import { Sparkles, Heart, Check, BookOpen, Gift, ShieldCheck } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { ProductPreference, ShadeFamily } from '../types/leads';

export const JoinGlossClubSection: React.FC = () => {
  const { addLead, setIsLipGuideOpen } = useLeads();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [favoriteProduct, setFavoriteProduct] = useState<ProductPreference>('Both');
  const [favoriteShadeFamily, setFavoriteShadeFamily] = useState<ShadeFamily>('Pink');
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setErrorMessage('Please let us know your first name ♡');
      return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address ♡');
      return;
    }

    // Optional phone validation for India
    if (phone.trim() && phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number or leave blank ♡');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const res = addLead({
      firstName: firstName.trim(),
      email,
      phone: phone.trim() ? phone.trim() : undefined,
      favoriteProduct,
      favoriteShadeFamily,
      marketingConsent,
      source: 'homepage_section'
    });

    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <section id="gloss-club-section" className="py-16 lg:py-24 bg-gradient-to-r from-[#FFC4DC]/35 via-[#FFF9F4] to-[#E8DDF8]/45 border-b border-[#F8DCE7] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#FFC4DC] shadow-xl relative overflow-hidden">
          
          {/* Subtle Decorative Background Blurs */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#FFC4DC]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#FFF0B8]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-3 relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9F4] border border-[#FFC4DC] text-xs font-bold text-[#F04F87]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Glossip VIP Club Drop</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#563A45] tracking-tight">
              Hey Gloss Bestie! 💋
            </h2>

            <p className="text-sm sm:text-base text-[#563A45]/85 leading-relaxed text-balance">
              Join the Gloss Club for first dibs on new shades, beauty updates, and exclusive launch perks.
            </p>

            {/* Lead Magnet Callout */}
            <div className="pt-2 pb-2 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#563A45]">
              <span className="flex items-center gap-1.5 bg-[#FFF0B8]/60 px-3 py-1 rounded-full border border-[#FFF0B8]">
                <Gift className="w-3.5 h-3.5 text-[#F04F87]" />
                <span>10% Welcome Voucher (GLOSSIP10)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[#F8DCE7]/60 px-3 py-1 rounded-full border border-[#F8DCE7]">
                <BookOpen className="w-3.5 h-3.5 text-[#F04F87]" />
                <span>The Ultimate Glossip Lip Combo Guide</span>
              </span>
            </div>
          </div>

          {/* Form or Success State */}
          <div className="mt-8 relative z-10 max-w-xl mx-auto">
            {isSuccess ? (
              <div className="bg-[#FFF9F4] rounded-2xl p-6 sm:p-8 text-center space-y-4 border border-[#FFC4DC] animate-in fade-in zoom-in-95">
                <div className="w-14 h-14 bg-[#F8DCE7] text-[#F04F87] rounded-full mx-auto flex items-center justify-center shadow-sm">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-brand text-xl font-bold text-[#563A45]">
                    You're Officially in the Club, {firstName}! ♡
                  </h3>
                  <p className="text-xs sm:text-sm text-[#563A45]/80">
                    Welcome to the girlhood! We've logged your shade profile preferences. 
                    Use code <strong className="text-[#F04F87] bg-white px-2 py-0.5 rounded border border-[#FFC4DC]">GLOSSIP10</strong> for 10% off your bag today.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setIsLipGuideOpen(true)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Lip Combo Guide</span>
                  </button>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-[#563A45]/70 hover:text-[#563A45] font-semibold"
                  >
                    Register another bestie
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#563A45] block mb-1">
                      First Name <span className="text-[#F04F87]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Riya"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full px-3.5 py-2.5 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-2 focus:ring-[#F04F87]/40 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#563A45] block mb-1">
                      Email Address <span className="text-[#F04F87]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. riya@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full px-3.5 py-2.5 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-2 focus:ring-[#F04F87]/40 shadow-xs"
                    />
                  </div>
                </div>

                {/* Optional Mobile Phone */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-[#563A45]">
                      Mobile Number (Optional)
                    </label>
                    <span className="text-[10px] text-[#563A45]/60">For secret WhatsApp drop alerts</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#563A45]/70">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-16 pr-3.5 py-2.5 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-2 focus:ring-[#F04F87]/40 shadow-xs"
                    />
                  </div>
                </div>

                {/* Segmented Preferences: Favourite Product */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-[#563A45] block">
                    Favourite Product Formulation:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Lip Gloss', 'Lip Oil', 'Both'] as const).map(option => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setFavoriteProduct(option)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                          favoriteProduct === option
                            ? 'bg-[#F04F87] text-white border-[#F04F87] shadow-xs'
                            : 'bg-[#FFF9F4] border-[#F8DCE7] text-[#563A45] hover:bg-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Segmented Preferences: Favourite Shade Family */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-[#563A45] block">
                    Favourite Shade Family:
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { key: 'Pink', hex: '#FFAEC9', label: 'Pink' },
                      { key: 'Nude', hex: '#C58C73', label: 'Nude' },
                      { key: 'Peach', hex: '#FFD8CC', label: 'Peach' },
                      { key: 'Cherry', hex: '#C9204B', label: 'Cherry' },
                      { key: 'Clear', hex: '#FFFFFF', label: 'Clear' }
                    ].map(fam => (
                      <button
                        type="button"
                        key={fam.key}
                        onClick={() => setFavoriteShadeFamily(fam.key as ShadeFamily)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          favoriteShadeFamily === fam.key
                            ? 'bg-white border-[#F04F87] ring-2 ring-[#F04F87]/30 text-[#563A45]'
                            : 'bg-[#FFF9F4] border-[#F8DCE7] text-[#563A45]/80 hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: fam.hex }}
                        />
                        <span className="text-[11px] font-semibold">{fam.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marketing Consent Checkbox (Unchecked by default) */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFF9F4] border border-[#F8DCE7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-[#F04F87] cursor-pointer"
                    />
                    <div className="text-[11px] text-[#563A45]/85 leading-relaxed">
                      <span>
                        Yes, I would love to receive email updates about new shade launches, lip combo secrets, and exclusive club perks.
                      </span>{' '}
                      <span className="text-[#563A45]/60 block text-[10px] mt-0.5">
                        We respect your privacy. Zero spam. You can unsubscribe anytime via the link in our footer.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <p className="text-xs text-rose-600 font-semibold pl-1 animate-in fade-in">
                    {errorMessage}
                  </p>
                )}

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#F04F87] hover:bg-[#D83870] disabled:opacity-50 text-white font-extrabold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{isSubmitting ? 'JOINING GLOSS CLUB...' : 'COUNT ME IN ♡'}</span>
                </button>

                {/* Privacy and Trust Footnote */}
                <div className="text-center pt-2 text-[11px] text-[#563A45]/60 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#563A45]/60" />
                  <span>Your information is safely protected under Indian digital data privacy practices.</span>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
