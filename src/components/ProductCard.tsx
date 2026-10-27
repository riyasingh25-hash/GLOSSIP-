import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useShop();
  const [selectedShade, setSelectedShade] = useState(product.shadeName);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedShade, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const activeShadeData = product.availableShades.find(s => s.name === selectedShade) || product.availableShades[0];

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#F8DCE7] hover:border-[#FFC4DC] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Visual Image Container (65-70% height) */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-[#FFF9F4] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} - ${product.shadeName}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          {/* Subtle text badge */}
          <div className="flex items-center gap-1.5">
            {product.isBestseller && (
              <span className="text-[11px] font-bold tracking-wider text-[#F04F87] bg-white/95 px-2.5 py-0.5 rounded-full shadow-sm border border-[#FFC4DC]">
                BESTSELLER ♡
              </span>
            )}
            {product.isNew && !product.isBestseller && (
              <span className="text-[11px] font-bold tracking-wider text-[#563A45] bg-white/95 px-2.5 py-0.5 rounded-full shadow-sm border border-[#F8DCE7]">
                NEW DROP
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleFavorite}
            className={`w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 ${
              isFavorited ? 'text-[#F04F87]' : 'text-[#563A45]/70 hover:text-[#F04F87]'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#F04F87]' : ''}`} />
          </button>
        </div>

        {/* Quick View Hover Peek */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white text-[#563A45] font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 backdrop-blur-sm border border-[#F8DCE7]"
          >
            <Eye className="w-3.5 h-3.5 text-[#F04F87]" />
            <span>Quick View & Formula Specs</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Unboxed Metadata Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#563A45]/75 font-medium">
            <span>{product.type}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#F04F87] font-semibold">{product.finish}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-brand text-base sm:text-lg font-bold text-[#563A45] leading-snug group-hover:text-[#F04F87] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Active Shade Indicator */}
          <p className="text-xs text-[#563A45]/80">
            Shade: <span className="font-semibold text-[#563A45]">{selectedShade}</span>
          </p>

          {/* Shade Swatch Dots */}
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            {product.availableShades.map(s => {
              const isCurrent = s.name === selectedShade;
              return (
                <button
                  key={s.name}
                  onClick={() => setSelectedShade(s.name)}
                  title={`${s.name}: ${s.toneDesc}`}
                  className={`w-5 h-5 rounded-full transition-all border ${
                    isCurrent
                      ? 'ring-2 ring-[#F04F87] ring-offset-1 scale-110 border-white'
                      : 'border-black/10 hover:scale-105'
                  }`}
                  style={{ backgroundColor: s.hex }}
                  aria-label={`Select shade ${s.name}`}
                />
              );
            })}
          </div>
        </div>

        {/* Price & Quick Add Action */}
        <div className="pt-3 border-t border-[#F8DCE7] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-brand font-bold text-lg text-[#563A45] tabular-nums">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#563A45]/50 line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#563A45]/60 block">Incl. of all taxes</span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-[#F04F87] hover:bg-[#D83870] text-white hover:shadow'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
