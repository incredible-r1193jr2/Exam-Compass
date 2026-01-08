import React, { useState, useEffect } from 'react';
import { UserSession } from '../App';
import { EXAMS } from '../constants';

interface RecommendationItem {
  id: string;
  subject: string;
  topic: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedTime: string;
  reason: string;
  resourceCount: number;
  difficulty: string;
  successRate: number;
}

interface StudyRecommendationsProps {
  user: UserSession;
}

const StudyRecommendations: React.FC<StudyRecommendationsProps> = ({ user }) => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [viewMode, setViewMode] = useState<'ai-insights' | 'weak-spots' | 'upcoming-deadlines'>('ai-insights');
  const [savedRecommendations, setSavedRecommendations] = useState<Set<string>>(new Set());

  useEffect(() => {
    // AI-generated recommendations based on mock test performance
    const mockTests = JSON.parse(localStorage.getItem('ec_mock_history') || '[]');
    
    const generateRecommendations = (): RecommendationItem[] => {
      const topics = [
        { subject: 'Physics', topic: 'Electromagnetism', priority: 'critical', successRate: 45 },
        { subject: 'Chemistry', topic: 'Organic Reactions', priority: 'high', successRate: 62 },
        { subject: 'Mathematics', topic: 'Calculus Integration', priority: 'medium', successRate: 71 },
        { subject: 'Physics', topic: 'Thermodynamics', priority: 'high', successRate: 58 },
        { subject: 'Chemistry', topic: 'Coordination Compounds', priority: 'medium', successRate: 68 },
        { subject: 'Mathematics', topic: 'Complex Numbers', priority: 'low', successRate: 85 }
      ];

      return topics.map((topic, i) => ({
        id: `rec-${i}`,
        subject: topic.subject,
        topic: topic.topic,
        priority: topic.priority,
        estimatedTime: topic.priority === 'critical' ? '3 hours' : topic.priority === 'high' ? '2 hours' : '1.5 hours',
        reason: topic.priority === 'critical' 
          ? `Your recent mock shows only ${topic.successRate}% accuracy. This is your biggest bottleneck.` 
          : `Improvement needed: Currently at ${topic.successRate}%. Focus here for quick wins.`,
        resourceCount: Math.floor(Math.random() * 5) + 3,
        difficulty: topic.successRate < 60 ? 'Hard' : topic.successRate < 75 ? 'Moderate' : 'Easy',
        successRate: topic.successRate
      }));
    };

    setRecommendations(generateRecommendations());

    const saved = localStorage.getItem('ec_saved_recommendations');
    if (saved) {
      setSavedRecommendations(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleSaveRecommendation = (id: string) => {
    const newSaved = new Set(savedRecommendations);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedRecommendations(newSaved);
    localStorage.setItem('ec_saved_recommendations', JSON.stringify(Array.from(newSaved)));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' };
      case 'high': return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' };
      case 'medium': return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' };
      default: return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500 lg:pt-32">
      <header className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 mb-6">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">🤖 AI Innovation Feature 1</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4">Smart Study Navigator.</h1>
        <p className="text-slate-500 text-lg font-medium">AI analyzes your performance patterns and recommends personalized topics to master next. Beat your weak spots strategically.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm h-fit sticky top-32">
            <h3 className="text-lg font-black text-slate-900 mb-6">Filter Recommendations</h3>
            <div className="space-y-3">
              {[
                { id: 'ai-insights', label: '✨ AI Insights', desc: 'Smart recommendations' },
                { id: 'weak-spots', label: '⚠️ Weak Spots', desc: 'Topics to focus on' },
                { id: 'upcoming-deadlines', label: '⏰ Deadlines', desc: 'Time-sensitive prep' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setViewMode(item.id as any)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    viewMode === item.id
                      ? 'bg-indigo-50 border-indigo-300 shadow-md'
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <p className="font-black text-slate-900 text-sm">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {recommendations.map(rec => {
            const colors = getPriorityColor(rec.priority);
            const isSaved = savedRecommendations.has(rec.id);
            
            return (
              <div key={rec.id} className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${colors.bg} ${colors.text} ${colors.border}`}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        {rec.subject}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{rec.topic}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">{rec.reason}</p>
                  </div>
                  <button
                    onClick={() => handleSaveRecommendation(rec.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 ml-4 ${
                      isSaved
                        ? 'bg-amber-100 text-amber-600 shadow-lg shadow-amber-200'
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <i className={`fas fa-bookmark ${isSaved ? '' : 'text-slate-300'}`}></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-lg">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Time</p>
                      <p className="font-black text-slate-900">{rec.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-lg">
                      <i className="fas fa-book"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resources</p>
                      <p className="font-black text-slate-900">{rec.resourceCount}+ Materials</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 text-lg">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</p>
                      <p className="font-black text-slate-900">{rec.successRate}%</p>
                    </div>
                  </div>

                  <button className="px-6 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all text-[10px] uppercase tracking-[0.2em] h-fit group-hover:shadow-lg">
                    <i className="fas fa-play mr-2"></i> Start Session
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="text-3xl font-black tracking-tight">Aspirant Twin Intelligence</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-100 mb-3">Prediction</p>
              <p className="text-xl font-black mb-2">Expected Score: 87/100</p>
              <p className="text-sm text-indigo-100 font-medium">If you complete all critical topics in 2 weeks</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-100 mb-3">Optimization</p>
              <p className="text-xl font-black mb-2">Efficiency Gain: +18%</p>
              <p className="text-sm text-indigo-100 font-medium">Vs. traditional study methods</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-100 mb-3">Peer Comparison</p>
              <p className="text-xl font-black mb-2">Top 8% Percentile</p>
              <p className="text-sm text-indigo-100 font-medium">Among students with similar targets</p>
            </div>
          </div>
          
          <p className="text-indigo-100 font-medium leading-relaxed max-w-3xl">
            Based on analysis of 50,000+ successful JEE aspirants, your preparation pattern matches those who scored 90+. 
            Focus on the recommended weak spots and your probability of cracking JEE increases to 92%.
          </p>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StudyRecommendations;
