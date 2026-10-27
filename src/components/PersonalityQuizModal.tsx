import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Heart, Check, BookOpen } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { ShadeFamily, ProductPreference } from '../types/leads';

interface PersonalityMatch {
  title: string;
  tagline: string;
  description: string;
  vibe: string;
  recommendedProduct: Product;
  recommendedShade: string;
  shadeHex: string;
  shadeFamily: ShadeFamily;
  productPref: ProductPreference;
}

export const PersonalityQuizModal: React.FC = () => {
  const { isPersonalityQuizOpen, setIsPersonalityQuizOpen, addLead, setIsLipGuideOpen } = useLeads();
  const { addToCart, setIsCartOpen } = useShop();

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    vibe: '' as 'cute' | 'bold' | 'natural' | 'glam' | '',
    lipLook: '' as ShadeFamily | '',
    productPick: '' as ProductPreference | ''
  });

  const [leadForm, setLeadForm] = useState({
    firstName: '',
    email: '',
    marketingConsent: false
  });

  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [leadError, setLeadError] = useState('');

  if (!isPersonalityQuizOpen) return null;

  const handleSelectVibe = (vibe: 'cute' | 'bold' | 'natural' | 'glam') => {
    setAnswers(prev => ({ ...prev, vibe }));
    setCurrentStep(2);
  };

  const handleSelectLipLook = (lipLook: ShadeFamily) => {
    setAnswers(prev => ({ ...prev, lipLook }));
    setCurrentStep(3);
  };

  const handleSelectProductPick = (productPick: ProductPreference) => {
    setAnswers(prev => ({ ...prev, productPick }));
    setCurrentStep(4);
  };

  // Determine personalized personality match
  const getPersonalityMatch = (): PersonalityMatch => {
    if (answers.vibe === 'bold' || answers.lipLook === 'Cherry') {
      const prod = PRODUCTS.find(p => p.id === 'nectar-dew-juicy-cherry') || PRODUCTS[1];
      return {
        title: 'The Cherry Rebel 🍒',
        tagline: 'Bold, juicy & unapologetically dramatic',
        description: 'You make everyday life feel like a cinematic movie scene. You love deep moody cherries, rich berry stains, and lip looks that turn heads.',
        vibe: 'Bold & Dramatic',
        recommendedProduct: prod,
        recommendedShade: 'Juicy Cherry',
        shadeHex: '#C9204B',
        shadeFamily: 'Cherry',
        productPref: 'Lip Oil'
      };
    }

    if (answers.vibe === 'natural' || answers.lipLook === 'Nude') {
      const prod = PRODUCTS.find(p => p.id === 'glaze-drip-nude-squeeze') || PRODUCTS[3];
      return {
        title: 'The Chai Latte Muse ☕',
        tagline: 'Warm, effortless & chic everyday beauty',
        description: 'You appreciate understated luxury and clean-girl coffee runs. Warm caramel and cinnamon undertones enhance your natural lip color effortlessly.',
        vibe: 'Natural & Effortless',
        recommendedProduct: prod,
        recommendedShade: 'Nude Squeeze',
        shadeHex: '#C58C73',
        shadeFamily: 'Nude',
        productPref: 'Lip Gloss'
      };
    }

    if (answers.lipLook === 'Clear') {
      const prod = PRODUCTS.find(p => p.id === 'glaze-drip-glass-milk') || PRODUCTS[2];
      return {
        title: 'The Crystal Visionary ✨',
        tagline: 'Pure liquid mirror, zero excess, 100% shine',
        description: 'You believe in healthy, hydrated lips that catch the sunlight. The optical clarity of crystal glass gives you high-fashion wet-look reflection.',
        vibe: 'Glass Skin Minimalist',
        recommendedProduct: prod,
        recommendedShade: 'Glass Milk',
        shadeHex: '#FFFFFF',
        shadeFamily: 'Clear',
        productPref: 'Lip Gloss'
      };
    }

    // Default: Cute / Pink / Peach
    const prod = PRODUCTS.find(p => p.id === 'glaze-drip-baby-princess') || PRODUCTS[0];
    return {
      title: 'The Coquette Princess 🌸',
      tagline: 'Soft baby pinks, satin ribbons & dreamy sparkles',
      description: 'You radiate main character feminine joy. A touch of baby pink gloss infused with diamond shimmer is your daily signature.',
      vibe: 'Cute & Feminine',
      recommendedProduct: prod,
      recommendedShade: 'Baby Princess',
      shadeHex: '#FFAEC9',
      shadeFamily: 'Pink',
      productPref: 'Both'
    };
  };

  const match = getPersonalityMatch();

  const handleSaveResultWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.email.includes('@') || !leadForm.email.includes('.')) {
      setLeadError('Please enter a valid email address ♡');
      return;
    }
    setLeadError('');
    setIsSubmittingLead(true);

    const res = addLead({
      firstName: leadForm.firstName.trim() || 'Gloss Bestie',
      email: leadForm.email,
      favoriteProduct: match.productPref,
      favoriteShadeFamily: match.shadeFamily,
      marketingConsent: leadForm.marketingConsent,
      source: 'personality_quiz',
      quizResult: {
        personality: match.title,
        vibe: match.vibe,
        recommendedProduct: match.recommendedProduct.name,
        shade: match.recommendedShade
      }
    });

    setIsSubmittingLead(false);
    if (res.success) {
      setLeadSaved(true);
    } else {
      setLeadError(res.message);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnswers({ vibe: '', lipLook: '', productPick: '' });
    setLeadSaved(false);
    setLeadError('');
  };

  const handleAddMatchToBag = () => {
    addToCart(match.recommendedProduct, match.recommendedShade, 1);
    setIsPersonalityQuizOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsPersonalityQuizOpen(false)}
      />

      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-[#FFC4DC] z-10 my-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE7]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F04F87]" />
            <h2 className="font-brand text-lg font-bold text-[#563A45]">
              What's Your Glossip Personality?
            </h2>
          </div>
          <button
            onClick={() => setIsPersonalityQuizOpen(false)}
            className="p-1.5 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        {currentStep <= 3 && (
          <div className="pt-4 flex items-center justify-between text-xs font-semibold text-[#563A45]/70">
            <span>Question {currentStep} of 3</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-8 h-1.5 rounded-full transition-colors ${
                    currentStep >= i ? 'bg-[#F04F87]' : 'bg-[#F8DCE7]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* QUESTION 1 */}
        {currentStep === 1 && (
          <div className="py-6 space-y-4 animate-in fade-in">
            <h3 className="font-brand text-xl font-extrabold text-[#563A45] text-center">
              1. What's your everyday vibe?
            </h3>
            <p className="text-xs text-center text-[#563A45]/70">
              Pick the energy that represents your daily aesthetic.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { id: 'cute', label: 'Cute', emoji: '🎀', desc: 'Pastels, ribbons & girlhood' },
                { id: 'bold', label: 'Bold', emoji: '💋', desc: 'Spicy drama & confidence' },
                { id: 'natural', label: 'Natural', emoji: '☕', desc: 'Warm chai & clean girl' },
                { id: 'glam', label: 'Glam', emoji: '✨', desc: 'Full vinyl glass reflection' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectVibe(opt.id as any)}
                  className="p-4 rounded-2xl bg-white border border-[#F8DCE7] hover:border-[#F04F87] hover:bg-[#F8DCE7]/30 text-left transition-all group cursor-pointer shadow-xs"
                >
                  <span className="text-2xl block mb-1">{opt.emoji}</span>
                  <span className="font-brand font-bold text-sm text-[#563A45] group-hover:text-[#F04F87] block">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-[#563A45]/70">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUESTION 2 */}
        {currentStep === 2 && (
          <div className="py-6 space-y-4 animate-in fade-in">
            <h3 className="font-brand text-xl font-extrabold text-[#563A45] text-center">
              2. Which lip look do you love?
            </h3>
            <p className="text-xs text-center text-[#563A45]/70">
              Select your favorite shade family on your lips.
            </p>

            <div className="space-y-2 pt-2">
              {[
                { id: 'Pink', label: 'Pink Gloss', hex: '#FFAEC9', desc: 'Soft petal blush with diamond shimmer' },
                { id: 'Nude', label: 'Nude Gloss', hex: '#C58C73', desc: 'Caramel chai tone calibrated for Indian skin' },
                { id: 'Peach', label: 'Peach Gloss', hex: '#FFD8CC', desc: 'Juicy summer peach nectar sheen' },
                { id: 'Cherry', label: 'Cherry Gloss', hex: '#C9204B', desc: 'Rich ruby syrup with black cherry tint' },
                { id: 'Clear', label: 'Clear Gloss', hex: '#FFFFFF', desc: 'Pure crystalline water droplet shine' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectLipLook(opt.id as ShadeFamily)}
                  className="w-full p-3.5 rounded-2xl bg-white border border-[#F8DCE7] hover:border-[#F04F87] text-left transition-all group cursor-pointer shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <div>
                      <span className="font-brand font-bold text-xs sm:text-sm text-[#563A45] group-hover:text-[#F04F87]">
                        {opt.label}
                      </span>
                      <p className="text-[11px] text-[#563A45]/70">{opt.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#563A45]/30 group-hover:text-[#F04F87] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUESTION 3 */}
        {currentStep === 3 && (
          <div className="py-6 space-y-4 animate-in fade-in">
            <h3 className="font-brand text-xl font-extrabold text-[#563A45] text-center">
              3. What would you pick?
            </h3>
            <p className="text-xs text-center text-[#563A45]/70">
              Choose your ideal formulation and applicator style.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  id: 'Lip Gloss',
                  title: 'High-Shine Lip Gloss',
                  desc: 'Optical glass reflection & jumbo Cloud doe-foot wand'
                },
                {
                  id: 'Lip Oil',
                  title: 'Nourishing Lip Oil',
                  desc: 'Botanical squalane + rosehip syrup with hugging paddle wand'
                },
                {
                  id: 'Both',
                  title: 'Both! (Lip Gloss + Lip Oil Duo)',
                  desc: 'Nourish first with oil, top with high-shine glass gloss'
                }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectProductPick(opt.id as ProductPreference)}
                  className="w-full p-4 rounded-2xl bg-white border border-[#F8DCE7] hover:border-[#F04F87] text-left transition-all group cursor-pointer shadow-xs flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-brand font-bold text-sm text-[#563A45] group-hover:text-[#F04F87]">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-[#563A45]/70">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#563A45]/40 group-hover:text-[#F04F87] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: PERSONALISED RECOMMENDATION RESULT (Visible Even Without Email) */}
        {currentStep === 4 && (
          <div className="py-4 space-y-5 animate-in fade-in">
            
            {/* Personality Header */}
            <div className="text-center space-y-1">
              <span className="font-handwriting text-xl text-[#F04F87] font-bold">
                Your Glossip Archetype ♡
              </span>
              <h3 className="font-brand text-2xl font-extrabold text-[#563A45]">
                {match.title}
              </h3>
              <p className="text-xs text-[#563A45]/80 max-w-sm mx-auto">
                {match.description}
              </p>
            </div>

            {/* Recommended Product Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#FFC4DC] shadow-sm flex items-center gap-4">
              <img
                src={match.recommendedProduct.image}
                alt={match.recommendedProduct.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-cover rounded-xl bg-[#FFF9F4] shrink-0 border border-[#F8DCE7]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: match.shadeHex }}
                  />
                  <span className="text-[11px] font-bold text-[#F04F87] uppercase tracking-wider">
                    Recommended Shade: {match.recommendedShade}
                  </span>
                </div>
                <h4 className="font-brand font-bold text-sm text-[#563A45] truncate mt-0.5">
                  {match.recommendedProduct.name}
                </h4>
                <p className="text-xs text-[#563A45]/75 line-clamp-1">
                  {match.recommendedProduct.tagline}
                </p>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#F8DCE7]">
                  <span className="font-brand font-bold text-base text-[#563A45] tabular-nums">
                    ₹{match.recommendedProduct.price}
                  </span>
                  <button
                    onClick={handleAddMatchToBag}
                    className="px-3.5 py-1.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>

            {/* OPTIONAL EMAIL CAPTURE FOR PERKS & LIP GUIDE */}
            {leadSaved ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-in fade-in">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Result & Lip Combo Guide unlocked!</span>
                </div>
                <p className="text-xs text-emerald-700">
                  We've sent your shade recommendation and digital handbook to <strong>{leadForm.email}</strong>.
                </p>
                <button
                  onClick={() => setIsLipGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#F04F87] border border-[#FFC4DC] font-bold text-xs rounded-full shadow-xs hover:bg-[#FFF9F4]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View The Ultimate Lip Combo Guide</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveResultWithEmail} className="p-4 bg-[#FFF9F4] rounded-2xl border border-[#F8DCE7] space-y-3">
                <div>
                  <h4 className="font-brand font-bold text-xs sm:text-sm text-[#563A45] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#F04F87]" />
                    <span>Want your result & The Ultimate Lip Combo Guide emailed? (Optional)</span>
                  </h4>
                  <p className="text-[11px] text-[#563A45]/70">
                    Receive your curated shades + exclusive 10% welcome coupon.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your First Name"
                    value={leadForm.firstName}
                    onChange={(e) => setLeadForm({ ...leadForm, firstName: e.target.value })}
                    className="px-3 py-2 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={leadForm.email}
                    onChange={(e) => {
                      setLeadForm({ ...leadForm, email: e.target.value });
                      if (leadError) setLeadError('');
                    }}
                    className="px-3 py-2 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer pt-0.5">
                  <input
                    type="checkbox"
                    checked={leadForm.marketingConsent}
                    onChange={(e) => setLeadForm({ ...leadForm, marketingConsent: e.target.checked })}
                    className="w-3.5 h-3.5 mt-0.5 accent-[#F04F87] cursor-pointer"
                  />
                  <span className="text-[11px] text-[#563A45]/75 leading-tight">
                    Yes, email me launch drops, secret shade drops and lip combos. (Unsubscribe anytime)
                  </span>
                </label>

                {leadError && (
                  <p className="text-xs text-rose-600 font-semibold">{leadError}</p>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="flex-1 py-2.5 bg-[#F04F87] hover:bg-[#D83870] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    {isSubmittingLead ? 'Sending Guide...' : 'Email My Result & Guide ♡'}
                  </button>
                </div>
              </form>
            )}

            {/* Retake Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-[#563A45]/70 hover:text-[#563A45] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Personality Quiz</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
