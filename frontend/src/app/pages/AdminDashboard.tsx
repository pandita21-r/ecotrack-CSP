import { useState, useEffect } from 'react';
import { GreenAct, User } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ScrollArea } from '../components/ui/scroll-area';
import { Progress } from '../components/ui/progress';
import { Users, Activity, Award, TrendingUp, Leaf, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const [activities, setActivities] = useState<GreenAct[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalActivities: 0,
    totalPoints: 0,
    averagePoints: 0,
    totalCO2Saved: 0,
    activeUsers: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allActivities = JSON.parse(localStorage.getItem('ecotrack_activities') || '[]');
    const allUsers = JSON.parse(localStorage.getItem('ecotrack_users') || '[]');

    // Sort by timestamp
    allActivities.sort((a: GreenAct, b: GreenAct) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setActivities(allActivities);
    setUsers(allUsers);

    const totalPoints = allActivities.reduce((sum: number, act: GreenAct) => sum + act.points, 0);
    const totalCO2 = allActivities.reduce((sum: number, act: GreenAct) => sum + act.co2Saved, 0);

    // Active users in last 7 days
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const activeUserIds = new Set(
      allActivities
        .filter((act: GreenAct) => new Date(act.timestamp).getTime() > weekAgo)
        .map((act: GreenAct) => act.userId)
    );

    setStats({
      totalUsers: allUsers.length,
      totalActivities: allActivities.length,
      totalPoints,
      averagePoints: allUsers.length > 0 ? Math.round(totalPoints / allUsers.length) : 0,
      totalCO2Saved: totalCO2,
      activeUsers: activeUserIds.size
    });
  };

  const getCategoryStats = () => {
    const categoryCounts = activities.reduce((acc, act) => {
      acc[act.category] = (acc[act.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
      percentage: activities.length > 0 ? ((count / activities.length) * 100).toFixed(1) : '0'
    }));
  };

  const categoryEmojis: Record<string, string> = {
    recycling: '♻️',
    transport: '🚌',
    planting: '🌳',
    energy: '⚡',
    water: '💧',
    food: '🥗',
    waste: '🗑️'
  };

  const categoryColors: Record<string, string> = {
    recycling: 'bg-blue-100 text-blue-700',
    transport: 'bg-green-100 text-green-700',
    planting: 'bg-emerald-100 text-emerald-700',
    energy: 'bg-yellow-100 text-yellow-700',
    water: 'bg-cyan-100 text-cyan-700',
    food: 'bg-orange-100 text-orange-700',
    waste: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardDescription className="text-blue-100">Total Users</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Users className="w-6 h-6" />
              {stats.totalUsers}
            </CardTitle>
            <p className="text-sm text-blue-100">{stats.activeUsers} active this week</p>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardDescription className="text-green-100">Total Activities</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Activity className="w-6 h-6" />
              {stats.totalActivities}
            </CardTitle>
            <p className="text-sm text-green-100">
              {stats.totalUsers > 0 ? (stats.totalActivities / stats.totalUsers).toFixed(1) : 0} avg per user
            </p>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardDescription className="text-yellow-100">Total Points</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Award className="w-6 h-6" />
              {stats.totalPoints.toLocaleString()}
            </CardTitle>
            <p className="text-sm text-yellow-100">{stats.averagePoints} avg per user</p>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-teal-500 to-green-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardDescription className="text-teal-100">CO₂ Saved</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              {stats.totalCO2Saved.toFixed(0)}kg
            </CardTitle>
            <p className="text-sm text-teal-100">≈ {Math.floor(stats.totalCO2Saved / 20)} trees</p>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Activity Distribution
          </CardTitle>
          <CardDescription>Breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getCategoryStats().map(({ category, count, percentage }) => (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categoryEmojis[category] || '📋'}</span>
                    <span className="font-medium capitalize">{category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{count} activities</span>
                    <span className="text-sm font-semibold w-12 text-right">{percentage}%</span>
                  </div>
                </div>
                <Progress value={parseFloat(percentage)} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activities">All Activities</TabsTrigger>
          <TabsTrigger value="users">All Users</TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>All green acts across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No activities logged yet</p>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>CO₂ Saved</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.username}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{activity.icon}</span>
                              <span>{activity.activityName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={categoryColors[activity.category]} variant="secondary">
                              {activity.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">+{activity.points}</TableCell>
                          <TableCell className="text-sm text-gray-600">{activity.co2Saved}kg</TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {new Date(activity.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>All platform members and their stats</CardDescription>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No users registered yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Streak</TableHead>
                      <TableHead>CO₂ Saved</TableHead>
                      <TableHead>Badges</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell className="text-sm">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Level {user.level || 1}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-500 font-semibold">
                            {user.points || 0} pts
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">🔥 {user.streak || 0} days</span>
                        </TableCell>
                        <TableCell className="text-sm text-green-600">
                          {(user.totalCO2Saved || 0).toFixed(1)}kg
                        </TableCell>
                        <TableCell className="text-sm">
                          {(user.badges?.length || 0)} / 11
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
