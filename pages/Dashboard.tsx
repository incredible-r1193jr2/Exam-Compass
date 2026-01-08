
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { EXAMS } from '../constants';
import { UserSession } from '../App';
import { Milestone } from '../types';

interface DashboardProps {
  user: UserSession;
}

// Highly Detailed Comprehensive Syllabi Data
const SYLLABI: Record<string, Record<string, string[]>> = {
  'JEE Main': {
    Physics: [
      'Units and Measurements (11th)', 'Kinematics (11th)', 'Laws of Motion (11th)', 'Work, Energy and Power (11th)', 
      'Rotational Motion (11th)', 'Gravitation (11th)', 'Properties of Solids & Fluids (11th)', 'Thermodynamics (11th)', 
      'Kinetic Theory of Gases (11th)', 'Oscillations and Waves (11th)',
      'Electrostatics (12th)', 'Current Electricity (12th)', 'Magnetic Effects of Current (12th)', 
      'Magnetism and Matter (12th)', 'Electromagnetic Induction (12th)', 'Alternating Current (12th)', 
      'Electromagnetic Waves (12th)', 'Ray Optics (12th)', 'Wave Optics (12th)', 
      'Dual Nature of Radiation (12th)', 'Atoms and Nuclei (12th)', 'Electronic Devices (12th)', 
      'Communication Systems (12th)'
    ],
    Chemistry: [
      'Some Basic Concepts (11th)', 'Structure of Atom (11th)', 'Classification of Elements (11th)', 'Chemical Bonding (11th)',
      'States of Matter (11th)', 'Chemical Thermodynamics (11th)', 'Equilibrium (11th)', 'Redox Reactions (11th)', 
      'Hydrogen & s-Block (11th)', 'p-Block Elements (11th/12th)', 'Organic: Basic Principles (11th)', 'Hydrocarbons (11th)',
      'Solid State (12th)', 'Solutions (12th)', 'Electrochemistry (12th)', 'Chemical Kinetics (12th)', 
      'Surface Chemistry (12th)', 'Isolation of Elements (12th)', 'd & f Block Elements (12th)', 'Coordination Compounds (12th)',
      'Haloalkanes & Haloarenes (12th)', 'Alcohols, Phenols & Ethers (12th)', 'Aldehydes & Ketones (12th)', 'Amines (12th)',
      'Biomolecules (12th)', 'Polymers (12th)', 'Chemistry in Everyday Life (12th)'
    ],
    Mathematics: [
      'Sets, Relations and Functions (11th)', 'Complex Numbers (11th)', 'Quadratic Equations (11th)', 'Matrices & Determinants (12th)',
      'Permutations and Combinations (11th)', 'Mathematical Induction (11th)', 'Binomial Theorem (11th)', 'Sequences and Series (11th)',
      'Limit & Continuity (11th/12th)', 'Differentiability (12th)', 'Applications of Derivatives (12th)', 'Integrals (12th)',
      'Applications of Integrals (12th)', 'Differential Equations (12th)', 'Straight Lines (11th)', 'Conic Sections (11th)',
      'Three Dimensional Geometry (12th)', 'Vector Algebra (12th)', 'Statistics & Probability (12th)', 'Trigonometry (11th)',
      'Mathematical Reasoning (11th)'
    ]
  },
  'NEET UG': {
    Biology: [
      'The Living World (11th)', 'Biological Classification (11th)', 'Plant Kingdom (11th)', 'Animal Kingdom (11th)',
      'Morphology of Flowering Plants (11th)', 'Anatomy of Flowering Plants (11th)', 'Structural Organisation in Animals (11th)',
      'Cell: The Unit of Life (11th)', 'Biomolecules (11th)', 'Cell Cycle and Cell Division (11th)',
      'Transport in Plants (11th)', 'Mineral Nutrition (11th)', 'Photosynthesis (11th)', 'Respiration in Plants (11th)', 'Plant Growth (11th)',
      'Digestion and Absorption (11th)', 'Breathing and Exchange of Gases (11th)', 'Body Fluids and Circulation (11th)', 'Excretory Products (11th)',
      'Locomotion and Movement (11th)', 'Neural Control and Coordination (11th)', 'Chemical Coordination (11th)',
      'Reproduction in Organisms (12th)', 'Sexual Reproduction in Flowering Plants (12th)', 'Human Reproduction (12th)', 'Reproductive Health (12th)',
      'Principles of Inheritance (12th)', 'Molecular Basis of Inheritance (12th)', 'Evolution (12th)',
      'Human Health and Disease (12th)', 'Strategies for Enhancement in Food Production (12th)', 'Microbes in Human Welfare (12th)',
      'Biotechnology: Principles (12th)', 'Biotechnology: Applications (12th)',
      'Organisms and Populations (12th)', 'Ecosystem (12th)', 'Biodiversity and Conservation (12th)', 'Environmental Issues (12th)'
    ],
    Physics: [
      'Physical World and Measurement', 'Kinematics', 'Laws of Motion', 'Work, Energy and Power',
      'System of Particles & Rotational Motion', 'Gravitation', 'Properties of Bulk Matter', 'Thermodynamics',
      'Behavior of Perfect Gas & Kinetic Theory', 'Oscillations and Waves',
      'Electrostatics (12th)', 'Current Electricity (12th)', 'Magnetic Effects of Current (12th)', 'Electromagnetic Induction (12th)',
      'Electromagnetic Waves (12th)', 'Optics (12th)', 'Dual Nature of Matter (12th)', 'Atoms and Nuclei (12th)', 'Electronic Devices (12th)'
    ],
    Chemistry: [
      'Basic Concepts', 'Structure of Atom', 'Classification of Elements', 'Chemical Bonding',
      'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 's-Block Elements',
      'Some p-Block Elements', 'Organic Chemistry: Basic Principles', 'Hydrocarbons', 'Environmental Chemistry',
      'Solid State (12th)', 'Solutions (12th)', 'Electrochemistry (12th)', 'Chemical Kinetics (12th)',
      'Surface Chemistry (12th)', 'General Principles of Isolation (12th)', 'p, d, f Block Elements (12th)',
      'Coordination Compounds (12th)', 'Haloalkanes (12th)', 'Alcohols (12th)', 'Aldehydes (12th)', 'Amines (12th)',
      'Biomolecules (12th)', 'Polymers (12th)', 'Chemistry in Everyday Life (12th)'
    ]
  },
  'UPSC CSE': {
    'GS Prelims': [
      'Ancient History of India', 'Medieval History of India', 'Modern Indian History', 'Indian National Movement',
      'Physical Geography (World/India)', 'Social Geography', 'Economic Geography',
      'Indian Polity: Constitution', 'Governance & Public Policy', 'Panchayati Raj', 'Rights Issues',
      'Sustainable Development', 'Poverty & Inclusion', 'Demographics', 'Social Sector Initiatives',
      'General issues on Environmental Ecology', 'Bio-diversity and Climate Change',
      'General Science (Physics, Chemistry, Biology, Tech)', 'Current Events (National/International)'
    ],
    'CSAT': [
      'Reading Comprehension', 'Interpersonal Skills including Communication', 'Logical Reasoning & Analytical Ability',
      'Decision Making & Problem Solving', 'General Mental Ability', 'Basic Numeracy (Numbers, Orders of magnitude)',
      'Data Interpretation (Charts, Graphs, Tables)'
    ],
    'GS Mains': [
      'Modern Indian History (18th Century to present)', 'Post-Independence Consolidation', 'History of the World',
      'Indian Society & Diversity', 'Role of Women & Social Issues', 'Urbanization & Remedial Measures',
      'Globalisation impact on Indian Society', 'Social Empowerment, Communalism, Regionalism & Secularism',
      'Constitution of India (Historical Underpinnings)', 'Comparison of Indian Constitutional Scheme',
      'Parliament & State Legislatures', 'Structure, Org & Functioning of Exec & Judiciary', 'Representation of People’s Act',
      'Statutory, Regulatory & Quasi-judicial bodies', 'Welfare Schemes for Vulnerable Sections', 'Issues relating to Health, Edu, HR',
      'International Relations (India & Neighborhood)', 'Economic Development & Agriculture', 'Science & Technology (Indigenization)',
      'Disaster Management', 'Security Issues & Internal Security', 'Ethics, Integrity and Aptitude'
    ]
  },
  'CLAT': {
    'English & Reading': [
      'Passage-based Reading Comprehension', 'Drawing Inferences and Conclusions', 'Summarizing the Passage',
      'Vocabulary & Contextual Meaning'
    ],
    'Current Affairs & GK': [
      'National and International Events', 'Contemporary Events of Legal Significance', 'Arts and Culture',
      'International Affairs', 'Historical Events of Continuing Significance'
    ],
    'Legal Reasoning': [
      'Passage-based Legal Scenarios', 'Application of Legal Principles to Facts', 'Identification of Arguments',
      'Public Policy and Legal Philosophy'
    ],
    'Logical Reasoning': [
      'Identification of Premises and Conclusions', 'Relationship Recognition in Passages', 'Identifying Fallacies and Weaknesses',
      'Deductive and Inductive Reasoning'
    ],
    'Quantitative Techniques': [
      'Deriving Information from Graphs/Charts', 'Basic Arithmetic (Class X level)', 'Ratio and Proportions',
      'Profit and Loss', 'Averages and Percentages'
    ]
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

  useEffect(() => {
    if (!subjects.includes(syllabusTab)) {
      setSyllabusTab(subjects[0]);
    }
    
    const savedPosts = localStorage.getItem('ec_portfolio_posts');
    if (savedPosts) {
      setCommunityPosts(JSON.parse(savedPosts).slice(0, 3));
    } else {
      setCommunityPosts([]);
    }

    const saved = localStorage.getItem(`ec_completed_${exam.id}`);
    if (saved) {
      setCompletedChapters(JSON.parse(saved));
    } else {
      setCompletedChapters([]);
    }
  }, [exam.id, exam.shortName]);

  const toggleChapter = (chapter: string) => {
    const newChapters = completedChapters.includes(chapter)
      ? completedChapters.filter(c => c !== chapter)
      : [...completedChapters, chapter];
    setCompletedChapters(newChapters);
    localStorage.setItem(`ec_completed_${exam.id}`, JSON.stringify(newChapters));
  };

  const currentSyllabus = examSyllabus[syllabusTab] || [];
  const totalChaptersInSubject = currentSyllabus.length;
  const completedInSubject = completedChapters.filter(c => currentSyllabus.includes(c)).length;
  
  const totalChaptersAcrossAll = Object.values(examSyllabus).flat().length;
  const totalCompletedAcrossAll = completedChapters.length;
  const globalProgress = totalChaptersAcrossAll > 0 ? Math.floor((totalCompletedAcrossAll / totalChaptersAcrossAll) * 100) : 0;

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 animate-in fade-in duration-700">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50/50 px-3 py-1 rounded-full border border-indigo-100/50">{exam.stream} FOCUSED</span>
              <span className="text-slate-300">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">2026 Strategy Board</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              {exam.shortName} <br />
              <span className="gradient-text">Master Plan.</span>
            </h1>
            <p className="text-slate-500 font-medium text-base">Personalized deep-dive for {user.name}.</p>
          </div>
          
          <div className="flex items-center gap-2 p-1.5 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 h-fit mt-4">
             <div className="relative group overflow-hidden px-8 py-5 bg-indigo-600 rounded-[2rem] text-white text-center shadow-lg shadow-indigo-200">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-1 relative z-10">TARGET</p>
                <p className="text-3xl font-black leading-none relative z-10">2026</p>
             </div>
             <div className="px-8 py-5 text-center flex flex-col justify-center min-w-[120px]">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">COUNTDOWN</p>
                <p className="text-3xl font-black text-slate-900 leading-none">420 <span className="text-[10px] opacity-40">DAYS</span></p>
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-50/80 rounded-[1.25rem] flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm">
                  <i className="fas fa-scroll text-xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Syllabus Tracker</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Track your progress module-wise</p>
                </div>
              </div>
              
              <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1 overflow-x-auto minimal-scrollbar">
                {subjects.map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setSyllabusTab(tab)}
                    className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      syllabusTab === tab ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-10 h-[420px] overflow-y-auto pr-4 minimal-scrollbar">
              {currentSyllabus.map((chapter, i) => (
                <div 
                  key={i} 
                  onClick={() => toggleChapter(chapter)}
                  className="flex items-center justify-between py-2.5 transition-all cursor-pointer group hover:bg-slate-50/70 rounded-[1.25rem] px-3 -ml-3"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-7 h-7 rounded-[0.6rem] border-2 flex items-center justify-center transition-all ${
                      completedChapters.includes(chapter) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 bg-white group-hover:border-indigo-200'
                    }`}>
                      {completedChapters.includes(chapter) && <i className="fas fa-check text-[11px]"></i>}
                    </div>
                    <span className={`text-sm font-bold tracking-tight transition-colors ${
                      completedChapters.includes(chapter) ? 'text-slate-300 line-through' : 'text-slate-700'
                    }`}>{chapter}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-slate-50">
              <div className="flex items-center gap-3">
                 <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(completedInSubject/totalChaptersInSubject)*100}%` }}></div>
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   {completedInSubject} / {totalChaptersInSubject} {syllabusTab} Modules
                 </span>
              </div>
              <Link to="/resources" className="text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:underline flex items-center gap-3 transition-all group px-4 py-2 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                Access Study Vault <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                <i className="fas fa-users"></i>
              </div>
              Peer Milestones
            </h3>
            <div className="space-y-4">
              {communityPosts.length > 0 ? communityPosts.map(post => (
                <div key={post.id} className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100/50 hover:bg-white transition-all hover:shadow-lg cursor-pointer group">
                  <img src={post.userAvatar} className="w-12 h-12 rounded-[1rem] border-2 border-white shadow-sm" alt={post.userName} />
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{post.content}</p>
                    <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{post.userName} • Just now</p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-200 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                    <i className="fas fa-chevron-right text-xs"></i>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                     <i className="fas fa-user-friends text-2xl"></i>
                   </div>
                   <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">No recent activity.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="sticky top-28 space-y-10">
            {/* AI Advisor Card - Fixed Clipping */}
            <div className="bg-indigo-600 rounded-[3.5rem] p-1 shadow-2xl shadow-indigo-200 relative overflow-hidden group">
              <div className="relative z-10 p-10 flex flex-col h-full min-h-[360px] justify-between text-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white/20 rounded-[1.25rem] flex items-center justify-center border border-white/20 backdrop-blur-md">
                    <i className="fas fa-robot text-2xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white">AI Advisor</h3>
                </div>
                
                <div className="flex-grow flex flex-col justify-center">
                  <p className="text-xl md:text-2xl font-medium text-indigo-50 leading-relaxed mb-8">
                    "Based on recent trends, prioritizing <span className="font-black underline decoration-white/40 text-white">Mechanics</span> could yield an extra +15 marks in your next Mock Test."
                  </p>
                </div>

                <button className="w-full py-6 bg-white text-indigo-600 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3">
                  REVIEW STRATEGY
                  <i className="fas fa-bolt text-indigo-600"></i>
                </button>
              </div>
              {/* Background patterns */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
            </div>

            {/* Success Probability Card - Fixed SVG Clipping */}
            <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm flex flex-col items-center">
              <h4 className="text-[11px] font-black text-slate-400 mb-10 uppercase tracking-[0.35em] text-center">Success Probability</h4>
              <div className="relative w-full flex items-center justify-center" style={{ maxWidth: '260px', aspectRatio: '1/0.95' }}>
                <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 200 180">
                  <path d="M 35 150 A 65 65 0 1 1 165 150" fill="none" stroke="#f1f5f9" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 35 150 A 65 65 0 1 1 165 150" fill="none" stroke="url(#probGradientDash)" strokeWidth="16" strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 - (300 * (globalProgress / 100))} className="transition-all duration-1000 ease-out" />
                  <defs>
                    <linearGradient id="probGradientDash" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{globalProgress}</span>
                    <span className="text-2xl font-black text-indigo-600 ml-1.5">%</span>
                  </div>
                </div>
              </div>
              <p className="mt-12 text-slate-400 text-center text-[11px] font-black uppercase tracking-[0.2em] opacity-80 leading-relaxed px-4">Syllabus Completion Index</p>
            </div>

            {/* Aspirant Tip Card */}
            <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
                    <i className="fas fa-lightbulb text-indigo-100 text-lg"></i>
                 </div>
                 <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-4">Aspirant Insight</h4>
                 <p className="text-base font-medium leading-relaxed opacity-90 italic">
                   "{exam.shortName} candidates often miss {syllabusTab} fundamentals. Ensure your core concepts are crystal clear before tackling advanced mocks."
                 </p>
               </div>
               <i className="fas fa-quote-right absolute bottom-6 right-10 text-white/5 text-8xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
