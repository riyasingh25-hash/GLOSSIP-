import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const MESSAGES = [
  'Your new lip obsession has arrived ♡',
  'Little tubes. Major gloss energy.',
  'Add a little sparkle to your everyday.',
  'Free delivery in India on orders over ₹999 ♡'
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      role="region"
      aria-label="Announcements"
      className="bg-[#F8DCE7] text-[#563A45] text-xs font-medium py-2 px-4 border-b border-[#FFC4DC]/60 relative z-30 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex(prev => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
          className="text-[#563A45]/60 hover:text-[#563A45] p-0.5 rounded transition-colors hidden sm:inline-flex items-center"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center flex items-center justify-center gap-2 overflow-hidden px-2">
          <Sparkles className="w-3 h-3 text-[#F04F87] shrink-0 animate-pulse" />
          <span className="truncate tracking-wide font-medium">
            {MESSAGES[currentIndex]}
          </span>
          <Sparkles className="w-3 h-3 text-[#F04F87] shrink-0 animate-pulse" />
        </div>

        <button
          onClick={() => setCurrentIndex(prev => (prev + 1) % MESSAGES.length)}
          className="text-[#563A45]/60 hover:text-[#563A45] p-0.5 rounded transition-colors hidden sm:inline-flex items-center"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
