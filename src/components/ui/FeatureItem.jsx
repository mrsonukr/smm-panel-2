import React from "react";
import { Award, CreditCard, DollarSign, Gauge } from "lucide-react";

// Individual Feature Item Component
const FeatureItem = ({ icon: Icon, title, description, iconColor }) => { // eslint-disable-line no-unused-vars
  return (
    <div className="flex items-start gap-6 my-8 ">
      <div className="flex items-center justify-center bg-white rounded-full w-16 h-16 aspect-square">
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  );
};

// Main FeaturesSection Component
const FeaturesSection = () => {
  const features = [
    {
      icon: Award,
      title: "Great quality",
      description: "The quality of our SMM services will pleasantly surprise you.",
      iconColor: "text-teal-500",
    },
    {
      icon: CreditCard,
      title: "Multiple payment systems",
      description: "Great variety of payment methods for you to choose from.",
      iconColor: "text-blue-600",
    },
    {
      icon: DollarSign,
      title: "Really cheap",
      description: "SMM services that we offer on our panel are extremely cheap.",
      iconColor: "text-yellow-500",
    },
    {
      icon: Gauge,
      title: "Extra quick delivery",
      description: "Customer orders on our panel are processed very fast.",
      iconColor: "text-pink-500",
    },
  ];

  return (
    <div className="flex flex-col bg-gradient-to-b from-white to-blue-50 p-6">
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          iconColor={feature.iconColor}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;