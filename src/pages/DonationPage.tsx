import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Coffee, ChevronRight, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { products } from '../stripe-config';

const DonationPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const currentUrl = "https://freeresumetools.io/donate"; // Dynamically set if needed
  const siteUrl = "https://freeresumetools.io"; // Your website's base URL
  const logoUrl = "https://krzofnafayygoxoinkfv.supabase.co/storage/v1/object/public/public-landing-assets/hero/resumetoolfavicon.svg"; // Replace with your actual logo URL

const handleDonation = async () => {
  setIsLoading(true);
  try {
    // Call Netlify functions
    const response = await fetch('/.netlify/functions/create-donation-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount: 5 // $5 for coffee - adjust as needed
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout');
    }

    // Redirect to Stripe Checkout
    window.location.href = data.url;
    
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Failed to start checkout process. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* DonateAction Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DonateAction",
            "name": "Support FreeResumeTools",
            "description": "Donate to help us keep our resume tools free for everyone.",
            "recipient": {
              "@type": "Organization",
              "name": "FreeResumeTools",
              "url": siteUrl,
              "logo": logoUrl
            },
            "instrument": {
              "@type": "PaymentMethod",
              "name": "Credit Card"
            }
          })}
        </script>

        {/* WebPage Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Donate to Support FreeResumeTools",
            "description": "Support our mission to provide free resume and career tools. Your donation helps us maintain and improve our services.",
            "url": currentUrl
          })}
        </script>

        {/* BreadcrumbList Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": siteUrl
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Donate",
              "item": currentUrl
            }]
          })}
        </script>
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">Donate</span>
          </div>
        </div>
      </nav>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Last Updated */}
            <div className="text-sm text-gray-500 mb-8">
              Last updated: May 2025
            </div>
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Support Our Mission</h1>
            <p className="text-xl text-gray-600 mb-8">
              Help us keep our tools free for everyone. Your support enables us to maintain and improve our services.
            </p>

            <div className="flex items-center justify-center space-x-2 mb-12">
              <Coffee className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Buy us a coffee and support free career tools</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="mb-4 text-center">
                <p className="text-lg font-semibold text-gray-900 mb-2">{products.coffee.name}</p>
                <p className="text-gray-600 mb-4">{products.coffee.description}</p>
                <p className="text-2xl font-bold text-[#3b3b3b]">{products.coffee.price}</p>
              </div>
              <button
                onClick={handleDonation}
                disabled={isLoading}
                className={`w-full py-3 px-6 bg-[#3b3b3b] text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Coffee className="w-5 h-5" />
                    Buy us a coffee
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonationPage;
