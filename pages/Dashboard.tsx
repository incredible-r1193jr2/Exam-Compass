
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { EXAMS } from '../constants';
import { UserSession } from '../App';
import { Milestone } from '../types';

interface DashboardProps {
  user: UserSession;
}

// Comprehensive Syllabi Data (Detailed for JEE, NEET, UPSC, CLAT)
const SYLLABI: Record<string, Record<string, string[]>> = {
  'JEE Main': {
    Physics: [
      'Units and Measurements', 'Kinematics', 'Laws of Motion', 'Work, Energy and Power', 
      'Rotational Motion', 'Gravitation', 'Thermodynamics', 'Electrostatics', 
      'Current Electricity', 'Magnetic Effects', 'Optics', 'Modern Physics'
    ],
    Chemistry: [
      'Basic Concepts', 'Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 
      'Equilibrium', 'Redox Reactions', 's-Block', 'p-Block', 'Organic Basics', 'Hydrocarbons'
    ],
    Mathematics: [
      'Sets & Functions', 'Complex Numbers', 'Matrices', 'Permutations', 'Binomial Theorem',
      'Calculus', 'Coordinate Geometry', 'Vectors', 'Probability', 'Trigonometry'
    ]
  },
  'NEET UG': {
    Biology: [
      'Diversity in Living World', 'Structural Organisation', 'Cell Structure', 'Plant Physiology',
      'Human Physiology', 'Reproduction', 'Genetics & Evolution', 'Biotechnology', 'Ecology'
    ],
    Physics: [
      'Physical World', 'Kinematics', 'Laws of Motion', 'Thermodynamics', 'Electrostatics',
      'Current Electricity', 'Optics', 'Dual Nature', 'Atoms & Nuclei', 'Electronic Devices'
    ],
    Chemistry: [
      'Some Basic Concepts', 'Structure of Atom', 'Chemical Bonding', 'Equilibrium', 
      'Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Biomolecules'
    ]
  },
  'UPSC CSE': {
    'GS Prelims': [
      'Indian History', 'National Movement', 'Indian & World Geography', 'Indian Polity',
      'Economic Development', 'Environmental Ecology', 'General Science', 'Current Events'
    ],
    'CSAT': [
      'Reading Comprehension', 'Logical Reasoning', 'Analytical Ability', 'Decision Making',
      'General Mental Ability', 'Basic Numeracy', 'Data Interpretation'
    ]
  },
  'CLAT': {
    'Legal Reasoning': ['Torts', 'Contracts', 'Criminal Law', 'Constitutional Law', 'Legal Maxims'],
    'Logical Reasoning': ['Critical Reasoning', 'Analogies', 'Syllogisms', 'Logical Sequences'],
    'English': ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Idioms']
  }
};

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const query = new URLSearchParams(useLocation().search);
  const examId = query.get('exam') || user.targetExams[0] || '1';
  const exam = EXAMS.find(e => e.id === examId) || EXAMS[0];

  const examSyllabus = SYLLABI[exam.shortName] || { 'General': exam.syllabusHighlights };
  const subjects = Object.keys(examSyllabus);
  
  const [syllabusTab, setSyllabusTab] = useState<string>(subjects[0]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [communityPosts, setCommunityPosts] = useState<Milestone[]>([]);
  const [tabAnimating, setTabAnimating] = useState(false);

  useEffect(() => {
    if (!subjects.includes(syllabusTab)) {
      setSyllabusTab(subjects[0]);
    }
    
    const savedPosts = localStorage.getItem('ec_portfolio_posts');
    if (savedPosts) {
      setCommunityPosts(JSON.parse(savedPosts).slice(0, 4));
    }

    const saved = localStorage.getItem(`ec_completed_${exam.id}`);
    if (saved) {
      setCompletedChapters(JSON.parse(saved));
    }
  }, [exam.id, exam.shortName]);

  const toggleChapter = (chapter: string) => {
    const newChapters = completedChapters.includes(chapter)
      ? completedChapters.filter(c => c !== chapter)
      : [...completedChapters, chapter];
    setCompletedChapters(newChapters);
    localStorage.setItem(`ec_completed_${exam.id}`, JSON.stringify(newChapters));
  };

  const switchTab = (tab: string) => {
    setTabAnimating(true);
    setTimeout(() => {
      setSyllabusTab(tab);
      setTabAnimating(false);
    }, 150);
  };

  const currentSyllabus = examSyllabus[syllabusTab] || [];
  const totalChaptersAcrossAll = Object.values(examSyllabus).flat().length;
  const totalCompletedAcrossAll = completedChapters.length;
  const globalProgress = totalChaptersAcrossAll > 0 ? Math.floor((totalCompletedAcrossAll / totalChaptersAcrossAll) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      {/* Dynamic Header */}
      <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
              {exam.stream} Roadmap
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Aspirant Workspace</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            {exam.shortName} <br />
            <span className="gradient-text">Command Center.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">Welcome back, {user.name.split(' ')[0]}. Here is your path to the Class of {user.targetYear}.</p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                 <i className="fas fa-calendar-alt"></i>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Exam Date</p>
                 <p className="text-xl font-black text-slate-900">{new Date(exam.nextDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Section */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Syllabus Tracker Card */}
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm p-10 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
               <div className="space-y-1">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Syllabus Tracker</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visual progress of your curriculum</p>
               </div>
               <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1 overflow-x-auto">
                 {subjects.map(tab => (
                   <button 
                     key={tab}
                     onClick={() => switchTab(tab)}
                     className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                       syllabusTab === tab ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-400 hover:text-slate-600'
                     }`}
                   >
                     {tab}
                   </button>
                 ))}
               </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12 transition-opacity duration-200 ${tabAnimating ? 'opacity-0' : 'opacity-100'}`}>
               {currentSyllabus.map((chapter, i) => (
                 <button 
                   key={i} 
                   onClick={() => toggleChapter(chapter)}
                   className="flex items-center gap-4 group text-left p-2 -ml-2 rounded-2xl hover:bg-slate-50 transition-all"
                 >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      completedChapters.includes(chapter) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 bg-white group-hover:border-indigo-300'
                    }`}>
                      {completedChapters.includes(chapter) && <i className="fas fa-check text-[10px]"></i>}
                    </div>
                    <span className={`text-sm font-bold tracking-tight ${completedChapters.includes(chapter) ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                      {chapter}
                    </span>
                 </button>
               ))}
            </div>

            <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <span className="text-xs font-black">{globalProgress}%</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Mastery</p>
                    <div className="h-1.5 w-32 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                       <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${globalProgress}%` }}></div>
                    </div>
                  </div>
               </div>
               <Link to="/resources" className="px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">
                 Open Study Vault <i className="fas fa-arrow-right ml-2"></i>
               </Link>
            </div>
          </div>

          {/* Peer Milestones Section - Match Landing Page Style */}
          <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-sm">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Peer Benchmarks</h3>
                <Link to="/community" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Global Feed</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityPosts.length > 0 ? communityPosts.map((post, i) => (
                  <div key={i} className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-default">
                    <img src={post.userAvatar} className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100" alt={post.userName} />
                    <div className="flex-grow">
                      <p className="text-sm font-black text-slate-900 tracking-tight line-clamp-1">{post.userName}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${60 + (i*10)}%` }}></div>
                         </div>
                         <span className="text-[9px] font-black text-emerald-600 uppercase">Match</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 py-10 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">No active peers right now.</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Sidebar Sections */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* AI Advisor - High Impact */}
          <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                   <i className="fas fa-robot text-2xl"></i>
                </div>
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Aspirant Twin AI</h3>
                <p className="text-xl font-medium leading-relaxed mb-8 text-indigo-50">
                   "Your current pace in <span className="font-black text-white">{syllabusTab}</span> is 12% faster than last month. Double down on Mock Tests this week."
                </p>
                <button className="w-full py-5 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-400 hover:text-white transition-all shadow-xl">
                   Full Analysis <i className="fas fa-bolt ml-2"></i>
                </button>
             </div>
             <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
          </div>

          {/* Success Probability Gauge */}
          <div className="bg-white rounded-[3.5rem] border border-slate-100 p-12 shadow-sm flex flex-col items-center">
             <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12 text-center">Success Index</h4>
             <div className="relative w-full flex items-center justify-center" style={{ maxWidth: '240px', aspectRatio: '1/0.95' }}>
                <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 200 180">
                  <path d="M 35 150 A 65 65 0 1 1 165 150" fill="none" stroke="#f1f5f9" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 35 150 A 65 65 0 1 1 165 150" fill="none" stroke="url(#probGradientDash)" strokeWidth="16" strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 - (300 * (globalProgress / 100))} className="transition-all duration-2000 ease-out" />
                  <defs>
                    <linearGradient id="probGradientDash" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-6xl font-black text-slate-900 tracking-tighter">{globalProgress}</span>
                    <span className="text-2xl font-black text-indigo-600 ml-1">%</span>
                  </div>
                </div>
             </div>
             <p className="mt-12 text-slate-400 text-center text-[10px] font-black uppercase tracking-[0.2em] px-4 leading-relaxed opacity-60">Syllabus Completion Integrity</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 text-center shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Questions</p>
                <p className="text-3xl font-black text-slate-900">1.2k</p>
             </div>
             <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 text-center shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Study Hours</p>
                <p className="text-3xl font-black text-slate-900">42h</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
