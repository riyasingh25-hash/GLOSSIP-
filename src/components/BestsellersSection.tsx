import React from 'react';
import { Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const BestsellersSection: React.FC = () => {
  const {
    products,
    activeCategoryFilter,
    setActiveCategoryFilter,
    activeMoodFilter,
    setActiveMoodFilter,
    activeSort,
    setActiveSort
  } = useShop();

  const categories = ['All', 'Lip Gloss', 'Lip Oil', 'Bestsellers', 'Duo Set'];

  // Filter products based on category and mood
  let filtered = products.filter(product => {
    // Category match
    if (activeCategoryFilter === 'Lip Gloss' && product.type !== 'Lip Gloss') return false;
    if (activeCategoryFilter === 'Lip Oil' && product.type !== 'Lip Oil') return false;
    if (activeCategoryFilter === 'Duo Set' && product.type !== 'Duo Set') return false;
    if (activeCategoryFilter === 'Bestsellers' && !product.isBestseller) return false;

    // Mood match
    if (activeMoodFilter && product.mood !== activeMoodFilter) return false;

    return true;
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    if (activeSort === 'price-asc') return a.price - b.price;
    if (activeSort === 'price-desc') return b.price - a.price;
    if (activeSort === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const resetFilters = () => {
    setActiveCategoryFilter('All');
    setActiveMoodFilter(null);
    setActiveSort('featured');
  };

  return (
    <section id="shop-section" className="py-16 lg:py-24 bg-[#FFF9F4] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#F8DCE7]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F04F87]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cult Favorites & New Drops</span>
            </div>
            <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#563A45] tracking-tight">
              The girls are obsessed ♡
            </h2>
            <p className="text-sm sm:text-base text-[#563A45]/80 max-w-xl">
              From mirror-glaze shine to nourishing botanical tints, find your holy grail lip combo.
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <SlidersHorizontal className="w-4 h-4 text-[#563A45]/70" />
            <span className="text-xs font-medium text-[#563A45]/80">Sort:</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-white border border-[#F8DCE7] text-xs font-semibold text-[#563A45] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F04F87] cursor-pointer"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-asc">Price: Low to High (₹)</option>
              <option value="price-desc">Price: High to Low (₹)</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Bar (Functional Interactive Tabs) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 p-1 bg-[#F8DCE7]/50 rounded-2xl border border-[#F8DCE7]">
            {categories.map(cat => {
              const isActive = activeCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#F04F87] text-white shadow-sm'
                      : 'text-[#563A45] hover:bg-white/80'
                  }`}
                >
                  {cat === 'Bestsellers' ? 'Bestsellers ♡' : cat}
                </button>
              );
            })}
          </div>

          {/* Active Mood Filter Tag */}
          {(activeMoodFilter || activeCategoryFilter !== 'All') && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#F04F87] hover:text-[#D83870] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F8DCE7] p-8 max-w-lg mx-auto space-y-4">
            <span className="text-4xl" role="img" aria-label="sparkles">✨</span>
            <h3 className="font-brand text-xl font-bold text-[#563A45]">No shades match this mood combo yet</h3>
            <p className="text-sm text-[#563A45]/70">
              Try switching your filter or explore our full collection of juicy glosses.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#F04F87] text-white text-xs font-semibold rounded-full hover:bg-[#D83870] transition-colors"
            >
              View All Shades
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
