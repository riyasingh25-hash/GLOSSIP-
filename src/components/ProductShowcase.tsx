import React, { useState } from 'react';
import { Sparkles, Droplets, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductShowcase: React.FC = () => {
  const { setActiveCategoryFilter } = useShop();
  const [activeTab, setActiveTab] = useState<'gloss' | 'oil'>('gloss');

  const scrollToShopCategory = (type: 'Lip Gloss' | 'Lip Oil') => {
    setActiveCategoryFilter(type);
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#FFF9F4] via-[#F8DCE7]/25 to-[#FFF9F4] border-b border-[#F8DCE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F04F87]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Glossip Formula Lab</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#563A45] tracking-tight">
            Lip Gloss vs. Lip Oil
          </h2>
          <p className="text-sm sm:text-base text-[#563A45]/80 text-balance">
            Two iconic formulas engineered for modern beauty. Discover the texture, applicator, and finish tailored for your routine.
          </p>

          {/* Interactive Toggle */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1 bg-white rounded-full border border-[#FFC4DC] shadow-sm">
              <button
                onClick={() => setActiveTab('gloss')}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  activeTab === 'gloss'
                    ? 'bg-[#F04F87] text-white shadow-sm'
                    : 'text-[#563A45] hover:text-[#F04F87]'
                }`}
              >
                Glossip Lip Gloss (High Shine)
              </button>
              <button
                onClick={() => setActiveTab('oil')}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  activeTab === 'oil'
                    ? 'bg-[#F04F87] text-white shadow-sm'
                    : 'text-[#563A45] hover:text-[#F04F87]'
                }`}
              >
                Glossip Lip Oil (Nourishing Finish)
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content 1: Lip Gloss */}
        {activeTab === 'gloss' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#FFC4DC]/80 shadow-md">
            
            {/* Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#FFF9F4] border border-[#F8DCE7]">
                <img
                  src="/src/assets/images/product_lipgloss_pink_1793100405279.jpg"
                  alt="Glossip Lip Gloss transparent tube with jumbo doe-foot wand"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#FFC4DC] text-xs font-bold text-[#563A45]">
                  Jumbo Cloud Doe-Foot Wand Included
                </div>
              </div>
            </div>

            {/* Details & Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F04F87]">
                  Formula 01 · Extreme Glass Reflection
                </span>
                <h3 className="font-brand text-2xl sm:text-3xl font-extrabold text-[#563A45]">
                  Glossip Glaze Drip Lip Gloss
                </h3>
                <p className="text-sm sm:text-base text-[#563A45]/85 leading-relaxed">
                  Engineered with optical high-refractive glass polymers that catch every ray of light. 
                  Gives you the wet vinyl reflection of lip fillers without the stinging needles or 2000s sticky hair trap.
                </p>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <Sparkles className="w-4 h-4" />
                    <span>The Wand</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    Oversized Cloud doe-foot with custom reservoir well for 1-swipe full lip saturation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <Droplets className="w-4 h-4" />
                    <span>The Infusion</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    Cold-pressed Golden Jojoba Seed Oil + Vitamin E for plush 8-hour pillow cushion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <Heart className="w-4 h-4" />
                    <span>The Scent</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    Spun strawberry vanilla cotton candy (subtle, sweet, zero artificial taste).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Packaging</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    Shatterproof acrylic tube with soft-touch pastel cap & silver star embossing.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => scrollToShopCategory('Lip Gloss')}
                  className="px-6 py-3 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Shop Lip Glosses (From ₹549)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab Content 2: Lip Oil */}
        {activeTab === 'oil' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#FFC4DC]/80 shadow-md">
            
            {/* Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#FFF9F4] border border-[#F8DCE7]">
                <img
                  src="/src/assets/images/product_lipoil_cherry_1793100405418.jpg"
                  alt="Glossip Lip Oil luxury transparent vial with cherry pink cap"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#FFC4DC] text-xs font-bold text-[#563A45]">
                  Contoured Hugging Paddle Wand Included
                </div>
              </div>
            </div>

            {/* Details & Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F04F87]">
                  Formula 02 · Juicy Cushion Nourishment
                </span>
                <h3 className="font-brand text-2xl sm:text-3xl font-extrabold text-[#563A45]">
                  Glossip Nectar Dew Lip Oil
                </h3>
                <p className="text-sm sm:text-base text-[#563A45]/85 leading-relaxed">
                  A high-nutrition oil-gel hybrid that transforms dehydrated, chapped lips into supple, juicy pillows.
                  Features pure sugarcane squalane and cold-pressed rosehip seed oil for a lightweight, sheer flush.
                </p>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <Sparkles className="w-4 h-4" />
                    <span>The Wand</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    Silky hugging paddle wand molded to cradle the natural curve of your lips.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <Droplets className="w-4 h-4" />
                    <span>The Infusion</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    100% Plant Squalane, Rosehip Berry Oil & Sweet Almond Oil complex.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <Heart className="w-4 h-4" />
                    <span>The Scent</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    Fresh tart black cherries and sweet orchard nectar.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#F8DCE7] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F04F87]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Packaging</span>
                  </div>
                  <p className="text-xs text-[#563A45]/80">
                    Heavy-base transparent glass vial with cherry-pink metallic chrome cap.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => scrollToShopCategory('Lip Oil')}
                  className="px-6 py-3 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Shop Lip Oils (From ₹649)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
