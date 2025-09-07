import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { FileText, Upload, Download, ChevronRight, CheckCircle, Star, Clock, Users, AlertCircle, TrendingUp, Award, Target } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import Modal from '../components/Modal';

// Initialize Supabase client
const supabaseUrl = 'https://krzofnafayygoxoinkfv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyem9mbmFmYXl5Z294b2lua2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2Mjk3NTYsImV4cCI6MjA1MjIwNTc1Nn0.7gnVJJrcrfMzWOYAdzUTJhqscx1bbd7odOmFxzxz404';
const supabase = createClient(supabaseUrl, supabaseKey);

const FixResume: React.FC = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const currentUrl = "https://freeresumetools.io/fix-my-resume"; 
  const siteUrl = "https://freeresumetools.io";
  const serviceName = "Free AI Resume Analyzer & Fixer Tool";
  const serviceDescription = "Get professional AI-powered feedback and actionable suggestions to improve your resume. Free resume analysis that identifies formatting issues, content gaps, and ATS compatibility problems with specific recommendations for improvement.";
  const category = "Career Services";
  const providerName = "FreeResumeTools";

  const handleFixResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setDownloadUrl(null);

    const formData = new FormData(e.currentTarget);
    const resume = formData.get('resume') as File;

    const processingId = `fix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      const timestamp = new Date().getTime();
      const filePath = `fixes/${timestamp}_${resume.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('freeonlinetools')
        .upload(filePath, resume, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`File upload failed: ${uploadError.message}`);
      }

      const { data: urlData } = supabase.storage
        .from('freeonlinetools')
        .getPublicUrl(filePath);

      const fileUrl = urlData.publicUrl;

      const payload = {
        processingId,
        resumeName: resume.name,
        resumeUrl: fileUrl,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('https://hook.us2.make.com/8goh4e39nv8voei1jz9x5qref88m7a1k', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      try {
        const data = JSON.parse(responseText);
        console.log('Parsed data:', data);
        
        if (data && data.fixDownloadUrl) {
          console.log('Setting fixDownloadUrl:', data.fixDownloadUrl);
          setDownloadUrl(data.fixDownloadUrl);
          setModalMessage('Enjoyed using this tool?\nLeave a quick review to help us keep it free!');
          setShowSuccessModal(true);
        } else {
          setModalMessage('Resume analysis request accepted! Your report is being processed.');
          setShowSuccessModal(true);
        }
      } catch (e) {
        console.error('Failed to parse response:', e);
        setModalMessage('Resume analysis request accepted! Your report is being processed.');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setDownloadUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>Free AI Resume Fixer & Analyzer Tool - Get Professional Feedback | FreeResumeTools</title>
        <meta name="description" content="Free AI-powered resume analyzer that identifies formatting issues, content gaps, and ATS compatibility problems. Get professional feedback with actionable suggestions to improve your resume instantly." />
        <meta name="keywords" content="resume analyzer, resume fixer, free resume review, ATS checker, resume feedback, professional resume analysis, resume improvement tool, CV analyzer" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Free AI Resume Analyzer & Fixer Tool - Get Professional Feedback" />
        <meta property="og:description" content="Free AI-powered resume analyzer that identifies issues and provides actionable suggestions for improvement. Fix formatting, content, and ATS compatibility problems instantly." />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/images/fix-resume-og.jpg`} />
        <meta property="og:image:alt" content="AI resume analyzer tool interface showing feedback and suggestions" />
        <meta property="og:site_name" content="FreeResumeTools" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free AI Resume Analyzer & Fixer Tool - Get Professional Feedback" />
        <meta name="twitter:description" content="Free AI-powered resume analyzer with professional feedback and actionable improvement suggestions." />
        <meta name="twitter:image" content={`${siteUrl}/images/fix-resume-twitter.jpg`} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="FreeResumeTools" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={currentUrl} />
        <meta name="theme-color" content="#3b3b3b" />

        {/* Enhanced Service Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": serviceName,
            "description": serviceDescription,
            "category": category,
            "serviceType": "Resume Analysis Service",
            "provider": {
              "@type": "Organization",
              "name": providerName,
              "url": siteUrl,
              "logo": `${siteUrl}/images/logo.png`,
              "sameAs": [
                `${siteUrl}`,
                "https://twitter.com/freeresumetools",
                "https://linkedin.com/company/freeresumetools"
              ]
            },
            "url": currentUrl,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2025-01-01"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "4150",
              "bestRating": "5",
              "worstRating": "1"
            },
            "potentialAction": {
              "@type": "UseAction",
              "target": currentUrl,
              "name": "Analyze Resume"
            }
          })}
        </script>

        {/* Enhanced WebPage Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": serviceName + " - FreeResumeTools",
            "description": serviceDescription,
            "url": currentUrl,
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "name": "FreeResumeTools",
              "url": siteUrl
            },
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "AI Resume Analyzer Tool",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "AI-powered resume analysis",
                "Formatting issue detection",
                "Content gap identification",
                "ATS compatibility checker",
                "Actionable improvement suggestions"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "Fix My Resume",
                "item": currentUrl
              }]
            }
          })}
        </script>

        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "What issues does the resume analyzer identify?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our AI analyzer identifies formatting issues, content gaps, ATS compatibility problems, keyword optimization opportunities, grammar errors, inconsistent formatting, missing sections, and provides specific recommendations for improvement."
              }
            }, {
              "@type": "Question",
              "name": "How detailed is the feedback report?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The feedback report includes specific, actionable suggestions categorized by priority. You'll get recommendations for content improvements, formatting fixes, ATS optimization, and professional presentation enhancements."
              }
            }, {
              "@type": "Question",
              "name": "Is the resume analyzer really free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our AI-powered resume analyzer is completely free to use. Upload your resume and get professional-quality feedback and improvement suggestions without any cost or registration required."
              }
            }, {
              "@type": "Question",
              "name": "What file formats are supported?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support PDF, DOC, and DOCX file formats for resume uploads, with a maximum file size of 10MB. PDF format is recommended for the most accurate analysis."
              }
            }]
          })}
        </script>

        {/* HowTo Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Analyze and Fix Your Resume with AI",
            "description": "Step-by-step guide to get professional feedback and fix issues in your resume using our free AI tool.",
            "image": `${siteUrl}/images/fix-resume-howto.jpg`,
            "totalTime": "PT2M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "step": [{
              "@type": "HowToStep",
              "name": "Upload Your Resume",
              "text": "Upload your current resume in PDF, DOC, or DOCX format to our secure AI analysis platform.",
              "image": `${siteUrl}/images/upload-resume-step.jpg`
            }, {
              "@type": "HowToStep",
              "name": "AI Analysis Process",
              "text": "Our AI analyzes your resume for formatting issues, content gaps, ATS compatibility, and improvement opportunities.",
              "image": `${siteUrl}/images/ai-analysis-step.jpg`
            }, {
              "@type": "HowToStep",
              "name": "Get Feedback Report",
              "text": "Download your detailed feedback report with specific, actionable suggestions for resume improvement.",
              "image": `${siteUrl}/images/feedback-report-step.jpg`
            }]
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": providerName,
            "url": siteUrl,
            "logo": `${siteUrl}/images/logo.png`,
            "description": "Free AI-powered career tools to help job seekers optimize their resumes and increase interview success rates.",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "availableLanguage": "English"
            }
          })}
        </script>
      </Helmet>
      
      <Header />
      
      {/* Enhanced Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-900 font-medium" itemProp="name">Fix My Resume</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section - Enhanced for SEO and Mobile */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#3b3b3b] mb-4 sm:mb-6 leading-tight">
                Free AI Resume Fixer Tool
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                Get professional AI-powered feedback and actionable suggestions to improve your resume. 
                Identify formatting issues, content gaps, and ATS compatibility problems with specific recommendations for enhancement.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-6 sm:mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>2,000+ Fixed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-purple-600" aria-hidden="true" />
                  <span>1-2 Min Analysis</span>
                </div>
              </div>

              {/* Last Updated
              <div className="text-sm text-gray-500 mb-6">
                Last updated: August 2025
              </div> */}
            </div>
          </div>
        </section>


            {/* Main Tool Section - Enhanced Mobile Experience */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-[#3b3b3b] shadow-sm">
                <div className="relative">
                  <form ref={formRef} onSubmit={handleFixResume} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#3b3b3b]" htmlFor="resume-upload">
                        Upload Your Resume for Analysis
                      </label>
                      <input
                        id="resume-upload"
                        type="file"
                        name="resume"
                        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b3b3b] focus:border-transparent transition-colors text-sm sm:text-base"
                        accept=".pdf,.doc,.docx"
                        required
                        aria-describedby="file-help"
                      />
                      <p id="file-help" className="text-xs text-gray-500 mt-1">
                        Supported formats: PDF, DOC, DOCX (Max 10MB) • PDF recommended for best analysis
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 py-3 px-6 bg-[#3b3b3b] text-white rounded-lg font-medium transition-all duration-200 ${
                          isLoading 
                            ? 'opacity-70 cursor-not-allowed' 
                            : 'hover:bg-opacity-90 hover:shadow-md active:transform active:scale-95'
                        }`}
                        aria-describedby="submit-help"
                      >
                        {isLoading ? 'Analyzing Resume...' : 'Analyze My Resume'}
                      </button>
                      <button
                        type="button"
                        onClick={handleClearForm}
                        className="px-6 py-3 bg-gray-200 text-[#3b3b3b] rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        aria-label="Clear form"
                      >
                        Clear Form
                      </button>
                    </div>
                    <p id="submit-help" className="text-xs text-gray-500 text-center">
                      Analysis completes in under 60 seconds
                    </p>
                    
                    {/* Results Section - Enhanced Mobile Layout */}
                    {downloadUrl && (
                      <div className="mt-6 p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-green-800">Your Resume Analysis is Ready!</h3>
                        </div>
                        <a
                          href={downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
                          aria-label="View your resume analysis report"
                        >
                          <FileText className="w-5 h-5 flex-shrink-0" />
                          <span>View Analysis Report</span>
                        </a>
                        <p className="text-xs text-green-700 mt-2 text-center">
                          Your detailed feedback report includes specific suggestions for improvement
                        </p>
                      </div>
                    )}
                  </form>

                  {/* Loading Overlay - Enhanced Mobile Experience */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-sm mx-4 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3b3b3b] border-t-transparent mx-auto mb-4"></div>
                        <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Analyzing Your Resume</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Our AI is examining your resume for formatting, content, and ATS compatibility issues. Creating your personalized feedback report now.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* How It Works Section - Mobile Optimized */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-[#3b3b3b] mb-6 sm:mb-8">How Resume Analysis Works</h2>
              
              {/* Mobile: Horizontal scrollable steps */}
              <div className="block sm:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  <div className="flex flex-col items-center text-center min-w-[260px] snap-center px-2">
                    <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                      <Upload className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">1. Upload Resume</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Upload your resume in PDF, DOC, or DOCX format. Our AI will scan every detail.</p>
                  </div>
                  <div className="flex flex-col items-center text-center min-w-[260px] snap-center px-2">
                    <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">2. AI Analysis</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">AI analyzes formatting, content, ATS compatibility, and identifies improvement areas.</p>
                  </div>
                  <div className="flex flex-col items-center text-center min-w-[260px] snap-center px-2">
                    <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                      <Download className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">3. Get Feedback Report</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Download detailed report with specific, actionable improvement suggestions.</p>
                  </div>
                </div>
                
                {/* Mobile scroll indicator dots */}
                <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Step indicators">
                  <div className="w-2 h-2 bg-[#3b3b3b] rounded-full" role="tab" aria-label="Step 1"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full" role="tab" aria-label="Step 2"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full" role="tab" aria-label="Step 3"></div>
                </div>
              </div>
              
              {/* Desktop/Tablet: Grid layout */}
              <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <Upload className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#3b3b3b]">1. Upload Your Resume</h3>
                  <p className="text-gray-600 leading-relaxed">Upload your resume in PDF, DOC, or DOCX format. Our AI will scan every detail for potential improvements.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <FileText className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#3b3b3b]">2. AI Analysis</h3>
                  <p className="text-gray-600 leading-relaxed">Our AI analyzes formatting, content quality, ATS compatibility, and identifies specific areas for improvement.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <Download className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#3b3b3b]">3. Get Feedback Report</h3>
                  <p className="text-gray-600 leading-relaxed">Download a detailed report with specific, actionable suggestions to improve your resume's effectiveness.</p>
                </div>
              </div>
            </div>
          </div>
        </section> 

            {/* What You Get Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-12 lg:mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3b3b3b] mb-8">
                What's Included in Your Analysis Report
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Issue Detection</h3>
                  <p className="text-[#3b3b3b] text-sm leading-relaxed">
                    Identifies formatting problems, content gaps, and areas that need immediate attention.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">ATS Compatibility</h3>
                  <p className="text-[#3b3b3b] text-sm leading-relaxed">
                    Ensures your resume passes Applicant Tracking Systems with proper formatting and structure.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Improvement Tips</h3>
                  <p className="text-[#3b3b3b]text-sm leading-relaxed">
                    Specific, actionable recommendations to enhance content quality and professional presentation.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Professional Standards</h3>
                  <p className="text-[#3b3b3b] text-sm leading-relaxed">
                    Analysis based on current industry standards and hiring manager expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

            {/* FAQ Section - Enhanced for SEO */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-12 lg:mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3b3b3b] mb-8">
                Frequently Asked Questions About Resume Analysis
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    What issues does the resume analyzer identify?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Our AI analyzer identifies formatting issues, content gaps, ATS compatibility problems, keyword optimization 
                    opportunities, grammar errors, inconsistent formatting, missing sections, and provides specific recommendations 
                    for improvement. It also checks for proper contact information, professional summary effectiveness, and skill 
                    presentation.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    How detailed is the feedback report?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    The feedback report includes specific, actionable suggestions categorized by priority. You'll get recommendations 
                    for content improvements, formatting fixes, ATS optimization, keyword enhancement, and professional presentation 
                    tips. Each suggestion explains why it's important and how to implement it.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    Is the resume analyzer really free?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Yes, our AI-powered resume analyzer is completely free to use. Upload your resume and get professional-quality 
                    feedback and improvement suggestions without any cost, registration, or hidden fees. We believe everyone deserves 
                    access to professional resume analysis tools.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    What file formats are supported?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    We support PDF, DOC, and DOCX file formats for resume uploads, with a maximum file size of 10MB. PDF format 
                    is recommended for the most accurate analysis as it preserves formatting and ensures consistent parsing by 
                    our AI system.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    How should I use the feedback to improve my resume?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Start with high-priority issues like formatting and ATS compatibility, then work on content improvements. 
                    Implement suggestions one at a time and re-analyze your resume to track improvements. Focus on the most 
                    impactful changes first, such as adding missing keywords or fixing structural problems.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    Can I analyze my resume multiple times?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Absolutely! We encourage you to re-analyze your resume after making improvements to track your progress 
                    and ensure you've addressed all issues. Each analysis is free, so you can use the tool as many times as 
                    needed to perfect your resume.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

            {/* Additional Tools CTA Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-12 lg:mt-16 bg-gray-50 p-6 sm:p-8 lg:p-12 rounded-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#3b3b3b] mb-4">
                  Perfect Your Resume with Our Complete Toolkit
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Now that you've identified areas for improvement, take your resume to the next level with our other professional tools.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                {/* Resume Tailoring Tool */}
                <div className="p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow transition-shadow duration-200">
                  <div className="flex text-center gap-4">

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">AI Resume Tailoring</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        After fixing your resume, optimize it for specific job descriptions. AI-powered tailoring that matches your skills to job requirements perfectly.
                      </p>
                      
                      <Link 
                        to="/tailoring" 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3b3b] text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                      >
                        Tailor My Resume
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Job Match Tool */}
                <div className="p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow transition-shadow duration-200">
                  <div className="flex text-center gap-4">

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Job Match Analyzer</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        Test your improved resume against specific job postings. Get compatibility scores and see exactly how well you match job requirements.
                      </p>
                      
                      <Link 
                        to="/match" 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3b3b] text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                      >
                        Check Job Match
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Workflow */}
              <div className="mt-8 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-[#3b3b3b] mb-2 text-center">Recommended Workflow for Best Results</h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Fix My Resume</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 rotate-90 sm:rotate-0" />
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Resume Tailoring</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 rotate-90 sm:rotate-0" />
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Job Match Check</span>
                  </div>
                </div>
              </div>

              {/* Bottom Text */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  All tools are 100% free • No registration required • Professional results in minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Your Resume Analysis is Ready!"
        message={modalMessage}
        type="success"
      />
      
      <Footer />
    </div>
  );
};

export default FixResume;
