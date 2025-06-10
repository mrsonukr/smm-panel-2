import React from "react";
import Header from "../components/Header"; // Adjust the path as necessary
import LoginForm from "../components/LoginForm";
import YouTubeEmbed from "../components/ui/ouTubeEmbed";
import StatsBar from "../components/ui/StatsBar";
import FeaturesSection from "../components/ui/FeatureItem";
import Stepper from "../components/ui/StepItem";
import SuccessStories from "../components/ui/SuccessStories";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div>
      <Header />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current text-sky-500 rotate-180"
      >
        <g fill="currentColor">
          <path d="M0 0v100c20 17.3 40 29.51 80 29.51 51.79 0 74.69-48.57 151.75-48.57 73.72 0 91 54.88 191.56 54.88C543.95 135.8 554 14 665.69 14c109.46 0 98.85 87 188.2 87 70.37 0 69.81-33.73 115.6-33.73 55.85 0 62 39.62 115.6 39.62 58.08 0 57.52-46.59 115-46.59 39.8 0 60 22.48 79.89 39.69V0z"></path>
        </g>
      </svg>
      <section className="bg-sky-500 p-4 ">
        <h3 className="text-3xl font-bold text-white text-center mb-4">
          <span className="text-yellow-300">The world's best</span> And cheapest
          main <span className="text-red-600"> SMM panel</span>
        </h3>
        <LoginForm />
      </section>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 140"
        preserveAspectRatio="none"
        className="fill-current text-sky-500 rotate-180"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path
            d="M853.893,86.998c-38.859,0-58.811-16.455-77.956-35.051c18.295-10.536,40.891-18.276,73.378-18.276 c38.685,0,64.132,12.564,85.489,28.347C916.192,72.012,900.8,86.998,853.893,86.998z M526.265,80.945 c-6.517-0.562-13.599-0.879-21.41-0.879c-70.799,0-91.337,27.229-134.433,35.662c14.901,3.72,32.118,6.07,52.898,6.07 C470.171,121.797,500.34,103.421,526.265,80.945z"
            fill-opacity=".3"
          ></path>
          <path
            d="M663.458,109.671c-67.137,0-80.345-23.824-137.193-28.726C567.086,45.555,597.381,0,665.691,0 c61.857,0,85.369,27.782,110.246,51.947C736.888,74.434,717.459,109.671,663.458,109.671z M217.68,94.163 c55.971,0,62.526,24.026,126.337,24.026c9.858,0,18.508-0.916,26.404-2.461c-57.186-14.278-80.177-48.808-138.659-48.808 c-77.063,0-99.96,48.569-151.751,48.569c-40.006,0-60.008-12.206-80.011-29.506v16.806c20.003,10.891,40.005,21.782,80.011,21.782 C160.014,124.57,158.608,94.163,217.68,94.163z M1200.112,46.292c-57.493,0-56.935,46.595-115.015,46.595 c-53.612,0-59.755-39.618-115.602-39.618c-15.267,0-25.381,3.751-34.69,8.749c36.096,26.675,60.503,62.552,117.342,62.552 c69.249,0,75.951-43.559,147.964-43.559c39.804,0,59.986,10.943,79.888,21.777V85.982 C1260.097,68.771,1239.916,46.292,1200.112,46.292z"
            fill-opacity=".5"
          ></path>
          <path d="M1052.147,124.57c-56.84,0-81.247-35.876-117.342-62.552c-18.613,9.994-34.005,24.98-80.912,24.98 c-38.859,0-58.811-16.455-77.956-35.051c-39.05,22.487-58.479,57.724-112.48,57.724c-67.137,0-80.345-23.824-137.193-28.726 c-25.925,22.475-56.093,40.852-102.946,40.852c-20.779,0-37.996-2.349-52.898-6.07c-7.895,1.545-16.546,2.461-26.404,2.461 c-63.811,0-70.366-24.026-126.337-24.026c-59.072,0-57.665,30.407-137.669,30.407c-40.006,0-60.008-10.891-80.011-21.782V140h1280 v-37.212c-19.903-10.835-40.084-21.777-79.888-21.777C1128.098,81.011,1121.397,124.57,1052.147,124.57z"></path>
        </g>
      </svg>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 140"
        preserveAspectRatio="none"
        className="fill-current text-sky-500 rotate-180"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path d="M0 0v100c20 17.3 40 29.51 80 29.51 51.79 0 74.69-48.57 151.75-48.57 73.72 0 91 54.88 191.56 54.88C543.95 135.8 554 14 665.69 14c109.46 0 98.85 87 188.2 87 70.37 0 69.81-33.73 115.6-33.73 55.85 0 62 39.62 115.6 39.62 58.08 0 57.52-46.59 115-46.59 39.8 0 60 22.48 79.89 39.69V0z"></path>
        </g>
      </svg>
      <section className="bg-sky-500  p-4">
        <YouTubeEmbed />
        <StatsBar />
      </section>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 140"
        preserveAspectRatio="none"
        className="fill-current text-sky-500 rotate-180"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path d="M1280 86c-19.9-17.21-40.08-39.69-79.89-39.69-57.49 0-56.93 46.59-115 46.59-53.61 0-59.76-39.62-115.6-39.62C923.7 53.27 924.26 87 853.89 87c-89.35 0-78.74-87-188.2-87C554 0 543.95 121.8 423.32 121.8c-100.52 0-117.84-54.88-191.56-54.88-77.06 0-100 48.57-151.75 48.57-40 0-60-12.21-80-29.51v54H1280z"></path>
        </g>
      </svg>
      <section>
        <FeaturesSection />
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1280 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current text-white bg-blue-50"
        >
          <g fill="currentColor">
            <path d="M1280 140V0S993.46 140 640 139 0 0 0 0v140z"></path>
          </g>
        </svg>
      </section>
      <section>
        <Stepper />
        <SuccessStories />
        <FAQSection />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
