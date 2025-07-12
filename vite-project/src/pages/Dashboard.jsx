import React, { useEffect } from "react";

export default function Dashboard() {
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

  const users = [
    {
      name: "Marc Demo",
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Photoshop", "Graphic Designer"],
      rating: 3.9,
    },
    {
      name: "Michell",
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Photoshop", "Graphic Designer"],
      rating: 2.5,
    },
    {
      name: "Joe Wills",
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Photoshop", "Graphic Designer"],
      rating: 4.0,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Snowfall canvas */}
      <canvas
        id="snow-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 bg-opacity-50 rounded-b-xl z-10 relative">
        <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
        <div className="flex gap-6 items-center">
          <h2 className="text-lg underline">Swap Requests</h2>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center my-6 z-10 relative">
        <select className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none">
          <option>Availability</option>
          <option>Available</option>
          <option>Busy</option>
        </select>
        <div className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
          />
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-r-lg">
            Search
          </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="px-4 grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-3xl mx-auto">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white">
                Profile
              </div>
              <div>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-sm text-green-400">
                  Skills Offered =&gt;{" "}
                  {user.skillsOffered.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-gray-800 text-white px-2 py-1 rounded-full text-xs mx-1"
                    >
                      {skill}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-blue-400">
                  Skill Wanted =&gt;{" "}
                  {user.skillsWanted.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-gray-800 text-white px-2 py-1 rounded-full text-xs mx-1"
                    >
                      {skill}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
                Request
              </button>
              <p className="text-sm">Rating {user.rating}/5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
