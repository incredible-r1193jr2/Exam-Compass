
import React, { useState, useEffect } from 'react';
import { STUDY_RESOURCES } from '../constants';

interface YouTubeResource {
  id: string;
  title: string;
  channel: string;
  subject: string;
  type: string;
  rating: number;
  youtubeUrl: string;
  thumbnail: string;
  duration: string;
}

const StudyResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Library');
  const [youtubeResources, setYoutubeResources] = useState<YouTubeResource[]>([]);
  const [loading, setLoading] = useState(true);

  // Curated YouTube resources from Physics Wallah, Aleen Academy, and top educators
  const curatedYouTubeResources: YouTubeResource[] = [
    // Physics Wallah - Physics
    {
      id: 'yt1',
      title: 'Newton Laws of Motion - Complete Chapter',
      channel: 'Physics Wallah',
      subject: 'Physics',
      type: 'Video',
      rating: 4.9,
      youtubeUrl: 'https://www.youtube.com/watch?v=aPwqkZCBouU',
      thumbnail: '#',
      duration: '2h 15m'
    },
    {
      id: 'yt2',
      title: 'Electromagnetism - Full Series',
      channel: 'Physics Wallah',
      subject: 'Physics',
      type: 'Video',
      rating: 4.8,
      youtubeUrl: 'https://www.youtube.com/watch?v=_WXExQ4E-po',
      thumbnail: '#',
      duration: '3h 45m'
    },
    {
      id: 'yt3',
      title: 'Thermodynamics & Heat Engines',
      channel: 'Physics Wallah',
      subject: 'Physics',
      type: 'Video',
      rating: 4.7,
      youtubeUrl: 'https://www.youtube.com/watch?v=JAvi2K_DbbI',
      thumbnail: '#',
      duration: '2h 30m'
    },
    // Physics Wallah - Chemistry
    {
      id: 'yt4',
      title: 'Organic Chemistry Reactions - Complete',
      channel: 'Physics Wallah',
      subject: 'Chemistry',
      type: 'Video',
      rating: 4.9,
      youtubeUrl: 'https://www.youtube.com/watch?v=kwG6zR-Gvso',
      thumbnail: '#',
      duration: '4h 20m'
    },
    {
      id: 'yt5',
      title: 'Inorganic Chemistry - Block Elements',
      channel: 'Physics Wallah',
      subject: 'Chemistry',
      type: 'Video',
      rating: 4.8,
      youtubeUrl: 'https://www.youtube.com/watch?v=ZLPwg62iCwM',
      thumbnail: '#',
      duration: '3h 50m'
    },
    // Aleen Academy - Mathematics
    {
      id: 'yt7',
      title: 'Calculus - Limits & Continuity',
      channel: 'Aleen Academy',
      subject: 'Mathematics',
      type: 'Video',
      rating: 4.8,
      youtubeUrl: 'https://www.youtube.com/watch?v=riXcZT2ICjA',
      thumbnail: 'https://img.youtube.com/vi/riXcZT2ICjA/hqdefault.jpg',
      duration: '2h 45m'
    }
  ];

  useEffect(() => {
    // Simulate loading YouTube resources
    setLoading(true);
    setTimeout(() => {
      setYoutubeResources(curatedYouTubeResources);
      setLoading(false);
    }, 500);
  }, []);

  // Filter resources based on active tab
  const getFilteredResources = () => {
    if (activeTab === 'All Library') return youtubeResources;
    if (activeTab === 'Full Sessions') return youtubeResources.filter(r => r.duration && parseFloat(r.duration) > 2);
    return youtubeResources;
  };

  const filteredResources = getFilteredResources();
  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 animate-in fade-in duration-700 lg:pt-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full w-fit border border-indigo-100">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">📚 Aspirant Vault</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">Study Resources</h1>
          <p className="text-slate-500 font-medium text-lg">Free lectures from Physics Wallah, Aleen Academy, and top educators on YouTube.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 minimal-scrollbar">
          {['All Library', 'Full Sessions', 'Master Notes', 'Exam Books', 'PYQ Vault'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${activeTab === tab ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 border-slate-900' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredResources.map((res) => (
            <div key={res.id} className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all group flex flex-col h-full overflow-hidden hover:-translate-y-2">
              {/* Thumbnail with Play Icon */}
              <div className="relative mb-8 overflow-hidden rounded-[2.5rem] h-52 bg-gradient-to-br from-slate-300 to-slate-400">
                <img 
                  src={res.thumbnail} 
                  alt={res.title}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    // Fallback: Show YouTube placeholder
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent && !parent.querySelector('.yt-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'yt-placeholder absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400';
                      const icon = document.createElement('i');
                      icon.className = 'fab fa-youtube text-7xl text-slate-500 opacity-30';
                      placeholder.appendChild(icon);
                      parent.appendChild(placeholder);
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* YouTube Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl">
                    <i className="fas fa-play text-white text-2xl ml-1"></i>
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[9px] font-black">
                  {res.duration}
                </div>
                {/* Type Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest shadow-sm border border-white/20">
                  {res.type}
                </div>
              </div>
              
              <div className="flex-grow px-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">▶ {res.channel}</span>
                  <span className="text-slate-200">/</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-black tracking-widest uppercase">
                    <i className="fas fa-star text-[9px]"></i>
                    {res.rating}
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  <span className="inline-block bg-slate-50 px-2 py-1 rounded-lg">{res.subject}</span>
                </p>
              </div>

              <div className="flex gap-3 px-2 pt-6 border-t border-slate-50">
                <a 
                  href={res.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-red-100 flex items-center justify-center gap-2 group/btn"
                >
                  <i className="fab fa-youtube"></i>
                  Watch on YouTube
                </a>
                <button className="w-14 h-14 flex items-center justify-center border border-slate-100 rounded-2xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all hover:border-rose-200">
                  <i className="far fa-bookmark text-lg"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-3xl shadow-slate-200">
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-red-400">
             <i className="fab fa-youtube text-3xl"></i>
          </div>
          <h2 className="text-4xl font-black mb-6 tracking-tighter">Free Content Library</h2>
          <p className="text-slate-400 mb-12 font-medium text-lg leading-relaxed">
            Access free YouTube lectures from Physics Wallah, Aleen Academy, and top educators. All content is curated and organized by subject and difficulty level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.youtube.com/@PhysicsWallah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-red-600/20 flex items-center justify-center gap-2"
            >
              <i className="fab fa-youtube"></i> Physics Wallah
            </a>
            <a 
              href="https://www.youtube.com/@ALLENJEE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-red-600/20 flex items-center justify-center gap-2"
            >
              <i className="fab fa-youtube"></i> Allen JEE
            </a>
            <a 
              href="https://www.youtube.com/@pradeepkshetrapal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-red-600/20 flex items-center justify-center gap-2"
            >
              <i className="fab fa-youtube"></i> Pradeep Sir
            </a>
          </div>
        </div>
        <div className="absolute -right-40 -top-40 opacity-[0.03] select-none pointer-events-none">
          <i className="fab fa-youtube text-[500px]"></i>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 text-center">
          <p className="text-3xl font-black text-indigo-600 mb-2">{youtubeResources.length}+</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Free Lectures</p>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 text-center">
          <p className="text-3xl font-black text-emerald-600 mb-2">3</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Channels</p>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 text-center">
          <p className="text-3xl font-black text-rose-600 mb-2">100%</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Free Access</p>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 text-center">
          <p className="text-3xl font-black text-amber-600 mb-2">4.8★</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Rating</p>
        </div>
      </div>
    </div>
  );
};

export default StudyResourcesPage;
