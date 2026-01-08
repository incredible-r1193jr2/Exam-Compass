
import React, { useState, useEffect } from 'react';
import { UserSession } from '../App';
import { EXAMS } from '../constants';
import { UserProgress } from '../types';

interface ProfileProps {
  user: UserSession;
  onLogout: () => void;
}

type SettingKey = 'notifications' | 'privacy' | 'subscription' | 'guardian' | 'faq' | null;

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const chosenExams = EXAMS.filter(e => user.targetExams.includes(e.id));
  const [activeSetting, setActiveSetting] = useState<SettingKey>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    questionsSolved: 245,
    correctAnswers: 189,
    accuracy: 77,
    lastActive: new Date().toISOString().split('T')[0],
    streakDays: 15,
    topicsCompleted: 34
  });
  const [settings, setSettings] = useState({
    notifications: { email: true, push: true, sms: false },
    isPrivate: false,
    guardianEmail: '',
    subscription: 'Free'
  });

  // Load settings from local storage
  useEffect(() => {
    const saved = localStorage.getItem(`ec_settings_${user.email}`);
    if (saved) setSettings(JSON.parse(saved));
    
    const mockTests = JSON.parse(localStorage.getItem('ec_mock_history') || '[]');
    const benchmarks = JSON.parse(localStorage.getItem('ec_mock_benchmarks') || '[]');
    
    let totalSolved = mockTests.length * 30 || 0;
    let totalCorrect = 0;
    mockTests.forEach((test: any) => {
      const accuracy = parseInt(test.accuracy) || 0;
      totalCorrect += Math.round((accuracy / 100) * 30);
    });
    
    setUserProgress(prev => ({
      ...prev,
      questionsSolved: totalSolved,
      correctAnswers: totalCorrect,
      accuracy: totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 77
    }));
  }, [user.email]);

  const saveSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem(`ec_settings_${user.email}`, JSON.stringify(newSettings));
  };

  const closeModal = () => setActiveSetting(null);

  const renderSettingContent = () => {
    switch (activeSetting) {
      case 'notifications':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h4 className="text-2xl font-black text-slate-900 mb-6">Alert Preferences</h4>
            {[
              { id: 'email', label: 'Email Reports', desc: 'Weekly progress and deadline alerts' },
              { id: 'push', label: 'Push Notifications', desc: 'Focus timer and peer interaction pings' },
              { id: 'sms', label: 'SMS Reminders', desc: 'Urgent exam date and admit card updates' }
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div>
                  <p className="font-black text-slate-800 text-sm">{item.label}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.desc}</p>
                </div>
                <button 
                  onClick={() => saveSettings({ ...settings, notifications: { ...settings.notifications, [item.id]: !settings.notifications[item.id as keyof typeof settings.notifications] } })}
                  className={`w-14 h-8 rounded-full transition-all relative ${settings.notifications[item.id as keyof typeof settings.notifications] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${settings.notifications[item.id as keyof typeof settings.notifications] ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            ))}
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h4 className="text-2xl font-black text-slate-900">Privacy Control</h4>
            <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] flex items-center justify-between">
              <div className="max-w-[70%]">
                <p className="font-black text-indigo-900">Ghost Mode</p>
                <p className="text-xs font-medium text-indigo-600/70 mt-1 leading-relaxed">When active, your profile and progress wall are hidden from the Global Feed and Peer Match.</p>
              </div>
              <button 
                onClick={() => saveSettings({ ...settings, isPrivate: !settings.isPrivate })}
                className={`w-14 h-8 rounded-full transition-all relative ${settings.isPrivate ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${settings.isPrivate ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="space-y-8 animate-fade-in-up text-center">
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 text-3xl">
              <i className="fas fa-crown"></i>
            </div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tighter">Upgrade to Pro</h4>
            <p className="text-slate-500 font-medium">Unlock Aspirant Twin AI, detailed Mock Analytics, and infinite Study Vault access.</p>
            <div className="grid grid-cols-1 gap-4 text-left">
               <div className="p-6 bg-slate-900 text-white rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Monthly Plan</p>
                      <p className="text-2xl font-black">₹499 <span className="text-xs opacity-40">/month</span></p>
                    </div>
                    <button onClick={() => saveSettings({...settings, subscription: 'Pro'})} className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all">Upgrade Now</button>
                  </div>
                  <i className="fas fa-bolt absolute -right-4 -bottom-4 text-white/5 text-7xl"></i>
               </div>
            </div>
          </div>
        );
      case 'guardian':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h4 className="text-2xl font-black text-slate-900">Guardian Link</h4>
            <p className="text-slate-500 font-medium">Link a parent's email to share automated performance reports and progress streaks.</p>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Parent/Guardian Email" 
                value={settings.guardianEmail}
                onChange={(e) => saveSettings({...settings, guardianEmail: e.target.value})}
                className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-600 font-medium"
              />
              <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl">Send Invite Link</button>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-4 animate-fade-in-up max-h-[400px] overflow-y-auto pr-2 minimal-scrollbar">
            <h4 className="text-2xl font-black text-slate-900 mb-6">Aspirant Support</h4>
            {[
              { q: 'How is Success Probability calculated?', a: 'It uses your syllabus completion rate, mock test accuracy, and historical peer data.' },
              { q: 'Can I track multiple exams?', a: 'Pro users can track up to 3 exams simultaneously with separate master plans.' },
              { q: 'Is my data secure?', a: 'Yes, we use industry-standard encryption for all student data and profile information.' },
              { q: 'How do I earn EC coins?', a: 'Earn EC by completing study sessions, logging streaks, and answering community doubts.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-2xl border border-slate-100">
                <summary className="p-6 cursor-pointer font-black text-slate-800 flex items-center justify-between list-none">
                  <span className="text-sm tracking-tight">{faq.q}</span>
                  <i className="fas fa-chevron-down text-[10px] text-slate-300 group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-6 pb-6 text-slate-500 text-sm font-medium leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 animate-fade-in-up relative lg:pt-32">
      <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-slate-100">
        <div className="h-44 bg-indigo-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute -bottom-16 left-10">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              className="w-32 h-32 rounded-[2.5rem] border-8 border-white shadow-2xl bg-indigo-50 transition-transform hover:scale-105"
              alt="Avatar"
            />
          </div>
        </div>
        <div className="pt-20 pb-12 px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{user.name}</h1>
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">{user.level} ASPIRANT</span>
                 <span className="text-slate-300">/</span>
                 <span className="text-slate-400 font-bold text-sm tracking-tight">Targeting Class of {user.targetYear}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
               {settings.subscription === 'Pro' && (
                 <span className="px-4 py-2 bg-amber-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-amber-200">Pro Member</span>
               )}
               <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">
                Edit Account
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner group hover:bg-white transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Primary Target</p>
              <p className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                {chosenExams.map(e => e.shortName).join(', ') || 'General Prep'}
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner group hover:bg-white transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Aspirant XP</p>
              <div className="flex items-center gap-2">
                 <i className="fas fa-coins text-amber-500"></i>
                 <p className="text-xl font-black text-indigo-600 tracking-tight">2,450 <span className="text-xs text-slate-400 opacity-60">EC</span></p>
              </div>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner group hover:bg-white transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Standard</p>
              <p className="text-xl font-black text-slate-900 tracking-tight">{user.currentStandard}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="mt-16 space-y-8">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter px-2">Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-xl">
                <i className="fas fa-pencil-alt"></i>
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">↑ 12%</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Questions Solved</p>
            <p className="text-4xl font-black text-slate-900">{userProgress.questionsSolved}</p>
            <p className="text-xs text-slate-400 font-medium mt-4">Cumulative across all mock tests</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl">
                <i className="fas fa-check-circle"></i>
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">↑ 8%</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Correct Answers</p>
            <p className="text-4xl font-black text-slate-900">{userProgress.correctAnswers}</p>
            <p className="text-xs text-slate-400 font-medium mt-4">{userProgress.accuracy}% accuracy</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 text-xl">
                <i className="fas fa-fire"></i>
              </div>
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Active</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Study Streak</p>
            <p className="text-4xl font-black text-slate-900">{userProgress.streakDays} <span className="text-xs text-slate-400">days</span></p>
            <p className="text-xs text-slate-400 font-medium mt-4">Keep the momentum going</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 text-xl">
                <i className="fas fa-star"></i>
              </div>
              <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest">New</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Topics Mastered</p>
            <p className="text-4xl font-black text-slate-900">{userProgress.topicsCompleted}</p>
            <p className="text-xs text-slate-400 font-medium mt-4">Syllabus coverage</p>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-[3rem] p-10 border border-slate-100 shadow-sm">
          <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <i className="fas fa-chart-line text-indigo-600"></i>
            Accuracy Breakdown
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="url(#accuracyGradient)" 
                    strokeWidth="8"
                    strokeDasharray={`${(userProgress.accuracy / 100) * 339.29} 339.29`}
                    strokeLinecap="round"
                    className="transition-all duration-2000 ease-out"
                  />
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5"/>
                      <stop offset="100%" stopColor="#6366f1"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-black text-slate-900">{userProgress.accuracy}%</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Accuracy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">Physics</span>
                  <span className="text-xs font-black text-indigo-600">78%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{width: '78%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">Chemistry</span>
                  <span className="text-xs font-black text-emerald-600">82%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{width: '82%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">Mathematics</span>
                  <span className="text-xs font-black text-rose-600">72%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600" style={{width: '72%'}}></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Last Activity</p>
              <p className="text-xl font-black text-slate-900 mb-6">{userProgress.lastActive}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <i className="fas fa-check text-emerald-600"></i>
                  <span className="text-xs font-bold text-slate-600">All systems active</span>
                </div>
                <button className="w-full py-3 bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-indigo-100 transition-all">
                  View Full Analytics →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-10">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight px-2">Settings & Security</h3>
        <div className="bg-white rounded-[3.5rem] p-4 shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
          {[
            { id: 'notifications', label: 'Notifications & Alerts', icon: 'fa-bell', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { id: 'privacy', label: 'Privacy & Profile Visibility', icon: 'fa-lock', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { id: 'subscription', label: 'Platform Subscription', icon: 'fa-crown', color: 'text-amber-500', bg: 'bg-amber-50' },
            { id: 'guardian', label: 'Parent/Guardian Link', icon: 'fa-link', color: 'text-violet-500', bg: 'bg-violet-50' },
            { id: 'faq', label: 'Technical Help & FAQ', icon: 'fa-question-circle', color: 'text-slate-400', bg: 'bg-slate-50' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSetting(item.id as SettingKey)}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-all group border-transparent outline-none"
            >
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <i className={`fas ${item.icon} text-lg`}></i>
                </div>
                <span className="font-bold text-slate-700 tracking-tight">{item.label}</span>
              </div>
              <i className="fas fa-chevron-right text-slate-200 group-hover:text-indigo-600 transition-colors"></i>
            </button>
          ))}
        </div>

        <button 
          onClick={onLogout}
          className="w-full py-6 bg-rose-50 text-rose-600 font-black rounded-[2rem] hover:bg-rose-100 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] border border-rose-100 shadow-sm"
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout Dashboard Session
        </button>
      </div>

      {/* Settings Modal */}
      {activeSetting && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-2xl border border-white/20 relative animate-scale-in">
             <button onClick={closeModal} className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                <i className="fas fa-times"></i>
             </button>
             {renderSettingContent()}
             <div className="mt-12 pt-8 border-t border-slate-50">
                <button onClick={closeModal} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all active:scale-95 shadow-xl">Done & Save</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
