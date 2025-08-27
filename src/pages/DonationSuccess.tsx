import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, Coffee, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const DonationSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>Thank You for Your Support! - FreeResumeTools</title>
        <meta name="description" content="Thank you for supporting FreeResumeTools! Your donation helps us keep our tools free for everyone." />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/donate" className="text-gray-500 hover:text-gray-700">Donate</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">Success</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="relative">
                <Coffee className="w-10 h-10 text-green-600" />
                <Heart className="w-4 h-4 text-red-500 absolute -top-1 -right-1" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You for Your Support!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your coffee donation helps us keep our AI-powered resume tools completely free for everyone. We truly appreciate your support!
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600">
                <strong>What your support enables:</strong>
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Free resume tailoring for job seekers</li>
                <li>• Continuous AI improvements</li>
                <li>• No ads or premium paywalls</li>
                <li>• New features and tools</li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                to="/"
                className="block w-full px-4 py-2 bg-[#3b3b3b] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Return to Home
              </Link>
              
              <Link
                to="/tailoring"
                className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Use Our Free Tools
              </Link>

              <a
                href="https://www.trustpilot.com/evaluate/freeresumetools.io"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Leave us a review ⭐
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonationSuccess;