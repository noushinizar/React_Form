
import React, { useState, useEffect } from 'react';

export default function Table() {
  const [savedData, setSavedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortData, setSortData] = useState({ key: 'username', direction: 'ascending' });

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
  

  return (
    <div className="p-4">
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
            <th  className="cursor-pointer border border-gray-500 px-6 py-3">
              Password
            </th>
            <th  className="cursor-pointer border border-gray-500 px-6 py-3">
              mobile
            </th>
            <th  className="cursor-pointer border border-gray-500 px-6 py-3">
              gender
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
