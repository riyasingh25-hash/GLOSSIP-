import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Phone, User, CreditCard, Banknote, Sparkles, Receipt, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    confirmedOrder,
    setConfirmedOrder,
    userProfile,
    addOrderToHistory
  } = useShop();

  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
    city: userProfile.city,
    pincode: userProfile.pincode,
    paymentMethod: 'upi' as 'upi' | 'card' | 'cod'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `GLP-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        items: [...cart],
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: cartTotal,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Processing',
        courier: 'BlueDart Air Express',
        trackingNumber: `BLUEDART-IND-${Math.floor(10000000 + Math.random() * 90000000)}`
      };

      addOrderToHistory(newOrder);
      setConfirmedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 700);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (confirmedOrder) {
      setConfirmedOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#FFC4DC] z-10 max-h-[90vh] overflow-y-auto my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE7]">
          <div className="flex items-center gap-2">
            <span className="text-xl">💋</span>
            <h2 className="font-brand text-xl font-bold text-[#563A45]">
              {confirmedOrder ? 'Order Confirmation Receipt' : 'Glossip Checkout'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="mt-4 p-3 bg-[#FFF0B8]/60 border border-[#FFF0B8] rounded-2xl flex items-start gap-2.5 text-xs text-[#563A45]">
          <Sparkles className="w-4 h-4 text-[#F04F87] shrink-0 mt-0.5" />
          <div>
            <strong>Interactive Store Demonstration:</strong> This checkout flow simulates placing an order for the Glossip brand. No real payment will be charged from your account.
          </div>
        </div>

        {confirmedOrder ? (
          /* Confirmation State with itemized receipt */
          <div className="mt-6 space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#F8DCE7] text-[#F04F87] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-brand text-2xl font-bold text-[#563A45]">
                Gloss Order Confirmed ♡
              </h3>
              <p className="text-sm text-[#563A45]/80">
                Receipt Order ID: <span className="font-mono font-bold text-[#F04F87]">{confirmedOrder.orderId}</span>
              </p>
              <p className="text-xs text-[#563A45]/70">
                A confirmation has been logged for {confirmedOrder.email}. Estimated delivery: 2–3 business days.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#F8DCE7] space-y-4 shadow-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[#F8DCE7] text-xs">
                <span className="text-[#563A45]/70">Date: {confirmedOrder.date}</span>
                <span className="font-semibold text-[#563A45] uppercase">
                  Payment: {confirmedOrder.paymentMethod.toUpperCase()}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#563A45] uppercase tracking-wider">Ordered Shades</h4>
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-[#563A45]">
                      {it.quantity}x {it.product.name} ({it.selectedShade})
                    </span>
                    <span className="font-semibold text-[#563A45] tabular-nums">
                      ₹{it.product.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="pt-3 border-t border-[#F8DCE7] text-xs text-[#563A45]/80 space-y-0.5">
                <h4 className="font-bold text-[#563A45] uppercase tracking-wider text-[11px]">Shipping To</h4>
                <p className="font-semibold text-[#563A45]">{confirmedOrder.customerName}</p>
                <p>{confirmedOrder.address}, {confirmedOrder.city} - {confirmedOrder.pincode}</p>
                <p>Phone: {confirmedOrder.phone}</p>
              </div>

              {/* Final Totals */}
              <div className="pt-3 border-t border-[#F8DCE7] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₹{confirmedOrder.subtotal}</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#F04F87]">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{confirmedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {confirmedOrder.shipping === 0 ? 'FREE' : `₹${confirmedOrder.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#563A45] pt-2 border-t border-[#F8DCE7]">
                  <span>Total Paid (Simulated)</span>
                  <span className="text-[#F04F87] font-extrabold text-base tabular-nums">
                    ₹{confirmedOrder.total}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                Continue Shopping More Drops ♡
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
            
            {/* Delivery Details */}
            <div className="space-y-3">
              <h3 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F04F87]" />
                <span>Shipping Destination in India</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#563A45]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Phone Number (SMS Updates)</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#563A45]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Flat / Building / Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <h3 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#F04F87]" />
                <span>Choose Payment Method</span>
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'upi'
                      ? 'bg-white border-[#F04F87] ring-1 ring-[#F04F87] shadow-sm'
                      : 'bg-white/60 border-[#F8DCE7] hover:bg-white'
                  }`}
                >
                  <span className="font-bold text-xs text-[#563A45] block">UPI / QR</span>
                  <span className="text-[10px] text-[#563A45]/70">GPay, PhonePe, Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'bg-white border-[#F04F87] ring-1 ring-[#F04F87] shadow-sm'
                      : 'bg-white/60 border-[#F8DCE7] hover:bg-white'
                  }`}
                >
                  <span className="font-bold text-xs text-[#563A45] block">Cards</span>
                  <span className="text-[10px] text-[#563A45]/70">Visa, Mastercard, RuPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'cod'
                      ? 'bg-white border-[#F04F87] ring-1 ring-[#F04F87] shadow-sm'
                      : 'bg-white/60 border-[#F8DCE7] hover:bg-white'
                  }`}
                >
                  <span className="font-bold text-xs text-[#563A45] block">Cash on Delivery</span>
                  <span className="text-[10px] text-[#563A45]/70">Pay upon arrival</span>
                </button>
              </div>
            </div>

            {/* Order Summary Strip */}
            <div className="p-4 bg-white rounded-2xl border border-[#F8DCE7] space-y-2">
              <div className="flex justify-between text-xs text-[#563A45]/80">
                <span>Items ({cart.reduce((t, i) => t + i.quantity, 0)})</span>
                <span className="font-semibold tabular-nums">₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-[#F04F87]">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold tabular-nums">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-[#563A45]/80">
                <span>India Standard Delivery</span>
                <span className="font-semibold tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F8DCE7] flex justify-between items-center">
                <span className="font-bold text-sm text-[#563A45]">Payable Total</span>
                <span className="font-extrabold text-xl text-[#F04F87] tabular-nums">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#F04F87] hover:bg-[#D83870] disabled:bg-[#F04F87]/50 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Generating Demo Receipt...</span>
              ) : (
                <>
                  <span>CONFIRM SIMULATED ORDER (₹{cartTotal})</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
