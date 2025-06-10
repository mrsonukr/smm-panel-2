import React, { useState } from 'react';
import { LuPlus, LuMinus } from 'react-icons/lu';

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      question: "What is the purpose of SMM panels?",
      answer: "SMM panels are online stores where people are able to purchase cheap SMM services."
    },
    {
      question: "What SMM services can I purchase on this panel?",
      answer: "We have many types of SMM services, such as followers, likes, views, etc."
    },
    {
      question: "Is it safe to order SMM on your panel?",
      answer: "YES, it’s completely safe, it won’t get your social media accounts suspended."
    },
    {
      question: "What does a “mass order” mean?",
      answer: "The mass order feature makes it easy for users to place separate orders with different links at once."
    },
    {
      question: "How is the Drip-feed feature used?",
      answer: "Drip-feed helps imitate the natural growth of social media accounts. IF you place an order for 3000 likes on your IG post, you can get them all right away gradually: for example, 300 likes/day for 10 days."
    },
    {
      question: "How does the mass order feature work?",
      answer: "A mass order is an effective way for users to save time, since it allows to place multiple orders with different links at once."
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-[#6B48FF] to-[#A779FF] min-h-screen p-5 flex flex-col items-center text-white font-sans">
      <h1 className="text-3xl font-semibold mb-2">Where to begin?</h1>
      <p className="text-base text-center mb-8">
        Want to start placing orders on our panel? Follow these 4 easy steps.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 text-gray-800 flex flex-col gap-2"
          >
            <div className="flex items-center">
              <h2 className="text-lg font-semibold flex-1 pr-2">{faq.question}</h2>
              <button
                onClick={() => toggleFAQ(index)}
                className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"
              >
                {expandedIndex === index ? (
                  <LuMinus size={20} />
                ) : (
                  <LuPlus size={20} />
                )}
              </button>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedIndex === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <p className="text-sm">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;