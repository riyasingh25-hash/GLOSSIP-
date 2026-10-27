import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MOODS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const ShopByMood: React.FC = () => {
  const { activeMoodFilter, setActiveMoodFilter, setActiveCategoryFilter } = useShop();

  const handleSelectMood = (moodId: string) => {
    setActiveCategoryFilter('All');
    if (activeMoodFilter === moodId) {
      setActiveMoodFilter(null);
    } else {
      setActiveMoodFilter(moodId);
    }
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 lg:py-20 bg-[#FFF9F4] border-b border-[#F8DCE7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F04F87]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Mood Match</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl font-extrabold text-[#563A45] tracking-tight">
            What's your gloss mood?
          </h2>
          <p className="text-sm sm:text-base text-[#563A45]/80 text-balance">
            Whether you are channeling your inner cherry-cola vixen or soft coquette angel, tap a mood to unlock your tailored shades.
          </p>
        </div>

        {/* 4 Mood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOODS.map(mood => {
            const isSelected = activeMoodFilter === mood.id;
            return (
              <div
                key={mood.id}
                onClick={() => handleSelectMood(mood.id)}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer border flex flex-col justify-between group text-left ${
                  isSelected
                    ? 'ring-2 ring-[#F04F87] shadow-lg scale-102 bg-white'
                    : 'hover:shadow-md hover:-translate-y-1 bg-white/70 hover:bg-white'
                }`}
                style={{
                  borderColor: isSelected ? '#F04F87' : '#F8DCE7'
                }}
              >
                {/* Header with Mood Emoji & Swatch */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl select-none" role="img" aria-label={mood.name}>
                      {mood.emoji}
                    </span>
                    <div className="flex items-center gap-1.5 bg-[#FFF9F4] px-2.5 py-1 rounded-full border border-[#F8DCE7]">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-inner border border-white"
                        style={{ backgroundColor: mood.shadeHex }}
                      />
                      <span className="text-[11px] font-semibold text-[#563A45]">
                        {mood.recommendedShade}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-brand text-xl font-bold text-[#563A45] group-hover:text-[#F04F87] transition-colors">
                      {mood.name}
                    </h3>
                    <p className="text-xs text-[#563A45]/75 mt-1 leading-relaxed">
                      {mood.tagline}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-[#F8DCE7]/80 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-[#F04F87]' : 'text-[#563A45]/80 group-hover:text-[#F04F87]'}>
                    {isSelected ? 'Viewing Mood ✓' : 'Shop This Mood'}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#F04F87] text-white' : 'bg-[#F8DCE7] text-[#563A45] group-hover:bg-[#F04F87] group-hover:text-white'
                  }`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear mood filter if active */}
        {activeMoodFilter && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setActiveMoodFilter(null)}
              className="text-xs font-semibold text-[#F04F87] hover:underline"
            >
              Clear mood filter & show all shades
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
