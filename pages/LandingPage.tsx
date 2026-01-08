
import React, { useState } from 'react';
import { EXAMS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const filteredExams = EXAMS.filter(e => 
    e.shortName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trustLogos = ['IIT', 'AIIMS', 'NLU', 'IIM', 'UPSC', 'BITS'];
  
  const faqs = [
    { q: "How does the Success Probability work?", a: "Our AI analyzes your mock test accuracy, syllabus coverage, and compares it with historical data of successful candidates from previous years to give you a realistic success index." },
    { q: "Is ExamCompass free for all students?", a: "We offer a robust free tier that includes syllabus tracking and basic practice. Our Pro tier unlocks the Aspirant Twin AI and advanced burnout monitoring." },
    { q: "Can I switch exams later?", a: "Yes, your intelligence profile is flexible. You can update your target exam at any time, and the roadmap will recalibrate automatically." }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <i className="fas fa-compass"></i>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">ExamCompass</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <a href="#how-it-works" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Strategy</a>
            <a href="#exams" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Exams</a>
            <Link to="/auth" className="text-sm font-bold text-slate-900">Sign In</Link>
            <Link to="/auth" className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100 mb-10 animate-fade-in-up">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">MISSION-CRITICAL PREP FOR 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 mb-10 animate-fade-in-up">
            Precision prep for <br />
            <span className="gradient-text">ambitious minds.</span>
          </h1>
          
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            The all-in-one intelligence platform for Indian aspirants. We turn the chaos of competitive exams into a clear, data-driven path to victory.
          </p>
          
          <div className="relative max-w-lg mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="text" 
              placeholder="Search JEE, NEET, CLAT, UPSC..."
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-lg shadow-2xl shadow-slate-100 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {trustLogos.map(logo => (
              <span key={logo} className="text-2xl font-black tracking-widest text-slate-900">{logo}</span>
            ))}
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald-50 rounded-full blur-[120px] opacity-40"></div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-24 reveal">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">A Blueprint for Victory</h2>
              <p className="text-slate-500 font-medium">Three steps to elite college admission.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: '01', title: 'Choose Your Goal', desc: 'Select from Indias toughest exams and get a personalized, topic-wise roadmap instantly.', icon: 'fa-bullseye', color: 'bg-indigo-600' },
                { step: '02', title: 'Track Intelligence', desc: 'Log your study sessions and mock scores. Our AI calculates your success probability in real-time.', icon: 'fa-chart-pie', color: 'bg-indigo-500' },
                { step: '03', title: 'Optimize & Conquer', desc: 'Use AI insights to fix weak spots and benchmark against the top 1% of aspirants.', icon: 'fa-trophy', color: 'bg-indigo-400' }
              ].map((item, i) => (
                <div key={i} className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group reveal">
                  <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center text-xl mb-10 shadow-lg group-hover:rotate-12 transition-transform`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span className="absolute top-10 right-10 text-6xl font-black text-slate-200 opacity-30 tracking-tighter">{item.step}</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Innovation Features */}
      <section className="py-32 px-6 bg-slate-900 rounded-[4rem] mx-4 md:mx-10 my-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Exclusive Innovations</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                The AI Advantage <br /> <span className="text-indigo-400">for Modern Students.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400 shrink-0 border border-white/5">
                    <i className="fas fa-users-rays"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Aspirant Twin AI</h4>
                    <p className="text-slate-400 font-medium">We find students with similar preparation patterns and allow anonymous comparison to fuel healthy competition.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 border border-white/5">
                    <i className="fas fa-battery-half"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Burnout Monitor</h4>
                    <p className="text-slate-400 font-medium">Detects signs of over-study or fatigue and suggests optimal rest periods to keep your brain peak-ready.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative reveal">
               <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[4rem] shadow-3xl flex items-center justify-center overflow-hidden">
                  <div className="p-12 text-center text-white">
                     <i className="fas fa-robot text-[120px] mb-10 opacity-20"></i>
                     <p className="text-3xl font-black tracking-tight mb-4">"Your Prep Score is 88%"</p>
                     <p className="text-indigo-200 font-medium">Focus on Organic Chemistry for 2 hours today to reach 92%.</p>
                  </div>
                  <div className="absolute inset-0 border-[20px] border-white/5 rounded-[4rem] pointer-events-none"></div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>
      </section>

      {/* Exam Grid */}
      <section id="exams" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal">
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Choose Your Battlefield</h2>
             <p className="text-slate-500 font-medium">Explore personalized resources for Indias toughest exams.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map((exam) => (
              <div 
                key={exam.id} 
                className={`bg-white rounded-[3.5rem] p-10 border border-slate-100 transition-all group cursor-default reveal ${exam.isComingSoon ? 'grayscale opacity-80' : 'hover:shadow-2xl hover:-translate-y-2'}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                    {exam.stream}
                  </span>
                  {exam.isComingSoon && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest rounded-full animate-pulse">
                      Soon
                    </span>
                  )}
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter group-hover:text-indigo-600 transition-colors">{exam.shortName}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10 h-12 overflow-hidden line-clamp-2">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Seats</p>
                    <p className="text-xl font-black text-slate-900">{exam.seats > 0 ? `${(exam.seats / 1000).toFixed(0)}k+` : 'TBA'}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Year</p>
                    <p className="text-xl font-black text-slate-900">2026</p>
                  </div>
                </div>

                <button 
                  disabled={exam.isComingSoon}
                  onClick={() => !exam.isComingSoon && navigate(`/auth`)}
                  className={`w-full py-5 font-black rounded-[2rem] transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] ${
                    exam.isComingSoon 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-slate-900 text-white group-hover:bg-indigo-600'
                  }`}
                >
                  {exam.isComingSoon ? 'Under Development' : 'Start Prep'}
                  {!exam.isComingSoon && <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aspirant Stories */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Voices of Victory</h2>
              <p className="text-slate-500 font-medium">Thousands have optimized their journey with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Arjun M.', score: 'AIR 42 (JEE)', text: 'The success probability dial was my biggest motivator. It kept me honest about my mock scores.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' },
              { name: 'Sanya K.', score: '99.8 Percentile', text: 'Burnout monitor literally saved my prep. It reminded me to sleep when I was pushing too hard.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanya' },
              { name: 'Rohan P.', score: 'Cleared UPSC Prelims', text: 'Finding study twins with similar weak topics made doubt-solving so much faster.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan' }
            ].map((story, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm reveal">
                 <div className="flex items-center gap-4 mb-8">
                    <img src={story.avatar} className="w-14 h-14 rounded-2xl bg-indigo-50" alt={story.name} />
                    <div>
                      <p className="font-black text-slate-900">{story.name}</p>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{story.score}</p>
                    </div>
                 </div>
                 <p className="text-slate-500 font-medium italic leading-relaxed">"{story.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-[2rem] overflow-hidden reveal">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-black text-slate-900">{faq.q}</span>
                  <i className={`fas fa-chevron-down text-slate-300 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                   <p className="text-slate-500 font-medium">{faq.a}</p>
                </div>
              </div>
            ))}
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
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
                <i className="fas fa-compass absolute -top-20 -left-20 text-[600px] rotate-12"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
          <p className="text-slate-400 font-bold uppercase tracking-[0.1em] text-[10px] mb-2">
            ©2026 Team R1193JR2 • KVS Hackathon
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
