import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, FileQuestion, Filter } from 'lucide-react';
import { playSound } from '../utils/audio';

type Template = 'promo' | 'requirement' | 'budol';

export const TamaBa: React.FC = () => {
  const [template, setTemplate] = useState<Template>('promo');
  
  // Variables: p, q, r
  const [pCond, setPCond] = useState<boolean | null>(null);
  const [qCond, setQCond] = useState<boolean | null>(null);
  const [rCond, setRCond] = useState<boolean | null>(null);

  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleTemplateChange = (t: Template) => {
    playSound('click');
    setTemplate(t);
    setPCond(null);
    setQCond(null);
    setRCond(null);
    setHasAnalyzed(false);
  };

  const setCond = (setter: React.Dispatch<React.SetStateAction<boolean | null>>, val: boolean) => {
    playSound('click');
    setter(val);
    setHasAnalyzed(false);
  };

  const getTemplateText = () => {
    switch (template) {
      case 'promo':
        return {
          title: 'Free Shipping Promo',
          desc: 'Check if you actually get free shipping.',
          pLabel: 'Did you buy at least ₱500? (p)',
          qLabel: 'Do you have a voucher? (q)',
          rLabel: null,
          logic: 'p ∧ q → Free Shipping',
          formula: '(p AND q)',
          evaluate: () => (pCond && qCond)
        };
      case 'requirement':
        return {
          title: 'Student Discount Eligibility',
          desc: 'Are you eligible for the 20% student discount?',
          pLabel: 'Do you have a valid Student ID? (p)',
          qLabel: 'Are you wearing a uniform? (q)',
          rLabel: 'Are you currently enrolled? (r)',
          logic: '(p ∨ q) ∧ r → Discount',
          formula: '((p OR q) AND r)',
          evaluate: () => ((pCond || qCond) && rCond)
        };
      case 'budol':
        return {
          title: '"Buy 1 Take 1" Claim Checker',
          desc: 'They claim it\'s Buy 1 Take 1, but is it really?',
          pLabel: 'Did you pay for the first item at regular price? (p)',
          qLabel: 'Is the second item exactly the same? (q)',
          rLabel: 'Are there hidden fees? (r)',
          logic: 'p ∧ q ∧ ¬r → True B1T1',
          formula: '(p AND q AND NOT r)',
          evaluate: () => (pCond && qCond && (rCond === false))
        };
    }
  };

  const currentTemplate = getTemplateText();

  const handleAnalyze = () => {
    playSound('click');
    setHasAnalyzed(true);
  };

  const isReadyToAnalyze = () => {
    if (template === 'promo') return pCond !== null && qCond !== null;
    return pCond !== null && qCond !== null && rCond !== null;
  };

  const renderResult = () => {
    if (!isReadyToAnalyze()) {
      return { status: 'incomplete', title: 'Kulang ang Information', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', icon: <HelpCircle size={48} className="text-orange-500 mb-4" /> };
    }
    const result = currentTemplate.evaluate();
    if (result) {
      return { status: 'true', title: 'Tama!', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: <CheckCircle2 size={48} className="text-emerald-500 mb-4" /> };
    } else {
      return { status: 'false', title: 'Hindi Tama', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', icon: <XCircle size={48} className="text-red-500 mb-4" /> };
    }
  };

  const res = hasAnalyzed ? renderResult() : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-gray-900 dark:text-white">
            <CheckCircle2 className="text-purple-500" />
            TamaBa? Logic Checker
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Check if everyday claims, promos, and rules make logical sense using propositional logic.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2"><Filter size={18}/> Select Scenario</h3>
              <select 
                value={template}
                onChange={(e) => handleTemplateChange(e.target.value as Template)}
                className="bg-gray-100 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 text-sm rounded-xl px-4 py-2 font-medium focus:ring-2 focus:ring-purple-500 outline-none transition"
              >
                <option value="promo">Free Shipping Promo</option>
                <option value="requirement">Student Discount</option>
                <option value="budol">"Buy 1 Take 1" Claim</option>
              </select>
            </div>

            <div className="bg-purple-50 dark:bg-purple-500/5 border border-purple-100 dark:border-purple-500/10 rounded-2xl p-6 mb-6">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 text-lg mb-1">{currentTemplate.title}</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400/80 mb-4">{currentTemplate.desc}</p>
              
              <div className="font-mono text-xs md:text-sm bg-white dark:bg-black/40 p-3 rounded-lg border border-purple-200 dark:border-purple-500/20 text-center font-bold text-purple-600 dark:text-purple-400 tracking-wider">
                Logical Form: {currentTemplate.logic}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-2">Conditions</h4>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 rounded-xl">
                <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{currentTemplate.pLabel}</span>
                <div className="flex gap-2">
                  <button onClick={() => setCond(setPCond, true)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${pCond === true ? 'bg-emerald-500 text-white shadow' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20'}`}>YES</button>
                  <button onClick={() => setCond(setPCond, false)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${pCond === false ? 'bg-red-500 text-white shadow' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20'}`}>NO</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 rounded-xl">
                <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{currentTemplate.qLabel}</span>
                <div className="flex gap-2">
                  <button onClick={() => setCond(setQCond, true)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${qCond === true ? 'bg-emerald-500 text-white shadow' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20'}`}>YES</button>
                  <button onClick={() => setCond(setQCond, false)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${qCond === false ? 'bg-red-500 text-white shadow' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20'}`}>NO</button>
                </div>
              </div>

              {currentTemplate.rLabel && (
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 rounded-xl">
                  <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{currentTemplate.rLabel}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setCond(setRCond, true)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${rCond === true ? 'bg-emerald-500 text-white shadow' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20'}`}>YES</button>
                    <button onClick={() => setCond(setRCond, false)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${rCond === false ? 'bg-red-500 text-white shadow' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20'}`}>NO</button>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={!isReadyToAnalyze()}
              className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 disabled:bg-purple-600/50 disabled:cursor-not-allowed hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition transform hover:scale-[1.02] active:scale-95"
            >
              Analyze Logic
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {hasAnalyzed && res ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-3xl border border-transparent h-full flex flex-col items-center justify-center text-center shadow-lg ${res.bg}`}
              >
                {res.icon}
                <h3 className={`font-bold text-3xl mb-4 ${res.color}`}>{res.title}</h3>
                
                {res.status === 'true' && (
                  <p className="text-gray-700 dark:text-gray-300 font-medium">The conditions are met! The claim or rule is logically true based on your inputs.</p>
                )}
                {res.status === 'false' && (
                  <p className="text-gray-700 dark:text-gray-300 font-medium">The claim or rule falls apart. The necessary conditions were not met.</p>
                )}
                {res.status === 'incomplete' && (
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Please answer all questions to complete the logical evaluation.</p>
                )}
                
                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 w-full">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Evaluation</p>
                  <p className="font-mono text-sm mt-2 text-gray-800 dark:text-gray-200 font-bold">{currentTemplate.formula} = {res.status.toUpperCase()}</p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-[#141417] p-8 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 h-full flex flex-col items-center justify-center text-center">
                <FileQuestion size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 mb-2">Awaiting Evaluation</h3>
                <p className="text-sm text-gray-500">Answer the condition questions and click analyze to test the logic.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
