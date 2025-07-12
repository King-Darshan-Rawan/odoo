import React from "react";
import Snowfall from "react-snowfall";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-purple-900 to-gray-900">
      {/* Snowfall background */}
      <Snowfall
        snowflakeCount={200}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
        color="white"
      />

      {/* Login card */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h1>
        <form className="space-y-4">
          {/* Email / Username */}
          <div>
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
