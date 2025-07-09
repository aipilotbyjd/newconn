'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    timezone: 'UTC',
    language: 'English',
    notifications: true,
    twoFactor: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6d5a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6d5a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6d5a]"
                >
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6d5a]"
                >
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                  <option>CET</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="rounded border-gray-300 text-[#ff6d5a] focus:ring-[#ff6d5a]"
              />
              <span className="ml-2 text-sm text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="twoFactor"
                checked={formData.twoFactor}
                onChange={handleChange}
                className="rounded border-gray-300 text-[#ff6d5a] focus:ring-[#ff6d5a]"
              />
              <span className="ml-2 text-sm text-gray-700">Two-factor authentication</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#ff6d5a] text-white rounded-md hover:bg-[#ff5242]">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
