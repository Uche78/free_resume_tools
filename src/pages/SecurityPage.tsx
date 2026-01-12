import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AwarenessBanner from '../components/AwarenessBanner';
import { Helmet } from 'react-helmet-async';

const SecurityPage: React.FC = () => {
  const currentUrl = "https://freeresumetools.io/security"; // Dynamically set if needed
  const siteUrl = "https://freeresumetools.io"; // Your website's base URL
  const logoUrl = "https://krzofnafayygoxoinkfv.supabase.co/storage/v1/object/public/public-landing-assets/hero/resumetoolfavicon.svg"; // Replace with your actual logo URL

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* WebPage Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Security & Compliance - FreeResumeTools",
            "description": "Learn about the security measures and compliance standards at FreeResumeTools to protect your data.",
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
              "name": "Security",
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
            "logo": logoUrl // Replace with your actual logo URL
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
            <span className="text-gray-900">Security</span>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Security & Compliance</h1>
            <p className="text-xl text-gray-600 text-center">
              How we protect your data and maintain compliance
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

            {/*Top Intro*/}
            <div className="prose prose-lg text-gray-600">
              <p className="mb-12">
                At Free Resume Tools, we take security as seriously as a hiring manager skimming resumes at 2 AM. Here’s how we protect your data and comply with global standards—because “trust us, bro” isn’t a real policy.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">1. Data Protection</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>No Storage, No Risk:</strong> We don’t store your resume content, personal details, or that embarrassing internship description from 2012. Everything is processed in real-time and disappears like a bad interview answer when you close your browser.</li>
                  <li><strong>Encryption:</strong> All data transfers use HTTPS (the same security your bank uses).</li>
                  <li><strong>Third-Party Vendors:</strong> We only work with partners (e.g., Google Ads, Trustpilot) that meet strict compliance standards (GDPR, CCPA).</li>
                </ul>
              </div>
            </div>

            {/* Infrastructure Security */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">2. Compliance Commitments</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>GDPR/CCPA Ready:</strong> Even though we’re based in [Your Country], we respect your rights to access, delete, or tell us to stop using your data (though again—we don’t collect it).</li>
                  <li><strong>PIPEDA:</strong> Compliance for Canadian users</li>
                  <li><strong>Regular Audits:</strong> We review third-party tools annually.</li>
                </ul>
              </div>
            </div>

            {/* Access Control */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">3. Third-Party Security</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Google Ads:</strong> Uses anonymized cookies for ad targeting. No sensitive data is shared. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all duration-200">Learn more.</a></li>
                  <li><strong>Trustpilot:</strong> Reviews are encrypted and stored securely. <a href="https://legal.trustpilot.com/for-reviewers/end-user-privacy-terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all duration-200">See their compliance.</a></li>
                  <li><strong>Hosting Provider:</strong> Our servers are guarded like the One Ring (but with better firewalls).</li>
                </ul>
              </div>
            </div>

            {/* Compliance */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">4. Your Role in Security</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Avoid Oversharing:</strong> Don’t input sensitive info like Social Security numbers or your secret lasagna recipe.</li>
                  <li><strong>Updates:</strong> Use a modern browser (RIP, Internet Explorer) and antivirus software.</li>
                  <li><strong>Phishing Alerts:</strong> We’ll never email you asking for passwords—because we don’t have your email.</li>
                </ul>
              </div>
            </div>

            {/* Reporting Security Issues */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Report a Security Issue</h2>
              <p className="text-gray-600 mb-4">
                If you discover a security vulnerability, please report it to:
              </p>
              <a href="mailto:products@e18labs.com" className="text-blue-600 hover:text-blue-800">
                products@e18labs.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SecurityPage;
