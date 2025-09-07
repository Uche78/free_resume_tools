import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X, ChevronDown, MessageCircle, Coffee, Star, Wrench, BookOpen } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get initial sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSubscription(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchSubscription(session.user.id);
        } else {
          setSubscription(null);
        }
      }
    );

    return () => authSubscription.unsubscribe();
  }, []);

  const fetchSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setToolsMenuOpen(false);
  };

  const toggleToolsMenu = () => {
    setToolsMenuOpen(!toolsMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setToolsMenuOpen(false);
  };

  const toolsLinks = [
    { 
      name: 'Resume Tailoring', 
      path: '/tailor-my-resume',  
    },
    { 
      name: 'Job Match', 
      path: '/match', 
    },
    {
      name: 'Fix My Resume',
      path: '/resume-fixer',
    }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-500 transition-colors"
            onClick={closeMobileMenu}
          >
            <FileText className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">
                <span style={{ color: '#3A3A3A' }}>Free</span>
                <span style={{ color: '#3A3A3A' }}>ResumeTools</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">

            {/* Tools Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center space-x-1 py-2 transition-colors ${
                  toolsLinks.some(tool => location.pathname === tool.path)
                    ? 'text-[#3A3A3A] font-medium'
                    : 'text-gray-600 hover:text-gray-500'
                }`}
              >
                <Wrench className="w-5 h-5" />
                <span>Free Tools</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {toolsLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#3A3A3A] font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-500'
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/donate"
              className={`flex items-center space-x-1 py-2 transition-colors ${
                location.pathname === '/'
                  ? 'text-[#3A3A3A] font-medium'
                  : 'text-gray-600 hover:text-gray-500'
              }`}
            >
              <Coffee className="w-5 h-5" />
              <span>Support Us</span>
            </Link>

            <a
              href="https://www.trustpilot.com/evaluate/freeresumetools.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 py-2 font-medium text-[#3A3A3A] transition-colors"
            >
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/>
              <span>Leave a Review</span>
            </a>

            <a
              href="https://form.typeform.com/to/buGXp4VG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 py-3 px-2"
            >
              <span>Report a Bug</span>
            </a>

            <Link
              to="https://blog.freeresumetools.io/"
              className={`flex items-center space-x-1 py-2 transition-colors ${
                location.pathname === '/'
                  ? 'text-[#3A3A3A] font-medium'
                  : 'text-gray-600 hover:text-gray-500'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Blog</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="flex flex-col py-2">

              {/* Mobile Tools Section */}
              <div className="border-t border-gray-100 py-2">
                <div className="px-2 py-2 text-sm font-medium text-gray-500">Free Tools</div>
                {toolsLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 py-3 px-4 ${
                      location.pathname === link.path
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              <a
              href="https://form.typeform.com/to/buGXp4VG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 py-3 px-2"
            >
              <span>Report a Bug</span>
            </a>

              <Link
                to="/donate"
                className={`flex items-center space-x-2 py-3 px-2 ${
                  location.pathname === '/'
                    ? 'text-[#3A3A3A] font-medium'
                    : 'text-gray-600'
                }`}
              >
                  <span>Support Us</span>
              </Link>

               <a
              href="https://www.trustpilot.com/evaluate/freeresumetools.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 py-3 px-2"
            >
              <span>Leave a Review</span>
            </a>

              <Link
                to="https://blog.freeresumetools.io/"
                className={`flex items-center space-x-2 py-3 px-2 ${
                  location.pathname === '/'
                    ? 'text-[#3A3A3A] font-medium'
                    : 'text-gray-600'
                }`}
              >
                <span>Blog</span>
              </Link>

              
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
