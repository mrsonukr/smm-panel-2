import React from 'react';
import { Shield, Clock, Headphones, Lock } from 'lucide-react';

const FeatureCard = ({ feature }) => {
  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-8 h-8 text-blue-500" />;
      case 'clock':
        return <Clock className="w-8 h-8 text-green-500" />;
      case 'support':
        return <Headphones className="w-8 h-8 text-purple-500" />;
      case 'lock':
        return <Lock className="w-8 h-8 text-orange-500" />;
      default:
        return <div className="w-8 h-8 bg-gray-400 rounded" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
      <div className="flex justify-center mb-4">
        {getFeatureIcon(feature.icon)}
      </div>
      <h3 className="font-semibold text-gray-800 text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-600 text-sm">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;