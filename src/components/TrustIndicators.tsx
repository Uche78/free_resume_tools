import React from 'react';
import { CheckCircle, Users, Shield, Clock } from '../utils/icons';

interface TrustIndicatorsProps {
  userCount?: string;
  showProcessingTime?: boolean;
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ 
  userCount = "4,000+", 
  showProcessingTime = false 
}) => (
  <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-6 sm:mb-8 text-sm text-gray-600">
    <div className="flex items-center gap-1">
      <CheckCircle className="w-4 h-4 text-green-600" />
      <span>100% Free</span>
    </div>
    <div className="flex items-center gap-1">
      <Users className="w-4 h-4 text-purple-600" />
      <span>{userCount} Users</span>
    </div>
    <div className="flex items-center gap-1">
      <Shield className="w-4 h-4 text-blue-600" />
      <span>Secure & Private</span>
    </div>
    {showProcessingTime && (
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4 text-orange-600" />
        <span>Quick Results</span>
      </div>
    )}
  </div>
);