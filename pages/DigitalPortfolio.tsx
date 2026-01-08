
import React, { useState, useEffect } from 'react';
import { Milestone } from '../types';

const CATEGORIES = ['Revision', 'Problem Solving', 'New Concepts', 'Mock Test'] as const;

const DigitalPortfolio: React.FC = () => {
  const [posts, setPosts] = useState<Milestone[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Revision');
  const [duration, setDuration] = useState('1h 30m');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  
  const [streak, setStreak] = useState(0);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem('ec_portfolio_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts([]);
    }

    const savedLikes = localStorage.getItem('ec_liked_posts');
    if (savedLikes) {
      setLikedPosts(new Set(JSON.parse(savedLikes)));
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
      setStreak(0);
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
      userName: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      content: `🔥 Just hit a ${newStreak} day study streak! Consistency is the superpower of every aspirant. #StayFocused`,
      likes: 0,
      comments: 0,
      date: 'Just now',
      type: 'achievement',
      likedBy: [],
      commentList: []
    };
    savePosts([checkInPost, ...posts]);
  };

  const handleLike = (id: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedPosts(newLiked);
    localStorage.setItem('ec_liked_posts', JSON.stringify(Array.from(newLiked)));

    savePosts(posts.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          likes: newLiked.has(id) ? p.likes + 1 : Math.max(0, p.likes - 1),
          likedBy: newLiked.has(id) ? [...(p.likedBy || []), 'You'] : (p.likedBy || []).filter(u => u !== 'You')
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string) => {
    const comment = newComments[postId]?.trim();
    if (!comment) return;

    savePosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: p.comments + 1,
          commentList: [
            ...(p.commentList || []),
            { user: 'You', text: comment, date: 'Just now' }
          ]
        };
      }
      return p;
    }));

    setNewComments({ ...newComments, [postId]: '' });
  };

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    const newPost: Milestone = {
      id: Math.random().toString(),
      userName: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      content: newPostContent,
      likes: 0,
      comments: 0,
      date: 'Just now',
      type: 'study-log',
      category: category,
      duration: duration,
      likedBy: [],
      commentList: []
    };
    savePosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500 lg:pt-32">
      <header className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 mb-6">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Digital Portfolio</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4">Your Achievement Wall.</h1>
        <p className="text-slate-500 text-lg font-medium">Celebrate milestones, connect with peers, and build your achievement portfolio.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Feed Wall */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm mb-12">
             <div className="flex gap-6">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 shrink-0" alt="Me" />
                <div className="flex-grow space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 block">Session Type</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 block">Duration</label>
                      <input 
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 2h 15m"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What did you accomplish today? Share your progress..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none font-medium text-slate-700 min-h-[120px] resize-none transition-all"
                  ></textarea>
                  
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{newPostContent.length} characters</span>
                     <button 
                      onClick={handlePost}
                      disabled={!newPostContent.trim()}
                      className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-100 text-xs uppercase tracking-[0.2em]"
                     >
                        Post to Wall <i className="fas fa-arrow-right ml-2"></i>
                     </button>
                  </div>
                </div>
             </div>
          </div>

          <div className="space-y-8">
            {posts.length > 0 ? posts.map((post) => (
              <div key={post.id} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                <div className="p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img src={post.userAvatar} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100" alt={post.userName} />
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{post.userName}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</p>
                      </div>
                    </div>
                    {post.category && (
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-indigo-100">{post.category}</span>
                    )}
                  </div>
                  
                  <p className="text-lg font-medium text-slate-700 leading-relaxed mb-6">
                    {post.content}
                  </p>

                  {post.duration && (
                    <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                      <i className="fas fa-hourglass-end text-indigo-600"></i>
                      <span className="text-sm font-bold text-slate-600">Session Duration: <span className="text-indigo-600">{post.duration}</span></span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between py-5 border-t border-slate-100">
                     <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 text-sm font-bold transition-all ${
                            likedPosts.has(post.id) 
                              ? 'text-rose-600' 
                              : 'text-slate-400 hover:text-rose-600'
                          }`}
                        >
                          <i className={`fas fa-heart ${likedPosts.has(post.id) ? 'text-rose-600' : ''}`}></i>
                          <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
                        </button>
                        <button 
                          onClick={() => setExpandedComments({...expandedComments, [post.id]: !expandedComments[post.id]})}
                          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-all"
                        >
                          <i className="fas fa-comment"></i>
                          <span>{post.comments} {post.comments === 1 ? 'Comment' : 'Comments'}</span>
                        </button>
                     </div>
                     <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700">Share</button>
                  </div>

                  {expandedComments[post.id] && (
                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {post.commentList?.map((comment, i) => (
                          <div key={i} className="flex gap-4">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100" alt={comment.user} />
                            <div className="flex-grow">
                              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <p className="text-xs font-black text-slate-600 mb-1">{comment.user}</p>
                                <p className="text-sm font-medium text-slate-700">{comment.text}</p>
                              </div>
                              <p className="text-[10px] text-slate-400 font-bold mt-2">{comment.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <input 
                          type="text"
                          placeholder="Add a comment..."
                          value={newComments[post.id] || ''}
                          onChange={(e) => setNewComments({...newComments, [post.id]: e.target.value})}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddComment(post.id);
                            }
                          }}
                          className="flex-grow bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                        />
                        <button 
                          onClick={() => handleAddComment(post.id)}
                          className="px-5 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all text-xs"
                        >
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <i className="fas fa-trophy text-5xl text-slate-300 mb-6 block"></i>
                <p className="text-slate-500 font-bold text-lg mb-2">Your achievement wall is empty</p>
                <p className="text-slate-400 text-sm">Start logging your progress to build your portfolio and celebrate wins with the community!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <h3 className="text-3xl font-black mb-12 flex items-center gap-3 tracking-tight">
                  <i className={`fas fa-fire text-3xl ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-600'}`}></i>
                  Consistency
                </h3>
                <div className="text-center py-12 mb-12 px-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                  <div className="text-7xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                    {streak}
                  </div>
                  <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[10px] mt-6">Day Study Streak</p>
                </div>

                <button 
                  onClick={handleCheckIn}
                  disabled={hasCheckedInToday}
                  className={`w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all mb-6 ${
                    hasCheckedInToday 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default' 
                      : 'bg-white text-slate-900 hover:bg-orange-500 hover:text-white shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02]'
                  }`}
                >
                  {hasCheckedInToday ? <i className="fas fa-check"></i> : <i className="fas fa-plus"></i>}
                  {hasCheckedInToday ? "Logged for Today" : "Check In Now"}
                </button>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Posts This Month</p>
                    <p className="text-3xl font-black">{posts.length}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Engagement</p>
                    <p className="text-3xl font-black">{posts.reduce((acc, p) => acc + p.likes + p.comments, 0)}</p>
                  </div>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
            <h4 className="text-lg font-black text-slate-900 mb-6">Achievement Tips</h4>
            <ul className="space-y-4">
              {[
                '📚 Log study sessions consistently',
                '💪 Share your breakthroughs',
                '❤️ Support peers with comments',
                '🏆 Build your achievement story'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-base mt-1">{tip.split(' ')[0]}</span>
                  <span className="text-sm font-medium text-slate-600">{tip.slice(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPortfolio;
