
import React, { useState, useEffect } from 'react';
import { EXAMS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollDepth, setScrollDepth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll depth as a factor of viewport height
      const depth = window.scrollY / window.innerHeight;
      setScrollDepth(depth);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredExams = EXAMS.filter(e => 
    e.shortName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic float duration: base 4s + 10s per viewport of scroll depth
  const floatDuration = `${4 + scrollDepth * 10}s`;

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-compass"></i>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">ExamCompass</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#exams" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Exams</a>
            <Link to="/auth" className="text-sm font-bold text-slate-900">Sign In</Link>
            <Link to="/auth" className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        {/* Animated Hero Icon */}
        <div className="absolute left-[10%] top-1/4 hidden lg:block opacity-20 transition-all duration-700 ease-out"
             style={{ '--float-duration': floatDuration } as React.CSSProperties}>
            <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl shadow-2xl floating">
                <i className="fas fa-compass"></i>
            </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 mb-10">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">INTELLIGENT ROADMAPS FOR 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 mb-10">
            Precision prep for <br />
            <span className="gradient-text">ambitious minds.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12">
            The all-in-one intelligence platform for Indian aspirants. We turn the chaos of competitive exams into a clear, data-driven path to victory.
          </p>
          
          <div className="relative max-w-lg mx-auto mb-20">
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="text" 
              placeholder="Search JEE, NEET, UPSC..."
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-lg shadow-2xl shadow-slate-100 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Exam Grid */}
      <section id="exams" className="py-20 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map(exam => (
              <div 
                key={exam.id} 
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-2xl transition-all group cursor-default"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="px-4 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {exam.stream}
                  </span>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{exam.difficulty}</span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{exam.shortName}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Seats</p>
                    <p className="text-xl font-black text-slate-900">{(exam.seats / 1000).toFixed(0)}k+</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Target</p>
                    <p className="text-xl font-black text-slate-900">2026</p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/dashboard?exam=${exam.id}`)}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl group-hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                >
                  Explore Exam
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              Aspirant Twin AI: <br />
              Find your reflection.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
              Our unique AI engine matches your progress with the top 5% of aspirants from previous years. See exactly where you stand and what gaps you need to close.
            </p>
            <Link to="/auth" className="inline-flex items-center gap-4 text-indigo-600 font-black uppercase tracking-widest text-sm hover:gap-6 transition-all">
              Discover Aspirant Twin <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl relative z-10">
               <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 bg-indigo-600 rounded-xl"></div>
                      <div className="flex-grow">
                        <div className="h-2 bg-slate-200 rounded w-1/3 mb-2"></div>
                        <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                      </div>
                      <div className="text-indigo-600 font-black text-xs">99% Match</div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="absolute -inset-4 bg-indigo-100 rounded-[3.5rem] blur-2xl opacity-30 -z-10"></div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-900 text-white text-center">
        <p className="text-slate-400 font-bold uppercase tracking-[0.1em] text-[11px] mb-2 px-6">
          ©2026 Team R1193JR2 of AI VidyaSetu 1.0 – KVS Hackathon 2025
        </p>
        <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[9px]">
          Empowering the next generation of Indian aspirants
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
