import React from 'react';
import { motion } from 'motion/react';
import { PiggyBank, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';
import { AnimatedBackground } from './AnimatedBackground';

interface Props {
  onNavigate: (tool: 'ipontubo' | 'tawadtactics' | 'tamaba') => void;
  username: string;
}

export const HomeDashboard: React.FC<Props> = ({ onNavigate, username }) => {
  return (
    <>
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 pb-12 relative z-10"
      >
      <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto mt-4 text-center">
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Math<span className="text-teal-600 dark:text-teal-400">Diskarte</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Hi <span className="text-teal-600 dark:text-teal-400 font-bold">{username ? username : 'User'}</span>! MathDiskarte is a Filipino everyday math toolkit that helps you make smarter decisions about money, negotiation, and logical reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* IponTubo */}
          <button
            onClick={() => { playSound(); onNavigate('ipontubo'); }}
            className="flex flex-col items-start p-6 sm:p-8 bg-white dark:bg-[#141417] rounded-3xl hover:border-teal-500 border border-transparent transition-all group shadow-sm dark:shadow-none text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
              <img src="/IponTubo.png" alt="IponTubo" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">IponTubo</h3>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-500 mb-3 uppercase tracking-wider">Plan your ipon and investment growth.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              A Philippine finance calculator for MP2 and RTB yield projections.
            </p>
            <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Mathematics in Finance</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-teal-500 transition-colors transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* TawadTactics */}
          <button
            onClick={() => { playSound(); onNavigate('tawadtactics'); }}
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
            onClick={() => { playSound(); onNavigate('tamaba'); }}
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
