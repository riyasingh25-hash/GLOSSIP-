import React, { useState } from 'react';
import { Instagram, Heart, Sparkles, ExternalLink } from 'lucide-react';

interface SocialPost {
  id: string;
  image: string;
  tag: string;
  caption: string;
  likes: string;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    image: '/src/assets/images/glossip_lifestyle_vanity_1793100405397.jpg',
    tag: 'Vanity Setup',
    caption: 'My everyday Glaze Drip essentials sitting pretty next to satin ribbons and vintage mirrors ✨ #glossipgirl',
    likes: '1.4k'
  },
  {
    id: 'post-2',
    image: '/src/assets/images/product_lipgloss_pink_1793100405279.jpg',
    tag: 'Wand Close-up',
    caption: 'Look at that cloud doe-foot applicator! One dip is all you need for blinding gloss 🌸 #glazeprincess',
    likes: '2.8k'
  },
  {
    id: 'post-3',
    image: '/src/assets/images/product_lipoil_cherry_1793100405418.jpg',
    tag: 'Cherry Girl Vibe',
    caption: 'Juicy Cherry Lip Oil is the only thing getting me through 8am lectures. Squalane + rosehip syrup 🍒',
    likes: '3.1k'
  },
  {
    id: 'post-4',
    image: '/src/assets/images/hero_glossip_tubes_1793100403832.jpg',
    tag: 'The Collection',
    caption: 'Spill the gloss, not the tea! Which pastel cap are you reaching for first? ♡',
    likes: '4.6k'
  }
];

export const SocialSection: React.FC = () => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleFollowClick = () => {
    // Copy the Instagram handle with friendly notification
    navigator.clipboard?.writeText('@glossipbeauty');
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2400);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#FFF9F4] border-b border-[#F8DCE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F04F87]">
            <Instagram className="w-3.5 h-3.5" />
            <span>@glossipbeauty on Instagram</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#563A45] tracking-tight">
            It's a Glossip kind of girlhood ♡
          </h2>
          <p className="text-sm sm:text-base text-[#563A45]/80 text-balance">
            GRWM routines, lip combo swatches, handbag essentials, and aesthetic vanity shelfies. 
            Tag <span className="font-semibold text-[#F04F87]">#glossipgirl</span> to be featured!
          </p>
        </div>

        {/* 4-Column Instagram Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_POSTS.map(post => (
            <div
              key={post.id}
              className="group relative rounded-3xl overflow-hidden aspect-square bg-[#F8DCE7]/40 border border-[#F8DCE7] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
              />

              {/* Hover Overlay with caption and like count */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <Heart className="w-3.5 h-3.5 fill-[#F04F87] text-[#F04F87]" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                    {post.caption}
                  </p>
                  <span className="text-[11px] font-bold text-[#FFC4DC]">
                    @glossipbeauty
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleFollowClick}
            className="px-8 py-3.5 bg-[#F04F87] hover:bg-[#D83870] text-white font-semibold text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW THE GLOSS @glossipbeauty</span>
          </button>
          
          {copiedNotification && (
            <p className="text-xs font-semibold text-[#F04F87] animate-in fade-in">
              Instagram handle copied to clipboard! See you on our feed ♡
            </p>
          )}

          <p className="text-xs text-[#563A45]/70 flex items-center gap-1.5 mt-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F04F87]" />
            <span>New lip combo reels dropping every Tuesday and Friday</span>
          </p>
        </div>

      </div>
    </section>
  );
};
