import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
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
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      if (response.data.success) {
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-800 px-6 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-pink-300 bg-pink-50"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-pink-300 bg-pink-50"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-pink-300 bg-pink-50"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-3 rounded-xl transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default signup;
