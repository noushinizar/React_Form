import React, { useState } from 'react';

export default function EditPage({ initialData, onUpdate, onCancel }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}  className="bg-white p-12 rounded-lg shadow-lg w-[400px]  flex items-center justify-center flex-col gap-[20px] ">
      <div>
        <label className="block mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div>
        <label className="block mb-1">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div>
        <label className="block mb-1">Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

