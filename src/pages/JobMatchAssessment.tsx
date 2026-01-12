import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, Download, ChevronRight, CheckCircle, Star, Clock, Users, Target, TrendingUp, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AwarenessBanner from '../components/AwarenessBanner';
import Modal from '../components/Modal';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../utils/supabase';

const JobMatchAssessment: React.FC = () => {
  const [matchDownloadUrl, setMatchDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const matchFormRef = useRef<HTMLFormElement>(null);
  const currentUrl = "https://freeresumetools.io/job-match";
  const siteUrl = "https://freeresumetools.io";
  const serviceName = "Free AI Job Match Analysis Tool";
  const serviceDescription = "Get instant feedback on how well your resume matches any job description. Free AI-powered analysis with detailed scoring, keyword matching, and personalized recommendations to improve your application success rate.";
  const category = "Career Services";
  const providerName = "FreeResumeTools";

  //Added helper jan10
  const openInNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const handleDownloadFromModal = () => {
  if (!matchDownloadUrl) return;
  openInNewTab(matchDownloadUrl);
};


  const handleJobMatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMatchDownloadUrl(null);

    const formData = new FormData(e.currentTarget);
    const resume = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    const processingId = `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      const timestamp = new Date().getTime();
      const filePath = `matches/${timestamp}_${resume.name}`;

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

      const response = await fetch('https://hook.us2.make.com/lfu91wmj6pyteqd7hzsv2rk67qtgabyy', {
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
            if (data.matchDownloadUrl) {
              setMatchDownloadUrl(data.matchDownloadUrl);
              setModalMessage('Download your job match report now.\n\nIf this tool helped, a quick review helps keep FreeResumeTools free for the next job seeker (optional).');
              setShowSuccessModal(true);
            } else {
              setModalMessage('Job match analysis started! Your report will be available shortly.');
              setShowSuccessModal(true);
            }
          } else {
            setModalMessage('Job match analysis request accepted! Your report is being processed.');
            setShowSuccessModal(true);
          }
        } catch (parseError) {
          setModalMessage('Job match analysis request sent! Your report is being processed.');
          setShowSuccessModal(true);
        }
      } else {
        setModalMessage('Job match analysis request sent! Your report is being processed.');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearMatchForm = () => {
    if (matchFormRef.current) {
      matchFormRef.current.reset();
      setMatchDownloadUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>Free Job Match Analysis Tool - Check Resume-Job Compatibility Score | FreeResumeTools</title>
        <meta name="description" content="Free AI-powered job match analysis tool. Get instant feedback on how well your resume matches any job description with detailed scoring, keyword analysis, and improvement recommendations. Increase your interview chances." />
        <meta name="keywords" content="job match analysis, resume job compatibility, ATS score checker, job description matching, resume analyzer, career assessment tool, job application scorer, free resume tools" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Free Job Match Analysis Tool - Check Resume-Job Compatibility" />
        <meta property="og:description" content="Get instant feedback on how well your resume matches any job description. Free AI-powered analysis with detailed scoring and recommendations." />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/images/job-match-og.jpg`} />
        <meta property="og:image:alt" content="Job match analysis tool showing compatibility score" />
        <meta property="og:site_name" content="FreeResumeTools" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Job Match Analysis Tool - Check Resume-Job Compatibility" />
        <meta name="twitter:description" content="Get instant feedback on how well your resume matches any job description. Free AI analysis with detailed scoring." />
        <meta name="twitter:image" content={`${siteUrl}/images/job-match-twitter.jpg`} />
        
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
            "potentialAction": {
              "@type": "UseAction",
              "target": currentUrl,
              "name": "Analyze Job Match"
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
              "name": "AI Job Match Analysis Tool",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "AI-powered compatibility scoring",
                "Keyword match analysis",
                "ATS optimization recommendations",
                "Detailed improvement suggestions"
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
                "name": "Job Match Analysis",
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
              "name": "How does the job match analysis work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our AI analyzes your resume against the job description to calculate compatibility scores based on keyword matching, skill alignment, experience relevance, and ATS optimization factors. You get a detailed report with specific recommendations for improvement."
              }
            }, {
              "@type": "Question",
              "name": "What does the match score mean?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The match score represents how well your resume aligns with the job requirements. Scores above 80% indicate strong compatibility, 60-80% shows good potential with some improvements needed, and below 60% suggests significant optimization is required."
              }
            }, {
              "@type": "Question",
              "name": "Is the job match analysis really free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our job match analysis tool is completely free. Upload your resume, add the job description, and get instant compatibility scoring and recommendations without any cost or registration."
              }
            }, {
              "@type": "Question",
              "name": "How accurate is the AI analysis?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our AI uses advanced natural language processing and machine learning algorithms trained on thousands of successful job applications. The analysis accuracy is continuously improved based on user feedback and hiring trends."
              }
            }]
          })}
        </script>

        {/* HowTo Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Analyze Job Match Compatibility",
            "description": "Step-by-step guide to check how well your resume matches a job description using our free AI tool.",
            "image": `${siteUrl}/images/job-match-howto.jpg`,
            "totalTime": "PT2M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "step": [{
              "@type": "HowToStep",
              "name": "Upload Your Resume",
              "text": "Upload your current resume in PDF, DOC, or DOCX format to our secure analysis platform.",
              "image": `${siteUrl}/images/upload-resume-step.jpg`
            }, {
              "@type": "HowToStep",
              "name": "Add Job Description",
              "text": "Copy and paste the complete job description including requirements, qualifications, and responsibilities.",
              "image": `${siteUrl}/images/job-description-step.jpg`
            }, {
              "@type": "HowToStep",
              "name": "Get Match Analysis Report",
              "text": "Download your detailed compatibility report with score breakdown, keyword analysis, and improvement recommendations.",
              "image": `${siteUrl}/images/match-report-step.jpg`
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
      <AwarenessBanner />
      
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
              <span className="text-gray-900 font-medium" itemProp="name">Job Match Analysis</span>
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
                Free AI Job Match Analysis Tool
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                Get instant feedback on how well your resume matches any job description. Free AI-powered analysis 
                with detailed scoring, keyword matching, and personalized recommendations to boost your interview chances.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-6 sm:mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>1,500+ Analyzed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-purple-600" aria-hidden="true" />
                  <span>1-2 Min Process</span>
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
                  <form ref={matchFormRef} onSubmit={handleJobMatch} className="space-y-4 sm:space-y-6">
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
                        Supported formats: PDF, DOC, DOCX (Max 10MB)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#3b3b3b]" htmlFor="job-description">
                        Job Description
                      </label>
                      <textarea
                        id="job-description"
                        name="jobDescription"
                        className="w-full h-32 sm:h-40 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b3b3b] focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                        placeholder="Paste the complete job description here. Include job requirements, qualifications, responsibilities, and preferred skills for the most accurate analysis..."
                        required
                        aria-describedby="description-help"
                      />
                      <p id="description-help" className="text-xs text-gray-500 mt-1">
                        Include the complete job posting for most accurate match analysis
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
                        {isLoading ? 'Analyzing Match...' : 'Check Job Match Score'}
                      </button>
                      <button
                        type="button"
                        onClick={handleClearMatchForm}
                        className="px-6 py-3 bg-gray-200 text-[#3b3b3b] rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        aria-label="Clear form"
                      >
                        Clear Form
                      </button>
                    </div>
                    <p id="submit-help" className="text-xs text-gray-500 text-center">
                      Analysis completes in under 30 seconds
                    </p>

                    {/* Results Section - Enhanced Mobile Layout */}
                    {matchDownloadUrl && (
                      <div className="mt-6 p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-green-800">Your Job Match Report is Ready!</h3>
                        </div>
                        <a
                          href={matchDownloadUrl}
                          download
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
                          aria-label="Download your job match analysis report"
                        >
                          <Download className="w-5 h-5 flex-shrink-0" />
                          <span>Download Match Analysis Report</span>
                        </a>
                        <p className="text-xs text-green-700 mt-2 text-center">
                          Your detailed report includes compatibility score, keyword analysis, and improvement recommendations
                        </p>
                      </div>
                    )}
                  </form>

                  {/* Loading Overlay - Enhanced Mobile Experience */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-sm mx-4 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3b3b3b] border-t-transparent mx-auto mb-4"></div>
                        <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Analyzing Job Match</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Our AI is comparing your resume with the job requirements and calculating compatibility scores. Almost done!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

            {/* Benefits Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-12 lg:mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3b3b3b] mb-8">
                What You Get in Your Match Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Compatibility Score</h3>
                  <p className="text-[#3b3b3b] text-sm leading-relaxed">
                    Get an overall match percentage showing how well your resume aligns with job requirements.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Keyword Analysis</h3>
                  <p className="text-[#3b3b3b] text-sm leading-relaxed">
                    Detailed breakdown of missing keywords and phrases that could improve your match score.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">Improvement Tips</h3>
                  <p className="text-[#3b3b3b] text-sm leading-relaxed">
                    Specific recommendations to optimize your resume for better job compatibility.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">ATS Optimization</h3>
                  <p className="text-[#3b3b3b] text-sm leading-relaxed">
                    Insights on how to make your resume more ATS-friendly for this specific role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Mobile Optimized */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-[#3b3b3b] mb-6 sm:mb-8">How Job Match Analysis Works</h2>
              
              {/* Mobile: Horizontal scrollable steps */}
              <div className="block sm:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  <div className="flex flex-col items-center text-center min-w-[260px] snap-center px-2">
                    <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                      <Upload className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">1. Upload Resume</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Upload your resume in PDF, DOC, or DOCX format. Our AI will analyze every detail.</p>
                  </div>
                  <div className="flex flex-col items-center text-center min-w-[260px] snap-center px-2">
                    <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">2. Add Job Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Paste the complete job posting including requirements and qualifications.</p>
                  </div>
                  <div className="flex flex-col items-center text-center min-w-[260px] snap-center px-2">
                    <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                      <Download className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">3. Get Match Report</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Download detailed analysis with compatibility score and improvement tips.</p>
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
                  <p className="text-gray-600 leading-relaxed">Upload your resume in PDF, DOC, or DOCX format. Our AI will analyze every detail for job compatibility.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <FileText className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#3b3b3b]">2. Add Job Description</h3>
                  <p className="text-gray-600 leading-relaxed">Paste the complete job posting including requirements, qualifications, and responsibilities.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <Download className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#3b3b3b]">3. Get Match Report</h3>
                  <p className="text-gray-600 leading-relaxed">Download your detailed analysis with compatibility score, keyword matching, and improvement recommendations.</p>
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
                Frequently Asked Questions About Job Match Analysis
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    How does the job match analysis work?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Our AI analyzes your resume against the job description to calculate compatibility scores based on keyword matching, 
                    skill alignment, experience relevance, and ATS optimization factors. You get a detailed report with specific 
                    recommendations for improvement and an overall compatibility percentage.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    What does the match score mean?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    The match score represents how well your resume aligns with the job requirements. Scores above 80% indicate 
                    strong compatibility and high interview potential, 60-80% shows good potential with some improvements needed, 
                    and below 60% suggests significant optimization is required to increase your chances.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    Is the job match analysis really free?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Yes, our job match analysis tool is completely free to use. Upload your resume, add the job description, 
                    and get instant compatibility scoring and detailed recommendations without any cost, registration, or hidden fees. 
                    We believe everyone deserves access to professional career analysis tools.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    How accurate is the AI analysis?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Our AI uses advanced natural language processing and machine learning algorithms trained on thousands of 
                    successful job applications across various industries. The analysis accuracy is continuously improved based 
                    on user feedback, hiring trends, and recruiter insights to provide the most relevant recommendations.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    Can I analyze multiple jobs with the same resume?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Absolutely! We recommend analyzing your resume against each specific job you're applying for. Different 
                    positions may require different keyword optimization and skill highlighting, so using our tool for each 
                    application will maximize your chances of getting noticed by recruiters and ATS systems.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg">
                  <summary className="font-semibold text-[#3b3b3b] cursor-pointer hover:text-blue-600 transition-colors">
                    What file formats are supported?
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    We support PDF, DOC, and DOCX file formats for resume uploads, with a maximum file size of 10MB. 
                    These are the most common formats accepted by employers and ATS systems. PDF format is recommended 
                    for the best analysis accuracy and formatting preservation.
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
      Take Action on Your Match Results
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Now that you know how well your resume matches the job, use our other free tools to improve your score and optimize your application.
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
    {/* Resume Tailoring Tool */}
    <div className="p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow transition-shadow duration-200">
      <div className="flex text-center gap-4">

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">AI Resume Tailoring</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Got a low match score? Automatically optimize your resume for this specific job description. Our AI will improve keyword matching and ATS compatibility.
          </p>
          
          <Link 
            to="/tailor-my-resume" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3b3b] text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
          >
            Tailor My Resume
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>

    {/* Fix My Resume Tool */}
    <div className="p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow transition-shadow duration-200">
      <div className="flex text-center gap-4">

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Fix My Resume</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Need to fix formatting or content issues before tailoring? Get instant feedback with actionable suggestions to improve your overall resume quality.
          </p>
          
          <Link 
            to="/resume-fixer" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3b3b] text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
          >
            Fix My Resume
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
      </main>
      
      <Modal
  isOpen={showSuccessModal}
  onClose={() => setShowSuccessModal(false)}
  title="Your job match report is ready"
  message={modalMessage}
  type="success"
  primaryActionLabel="Download Match Report"
  onPrimaryAction={matchDownloadUrl ? handleDownloadFromModal : undefined}
/>

      
      <Footer />
    </div>
  );
};

export default JobMatchAssessment;
