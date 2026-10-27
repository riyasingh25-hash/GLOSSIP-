import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLeads } from '../context/LeadContext';

export const HeroSection: React.FC = () => {
  const { setActiveCategoryFilter } = useShop();
  const { setIsPersonalityQuizOpen } = useLeads();

  const scrollToShop = () => {
    setActiveCategoryFilter('All');
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F4] via-[#F8DCE7]/30 to-[#FFF9F4] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#F8DCE7]/70">
      
      {/* Decorative subtle background accents */}
      <div className="absolute top-12 left-10 w-64 h-64 bg-[#FFC4DC]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E8DDF8]/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Playful Kicker (Unboxed text with separators, no pills) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold tracking-wider text-[#563A45]/80 uppercase">
              <span className="text-[#F04F87]">Gen Z Beauty Drop</span>
              <span aria-hidden="true">·</span>
              <span>100% Non-Sticky</span>
              <span aria-hidden="true">·</span>
              <span>₹549 Onwards</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-brand text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#563A45] tracking-tight leading-[1.08] text-balance">
              Glossed.{' '}
              <span className="shimmer-text italic font-serif">Obsessed.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#563A45]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal text-balance">
              Your everyday dose of juicy lips, cute vibes, and main-character energy. 
              Plush jumbo wands, mirror glass reflection, and nourishing botanical oils.
            </p>

            {/* Handwritten playful note */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl font-handwriting text-[#F04F87] select-none -rotate-1">
              <span>spill the gloss, not the tea ♡</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={scrollToShop}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F04F87] hover:bg-[#D83870] text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>SHOP THE GLOSS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsPersonalityQuizOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 bg-white/90 hover:bg-white text-[#563A45] hover:text-[#F04F87] font-semibold text-sm rounded-full border border-[#FFC4DC] shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F04F87]" />
                <span>WHAT'S YOUR PERSONALITY? QUIZ</span>
              </button>
            </div>

            {/* Trust points adjacent to claims */}
            <div className="pt-4 border-t border-[#F8DCE7] grid grid-cols-3 gap-2 text-center lg:text-left">
              <div>
                <p className="font-bold text-sm text-[#563A45] tabular-nums">0%</p>
                <p className="text-xs text-[#563A45]/70">Stickiness</p>
              </div>
              <div>
                <p className="font-bold text-sm text-[#563A45] tabular-nums">8 Hours</p>
                <p className="text-xs text-[#563A45]/70">Hydration Lock</p>
              </div>
              <div>
                <p className="font-bold text-sm text-[#563A45] tabular-nums">100%</p>
                <p className="text-xs text-[#563A45]/70">Cruelty-Free</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Product Frame with soft shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
                <img
                  src="/src/assets/images/hero_glossip_tubes_1793100403832.jpg"
                  alt="Glossip aesthetic lip gloss and lip oil collection in pastel shades"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Aesthetic Floater Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-[#FFC4DC] shadow-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F8DCE7] flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-[#F04F87] fill-[#F04F87]" />
                    </div>
                    <div>
                      <h2 className="text-xs sm:text-sm font-bold text-[#563A45]">Viral Glaze Drip Drop</h2>
                      <p className="text-[11px] text-[#563A45]/70">Jumbo Doe-Foot & Mirror Glaze</p>
                    </div>
                  </div>
                  <button
                    onClick={scrollToShop}
                    className="px-3.5 py-1.5 bg-[#F04F87] text-white text-xs font-semibold rounded-full hover:bg-[#D83870] transition-colors shrink-0 cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </div>

              {/* Little cute decorative ribbon doodle */}
              <div className="absolute -top-4 -right-4 bg-[#FFF0B8] border border-[#563A45]/15 rounded-2xl px-3 py-1.5 shadow-md -rotate-6 hidden sm:block">
                <span className="font-handwriting text-base font-bold text-[#563A45]">
                  instant lip filler effect ✨
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
