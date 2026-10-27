import React, { useState } from 'react';
import { X, Heart, Plus, Minus, Check, Sparkles, Droplets, ShieldCheck, Box } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductQuickViewModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedShade, setSelectedShade] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'packaging' | 'ingredients'>('details');

  if (!selectedProduct) return null;

  // Initialize selected shade on open
  const currentShade = selectedShade || selectedProduct.shadeName;
  const isFavorited = isInWishlist(selectedProduct.id);

  const images = [selectedProduct.image, selectedProduct.secondaryImage].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentShade, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#FFC4DC] z-10 max-h-[90vh] overflow-y-auto my-8 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 p-2 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Gallery Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#F8DCE7] shadow-sm">
              <img
                src={images[activeImageIndex] || selectedProduct.image}
                alt={`${selectedProduct.name} - ${currentShade}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#F04F87] border border-[#FFC4DC]">
                {selectedProduct.finish}
              </div>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#F04F87] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Header info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#563A45]/70">
                <span>{selectedProduct.type}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F04F87]">{selectedProduct.moodLabel}</span>
              </div>
              <h2 className="font-brand text-2xl sm:text-3xl font-extrabold text-[#563A45] leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-[#563A45]/80 font-medium">
                {selectedProduct.tagline}
              </p>
            </div>

            {/* Price Strip */}
            <div className="flex items-baseline gap-2">
              <span className="font-brand font-bold text-2xl text-[#563A45] tabular-nums">
                ₹{selectedProduct.price}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-[#563A45]/50 line-through tabular-nums">
                  ₹{selectedProduct.originalPrice}
                </span>
              )}
              <span className="text-xs text-[#563A45]/60 pl-2">Incl. all Indian taxes</span>
            </div>

            {/* Shade Selection */}
            <div className="space-y-2 pt-2 border-t border-[#F8DCE7]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#563A45]">Select Shade:</span>
                <span className="font-semibold text-[#F04F87]">{currentShade}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProduct.availableShades.map(s => {
                  const isSelected = s.name === currentShade;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setSelectedShade(s.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#F04F87] bg-white ring-2 ring-[#F04F87]/30 text-[#563A45]'
                          : 'border-[#F8DCE7] bg-white/70 text-[#563A45]/80 hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: s.hex }}
                      />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tabs for Formula / Packaging / Ingredients */}
            <div className="pt-2 border-t border-[#F8DCE7]">
              <div className="flex border-b border-[#F8DCE7] text-xs font-bold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-b-2 border-[#F04F87] text-[#F04F87]'
                      : 'text-[#563A45]/70 hover:text-[#563A45]'
                  }`}
                >
                  Formula Highlights
                </button>
                <button
                  onClick={() => setActiveTab('packaging')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    activeTab === 'packaging'
                      ? 'border-b-2 border-[#F04F87] text-[#F04F87]'
                      : 'text-[#563A45]/70 hover:text-[#563A45]'
                  }`}
                >
                  Packaging Design
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    activeTab === 'ingredients'
                      ? 'border-b-2 border-[#F04F87] text-[#F04F87]'
                      : 'text-[#563A45]/70 hover:text-[#563A45]'
                  }`}
                >
                  Ingredients & How-To
                </button>
              </div>

              <div className="pt-3 min-h-[90px] text-xs text-[#563A45]/85 leading-relaxed">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5">
                    {selectedProduct.formulaHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#F04F87] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'packaging' && (
                  <div className="space-y-1.5">
                    <p><strong>Cap Finish:</strong> {selectedProduct.packagingSpecs.capColor}</p>
                    <p><strong>Applicator:</strong> {selectedProduct.packagingSpecs.wandType}</p>
                    <p><strong>Vial Architecture:</strong> {selectedProduct.packagingSpecs.tubeFinish}</p>
                    <p><strong>Net Content:</strong> {selectedProduct.packagingSpecs.volume}</p>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2">
                    <p><strong>How to Wear:</strong> {selectedProduct.howToApply}</p>
                    <p className="text-[11px] text-[#563A45]/70">
                      <strong>Ingredients:</strong> {selectedProduct.ingredients}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Stepper & Add To Bag */}
            <div className="pt-4 border-t border-[#F8DCE7] flex items-center gap-3">
              <div className="flex items-center bg-white border border-[#F8DCE7] rounded-full p-1">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-full hover:bg-[#F8DCE7]/50 flex items-center justify-center text-[#563A45] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#563A45] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-8 h-8 rounded-full hover:bg-[#F8DCE7]/50 flex items-center justify-center text-[#563A45] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`flex-1 py-3 px-6 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F04F87] hover:bg-[#D83870] text-white hover:shadow-lg'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <span>ADD TO BAG · ₹{selectedProduct.price * quantity}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className={`w-11 h-11 rounded-full bg-white border border-[#F8DCE7] flex items-center justify-center transition-colors cursor-pointer ${
                  isFavorited ? 'text-[#F04F87]' : 'text-[#563A45]/70 hover:text-[#F04F87]'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#F04F87]' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
