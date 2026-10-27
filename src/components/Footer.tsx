import React from 'react';
import { Sparkles, Instagram, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLeads } from '../context/LeadContext';

export const Footer: React.FC = () => {
  const { setActiveCategoryFilter, setActiveMoodFilter } = useShop();
  const { setIsLipGuideOpen, setIsPersonalityQuizOpen, setIsAdminOpen, setIsUnsubscribeOpen } = useLeads();

  const handleFilterNav = (category: string) => {
    setActiveMoodFilter(null);
    setActiveCategoryFilter(category);
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('brand-story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8DCE7]/50 border-t border-[#FFC4DC] pt-16 pb-12 text-[#563A45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="font-brand text-2xl font-extrabold tracking-tight text-[#563A45] flex items-center gap-1.5">
              <span>GLOSSIP</span>
              <span className="text-xl" role="img" aria-label="lips">💋</span>
            </a>
            <p className="text-sm text-[#563A45]/80 max-w-sm leading-relaxed">
              Quirky, chic, and unapologetically glossy lip beauty crafted for Gen Z girls. 
              Non-sticky, hydrating formulas with pillow cushion wands.
            </p>
            <p className="font-handwriting text-xl text-[#F04F87]">
              “Glossed. Obsessed.” ♡
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#FFC4DC] flex items-center justify-center text-[#563A45] hover:text-[#F04F87] hover:border-[#F04F87] transition-colors"
                aria-label="Glossip on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@glossipbeauty.in"
                className="w-9 h-9 rounded-full bg-white border border-[#FFC4DC] flex items-center justify-center text-[#563A45] hover:text-[#F04F87] hover:border-[#F04F87] transition-colors"
                aria-label="Email Glossip Customer Care"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h4 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45]">
              Shop the Drops
            </h4>
            <ul className="space-y-2 text-sm text-[#563A45]/80">
              <li>
                <button
                  onClick={() => handleFilterNav('All')}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  Shop All Lip Beauty
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterNav('Lip Gloss')}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  Glaze Drip Lip Gloss
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterNav('Lip Oil')}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  Nectar Dew Lip Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterNav('Bestsellers')}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  Cult Bestsellers ♡
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterNav('Duo Set')}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  Besties Duo Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* About & Brand Links */}
          <div className="space-y-3">
            <h4 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45]">
              Our World
            </h4>
            <ul className="space-y-2 text-sm text-[#563A45]/80">
              <li>
                <button onClick={scrollToStory} className="hover:text-[#F04F87] transition-colors cursor-pointer text-left">
                  Our Story & Mission
                </button>
              </li>
              <li>
                <span className="hover:text-[#F04F87] transition-colors cursor-pointer">
                  Ingredient Transparency
                </span>
              </li>
              <li>
                <span className="hover:text-[#F04F87] transition-colors cursor-pointer">
                  Packaging & Sustainability
                </span>
              </li>
              <li>
                <span className="hover:text-[#F04F87] transition-colors cursor-pointer">
                  Creator Ambassador Program
                </span>
              </li>
            </ul>
          </div>

          {/* Customer Care & India Shipping */}
          <div className="space-y-3">
            <h4 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45]">
              Help & Care
            </h4>
            <ul className="space-y-2 text-sm text-[#563A45]/80">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('gloss-club-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left font-semibold text-[#F04F87]"
                >
                  Join the Gloss Club ♡
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLipGuideOpen(true)}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  The Glossip Lip Combo Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPersonalityQuizOpen(true)}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  What's Your Glossip Personality? Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsUnsubscribeOpen(true)}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left"
                >
                  Unsubscribe from Emails
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-[#F04F87] transition-colors cursor-pointer text-left text-[11px] text-[#563A45]/60"
                >
                  🔒 Admin Console & Leads CRM
                </button>
              </li>
              <li className="pt-2 text-xs text-[#563A45]/70 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F04F87] shrink-0" />
                <span>Warehouses in Mumbai & Delhi NCR</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFC4DC]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#563A45]/75">
          <p>© {new Date().getFullYear()} GLOSSIP BEAUTY PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Prices listed in INR (₹) inclusive of all GST</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#563A45]/70 hover:text-[#F04F87] transition-colors"
            >
              CRM Dashboard
            </button>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#F04F87]">
              <span>Made with love</span>
              <Heart className="w-3 h-3 fill-[#F04F87]" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
