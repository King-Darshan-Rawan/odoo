import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const navigate = useNavigate();
  const [view, setView] = useState("sent"); // 'sent' or 'received'
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user")); // Assuming user saved on login

  useEffect(() => {
    if (!currentUser) {
      alert("Please log in first!");
      navigate("/");
      return;
    }

    fetch("http://localhost:3001/getrequests")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch requests");
        return res.json();
      })
      .then((data) => {
        const sent = data.filter((req) => req.from === currentUser.username);
        const received = data.filter((req) => req.to === currentUser.username);
        setSentRequests(sent);
        setReceivedRequests(received);
      })
      .catch((err) => console.error("Error fetching requests:", err));
  }, [currentUser, navigate]);

  const updateRequestStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:3001/updaterequest/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update request");

      if (view === "sent") {
        setSentRequests(sentRequests.filter((req) => req._id !== id));
      } else {
        setReceivedRequests(receivedRequests.filter((req) => req._id !== id));
      }

      alert(`Request ${status === "accepted" ? "Accepted" : status === "declined" ? "Declined" : "Withdrawn"}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update request");
    }
  };

  const withdrawRequest = (id) => updateRequestStatus(id, "withdrawn");
  const acceptRequest = (id) => updateRequestStatus(id, "accepted");
  const declineRequest = (id) => updateRequestStatus(id, "declined");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">Your Requests</h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Back to Dashboard
        </button>
      </header>

      {/* Tabs */}
      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setView("sent")}
          className={`px-4 py-2 rounded-lg ${
            view === "sent" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Sent Requests
        </button>
        <button
          onClick={() => setView("received")}
          className={`px-4 py-2 rounded-lg ${
            view === "received" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Received Requests
        </button>
      </div>

      {/* Request List */}
      <div className="max-w-2xl mx-auto">
        {view === "sent" ? (
          sentRequests.length ? (
            sentRequests.map((req) => (
              <div
                key={req._id}
                className="flex justify-between items-center bg-gray-700 rounded-lg p-3 mb-2"
              >
                <div>
                  <p className="font-bold">{req.to}</p>
                  <p className="text-sm text-gray-400">
                    Skill Offered: {req.skillOffered}
                  </p>
                  <p className="text-sm text-gray-400">
                    Skill Wanted: {req.skillWanted}
                  </p>
                  <p className="text-sm text-yellow-400">
                    Status: {req.status}
                  </p>
                </div>
                <button
                  onClick={() => withdrawRequest(req._id)}
                  className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Withdraw
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">No sent requests.</p>
          )
        ) : receivedRequests.length ? (
          receivedRequests.map((req) => (
            <div
              key={req._id}
              className="flex justify-between items-center bg-gray-700 rounded-lg p-3 mb-2"
            >
              <div>
                <p className="font-bold">{req.from}</p>
                <p className="text-sm text-gray-400">
                  Skill Offered: {req.skillOffered}
                </p>
                <p className="text-sm text-gray-400">
                  Skill Wanted: {req.skillWanted}
                </p>
                <p className="text-sm text-yellow-400">
                  Status: {req.status}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => acceptRequest(req._id)}
                  className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineRequest(req._id)}
                  className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No received requests.</p>
        )}
      </div>
    </div>
  );
}
