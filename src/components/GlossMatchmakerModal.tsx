import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Heart, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';

export const GlossMatchmakerModal: React.FC = () => {
  const { isMatchmakerOpen, setIsMatchmakerOpen, addToCart, setSelectedProduct } = useShop();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    vibe: '',
    finish: '',
    wand: ''
  });
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  if (!isMatchmakerOpen) return null;

  const handleSelectVibe = (vibe: string) => {
    setAnswers(prev => ({ ...prev, vibe }));
    setStep(2);
  };

  const handleSelectFinish = (finish: string) => {
    setAnswers(prev => ({ ...prev, finish }));
    setStep(3);
  };

  const handleSelectWand = (wand: string) => {
    setAnswers(prev => ({ ...prev, wand }));

    // Calculate match
    let match = PRODUCTS[0];
    if (answers.vibe === 'cherry' || wand === 'paddle') {
      match = PRODUCTS.find(p => p.id === 'nectar-dew-juicy-cherry') || PRODUCTS[1];
    } else if (answers.vibe === 'nude') {
      match = PRODUCTS.find(p => p.id === 'glaze-drip-nude-squeeze') || PRODUCTS[3];
    } else if (answers.vibe === 'clear') {
      match = PRODUCTS.find(p => p.id === 'glaze-drip-glass-milk') || PRODUCTS[2];
    } else {
      match = PRODUCTS.find(p => p.id === 'glaze-drip-baby-princess') || PRODUCTS[0];
    }

    setMatchedProduct(match);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ vibe: '', finish: '', wand: '' });
    setMatchedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMatchmakerOpen(false)}
      />

      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#FFC4DC] z-10 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE7]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F04F87]" />
            <h2 className="font-brand text-lg font-bold text-[#563A45]">
              Gloss Matchmaker ♡
            </h2>
          </div>
          <button
            onClick={() => setIsMatchmakerOpen(false)}
            className="p-1.5 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="pt-4 flex items-center justify-between text-xs font-semibold text-[#563A45]/70">
            <span>Question {step} of 3</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-colors ${
                    step >= i ? 'bg-[#F04F87]' : 'bg-[#F8DCE7]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Vibe */}
        {step === 1 && (
          <div className="py-6 space-y-4 animate-in fade-in">
            <h3 className="font-brand text-xl font-extrabold text-[#563A45] text-center">
              What is your current daily vibe?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'princess', label: 'Soft Coquette & Ribbons', emoji: '🌸', desc: 'Baby pinks & glitter' },
                { id: 'cherry', label: 'Cherry Girl & Drama', emoji: '🍒', desc: 'Deep juicy berry tones' },
                { id: 'nude', label: 'Chai Latte / Clean Girl', emoji: '☕', desc: 'Warm everyday caramel' },
                { id: 'clear', label: 'Glass Skin Minimalist', emoji: '✨', desc: 'Ultra-clear mirror wet look' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectVibe(opt.id)}
                  className="p-4 rounded-2xl bg-white border border-[#F8DCE7] hover:border-[#F04F87] hover:bg-[#F8DCE7]/30 text-left transition-all group cursor-pointer shadow-xs"
                >
                  <span className="text-2xl block mb-1">{opt.emoji}</span>
                  <span className="font-brand font-bold text-xs sm:text-sm text-[#563A45] group-hover:text-[#F04F87] block">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-[#563A45]/70">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Finish */}
        {step === 2 && (
          <div className="py-6 space-y-4 animate-in fade-in">
            <h3 className="font-brand text-xl font-extrabold text-[#563A45] text-center">
              What lip finish do you crave?
            </h3>
            <div className="space-y-3">
              {[
                { id: 'glass', title: 'Vinyl Mirror Shine', desc: 'Extreme light reflection, zero stickiness' },
                { id: 'syrup', title: 'Juicy Sheer Syrup', desc: 'Subtle wash of fruit tint with high hydration' },
                { id: 'cushion', title: 'Pillow Dew Oil', desc: 'Intensive botanical moisture and soft flush' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectFinish(opt.id)}
                  className="w-full p-4 rounded-2xl bg-white border border-[#F8DCE7] hover:border-[#F04F87] text-left transition-all group cursor-pointer shadow-xs flex justify-between items-center"
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

        {/* Step 3: Wand */}
        {step === 3 && (
          <div className="py-6 space-y-4 animate-in fade-in">
            <h3 className="font-brand text-xl font-extrabold text-[#563A45] text-center">
              Choose your ideal applicator!
            </h3>
            <div className="space-y-3">
              {[
                { id: 'cloud', title: 'XL Cloud Doe-Foot Wand', desc: 'Super plush, holds maximum gloss in one dip for full coverage' },
                { id: 'paddle', title: 'Contoured Hugging Paddle', desc: 'Flexible paddle molded to hug your lip curvature smoothly' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectWand(opt.id)}
                  className="w-full p-4 rounded-2xl bg-white border border-[#F8DCE7] hover:border-[#F04F87] text-left transition-all group cursor-pointer shadow-xs flex justify-between items-center"
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

        {/* Step 4: Result Match */}
        {step === 4 && matchedProduct && (
          <div className="py-6 space-y-5 text-center animate-in fade-in">
            <div className="space-y-1">
              <span className="font-handwriting text-xl text-[#F04F87] font-bold">
                It's a perfect match! ♡
              </span>
              <h3 className="font-brand text-2xl font-extrabold text-[#563A45]">
                {matchedProduct.name}
              </h3>
              <p className="text-xs text-[#563A45]/80">
                Recommended in shade: <strong className="text-[#F04F87]">{matchedProduct.shadeName}</strong>
              </p>
            </div>

            {/* Product Card Showcase */}
            <div className="bg-white rounded-2xl p-4 border border-[#FFC4DC] shadow-sm flex items-center gap-4 text-left">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-cover rounded-xl bg-[#FFF9F4] shrink-0 border border-[#F8DCE7]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F04F87]">
                  {matchedProduct.finish}
                </span>
                <p className="text-xs text-[#563A45]/85 line-clamp-2 mt-0.5">
                  {matchedProduct.description}
                </p>
                <p className="font-brand font-bold text-base text-[#563A45] tabular-nums mt-1">
                  ₹{matchedProduct.price}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  addToCart(matchedProduct, matchedProduct.shadeName, 1);
                  setIsMatchmakerOpen(false);
                }}
                className="w-full py-3.5 bg-[#F04F87] hover:bg-[#D83870] text-white font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ADD MATCH TO BAG · ₹{matchedProduct.price}</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>

              <button
                onClick={handleReset}
                className="text-xs font-semibold text-[#563A45]/70 hover:text-[#563A45] flex items-center justify-center gap-1 mx-auto pt-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
