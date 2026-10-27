export type ProductPreference = 'Lip Gloss' | 'Lip Oil' | 'Both';
export type ShadeFamily = 'Pink' | 'Nude' | 'Peach' | 'Cherry' | 'Clear';
export type LeadSource = 'homepage_section' | 'lead_popup' | 'personality_quiz' | 'footer_signup' | 'lip_guide_modal';

export interface Lead {
  id: string;
  firstName: string;
  email: string;
  phone?: string;
  favoriteProduct: ProductPreference;
  favoriteShadeFamily: ShadeFamily;
  marketingConsent: boolean;
  consentTimestamp: string;
  source: LeadSource;
  createdAt: string;
  quizResult?: {
    personality: string;
    vibe: string;
    recommendedProduct: string;
    shade: string;
  };
  status: 'subscribed' | 'unsubscribed';
  unsubscribedAt?: string;
}

export interface CreateLeadInput {
  firstName: string;
  email: string;
  phone?: string;
  favoriteProduct: ProductPreference;
  favoriteShadeFamily: ShadeFamily;
  marketingConsent: boolean;
  source: LeadSource;
  quizResult?: Lead['quizResult'];
}

export interface LeadMetrics {
  totalLeads: number;
  activeSubscribers: number;
  consentRate: number;
  productBreakdown: Record<ProductPreference, number>;
  shadeBreakdown: Record<ShadeFamily, number>;
  sourceBreakdown: Record<LeadSource, number>;
}
