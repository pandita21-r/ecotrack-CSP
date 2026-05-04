export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  points: number;
  createdAt: string;
  level: number;
  badges: string[];
  streak: number;
  lastActivityDate?: string;
  totalCO2Saved: number;
}

export interface GreenAct {
  id: string;
  userId: string;
  username: string;
  activityId: string;
  activityName: string;
  category: 'recycling' | 'transport' | 'planting' | 'energy' | 'water' | 'food' | 'waste';
  description: string;
  points: number;
  co2Saved: number;
  timestamp: string;
  icon: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'user' | 'admin') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updates: Partial<User>) => void;
}
