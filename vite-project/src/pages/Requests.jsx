import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const navigate = useNavigate();
  const [view, setView] = useState("sent"); // 'sent' or 'received'
  const [sentRequests, setSentRequests] = useState([
    { _id: "1", name: "User A" },
    { _id: "2", name: "User B" },
  ]);
  const [receivedRequests, setReceivedRequests] = useState([
    { _id: "3", name: "User C" },
    { _id: "4", name: "User D" },
  ]);

  const withdrawRequest = (id) => {
    setSentRequests(sentRequests.filter((u) => u._id !== id));
  };

  const acceptRequest = (id) => {
    setReceivedRequests(receivedRequests.filter((u) => u._id !== id));
    alert("Request Accepted");
  };

  const declineRequest = (id) => {
    setReceivedRequests(receivedRequests.filter((u) => u._id !== id));
    alert("Request Declined");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">Your Requests</h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Back to Dashboard
        </button>
      </header>

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

      <div className="max-w-2xl mx-auto">
        {view === "sent" ? (
          sentRequests.length ? (
            sentRequests.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center bg-gray-700 rounded-lg p-3 mb-2"
              >
                <span>{user.name}</span>
                <button
                  onClick={() => withdrawRequest(user._id)}
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
          receivedRequests.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-gray-700 rounded-lg p-3 mb-2"
            >
              <span>{user.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => acceptRequest(user._id)}
                  className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineRequest(user._id)}
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
