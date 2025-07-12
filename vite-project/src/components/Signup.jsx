import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit handler
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const { name, username, email, password, confirmPassword } = formData;

  if (!name || !username || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });
console.log(res);
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      toast.error(data.msg || "Registration failed");
      return;
    }

    toast.success("Registration successful!");
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);

    setTimeout(() => navigate("/complete-profile"), 1500);
  } catch (err) {
    console.error(err.message);
    toast.error("Server error");
  }
};


  // Snowfall effect
  useEffect(() => {
    const canvas = document.getElementById("snow-canvas");
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let snowflakes = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 1,
      d: Math.random() * 100,
    }));

    function drawSnowflakes() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.beginPath();
      snowflakes.forEach((flake) => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
      });
      ctx.fill();
      moveSnowflakes();
    }

    let angle = 0;
    function moveSnowflakes() {
      angle += 0.01;
      snowflakes.forEach((flake) => {
        flake.y += Math.cos(angle + flake.d) + 1 + flake.r / 2;
        flake.x += Math.sin(angle) * 2;

        if (flake.y > height) {
          flake.y = 0;
          flake.x = Math.random() * width;
        }
      });
    }

    function update() {
      drawSnowflakes();
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-purple-900 to-gray-900">
      {/* Snowfall canvas */}
      <canvas
        id="snow-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Signup card */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-lg p-8 w-full max-w-md mx-4 z-10">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe123"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Error or Success */}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Extra Links */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}