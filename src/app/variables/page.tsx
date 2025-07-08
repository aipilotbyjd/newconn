'use client';

import DashboardLayout from '../../components/DashboardLayout';

export default function Variables() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900">Variables</h1>
        <p className="text-gray-600 mt-2">Manage environment variables for your workflows</p>
      </div>
    </DashboardLayout>
  );
}
