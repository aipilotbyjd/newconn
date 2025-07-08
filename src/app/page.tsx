'use client';

import DashboardLayout from '../components/DashboardLayout';

const StatCard = ({ icon, title, value, subtitle, change, trend }: any) => {
  return (
    <div className="bg-blue-50/50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <span className="text-2xl">{icon}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="text-xl">⋮</span>
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {change && (
          <p className={`text-sm font-medium mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
    </div>
  );
};

const EmailItem = ({ avatar, name, subject, time }: any) => (
  <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
      {avatar}
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-900">{name}</p>
      <p className="text-sm text-gray-600">{subject}</p>
    </div>
    <p className="text-sm text-gray-500">{time}</p>
  </div>
);

const TodoItem = ({ icon, text, time }: any) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
      <span className="text-lg">{icon}</span>
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-900">{text}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Good morning, James!</h1>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xl">📅</span>
            </button>
            <button className="p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xl">🔔</span>
            </button>
            <button className="p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xl">🔔</span>
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold">
              J
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon="💳"
            title="Your bank balance"
            value="$143,624"
            change="18.7%"
            trend="up"
          />
          <StatCard 
            icon="🔍"
            title="Uncategorized transactions"
            value="12"
          />
          <StatCard 
            icon="👥"
            title="Employees working today"
            value="7"
          />
          <StatCard 
            icon="💳"
            title="This week's card spending"
            value="$3,287.49"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Revenue & Recent Emails */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Revenue</h3>
                  <p className="text-sm text-gray-500">Last 7 days VS prior week</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-black rounded-full mr-1"></span>
                    Feb 14: $18,334.78
                  </span>
                  <span className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-1"></span>
                    Feb 15: $12,765.24
                  </span>
                </div>
              </div>
              <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Revenue Chart Placeholder</p>
              </div>
            </div>

            {/* Recent Emails */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent emails</h3>
              <div className="space-y-2">
                <EmailItem 
                  avatar="HM"
                  name="Hannah Morgan"
                  subject="Meeting scheduled"
                  time="1:24 PM"
                />
                <EmailItem 
                  avatar="MC"
                  name="Megan Clark"
                  subject="Update on marketing campaign"
                  time="12:32 PM"
                />
                <EmailItem 
                  avatar="BW"
                  name="Brandon Williams"
                  subject="Designly 2.0 is about to launch"
                  time="Yesterday at 8:57 PM"
                />
                <EmailItem 
                  avatar="RS"
                  name="Reid Smith"
                  subject="My friend Julie loves Dappr!"
                  time="Yesterday at 8:49 PM"
                />
              </div>
            </div>
          </div>

          {/* Right Column - New Clients, Invoices, Todo, Board Meeting */}
          <div className="space-y-6">
            {/* New Clients & Invoices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">New clients</h3>
                <p className="text-4xl font-bold text-gray-900">54</p>
                <p className="text-sm text-green-600 font-medium">+18.7%</p>
              </div>
              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Invoices overdue</h3>
                <p className="text-4xl font-bold text-gray-900">6</p>
                <p className="text-sm text-red-600 font-medium">+2.7%</p>
              </div>
            </div>

            {/* Formation Status */}
            <div className="bg-black text-white rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4">Formation status</h3>
              <p className="text-sm text-gray-400 mb-4">In progress</p>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
                <div className="bg-white h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm mb-4">Estimated processing<br />4-5 business days</p>
              <button className="w-full bg-white text-black py-3 rounded-2xl font-medium hover:bg-gray-100 transition-colors">
                View status
              </button>
            </div>

            {/* Your to-Do list */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your to-Do list</h3>
              <div className="space-y-2">
                <TodoItem 
                  icon="📋"
                  text="Run payroll"
                  time="Mar 4 at 6:00 pm"
                />
                <TodoItem 
                  icon="⏰"
                  text="Review time off request"
                  time="Mar 7 at 6:00 pm"
                />
                <TodoItem 
                  icon="✍️"
                  text="Sign board resolution"
                  time="Mar 12 at 6:00 pm"
                />
                <TodoItem 
                  icon="💬"
                  text="Finish onboarding Tony"
                  time="Mar 12 at 6:00 pm"
                />
              </div>
            </div>

            {/* Board Meeting */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-3xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">Board meeting</h3>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              </div>
              <p className="text-sm opacity-90 mb-4">Feb 22 at 6:00 PM</p>
              <p className="text-sm opacity-80">
                You have been invited to attend a<br />
                meeting of the Board Directors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

