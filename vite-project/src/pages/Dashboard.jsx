import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

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

    fetch("http://localhost:3001/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const openPopup = (user) => setSelectedUser(user);
  const closePopup = () => setSelectedUser(null);

  const sendRequest = () => {
    alert(`Request sent to ${selectedUser.profile.name}`);
    closePopup();
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    alert("Logged out!");
    window.location.href = "/"; // Or navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Snowfall */}
      <canvas
        id="snow-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 bg-opacity-50 rounded-b-xl z-10 relative">
        <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg z-50">
              <button
                onClick={() => {
                  navigate("/requests");
                  setShowMenu(false);
                }}
                className="block px-4 py-2 w-full text-left hover:bg-gray-600"
              >
                All Requests
              </button>
              <button
                onClick={logout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
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
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-4">
              {user.photo ? (
                <img
                  src={`http://localhost:3001${user.photo}`}
                  alt={user.profile.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white">
                  No Photo
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold">{user.profile.name}</h3>
                <p className="text-sm text-green-400">
                  Skills Offered:{" "}
                  {user.skillsOffered.length
                    ? user.skillsOffered.join(", ")
                    : "None"}
                </p>
                <p className="text-sm text-blue-400">
                  Skills Wanted:{" "}
                  {user.skillsWanted.length
                    ? user.skillsWanted.join(", ")
                    : "None"}
                </p>
                {user.availability && (
                  <p className="text-sm text-yellow-400">
                    Availability: {user.availability}
                  </p>
                )}
              </div>
            </div>
            <button
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              onClick={() => openPopup(user)}
            >
              Request
            </button>
          </div>
        ))}
      </div>

      {/* Request Popup */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 relative max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closePopup}
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-4">
              {selectedUser.photo ? (
                <img
                  src={`http://localhost:3001${selectedUser.photo}`}
                  alt={selectedUser.profile.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center text-white">
                  No Photo
                </div>
              )}
              <h3 className="text-xl font-bold">{selectedUser.profile.name}</h3>
              <p className="text-gray-300">{selectedUser.profile.location}</p>
              <p className="text-green-400">
                Skills Offered:{" "}
                {selectedUser.skillsOffered.length
                  ? selectedUser.skillsOffered.join(", ")
                  : "None"}
              </p>
              <p className="text-blue-400">
                Skills Wanted:{" "}
                {selectedUser.skillsWanted.length
                  ? selectedUser.skillsWanted.join(", ")
                  : "None"}
              </p>
              {selectedUser.availability && (
                <p className="text-yellow-400">
                  Availability: {selectedUser.availability}
                </p>
              )}
              <button
                onClick={sendRequest}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
