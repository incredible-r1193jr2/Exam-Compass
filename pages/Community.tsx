
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Milestone } from '../types';

// --- Audio Utility Functions ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface Message {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  isMe?: boolean;
  type?: 'system' | 'user';
}

const Community: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '3', user: 'AI Moderator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Compass', text: "Welcome to the 2026 Study Lounge. Your progress is now public!", timestamp: '12:05 PM', type: 'system' }
  ]);
  const [peerPosts, setPeerPosts] = useState<Milestone[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceLoungeActive, setIsVoiceLoungeActive] = useState(false);
  const [isLoungeLoading, setIsLoungeLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  useEffect(() => {
    const savedPosts = localStorage.getItem('ec_portfolio_posts');
    if (savedPosts) {
      setPeerPosts(JSON.parse(savedPosts));
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      const peers = ['Rohan', 'Priya', 'Vikram', 'Ananya'];
      const phrases = [
        "Which chapter for math today?",
        "Mock test results are out!",
        "Physics PYQs are quite hard this time.",
        "Good luck everyone!",
        "Taking a 10 min break. See you."
      ];
      
      if (Math.random() > 0.7) {
        const peer = peers[Math.floor(Math.random() * peers.length)];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        const newMessage: Message = {
          id: Math.random().toString(),
          user: `${peer} ${peer.length % 2 === 0 ? 'S.' : 'M.'}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${peer}`,
          text: phrase,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev.slice(-20), newMessage]);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Math.random().toString(),
      user: 'Me',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  const toggleVoiceLounge = async () => {
    if (isVoiceLoungeActive) {
      sessionRef.current?.close?.();
      setIsVoiceLoungeActive(false);
      return;
    }
    setIsLoungeLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsLoungeLoading(false);
            setIsVoiceLoungeActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) { int16[i] = inputData[i] * 32768; }
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
          },
          onclose: () => { setIsVoiceLoungeActive(false); stream.getTracks().forEach(t => t.stop()); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          systemInstruction: 'You are the moderator of the ExamCompass Study Lounge.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      setIsLoungeLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 h-[calc(100vh-100px)] lg:pt-32">
      <div className="lg:col-span-8 flex flex-col gap-6 overflow-y-auto minimal-scrollbar pb-10">
        <header className="flex items-center justify-between mb-4">
          <div className="space-y-1">
             <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Global Aspirant Feed</h1>
             <p className="text-slate-400 font-medium text-sm">Real-time milestones from the community.</p>
          </div>
          <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
            {peerPosts.length + 342} Total Active
          </span>
        </header>

        {peerPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm group hover:shadow-md transition-all animate-fade-in-up">
            <div className="flex justify-between mb-8">
              <div className="flex items-center gap-4">
                <img src={post.userAvatar} className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200" alt={post.userName} />
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{post.userName}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</p>
                </div>
              </div>
              {post.category && (
                <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {post.category}
                </span>
              )}
            </div>
            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">{post.content}</p>
            {post.duration && (
              <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <i className="far fa-clock"></i> Focus Duration: {post.duration}
              </div>
            )}
            <div className="flex gap-8 items-center pt-6 border-t border-slate-50">
              <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors group/like">
                <i className="far fa-heart group-hover/like:scale-110 transition-transform"></i>
                <span className="text-xs font-black">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group/comment">
                <i className="far fa-comment group-hover/comment:scale-110 transition-transform"></i>
                <span className="text-xs font-black">{post.comments}</span>
              </button>
            </div>
          </div>
        ))}

        {[
          { user: 'Rahul Sharma', time: '2h ago', content: 'Does anyone have the simplified formula sheet for Organic Chemistry reactions?', likes: 42, comments: 12, tag: 'Doubt' },
          { user: 'Ananya S.', time: '5h ago', content: 'Cleared the Level 3 Physics Mock with 94%! Persistence is key.', likes: 128, comments: 24, tag: 'Victory' }
        ].map((post, i) => (
          <div key={i} className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm group hover:shadow-md transition-all opacity-80">
            <div className="flex justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-300">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{post.user}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.time}</p>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${post.tag === 'Doubt' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                {post.tag}
              </span>
            </div>
            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">{post.content}</p>
            <div className="flex gap-8 items-center pt-6 border-t border-slate-50">
              <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors"><i className="far fa-heart"></i> <span className="text-xs font-black">{post.likes}</span></button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors"><i className="far fa-comment"></i> <span className="text-xs font-black">{post.comments}</span></button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-inner">
        <div className={`p-8 transition-all ${isVoiceLoungeActive ? 'bg-indigo-600 text-white shadow-xl' : 'bg-slate-50 text-slate-900 border-b border-slate-100'}`}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isVoiceLoungeActive ? 'bg-white/20' : 'bg-white shadow-sm border border-slate-200'} `}>
                  <i className={`fas fa-microphone-lines ${isVoiceLoungeActive ? 'animate-pulse' : ''}`}></i>
               </div>
               <h3 className="font-black text-lg tracking-tight">Voice Study Hall</h3>
            </div>
          </div>
          <button 
            onClick={toggleVoiceLounge}
            disabled={isLoungeLoading}
            className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 ${
              isVoiceLoungeActive ? 'bg-white text-indigo-600 shadow-2xl scale-[1.02]' : 'bg-slate-900 text-white hover:bg-indigo-600'
            }`}
          >
            {isLoungeLoading ? <i className="fas fa-spinner animate-spin"></i> : 
              isVoiceLoungeActive ? <>Leave Lounge <i className="fas fa-phone-slash"></i></> : <>Join Voice Lounge <i className="fas fa-headset"></i></>}
          </button>
        </div>

        <div className="flex-grow flex flex-col min-h-0 bg-white">
          <div className="flex-grow overflow-y-auto p-8 space-y-6 minimal-scrollbar bg-slate-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-end gap-3 max-w-[90%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-xl bg-white border border-slate-100 shadow-sm shrink-0" />
                  <div className={`px-5 py-3.5 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${msg.isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
                <span className="text-[9px] font-black text-slate-300 mt-2 px-1 uppercase tracking-widest">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-8 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message study lounge..." 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-5 outline-none font-medium text-slate-700 text-sm transition-all shadow-inner"
              />
              <button onClick={handleSendMessage} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 rounded-xl text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg shadow-indigo-100 active:scale-95">
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
