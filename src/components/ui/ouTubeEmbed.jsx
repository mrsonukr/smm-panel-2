import React from 'react';

const YouTubeEmbed = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-6">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/TrScbkIIMlU"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-xl shadow-xl"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeEmbed;