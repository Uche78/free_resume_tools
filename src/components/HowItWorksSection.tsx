import React from 'react';
import { Upload, FileText, Download } from '../utils/icons';

interface Step {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  title?: string;
  steps: Step[];
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  title = "How It Works",
  steps
}) => (
  <section className="py-8 sm:py-12 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-[#3b3b3b] mb-6 sm:mb-8">
          {title}
        </h2>
        
        {/* Mobile: Horizontal scrollable steps */}
        <div className="block sm:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center min-w-[260px] snap-center px-2">
                <div className="w-12 h-12 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#3b3b3b]">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Mobile scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[#3b3b3b]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#3b3b3b] rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#3b3b3b]">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);