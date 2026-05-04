import { useState, useEffect } from 'react';
import { User } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Trophy, Medal, Award, Crown, Star, Flame, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export default function Leaderboard() {
  const [rankedByPoints, setRankedByPoints] = useState<User[]>([]);
  const [rankedByStreak, setRankedByStreak] = useState<User[]>([]);
  const [rankedByCO2, setRankedByCO2] = useState<User[]>([]);

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = () => {
    const users = JSON.parse(localStorage.getItem('ecotrack_users') || '[]');

    setRankedByPoints([...users].sort((a: User, b: User) => (b.points || 0) - (a.points || 0)));
    setRankedByStreak([...users].sort((a: User, b: User) => (b.streak || 0) - (a.streak || 0)));
    setRankedByCO2([...users].sort((a: User, b: User) => (b.totalCO2Saved || 0) - (a.totalCO2Saved || 0)));
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'Gold Champion';
    if (rank === 2) return 'Silver Star';
    if (rank === 3) return 'Bronze Hero';
    if (rank <= 10) return 'Top 10';
    return 'Participant';
  };

  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  const renderTopThree = (users: User[], metric: 'points' | 'streak' | 'co2') => {
    if (users.length === 0) return null;

    return (
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {users.slice(0, 3).map((user, index) => {
          const rank = index + 1;
          const value = metric === 'points' ? user.points || 0 :
                       metric === 'streak' ? user.streak || 0 :
                       (user.totalCO2Saved || 0).toFixed(1);
          const icon = metric === 'points' ? <Award className="w-6 h-6 text-emerald-600" /> :
                      metric === 'streak' ? <Flame className="w-6 h-6 text-orange-500" /> :
                      <Leaf className="w-6 h-6 text-green-600" />;
          const unit = metric === 'points' ? 'points' :
                      metric === 'streak' ? 'days' :
                      'kg CO₂';

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`${
                  rank === 1
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 md:order-2'
                    : rank === 2
                    ? 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300 md:order-1'
                    : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300 md:order-3'
                } border-2`}
              >
                <CardContent className="pt-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className={`w-20 h-20 ${rank === 1 ? 'ring-4 ring-yellow-400' : ''}`}>
                      <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(rank)}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-1">{user.username}</h3>
                  <Badge
                    variant={rank === 1 ? 'default' : 'secondary'}
                    className={`mb-3 ${
                      rank === 1
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : rank === 2
                        ? 'bg-gray-400 hover:bg-gray-500'
                        : 'bg-amber-600 hover:bg-amber-700'
                    } text-white`}
                  >
                    {getRankBadge(rank)}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                    {icon}
                    {value}
                    <span className="text-sm text-gray-500 font-normal">{unit}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Level {user.level || 1} • {user.badges?.length || 0} badges
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderFullList = (users: User[], metric: 'points' | 'streak' | 'co2') => {
    if (users.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No participants yet. Be the first to log green acts!</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {users.map((user, index) => {
          const rank = index + 1;
          const value = metric === 'points' ? user.points || 0 :
                       metric === 'streak' ? user.streak || 0 :
                       (user.totalCO2Saved || 0).toFixed(1);
          const icon = metric === 'points' ? '💚' :
                      metric === 'streak' ? '🔥' :
                      '🌍';
          const unit = metric === 'points' ? 'pts' :
                      metric === 'streak' ? 'days' :
                      'kg';

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.5) }}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                rank <= 3
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 font-bold text-lg">
                {rank <= 3 ? getRankIcon(rank) : `#${rank}`}
              </div>
              <Avatar className={rank <= 3 ? 'ring-2 ring-emerald-400' : ''}>
                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                  {getInitials(user.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{user.username}</p>
                <p className="text-xs text-gray-500">
                  Level {user.level || 1} • {user.badges?.length || 0} badges
                </p>
              </div>
              {rank <= 10 && (
                <Badge variant="outline" className="mr-2">
                  {getRankBadge(rank)}
                </Badge>
              )}
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600 flex items-center gap-1">
                  <span>{icon}</span>
                  {value}
                </p>
                <p className="text-xs text-gray-500">{unit}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10" />
            <div>
              <CardTitle className="text-2xl">Community Leaderboard</CardTitle>
              <CardDescription className="text-yellow-100">
                Top eco-warriors making the biggest impact
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="points" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="points">
            <Award className="w-4 h-4 mr-2" />
            Points
          </TabsTrigger>
          <TabsTrigger value="streak">
            <Flame className="w-4 h-4 mr-2" />
            Streak
          </TabsTrigger>
          <TabsTrigger value="co2">
            <Leaf className="w-4 h-4 mr-2" />
            CO₂ Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="points" className="space-y-6">
          {renderTopThree(rankedByPoints, 'points')}
          <Card>
            <CardHeader>
              <CardTitle>Full Rankings - Points</CardTitle>
              <CardDescription>All participants ranked by total points earned</CardDescription>
            </CardHeader>
            <CardContent>
              {renderFullList(rankedByPoints, 'points')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streak" className="space-y-6">
          {renderTopThree(rankedByStreak, 'streak')}
          <Card>
            <CardHeader>
              <CardTitle>Full Rankings - Streak</CardTitle>
              <CardDescription>Users with the longest consecutive day streaks</CardDescription>
            </CardHeader>
            <CardContent>
              {renderFullList(rankedByStreak, 'streak')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="co2" className="space-y-6">
          {renderTopThree(rankedByCO2, 'co2')}
          <Card>
            <CardHeader>
              <CardTitle>Full Rankings - CO₂ Impact</CardTitle>
              <CardDescription>Total carbon dioxide saved by each user</CardDescription>
            </CardHeader>
            <CardContent>
              {renderFullList(rankedByCO2, 'co2')}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
