import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  selectedShade: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber?: string;
  courier?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address: string;
  city: string;
  pincode: string;
  tier: 'Glossip Bestie (Tier 1)' | 'Gloss Icon (Tier 2)' | 'VIP Glossip VIP';
  points: number;
  preferences: {
    favoriteFinish: string;
    preferredUndertone: string;
    smsAlerts: boolean;
    whatsappUpdates: boolean;
    secretDropInvites: boolean;
  };
}
