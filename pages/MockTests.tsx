
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-5 rounded-[1.5rem] shadow-2xl border border-white/10 text-xs font-bold">
        <p className="text-slate-400 mb-2 uppercase tracking-widest text-[9px]">{label}</p>
        <p className="text-2xl font-black text-white">{payload[0].value} <span className="text-[10px] opacity-50 uppercase">Score</span></p>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-slate-300">Above Peer Avg: +{payload[0].value - (payload[1]?.value || 0)}</span>
        </div>
      </div>
    );
  }
  return null;
};

const MockTests: React.FC = () => {
  const [mockHistory, setMockHistory] = useState<any[]>([]);
  const [benchmarks, setBenchmarks] = useState<any[]>([]);
  const [probScore, setProbScore] = useState(0);

  useEffect(() => {
    const savedHistory = localStorage.getItem('ec_mock_history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setMockHistory(parsed);
      if (parsed.length > 0) {
        const latest = parsed[parsed.length - 1].score;
        setProbScore(Math.min(95, Math.floor((latest / 300) * 100)));
      }
    }

    const savedBenchmarks = localStorage.getItem('ec_mock_benchmarks');
    if (savedBenchmarks) {
      setBenchmarks(JSON.parse(savedBenchmarks));
    }
  }, []);

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full w-fit border border-indigo-100">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Performance Center</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-2">Analytics Vault</h1>
          <p className="text-slate-500 font-medium">Data-driven performance insights for the competitive edge.</p>
        </div>
        <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-full shadow-xl hover:bg-indigo-600 transition-all flex items-center gap-3 active:scale-95 group uppercase tracking-widest text-[10px]">
          Start Full Length Mock
          <i className="fas fa-bolt group-hover:animate-bounce"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col min-h-[480px]">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                <i className="fas fa-chart-line text-lg"></i>
              </div>
              Score Progression
            </h3>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Score</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-200 rounded-sm"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Peer Avg</span>
               </div>
            </div>
          </div>
          
          <div className="h-[340px] w-full flex-grow">
            {mockHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockHistory} barGap={10} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }} />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="url(#scoreGradient)" barSize={28} />
                  <Bar dataKey="avg" fill="#e2e8h0" radius={[8, 8, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100">
                  <i className="fas fa-chart-bar text-3xl"></i>
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No mock test data yet. Start your first test!</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-between min-h-[480px]">
          <h4 className="text-[10px] font-black text-slate-400 mb-12 uppercase tracking-[0.3em] text-center">Success Probability</h4>
          <div className="relative w-full flex items-center justify-center overflow-visible" style={{ maxWidth: '240px', aspectRatio: '1/0.9' }}>
            <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 200 180">
              <path d="M 30 150 A 70 70 0 1 1 170 150" fill="none" stroke="#f1f5f9" strokeWidth="14" strokeLinecap="round" />
              <path d="M 30 150 A 70 70 0 1 1 170 150" fill="none" stroke="url(#mockProbGradient)" strokeWidth="14" strokeLinecap="round" strokeDasharray="330" strokeDashoffset={330 - (330 * (probScore / 100))} className="transition-all duration-1000 ease-out" />
              <defs><linearGradient id="mockProbGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs>
            </svg>
            <div className="absolute text-center mt-8">
              <div className="flex items-baseline justify-center">
                <span className="text-6xl font-black text-slate-900 tracking-tighter">{probScore}</span>
                <span className="text-2xl font-black text-indigo-600 ml-1">%</span>
              </div>
            </div>
          </div>
          <p className="mt-10 text-slate-400 text-center text-[10px] font-black uppercase tracking-[0.15em] opacity-70 px-6 leading-relaxed">
            {probScore > 0 ? "Analyzing your trend patterns for 2026..." : "Complete tests to unlock your index."}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between mb-10">
           <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Benchmarks</h3>
           <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Download Report</button>
        </div>
        <div className="overflow-x-auto minimal-scrollbar">
          {benchmarks.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                  <th className="px-6 py-6">Test Module</th>
                  <th className="px-6 py-6 text-center">Final Score</th>
                  <th className="px-6 py-6 text-center">Accuracy</th>
                  <th className="px-6 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {benchmarks.map((test, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-6 font-bold text-slate-900">{test.name}</td>
                    <td className="px-6 py-6 text-center">
                       <span className="px-4 py-1.5 bg-slate-50 rounded-full font-black text-slate-600 text-xs border border-slate-100">{test.score}</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                       <span className="font-black text-indigo-600 text-xs">{test.accuracy}</span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button className="px-6 py-2 bg-white border border-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                <i className="fas fa-file-invoice text-2xl"></i>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No benchmark results available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockTests;
