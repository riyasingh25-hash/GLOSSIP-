import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { LeadProvider } from './context/LeadContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShopByMood } from './components/ShopByMood';
import { BestsellersSection } from './components/BestsellersSection';
import { ProductShowcase } from './components/ProductShowcase';
import { TheGlossipExperience } from './components/TheGlossipExperience';
import { SocialSection } from './components/SocialSection';
import { BrandStory } from './components/BrandStory';
import { FaqSection } from './components/FaqSection';
import { JoinGlossClubSection } from './components/JoinGlossClubSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { GlossMatchmakerModal } from './components/GlossMatchmakerModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { LeadPopup } from './components/LeadPopup';
import { PersonalityQuizModal } from './components/PersonalityQuizModal';
import { LipComboGuideModal } from './components/LipComboGuideModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { UnsubscribeModal } from './components/UnsubscribeModal';

export default function App() {
  return (
    <ShopProvider>
      <LeadProvider>
        <div className="min-h-screen bg-[#FFF9F4] text-[#563A45] flex flex-col antialiased selection:bg-[#FFC4DC] selection:text-[#563A45]">
          {/* Top Announcement Bar with rotating notices */}
          <AnnouncementBar />

          {/* Sticky Header compliant with 3-zone contract */}
          <Navbar />

          {/* Main Storefront Content */}
          <main className="flex-1">
            {/* Hero Section */}
            <HeroSection />

            {/* Interactive Shop by Mood */}
            <ShopByMood />

            {/* Bestsellers and Full Catalog */}
            <BestsellersSection />

            {/* Product Formula and Packaging Showcase */}
            <ProductShowcase />

            {/* The Glossip Experience: 3 Brand Pillars */}
            <TheGlossipExperience />

            {/* Instagram Community & Lifestyle Flatlay Grid */}
            <SocialSection />

            {/* Editorial Brand Narrative */}
            <BrandStory />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Join the Gloss Club Lead Generation Section */}
            <JoinGlossClubSection />
          </main>

          {/* Comprehensive Store Footer */}
          <Footer />

          {/* E-Commerce Modals and Drawers */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <GlossMatchmakerModal />
          <ProductQuickViewModal />
          <CheckoutModal />
          <AccountModal />

          {/* Lead Generation & Growth Modals */}
          <LeadPopup />
          <PersonalityQuizModal />
          <LipComboGuideModal />
          <AdminDashboardModal />
          <UnsubscribeModal />
        </div>
      </LeadProvider>
    </ShopProvider>
  );
}
