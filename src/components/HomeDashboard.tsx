import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Bell } from 'lucide-react';
import { playSound } from '../utils/audio';
import { AnimatedBackground } from './AnimatedBackground';

interface Props {
  onNavigate: (tool: 'ipontubo' | 'tawadtactics' | 'tamaba') => void;
  username: string;
}

export const HomeDashboard: React.FC<Props> = ({ onNavigate, username }) => {
  const [showUpdates, setShowUpdates] = useState(true);

  return (
    <>
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 pb-12 relative z-10"
      >
      <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto mt-4 text-center">
        
        <div className="mb-2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Math<span className="text-teal-600 dark:text-teal-400">Diskarte</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Hi <span className="text-teal-600 dark:text-teal-400 font-bold">{username ? username : 'User'}</span>! MathDiskarte is a Filipino everyday math toolkit that helps you make smarter decisions about money, negotiation, and logical reasoning.
          </p>
        </div>

        {/* Updates section */}
        <div className="w-full max-w-3xl bg-white dark:bg-[#141417] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm text-left overflow-hidden">
          <button 
            onClick={() => { playSound('click'); setShowUpdates(!showUpdates); }}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Bell className="text-teal-500" size={18} />
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Updates & Announcements</h3>
            </div>
            {showUpdates ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </button>
          
          <AnimatePresence>
            {showUpdates && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-100 dark:border-white/5"
              >
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5 relative">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Sari-Sari Margin (IponTubo)</h4>
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Calculate exact selling price needed to hit target profit margins for small businesses.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5 relative">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">"Sulit" Tingi Checker (IponTubo)</h4>
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Compare bulk vs tingi items to find out which one gives you the true best value for your money.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5 relative">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Debt Analyzer (IponTubo)</h4>
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Analyze informal "5-6" loans or credit card minimum payment traps to avoid predatory lending.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5 relative">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">New TawadTactics Scenarios</h4>
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Negotiate a Salary offer, or compute your minimum Hourly Rate as a Freelancer based on real costs.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          {/* IponTubo */}
          <button
            id="tour-tool-ipontubo" onClick={() => { playSound(); onNavigate('ipontubo'); }}
            className="flex flex-col items-start p-6 sm:p-8 bg-white dark:bg-[#141417] rounded-3xl hover:border-teal-500 border border-transparent transition-all group shadow-sm dark:shadow-none text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
              <img src="/IponTubo.png" alt="IponTubo" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">IponTubo</h3>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-500 mb-3 uppercase tracking-wider">Plan your ipon and investment growth.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              A Philippine finance calculator for MP2, RTB yield projections, and Debt Analysis.
            </p>
            <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Mathematics in Finance</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-teal-500 transition-colors transform group-hover:translate-x-1" />
            </div>
          </button>
          {/* TawadTactics */}
          <button
            id="tour-tool-tawadtactics" onClick={() => { playSound(); onNavigate('tawadtactics'); }}
            className="flex flex-col items-start p-6 sm:p-8 bg-white dark:bg-[#141417] rounded-3xl hover:border-blue-500 border border-transparent transition-all group shadow-sm dark:shadow-none text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
              <img src="/tawadtactics.png" alt="TawadTactics" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">TawadTactics</h3>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-500 mb-3 uppercase tracking-wider">Analyze tawad and negotiation strategies.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              A Game Theory-based analyzer for Filipino bargaining, pricing, and negotiation situations.
            </p>
            <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Math in Decision Sciences</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1" />
            </div>
          </button>
          {/* TamaBa? */}
          <button
            id="tour-tool-tamaba" onClick={() => { playSound(); onNavigate('tamaba'); }}
            className="flex flex-col items-start p-6 sm:p-8 bg-white dark:bg-[#141417] rounded-3xl hover:border-purple-500 border border-transparent transition-all group shadow-sm dark:shadow-none text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
              <img src="/tamaba.png" alt="TamaBa?" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">TamaBa?</h3>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-500 mb-3 uppercase tracking-wider">Check if everyday claims make logical sense.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              A logic checker for Filipino promos, requirements, voucher rules, eligibility conditions, and "budol" claims.
            </p>
            <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Mathematics as a Language</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-purple-500 transition-colors transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
    </>
  );
};
