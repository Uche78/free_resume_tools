import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FileText, Key, Shield, Puzzle as PuzzlePiece, Puzzle, Star, Check, ArrowRight, Sparkles, Gift, Microscope, Search } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { loadScript } from './utils/scriptLoader';
import Header from './components/Header';
import Footer from './components/Footer';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DonationPage from './pages/DonationPage';
import DonationSuccess from './pages/DonationSuccess';
import AboutPage from './pages/AboutPage';
import SecurityPage from './pages/SecurityPage';
import { Helmet } from 'react-helmet-async';

// Lazy load the route components
const ResumeTailoring = lazy(() => import('./pages/ResumeTailoring'));
const JobMatchAssessment = lazy(() => import('./pages/JobMatchAssessment'));
const FixResume = lazy(() => import('./pages/FixResume'));
const LazyTrustpilot = lazy(() => import('./pages/LazyTrustpilot'));

// Initialize Supabase client
const supabaseUrl = 'https://krzofnafayygoxoinkfv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyem9mbmFmYXl5Z294b2lua2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2Mjk3NTYsImV4cCI6MjA1MjIwNTc1Nn0.7gnVJJrcrfMzWOYAdzUTJhqscx1bbd7odOmFxzxz404';
const supabase = createClient(supabaseUrl, supabaseKey);

function HomePage() {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [matchDownloadUrl, setMatchDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const matchFormRef = useRef<HTMLFormElement>(null);
  const siteUrl = "https://freeresumetools.io";
  const logoUrl = `${siteUrl}/images/logo.png`;
  const homePageDescription = "Free AI-powered tools to optimize your resume, analyze job matches, and improve your chances of landing your dream job.";

  // Load Trustpilot script
  useEffect(() => {
    loadScript('//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js', true)
      .catch(err => console.error("Failed to load Trustpilot", err));
  }, []);

  const handleTailorResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setDownloadUrl(null);
    
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
              alert('Resume optimization completed! You can now download your optimized resume.');
            } else {
              alert('Resume tailoring request processed! The optimized resume will be available shortly.');
            }
          } else {
            alert('Resume tailoring request accepted! Your resume is being processed. Please check back in a few minutes.');
          }
        } catch (parseError) {
          alert('Resume tailoring request sent! Your resume is being processed.');
        }
      } else {
        alert('Resume tailoring request successfully sent! Your resume is being processed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
              alert('Job match analysis completed! You can now download your match report.');
            } else {
              alert('Job match analysis started! Your report will be available shortly.');
            }
          } else {
            alert('Job match analysis request accepted! Your report is being processed.');
          }
        } catch (parseError) {
          alert('Job match analysis request sent! Your report is being processed.');
        }
      } else {
        alert('Job match analysis request sent! Your report is being processed.');
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

  const handleClearMatchForm = () => {
    if (matchFormRef.current) {
      matchFormRef.current.reset();
      setMatchDownloadUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white pt-12 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
            <div className="text-center">
              <p className="text-base sm:text-xl text-gray-600 font-medium mb-4 max-w-2xl mx-auto">
                5,000+ Resumes Tailored & Analyzed
              </p>
              <h1 className="text-2xl sm:text-5xl font-bold text-[#3b3b3b] mb-6">
                Tailor Your Resume for 10X Job Matches—100% Free
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Tired of being ghosted by employers? Instantly tailor your resume for 10X more job matches—no signup required.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 px-4">
                <Link
                  to="/tailoring"
                  className="text-base sm:text-lg px-8 py-3 bg-[#3b3b3b] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  Tailor My Resume Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/fix"
                  className="text-base sm:text-lg px-8 py-3 border-2 border-[#3b3b3b] text-[#3b3b3b] rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Fix My Resume
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof 
        <div className="pb-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-600">
      {/* Rating
      <div className="flex items-center gap-2">
            <Star className="text-yellow-500 text-lg" />
            <span className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">4.9/5 from 100+ users</span>
          </div>
      
      {/* Divider - hidden on mobile
      <div className="hidden sm:block h-5 w-px bg-gray-300"></div>
      
      {/* Users helped
      <div className="flex items-center gap-2">
            <Check className="text-yellow-500 text-lg" />
            <span className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">5,000+ job seekers helped</span>
          </div>
      
      {/* Divider - hidden on mobile
      <div className="hidden sm:block h-5 w-px bg-gray-300"></div>
      
      {/* Success rate
      <div className="flex items-center gap-2">
            <Star className="text-yellow-500 text-lg" />
            <span className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">92% saw more interview callbacks</span>
          </div>
    </div>
  </div>
</div>*/}

        {/* Pain Point Section 
<section className="py-20 px-4 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-gray-50 p-8 lg:p-12 rounded-xl">
      {/* Text Column - Left
      <div className="flex-1">
        <h2 className="text-xl sm:text-3xl font-medium text-[#3b3b3b] mb-6 text-left">
          <div>Not hearing back from recruiters or hiring managers?</div> 
          <div className="mt-2">Our AI will get you seen.</div>
        </h2>
        
        <div className="text-gray-600 space-y-4 text-left">
          <p>
            You spend hours crafting your resume, carefully choosing words, tweaking layouts, and applying to job after job.
            But the silence is deafening.
          </p>
          
          <p className="font-medium">
            No callbacks.<br />
            No interviews.<br />
            Just endless "Thanks, but no thanks" — or worse, no response at all.
          </p>
          
          <p>
            The truth? Your resume is being filtered out before a human ever sees it.
          </p>
          
          <p>
            Hiring systems and recruiters look for exact keyword matches. If your resume doesn't speak their language, 
            it never makes it past the first scan. And if you're tailoring manually—or not at all—you're falling behind.
          </p>
          
          <div className="space-y-2">
            <p className="font-medium">🚫 Here's what you're up against:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>📉 Generic resumes that blend in with every other applicant</li>
              <li>🕒 Wasted hours rewriting the same resume for every job</li>
              <li>❌ Missing key keywords that get picked up by automated filters</li>
              <li>😩 Feeling invisible—even when you're qualified</li>
              <li>🔁 Endless rejection or ghosting with no idea why</li>
            </ul>
          </div>
          
          <p className="font-medium">
            The old way isn't working.<br />
            But you don't have to keep guessing.
          </p>
          
          <p>
            Our AI analyzes real job descriptions and rewrites your resume in seconds — so it matches exactly what 
            recruiters are looking for.
          </p>

          <p className="font-medium mb-8">No fluff. No wasted effort. Just results.</p>

          <Link
            to="/tailoring"
            className="inline-flex items-center text-gray-800 relative group mt-4 px-4 py-3 text-white bg-[#3b3b3b] rounded-md hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 group"
          >
            <span className="font-medium">Get Hired!</span>
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Image Column - Right
      <div className="flex-1 flex items-center justify-center">
        <img 
          src="/path-to-your-image.jpg" // Replace with your image path
          alt="AI resume tailoring dashboard"
          className="w-full h-auto max-w-lg rounded-lg object-cover shadow-md"
        />
      </div>
    </div>
  </div>
</section>*/}
        
        {/* Pain Point Section */}
        <section id="" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 py-20 rounded-xl text-center rounded-xl p-8">
              <h2 className="text-xl sm:text-3xl font-bold text-[#3b3b3b] mb-4">
                <div>Not hearing back from recruiters or hiring managers?</div> 
                <div className="mt-2 mb-8">Our AI will get you seen.</div>
              </h2>
              <div className="text-gray-600 max-w-3xl mx-auto space-y-4">
  <p>
    You spend hours crafting your resume, carefully choosing words, tweaking layouts, and applying to job after job.<span className="font-medium"> But the silence is deafening - No callbacks, No interviews, Just endless "Thanks, but no thanks" — or worse, no response at all.
  </span>

  </p>
  
  <p>
    <span className="font-medium">The truth?</span>Your resume is being filtered out before a human ever sees it.
  </p>
  
  <p>
    Recruiters and hiring systems scan for exact keyword matches. If your resume doesn’t speak their language, it’s invisible. And if you're tailoring manually—or not at all—you're falling behind.
  </p>
  
                {/*<div className="space-y-2">
    <p className="font-medium">🚫 Here's what you're up against:</p>
    <ul className="list-disc list-inside space-y-1 pl-4">
      <li>📉 Generic resumes that blend in with every other applicant</li>
      <li>🕒 Wasted hours rewriting the same resume for every job</li>
      <li>❌ Missing key keywords that get picked up by automated filters</li>
      <li>😩 Feeling invisible—even when you're qualified</li>
      <li>🔁 Endless rejection or ghosting with no idea why</li>
    </ul>
  </div>
  
  <p className="font-medium">
    The old way isn't working.<br />
    But you don't have to keep guessing.
  </p>*/}
  
  <p>
    <span className="font-medium">That’s where we come in.</span> Our AI analyzes real job descriptions and rewrites your resume in seconds — so it matches exactly what recruiters are looking for.
  </p>

  <p className="font-medium">No fluff. No wasted effort. Just results.
  </p>
<br/>
                <div className="">
                <Link
                  to="/tailoring"
                  className="text-base sm:text-lg px-8 py-3 bg-[#3b3b3b] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="font-medium">Get Started!</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                </div>
</div>
              
            </div>
          </div>
        </section>
        

        {/* Features Section */}
        <section id="features" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-xl sm:text-3xl font-bold text-[#3b3b3b] mb-4">
                Powerful Features to Boost Your Job Search
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI-powered tools help you create the perfect resume for every job application.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Resume Tailoring</h3>
                <p className="text-gray-600">
                  Optimize your resume for specific job descriptions using advanced AI technology.
                </p>
                <Link
                  to="/tailoring"
                  className="inline-flex items-center text-gray-800 relative group mt-10 px-4 py-3 border border-[#3b3b3b] rounded-md hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <span className="font-medium">Tailor My Resume</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-6">
                  <Puzzle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Job Match Assessment</h3>
                <p className="text-gray-600">
                  Discover how well your resume matches job requirements with detailed scoring.
                </p>
                <Link
                  to="/match"
                  className="inline-flex items-center text-gray-800 relative group mt-10 px-4 py-3 border border-[#3b3b3b] rounded-md hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <span className="font-medium">Get My Match Score</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-6">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Resume Analysis</h3>
                <p className="text-gray-600">
                  Verify your resume is strategically formatted and structured, and free of errors.
                </p>
                <Link
                  to="/fix"
                  className="inline-flex items-center text-gray-800 relative group mt-10 px-4 py-3 border border-[#3b3b3b] rounded-md hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <span className="font-medium">Analyze My Resume</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="us" className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Two column layout below */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left column - Paragraph text */}
              <div>
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">We Are Different!</h2>
                  <h3 className="text-xl font-semibold mb-3">
                    We're committed to providing everyone access to the tools they need to secure the job they want.
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-4">
                  Our platform was built with the belief that career advancement shouldn't be limited by paywalls or complicated sign-up processes.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Unlike other resume tools that charge monthly subscriptions or limit features, we've made everything completely free with no strings attached. We don't require any personal information, email sign-ups, or credit card details.
                </p>
                <p className="text-lg text-gray-600">
                  Our mission is simple: to help job seekers land their dream positions by providing unrestricted access to powerful resume analysis and optimization tools that would otherwise be expensive or inaccessible.
                </p>
              </div>
              
              {/* Right column - Single card with 3 main points */}
              <div>
                <div className="bg-white p-8 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-8 pb-4 border-b border-gray-100">Our Guarantees</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-6 mr-4 flex-shrink-0">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">100% Free</h4>
                        <p className="text-gray-600">No hidden costs, subscriptions, or premium features. Everything is completely free.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-6 mr-4 flex-shrink-0">
                        <Key className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Instant Access</h4>
                        <p className="text-gray-600">No sign-ups, accounts, or personal information are required.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-6 mr-4 flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Enhanced Privacy & Trust</h4>
                        <p className="text-gray-600">We don't ask for or collect personal information or send spam emails.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lazy-loaded Trustpilot CTA */}
        <Suspense fallback={<div>Loading Trustpilot reviews...</div>}>
          <LazyTrustpilot />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<ResumeTailoring />} />
        <Route path="/tailoring" element={<ResumeTailoring />} />
        <Route path="/match" element={<JobMatchAssessment />} />
        <Route path="/fix" element={<FixResume />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/donation-success" element={<DonationSuccess />} />
        <Route path="/security" element={<SecurityPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;