import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';

type AwarenessBannerProps = {
  storageKey?: string;
  snoozeDays?: number;
  reviewUrl?: string;
  className?: string;
};

const DEFAULT_REVIEW_URL = 'https://www.trustpilot.com/evaluate/freeresumetools.io';
const daysToMs = (days: number) => days * 24 * 60 * 60 * 1000;

const AwarenessBanner: React.FC<AwarenessBannerProps> = ({
  storageKey = 'frt_awareness_banner_dismissed_until',
  snoozeDays = 7,
  reviewUrl = DEFAULT_REVIEW_URL,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissedUntil = localStorage.getItem(storageKey);
      if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;
      setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, [storageKey]);

  const dismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(storageKey, String(Date.now() + daysToMs(snoozeDays)));
    } catch {
      // ignore
    }
  };

  const handleReviewClick = () => {
    window.open(reviewUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="FreeResumeTools community support banner"
      className={`w-full bg-gray-100 border-b border-gray-200 ${className}`}
    >
      <div className="mx-auto max-w-5xl px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Mobile-first layout: stacked + centered */}
        <div className="text-center">
          <p className="text-[13px] sm:text-sm font-semibold text-[#3b3b3b] leading-snug">
            FreeResumeTools is free — thanks to community support
          </p>

          <p className="mt-1 text-[12px] sm:text-sm text-gray-600 leading-snug">
            We don’t run ads, sell data, or lock features. If you find value here, a quick review helps keep it free.
          </p>

          {/* Actions: full-width on mobile, inline on desktop */}
          <div className="mt-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleReviewClick}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2
                         px-3 py-2 sm:py-1.5 rounded-md text-sm font-medium
                         bg-white border border-gray-300 text-[#3b3b3b]
                         hover:bg-gray-200 transition-colors"
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              Leave a review
            </button>

            <button
              type="button"
              onClick={dismiss}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2
                         px-3 py-2 sm:px-2 sm:py-1.5 rounded-md text-sm
                         text-gray-600 hover:text-gray-800 hover:bg-gray-200/60 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwarenessBanner;
