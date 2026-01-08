
import React, { useState, useEffect, useRef } from 'react';
import { Milestone } from '../types';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const MODES: Record<TimerMode, { label: string; time: number; color: string; bg: string; icon: string }> = {
  work: { label: 'Focus Session', time: 25 * 60, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: 'fa-brain' },
  shortBreak: { label: 'Short Break', time: 5 * 60, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'fa-coffee' },
  longBreak: { label: 'Deep Rest', time: 15 * 60, color: 'text-blue-600', bg: 'bg-blue-50', icon: 'fa-battery-full' },
};

const CATEGORIES = ['Revision', 'Problem Solving', 'New Concepts', 'Mock Test'] as const;

const Pomodoro: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(MODES.work.time);
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Revision');
  const [sessionNotes, setSessionNotes] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const savedToday = localStorage.getItem('ec_pomodoro_today');
    const today = new Date().toISOString().split('T')[0];
    if (savedToday) {
      const { count, date } = JSON.parse(savedToday);
      if (date === today) {
        setCompletedSessions(count);
      } else {
        setCompletedSessions(0);
      }
    } else {
      setCompletedSessions(0);
    }
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (mode === 'work') {
      const newCount = completedSessions + 1;
      setCompletedSessions(newCount);
      localStorage.setItem('ec_pomodoro_today', JSON.stringify({ count: newCount, date: new Date().toISOString().split('T')[0] }));
      setShowLogModal(true);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setTimeLeft(MODES[mode].time); setIsActive(false); };
  const changeMode = (newMode: TimerMode) => { setMode(newMode); setTimeLeft(MODES[newMode].time); setIsActive(false); };
  const formatTime = (seconds: number) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; };

  const logSession = () => {
    const savedPosts = JSON.parse(localStorage.getItem('ec_portfolio_posts') || '[]');
    const newPost: Milestone = {
      id: Math.random().toString(),
      userName: 'Current User',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      content: sessionNotes || `🎯 Completed a ${Math.floor(MODES[mode].time / 60)}m focus block. Consistency is building up.`,
      likes: 0,
      comments: 0,
      date: 'Just now',
      type: 'study-log',
      category: category,
      duration: `${Math.floor(MODES[mode].time / 60)}m`
    };
    localStorage.setItem('ec_portfolio_posts', JSON.stringify([newPost, ...savedPosts]));
    setShowLogModal(false);
    setSessionNotes('');
    changeMode('shortBreak');
  };

  const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100;

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 animate-fade-in-up relative">
      {/* Dynamic Background Blobs */}
      <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-[120px] opacity-10 transition-colors duration-1000 ${isActive ? 'bg-indigo-400 animate-pulse' : 'bg-slate-200'}`}></div>
      <div className={`absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-10 transition-colors duration-1000 ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-200'}`} style={{ animationDelay: '2s' }}></div>

      <div className="text-center mb-20 reveal">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100 mb-6 animate-fade-in">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-indigo-600 animate-ping' : 'bg-slate-300'}`}></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Deep Work Mode</span>
          </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 animate-fade-in-up">Focus Flow</h1>
        <p className="text-slate-500 font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>Precision study sessions for the elite mindset.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className={`relative w-80 h-80 flex items-center justify-center transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}>
            <svg className="w-full h-full transform -rotate-90 overflow-visible">
              <circle cx="160" cy="160" r="145" stroke="#f1f5f9" strokeWidth="14" fill="none" />
              <circle cx="160" cy="160" r="145" stroke="currentColor" strokeWidth="14" fill="none" strokeDasharray="911" strokeDashoffset={911 - (911 * progress) / 100} strokeLinecap="round" className={`transition-all duration-1000 ease-linear ${MODES[mode].color}`} />
            </svg>
            <div className="absolute text-center animate-scale-in">
              <span className="text-8xl font-black text-slate-900 font-mono tracking-tighter">{formatTime(timeLeft)}</span>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-4 ${MODES[mode].color}`}>{MODES[mode].label}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-20">
            <button onClick={toggleTimer} className="px-16 py-6 rounded-[2.5rem] font-black text-xl bg-slate-900 text-white shadow-2xl hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all">
               {isActive ? 'Pause Flow' : 'Start Flow'}
            </button>
            <button onClick={resetTimer} className="w-20 h-20 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-300 hover:text-indigo-600 hover:shadow-lg transition-all active:rotate-180">
               <i className="fas fa-redo text-xl"></i>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 reveal">
           <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
             <h3 className="text-[10px] font-black text-slate-400 mb-10 uppercase tracking-widest">Select Focus Mode</h3>
             <div className="grid grid-cols-1 gap-3">
                {(Object.keys(MODES) as TimerMode[]).map((m, idx) => (
                  <button 
                    key={m}
                    onClick={() => changeMode(m)}
                    className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all border-2 stagger-item ${
                      mode === m ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${mode === m ? 'bg-white text-indigo-600 shadow-sm' : 'bg-white text-slate-300'} `}>
                          <i className={`fas ${MODES[m].icon}`}></i>
                       </div>
                       <span className={`font-black ${mode === m ? 'text-indigo-600' : 'text-slate-600'}`}>{MODES[m].label}</span>
                    </div>
                    {mode === m && <i className="fas fa-check-circle text-indigo-600 animate-scale-in"></i>}
                  </button>
                ))}
             </div>
           </div>

          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden group">
            <h3 className="text-[10px] font-black text-indigo-400 mb-10 uppercase tracking-widest relative z-10">Today's Progress</h3>
            <div className="flex justify-between items-baseline mb-6 relative z-10">
              <p className="text-3xl font-black">{completedSessions} <span className="text-lg opacity-40 font-bold">Sessions</span></p>
              <p className="text-xs font-bold text-slate-400">Goal: 8</p>
            </div>
            <div className="flex gap-2.5 h-3 relative z-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`flex-grow rounded-full transition-all duration-1000 ${i < completedSessions ? 'bg-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-white/10'}`}></div>
              ))}
            </div>
            <i className="fas fa-bullseye absolute -bottom-4 -right-4 text-white/5 text-8xl group-hover:scale-110 transition-transform"></i>
          </div>
        </div>
      </div>

      {showLogModal && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-2xl border border-white/20 animate-scale-in">
             <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-inner animate-fade-in-up">
                <i className="fas fa-award"></i>
             </div>
             <h3 className="text-3xl font-black text-slate-900 mb-4 text-center tracking-tight">Focus Mastered</h3>
             <p className="text-slate-500 text-center mb-10 font-medium">Session recorded. Take a rest or log highlights for your peer wall.</p>
             
             <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Session Highlights</label>
                  <textarea 
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Briefly describe what you conquered..."
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] p-8 min-h-[160px] outline-none transition-all font-medium text-slate-700 shadow-inner"
                  ></textarea>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={() => setShowLogModal(false)} className="flex-grow py-5 font-black text-slate-400 uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors">Dismiss</button>
                  <button onClick={logSession} className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-[1.5rem] uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl active:scale-95">Post to Feed</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
