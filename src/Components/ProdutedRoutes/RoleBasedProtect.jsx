import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function RoleBasedProtect({ allowedRoles }) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // If not logged in
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-6 rounded-xl shadow-lg text-center space-y-4">
          <p className="text-xl font-semibold">🚫 You must be logged in to access this page</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            🔙 Go to Login
          </button>
        </div>
      </div>
    );
  }

  // If role not allowed
  if (!allowedRoles.includes(currentUser.Role)) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-6 rounded-xl shadow-lg text-center space-y-4">
          <p className="text-xl font-semibold">🚫 You are not authorized to view this page</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            🔙 Go Back
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
