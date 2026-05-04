import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Leaf, Users, Recycle, TreePine, Zap } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(username, password, activeTab);
    if (success) {
      navigate(activeTab === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              EcoTrack
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Community Sustainability Platform
          </h2>

          <p className="text-lg text-gray-600">
            Track your green actions, earn points, and make a real impact on our planet together.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 space-y-2">
              <Recycle className="w-8 h-8 text-emerald-600" />
              <p className="text-sm font-semibold text-gray-700">Track Activities</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 space-y-2">
              <TreePine className="w-8 h-8 text-green-600" />
              <p className="text-sm font-semibold text-gray-700">Earn Points</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 space-y-2">
              <Users className="w-8 h-8 text-teal-600" />
              <p className="text-sm font-semibold text-gray-700">Join Community</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 space-y-2">
              <Zap className="w-8 h-8 text-yellow-600" />
              <p className="text-sm font-semibold text-gray-700">Make Impact</p>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your sustainability journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'user' | 'admin')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user">User Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-username">Username</Label>
                    <Input
                      id="user-username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <p className="text-xs text-gray-500">
                    New user? Just enter any username and password to create an account!
                  </p>
                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    Sign In as User
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Admin Username</Label>
                    <Input
                      id="admin-username"
                      placeholder="Enter admin username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <p className="text-xs text-gray-500">
                    Demo credentials: admin / admin123
                  </p>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                    Sign In as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
