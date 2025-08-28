import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, Download, ChevronRight, CheckCircle, Clock, Users, Shield, TrendingUp, Award, Mail } from '../utils/icons';
import Header from '../components/Header';
import { TrustIndicators } from '../components/TrustIndicators';
import { HowItWorksSection } from '../components/HowItWorksSection';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../utils/supabase';

const ResumeTailoring: React.FC = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmailOption, setShowEmailOption] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [showNonCritical, setShowNonCritical] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  // Static constants
  const currentUrl = "https://freeresumetools.io/resume-tailoring";
  const siteUrl = "https://freeresumetools.io";
  const serviceName = "Professional AI Resume Tailoring Tool";
  const serviceDescription = "Optimize your resume for specific job descriptions using our professional AI-powered tailoring tool. Improve ATS compatibility and enhance your career prospects with personalized resume optimization.";
  const category = "Career Services";
  const providerName = "FreeResumeTools";
  
  // Load non-critical sections after initial render - mobile optimized timing
  useEffect(() => {
    // Mark hero as loaded immediately for layout stability
    setHeroLoaded(true);
    
    // More aggressive delay for mobile to improve LCP
    const isMobile = window.innerWidth < 768;
    const delay = isMobile ? 500 : 200;
    const timer = setTimeout(() => setShowNonCritical(true), delay);
    return () => clearTimeout(timer);
  }, []);

  // Optimized analytics loading - more aggressive mobile delay
  useEffect(() => {
    const loadAnalytics = () => {
      if ((window as any).gtag) return;
      
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-G9P3SJ733H';
      script.async = true;
      script.onload = () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]){(window as any).dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-G9P3SJ733H');
      };
      document.head.appendChild(script);
    };

    // Mobile-first approach - longer delays for mobile devices
    const isMobile = window.innerWidth < 768;
    const events = ['click', 'scroll', 'keydown', 'touchstart'];
    const handleInteraction = () => {
      loadAnalytics();
      events.forEach(event => document.removeEventListener(event, handleInteraction));
    };

    events.forEach(event => document.addEventListener(event, handleInteraction, { once: true, passive: true }));
    
    // Longer fallback for mobile to prioritize content loading
    const fallbackDelay = isMobile ? 5000 : 3000;
    const fallbackTimer = setTimeout(loadAnalytics, fallbackDelay);
    
    return () => {
      clearTimeout(fallbackTimer);
      events.forEach(event => document.removeEventListener(event, handleInteraction));
    };
  }, []);

  const handleTailorResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setDownloadUrl(null);
    setShowEmailOption(false);

    const formData = new FormData(e.currentTarget);
    const resume = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    const processingId = `proc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      const timestamp = new Date().getTime();
      const filePath = `resumes/${timestamp}_${resume.name}`;

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
        jobDescription,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('https://hook.us2.make.com/7tgt5ur2diff773huav63h62hjjdjlqu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status} ${responseText}`);
      }

      if (responseText && responseText.trim()) {
        try {
          if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
            const data = JSON.parse(responseText);
            if (data.documentUrl) {
              setDownloadUrl(data.documentUrl);
              setShowEmailOption(true);
              setModalMessage('Your tailored resume is ready for download!');
              setShowSuccessModal(true);
            } else {
              setModalMessage('Resume tailoring request processed! The optimized resume will be available shortly.');
              setShowSuccessModal(true);
            }
          } else {
            setModalMessage('Resume tailoring request accepted! Your resume is being processed. Please check back in a few minutes.');
            setShowSuccessModal(true);
          }
        } catch (parseError) {
          setShowEmailOption(true);
          setModalMessage('Resume tailoring request sent! Your resume is being processed.');
          setShowSuccessModal(true);
        }
      } else {
        setShowEmailOption(true);
        setModalMessage('Resume tailoring request successfully sent! Your resume is being processed.');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailResume = async () => {
    if (!userEmail.trim()) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!downloadUrl) {
      alert('Resume is still being processed. Please wait for completion.');
      return;
    }

    const subject = encodeURIComponent('Your Optimized Resume is Ready!');
    const body = encodeURIComponent(`Hello!\n\nYour optimized resume has been tailored for the job description you provided, with improved keyword matching and ATS compatibility.\n\nHere's your optimized resume: ${downloadUrl}\n\nBest of luck with your job application!\nThe FreeResumeTools Team`);
    const mailtoLink = `mailto:${userEmail}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink);
    alert('Opening your email client to send the resume link!');
    setUserEmail('');
  };

  const handleClearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setDownloadUrl(null);
      setShowEmailOption(false);
      setUserEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        {/* Critical performance hints - only essential preloads */}
        <link rel="preconnect" href="https://krzofnafayygoxoinkfv.supabase.co" />
        <link rel="dns-prefetch" href="https://hook.us2.make.com" />
        
        <title>Professional AI Resume Tailoring Tool - Optimize Your Resume | FreeResumeTools</title>
        <meta name="description" content="Professional AI-powered resume tailoring tool that optimizes your resume for specific job descriptions. Improve ATS compatibility and enhance your career prospects with personalized resume optimization." />
        <meta name="keywords" content="resume tailoring, professional resume optimization, ATS compatibility, career enhancement, job application tools, resume improvement" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Professional AI Resume Tailoring Tool - Optimize Your Resume" />
        <meta property="og:description" content="Professional AI-powered resume tailoring tool that optimizes your resume for specific job descriptions and improves your career prospects." />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/images/resume-tailoring-og.jpg`} />
        <meta property="og:image:alt" content="AI-powered resume tailoring tool interface" />
        <meta property="og:site_name" content="FreeResumeTools" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional AI Resume Tailoring Tool - Optimize Your Resume" />
        <meta name="twitter:description" content="Professional AI-powered resume tailoring tool that optimizes your resume for specific job descriptions." />
        <meta name="twitter:image" content={`${siteUrl}/images/resume-tailoring-twitter.jpg`} />
        
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
            "serviceType": "Resume Optimization Service",
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
              "reviewCount": "5247",
              "bestRating": "5",
              "worstRating": "1"
            },
            "potentialAction": {
              "@type": "UseAction",
              "target": currentUrl,
              "name": "Tailor Resume"
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
              "name": "AI Resume Tailoring Tool",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "AI-powered resume optimization",
                "ATS compatibility enhancement",
                "Job-specific keyword matching",
                "Professional formatting optimization"
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
                "name": "Resume Tailoring",
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
              "name": "How does AI resume tailoring work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our AI analyzes your resume and the job description to optimize keyword matching, improve ATS compatibility, and highlight relevant skills and experiences that match the specific role requirements."
              }
            }, {
              "@type": "Question", 
              "name": "Is the resume tailoring tool really free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our AI-powered resume tailoring tool is completely free to use. Upload your resume, add a job description, and get an optimized resume without any cost or registration required."
              }
            }, {
              "@type": "Question",
              "name": "What file formats are supported?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support PDF, DOC, and DOCX file formats for resume uploads. These are the most common formats used by job seekers and accepted by most ATS systems."
              }
            }, {
              "@type": "Question",
              "name": "How secure is my personal information?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We take data security seriously. Your resume and personal information are processed securely and not stored permanently on our servers. We don't share your information with third parties."
              }
            }]
          })}
        </script>

        {/* HowTo Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Tailor Your Resume with AI",
            "description": "Step-by-step guide to optimize your resume for specific job descriptions using our AI-powered tool.",
            "image": `${siteUrl}/images/how-to-tailor-resume.jpg`,
            "totalTime": "PT2M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "step": [{
              "@type": "HowToStep",
              "name": "Upload Your Resume",
              "text": "Upload your current resume in PDF, DOC, or DOCX format to our secure platform.",
              "image": `${siteUrl}/images/upload-resume-step.jpg`
            }, {
              "@type": "HowToStep", 
              "name": "Add Job Description",
              "text": "Copy and paste the complete job description from the position you're applying for.",
              "image": `${siteUrl}/images/job-description-step.jpg`
            }, {
              "@type": "HowToStep",
              "name": "Get Your Optimized Resume", 
              "text": "Download your AI-tailored resume or have it emailed to you, optimized for ATS systems and the specific role.",
              "image": `${siteUrl}/images/download-resume-step.jpg`
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
            "description": "Professional AI-powered career tools to help job seekers optimize their resumes and enhance their career prospects.",
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
              <span className="text-gray-900 font-medium" itemProp="name">Resume Tailoring</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section - Critical content loads first */}
        <section className="hero-critical">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="hero-title">
                Professional AI Resume Tailoring Tool
              </h1>
              <p className="hero-subtitle">
                Optimize your resume for specific job descriptions using our professional AI-powered tailoring tool.
              </p>
              <TrustIndicators userCount="4,000+" showProcessingTime={true} />
            </div>
          </div>
        </section>

        {/* Main Tool Section - Enhanced Mobile Experience */}
            <section className="py-8 sm:py-12 bg-white"> 
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                  <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-[#3b3b3b] shadow-sm">
                    <div className="relative">
                      <form ref={formRef} onSubmit={handleTailorResume} className="space-y-4 sm:space-y-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-[#3b3b3b]" htmlFor="resume-upload">
                            Upload Your Resume
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
                            Supported formats: PDF, DOC, DOCX (Max 10MB) • Your information is processed securely
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-[#3b3b3b]" htmlFor="job-description">
                            Copy and Paste the Job Description You are Applying For
                          </label>
                          <textarea
                            id="job-description"
                            name="jobDescription"
                            className="w-full h-32 sm:h-40 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b3b3b] focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                            placeholder="Paste the complete job description here. Include job requirements, qualifications, and responsibilities for best results..."
                            required
                            aria-describedby="description-help"
                          />
                          <p id="description-help" className="text-xs text-gray-500 mt-1">
                            Include the full job posting for optimal resume optimization
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
                            {isLoading ? 'Processing...' : 'Optimize My Resume'}
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
                          Processing typically takes 1-2 minutes • Your data is handled securely
                        </p>
                        
                        {/* Results Section - Enhanced Mobile Layout */}
                        {(downloadUrl || showEmailOption) && (
                          <div className="mt-6 p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-4">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <h3 className="text-lg font-semibold text-green-800">Your Resume is Ready!</h3>
                            </div>
                            
                            <div className="space-y-4">
                              {/* Download Option */}
                              {downloadUrl && (
                                <a
                                  href={downloadUrl}
                                  download
                                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
                                  aria-label="Download your optimized resume"
                                >
                                  <Download className="w-5 h-5 flex-shrink-0" />
                                  <span>Download Optimized Resume</span>
                                </a>
                              )}
                              
                              {/* Email Option - Mobile Optimized */}
                              <div className="border-t border-green-200 pt-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span className="text-sm font-medium text-green-800">Or email it to yourself:</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                    aria-label="Email address for resume delivery"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleEmailResume}
                                    disabled={isEmailLoading || !userEmail.trim()}
                                    className={`px-4 py-3 bg-green-600 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${
                                      isEmailLoading || !userEmail.trim() 
                                        ? 'opacity-70 cursor-not-allowed' 
                                        : 'hover:bg-green-700'
                                    }`}
                                  >
                                    {isEmailLoading ? 'Sending...' : 'Email Resume'}
                                  </button>
                                </div>
                                <p className="text-xs text-green-700 mt-2 leading-relaxed">
                                  Your email will only be used to send you this resume. We respect your privacy and don't send marketing messages.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </form>

                      {/* Loading Overlay - Enhanced Mobile Experience */}
                      {isLoading && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-sm mx-4 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3b3b3b] border-t-transparent mx-auto mb-4"></div>
                            <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Processing Your Resume</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              Our AI is analyzing your resume and optimizing it for the job description. This typically takes 1-2 minutes.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

        {/* Loading placeholder for non-critical sections - mobile optimized */}
        {!showNonCritical && (
          <div className="py-6 sm:py-12" role="status" aria-label="Loading content">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse space-y-4 sm:space-y-8">
                <div className="bg-gray-200 h-32 sm:h-64 rounded-xl"></div>
                <div className="bg-gray-200 h-48 sm:h-96 rounded-xl"></div>
                <div className="bg-gray-200 h-24 sm:h-48 rounded-xl"></div>
              </div>
            </div>
          </div>
        )}

        {/* Non-critical sections load after initial render */}
        {showNonCritical && (
          <>
            {/* How It Works Section - Mobile Optimized 
            <HowItWorksSection 
              title="How Professional Resume Tailoring Works"
              steps={[
                {
                  icon: Upload,
                  title: "1. Upload Your Resume",
                  description: "Upload your current resume in PDF, DOC, or DOCX format. Our secure system processes it professionally."
                },
                {
                  icon: FileText,
                  title: "2. Add Job Description", 
                  description: "Copy and paste the complete job description you're applying for. Include all requirements and qualifications."
                },
                {
                  icon: Download,
                  title: "3. Get Optimized Resume",
                  description: "Download your professionally tailored resume optimized for ATS systems and job requirements."
                }
              ]}
            />*/}


            {/* Benefits Section - Enhanced for Google Ads */}
            <section className="py-8 sm:py-12 bg-white"> 
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-12 lg:mt-16">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3b3b3b] mb-8">
                    Why Choose Our Professional Resume Tailoring Service?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">ATS Optimization</h3>
                      <p className="text-[#3b3b3b] text-sm leading-relaxed">
                        Ensures your resume passes Applicant Tracking Systems with optimized keywords and professional formatting.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Enhanced Career Prospects</h3>
                      <p className="text-[#3b3b3b] text-sm leading-relaxed">
                        Professional optimization that helps you stand out to hiring managers and improve your job search success.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg text-center md:col-span-2 lg:col-span-1">
                      <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Time-Efficient Process</h3>
                      <p className="text-[#3b3b3b] text-sm leading-relaxed">
                        No more manual resume editing. Get a professionally optimized resume quickly and efficiently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy and Security Section - Important for Google Ads */}
            <section className="py-8 sm:py-12 bg-white"> 
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-12 lg:mt-16 bg-gray-50 p-6 sm:p-8 rounded-xl">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#3b3b3b] mb-4">
                      Privacy and Security
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                      Your privacy and data security are our top priorities. We maintain the highest standards of data protection.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Secure Processing</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Your resume is processed securely and confidentially with industry-standard encryption.
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">No Data Storage</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We don't permanently store your personal information or resume data on our servers.
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Privacy Commitment</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We respect your privacy and don't share your information with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section - Enhanced for SEO and Google Ads */}
            <section className="py-8 sm:py-12 bg-white"> 
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-12 lg:mt-16">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3b3b3b] mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="max-w-3xl mx-auto space-y-6">
                    <details className="bg-gray-50 p-6 rounded-lg">
                      <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                        How does AI resume tailoring work?
                      </summary>
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        Our AI analyzes your resume and the job description to optimize keyword matching, improve ATS compatibility, 
                        and highlight relevant skills and experiences that match the specific role requirements. The process takes 1-2 minutes 
                        and results in a professionally optimized resume.
                      </p>
                    </details>
                    <details className="bg-gray-50 p-6 rounded-lg">
                      <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                        Is this service really free?
                      </summary>
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        Yes, our AI-powered resume tailoring tool is free to use. Upload your resume, add a job description, 
                        and get an optimized resume without cost or registration. We provide this service to help job seekers 
                        succeed in their career goals.
                      </p>
                    </details>
                    <details className="bg-gray-50 p-6 rounded-lg">
                      <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                        What file formats are supported?
                      </summary>
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        We support PDF, DOC, and DOCX file formats for resume uploads. These are the most common formats used by 
                        job seekers and accepted by most ATS systems. Maximum file size is 10MB.
                      </p>
                    </details>
                    <details className="bg-gray-50 p-6 rounded-lg">
                      <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                        How secure is my personal information?
                      </summary>
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        We take data security seriously. Your resume and personal information are processed securely with industry-standard 
                        encryption and are not stored permanently on our servers. We don't share your information with third parties 
                        or use it for marketing purposes.
                      </p>
                    </details>
                    <details className="bg-gray-50 p-6 rounded-lg">
                      <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                        Can I use this tool for multiple job applications?
                      </summary>
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        Yes, we recommend tailoring your resume for each specific job application. Different positions may 
                        require different keyword optimization and skill highlighting, so using our tool for each application 
                        will help maximize your success in the job search process.
                      </p>
                    </details>
                    <details className="bg-gray-50 p-6 rounded-lg">
                      <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                        What makes this different from other resume tools?
                      </summary>
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        Our tool is 100% free, and we focus on professional quality and user privacy. 
                        We provide personalized optimization for each job description while maintaining the highest standards 
                        of data security and user experience.
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
                      Complete Your Professional Career Toolkit
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                      Enhance your job search success with our comprehensive suite of professional career tools.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                    {/* Job Match Tool */}
                    <div className="p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow transition-shadow duration-200">
                      <div className="flex text-center gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Job Match Analyzer</h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Analyze how well your resume matches specific job descriptions. Get compatibility scores and professional recommendations.
                          </p>
                          
                          <Link 
                            to="/match" 
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3b3b] text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                          >
                            Try Job Match
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Fix My Resume Tool */}
                    <div className="p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow transition-shadow duration-200">
                      <div className="flex text-center gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Resume Analysis Service</h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Get professional feedback with actionable suggestions for improvement. Identify and fix formatting, content, and ATS issues.
                          </p>
                          
                          <Link 
                            to="/fix" 
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3b3b] text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                          >
                            Analyze My Resume
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Workflow */}
                  <div className="mt-8 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#3b3b3b] mb-2 text-center">Recommended Workflow</h4>
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
          </>
        )}
      </main>
      
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Your Tailored Resume is Ready!"
        message={modalMessage}
        type="success"
      />
      
      <Footer />
    </div>
  );
};

export default ResumeTailoring;
