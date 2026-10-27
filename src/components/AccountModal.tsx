import React, { useState } from 'react';
import { 
  X, User, Package, Settings, Sparkles, MapPin, Phone, Mail, 
  Calendar, Check, ShieldCheck, Truck, ArrowRight, RotateCcw, 
  Bell, Heart, Award, ChevronRight, LogOut, Clock, CheckCircle2,
  ExternalLink, Copy, CheckCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    activeAccountTab,
    setActiveAccountTab,
    userProfile,
    updateUserProfile,
    orderHistory,
    addToCart,
    setIsCartOpen
  } = useShop();

  // Local state for personal details edit form
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    birthday: userProfile.birthday,
    address: userProfile.address,
    city: userProfile.city,
    pincode: userProfile.pincode
  });

  const [preferences, setPreferences] = useState({
    ...userProfile.preferences
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderDetails | null>(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered'>('All');
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [smsAlertActive, setSmsAlertActive] = useState(false);

  if (!isAccountOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      ...formData,
      preferences
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReorder = (order: OrderDetails) => {
    order.items.forEach(item => {
      addToCart(item.product, item.selectedShade, item.quantity);
    });
    setIsAccountOpen(false);
    setIsCartOpen(true);
  };

  const handleCopyTracking = (trackNum: string) => {
    navigator.clipboard?.writeText(trackNum);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const getStatusBadge = (status: OrderDetails['status']) => {
    switch (status) {
      case 'Delivered':
        return {
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          label: 'Delivered'
        };
      case 'Out for Delivery':
        return {
          style: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Truck,
          label: 'Out for Delivery'
        };
      case 'Shipped':
        return {
          style: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Truck,
          label: 'Shipped'
        };
      case 'Processing':
      default:
        return {
          style: 'bg-pink-50 text-[#F04F87] border-pink-200',
          icon: Clock,
          label: 'Processing'
        };
    }
  };

  // Filter orders by status tab
  const filteredOrders = orderHistory.filter(order => {
    if (orderStatusFilter === 'All') return true;
    if (orderStatusFilter === 'Processing') return order.status === 'Processing';
    if (orderStatusFilter === 'Shipped') return order.status === 'Shipped' || order.status === 'Out for Delivery';
    if (orderStatusFilter === 'Delivered') return order.status === 'Delivered';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAccountOpen(false)}
      />

      {/* Main Modal Box */}
      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-[#FFC4DC] z-10 max-h-[92vh] overflow-y-auto my-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE7]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F8DCE7] to-[#FFC4DC] flex items-center justify-center text-[#F04F87] font-bold text-lg shadow-sm border border-[#FFC4DC]">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-brand text-lg sm:text-xl font-bold text-[#563A45]">
                  {userProfile.name}
                </h2>
                <span className="text-[11px] font-bold text-[#F04F87] bg-white px-2 py-0.5 rounded-full border border-[#FFC4DC]">
                  {userProfile.tier}
                </span>
              </div>
              <p className="text-xs text-[#563A45]/70">
                {userProfile.email} · <span className="font-semibold text-[#563A45]">{userProfile.points} Glossip Points</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-2 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors cursor-pointer"
            aria-label="Close Account"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Tab Navigation Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-white/80 rounded-2xl border border-[#F8DCE7] my-5">
          <button
            onClick={() => {
              setActiveAccountTab('profile');
              setSelectedOrderDetails(null);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeAccountTab === 'profile'
                ? 'bg-[#F04F87] text-white shadow-sm'
                : 'text-[#563A45] hover:bg-[#F8DCE7]/40'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Details</span>
          </button>

          <button
            onClick={() => setActiveAccountTab('orders')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer relative ${
              activeAccountTab === 'orders'
                ? 'bg-[#F04F87] text-white shadow-sm'
                : 'text-[#563A45] hover:bg-[#F8DCE7]/40'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-bold ${
              activeAccountTab === 'orders' ? 'bg-white text-[#F04F87]' : 'bg-[#F8DCE7] text-[#563A45]'
            }`}>
              {orderHistory.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveAccountTab('settings');
              setSelectedOrderDetails(null);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeAccountTab === 'settings'
                ? 'bg-[#F04F87] text-white shadow-sm'
                : 'text-[#563A45] hover:bg-[#F8DCE7]/40'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings & Perks</span>
          </button>
        </div>

        {/* TAB 1: PERSONAL DETAILS */}
        {activeAccountTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in">
            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your customer personal details have been updated successfully!</span>
              </div>
            )}

            {/* Profile Fields */}
            <div className="bg-white rounded-2xl p-5 border border-[#F8DCE7] space-y-4 shadow-xs">
              <h3 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45] flex items-center gap-2">
                <User className="w-4 h-4 text-[#F04F87]" />
                <span>Contact & Identity Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Mobile Phone (India)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Birthday (Birthday Club Drop)</label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                  <span className="text-[10px] text-[#F04F87] block mt-0.5">
                    🎁 A free full-size mystery gloss drops in your cart during your birthday week!
                  </span>
                </div>
              </div>
            </div>

            {/* Default Delivery Address */}
            <div className="bg-white rounded-2xl p-5 border border-[#F8DCE7] space-y-4 shadow-xs">
              <h3 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F04F87]" />
                <span>Default Shipping Address (India)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">Apartment, Building & Street</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#563A45] block mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Save Profile Changes</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: MY ORDERS */}
        {activeAccountTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in">
            {selectedOrderDetails ? (
              /* DETAILED LIVE TRACKING VIEW */
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F8DCE7] space-y-6 animate-in slide-in-from-right duration-200">
                
                {/* Tracking View Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F8DCE7]">
                  <button
                    onClick={() => setSelectedOrderDetails(null)}
                    className="text-xs font-bold text-[#F04F87] hover:text-[#D83870] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    <span>Back to Order History</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {(() => {
                      const badge = getStatusBadge(selectedOrderDetails.status);
                      const Icon = badge.icon;
                      return (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${badge.style}`}>
                          <Icon className="w-3.5 h-3.5" />
                          <span>{badge.label}</span>
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {/* Tracking Hero Box */}
                <div className="bg-gradient-to-r from-[#FFF9F4] via-[#F8DCE7]/40 to-[#FFF9F4] p-5 rounded-2xl border border-[#FFC4DC] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F04F87] block">
                        Live Shipment Tracking
                      </span>
                      <h3 className="font-brand text-lg sm:text-xl font-extrabold text-[#563A45]">
                        Order #{selectedOrderDetails.orderId}
                      </h3>
                      <p className="text-xs text-[#563A45]/75 mt-0.5">
                        Courier: <strong>{selectedOrderDetails.courier || 'BlueDart Air Express'}</strong>
                      </p>
                    </div>

                    <div className="bg-white px-3.5 py-2 rounded-xl border border-[#F8DCE7] flex items-center gap-2 self-start sm:self-center">
                      <div>
                        <span className="text-[10px] text-[#563A45]/60 block uppercase font-bold">Waybill / AWB</span>
                        <span className="font-mono text-xs font-bold text-[#563A45]">
                          {selectedOrderDetails.trackingNumber || 'BLUEDART-IND-99482103'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyTracking(selectedOrderDetails.trackingNumber || 'BLUEDART-IND-99482103')}
                        className="p-1.5 text-[#563A45]/60 hover:text-[#F04F87] hover:bg-[#FFF9F4] rounded-lg transition-colors cursor-pointer"
                        title="Copy tracking number"
                      >
                        {copiedTracking ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Step-by-Step Progress Timeline */}
                  <div className="pt-3">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { step: 'Order Placed', time: selectedOrderDetails.date, icon: Sparkles },
                        { step: 'Packed & Dispatched', time: 'Mumbai Hub', icon: Package },
                        { step: 'In Transit', time: 'Bengaluru Sort Facility', icon: Truck },
                        { step: 'Delivered', time: 'Safe Delivery', icon: CheckCircle2 }
                      ].map((item, idx) => {
                        const isComplete = 
                          (selectedOrderDetails.status === 'Delivered') ||
                          (selectedOrderDetails.status === 'Out for Delivery' && idx <= 2) ||
                          (selectedOrderDetails.status === 'Shipped' && idx <= 1) ||
                          (selectedOrderDetails.status === 'Processing' && idx === 0);
                        
                        const isCurrent = 
                          (selectedOrderDetails.status === 'Processing' && idx === 0) ||
                          (selectedOrderDetails.status === 'Shipped' && idx === 1) ||
                          (selectedOrderDetails.status === 'Out for Delivery' && idx === 2) ||
                          (selectedOrderDetails.status === 'Delivered' && idx === 3);

                        return (
                          <div key={idx} className="flex flex-col items-center text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                              isCurrent
                                ? 'bg-[#F04F87] text-white ring-4 ring-[#FFC4DC]'
                                : isComplete
                                ? 'bg-[#F04F87] text-white'
                                : 'bg-white text-slate-400 border border-slate-200'
                            }`}>
                              <item.icon className="w-4 h-4" />
                            </div>
                            <span className={`text-xs font-bold leading-tight ${isComplete ? 'text-[#563A45]' : 'text-slate-400'}`}>
                              {item.step}
                            </span>
                            <span className="text-[10px] text-[#563A45]/60 mt-0.5 truncate max-w-full">
                              {item.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Real-time Courier Status Feed */}
                <div className="p-4 bg-[#FFF9F4] rounded-2xl border border-[#F8DCE7] space-y-3">
                  <h4 className="text-xs font-bold text-[#563A45] uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#F04F87]" />
                    <span>Courier Milestones (Simulated Live Feed)</span>
                  </h4>

                  <div className="space-y-2.5 text-xs text-[#563A45]">
                    {selectedOrderDetails.status === 'Processing' && (
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#F04F87] mt-1.5 shrink-0 animate-ping" />
                        <div>
                          <p className="font-semibold text-[#563A45]">Order confirmed & assigned to packaging station</p>
                          <p className="text-[11px] text-[#563A45]/70">Glossip Clean Formulation Facility, Mumbai · Hand-checked with pastel ribbon</p>
                        </div>
                      </div>
                    )}

                    {(selectedOrderDetails.status === 'Shipped' || selectedOrderDetails.status === 'Out for Delivery' || selectedOrderDetails.status === 'Delivered') && (
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-[#563A45]">Package departed air cargo sorting facility</p>
                          <p className="text-[11px] text-[#563A45]/70">Air Cargo Wing B, Chhatrapati Shivaji Maharaj Airport</p>
                        </div>
                      </div>
                    )}

                    {(selectedOrderDetails.status === 'Out for Delivery' || selectedOrderDetails.status === 'Delivered') && (
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-[#563A45]">Out for delivery with rider (Bengaluru Indiranagar Hub)</p>
                          <p className="text-[11px] text-[#563A45]/70">Courier Partner: Vikram S. · Contactless delivery with OTP</p>
                        </div>
                      </div>
                    )}

                    {selectedOrderDetails.status === 'Delivered' && (
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-emerald-800">Delivered successfully to recipient</p>
                          <p className="text-[11px] text-[#563A45]/70">Signed by customer · Hope you love your new gloss era ♡</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SMS / WhatsApp Alert Toggle */}
                  <div className="pt-2 border-t border-[#F8DCE7]/60 flex items-center justify-between text-xs">
                    <span className="text-[#563A45]/80">Send live courier location pins to {selectedOrderDetails.phone}</span>
                    <button
                      onClick={() => setSmsAlertActive(prev => !prev)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        smsAlertActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-[#F8DCE7] text-[#563A45] hover:bg-[#F8DCE7]'
                      }`}
                    >
                      {smsAlertActive ? '✓ WhatsApp Alerts On' : 'Enable WhatsApp Pin'}
                    </button>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#563A45] uppercase tracking-wider">
                    Ordered Shades ({selectedOrderDetails.items.length})
                  </h4>
                  {selectedOrderDetails.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 p-3.5 bg-[#FFF9F4] rounded-2xl border border-[#F8DCE7]">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover rounded-xl border border-[#F8DCE7] bg-white shrink-0"
                        />
                        <div>
                          <h5 className="font-brand font-bold text-xs sm:text-sm text-[#563A45]">{item.product.name}</h5>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: item.product.shadeHex }}
                            />
                            <span className="text-xs text-[#563A45]/80">
                              Shade: <strong>{item.selectedShade}</strong>
                            </span>
                            <span className="text-xs text-[#563A45]/50">· Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-brand font-bold text-sm text-[#563A45] tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping info and total summary */}
                <div className="p-4 bg-white rounded-2xl border border-[#F8DCE7] flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                  <div>
                    <span className="text-[#563A45]/70">Delivering to destination:</span>
                    <p className="font-semibold text-[#563A45]">{selectedOrderDetails.customerName}</p>
                    <p className="text-[#563A45]/80">{selectedOrderDetails.address}, {selectedOrderDetails.city} - {selectedOrderDetails.pincode}</p>
                  </div>
                  <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F8DCE7]">
                    <span className="text-[#563A45]/70 block">Total Amount:</span>
                    <span className="text-xl font-extrabold text-[#F04F87] tabular-nums">
                      ₹{selectedOrderDetails.total}
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-semibold">
                      Payment Mode: {selectedOrderDetails.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                  <button
                    onClick={() => setSelectedOrderDetails(null)}
                    className="px-5 py-2.5 bg-white border border-[#F8DCE7] text-[#563A45] text-xs font-bold rounded-full hover:bg-[#F8DCE7] transition-colors cursor-pointer"
                  >
                    Close Tracking
                  </button>
                  <button
                    onClick={() => handleReorder(selectedOrderDetails)}
                    className="px-6 py-2.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-order These Shades</span>
                  </button>
                </div>

              </div>
            ) : (
              /* ALL ORDERS LIST WITH TRACKING BUTTONS */
              <div className="space-y-4">
                
                {/* Orders Filter Tabs */}
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
                  <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#F8DCE7] text-xs">
                    {(['All', 'Processing', 'Shipped', 'Delivered'] as const).map(tabKey => (
                      <button
                        key={tabKey}
                        onClick={() => setOrderStatusFilter(tabKey)}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                          orderStatusFilter === tabKey
                            ? 'bg-[#F04F87] text-white shadow-xs'
                            : 'text-[#563A45] hover:bg-[#F8DCE7]/50'
                        }`}
                      >
                        {tabKey === 'All' ? `All Orders (${orderHistory.length})` : tabKey}
                      </button>
                    ))}
                  </div>

                  <span className="text-[11px] text-[#563A45]/65 font-medium hidden sm:inline">
                    Simulated Courier Tracking Available
                  </span>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-[#F8DCE7] space-y-3">
                    <Package className="w-12 h-12 text-[#F04F87]/60 mx-auto" />
                    <h3 className="font-brand text-lg font-bold text-[#563A45]">No {orderStatusFilter.toLowerCase()} orders found</h3>
                    <p className="text-xs text-[#563A45]/70 max-w-sm mx-auto">
                      Switch filter to All Orders or treat yourself to a new shade drop today!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {filteredOrders.map((order) => {
                      const badge = getStatusBadge(order.status);
                      const StatusIcon = badge.icon;
                      return (
                        <div
                          key={order.orderId}
                          className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F8DCE7] hover:border-[#FFC4DC] hover:shadow-md transition-all space-y-3"
                        >
                          {/* Order Header */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#F8DCE7]">
                            <div className="flex items-center gap-2">
                              <span className="font-brand font-bold text-sm text-[#563A45]">
                                Order #{order.orderId}
                              </span>
                              <span className="text-xs text-[#563A45]/60">· {order.date}</span>
                            </div>

                            {/* Status Badge */}
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${badge.style}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              <span>{badge.label}</span>
                            </span>
                          </div>

                          {/* Order Body */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            
                            {/* Product Thumbnails & Summary */}
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-3 overflow-hidden shrink-0">
                                {order.items.slice(0, 3).map((item, idx) => (
                                  <img
                                    key={idx}
                                    src={item.product.image}
                                    alt={item.product.name}
                                    referrerPolicy="no-referrer"
                                    className="w-13 h-13 rounded-xl object-cover border-2 border-white bg-[#FFF9F4] shadow-xs"
                                  />
                                ))}
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs font-bold text-[#563A45]">
                                  {order.items.length} {order.items.length === 1 ? 'Product' : 'Products'}
                                </p>
                                <p className="text-[11px] text-[#563A45]/70 line-clamp-1">
                                  {order.items.map(i => `${i.product.name} (${i.selectedShade})`).join(', ')}
                                </p>
                                <p className="text-[10px] text-[#F04F87] font-semibold mt-0.5">
                                  Carrier: {order.courier || 'BlueDart Air'}
                                </p>
                              </div>
                            </div>

                            {/* Price & Actions */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F8DCE7]/60">
                              <div className="text-left sm:text-right">
                                <span className="text-[10px] text-[#563A45]/60 block uppercase font-bold">Total Paid</span>
                                <span className="font-bold text-sm sm:text-base text-[#563A45] tabular-nums">
                                  ₹{order.total}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Dedicated Tracking Button */}
                                <button
                                  onClick={() => setSelectedOrderDetails(order)}
                                  className="px-4 py-2 bg-gradient-to-r from-[#F04F87] to-[#D83870] hover:opacity-95 text-white font-bold text-xs rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                                  title="Track package live location"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                  <span>Track Order</span>
                                </button>

                                <button
                                  onClick={() => handleReorder(order)}
                                  className="px-3.5 py-2 bg-white hover:bg-[#F8DCE7] border border-[#F8DCE7] text-[#563A45] font-bold text-xs rounded-full transition-colors cursor-pointer"
                                  title="Add items back to bag"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* TAB 3: SETTINGS & PERKS */}
        {activeAccountTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Glossip VIP Club Card */}
            <div className="bg-gradient-to-br from-[#FFC4DC]/40 via-white to-[#E8DDF8]/40 rounded-2xl p-6 border border-[#FFC4DC] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F04F87]" />
                  <h3 className="font-brand font-bold text-base text-[#563A45]">Glossip Rewards Club</h3>
                </div>
                <span className="font-bold text-sm text-[#F04F87] tabular-nums">{userProfile.points} Pts</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#563A45]/80">
                  <span>Current Tier: <strong>{userProfile.tier}</strong></span>
                  <span>80 pts to VIP Glossip Queen</span>
                </div>
                <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#FFC4DC]">
                  <div className="h-full bg-gradient-to-r from-[#FFC4DC] to-[#F04F87] w-[75%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/90 p-3 rounded-xl border border-[#F8DCE7] text-xs space-y-0.5">
                  <span className="font-bold text-[#563A45] block">₹100 Off Voucher</span>
                  <span className="text-[11px] text-[#563A45]/70">Redeem with 300 pts</span>
                  <button className="text-[11px] font-bold text-[#F04F87] hover:underline block pt-1 cursor-pointer">
                    Redeem Now →
                  </button>
                </div>

                <div className="bg-white/90 p-3 rounded-xl border border-[#F8DCE7] text-xs space-y-0.5">
                  <span className="font-bold text-[#563A45] block">Free Glaze Drip Gloss</span>
                  <span className="text-[11px] text-[#563A45]/70">Redeem with 600 pts</span>
                  <span className="text-[10px] text-slate-400 block pt-1">Needs 180 more pts</span>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl p-5 border border-[#F8DCE7] space-y-4">
              <h3 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#F04F87]" />
                <span>Notification & Order Alerts</span>
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-2 hover:bg-[#FFF9F4] rounded-xl cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-[#563A45] block">WhatsApp Dispatch & Delivery Alerts</span>
                    <span className="text-[11px] text-[#563A45]/70">Receive real-time courier out-for-delivery pins on WhatsApp</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.whatsappUpdates}
                    onChange={(e) => {
                      const next = { ...preferences, whatsappUpdates: e.target.checked };
                      setPreferences(next);
                      updateUserProfile({ preferences: next });
                    }}
                    className="w-4 h-4 accent-[#F04F87] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2 hover:bg-[#FFF9F4] rounded-xl cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-[#563A45] block">SMS Tracking Updates</span>
                    <span className="text-[11px] text-[#563A45]/70">Receive standard SMS text updates on dispatch</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.smsAlerts}
                    onChange={(e) => {
                      const next = { ...preferences, smsAlerts: e.target.checked };
                      setPreferences(next);
                      updateUserProfile({ preferences: next });
                    }}
                    className="w-4 h-4 accent-[#F04F87] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2 hover:bg-[#FFF9F4] rounded-xl cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-[#563A45] block">Secret Midnight Flash Drops</span>
                    <span className="text-[11px] text-[#563A45]/70">Early 1-hour access to limited-edition shade drops</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.secretDropInvites}
                    onChange={(e) => {
                      const next = { ...preferences, secretDropInvites: e.target.checked };
                      setPreferences(next);
                      updateUserProfile({ preferences: next });
                    }}
                    className="w-4 h-4 accent-[#F04F87] cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Lip Beauty Profile */}
            <div className="bg-white rounded-2xl p-5 border border-[#F8DCE7] space-y-4">
              <h3 className="font-brand text-sm font-bold uppercase tracking-wider text-[#563A45] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#F04F87]" />
                <span>Your Glossip Beauty Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-[#563A45] block mb-1">Favourite Finish</label>
                  <select
                    value={preferences.favoriteFinish}
                    onChange={(e) => {
                      const next = { ...preferences, favoriteFinish: e.target.value };
                      setPreferences(next);
                      updateUserProfile({ preferences: next });
                    }}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  >
                    <option value="Mirror Glass Shine">Mirror Glass Shine (Glaze Drip)</option>
                    <option value="Juicy Sheer Syrup">Juicy Sheer Syrup (Nectar Dew)</option>
                    <option value="Pillow Dew Oil">Pillow Dew Treatment Oil</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#563A45] block mb-1">Undertone Palette</label>
                  <select
                    value={preferences.preferredUndertone}
                    onChange={(e) => {
                      const next = { ...preferences, preferredUndertone: e.target.value };
                      setPreferences(next);
                      updateUserProfile({ preferences: next });
                    }}
                    className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
                  >
                    <option value="Warm Peach & Cinnamon">Warm Peach & Cinnamon (Indian Skin Calibrated)</option>
                    <option value="Cool Baby Pink & Lavender">Cool Baby Pink & Lavender</option>
                    <option value="Deep Cherry & Plum">Deep Cherry & Plum</option>
                    <option value="Crystal Water Sheer">Crystal Water Sheer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Log Out / Switch Account */}
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-[#563A45]/60">Logged in as {userProfile.email}</span>
              <button
                onClick={() => {
                  alert('You are currently viewing your Glossip demo session. Your preferences and orders are saved locally.');
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Session Settings</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
