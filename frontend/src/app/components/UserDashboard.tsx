import { useState } from 'react';
import {
  Leaf,
  LogOut,
  TrendingUp,
  Award,
  Users,
  Recycle,
  Droplet,
  Zap,
  Target,
  Calendar,
  MapPin,
  Heart
} from 'lucide-react';

interface UserDashboardProps {
  onLogout: () => void;
}

export function UserDashboard({ onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Recycle, label: 'Items Recycled', value: '342', trend: '+12%', color: 'emerald' },
    { icon: Droplet, label: 'Water Saved', value: '1.2k L', trend: '+8%', color: 'teal' },
    { icon: Zap, label: 'Energy Saved', value: '456 kWh', trend: '+15%', color: 'green' },
    { icon: Award, label: 'Eco Points', value: '2,840', trend: '+24%', color: 'lime' },
  ];

  const recentActivities = [
    { icon: Recycle, action: 'Recycled 5 plastic bottles', time: '2 hours ago', points: '+25' },
    { icon: Droplet, action: 'Completed water conservation challenge', time: '5 hours ago', points: '+50' },
    { icon: Users, action: 'Joined Beach Cleanup event', time: '1 day ago', points: '+100' },
    { icon: Heart, action: 'Donated to tree planting campaign', time: '2 days ago', points: '+75' },
  ];

  const upcomingEvents = [
    { title: 'Community Garden Day', date: 'May 12', location: 'Central Park', attendees: 24 },
    { title: 'Beach Cleanup Drive', date: 'May 15', location: 'Sunset Beach', attendees: 42 },
    { title: 'Recycling Workshop', date: 'May 18', location: 'Community Center', attendees: 18 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <h1 className="text-2xl text-emerald-900">EcoTrack</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`transition-colors ${activeTab === 'overview' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`transition-colors ${activeTab === 'activities' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
              >
                Activities
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`transition-colors ${activeTab === 'events' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`transition-colors ${activeTab === 'community' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
              >
                Community
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl text-emerald-900 mb-2">Welcome back, EcoWarrior! 🌱</h2>
          <p className="text-gray-600">Here's your sustainability impact this month</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
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
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-emerald-900">Recent Activities</h3>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm transition-colors">
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <activity.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm">
                      {activity.points}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm text-gray-700 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Recycle, label: 'Log Recycling' },
                    { icon: Droplet, label: 'Water Usage' },
                    { icon: Zap, label: 'Energy Track' },
                    { icon: Target, label: 'Set Goal' },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <action.icon className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
              <h3 className="text-xl text-emerald-900 mb-6">Upcoming Events</h3>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Calendar className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
                Browse All Events
              </button>
            </div>

            {/* Monthly Challenge */}
            <div className="mt-6 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-xl mb-3">Monthly Challenge</h3>
              <p className="text-emerald-100 text-sm mb-4">
                Reduce single-use plastics by 50%
              </p>
              <div className="bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2 w-2/3"></div>
              </div>
              <p className="text-sm text-emerald-100">67% complete</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
