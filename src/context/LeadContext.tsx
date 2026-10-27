import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, CreateLeadInput, LeadMetrics, ProductPreference, ShadeFamily, LeadSource } from '../types/leads';

interface LeadContextType {
  leads: Lead[];
  addLead: (input: CreateLeadInput) => { success: boolean; message: string; lead?: Lead };
  unsubscribeLead: (email: string) => { success: boolean; message: string };
  deleteLead: (id: string) => boolean;
  isPopupOpen: boolean;
  setIsPopupOpen: (open: boolean) => void;
  hasDismissedPopup: boolean;
  dismissPopup: () => void;
  triggerPopupManual: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isLipGuideOpen: boolean;
  setIsLipGuideOpen: (open: boolean) => void;
  isPersonalityQuizOpen: boolean;
  setIsPersonalityQuizOpen: (open: boolean) => void;
  isUnsubscribeOpen: boolean;
  setIsUnsubscribeOpen: (open: boolean) => void;
  metrics: LeadMetrics;
  exportLeadsToCsv: () => void;
  lastCapturedLead: Lead | null;
}

const STORAGE_KEY = 'glossip_leads_store_v1';
const POPUP_DISMISSED_KEY = 'glossip_popup_dismissed_session';

// Seed initial realistic leads so the Admin Dashboard has insightful analytics from day one
const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: 'lead-001',
    firstName: 'Ananya',
    email: 'ananya.deshmukh@gmail.com',
    phone: '+91 98201 44521',
    favoriteProduct: 'Both',
    favoriteShadeFamily: 'Pink',
    marketingConsent: true,
    consentTimestamp: '2026-10-25T11:24:00.000Z',
    source: 'homepage_section',
    createdAt: '2026-10-25T11:24:00.000Z',
    status: 'subscribed'
  },
  {
    id: 'lead-002',
    firstName: 'Kavya',
    email: 'kavya.nair99@outlook.com',
    phone: '+91 97412 88390',
    favoriteProduct: 'Lip Oil',
    favoriteShadeFamily: 'Cherry',
    marketingConsent: true,
    consentTimestamp: '2026-10-25T15:10:00.000Z',
    source: 'personality_quiz',
    createdAt: '2026-10-25T15:10:00.000Z',
    quizResult: {
      personality: 'The Cherry Rebel',
      vibe: 'Bold & Spicy',
      recommendedProduct: 'Nectar Dew Lip Oil',
      shade: 'Juicy Cherry'
    },
    status: 'subscribed'
  },
  {
    id: 'lead-003',
    firstName: 'Tara',
    email: 'tara.mehta@college.edu.in',
    phone: '+91 98110 52319',
    favoriteProduct: 'Lip Gloss',
    favoriteShadeFamily: 'Nude',
    marketingConsent: true,
    consentTimestamp: '2026-10-26T09:45:00.000Z',
    source: 'lead_popup',
    createdAt: '2026-10-26T09:45:00.000Z',
    status: 'subscribed'
  },
  {
    id: 'lead-004',
    firstName: 'Pooja',
    email: 'pooja.verma88@yahoo.com',
    favoriteProduct: 'Lip Gloss',
    favoriteShadeFamily: 'Clear',
    marketingConsent: false,
    consentTimestamp: '2026-10-26T14:15:00.000Z',
    source: 'personality_quiz',
    createdAt: '2026-10-26T14:15:00.000Z',
    quizResult: {
      personality: 'The Crystal Visionary',
      vibe: 'Glass Skin Minimalist',
      recommendedProduct: 'Glaze Drip Lip Gloss',
      shade: 'Glass Milk'
    },
    status: 'subscribed'
  },
  {
    id: 'lead-005',
    firstName: 'Simran',
    email: 'simran.kaur@gmail.com',
    phone: '+91 99880 12345',
    favoriteProduct: 'Both',
    favoriteShadeFamily: 'Peach',
    marketingConsent: true,
    consentTimestamp: '2026-10-27T08:00:00.000Z',
    source: 'lip_guide_modal',
    createdAt: '2026-10-27T08:00:00.000Z',
    status: 'subscribed'
  }
];

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_MOCK_LEADS;
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasDismissedPopup, setHasDismissedPopup] = useState(() => {
    try {
      return sessionStorage.getItem(POPUP_DISMISSED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLipGuideOpen, setIsLipGuideOpen] = useState(false);
  const [isPersonalityQuizOpen, setIsPersonalityQuizOpen] = useState(false);
  const [isUnsubscribeOpen, setIsUnsubscribeOpen] = useState(false);
  const [lastCapturedLead, setLastCapturedLead] = useState<Lead | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // ignore
    }
  }, [leads]);

  // Timed dwell trigger for popup (12s delay, only if not previously dismissed)
  useEffect(() => {
    if (hasDismissedPopup) return;
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, [hasDismissedPopup]);

  const dismissPopup = () => {
    setIsPopupOpen(false);
    setHasDismissedPopup(true);
    try {
      sessionStorage.setItem(POPUP_DISMISSED_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const triggerPopupManual = () => {
    setIsPopupOpen(true);
  };

  // Add lead with validation & duplicate prevention
  const addLead = (input: CreateLeadInput) => {
    const cleanEmail = input.email.trim().toLowerCase();
    
    // Check duplicates
    const existing = leads.find(l => l.email.toLowerCase() === cleanEmail);
    if (existing && existing.status === 'subscribed') {
      return {
        success: false,
        message: 'This email is already part of the Gloss Club! Check your inbox for exclusive drops ♡'
      };
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      firstName: input.firstName.trim(),
      email: cleanEmail,
      phone: input.phone?.trim() || undefined,
      favoriteProduct: input.favoriteProduct,
      favoriteShadeFamily: input.favoriteShadeFamily,
      marketingConsent: Boolean(input.marketingConsent),
      consentTimestamp: new Date().toISOString(),
      source: input.source,
      createdAt: new Date().toISOString(),
      quizResult: input.quizResult,
      status: 'subscribed'
    };

    setLeads(prev => [newLead, ...prev.filter(l => l.email.toLowerCase() !== cleanEmail)]);
    setLastCapturedLead(newLead);

    // If popup was active, mark dismissed for session
    dismissPopup();

    return {
      success: true,
      message: 'Welcome to the Gloss Club! Check your inbox for the Glossip Lip Combo Guide ♡',
      lead: newLead
    };
  };

  const unsubscribeLead = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const target = leads.find(l => l.email.toLowerCase() === cleanEmail);
    if (!target) {
      return { success: false, message: 'No subscriber found with this email address.' };
    }

    setLeads(prev =>
      prev.map(l =>
        l.email.toLowerCase() === cleanEmail
          ? { ...l, status: 'unsubscribed', unsubscribedAt: new Date().toISOString() }
          : l
      )
    );
    return { success: true, message: 'You have been successfully unsubscribed from Glossip promotional emails.' };
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    return true;
  };

  // Live Metrics Calculation
  const activeSubscribers = leads.filter(l => l.status === 'subscribed');
  const totalLeads = leads.length;
  const consentedCount = activeSubscribers.filter(l => l.marketingConsent).length;
  const consentRate = activeSubscribers.length > 0 ? Math.round((consentedCount / activeSubscribers.length) * 100) : 0;

  const productBreakdown: Record<ProductPreference, number> = {
    'Lip Gloss': activeSubscribers.filter(l => l.favoriteProduct === 'Lip Gloss').length,
    'Lip Oil': activeSubscribers.filter(l => l.favoriteProduct === 'Lip Oil').length,
    'Both': activeSubscribers.filter(l => l.favoriteProduct === 'Both').length
  };

  const shadeBreakdown: Record<ShadeFamily, number> = {
    'Pink': activeSubscribers.filter(l => l.favoriteShadeFamily === 'Pink').length,
    'Nude': activeSubscribers.filter(l => l.favoriteShadeFamily === 'Nude').length,
    'Peach': activeSubscribers.filter(l => l.favoriteShadeFamily === 'Peach').length,
    'Cherry': activeSubscribers.filter(l => l.favoriteShadeFamily === 'Cherry').length,
    'Clear': activeSubscribers.filter(l => l.favoriteShadeFamily === 'Clear').length
  };

  const sourceBreakdown: Record<LeadSource, number> = {
    'homepage_section': leads.filter(l => l.source === 'homepage_section').length,
    'lead_popup': leads.filter(l => l.source === 'lead_popup').length,
    'personality_quiz': leads.filter(l => l.source === 'personality_quiz').length,
    'footer_signup': leads.filter(l => l.source === 'footer_signup').length,
    'lip_guide_modal': leads.filter(l => l.source === 'lip_guide_modal').length
  };

  const metrics: LeadMetrics = {
    totalLeads,
    activeSubscribers: activeSubscribers.length,
    consentRate,
    productBreakdown,
    shadeBreakdown,
    sourceBreakdown
  };

  // CSV Export utility
  const exportLeadsToCsv = () => {
    const headers = [
      'Lead ID',
      'First Name',
      'Email',
      'Phone',
      'Favorite Product',
      'Favorite Shade Family',
      'Signup Source',
      'Marketing Consent',
      'Consent Timestamp',
      'Status',
      'Created At',
      'Quiz Personality'
    ];

    const rows = leads.map(l => [
      l.id,
      `"${l.firstName.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${l.favoriteProduct}"`,
      `"${l.favoriteShadeFamily}"`,
      `"${l.source}"`,
      l.marketingConsent ? 'YES' : 'NO',
      l.consentTimestamp,
      l.status,
      l.createdAt,
      l.quizResult ? `"${l.quizResult.personality} (${l.quizResult.shade})"` : 'N/A'
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `glossip_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        addLead,
        unsubscribeLead,
        deleteLead,
        isPopupOpen,
        setIsPopupOpen,
        hasDismissedPopup,
        dismissPopup,
        triggerPopupManual,
        isAdminOpen,
        setIsAdminOpen,
        isLipGuideOpen,
        setIsLipGuideOpen,
        isPersonalityQuizOpen,
        setIsPersonalityQuizOpen,
        isUnsubscribeOpen,
        setIsUnsubscribeOpen,
        metrics,
        exportLeadsToCsv,
        lastCapturedLead
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
