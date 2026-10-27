import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F4] shadow-2xl flex flex-col border-l border-[#F8DCE7] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#F8DCE7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#F04F87] fill-[#F04F87]" />
              <h2 className="font-brand text-lg font-bold text-[#563A45]">
                Your Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7]/50 rounded-full transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#F8DCE7] rounded-full mx-auto flex items-center justify-center text-2xl">
                  ♡
                </div>
                <h3 className="font-brand text-xl font-bold text-[#563A45]">No shades saved yet</h3>
                <p className="text-xs text-[#563A45]/70 max-w-xs mx-auto">
                  Tap the heart icon on any gloss or oil to keep track of your favourite shades.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              wishlist.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 border border-[#F8DCE7] flex gap-3 shadow-xs items-center justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl bg-[#FFF9F4] shrink-0 border border-[#F8DCE7] cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setSelectedProduct(product);
                    }}
                  />

                  <div className="flex-1 min-w-0 px-2">
                    <h4
                      className="font-brand text-xs sm:text-sm font-bold text-[#563A45] truncate cursor-pointer hover:text-[#F04F87]"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setSelectedProduct(product);
                      }}
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#563A45]/70">
                      Shade: <span className="font-semibold text-[#563A45]">{product.shadeName}</span>
                    </p>
                    <p className="font-brand font-bold text-sm text-[#563A45] tabular-nums mt-0.5">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(product, product.shadeName, 1);
                        toggleWishlist(product);
                      }}
                      className="px-3 py-1.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-[11px] text-[#563A45]/50 hover:text-rose-500 transition-colors text-center cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
