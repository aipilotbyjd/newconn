'use client';

import DashboardLayout from '../../components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your n8n instance and workspace preferences</p>
      </div>
    </DashboardLayout>
  );
}
