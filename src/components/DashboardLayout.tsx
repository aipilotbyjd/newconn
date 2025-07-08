'use client';

import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Sidebar />
      <main className="ml-16 min-h-screen transition-all duration-300">
        <div className="px-6 py-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
