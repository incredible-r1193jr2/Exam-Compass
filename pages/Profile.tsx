
import React from 'react';
import { UserSession } from '../App';
import { EXAMS } from '../constants';

interface ProfileProps {
  user: UserSession;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const chosenExams = EXAMS.filter(e => user.targetExams.includes(e.id));

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-slate-100">
        <div className="h-44 bg-indigo-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute -bottom-16 left-10">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              className="w-32 h-32 rounded-[2.5rem] border-8 border-white shadow-2xl bg-indigo-50"
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
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">
              Edit Account
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Primary Target</p>
              <p className="text-xl font-black text-slate-900">
                {chosenExams.map(e => e.shortName).join(', ') || 'General Prep'}
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Aspirant XP</p>
              <div className="flex items-center gap-2">
                 <i className="fas fa-coins text-amber-500"></i>
                 <p className="text-xl font-black text-indigo-600 tracking-tight">2,450 <span className="text-xs text-slate-400 opacity-60">EC</span></p>
              </div>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Standard</p>
              <p className="text-xl font-black text-slate-900 tracking-tight">{user.currentStandard}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-10">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight px-2">Settings & Security</h3>
        <div className="bg-white rounded-[3.5rem] p-4 shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
          {[
            { label: 'Notifications & Alerts', icon: 'fa-bell', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Privacy & Profile Visibility', icon: 'fa-lock', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Platform Subscription', icon: 'fa-crown', color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Parent/Guardian Link', icon: 'fa-link', color: 'text-violet-500', bg: 'bg-violet-50' },
            { label: 'Technical Help & FAQ', icon: 'fa-question-circle', color: 'text-slate-400', bg: 'bg-slate-50' },
          ].map((item, i) => (
            <button key={i} className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-all group border-transparent">
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
    </div>
  );
};

export default Profile;
