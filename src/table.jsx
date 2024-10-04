
import React, { useState, useEffect } from 'react';
import EditPage from './editpage';

export default function Table() {
  const [savedData, setSavedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortData, setSortData] = useState({ key: 'username', direction: 'ascending' });
  const [editingIndex, setEditingIndex] = useState(null); // Track the index being edited
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false); // Track if in view mode
  const [viewData, setViewData] = useState(null); // Data to be viewed

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData')) || [];
    setSavedData(data);
    setFilteredData(data);
  }, []);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = savedData.filter(
      (item) =>
        item.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };


  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortData.key === key && sortData.direction === 'ascending') {
      direction = 'descending';
    }
    setSortData({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };
  const handleDelete = (index) => {
    const updatedData = [...savedData];
    updatedData.splice(index, 1); // Remove the selected item
    setSavedData(updatedData);
    setFilteredData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData)); // Update localStorage
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsEditing(true); // Show the edit form
  };

  const handleUpdate = (updatedItem) => {
    const updatedData = [...savedData];
    updatedData[editingIndex] = updatedItem; // Update the specific item
    setSavedData(updatedData);
    setFilteredData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setIsEditing(false); // Return to the table view
  };

  const handleView = (index) => {
    setViewData(savedData[index]); // Set the data to be viewed
    setIsViewing(true); // Show the view modal or section
  };
  return (
    <div className="p-4 ">
      {isEditing ? (
        <EditPage
          initialData={savedData[editingIndex]}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : isViewing ? (
        <div className="view-section">
          <h3 className="text-xl font-bold">View Details</h3>
          <p><strong>Username:</strong> {viewData.username}</p>
          <p><strong>Email:</strong> {viewData.email}</p>
          <p><strong>Password:</strong> {viewData.password}</p>
          <p><strong>Mobile:</strong> {viewData.mobile}</p>
          <p><strong>Gender:</strong> {viewData.gender}</p>
          <button
            onClick={() => setIsViewing(false)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-center">Saved Data</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by username or email"
            className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th
                  className="cursor-pointer border border-gray-500 px-6 py-3"
                  onClick={() => handleSort('username')}
                >
                  Username {sortData.key === 'username' && (sortData.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th
                  className="cursor-pointer border border-gray-500 px-6 py-3"
                  onClick={() => handleSort('email')}
                >
                  Email
                  {sortData.key === 'email' && (sortData.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th className="cursor-pointer border border-gray-500 px-6 py-3">
                  Password
                </th>
                <th className="cursor-pointer border border-gray-500 px-6 py-3">
                  mobile
                </th>
                <th className="cursor-pointer border border-gray-500 px-6 py-3">
                  gender
                </th>
                <th className="cursor-pointer border border-gray-500 px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-500 px-6 py-3">{data.username}</td>
                    <td className="border border-gray-500 px-6 py-3">{data.email}</td>
                    <td className="border border-gray-500 px-6 py-3">{data.password}</td>
                    <td className="border border-gray-500 px-6 py-3">{data.mobile}</td>
                    <td className="border border-gray-500 px-6 py-3">{data.gender}</td>
                    <td className="border border-gray-500 px-6 py-3 ">
                      <button
                        onClick={() => handleView(index)}
                        className="bg-blue-500 w-[60px] text-white px-1 py-1 rounded-md">
                        View
                      </button>
                      &nbsp;
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-green-500 w-[60px] text-white px-1 py-1 rounded-md">
                        Edit
                      </button>
                      &nbsp;
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 w-[60px] text-white px-1 py-1 rounded-md"
                      >
                        Delete
                      </button>

                    </td>
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
        </>)
      }
    </div>

  );
}
