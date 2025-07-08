'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: '🏠', path: '/', name: 'Dashboard' },
    { icon: '⚡', path: '/workflows', name: 'Workflows' },
    { icon: '📊', path: '/analytics', name: 'Analytics' },
    { icon: '📧', path: '/messages', name: 'Messages' },
    { icon: '🔐', path: '/credentials', name: 'Credentials' },
    { icon: '👥', path: '/team', name: 'Team' },
    { icon: '⚙️', path: '/settings', name: 'Settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-black text-white flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-10">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
          <span className="text-black font-bold text-lg">D</span>
        </div>
        <p className="text-xs mt-2 text-center">dappr</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 w-full">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`w-full h-16 flex items-center justify-center text-2xl hover:bg-gray-800 transition-colors relative ${
              pathname === item.path ? 'bg-gray-800' : ''
            }`}
            title={item.name}
          >
            <span>{item.icon}</span>
            {pathname === item.path && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Icons */}
      <div className="space-y-4">
        <button className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-800 rounded-lg transition-colors">
          ⚡
        </button>
        <button className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-800 rounded-lg transition-colors">
          ⚙️
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
