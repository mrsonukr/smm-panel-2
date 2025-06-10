import React from "react";

const NoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
      >
        Go Back to Home
      </a>
    </div>
  );
};

export default NoPage;
