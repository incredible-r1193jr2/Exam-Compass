
import React, { useState, useEffect } from 'react';
import { Milestone } from '../types';

const CATEGORIES = ['Revision', 'Problem Solving', 'New Concepts', 'Mock Test'] as const;

const DigitalPortfolio: React.FC = () => {
  const [posts, setPosts] = useState<Milestone[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Revision');
  const [duration, setDuration] = useState('1h 30m');
  
  const [streak, setStreak] = useState(0);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  useEffect(() => {
    // Start from 0: Only load what is in storage
    const savedPosts = localStorage.getItem('ec_portfolio_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts([]); // Zero posts for new user
    }

    const savedStreakData = localStorage.getItem('ec_streak_data');
    if (savedStreakData) {
      const { count, lastDate } = JSON.parse(savedStreakData);
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate === today) {
        setStreak(count);
        setHasCheckedInToday(true);
      } else if (lastDate === yesterdayStr) {
        setStreak(count);
        setHasCheckedInToday(false);
      } else {
        setStreak(0);
        setHasCheckedInToday(false);
      }
    } else {
      setStreak(0); // Zero streak for new user
    }
  }, []);

  const savePosts = (newPosts: Milestone[]) => {
    setPosts(newPosts);
    localStorage.setItem('ec_portfolio_posts', JSON.stringify(newPosts));
  };

  const handleCheckIn = () => {
    if (hasCheckedInToday) return;

    const today = new Date().toISOString().split('T')[0];
    const newStreak = streak + 1;
    
    const streakData = { count: newStreak, lastDate: today };
    localStorage.setItem('ec_streak_data', JSON.stringify(streakData));
    setStreak(newStreak);
    setHasCheckedInToday(true);

    const checkInPost: Milestone = {
      id: Math.random().toString(),
      userName: 'Current User',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      content: `🔥 Just hit a ${newStreak} day study streak! Consistency is the superpower of every aspirant. #StayFocused`,
      likes: 0,
      comments: 0,
      date: 'Just now',
      type: 'achievement'
    };
    savePosts([checkInPost, ...posts]);
  };

  const handleLike = (id: string) => {
    savePosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    const newPost: Milestone = {
      id: Math.random().toString(),
      userName: 'Current User',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      content: newPostContent,
      likes: 0,
      comments: 0,
      date: 'Just now',
      type: 'study-log',
      category: category,
      duration: duration
    };
    savePosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Feed Wall */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-50 shadow-sm mb-12">
             <div className="flex gap-6">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100" alt="Me" />
                <div className="flex-grow space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Session Type</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 outline-none"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Duration</label>
                      <input 
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 2h 15m"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 outline-none"
                      />
                    </div>
                  </div>
                  
                  <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Describe your session highlights..."
                    className="w-full bg-slate-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-indigo-50 outline-none font-medium text-slate-700 min-h-[120px] resize-none"
                  ></textarea>
                  
                  <div className="flex justify-between items-center mt-4">
                     <button 
                      onClick={handlePost}
                      className="w-full py-3.5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                     >
                        Log Session to Wall
                     </button>
                  </div>
                </div>
             </div>
          </div>

          <div className="space-y-10">
            {posts.length > 0 ? posts.map((post) => (
              <div key={post.id} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <img src={post.userAvatar} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100" alt={post.userName} />
                      <div>
                        <h4 className="font-black text-slate-900">{post.userName}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{post.date}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-medium text-slate-700 leading-relaxed mb-8">
                    {post.content}
                  </p>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">Your progress wall is empty. Start posting to track your journey!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <i className={`fas fa-fire ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-600'}`}></i>
                  Consistency
                </h3>
                <div className="text-center py-8">
                  <span className="text-8xl font-black tracking-tighter">
                    {streak}
                  </span>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs mt-4">Day Study Streak</p>
                </div>

                <button 
                  onClick={handleCheckIn}
                  disabled={hasCheckedInToday}
                  className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                    hasCheckedInToday 
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default' 
                      : 'bg-white text-slate-900 hover:bg-orange-500 hover:text-white shadow-xl hover:scale-[1.02]'
                  }`}
                >
                  {hasCheckedInToday ? "Logged for Today" : "Log Today's Progress"}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPortfolio;
