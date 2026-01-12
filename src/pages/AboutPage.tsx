import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AwarenessBanner from '../components/AwarenessBanner';
import { Helmet } from 'react-helmet-async';

const AboutPage: React.FC = () => {
  const currentUrl = "https://freeresumetools.io/about"; // Dynamically set the current URL if needed
  const siteUrl = "https://freeresumetools.io"; // Your website's base URL
  const logoUrl = "https://krzofnafayygoxoinkfv.supabase.co/storage/v1/object/public/public-landing-assets/hero/resumetoolfavicon.svg"; // Logo URL

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* Organization Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FreeResumeTools",
            "legalName": "e18Labs",
            "url": siteUrl,
            "logo": logoUrl,
            "description": "Empowering job seekers with free, powerful tools to land their dream jobs.",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "products@e18labs.com"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "637 Lake Shore Blvd. West",
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "postalCode": "M5V 3J6",
              "addressCountry": "CA"
            },
            "sameAs": [
              // Add your social media URLs here
              // "https://www.facebook.com/yourpage",
              // "https://twitter.com/yourhandle",
              // "https://www.linkedin.com/company/yourcompany"
            ]
          })}
        </script>

        {/* WebPage Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About FreeResumeTools",
            "description": "Learn more about FreeResumeTools, our history, mission, and the technology behind our free resume and job search tools.",
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
              "name": "About",
              "item": currentUrl
            }]
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
            <span className="text-gray-900">About</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Last Updated */}
            <div className="text-sm text-gray-500 mb-8">
              Last updated: May 2025
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About FreeResumeTools</h1>
            <p className="text-xl text-gray-600">
              Empowering job seekers with free, powerful tools to land their dream jobs
            </p>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our History</h2>
            <div className="space-y-6 text-gray-600">
              <p>
                Founded in 2025, FreeResumeTools emerged from a simple observation: job seekers were spending hundreds of dollars on resume tools that should be accessible to everyone.
              </p>
              <p>
                What started as a simple resume analyzer has grown into a comprehensive platform offering advanced resume tailoring, job matching, and interview prep tools - all completely free.
              </p>
              {/*<p>
                Our commitment to accessibility and user privacy has made us a trusted resource for job seekers worldwide, helping thousands land their dream jobs without the burden of expensive subscriptions.
              </p>*/}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="">
              <div className="flex items-start mb-6"><div>
                  <p className="text-gray-600">
                    Our mission is to provide free professional-grade tools to help job applicants secure their dream jobs.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We believe in:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Free access to job application tools</li>
                  <li>Privacy and security of user data</li>
                  <li>Continuous innovation in career technology</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">About Us</h2>
            <div className="grid gap-8">
              <div className="flex items-start">
                <div>
                  <p className="text-gray-600">
                    FreeResumeTools.io is owned and operated by e18Labs, a company that prides itself on building tools to empower people, optimize processes, and drive business success.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div>
                  <p className="text-gray-600">
                    For any support or admin inquiries, you can contact us at products@e18labs.com. Our physical address is 637 Lake Shore Blvd. West, Toronto, ON, Canada M5V 3J6.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Stack */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Technology Stack</h2>
            <div className="">
              <div className="flex items-start mb-6">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Frontend</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>React with TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>Vite</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Backend</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>Node.js</li>
                        <li>Supabase</li>
                        <li>PostgreSQL</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AI/ML</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>Natural Language Processing</li>
                        <li>Machine Learning Models</li>
                        <li>Custom Algorithms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">DevOps</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>CI/CD Pipeline</li>
                        <li>Cloud Infrastructure</li>
                        <li>Monitoring & Analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
