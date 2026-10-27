import React from 'react';
import { Sparkles, Heart, Smile } from 'lucide-react';

export const TheGlossipExperience: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Gloss Goals',
      kicker: 'Pillar 01',
      description: 'Expressive, high-shine lip looks made to reflect your confidence. No rules, no rigid beauty standards — just blinding shine that elevates whatever mood you are in.',
      bgColor: 'bg-[#FFC4DC]/30',
      iconColor: 'text-[#F04F87]',
      handwrittenTag: 'main character shine ✨'
    },
    {
      icon: Heart,
      title: 'Cute in Every Detail',
      kicker: 'Pillar 02',
      description: 'Packaging engineered to be flaunted. From pastel custom caps and plush jumbo doe-foot wands to keepsake slide-out cartons, Glossip is your handbag’s prettiest accessory.',
      bgColor: 'bg-[#FFF0B8]/40',
      iconColor: 'text-[#D9822B]',
      handwrittenTag: 'vanity shelfie approved ♡'
    },
    {
      icon: Smile,
      title: 'Your Lips, Your Rules',
      kicker: 'Pillar 03',
      description: 'Beauty should never feel like a chore or a test you have to pass. Wear it sheer on bare lips, layered over a deep 90s lip pencil, or mixed together for your signature juicy combo.',
      bgColor: 'bg-[#E8DDF8]/40',
      iconColor: 'text-[#8E64C4]',
      handwrittenTag: 'zero pressure, 100% fun 🌸'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FFF9F4] border-b border-[#F8DCE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F04F87]">
            The Glossip Manifesto
          </span>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#563A45] tracking-tight">
            The Glossip Experience
          </h2>
          <p className="text-sm sm:text-base text-[#563A45]/80 text-balance">
            We are redefining everyday lip care for a generation that loves playful self-expression, cute aesthetics, and uncompromising comfort.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-8 border border-[#F8DCE7] hover:border-[#FFC4DC] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${pillar.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                    </div>
                    <span className="text-xs font-bold text-[#563A45]/50 tracking-wider">
                      {pillar.kicker}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-brand text-2xl font-bold text-[#563A45] group-hover:text-[#F04F87] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#563A45]/80 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F8DCE7]/80">
                  <span className="font-handwriting text-lg text-[#F04F87] select-none block">
                    {pillar.handwrittenTag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
