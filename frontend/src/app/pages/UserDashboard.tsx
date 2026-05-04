import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { GreenAct } from '../types';
import { activityTemplates, badges } from '../data/activities';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { Leaf, Award, TrendingUp, Flame, Target, Zap, Users, Plus, Search, Filter, Star } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const [activities, setActivities] = useState<GreenAct[]>([]);
  const [communityActivities, setCommunityActivities] = useState<GreenAct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [userLevel, setUserLevel] = useState(user?.level || 1);
  const [userBadges, setUserBadges] = useState<string[]>(user?.badges || []);

  useEffect(() => {
    loadActivities();
    loadCommunityActivities();
  }, [user]);

  const loadActivities = () => {
    const allActivities = JSON.parse(localStorage.getItem('ecotrack_activities') || '[]');
    const userActivities = allActivities.filter((act: GreenAct) => act.userId === user?.id);
    setActivities(userActivities.sort((a: GreenAct, b: GreenAct) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));

    calculateUserStats(userActivities);
  };

  const loadCommunityActivities = () => {
    const allActivities = JSON.parse(localStorage.getItem('ecotrack_activities') || '[]');
    setCommunityActivities(allActivities.slice(-10).reverse());
  };

  const calculateUserStats = (userActivities: GreenAct[]) => {
    const totalPoints = userActivities.reduce((sum, act) => sum + act.points, 0);
    const totalCO2 = userActivities.reduce((sum, act) => sum + act.co2Saved, 0);
    const newLevel = Math.floor(totalPoints / 100) + 1;

    // Calculate streak
    const streak = calculateStreak(userActivities);

    // Check for new badges
    const earnedBadges = checkBadges(userActivities, totalPoints, streak);

    if (user) {
      updateUser({
        points: totalPoints,
        level: newLevel,
        badges: earnedBadges,
        streak,
        totalCO2Saved: totalCO2,
        lastActivityDate: userActivities[0]?.timestamp
      });
    }

    setUserLevel(newLevel);
    setUserBadges(earnedBadges);
  };

  const calculateStreak = (userActivities: GreenAct[]) => {
    if (userActivities.length === 0) return 0;

    const dates = userActivities.map(act =>
      new Date(act.timestamp).toDateString()
    );
    const uniqueDates = [...new Set(dates)].sort((a, b) =>
      new Date(b).getTime() - new Date(a).getTime()
    );

    let streak = 1;
    const today = new Date().toDateString();

    if (uniqueDates[0] !== today &&
        new Date(uniqueDates[0]).getTime() < new Date(today).getTime() - 86400000) {
      return 0;
    }

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = new Date(uniqueDates[i]).getTime() - new Date(uniqueDates[i + 1]).getTime();
      if (diff <= 86400000 * 1.5) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const checkBadges = (userActivities: GreenAct[], totalPoints: number, streak: number): string[] => {
    const earned: string[] = [...userBadges];

    badges.forEach(badge => {
      if (earned.includes(badge.id)) return;

      if (badge.type === 'points' && totalPoints >= badge.requirement) {
        earned.push(badge.id);
        showBadgeNotification(badge);
      } else if (badge.type === 'streak' && streak >= badge.requirement) {
        earned.push(badge.id);
        showBadgeNotification(badge);
      } else if (badge.category) {
        const categoryCount = userActivities.filter(
          act => act.category === badge.category
        ).length;
        if (categoryCount >= badge.requirement) {
          earned.push(badge.id);
          showBadgeNotification(badge);
        }
      } else if (!badge.type && !badge.category && userActivities.length >= badge.requirement) {
        earned.push(badge.id);
        showBadgeNotification(badge);
      }
    });

    return earned;
  };

  const showBadgeNotification = (badge: typeof badges[0]) => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF6347']
    });
    toast.success(`🎉 New Badge Unlocked: ${badge.icon} ${badge.name}!`, {
      description: badge.description
    });
  };

  const handleQuickAction = (templateId: string) => {
    const template = activityTemplates.find(t => t.id === templateId);
    if (!template || !user) return;

    const newActivity: GreenAct = {
      id: `act-${Date.now()}`,
      userId: user.id,
      username: user.username,
      activityId: template.id,
      activityName: template.name,
      category: template.category,
      description: template.description,
      points: template.points,
      co2Saved: template.co2Saved,
      timestamp: new Date().toISOString(),
      icon: template.icon
    };

    const allActivities = JSON.parse(localStorage.getItem('ecotrack_activities') || '[]');
    allActivities.push(newActivity);
    localStorage.setItem('ecotrack_activities', JSON.stringify(allActivities));

    setActivities([newActivity, ...activities]);
    loadCommunityActivities();

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10b981', '#059669', '#34d399']
    });

    toast.success(`${template.icon} +${template.points} points!`, {
      description: `You saved ${template.co2Saved}kg CO2!`
    });

    calculateUserStats([newActivity, ...activities]);
  };

  const filteredTemplates = activityTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'recycling', 'transport', 'planting', 'energy', 'water', 'food', 'waste'];
  const pointsToNextLevel = (userLevel * 100) - (user?.points || 0);
  const progressToNextLevel = ((user?.points || 0) % 100);

  const getUserBadges = () => {
    return badges.filter(b => userBadges.includes(b.id));
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-3">
              <CardDescription className="text-emerald-100">Your Points</CardDescription>
              <CardTitle className="text-4xl flex items-center gap-2">
                <Award className="w-8 h-8" />
                {user?.points || 0}
              </CardTitle>
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-sm">
                  <span>Level {userLevel}</span>
                  <span>{pointsToNextLevel} to next</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2 bg-emerald-700" />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-2 border-orange-200">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Current Streak
              </CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                🔥 {user?.streak || 0} days
              </CardTitle>
              <p className="text-sm text-gray-600">Keep it going!</p>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-2 border-green-200">
            <CardHeader className="pb-3">
              <CardDescription>CO₂ Saved</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2 text-green-600">
                <Leaf className="w-7 h-7" />
                {(user?.totalCO2Saved || 0).toFixed(1)}kg
              </CardTitle>
              <p className="text-sm text-gray-600">
                ≈ {Math.floor((user?.totalCO2Saved || 0) / 20)} trees planted
              </p>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-2 border-purple-200">
            <CardHeader className="pb-3">
              <CardDescription>Badges Earned</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2 text-purple-600">
                <Star className="w-7 h-7" />
                {userBadges.length}/{badges.length}
              </CardTitle>
              <div className="flex gap-1 pt-1">
                {getUserBadges().slice(0, 4).map(badge => (
                  <span key={badge.id} className="text-2xl">{badge.icon}</span>
                ))}
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Log common green acts instantly</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuickActions(!showQuickActions)}
                >
                  {showQuickActions ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            {showQuickActions && (
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activityTemplates.slice(0, 9).map((template) => (
                    <Button
                      key={template.id}
                      onClick={() => handleQuickAction(template.id)}
                      variant="outline"
                      className="h-auto flex-col items-start p-4 hover:bg-emerald-50 hover:border-emerald-300 transition-all"
                    >
                      <span className="text-2xl mb-1">{template.icon}</span>
                      <span className="text-sm font-semibold text-left">{template.name}</span>
                      <span className="text-xs text-green-600">+{template.points} pts</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Browse All Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Browse All Activities
              </CardTitle>
              <CardDescription>Find and log any green action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                  >
                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {filteredTemplates.map(template => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{template.icon}</span>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-xs text-gray-500">{template.description}</p>
                          <p className="text-xs text-green-600 mt-1">
                            💚 {template.points} pts • 🌍 {template.co2Saved}kg CO₂
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleQuickAction(template.id)}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        Log It
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* My Activities */}
          <Card>
            <CardHeader>
              <CardTitle>My Recent Activities</CardTitle>
              <CardDescription>Your sustainability journey</CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Leaf className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No activities logged yet. Start making an impact!</p>
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    <AnimatePresence>
                      {activities.slice(0, 20).map((activity) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-2xl">{activity.icon}</span>
                          <div className="flex-1">
                            <p className="font-medium">{activity.activityName}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(activity.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-emerald-500">+{activity.points}</Badge>
                            <p className="text-xs text-gray-500 mt-1">{activity.co2Saved}kg CO₂</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Achievements
              </CardTitle>
              <CardDescription>Unlock badges as you progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {badges.map(badge => {
                  const earned = userBadges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`text-center p-2 rounded-lg border-2 ${
                        earned
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                      title={badge.description}
                    >
                      <div className={`text-3xl ${!earned && 'grayscale'}`}>{badge.icon}</div>
                      <p className="text-xs font-medium mt-1">{badge.name.split(' ')[0]}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Community Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Community Feed
              </CardTitle>
              <CardDescription>Recent actions from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {communityActivities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{activity.username}</span> logged{' '}
                          <span className="text-emerald-600">{activity.activityName}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
