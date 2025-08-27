// LazyTrustpilot.tsx
import React from 'react';

function LazyTrustpilot() {
  return (
    <section className="py-20 bg-[#ffffff] text-[#3A3A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-yellow-400" fill="#FBBF24" />
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-4">
          Love Our Tools? Share Your Experience!
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Help others discover FreeResumeTools by leaving a review on Trustpilot
        </p>
        <div className="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="67e9a8ae9f2ae0fb246b2bbb" data-style-height="52px" data-style-width="100%">
          <a href="https://www.trustpilot.com/review/freeresumetools.io" target="_blank" rel="noopener">Leave a Review</a>
        </div>
      </div>
    </section>
  );
}

// Import the Lucide Star icon
import { Star } from 'lucide-react';

export default LazyTrustpilot;