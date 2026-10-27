import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQty,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingProgress,
    shippingFee,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartTotal,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError('Invalid code. Try GLOSSIP10 for 10% off!');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F4] shadow-2xl flex flex-col border-l border-[#F8DCE7] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#F8DCE7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#F04F87]" />
              <h2 className="font-brand text-lg font-bold text-[#563A45]">
                Your Glossip Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7]/50 rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#F8DCE7]/60 p-4 border-b border-[#FFC4DC]/70">
            <div className="flex justify-between items-center text-xs font-semibold text-[#563A45] mb-2">
              {amountNeededForFreeShipping === 0 ? (
                <span className="flex items-center gap-1.5 text-[#F04F87]">
                  <Sparkles className="w-4 h-4 fill-[#F04F87]" />
                  <span>Yay! You've unlocked FREE Delivery across India ♡</span>
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#F04F87]">₹{amountNeededForFreeShipping}</strong> more for FREE shipping!
                </span>
              )}
              <span className="tabular-nums font-bold text-[#563A45]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#FFC4DC]">
              <div
                className="h-full bg-[#F04F87] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#F8DCE7] rounded-full mx-auto flex items-center justify-center text-2xl">
                  💋
                </div>
                <h3 className="font-brand text-xl font-bold text-[#563A45]">Your bag is feeling lonely ♡</h3>
                <p className="text-xs text-[#563A45]/70 max-w-xs mx-auto">
                  Treat your lips to our high-shine Glaze Drip or juicy Nectar Dew oils.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedShade}`}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-[#F8DCE7] flex gap-3 shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl bg-[#FFF9F4] shrink-0 border border-[#F8DCE7]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-brand text-xs sm:text-sm font-bold text-[#563A45] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: item.product.shadeHex }}
                          />
                          <span className="text-xs text-[#563A45]/80 font-medium">
                            {item.selectedShade}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedShade)}
                        className="text-[#563A45]/40 hover:text-rose-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#FFF9F4] border border-[#F8DCE7] rounded-lg">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.selectedShade, -1)}
                          className="p-1 hover:text-[#F04F87] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#563A45] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.selectedShade, 1)}
                          className="p-1 hover:text-[#F04F87] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-brand font-bold text-sm text-[#563A45] tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#F8DCE7] space-y-3">
              
              {/* Promo Code Box */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FFF0B8]/50 border border-[#FFF0B8] rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#563A45]">
                    <Tag className="w-3.5 h-3.5 text-[#F04F87]" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-[#F04F87] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. GLOSSIP10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-[#563A45] uppercase focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#563A45] hover:bg-[#3D2831] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-500 font-semibold">{couponError}</p>
                  )}
                </form>
              )}

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs text-[#563A45]/80 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#563A45]">₹{cartSubtotal}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#F04F87]">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="font-semibold tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (India Express)</span>
                  <span className="font-semibold tabular-nums text-[#563A45]">
                    {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#563A45] pt-2 border-t border-[#F8DCE7]">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-[#F04F87] font-extrabold text-lg">
                    ₹{cartTotal}
                  </span>
                </div>
                <span className="text-[10px] text-[#563A45]/60 block text-right">
                  Inclusive of all Indian taxes & duties
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-[#F04F87] hover:bg-[#D83870] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#563A45]/60">
                🔒 Safe & secure simulated checkout · UPI, Cards & Cash on Delivery supported
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
