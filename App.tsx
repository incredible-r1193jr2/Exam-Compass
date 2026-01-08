
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import StudyResourcesPage from './pages/StudyResourcesPage';
import QuestionBank from './pages/QuestionBank';
import MockTests from './pages/MockTests';
import DigitalPortfolio from './pages/DigitalPortfolio';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Pomodoro from './pages/Pomodoro';

export interface UserSession {
  name: string;
  email: string;
  targetExams: string[];
  level: string;
  targetYear: string;
  currentStandard: string;
  isLoggedIn: boolean;
  expiresAt?: number;
}

const Navbar: React.FC<{ user: UserSession | null }> = ({ user }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  if (location.pathname === '/auth' || (location.pathname === '/' && !user?.isLoggedIn)) return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to={user?.isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg transition-transform group-hover:scale-105">
              <i className="fas fa-compass"></i>
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900">
              ExamCompass
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: 'Dashboard', path: '/dashboard' },
              { name: 'Library', path: '/resources' },
              { name: 'Practice', path: '/practice' },
              { name: 'Analytics', path: '/mocks' },
              { name: 'Community', path: '/community' },
              { name: 'Focus', path: '/pomodoro' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-all ${
                  isActive(link.path) ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/portfolio" className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white transition-all">
            <i className="fas fa-sparkles"></i>
          </Link>
          <Link to="/profile" className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white border border-slate-100 rounded-full hover:shadow-sm transition-all group">
            <img
              className="h-7 w-7 rounded-full object-cover bg-slate-50 ring-1 ring-slate-100"
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Aspirant'}`}
              alt="Profile"
            />
            <span className="text-xs font-black text-slate-900">{user?.name.split(' ')[0]}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ec_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.isLoggedIn) {
          if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
            localStorage.removeItem('ec_user');
            setUser(null);
          } else {
            setUser(parsed);
          }
        }
      } catch (e) {
        console.error("Session restore error", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: UserSession) => {
    localStorage.setItem('ec_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('ec_user');
    setUser(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-[3px] border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Warming Engines</p>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar user={user} />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={user?.isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />
            <Route path="/auth" element={user?.isLoggedIn ? <Navigate to="/dashboard" /> : <Auth onLogin={login} />} />
            <Route path="/dashboard" element={user?.isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/auth" />} />
            <Route path="/resources" element={user?.isLoggedIn ? <StudyResourcesPage /> : <Navigate to="/auth" />} />
            <Route path="/practice" element={user?.isLoggedIn ? <QuestionBank /> : <Navigate to="/auth" />} />
            <Route path="/mocks" element={user?.isLoggedIn ? <MockTests /> : <Navigate to="/auth" />} />
            <Route path="/portfolio" element={user?.isLoggedIn ? <DigitalPortfolio /> : <Navigate to="/auth" />} />
            <Route path="/community" element={user?.isLoggedIn ? <Community /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={user?.isLoggedIn ? <Profile user={user} onLogout={logout} /> : <Navigate to="/auth" />} />
            <Route path="/pomodoro" element={user?.isLoggedIn ? <Pomodoro /> : <Navigate to="/auth" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
