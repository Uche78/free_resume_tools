import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';

type AwarenessBannerProps = {
  /** localStorage key to persist dismissal */
  storageKey?: string;

  /** Optional: only show again after N days (default: 7) */
  snoozeDays?: number;

  /** Trustpilot (or other) review URL */
  reviewUrl?: string;

  /** Optional: extra className for positioning/styling */
  className?: string;
};

const DEFAULT_REVIEW_URL = 'https://www.trustpilot.com/evaluate/freeresumetools.io';

function daysToMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

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
      if (dismissedUntil) {
        const until = Number(dismissedUntil);
        if (!Number.isNaN(until) && Date.now() < until) {
          setIsVisible(false);
          return;
        }
      }
      setIsVisible(true);
    } catch {
      // If localStorage is blocked, just show it (no persistence)
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
    // Open review in new tab without dismissing automatically.
    // Users can still click dismiss afterward (Wikipedia-style).
    window.open(reviewUrl, '_blank', 'noopener,noreferrer');

    // Optional: if you prefer to hide banner after they click review, uncomment:
    // setIsVisible(false);
    // try { localStorage.setItem(storageKey, String(Date.now() + daysToMs(3650))); } catch {}
  };

  if (!isVisible) return null;

  return (
    <div
      className={`w-full border-b border-gray-200 bg-gray-50/90 backdrop-blur supports-[backdrop-filter]:bg-gray-50/70 ${className}`}
      role="region"
      aria-label="FreeResumeTools community support banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#3b3b3b] leading-snug">
              FreeResumeTools is free — thanks to community support
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug">
              We don’t sell data or lock features. If you find value here, a quick review helps keep it free.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
            href="https://www.trustpilot.com/evaluate/freeresumetools.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Leave a quick review
          </a>
            
            <button
              type="button"
              onClick={handleReviewClick}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 text-[#3b3b3b] hover:bg-gray-100 transition-colors"
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              Leave a review
            </button>

            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:text-gray-700 hover:bg-white transition-colors"
              aria-label="Dismiss banner"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwarenessBanner;
