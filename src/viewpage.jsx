import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ViewPage() {
  const location = useLocation(); // Get the passed state
  const navigate = useNavigate();
  const { viewData } = location.state || {}; // Extract viewData from location state

  if (!viewData) {
    return <p>No data available for viewing</p>; 
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">View Details</h2>
      <p><strong>Username:</strong> {viewData.username}</p>
      <p><strong>Email:</strong> {viewData.email}</p>
      <p><strong>Password:</strong> {viewData.password}</p>
      <p><strong>Mobile:</strong> {viewData.mobile}</p>
      <p><strong>Gender:</strong> {viewData.gender}</p>
      <p><strong>Country:</strong> {viewData.country}</p>
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Back
      </button>
    </div>
  );
}

