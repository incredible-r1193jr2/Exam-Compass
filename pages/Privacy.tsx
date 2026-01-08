
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-12">
      <div className="max-w-[800px] mx-auto px-6 py-20 animate-fade-in-up">
        <header className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Privacy Policy</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Last Updated: Oct 2025</p>
        </header>

        <div className="space-y-12 text-slate-600 font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">1. Data We Collect</h2>
            <p className="mb-4">To provide accurate "Aspirant Intelligence", we collect performance data from mock tests, syllabus completion rates, and focus session durations.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Profile Information: Name, Email, Target Exam, Year.</li>
              <li>Academic Data: Score trends, subject strengths, and weaknesses.</li>
              <li>Usage Data: Time spent on modules and focus timer statistics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">2. AI Data Processing</h2>
            <p className="mb-4">We use the Gemini API to analyze preparation patterns. This data is processed in a "stateless" manner, meaning your personal identity is stripped before being sent for reasoning analysis.</p>
            <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
               <p className="text-sm font-bold text-indigo-900">Your mock test answers are encrypted and only accessible to our prediction engine to calculate your success probability.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">3. Community Anonymity</h2>
            <p>The "Ghost Mode" in your settings allows you to participate in the community without revealing your full name or progress statistics. Peer mirroring always uses aggregated, anonymized data.</p>
          </section>

          <section className="pt-10 border-t border-slate-50">
             <p className="text-xs text-slate-400">If you have questions regarding your data under the Digital Personal Data Protection Act (DPDPA), contact privacy@examcompass.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
