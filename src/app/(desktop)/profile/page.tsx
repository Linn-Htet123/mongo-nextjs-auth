"use client";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/user/me");
      setData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setError("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <hr className="mb-4" />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!data ? (
          <h2 className="text-lg mb-4">Nothing</h2>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Username</h3>
              <p className="text-gray-700">{data.username}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-gray-700">{data.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={getUserDetails}
          className={`w-full mt-4 py-2 px-4 rounded-md shadow-sm text-white ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Details"}
        </button>
      </div>
    </div>
  );
}
