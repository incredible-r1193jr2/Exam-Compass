import React, { useState, useRef, useEffect } from 'react';
import { geminiService, ChatMessage, AIResponse } from '../services/geminiService';

interface AIChatProps {
  user?: any;
}

const AIChat: React.FC<AIChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! 👋 I\'m your AI tutor. I can help you with:\n\n✨ Doubt Clearing - Explain concepts in your subjects\n📚 Problem Solving - Step-by-step solutions\n📝 Question Generation - Practice questions on any topic\n💡 Concept Explanation - Deep dive into topics\n🎯 Exam Preparation Tips\n\nWhat would you like help with?',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'general' | 'doubt' | 'problem' | 'questions'>('general');
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [selectedTopic, setSelectedTopic] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General'];
  const topics: Record<string, string[]> = {
    'Physics': ['Mechanics', 'Electromagnetism', 'Thermodynamics', 'Optics', 'Modern Physics'],
    'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Equilibrium'],
    'Mathematics': ['Calculus', 'Algebra', 'Geometry', 'Trigonometry', 'Probability'],
    'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Evolution'],
    'General': ['JEE Preparation', 'NEET Preparation', 'UPSC Preparation', 'Study Tips']
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      let response: AIResponse<any>;

      if (chatMode === 'doubt') {
        response = await geminiService.doubtClearing(inputValue, selectedSubject, selectedTopic);
      } else if (chatMode === 'problem') {
        response = await geminiService.solveProblem(inputValue, selectedSubject);
      } else if (chatMode === 'questions') {
        response = await geminiService.generateQuestions(selectedTopic, selectedSubject, 'Medium', 5);
      } else {
        response = await geminiService.chat(inputValue, `You are an expert exam preparation AI tutor. Help students with ${selectedSubject}.`);
      }

      if (response.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ ${response.error}`,
          timestamp: Date.now()
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data,
          timestamp: Date.now()
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Something went wrong. Please try again.',
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500 lg:pt-32 flex flex-col h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full border border-purple-100 mb-4">
          <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">🤖 AI Tutor</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-4">AI Chat Assistant</h1>
        <p className="text-slate-500 font-medium">Get instant help with doubts, problems, and exam preparation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Sidebar - Chat Options */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Chat Mode Selection */}
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Chat Mode</h3>
            <div className="space-y-2">
              {[
                { mode: 'general' as const, label: '💬 General Chat', icon: 'fa-comments' },
                { mode: 'doubt' as const, label: '❓ Doubt Clearing', icon: 'fa-lightbulb' },
                { mode: 'problem' as const, label: '📐 Solve Problem', icon: 'fa-square-root-alt' },
                { mode: 'questions' as const, label: '📝 Generate Questions', icon: 'fa-pencil' }
              ].map(item => (
                <button
                  key={item.mode}
                  onClick={() => setChatMode(item.mode)}
                  className={`w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-left flex items-center gap-2 ${
                    chatMode === item.mode
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Selection */}
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Subject</h3>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic(topics[e.target.value]?.[0] || '');
              }}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none"
            >
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Topic Selection */}
          {(chatMode === 'doubt' || chatMode === 'questions') && topics[selectedSubject] && (
            <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Topic</h3>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none"
              >
                {topics[selectedSubject].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[2.5rem] p-6 border border-indigo-100">
            <h3 className="text-sm font-black text-indigo-900 mb-4 uppercase tracking-widest">💡 Tips</h3>
            <ul className="space-y-3 text-xs text-indigo-800 font-medium">
              <li>✓ Be specific with your questions</li>
              <li>✓ Include context when possible</li>
              <li>✓ Ask for explanations step-by-step</li>
              <li>✓ Request multiple approaches</li>
            </ul>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 minimal-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm lg:max-w-md px-6 py-4 rounded-[1.5rem] ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-50 text-slate-900 rounded-bl-none border border-slate-200'
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                  {msg.timestamp && (
                    <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 text-slate-900 px-6 py-4 rounded-[1.5rem] rounded-bl-none border border-slate-200">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-100 p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={chatMode === 'doubt' ? 'Ask your doubt...' : chatMode === 'problem' ? 'Paste your problem...' : 'Ask me anything...'}
                disabled={loading}
                className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none disabled:opacity-50 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputValue.trim()}
                className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 text-sm uppercase tracking-widest"
              >
                <i className="fas fa-paper-plane"></i>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
