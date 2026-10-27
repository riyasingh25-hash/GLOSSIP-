import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address ♡');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-[#FFC4DC]/30 via-[#FFF9F4] to-[#E8DDF8]/40 border-b border-[#F8DCE7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F04F87]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Glossip Insider Club</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#563A45] tracking-tight">
            Psst… wanna hear the latest gloss?
          </h2>
          <p className="text-sm sm:text-base text-[#563A45]/85 max-w-lg mx-auto text-balance">
            Get first dibs on new drops, shade launches, secret flash sales, and all things Glossip.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md mx-auto border border-[#FFC4DC] shadow-md space-y-3 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-[#F8DCE7] text-[#F04F87] rounded-full mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-xl font-bold text-[#563A45]">You're officially on the list! ♡</h3>
            <p className="text-xs text-[#563A45]/80">
              Welcome to the girlhood! Use code <span className="font-bold text-[#F04F87] bg-[#FFF0B8] px-2 py-0.5 rounded">GLOSSIP10</span> for 10% off your first bag.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#563A45]/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#F8DCE7] rounded-full text-sm text-[#563A45] placeholder-[#563A45]/50 focus:outline-none focus:ring-2 focus:ring-[#F04F87]/50 shadow-sm"
                  aria-label="Email Address for newsletter"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                COUNT ME IN ♡
              </button>
            </div>

            {error && (
              <p className="text-xs font-semibold text-rose-600 text-left pl-3">{error}</p>
            )}

            <p className="text-[11px] text-[#563A45]/65 leading-tight">
              By subscribing, you agree to receive email marketing from Glossip. You can unsubscribe anytime. We strictly respect your privacy.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
