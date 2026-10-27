import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { products, isSearchOpen, setIsSearchOpen, setSelectedProduct, addToCart } = useShop();
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchShade = p.shadeName.toLowerCase().includes(q);
      const matchType = p.type.toLowerCase().includes(q);
      const matchMood = p.mood.toLowerCase().includes(q) || p.moodLabel.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchAvailableShades = p.availableShades.some(s => s.name.toLowerCase().includes(q) || s.toneDesc.toLowerCase().includes(q));
      return matchName || matchShade || matchType || matchMood || matchDesc || matchAvailableShades;
    });
  }, [products, query]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Baby Princess', 'Juicy Cherry', 'Glass Milk', 'Nude Squeeze', 'Lip Oil', 'Jojoba'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#FFC4DC] z-10 max-h-[80vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Search Bar Input */}
        <div className="relative pb-4 border-b border-[#F8DCE7]">
          <Search className="w-5 h-5 text-[#F04F87] absolute left-3 top-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by shade name, finish, mood or product..."
            className="w-full pl-11 pr-10 py-2.5 bg-white border border-[#F8DCE7] rounded-2xl text-sm text-[#563A45] placeholder-[#563A45]/50 focus:outline-none focus:ring-2 focus:ring-[#F04F87]/40 shadow-xs"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3 text-[#563A45]/50 hover:text-[#563A45]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div className="py-4 space-y-3">
            <span className="text-xs font-bold text-[#563A45]/70 uppercase tracking-wider block">
              Trending Searches ♡
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-white hover:bg-[#F8DCE7] border border-[#F8DCE7] text-xs font-semibold text-[#563A45] rounded-full transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-3">
          {query && filteredResults.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#563A45]/70">
              No gloss or oil matches "{query}". Try searching "pink", "cherry", or "nude"!
            </div>
          ) : (
            filteredResults.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  setSelectedProduct(p);
                }}
                className="bg-white rounded-2xl p-3 border border-[#F8DCE7] hover:border-[#FFC4DC] flex items-center justify-between gap-3 shadow-xs hover:shadow transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-xl bg-[#FFF9F4] shrink-0 border border-[#F8DCE7]"
                  />
                  <div>
                    <h4 className="font-brand text-sm font-bold text-[#563A45] group-hover:text-[#F04F87] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[#563A45]/75">
                      Shade: <span className="font-semibold text-[#563A45]">{p.shadeName}</span> · {p.finish}
                    </p>
                    <span className="font-brand font-bold text-xs text-[#563A45] tabular-nums">
                      ₹{p.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p, p.shadeName, 1);
                    }}
                    className="px-3 py-1.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#F8DCE7] flex justify-end">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-bold text-[#563A45]/70 hover:text-[#563A45]"
          >
            Close (Esc)
          </button>
        </div>

      </div>
    </div>
  );
};
