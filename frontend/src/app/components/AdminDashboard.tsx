import { useState } from 'react';
import {
  Shield,
  LogOut,
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  MapPin,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const adminStats = [
    { icon: Users, label: 'Total Users', value: '1,284', trend: '+12%', color: 'teal' },
    { icon: Activity, label: 'Active Today', value: '842', trend: '+8%', color: 'emerald' },
    { icon: FileText, label: 'Events Created', value: '56', trend: '+24%', color: 'green' },
    { icon: CheckCircle, label: 'Completed Goals', value: '342', trend: '+18%', color: 'lime' },
  ];

  const recentUsers = [
    { name: 'Sarah Johnson', email: 'sarah@email.com', joined: '2 hours ago', status: 'active' },
    { name: 'Mike Chen', email: 'mike@email.com', joined: '5 hours ago', status: 'active' },
    { name: 'Emma Davis', email: 'emma@email.com', joined: '1 day ago', status: 'pending' },
    { name: 'James Wilson', email: 'james@email.com', joined: '2 days ago', status: 'active' },
  ];

  const pendingApprovals = [
    { type: 'Event', name: 'River Cleanup Drive', submittedBy: 'Green Warriors', status: 'pending' },
    { type: 'Challenge', name: 'Zero Waste Week', submittedBy: 'Eco Champions', status: 'pending' },
    { type: 'Event', name: 'Tree Planting Day', submittedBy: 'Nature Lovers', status: 'review' },
  ];

  const platformActivity = [
    { metric: 'Total Recycling Logs', value: '12,456', change: '+15%' },
    { metric: 'Community Events', value: '234', change: '+8%' },
    { metric: 'Eco Points Awarded', value: '456k', change: '+22%' },
    { metric: 'Active Challenges', value: '18', change: '+3%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      {/* Admin Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-teal-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-teal-900">EcoTrack Admin</h1>
                <p className="text-xs text-gray-600">System Management</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveSection('overview')}
                className={`transition-colors ${activeSection === 'overview' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveSection('users')}
                className={`transition-colors ${activeSection === 'users' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveSection('content')}
                className={`transition-colors ${activeSection === 'content' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveSection('analytics')}
                className={`transition-colors ${activeSection === 'analytics' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
              >
                Analytics
              </button>
            </nav>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl text-teal-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Manage and monitor the EcoTrack platform</p>
        </div>

        {/* Alert Banner */}
        <div className="mb-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium">3 items require your attention</p>
              <p className="text-sm text-teal-100">Review pending approvals and user reports</p>
            </div>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm">
              Review Now
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="flex items-center gap-1 text-teal-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Users */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-teal-900">Recent Users</h3>
                <button className="text-teal-600 hover:text-teal-700 text-sm transition-colors">
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{user.joined}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        user.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-teal-900">Platform Activity</h3>
                <button className="flex items-center gap-2 px-3 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {platformActivity.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p className="text-sm text-gray-600 mb-2">{item.metric}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl text-gray-900">{item.value}</p>
                      <p className="text-sm text-emerald-600">{item.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Approvals & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-teal-600" />
                <h3 className="text-xl text-teal-900">Pending Approvals</h3>
              </div>

              <div className="space-y-3">
                {pendingApprovals.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">{item.type}</p>
                        <p className="text-sm text-gray-900 font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">by {item.submittedBy}</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                        {item.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs">
                        Approve
                      </button>
                      <button className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-xs">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Admin Actions */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-xl mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: Users, label: 'Manage Users' },
                  { icon: Calendar, label: 'Create Event' },
                  { icon: FileText, label: 'Add Challenge' },
                  { icon: Settings, label: 'System Settings' },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <action.icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
              <h3 className="text-lg text-teal-900 mb-4">System Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'Server Status', status: 'Operational', color: 'emerald' },
                  { label: 'Database', status: 'Healthy', color: 'emerald' },
                  { label: 'API Response', status: '98ms avg', color: 'teal' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`flex items-center gap-2 text-sm text-${item.color}-600`}>
                      <div className={`w-2 h-2 bg-${item.color}-500 rounded-full animate-pulse`}></div>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
