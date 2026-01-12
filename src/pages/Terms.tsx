import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AwarenessBanner from '../components/AwarenessBanner';
import Terms from './pages/Terms';
import { Helmet } from 'react-helmet-async';


const TermsPage: React.FC = () => {
  const currentUrl = "https://freeresumetools.io/terms"; // Dynamically set if needed
  const siteUrl = "https://freeresumetools.io"; // Your website's base URL

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* WebPage Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service - FreeResumeTools",
            "description": "Read the terms and conditions for using FreeResumeTools and its services.",
            "url": currentUrl,
            "dateModified": "2025-05-02" // Use the actual last updated date in ISO 8601 format
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
              "name": "Terms of Service",
              "item": currentUrl
            }]
          })}
        </script>

        {/* Organization Schema Markup (Optional - if not already on other pages) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FreeResumeTools",
            "url": siteUrl,
            "logo": `${siteUrl}/images/logo.png` // Replace with your actual logo URL
            // Add other relevant Organization properties if needed
          })}
        </script>
      </Helmet>
      <Header />
      <AwarenessBanner />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">Terms</span>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Terms of Service</h1>
            <p className="text-xl text-gray-600 text-center">
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Last Updated */}
            <div className="text-sm text-gray-500 mb-8">
              Last updated: May 2025
            </div>

            {/* Agreement */}
            <div className="prose prose-lg text-gray-600 mb-12">
              <p>
                Welcome to Free Resume Tools! By using our free resume-building tools and services (the "Service"), you agree to these Terms of Service. If you're here to argue about Oxford commas, we regret to inform you that's not covered.
              </p>
            </div>

            {/* Acceptance to Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  By using our Service, you agree to these Terms. If you disagree, please close this tab and return to your "I ❤️ Spreadsheets" resume.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. What We Offer</h2>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Free Tools:</strong> Resume Tailoring, Job Match Assessment, and Interview Prep.</li>
                  <li><strong>No Sign-Up Required:</strong> Use our tools anonymously. No account? No problem.</li>
                  <li><strong>Third-Party Ads:</strong> We use Google Ads to keep the lights on. We don't control their content (but we'll judge them silently).</li>
                </ul>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Your Responsibilities</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Accuracy:</strong> You're responsible for the content you input. If you lie about being a "Java Wizard" and get caught, that's on you.</li>
                  <li><strong>No Shenanigans:</strong> Don't hack, spam, or upload a resume titled "HireMeOrElseVirus.exe."</li>
                  <li><strong>Respect Others:</strong> If you leave a review via Trustpilot, keep it civil. No roasting our developers' haircuts.</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Intellectual Property</h2>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Our Stuff:</strong> The Service and its original content are the sole property of e18Labs. Our trademarks and trade dress may not be used without written permission.</li>
                  <li><strong>Your Stuff:</strong> You retain all rights to your resume content. We don't claim ownership, sell them, or use them for trivia night.</li>
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Disclaimer</h2>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Service "As Is":</strong> We do not guarantee employment or interview success. While we try to make our tools ATS-friendly, we can't promise your dream job.</li>
                  <li><strong>No Liability:</strong> We're not responsible for job offers, rejections, or existential crises caused by the job market.</li>
                </ul>
              </div>
            </div>

            {/* Third Party */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Disclaimer</h2>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Google Ads/Trustpilot:</strong> Their terms and privacy policies apply. We're not liable for their shenanigans.</li>
                  <li><strong>Links to Other Sites:</strong> We link to helpful resources, but click at your own risk.</li>
                </ul>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Termination</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  We reserve the right to ban users who misuse the Service (e.g., using it to write alien conspiracy manifestos).
                </p>
              </div>
            </div>

            {/* Donations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. "Buy Us a Coffee" Donations
</h2>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Voluntary:</strong> Donations are appreciated but not required. No refunds (we've already spent it on coffee).</li>
                  <li><strong>No Perks:</strong> Donating doesn't grant VIP access, but we'll mentally high-five you.</li>
                </ul>
              </div>
            </div>

            {/* Laws */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Changes to Terms</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  These Terms are governed by the laws of the state, city, and country of the website owner unless otherwise specified here unless you're reading this in space, in which case Martian law applies.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Changes to Terms</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  We may update these Terms and will notify users of any changes by updating the "Last updated" date of these Terms. Continued use = acceptance.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About Terms?</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us at:
                <br />
                <a href="mailto:products@e18labs.com" className="text-blue-600 hover:text-blue-800">
                  products@e18labs.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
