
import React from 'react';

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-12">
      <div className="max-w-[1000px] mx-auto px-6 py-20 animate-fade-in-up">
        <header className="mb-20 text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.9]">
            We're here <br /> to <span className="text-indigo-600">help you win.</span>
          </h1>
          <div className="relative max-w-xl mx-auto">
             <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
             <input 
              type="text" 
              placeholder="How do I link a parent email?"
              className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-indigo-600 focus:bg-white outline-none font-bold text-lg shadow-sm transition-all"
             />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'Technical FAQ', icon: 'fa-book-open-reader', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { title: 'Billing & Pro', icon: 'fa-credit-card', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { title: 'Exam Deadlines', icon: 'fa-calendar-check', color: 'text-amber-500', bg: 'bg-amber-50' }
          ].map((card, i) => (
            <button key={i} className="flex flex-col items-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
               <div className={`w-16 h-16 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                  <i className={`fas ${card.icon}`}></i>
               </div>
               <span className="font-black text-slate-900 tracking-tight">{card.title}</span>
            </button>
          ))}
        </div>

        <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Direct Support</h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">Can't find what you're looking for? Our student success team typically responds within 4 hours during exam season.</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-slate-700 font-bold">
                    <i className="fas fa-envelope text-indigo-600"></i>
                    support@examcompass.com
                 </div>
                 <div className="flex items-center gap-4 text-slate-700 font-bold">
                    <i className="fab fa-whatsapp text-emerald-600"></i>
                    +91 800-COMPASS
                 </div>
              </div>
           </div>
           <form className="space-y-6 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Message Topic</label>
                <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 outline-none">
                  <option>Technical Issue</option>
                  <option>Mock Test Feedback</option>
                  <option>Pro Subscription</option>
                  <option>Career Simulator Doubt</option>
                </select>
              </div>
              <textarea placeholder="Describe your issue..." className="w-full bg-slate-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-indigo-50 outline-none font-medium text-slate-700 min-h-[140px] resize-none"></textarea>
              <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all uppercase tracking-widest text-[10px] shadow-xl">Send Ticket</button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
