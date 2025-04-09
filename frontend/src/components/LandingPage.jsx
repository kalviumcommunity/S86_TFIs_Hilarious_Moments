import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 drop-shadow-md">
          TFI’s Hilarious Moments
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Dive into the funniest scenes from Telugu films! Watch, rate, comment, and share the moments that made you laugh the hardest.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="text-lg px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl shadow-md">
            Explore Moments
          </button>
          <button className="text-lg px-6 py-3 rounded-2xl border border-pink-500 text-pink-600 hover:bg-pink-100">
            Submit a Scene
          </button>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <FeatureCard
          title="Scene Compilation"
          description="Browse a curated list of the most hilarious TFI scenes."
        />
        <FeatureCard
          title="Search & Filter"
          description="Quickly find what you’re looking for by movie, actor, or genre."
        />
        <FeatureCard
          title="Engage with the Community"
          description="Rate, comment, and share your favorite moments."
        />
        <FeatureCard
          title="Bookmark Scenes"
          description="Save the best laughs to revisit later anytime."
        />
      </div>

      <footer className="mt-24 text-center text-sm text-gray-500">
        Built with ❤️ using React, Node.js, and MongoDB
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-xl font-semibold text-pink-600 mb-2">
      {title}
    </h3>
    <p>{description}</p>
  </div>
);

export default LandingPage;
