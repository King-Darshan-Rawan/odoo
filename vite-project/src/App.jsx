import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Login from "./components/Login";
import Signup from "./components/Signup";
import CompleteProfile from "./components/CompleteProfile";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null); // hold user data if logged in

  useEffect(() => {
    // simulate API check for logged-in user
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/check-session");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);

          if (!data.user.isProfileComplete) {
            toast.info("Please complete your profile");
          } else {
            toast.success("Successfully logged in");
          }
        } else {
          toast.warning("Please log in to continue");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            user
              ? user.isProfileComplete
                ? <Navigate to="/dashboard" />
                : <Navigate to="/complete-profile" />
              : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/complete-profile" element={<CompleteProfile user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
