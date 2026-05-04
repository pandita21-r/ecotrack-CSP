import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';

type UserType = 'user' | 'admin' | null;

export default function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (type: 'user' | 'admin') => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return userType === 'admin' ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <UserDashboard onLogout={handleLogout} />
  );
}
