import { useState } from 'react';
import { Leaf, Users, Shield, Sparkles } from 'lucide-react';

interface LoginFormProps {
  onLogin: (type: 'user' | 'admin') => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [selectedType, setSelectedType] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovering, setIsHovering] = useState<'user' | 'admin' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="text-center md:text-left space-y-6 p-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Leaf className="w-10 h-10 text-emerald-600" />
              <h1 className="text-4xl text-emerald-900">EcoTrack</h1>
            </div>

            <p className="text-xl text-teal-800 leading-relaxed">
              Building a sustainable future together through community action and environmental awareness
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-md transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <h3 className="text-emerald-800">Track Impact</h3>
                </div>
                <p className="text-sm text-gray-600">Monitor your environmental contributions</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-md transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-emerald-800">Connect</h3>
                </div>
                <p className="text-sm text-gray-600">Join eco-conscious communities</p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-emerald-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-emerald-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your sustainability journey</p>
            </div>

            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setSelectedType('user')}
                onMouseEnter={() => setIsHovering('user')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform ${
                  selectedType === 'user'
                    ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <Users className={`w-8 h-8 mx-auto mb-2 transition-colors ${
                  selectedType === 'user' || isHovering === 'user' ? 'text-emerald-600' : 'text-gray-400'
                }`} />
                <div className="text-sm text-gray-700">User</div>
                {selectedType === 'user' && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedType('admin')}
                onMouseEnter={() => setIsHovering('admin')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform ${
                  selectedType === 'admin'
                    ? 'border-teal-500 bg-teal-50 scale-105 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
                }`}
              >
                <Shield className={`w-8 h-8 mx-auto mb-2 transition-colors ${
                  selectedType === 'admin' || isHovering === 'admin' ? 'text-teal-600' : 'text-gray-400'
                }`} />
                <div className="text-sm text-gray-700">Admin</div>
                {selectedType === 'admin' && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                )}
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${
                  selectedType === 'admin'
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                }`}
              >
                Sign In as {selectedType === 'admin' ? 'Admin' : 'User'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
