import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadMomentPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    media: "",
    user: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://s86-tfis-hilarious-moments.onrender.com/api/moments", formData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error uploading moment:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 px-6 py-12 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
          Upload a New Moment
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-pink-50"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-pink-50"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-pink-50"
          >
            <option value="">Select Category</option>
            <option value="Slapstick">Slapstick</option>
            <option value="Verbal Comedy">Verbal Comedy</option>
            <option value="Situational">Situational</option>
            <option value="Parody">Parody</option>
            <option value="Dark Humor">Dark Humor</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="text"
            name="media"
            placeholder="YouTube or Image URL"
            value={formData.media}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-pink-50"
          />
          <input
            type="text"
            name="user"
            placeholder="Your name or nickname"
            value={formData.user}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-pink-50"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-3 rounded-xl transition"
          >
            Submit Moment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMomentPage;
