
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-12">
      <div className="max-w-[1100px] mx-auto px-6 py-20 animate-fade-in-up">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100 mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Our Story</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-10">
            Mapping the <br /> <span className="gradient-text">Aspirant Journey.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Every year, 30 million Indian students compete for fewer than 1 million elite seats. 
            We built ExamCompass to ensure no talent is lost to a lack of data.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-3xl font-black mb-6 tracking-tight">The Vision</h3>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              We envision a future where competitive exams aren't just about "brute force" studying, 
              but about intelligent strategy. Our platform democratizes the insights previously 
              available only to those in elite coaching hubs.
            </p>
            <div className="absolute -bottom-10 -right-10 opacity-10">
               <i className="fas fa-compass text-[200px]"></i>
            </div>
          </div>
          <div className="space-y-10">
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm shrink-0">
                  <i className="fas fa-brain text-xl"></i>
               </div>
               <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">Aspirant Intelligence</h4>
                  <p className="text-slate-500 font-medium">Using Gemini AI to analyze preparation trends and predict success probability with 89% accuracy.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm shrink-0">
                  <i className="fas fa-users-viewfinder text-xl"></i>
               </div>
               <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">Peer Mirroring</h4>
                  <p className="text-slate-500 font-medium">Anonymously benchmark yourself against the top 5% of aspirants from previous cycles.</p>
               </div>
            </div>
          </div>
        </div>

        <section className="bg-slate-50 rounded-[4rem] p-16 md:p-24 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Empowering 2026 Aspirants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: '2.5M+', label: 'Aspirants tracked' },
              { val: '12k+', label: 'Mock Test Modules' },
              { val: '92%', label: 'Retention Rate' },
              { val: '0.1s', label: 'AI Latency' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                 <p className="text-4xl font-black text-indigo-600 tracking-tighter">{stat.val}</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-32 text-center">
          <Link to="/auth" className="px-12 py-6 bg-slate-900 text-white font-black rounded-full uppercase tracking-widest text-[11px] hover:bg-indigo-600 transition-all shadow-2xl">
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
