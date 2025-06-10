import React from "react";

// Individual Step Component
const StepItem = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      {/* Number Circle */}
      <div className="relative flex flex-col items-center">
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full">
            <span className="text-white text-xl font-semibold">{number}</span>
          </div>
        </div>
        {/* Connecting Line (not for the last item) */}
        {number !== 4 && (
          <div className="w-0.5 h-16 mt-2 border-l-2 border-dashed border-blue-400"></div>
        )}
      </div>
      {/* Text Content */}
      <div className="mt-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  );
};

// Main Stepper Component
const Stepper = () => {
  const steps = [
    {
      number: 1,
      title: "Create an account",
      description: "Begin with signing up and then log in to your account.",
    },
    {
      number: 2,
      title: "Adding funds",
      description: "The next step is to choose a payment method and add funds.",
    },
    {
      number: 3,
      title: "Pick a service",
      description:
        "Pick the SMM services you want and easily place your orders.",
    },
    {
      number: 4,
      title: "Enjoy great results",
      description:
        "You will be informed once your order is complete, it won't take long.",
    },
  ];

  return (
    <div className="flex flex-col max-w-4xl mx-auto my-8 px-4">
      {steps.map((step) => (
        <StepItem
          key={step.number}
          number={step.number}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
};

export default Stepper;
