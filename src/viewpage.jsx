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
    <div className="bg-white p-12 rounded-lg shadow-lg w-[400px]  flex items-center justify-center flex-col gap-[20px] ">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">View Details</h2>
  
  <div className="space-y-4">
    <p className="text-gray-600 flex gap-[20px]">
      <strong className="font-semibold text-gray-800">Username:</strong> {viewData.username}
    </p>
    <p className="text-gray-600 flex gap-[20px]">
      <strong className="font-semibold text-gray-800">Email:</strong> {viewData.email}
    </p>
    <p className="text-gray-600 flex gap-[20px]">
      <strong className="font-semibold text-gray-800">Password:</strong> {viewData.password}
    </p>
    <p className="text-gray-600 flex gap-[20px]">
      <strong className="font-semibold text-gray-800">Mobile:</strong> {viewData.mobile}
    </p>
    <p className="text-gray-600 flex gap-[20px]">
      <strong className="font-semibold text-gray-800">Gender:</strong> {viewData.gender}
    </p>
    <p className="text-gray-600 ">
      <strong className="font-semibold text-gray-800">Country:</strong> {viewData.country}
    </p>
  </div>

  <button
    onClick={() => navigate(-1)} // Go back to the previous page
    className="block w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600 transition duration-200"
  >
    Back
  </button>
</div>

  );
}

