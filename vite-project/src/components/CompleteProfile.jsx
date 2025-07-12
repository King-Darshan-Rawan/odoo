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

  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  const addSkill = (skill, type) => {
    if (skill && !formData[type].includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], skill],
      }));
    }
  };

  const removeSkill = (skill, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }
    data.append("skillsOffered", JSON.stringify(formData.skillsOffered));
    data.append("skillsWanted", JSON.stringify(formData.skillsWanted));
    data.append("availability", formData.availability);
    data.append("isPublic", formData.isPublic);

    const response = await fetch("/api/profile/complete-profile", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      navigate("/dashboard");
    } else {
      console.error("Failed to save profile");
    }
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
      <canvas
        id="snow-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

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
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillOffered}
                onChange={(e) => setNewSkillOffered(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-3 py-2 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={() => {
                  addSkill(newSkillOffered, "skillsOffered");
                  setNewSkillOffered("");
                }}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skillsOffered.map((skill) => (
                <span
                  key={skill}
                  onClick={() => removeSkill(skill, "skillsOffered")}
                  className="px-3 py-1 bg-purple-600 rounded-full text-sm cursor-pointer"
                >
                  {skill} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <label className="block text-sm mb-1">Skills Wanted</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillWanted}
                onChange={(e) => setNewSkillWanted(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-3 py-2 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={() => {
                  addSkill(newSkillWanted, "skillsWanted");
                  setNewSkillWanted("");
                }}
                className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skillsWanted.map((skill) => (
                <span
                  key={skill}
                  onClick={() => removeSkill(skill, "skillsWanted")}
                  className="px-3 py-1 bg-green-600 rounded-full text-sm cursor-pointer"
                >
                  {skill} ✕
                </span>
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
              <option value="weekdays">Weekdays</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
              <option value="all_days">All Days</option>
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
