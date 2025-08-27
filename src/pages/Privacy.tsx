import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const PrivacyPage: React.FC = () => {
  const currentUrl = "https://freeresumetools.io/privacy"; // Dynamically set if needed
  const siteUrl = "https://freeresumetools.io"; // Your website's base URL
  const logoUrl = `${siteUrl}/images/logo.png`; // Replace with your actual logo URL
  const lastUpdatedDate = "2025-05-02"; // Use the actual last updated date in ISO 8601 format

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* WebPage Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy - FreeResumeTools",
            "description": "Read the Privacy Policy for FreeResumeTools to understand how we handle your information.",
            "url": currentUrl,
            "dateModified": lastUpdatedDate
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
              "name": "Privacy",
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
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">Privacy</span>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h1>
            <p className="text-xl text-gray-600 text-center">
              TL;DR: We don't require sign-ups, store your resume data, or sell your information. Third-party ads and reviews are handled by Google and Trustpilot.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* Last Updated */}
            <div className="text-sm text-gray-500 mb-4">
              Last updated: May 2025
            </div>
            
            {/*Top Intro*/}
            <div className="prose prose-lg text-gray-600">
              <p className="mb-12">
At Free Resume Tools, we are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our free resume and career tools, even though no sign-up or personal data is required to access our services. By using our website, you agree to the practices described here.
              </p>
            </div>
            {/* Data Collection */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">1. Data We Collect</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  We are committed to minimizing data collection. Our service operates without requiring user accounts or personal information. Here's what we collect:
                </p>

                <h3 className="mb-4">
                  a. Information You Provide Voluntarily
                </h3>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    <strong>Resume Content:</strong> Temporarily stored for analysis and deleted 7 days after processing
                  </li>
                  <li>
                    <strong>Job Descriptions:</strong> Temporarily stored for analysis and deleted 7 days after processing
                  </li>
                   <li>
                    <strong>Reviews:</strong> If you submit a review via Trustpilot, your feedback and any personal details (e.g., name) are managed by Trustpilot, not us.
                  </li>
                </ul>

                <h3 className="mb-4">
                  b. Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    <strong>Usage Analytics:</strong> We collect non-personal information like your IP address, browser type, and pages visited using cookies to improve our service.
                  </li>
                  <li>
                    <strong>Device Information:</strong> We may collect device type (mobile/desktop) and operating system to improve user experience.
                  </li>
                </ul>
                
                <h3 className="mb-4">
                  c. We Do Not
                </h3>
                <ul className="list-disc pl-6 mb-6">
                  <li>Create user profiles or accounts</li>
                  <li>Store personal information</li>
                  <li>Track users across websites</li>
                  <li>Sell or share data with third parties</li>
                </ul>
              </div>
            </div>

            {/*How we use your info */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
              <ul className="list-disc pl-6 mb-6">
                  <li>To Provide Services: Generate resumes/cover letters and improve tool functionality.</li>
                  <li>Analytics: Analyze traffic patterns to enhance our website (e.g., fixing bugs, optimizing templates).</li>
                  <li>Advertising: Display relevant Google Ads based on cookie data (e.g., resume templates viewed).</li>
              </ul>
            </div>
            </div>
            

            {/* Third-Party Tools */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                
                <h2 className="text-2xl font-bold text-gray-900">3. Third-Party Tools</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  We partner with trusted third parties to operate our website:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    <strong>Google Analytics:</strong> Anonymous usage statistics
                    <ul className="list-circle pl-6 mt-2">
                      <li>Tracks page views and basic usage patterns</li>
                      <li>IP addresses are anonymized</li>
                      <li>No personal information is collected</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Google Ads:</strong> Anonymous usage statistics
                    <ul className="list-circle pl-6 mt-2">
                      <li>Uses cookies to serve ads based on your browsing history</li>
                      <li>You can opt out of personalized ads via Google's Ad Settings</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Trustpilot:</strong> Review collection and display
                    <ul className="list-circle pl-6 mt-2">
                      <li>Only loads when users interact with review widgets</li>
                      <li>No personal data is shared without explicit consent</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/*Cookies*/}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">4. Cookies</h2>
                </div>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">We use cookies to:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Enable tool functionality (e.g., saving draft resumes temporarily).</li>
                  <li>Personalize ads via Google Ads.</li>
                  <li>Analyze site performance with Google Analytics.
                  You can disable cookies in your browser settings, but some features may not work.</li>
                </ul>
              </div>
            </div>


            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                
                <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  We implement several security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Encryption:</strong> All data is encrypted in transit using TLS</li>
                  <li><strong>Limited Storage:</strong> Resume and job description data is deleted 7 days after processing</li>
                  <li><strong>No Personal Details:</strong> No personal information is stored on our servers</li>
                  <li><strong>Third-Party Safeguards:</strong> Partners like Google and Trustpilot use industry-standard security measures.</li>
                </ul>
              </div>
            </div>

            {/*Your Rights*/}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                
                <h2 className="text-2xl font-bold text-gray-900">6. Your Rights</h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Access/Delete Data:</strong> While we don't store personal data, you can request deletion of cookies via your browser.</li>
                  <li><strong>Opt Out of Ads:</strong> Use Google's Opt-Out Tool or adjust browser settings.</li>
                </ul>
              </div>
            </div>


            
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
              <p className="text-gray-600">
                If you have any questions about our privacy practices, please contact us at:
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

export default PrivacyPage;