import React from "react";

// Individual Review Component
const ReviewItem = ({ review, author }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 my-4">
      <p className="text-gray-700 text-base">{review}</p>
      <p className="text-gray-800 font-semibold mt-2">{author}</p>
    </div>
  );
};

// Main SuccessStories Component
const SuccessStories = () => {
  const reviews = [
    {
      review:
        "One of the things I do for work is building engagement on YouTube and Instagram accounts for different clients. Services that I order on this panel help me save a lot of money and still do the great job my clients expect me to do. Highly recommend!",
      author: "Dennis Green",
    },
    {
      review:
        "To be honest, I didn’t even expect that the results of ordering SMM services on this panel would be so good, I’m very impressed! Definitely ordering more soon.",
      author: "Brad Garcia",
    },
    {
      review:
        "I’m so happy I found this SMM panel! I spent hours and hours on trying to get more people to know about my brand but it was so difficult. This panel helps me get the attention online and increase my customer base.",
      author: "Devesh Mann",
    },
  ];

  return (
    <div className="flex flex-col bg-gradient-to-b from-blue-50 to-white p-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">Success stories</h2>
      <p className="text-gray-600 text-base mb-6">
        Learn how you can benefit from using our panel by checking out some of the customer reviews.
      </p>
      {reviews.map((review, index) => (
        <ReviewItem
          key={index}
          review={review.review}
          author={review.author}
        />
      ))}
    </div>
  );
};

export default SuccessStories;