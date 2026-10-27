import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { CartItem, OrderDetails, UserProfile } from '../types';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMatchmakerOpen: boolean;
  setIsMatchmakerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  activeAccountTab: 'profile' | 'orders' | 'settings';
  setActiveAccountTab: (tab: 'profile' | 'orders' | 'settings') => void;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  orderHistory: OrderDetails[];
  addOrderToHistory: (order: OrderDetails) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeMoodFilter: string | null;
  setActiveMoodFilter: (mood: string | null) => void;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
  activeSort: string;
  setActiveSort: (sort: string) => void;
  confirmedOrder: OrderDetails | null;
  setConfirmedOrder: (order: OrderDetails | null) => void;
  appliedCoupon: { code: string; discountPercent: number } | null;
  addToCart: (product: Product, shade?: string, qty?: number) => void;
  removeFromCart: (productId: string, shade: string) => void;
  updateCartQty: (productId: string, shade: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  shippingFee: number;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const defaultProduct = PRODUCTS[0];
    return [
      {
        product: defaultProduct,
        selectedShade: defaultProduct.shadeName,
        quantity: 1
      }
    ];
  });
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState<'profile' | 'orders' | 'settings'>('profile');

  // Customer Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Riya Singh',
    email: 'riyasingh25@ibsindia.org',
    phone: '+91 98765 43210',
    birthday: '2002-11-14',
    address: 'Flat 402, Lotus Residency, 12th Main Road, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    tier: 'Gloss Icon (Tier 2)',
    points: 420,
    preferences: {
      favoriteFinish: 'Mirror Glass Shine',
      preferredUndertone: 'Warm Peach & Cinnamon',
      smsAlerts: true,
      whatsappUpdates: true,
      secretDropInvites: true
    }
  });

  // Pre-seed realistic mock orders across Processing, Shipped, Out for Delivery, and Delivered
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>([
    {
      orderId: 'GLP-918234',
      customerName: 'Riya Singh',
      email: 'riyasingh25@ibsindia.org',
      phone: '+91 98765 43210',
      address: 'Flat 402, Lotus Residency, Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      paymentMethod: 'upi',
      items: [
        {
          product: PRODUCTS[0], // Baby Princess
          selectedShade: 'Baby Princess',
          quantity: 2
        }
      ],
      subtotal: 1198,
      discount: 120,
      shipping: 0,
      total: 1078,
      date: '27 Oct 2026, 09:30 AM',
      status: 'Processing',
      courier: 'BlueDart Air Express',
      trackingNumber: 'BLUEDART-IND-10294812'
    },
    {
      orderId: 'GLP-847291',
      customerName: 'Riya Singh',
      email: 'riyasingh25@ibsindia.org',
      phone: '+91 98765 43210',
      address: 'Flat 402, Lotus Residency, Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      paymentMethod: 'card',
      items: [
        {
          product: PRODUCTS[1], // Juicy Cherry Lip Oil
          selectedShade: 'Juicy Cherry',
          quantity: 1
        },
        {
          product: PRODUCTS[2], // Glass Milk Clear
          selectedShade: 'Glass Milk',
          quantity: 1
        }
      ],
      subtotal: 1198,
      discount: 0,
      shipping: 0,
      total: 1198,
      date: '26 Oct 2026, 03:15 PM',
      status: 'Shipped',
      courier: 'Delhivery Surface',
      trackingNumber: 'DELHIVERY-BLR-8839201'
    },
    {
      orderId: 'GLP-781920',
      customerName: 'Riya Singh',
      email: 'riyasingh25@ibsindia.org',
      phone: '+91 98765 43210',
      address: 'Flat 402, Lotus Residency, Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      paymentMethod: 'upi',
      items: [
        {
          product: PRODUCTS[6], // Besties Duo
          selectedShade: 'Princess & Cherry Pair',
          quantity: 1
        }
      ],
      subtotal: 1099,
      discount: 100,
      shipping: 0,
      total: 999,
      date: '24 Oct 2026, 02:45 PM',
      status: 'Out for Delivery',
      courier: 'BlueDart Express India',
      trackingNumber: 'BLUEDART-IND-99482103'
    },
    {
      orderId: 'GLP-620194',
      customerName: 'Riya Singh',
      email: 'riyasingh25@ibsindia.org',
      phone: '+91 98765 43210',
      address: 'Flat 402, Lotus Residency, Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      paymentMethod: 'cod',
      items: [
        {
          product: PRODUCTS[3], // Nude Squeeze
          selectedShade: 'Nude Squeeze',
          quantity: 1
        }
      ],
      subtotal: 599,
      discount: 0,
      shipping: 79,
      total: 678,
      date: '12 Oct 2026, 11:20 AM',
      status: 'Delivered',
      courier: 'Delhivery Express',
      trackingNumber: 'DELHIVERY-BLR-4418290'
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeMoodFilter, setActiveMoodFilter] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeSort, setActiveSort] = useState<string>('featured');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsSearchOpen(false);
        setIsMatchmakerOpen(false);
        setIsCheckoutOpen(false);
        setIsAccountOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToCart = (product: Product, shade?: string, qty = 1) => {
    const chosenShade = shade || product.shadeName;
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedShade === chosenShade
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty
        };
        return next;
      }
      return [...prev, { product, selectedShade: chosenShade, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, shade: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedShade === shade)));
  };

  const updateCartQty = (productId: string, shade: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.selectedShade === shade) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GLOSSIP10' || cleanCode === 'GENZGLOSS' || cleanCode === 'OBSESSED') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 10 });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const addOrderToHistory = (order: OrderDetails) => {
    setOrderHistory(prev => [order, ...prev]);
    // Award 50 points per order!
    setUserProfile(prev => ({
      ...prev,
      points: prev.points + Math.round(order.total / 10)
    }));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100) : 0;
  
  const freeShippingThreshold = 999;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 79;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMatchmakerOpen,
        setIsMatchmakerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        activeAccountTab,
        setActiveAccountTab,
        userProfile,
        updateUserProfile,
        orderHistory,
        addOrderToHistory,
        selectedProduct,
        setSelectedProduct,
        activeMoodFilter,
        setActiveMoodFilter,
        activeCategoryFilter,
        setActiveCategoryFilter,
        activeSort,
        setActiveSort,
        confirmedOrder,
        setConfirmedOrder,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateCartQty,
        toggleWishlist,
        isInWishlist,
        clearCart,
        applyCoupon,
        removeCoupon,
        cartCount,
        cartSubtotal,
        discountAmount,
        freeShippingThreshold,
        freeShippingProgress,
        shippingFee,
        cartTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
