import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLeads } from '../context/LeadContext';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMatchmakerOpen,
    setIsAccountOpen,
    setActiveCategoryFilter,
    setActiveMoodFilter
  } = useShop();
  const { setIsPersonalityQuizOpen } = useLeads();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (category: string) => {
    setActiveMoodFilter(null);
    setActiveCategoryFilter(category);
    setMobileMenuOpen(false);
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    setMobileMenuOpen(false);
    const aboutSection = document.getElementById('brand-story');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F4]/95 backdrop-blur-md border-b border-[#F8DCE7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-brand text-2xl sm:text-3xl font-extrabold tracking-tight text-[#563A45] hover:text-[#F04F87] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          aria-label="Glossip Home"
        >
          <span>GLOSSIP</span>
          <span className="text-xl sm:text-2xl" role="img" aria-label="lips">💋</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#563A45]">
          <button
            onClick={() => handleNavClick('All')}
            className="hover:text-[#F04F87] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Shop All
          </button>
          <button
            onClick={() => handleNavClick('Lip Gloss')}
            className="hover:text-[#F04F87] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lip Gloss
          </button>
          <button
            onClick={() => handleNavClick('Lip Oil')}
            className="hover:text-[#F04F87] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lip Oils
          </button>
          <button
            onClick={() => handleNavClick('Bestsellers')}
            className="hover:text-[#F04F87] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Bestsellers
          </button>
          <button
            onClick={scrollToAbout}
            className="hover:text-[#F04F87] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About Us
          </button>
        </nav>

        {/* Zone 3: Primary Action & Tools */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Personality Quiz Button */}
          <button
            onClick={() => setIsPersonalityQuizOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#F04F87] bg-[#FFC4DC]/40 hover:bg-[#FFC4DC]/70 border border-[#F04F87]/20 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="What's Your Glossip Personality?"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F04F87]" />
            <span>Personality Quiz</span>
          </button>

          {/* Account Trigger */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="flex items-center gap-1.5 p-2 text-[#563A45] hover:text-[#F04F87] hover:bg-[#F8DCE7]/60 rounded-full transition-colors cursor-pointer"
            aria-label="Customer Account & Orders"
            title="My Account & Orders"
          >
            <User className="w-5 h-5" />
            <span className="hidden xl:inline text-xs font-semibold">Account</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#563A45] hover:text-[#F04F87] hover:bg-[#F8DCE7]/60 rounded-full transition-colors cursor-pointer"
            aria-label="Search shades and glosses"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-[#563A45] hover:text-[#F04F87] hover:bg-[#F8DCE7]/60 rounded-full transition-colors relative cursor-pointer"
            aria-label="View Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#F04F87] text-[#F04F87]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F04F87] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-white text-[#F04F87] font-bold text-[11px] px-1.5 py-0.2 rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-[#563A45] hover:text-[#F04F87] rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F4] border-b border-[#F8DCE7] px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top duration-150">
          <nav className="flex flex-col space-y-3 text-base font-semibold text-[#563A45]">
            <button
              onClick={() => handleNavClick('All')}
              className="text-left py-1 hover:text-[#F04F87] transition-colors"
            >
              Shop All Lip Beauty
            </button>
            <button
              onClick={() => handleNavClick('Lip Gloss')}
              className="text-left py-1 hover:text-[#F04F87] transition-colors"
            >
              Lip Gloss (High Shine)
            </button>
            <button
              onClick={() => handleNavClick('Lip Oil')}
              className="text-left py-1 hover:text-[#F04F87] transition-colors"
            >
              Lip Oils (Nourishing Tint)
            </button>
            <button
              onClick={() => handleNavClick('Bestsellers')}
              className="text-left py-1 hover:text-[#F04F87] transition-colors"
            >
              Bestsellers ♡
            </button>
            <button
              onClick={scrollToAbout}
              className="text-left py-1 hover:text-[#F04F87] transition-colors"
            >
              About Glossip
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAccountOpen(true);
              }}
              className="text-left py-1 hover:text-[#F04F87] transition-colors flex items-center justify-between text-[#F04F87]"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>My Account & Orders</span>
              </span>
              <span className="text-xs bg-[#FFC4DC] px-2 py-0.5 rounded-full font-bold">VIP</span>
            </button>
          </nav>
          
          <div className="pt-3 border-t border-[#F8DCE7] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsPersonalityQuizOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FFC4DC]/50 text-[#F04F87] font-semibold text-sm rounded-xl border border-[#FFC4DC]"
            >
              <Sparkles className="w-4 h-4 text-[#F04F87]" />
              <span>What's Your Glossip Personality? Quiz</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('gloss-club-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white text-[#563A45] font-semibold text-xs rounded-xl border border-[#F8DCE7]"
            >
              <span>Join the Gloss Club (10% Off) ♡</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
