
import React from 'react';
import { STUDY_RESOURCES } from '../constants';

const StudyResourcesPage: React.FC = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full w-fit border border-indigo-100">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Aspirant Vault</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">Study Resources</h1>
          <p className="text-slate-500 font-medium text-lg">Curated materials from the top 1% educators.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 minimal-scrollbar">
          {['All Library', 'Full Sessions', 'Master Notes', 'Exam Books', 'PYQ Vault'].map((tab) => (
            <button key={tab} className={`px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${tab === 'All Library' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 border-slate-900' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {STUDY_RESOURCES.map((res) => (
          <div key={res.id} className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all group flex flex-col h-full overflow-hidden">
            <div className="relative mb-8 overflow-hidden rounded-[2.5rem]">
              <img 
                src={`https://picsum.photos/seed/${res.id}/400/220`} 
                alt={res.title} 
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest shadow-sm border border-white/20">
                {res.type}
              </div>
            </div>
            
            <div className="flex-grow px-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{res.subject}</span>
                <span className="text-slate-200">/</span>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-black tracking-widest uppercase">
                  <i className="fas fa-star text-[9px]"></i>
                  {res.rating} RATING
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">
                {res.title}
              </h3>
            </div>

            <div className="flex gap-3 px-2 pt-6 border-t border-slate-50">
              <button className="flex-grow py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-slate-100">
                View Material
              </button>
              <button className="w-14 h-14 flex items-center justify-center border border-slate-100 rounded-2xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all">
                <i className="far fa-bookmark text-lg"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-3xl shadow-slate-200">
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-indigo-400">
             <i className="fas fa-question text-2xl"></i>
          </div>
          <h2 className="text-4xl font-black mb-6 tracking-tighter">Need a Specific Resource?</h2>
          <p className="text-slate-400 mb-12 font-medium text-lg leading-relaxed">Can't find a particular topic? Our community and AI can help source or generate the best notes for your preparation.</p>
          <button className="px-12 py-6 bg-indigo-600 text-white font-black rounded-[1.5rem] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20 text-[11px] uppercase tracking-[0.2em] scale-110 active:scale-100">
            Ask the Community
          </button>
        </div>
        <div className="absolute -right-40 -top-40 opacity-[0.03] select-none pointer-events-none">
          <i className="fas fa-search-plus text-[500px]"></i>
        </div>
      </div>
    </div>
  );
};

export default StudyResourcesPage;
