import React, { useState } from 'react';
import { X, Mail, Check, ShieldCheck } from 'lucide-react';
import { useLeads } from '../context/LeadContext';

export const UnsubscribeModal: React.FC = () => {
  const { isUnsubscribeOpen, setIsUnsubscribeOpen, unsubscribeLead } = useLeads();
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isUnsubscribeOpen) return null;

  const handleUnsubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    const res = unsubscribeLead(email);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setIsUnsubscribeOpen(false);
        setStatusMessage(null);
        setEmail('');
      }, 2500);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsUnsubscribeOpen(false)}
      />

      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#FFC4DC] z-10 animate-in fade-in zoom-in-95 my-6">
        <button
          onClick={() => setIsUnsubscribeOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-[#563A45]/60 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="font-brand text-xl font-bold text-[#563A45]">
              Unsubscribe Preferences
            </h3>
            <p className="text-xs text-[#563A45]/75">
              We'll be sad to see you go! Enter your email below to opt out of Glossip launch drops.
            </p>
          </div>

          <form onSubmit={handleUnsubscribe} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#563A45]/50" />
              <input
                type="email"
                required
                placeholder="Enter your subscribed email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#F8DCE7] rounded-xl text-xs text-[#563A45] focus:outline-none focus:ring-1 focus:ring-[#F04F87]"
              />
            </div>

            {statusMessage && (
              <p className={`text-xs font-semibold ${statusMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                {statusMessage.text}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#563A45] hover:bg-[#3D2831] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Unsubscribe from All Marketing Emails
            </button>
          </form>

          <p className="text-[11px] text-center text-[#563A45]/60">
            Transactional receipts and order tracking SMS will remain unaffected.
          </p>
        </div>
      </div>
    </div>
  );
};
