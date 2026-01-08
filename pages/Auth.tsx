
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXAMS } from '../constants';
import { UserSession } from '../App';

interface AuthProps {
  onLogin: (userData: UserSession) => void;
}

type AuthMode = 'signup' | 'login';

// Use InputHTMLAttributes for better compatibility with standard HTML attributes and fix property missing errors
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  placeholder?: string;
  type?: string;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="w-full space-y-1.5 group">
    <div className="flex justify-between items-center px-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        {label}
      </label>
      {error && (
        <span className="text-[9px] font-bold text-rose-500 uppercase tracking-tight animate-in fade-in slide-in-from-right-1">
          {error}
        </span>
      )}
    </div>
    <input 
      {...props}
      className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300 ${
        error 
          ? 'border-rose-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-50' 
          : 'border-slate-100 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50'
      }`}
    />
  </div>
);

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    targetExams: [] as string[],
    level: 'Intermediate',
    targetYear: '2026',
    currentStandard: 'Class 12'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Min 6 characters required';
    }
    if (mode === 'signup' && formData.name && formData.name.length < 2) {
      newErrors.name = 'Too short';
    }
    setErrors(newErrors);
  }, [formData, mode]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => {
    if (step === 1) return;
    setStep(prev => prev - 1);
  };

  const validateStep1 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.email) stepErrors.email = 'Required';
    if (!formData.password) stepErrors.password = 'Required';
    if (mode === 'signup' && !formData.name) stepErrors.name = 'Required';
    const totalErrors = { ...stepErrors, ...errors };
    setErrors(totalErrors);
    return Object.keys(totalErrors).length === 0;
  };

  const handleSendOTP = () => {
    if (!validateStep1()) return;
    if (mode === 'login') {
      const users = JSON.parse(localStorage.getItem('ec_registered_users') || '[]');
      const user = users.find((u: any) => u.email.toLowerCase() === formData.email.toLowerCase());
      if (!user) {
        setErrors({ email: 'Account not found' });
        return;
      }
      if (user.password !== formData.password) {
        setErrors({ password: 'Wrong password' });
        return;
      }
      const expiryDuration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
      const finalUser = { 
        ...user, 
        isLoggedIn: true, 
        expiresAt: Date.now() + expiryDuration 
      };
      onLogin(finalUser);
      navigate('/dashboard');
    } else {
      setStep(2);
    }
  };

  const handleVerifyOTP = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (otp.join('').length === 6) {
        setStep(3);
      }
    }, 800);
  };

  const handleFinish = () => {
    const expiryDuration = 30 * 24 * 60 * 60 * 1000; 
    const finalUser: UserSession = {
      ...formData,
      isLoggedIn: true,
      expiresAt: Date.now() + expiryDuration
    };
    const users = JSON.parse(localStorage.getItem('ec_registered_users') || '[]');
    const existingIndex = users.findIndex((u: any) => u.email.toLowerCase() === finalUser.email.toLowerCase());
    if (existingIndex > -1) users[existingIndex] = finalUser;
    else users.push(finalUser);
    localStorage.setItem('ec_registered_users', JSON.stringify(users));
    onLogin(finalUser);
    navigate('/dashboard', { replace: true });
  };

  // Restrict to one exam selection
  const selectSingleExam = (id: string) => {
    setFormData(prev => ({
      ...prev,
      targetExams: [id]
    }));
  };

  const totalSteps = mode === 'signup' ? 6 : 1;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <i className="fas fa-compass text-2xl"></i>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
            {step === 1 ? (mode === 'signup' ? 'Join the Elite' : 'Welcome Back') : 'Your Roadmap'}
          </h1>
          <p className="text-slate-500 font-medium mt-3">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 md:p-12 shadow-3xl shadow-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
             <div className="h-full bg-indigo-600 transition-all duration-700 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
              {mode === 'signup' && (
                <Input 
                  label="Full Name" 
                  placeholder="e.g. John Doe" 
                  value={formData.name} 
                  error={errors.name}
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              )}
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="you@example.com"
                value={formData.email} 
                error={errors.email}
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
              <Input 
                label="Secure Password" 
                type="password" 
                placeholder="••••••••"
                value={formData.password} 
                error={errors.password}
                onChange={e => setFormData({...formData, password: e.target.value})} 
              />

              {mode === 'login' && (
                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <div className="w-5 h-5 border-2 border-slate-200 rounded-lg bg-white transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 group-hover:border-indigo-300 shadow-sm"></div>
                      <i className="fas fa-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Remember Me</span>
                  </label>
                  <button className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Forgot?</button>
                </div>
              )}
              
              <button 
                onClick={handleSendOTP}
                className="w-full py-6 bg-slate-900 text-white font-black rounded-[1.5rem] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-100 flex items-center justify-center gap-3 group uppercase tracking-widest text-[11px]"
              >
                {mode === 'signup' ? 'Create Account' : 'Sign In'}
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
              
              <div className="text-center">
                <button 
                  onClick={() => {
                    setMode(mode === 'signup' ? 'login' : 'signup');
                    setErrors({});
                  }}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                  {mode === 'signup' ? 'Already have an account?' : 'Need an account?'}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 text-center animate-in slide-in-from-right-6 duration-500">
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Check Your Inbox</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Enter the 6-digit code sent to <br /><span className="text-slate-900 font-bold">{formData.email}</span></p>
              </div>
              <div className="flex justify-center gap-2.5">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => otpRefs.current[idx] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => {
                      const val = e.target.value;
                      const newOtp = [...otp];
                      newOtp[idx] = val.slice(-1);
                      setOtp(newOtp);
                      if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                        otpRefs.current[idx - 1]?.focus();
                      }
                    }}
                    className="w-11 h-14 text-center text-xl font-black border-2 border-slate-100 rounded-xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-inner"
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-grow py-5 border border-slate-100 rounded-2xl font-black text-[10px] text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">Back</button>
                <button 
                  onClick={handleVerifyOTP}
                  disabled={otp.join('').length < 6 || isVerifying}
                  className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-100 active:scale-95 disabled:opacity-30 transition-all uppercase tracking-widest text-[10px]"
                >
                  {isVerifying ? <i className="fas fa-spinner animate-spin"></i> : 'Verify'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in slide-in-from-right-6 duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Choose Your Exam</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Select one primary exam to start <br /> your personalized master plan.</p>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-72 overflow-y-auto pr-3 minimal-scrollbar">
                {EXAMS.map(exam => (
                  <button
                    key={exam.id}
                    onClick={() => selectSingleExam(exam.id)}
                    className={`p-6 rounded-[1.5rem] border-2 text-left transition-all flex items-center justify-between group ${
                      formData.targetExams[0] === exam.id
                        ? 'bg-indigo-50 border-indigo-600 shadow-lg shadow-indigo-100' 
                        : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <p className={`font-black tracking-tight ${formData.targetExams[0] === exam.id ? 'text-indigo-600' : 'text-slate-900'}`}>{exam.shortName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{exam.stream}</p>
                    </div>
                    {formData.targetExams[0] === exam.id && <i className="fas fa-check-circle text-indigo-600 text-lg animate-in zoom-in-50 duration-300"></i>}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleNext}
                disabled={formData.targetExams.length === 0}
                className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl shadow-2xl disabled:opacity-30 transition-all uppercase tracking-widest text-[11px]"
              >
                Continue Setup
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in slide-in-from-right-6 duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Current Standard</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Help us customize your <br /> difficulty curve and syllabus.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Class 11', 'Class 12', 'Dropper', 'Graduate', 'Working Prof.', 'Other'].map(std => (
                  <button
                    key={std}
                    onClick={() => setFormData({...formData, currentStandard: std})}
                    className={`p-5 rounded-2xl border-2 text-center transition-all font-black text-[10px] uppercase tracking-widest shadow-sm ${
                      formData.currentStandard === std ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-slate-50/50 border-slate-50 text-slate-500 hover:border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {std}
                  </button>
                ))}
              </div>
              <button onClick={handleNext} className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl shadow-2xl uppercase tracking-widest text-[11px] transition-all">
                Next Step
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 animate-in slide-in-from-right-6 duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Target Year</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">When is your final showdown? <br /> We'll align your deadlines accordingly.</p>
              </div>
              <div className="space-y-3">
                {['2026', '2027', '2028'].map(year => (
                  <button
                    key={year}
                    onClick={() => setFormData({...formData, targetYear: year})}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                      formData.targetYear === year ? 'bg-indigo-50 border-indigo-600 shadow-xl shadow-indigo-100' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div>
                       <span className="font-black text-slate-900 text-lg tracking-tight">{year}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${formData.targetYear === year ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {year === '2026' ? 'Recommended' : year === '2027' ? 'Early Prep' : 'Long-term'}
                    </span>
                  </button>
                ))}
              </div>
              <button onClick={handleNext} className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl shadow-2xl uppercase tracking-widest text-[11px] transition-all">
                Finalizing Prep
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-12 text-center animate-in zoom-in-95 duration-700">
              <div className="w-28 h-28 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl shadow-indigo-200 floating">
                <i className="fas fa-rocket text-4xl"></i>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Systems Online.</h2>
                <p className="text-slate-500 font-medium leading-relaxed">Your intelligence platform has been <br /> optimized for {formData.targetYear} {formData.targetExams[0] === '1' ? 'JEE' : formData.targetExams[0] === '2' ? 'NEET' : 'Success'}.</p>
              </div>
              <button 
                onClick={handleFinish}
                className="w-full py-7 bg-slate-900 text-white font-black rounded-[2.5rem] hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 group uppercase tracking-[0.2em] text-[11px]"
              >
                Launch Dashboard
                <i className="fas fa-arrow-right ml-4 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
