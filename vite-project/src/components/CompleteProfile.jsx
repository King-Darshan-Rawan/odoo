import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    photo: null,
    skillsOffered: [],
    skillsWanted: [],
    availability: "weekends",
    isPublic: true,
  });

  const skills = [
    "JavaScript", "Python", "Photoshop", "Excel", "Graphic Design", "React",
  ];

  const toggleSkill = (skill, type) => {
    setFormData((prev) => {
      const arr = [...prev[type]];
      const idx = arr.indexOf(skill);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(skill);
      return { ...prev, [type]: arr };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile saved:", formData);
    // TODO: send formData to backend API
    navigate("/dashboard");
  };

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

      {/* Profile Form */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-lg p-8 w-full max-w-lg mx-4 z-10">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Complete Your Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm mb-1">Location (optional)</label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, Country"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm mb-1">Profile Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files[0] })
              }
              className="w-full text-white"
            />
          </div>

          {/* Skills Offered */}
          <div>
            <label className="block text-sm mb-1">Skills Offered</label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill, "skillsOffered")}
                  className={`px-3 py-1 rounded-full border ${
                    formData.skillsOffered.includes(skill)
                      ? "bg-purple-600 border-purple-400"
                      : "bg-white/20 border-gray-400"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <label className="block text-sm mb-1">Skills Wanted</label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill, "skillsWanted")}
                  className={`px-3 py-1 rounded-full border ${
                    formData.skillsWanted.includes(skill)
                      ? "bg-green-600 border-green-400"
                      : "bg-white/20 border-gray-400"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm mb-1">Availability</label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              <option value="weekdays">Weekdays</option>
            </select>
          </div>

          {/* Public / Private */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="h-5 w-5"
            />
            <label className="text-sm">Make Profile Public</label>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
