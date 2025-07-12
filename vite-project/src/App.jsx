import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup"; 
// import Dashboard from "./pages/Dashboard";
import CompleteProfile from "./components/CompleteProfile";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/complete-profile" element={<CompleteProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
