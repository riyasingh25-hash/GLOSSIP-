import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="py-16 lg:py-24 bg-[#FFF9F4] border-b border-[#F8DCE7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-white via-[#FFF9F4] to-[#F8DCE7]/30 rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#FFC4DC] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square shadow-lg border-2 border-white bg-white">
                <img
                  src="/src/assets/images/glossip_lifestyle_vanity_1793100405397.jpg"
                  alt="Glossip aesthetic vanity setup with lip glosses and ribbons"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Handwritten floating accent */}
              <div className="absolute -bottom-5 -right-4 sm:right-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#FFC4DC] shadow-md rotate-2">
                <p className="font-handwriting text-xl text-[#F04F87] font-bold">
                  welcome to your glossip era ♡
                </p>
              </div>
            </div>

            {/* Editorial Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F04F87]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Our Origin Story</span>
                </div>
                <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#563A45] tracking-tight leading-tight text-balance">
                  A little gloss. A whole personality.
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#563A45]/85 leading-relaxed font-normal">
                <p>
                  Glossip was imagined for the girls who believe that beauty should be fun, expressive, and unapologetically you. 
                  From everyday shine to your favourite going-out lip, we're here to make your beauty routine feel like a little moment of joy.
                </p>
                <p>
                  We were tired of paying exorbitant import markups for cute cosmetics or settling for old-school sticky lip glosses that glued our hair to our mouth on windy days.
                  Glossip was born right here in India — combining dermatologist-grade botanical nourishing oils with viral glass-like shine that genuinely looks gorgeous on Indian skin tones.
                </p>
                <p className="font-medium text-[#563A45]">
                  Cute packaging, playful energy, and a gloss for every mood — welcome to your Glossip era.
                </p>
              </div>

              {/* Founder Signoff Accent */}
              <div className="pt-4 border-t border-[#F8DCE7] flex items-center justify-between">
                <div>
                  <h4 className="font-brand font-bold text-sm text-[#563A45]">Designed with love in Mumbai & Bangalore</h4>
                  <p className="text-xs text-[#563A45]/70">For every college girl, lip combo enthusiast, and beauty daydreamer</p>
                </div>
                <div className="flex items-center gap-1 text-[#F04F87]">
                  <Heart className="w-4 h-4 fill-[#F04F87]" />
                  <Heart className="w-5 h-5 fill-[#F04F87]" />
                  <Heart className="w-4 h-4 fill-[#F04F87]" />
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
