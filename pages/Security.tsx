
import React from 'react';

const Security: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-12">
      <div className="max-w-[900px] mx-auto px-6 py-20 animate-fade-in-up">
        <header className="mb-16 text-center">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <i className="fas fa-shield-halved text-2xl"></i>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Fortified Security</h1>
          <p className="text-slate-500 font-medium">Protecting the intellectual progress of millions.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            { title: 'End-to-End Encryption', icon: 'fa-lock', desc: 'All student data is encrypted at rest using AES-256 and in transit via TLS 1.3.' },
            { title: 'Identity Protection', icon: 'fa-user-shield', desc: 'Multi-factor authentication and secure OTP-based login systems for all aspirants.' },
            { title: 'AI Boundary Control', icon: 'fa-microchip', desc: 'Rigorous sanitization of data before processing through large language models.' },
            { title: 'Global Compliance', icon: 'fa-clipboard-check', desc: 'Adherence to international security standards and local Indian data laws.' }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
               <i className={`fas ${item.icon} text-indigo-600 text-2xl mb-6 group-hover:scale-110 transition-transform`}></i>
               <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white text-center relative overflow-hidden">
           <h3 className="text-2xl font-black mb-4 relative z-10">Found a Security Bug?</h3>
           <p className="text-indigo-100 mb-8 relative z-10 font-medium">We run a bug bounty program for the security community. Report vulnerabilities to security@examcompass.com.</p>
           <button className="px-10 py-4 bg-white text-indigo-600 rounded-full font-black text-[10px] uppercase tracking-widest relative z-10 shadow-xl">Report Issue</button>
           <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Security;
