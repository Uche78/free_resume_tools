import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Using grid-cols-4 with equal widths for all columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Each column gets flex-1 to take equal space */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">FreeResumeTools</h3>
            <p className="text-gray-600 mb-4">
              Helping job seekers increase their chances of landing their dream jobs.
            </p>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              </li>
              <li>
                <Link to="https://blog.freeresumetools.io/" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-600 hover:text-blue-600 transition-colors">Donate</Link>
              </li>
            </ul>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/match" className="text-gray-600 hover:text-blue-600 transition-colors">Job Match Assessment</Link>
              </li>
              <li>
                <Link to="/tailor-my-resume" className="text-gray-600 hover:text-blue-600 transition-colors">Resume Tailoring</Link>
              </li>
              <li>
                <Link to="/resume-fixer" className="text-gray-600 hover:text-blue-600 transition-colors">Fix My Resume</Link>
              </li>
            </ul>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-600 hover:text-blue-600 transition-colors">Security and Compliance</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {currentYear} FreeResumeTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
