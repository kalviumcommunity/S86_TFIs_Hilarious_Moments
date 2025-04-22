import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboardpage = () => {
  const [moments, setMoments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    media: "",
    user: "",
  });

  const categories = [
    "All",
    "Slapstick",
    "Sarcastic Dialogues",
    "Comedic Chase",
    "Funny Dance Moves",
  ];

  useEffect(() => {
    fetchMoments();
  }, []);

  const fetchMoments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/moments");
      setMoments(res.data);
    } catch (err) {
      console.error("Error fetching moments:", err);
      setMoments([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      category: selectedCategory,
    };
    try {
      await axios.post("http://localhost:5000/api/moments", payload);
      fetchMoments();
      setFormData({
        title: "",
        description: "",
        category: "",
        media: "",
        user: "",
      });
    } catch (err) {
      console.error("Error uploading moment:", err);
    }
  };

  const filteredMoments =
    selectedCategory === "All"
      ? moments
      : moments.filter((moment) => moment.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-5xl font-extrabold text-pink-600 text-center drop-shadow">
          Comedy Scene Dashboard
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold shadow-md ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-600 border border-pink-400 hover:bg-pink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Form */}
        {selectedCategory !== "All" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">
              Submit a Scene to "{selectedCategory}"
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Scene Title"
                required
                className="w-full p-3 rounded-lg bg-pink-50 border border-pink-200"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Brief Description"
                required
                className="w-full p-3 rounded-lg bg-pink-50 border border-pink-200"
              />
              <input
                name="media"
                value={formData.media}
                onChange={handleFormChange}
                placeholder="YouTube or Image URL"
                className="w-full p-3 rounded-lg bg-pink-50 border border-pink-200"
              />
              <input
                name="user"
                value={formData.user}
                onChange={handleFormChange}
                placeholder="Your name or nickname"
                required
                className="w-full p-3 rounded-lg bg-pink-50 border border-pink-200"
              />
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl"
              >
                Submit Scene
              </button>
            </form>
          </div>
        )}

        {/* Display Moments */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredMoments.length > 0 ? (
            filteredMoments.map((moment) => (
              <div
                key={moment._id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-lg font-bold text-pink-600 mb-1">
                  {moment.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {moment.description}
                </p>
                {moment.media && (
                  <div className="mt-2">
                    {moment.media.includes("youtube") ? (
                      <iframe
                        className="w-full aspect-video rounded-xl"
                        src={moment.media.replace("watch?v=", "embed/")}
                        title={moment.title}
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        src={moment.media}
                        alt={moment.title}
                        className="w-full rounded-xl"
                      />
                    )}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2 italic">
                  Category: {moment.category}
                </div>
                <div className="text-xs text-gray-400">By: {moment.user}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No moments to show.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboardpage;
