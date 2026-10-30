import React, { useState, useEffect } from 'react';
import { isAdminAuthenticated } from '../../data/adminStore';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard';

interface AdminPageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminPage({ darkMode, setDarkMode }: AdminPageProps): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());

  useEffect(() => {
    document.title = isAuthenticated 
      ? 'Weblaze CMS — Control Management Portal' 
      : 'Weblaze CMS — Staff Login';
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminDashboard
      onLogout={() => setIsAuthenticated(false)}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
}
