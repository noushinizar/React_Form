import React from 'react';

export default function Table() {
  const savedData = JSON.parse(localStorage.getItem('formData')) || []; 

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Saved Data</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-500 px-6 py-3">Username</th>
            <th className="border border-gray-500 px-6 py-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {savedData.length > 0 ? (
            savedData.map((data, index) => (
              <tr key={index}>
                <td className="border border-gray-500 px-6 py-3">{data.username}</td>
                <td className="border border-gray-500 px-6 py-3">{data.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

