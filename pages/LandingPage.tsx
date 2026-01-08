
import React, { useState, useEffect } from 'react';
import { EXAMS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredExams = EXAMS.filter(e => 
    e.shortName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar with entrance animation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-50 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <i className="fas fa-compass"></i>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">ExamCompass</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#exams" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Exams</a>
            <Link to="/auth" className="text-sm font-bold text-slate-900">Sign In</Link>
            <Link to="/auth" className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        {/* Decorative Floating Elements */}
        <div className="absolute left-[8%] top-1/4 hidden lg:block opacity-30">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl shadow-2xl floating">
                <i className="fas fa-brain"></i>
            </div>
        </div>
        <div className="absolute right-[10%] top-1/3 hidden lg:block opacity-20">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl floating-alt" style={{ animationDelay: '1s' }}>
                <i className="fas fa-check"></i>
            </div>
        </div>
        <div className="absolute left-[15%] bottom-1/4 hidden lg:block opacity-10">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xl floating" style={{ animationDelay: '2s' }}>
                <i className="fas fa-scroll"></i>
            </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">INTELLIGENT ROADMAPS FOR 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Precision prep for <br />
            <span className="gradient-text">ambitious minds.</span>
          </h1>
          
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            The all-in-one intelligence platform for Indian aspirants. We turn the chaos of competitive exams into a clear, data-driven path to victory.
          </p>
          
          <div className="relative max-w-lg mx-auto mb-20 animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="text" 
              placeholder="Search JEE, NEET, UPSC..."
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-lg shadow-2xl shadow-slate-100 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-12 animate-fade-in" style={{ animationDelay: '1s' }}>
             {[
               { icon: 'fa-bolt', label: 'AI Strategy' },
               { icon: 'fa-users', label: 'Peer Connect' },
               { icon: 'fa-chart-pie', label: 'Deep Analytics' }
             ].map((feature, i) => (
               <div key={i} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                  <i className={`fas ${feature.icon} text-slate-900`}></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">{feature.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Exam Grid with Staggered Scroll Reveal */}
      <section id="exams" className="py-32 px-6 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal">
             <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Choose Your Battlefield</h2>
             <p className="text-slate-500 font-medium">Explore personalized resources for India's toughest exams.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map((exam, i) => (
              <div 
                key={exam.id} 
                className={`bg-white rounded-[3rem] p-10 border border-slate-100 transition-all group cursor-default reveal ${exam.isComingSoon ? 'grayscale-[0.5] opacity-80' : 'hover:shadow-2xl hover:-translate-y-2'}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                    {exam.stream}
                  </span>
                  <div className="flex items-center gap-2">
                    {exam.isComingSoon ? (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest rounded-full animate-pulse">
                        Coming Soon
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${exam.difficulty === 'Very Hard' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{exam.difficulty}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter group-hover:text-indigo-600 transition-colors">{exam.shortName}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10 h-12 overflow-hidden line-clamp-2">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-400">Total Seats</p>
                    <p className="text-xl font-black text-slate-900 group-hover:text-indigo-600">{exam.seats > 0 ? `${(exam.seats / 1000).toFixed(exam.seats < 1000 ? 1 : 0)}k+` : 'TBA'}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-400">Target Year</p>
                    <p className="text-xl font-black text-slate-900 group-hover:text-indigo-600">2026</p>
                  </div>
                </div>

                <button 
                  disabled={exam.isComingSoon}
                  onClick={() => !exam.isComingSoon && navigate(`/auth`)}
                  className={`w-full py-5 font-black rounded-[1.5rem] transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] ${
                    exam.isComingSoon 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-slate-900 text-white group-hover:bg-indigo-600 shadow-slate-200'
                  }`}
                >
                  {exam.isComingSoon ? 'Under Development' : 'Start Preparation'}
                  {!exam.isComingSoon && <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Features with Visual Animation */}
      <section className="py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl shadow-indigo-200">
               <i className="fas fa-robot text-2xl"></i>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
              Aspirant Twin AI: <br />
              <span className="text-indigo-600">Your Reflection.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
              Our unique AI engine matches your progress with the top 5% of aspirants from previous years. See exactly where you stand and what gaps you need to close to secure your seat.
            </p>
            <Link to="/auth" className="inline-flex items-center gap-4 py-4 px-10 bg-slate-900 text-white font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200">
              Discover Aspirant Twin <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className="relative reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="bg-white border border-slate-100 rounded-[4rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative z-10 overflow-hidden">
               <div className="space-y-6">
                  {[
                    { name: 'Vikram S.', score: '99.4%', color: 'bg-indigo-600', delay: '0.1s' },
                    { name: 'Ananya R.', score: '98.2%', color: 'bg-emerald-500', delay: '0.3s' },
                    { name: 'Rohan M.', score: '97.5%', color: 'bg-amber-500', delay: '0.5s' }
                  ].map((peer, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white transition-all hover:scale-[1.02] cursor-default animate-fade-in-up" style={{ animationDelay: peer.delay }}>
                      <div className={`w-12 h-12 ${peer.color} rounded-2xl shadow-lg flex items-center justify-center text-white`}>
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-black text-slate-900 tracking-tight">{peer.name}</p>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                          <div className={`h-full ${peer.color} transition-all duration-1000`} style={{ width: peer.score }}></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-indigo-600 font-black text-sm">{peer.score}</div>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Match</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
            {/* Background Blur Blobs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-200 rounded-full blur-[100px] opacity-30 -z-10 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-200 rounded-full blur-[100px] opacity-30 -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[4rem] p-16 md:p-32 text-center text-white relative overflow-hidden reveal">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.9]">
                Stop guessing. <br />
                <span className="text-indigo-400">Start winning.</span>
              </h2>
              <p className="text-xl text-slate-400 mb-14 font-medium leading-relaxed">
                Join thousands of students who have already optimized their path to elite Indian colleges.
              </p>
              <Link to="/auth" className="px-14 py-7 bg-indigo-600 text-white font-black rounded-full hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20 text-xs uppercase tracking-[0.3em] inline-block active:scale-95">
                Join the Mission
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
                <i className="fas fa-compass absolute -top-20 -left-20 text-[600px] rotate-12"></i>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-50 text-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i className="fas fa-compass text-xs"></i>
                </div>
                <span className="text-lg font-black tracking-tighter text-slate-900">ExamCompass</span>
             </div>
             <div className="flex gap-10">
               {[
                 { label: 'About', path: '/about' },
                 { label: 'Privacy', path: '/privacy' },
                 { label: 'Security', path: '/security' },
                 { label: 'Support', path: '/support' }
               ].map(link => (
                 <Link key={link.label} to={link.path} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-all">{link.label}</Link>
               ))}
             </div>
          </div>
          <div className="pt-10 border-t border-slate-200/50">
            <p className="text-slate-400 font-bold uppercase tracking-[0.1em] text-[10px] mb-2">
              ©2026 Team R1193JR2 – KVS Hackathon 2025
            </p>
            <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[8px]">
              Empowering the next generation of Indian aspirants
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
