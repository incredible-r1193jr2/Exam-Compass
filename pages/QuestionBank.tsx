
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MOCK_QUESTIONS, PAST_PAPERS, EXAMS } from '../constants';
import { PastPaper } from '../types';

const QuestionBank: React.FC = () => {
  const [view, setView] = useState<'vault' | 'practice' | 'results'>('vault');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [lockedAnswers, setLockedAnswers] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef<number | null>(null);

  const years = ['2025', '2024', '2023', '2022', '2021', '2020'];

  useEffect(() => {
    if (view === 'practice' && timeRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && view === 'practice') {
      setIsTimeUp(true);
      if (timerRef.current) clearInterval(timerRef.current);
      handleFinishTest();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [view, timeRemaining]);

  const calculateResults = () => {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    
    MOCK_QUESTIONS.forEach((q, i) => {
      if (userAnswers[i] !== undefined && userAnswers[i] !== -1) {
        if (userAnswers[i] === q.correctOption) {
          score += 4;
          correct++;
        } else {
          score -= 1;
          wrong++;
        }
      }
    });

    const totalAttempted = correct + wrong;
    const accuracy = totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0;

    return { score, correct, wrong, total: MOCK_QUESTIONS.length, accuracy };
  };

  const handleFinishTest = () => {
    const results = calculateResults();
    
    // Save to global history for Analytics Vault
    const savedHistory = JSON.parse(localStorage.getItem('ec_mock_history') || '[]');
    const newEntry = {
      name: `Mock ${savedHistory.length + 1}`,
      score: results.score,
      avg: 60, // Dummy peer average for comparison
      accuracy: `${results.accuracy}%`,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedHistory = [...savedHistory, newEntry];
    localStorage.setItem('ec_mock_history', JSON.stringify(updatedHistory));
    
    // Save to benchmarks table
    const savedBenchmarks = JSON.parse(localStorage.getItem('ec_mock_benchmarks') || '[]');
    const newBenchmark = {
      name: `JEE Main Archive ${selectedYear} Series`,
      score: `${results.score}/${MOCK_QUESTIONS.length * 4}`,
      accuracy: `${results.accuracy}%`,
      date: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('ec_mock_benchmarks', JSON.stringify([newBenchmark, ...savedBenchmarks]));
    
    setView('results');
  };

  const enterPractice = (year: string) => {
    if (year !== '2025') return;
    setSelectedYear(year);
    setTimeRemaining(45 * 60);
    setCurrentIndex(0);
    setUserAnswers({});
    setLockedAnswers({});
    setIsTimeUp(false);
    setView('practice');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (view === 'vault') {
    return (
      <div className="max-w-[1300px] mx-auto px-6 py-12 animate-in fade-in duration-700 lg:pt-32">
        <header className="mb-20">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full w-fit border border-indigo-100 mb-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Official PYQ Archives</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4">Paper Archive.</h1>
          <p className="text-slate-500 text-lg font-medium">Select a cycle to launch a high-fidelity simulation of the JEE Main examination.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {years.map(year => {
            const isSoon = year !== '2025';
            return (
              <div 
                key={year} 
                className={`bg-white rounded-[3.5rem] p-10 border border-slate-100 transition-all group relative overflow-hidden ${
                  isSoon ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:shadow-2xl cursor-pointer hover:-translate-y-1'
                }`}
                onClick={() => !isSoon && enterPractice(year)}
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all ${
                    isSoon ? 'bg-slate-50 text-slate-200' : 'bg-indigo-50 text-indigo-600 shadow-inner'
                  }`}>
                    <i className="fas fa-scroll text-2xl"></i>
                  </div>
                  {isSoon ? (
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-amber-100">Coming Soon</span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-100">Active</span>
                  )}
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">{year} Series</h3>
                <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">
                  {isSoon ? 'Authentic archival data currently being indexed for precision simulations.' : '30-Question master cycle including full syllabus analytics and marking.'}
                </p>
                <div className="space-y-3 relative z-10">
                   {['Physics', 'Chemistry', 'Mathematics'].map(subject => (
                     <div key={subject} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent">
                        <span className="font-bold text-slate-600 text-xs">{subject}</span>
                        <span className="text-[9px] font-black text-indigo-600/50 uppercase tracking-widest">30 Questions</span>
                     </div>
                   ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'results') {
    const { score, correct, wrong, accuracy } = calculateResults();
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-in zoom-in-95 duration-500 lg:pt-32">
         <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-3xl border border-slate-100 text-center">
            <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-4xl shadow-2xl shadow-indigo-200">
               <i className="fas fa-trophy"></i>
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Simulation Complete</h2>
            <p className="text-slate-400 font-medium mb-16 uppercase tracking-widest text-[11px]">JEE Mains Archive Performance Report</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Final Score</p>
                  <p className="text-5xl font-black text-slate-900">{score}</p>
               </div>
               <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Accuracy</p>
                  <p className="text-5xl font-black text-emerald-700">{accuracy}%</p>
               </div>
               <div className="p-10 bg-rose-50 rounded-[3rem] border border-rose-100">
                  <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-3">Penalty</p>
                  <p className="text-5xl font-black text-rose-700">-{wrong}</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('vault')}
                className="flex-grow py-6 bg-slate-900 text-white font-black rounded-[2rem] uppercase tracking-widest text-[11px] hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
              >
                Return to Vault
              </button>
              <button 
                onClick={() => window.location.hash = '#/mocks'}
                className="flex-grow py-6 bg-indigo-50 text-indigo-600 font-black rounded-[2rem] uppercase tracking-widest text-[11px] hover:bg-indigo-100 transition-all active:scale-95"
              >
                View in Analytics
              </button>
            </div>
         </div>
      </div>
    );
  }

  const currentQuestion = MOCK_QUESTIONS[currentIndex];
  const isSelected = userAnswers[currentIndex] !== undefined;
  const isLocked = lockedAnswers[currentIndex] === true;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in slide-in-from-right-4 duration-500 lg:pt-32">
      <div className="flex justify-between items-center mb-12">
        <button onClick={() => setView('vault')} className="flex items-center gap-3 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-slate-900 transition-all group">
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Exit Archive
        </button>
        <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4">
           <div className={`w-3 h-3 rounded-full ${timeRemaining < 300 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
           <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest font-mono">{formatTime(timeRemaining)} Remaining</span>
        </div>
      </div>
      
      <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white shadow-3xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-16">
            <span className="px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 border border-white/10">{selectedYear} Series • JEE Main Simulation</span>
            <div className="flex gap-1.5">
               {MOCK_QUESTIONS.map((_, i) => (
                 <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-indigo-600 w-8' : lockedAnswers[i] ? 'bg-emerald-500 w-2' : 'bg-white/10 w-2'}`}></div>
               ))}
            </div>
          </div>
          
          <div className="mb-20">
            <div className="flex gap-4 mb-8">
               <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase text-indigo-300 border border-white/10">{currentQuestion.subject}</span>
               <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase text-slate-400 border border-white/10">{currentQuestion.topic}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-16 leading-[1.1] tracking-tighter text-white">
              {currentQuestion.text}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {currentQuestion.options.map((opt, i) => (
                 <button 
                  key={i} 
                  disabled={isLocked}
                  onClick={() => setUserAnswers({ ...userAnswers, [currentIndex]: i })}
                  className={`w-full text-left p-10 border rounded-[3rem] transition-all font-bold text-xl group flex items-center gap-8 ${
                    userAnswers[currentIndex] === i 
                      ? 'bg-indigo-600/30 border-indigo-500 ring-4 ring-indigo-500/20 shadow-2xl' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  } ${isLocked ? 'cursor-not-allowed opacity-80' : ''}`}
                 >
                    <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-sm font-black transition-all shrink-0 ${
                      userAnswers[currentIndex] === i 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white/10 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'
                    }`}>
                      {userAnswers[currentIndex] === i && isLocked ? <i className="fas fa-lock"></i> : String.fromCharCode(65 + i)}
                    </div>
                    <span className={`transition-colors ${userAnswers[currentIndex] === i ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {opt}
                    </span>
                 </button>
               ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-white/10">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="text-center px-4">
                   <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Question</p>
                   <p className="text-xl font-black">{currentIndex + 1} <span className="text-sm opacity-30">/ 30</span></p>
                </div>
                <button 
                  onClick={() => {
                    if (currentIndex < MOCK_QUESTIONS.length - 1) {
                      setCurrentIndex(currentIndex + 1);
                    } else {
                      handleFinishTest();
                    }
                  }}
                  className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
             </div>
             
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setUserAnswers({ ...userAnswers, [currentIndex]: -1 })}
                  className="px-10 py-6 font-black text-slate-400 uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                >
                  Skip
                </button>
                <button 
                  onClick={() => {
                    if (!isSelected) return;
                    setLockedAnswers({ ...lockedAnswers, [currentIndex]: true });
                    if (currentIndex < MOCK_QUESTIONS.length - 1) {
                      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
                    } else {
                      handleFinishTest();
                    }
                  }}
                  className={`px-16 py-6 font-black rounded-3xl uppercase tracking-[0.2em] text-[11px] transition-all shadow-2xl active:scale-95 flex items-center gap-3 ${
                    isSelected 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                      : 'bg-white/5 text-slate-600 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  {isLocked ? 'Answer Locked' : 'Lock & Next'}
                  <i className="fas fa-bolt text-[10px]"></i>
                </button>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px] -mb-96 -mr-96 pointer-events-none select-none"></div>
      </div>

      {isTimeUp && (
        <div className="fixed inset-0 z-[70] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-[4rem] p-16 max-w-xl w-full shadow-2xl text-center">
             <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-4xl shadow-inner border border-rose-100/50">
                <i className="fas fa-hourglass-end"></i>
             </div>
             <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Time Expired</h3>
             <p className="text-slate-500 mb-12 font-medium text-lg leading-relaxed">The examination cycle has ended. Your current progress will now be submitted for final grading.</p>
             <button 
                onClick={handleFinishTest}
                className="w-full py-6 bg-slate-900 text-white font-black rounded-[1.5rem] uppercase tracking-widest text-[11px] hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
             >
                Generate Report
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;