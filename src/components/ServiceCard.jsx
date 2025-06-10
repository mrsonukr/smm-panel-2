import React from 'react';
import { ShoppingCart, Eye, Heart, Users, MessageCircle, Share, Play } from 'lucide-react';

const ServiceCard = ({ service, onOrder }) => {
  const getServiceIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'followers':
      case 'subscribers':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'likes':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'views':
        return <Eye className="w-5 h-5 text-green-500" />;
      case 'comments':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case 'shares':
      case 'retweets':
        return <Share className="w-5 h-5 text-orange-500" />;
      default:
        return <Play className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getServiceIcon(service.category)}
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{service.name}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {service.category}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Price per 1000:</span>
          <span className="font-bold text-green-600">${service.price}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Min order:</span>
          <span className="font-medium text-gray-800">{service.minOrder.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Max order:</span>
          <span className="font-medium text-gray-800">{service.maxOrder.toLocaleString()}</span>
        </div>
      </div>
      
      <button
        onClick={() => onOrder(service)}
        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        Order Now
      </button>
    </div>
  );
};

export default ServiceCard;