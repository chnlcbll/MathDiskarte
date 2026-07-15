import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playSound } from '../utils/audio';
import { Lock, User, ArrowRight, Laptop, Monitor, AlertCircle } from 'lucide-react';

interface Props {
  onLogin: (username: string) => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceCheckState, setDeviceCheckState] = useState<'ask' | 'warning' | 'login'>('ask');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    playSound('hover');

    setTimeout(() => {
      if ((username === 'chanel29' && password === 'chanel29') || (username === 'guest' && password === 'guest100')) {
        playSound('success');
        onLogin(username);
      } else {
        playSound('hover');
        setError(true);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans text-gray-900 dark:text-gray-100 selection:bg-teal-500/30">
      
      
      {deviceCheckState !== 'login' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-[#141417] p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-white/10 text-center"
          >
            {deviceCheckState === 'ask' ? (
              <>
                <div className="flex justify-center gap-4 mb-6 text-teal-500">
                  <Laptop size={48} strokeWidth={1.5} />
                  <Monitor size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Device Check</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">Are you currently using a Laptop or Desktop PC?</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { playSound('click'); setDeviceCheckState('warning'); }}
                    className="py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition"
                  >
                    No
                  </button>
                  <button 
                    onClick={() => { playSound('success'); setDeviceCheckState('login'); }}
                    className="py-3 px-4 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 transition"
                  >
                    Yes
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-6 text-orange-500">
                  <AlertCircle size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Caution</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                  Using a Laptop or PC is highly recommended for fewer bugs and a better viewing experience. Do you still wish to proceed?
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { playSound('click'); setDeviceCheckState('ask'); }}
                    className="py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition"
                  >
                    Go Back
                  </button>
                  <button 
                    onClick={() => { playSound('success'); setDeviceCheckState('login'); }}
                    className="py-3 px-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:bg-black dark:hover:bg-gray-100 transition"
                  >
                    Proceed
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Background Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="bg-white/60 dark:bg-[#0f0f11]/60 backdrop-blur-2xl rounded-[32px] shadow-2xl shadow-black/5 dark:shadow-black/50 border border-gray-200/50 dark:border-white/[0.05] p-8 sm:p-10">
          
          <div className="flex justify-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-[20px] p-[1px] bg-gradient-to-b from-gray-200 to-gray-50 dark:from-white/20 dark:to-white/5 shadow-sm"
            >
              <div className="w-full h-full rounded-[19px] overflow-hidden bg-white dark:bg-[#050505] flex items-center justify-center">
                <img src="/mathdiskarte.png" alt="MD" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Math<span className="text-teal-600 dark:text-teal-400">Diskarte</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-[13px] font-medium">Please authenticate to access your toolkit.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-gray-500 ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={18} />
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border border-transparent dark:border-transparent rounded-2xl px-4 py-3.5 pl-11 outline-none focus:bg-white dark:focus:bg-[#1a1a1c] focus:border-teal-500/30 dark:focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-sm"
                  required
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-gray-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border border-transparent dark:border-transparent rounded-2xl px-4 py-3.5 pl-11 pr-11 outline-none focus:bg-white dark:focus:bg-[#1a1a1c] focus:border-teal-500/30 dark:focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="text-red-500 dark:text-red-400 text-xs text-center font-bold bg-red-50 dark:bg-red-500/10 py-2 px-3 rounded-lg m-0"
                >
                  Access denied. Invalid credentials.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:bg-black dark:hover:bg-gray-100 transition-colors disabled:opacity-70 mt-6 shadow-lg shadow-gray-900/20 dark:shadow-white/10"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>Sign In <ArrowRight size={18} className="ml-1" /></>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
