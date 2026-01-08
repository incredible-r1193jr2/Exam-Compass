
import React, { useState } from 'react';
import { MOCK_QUESTIONS, EXAMS } from '../constants';

const QuestionBank: React.FC = () => {
  const [view, setView] = useState<'vault' | 'practice'>('vault');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const years = ['2025', '2024', '2023', '2022', '2021', '2020'];

  if (view === 'vault') {
    return (
      <div className="max-w-[1300px] mx-auto px-6 py-12 animate-in fade-in duration-700">
        <header className="mb-20">
           <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full w-fit border border-indigo-100 mb-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">PYQ Archives</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-4">Past Paper Vault</h1>
          <p className="text-slate-500 text-lg font-medium">Systematic archives of previous year questions (PYQs).</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {years.map(year => (
            <div 
              key={year} 
              className="bg-white rounded-[3rem] p-10 border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer relative overflow-hidden"
              onClick={() => {
                setSelectedYear(year);
                setView('practice');
              }}
            >
              <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all mb-10 border border-slate-100 shadow-inner">
                <i className="fas fa-archive text-2xl"></i>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">{year} Series</h3>
              <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">Full syllabus coverage with detailed video solutions and difficulty analysis.</p>
              
              <div className="space-y-3 relative z-10">
                 {['Physics', 'Chemistry', 'Mathematics'].map(subject => (
                   <div key={subject} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-colors">
                      <span className="font-bold text-slate-700 text-sm">{subject}</span>
                      <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">30 Questions</span>
                   </div>
                 ))}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-600/10 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in slide-in-from-right-4 duration-500">
      <button onClick={() => setView('vault')} className="mb-12 flex items-center gap-3 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-slate-900 transition-all group">
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Back to Vault
      </button>
      
      <div className="bg-slate-900 rounded-[3.5rem] p-12 md:p-16 text-white shadow-3xl shadow-slate-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <span className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 border border-white/10">{selectedYear} Series • Mock 01</span>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Time Remaining</p>
              <p className="text-xl font-black text-white">45:00</p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-10 leading-tight tracking-tight">{MOCK_QUESTIONS[0].text}</h2>
            <div className="grid grid-cols-1 gap-4">
               {MOCK_QUESTIONS[0].options.map((opt, i) => (
                 <button key={i} className="w-full text-left p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-indigo-500 transition-all font-bold text-lg group flex items-center gap-6">
                    <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">{String.fromCharCode(65 + i)}</span>
                    {opt}
                 </button>
               ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-white/10">
             <div className="flex items-center gap-4">
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Question 1 of 30</p>
                <div className="flex gap-1.5">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-white/10'}`}></div>
                   ))}
                </div>
             </div>
             <button className="px-12 py-5 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-xl">Check Answer</button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mb-48 -mr-48"></div>
      </div>
    </div>
  );
};

export default QuestionBank;
