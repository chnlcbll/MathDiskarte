import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, FileQuestion, Filter, XCircle, AlertCircle, ChevronDown, ChevronUp, Plus, ArrowLeft, Save, Trash2, HelpCircle } from 'lucide-react';
import { playSound } from '../utils/audio';
import { useLocalStorage } from '../hooks/useLocalStorage';

type LogicType = 'AND' | 'OR' | 'IMPLIES' | 'IFF';
type Answer = true | false | 'NOT_SURE' | null;

interface ScenarioDef {
  id: string;
  title: string;
  desc: string;
  rule: string;
  pLabel: string;
  qLabel: string;
  rLabel?: string;
  logicForm: string;
  mathDesc: string;
  type: LogicType;
  pVar: string;
  qVar: string;
  rVar?: string;
  isCustom?: boolean;
}

const defaultScenarios: ScenarioDef[] = [
  {
    id: 'promo',
    title: 'Free Shipping Promo',
    desc: 'Check if you actually qualify for free shipping.',
    rule: 'Free shipping applies if your order is at least ₱500 and you have a valid voucher.',
    pLabel: 'Is your order at least ₱500?',
    qLabel: 'Do you have a valid voucher?',
    logicForm: 'p ∧ q → r',
    mathDesc: 'Since this uses "and" (∧), both conditions must be true for the promo to apply.',
    type: 'AND',
    pVar: 'Order is at least ₱500',
    qVar: 'Has valid voucher'
  },
  {
    id: 'student',
    title: 'Student Discount',
    desc: 'Check if you qualify for a student discount.',
    rule: 'A student discount applies if you are currently enrolled and have a valid student ID.',
    pLabel: 'Are you currently enrolled?',
    qLabel: 'Do you have a valid student ID?',
    logicForm: 'p ∧ q → r',
    mathDesc: 'Both conditions must be true (p ∧ q) for the discount to apply.',
    type: 'AND',
    pVar: 'Currently enrolled',
    qVar: 'Has valid student ID'
  },
  {
    id: 'voucher',
    title: 'Voucher Eligibility',
    desc: 'Check if you can use a discount voucher.',
    rule: 'A voucher can be used if the minimum spend is reached or the item is part of the promo.',
    pLabel: 'Is the minimum spend reached?',
    qLabel: 'Is the item part of the promo?',
    logicForm: 'p ∨ q → r',
    mathDesc: 'Since this uses "or" (∨), at least one condition must be true.',
    type: 'OR',
    pVar: 'Minimum spend reached',
    qVar: 'Item is part of promo'
  },
  {
    id: 'budol',
    title: 'Budol Claim Checker',
    desc: 'Check if a "budol" claim actually makes sense.',
    rule: 'If an item is discounted, then it is automatically sulit.',
    pLabel: 'Is the item discounted?',
    qLabel: 'Is the item actually high quality and necessary (sulit)?',
    logicForm: 'p → q',
    mathDesc: 'This claim is an implication (p → q). A discounted item can still be unnecessary or low quality.',
    type: 'IMPLIES',
    pVar: 'Item is discounted',
    qVar: 'Item is sulit'
  },
  {
    id: 'event',
    title: 'Event Registration',
    desc: 'Check if you can join the restricted event.',
    rule: 'You can join the event if you registered before the deadline or you are a VIP member.',
    pLabel: 'Did you register before the deadline?',
    qLabel: 'Are you a VIP member?',
    logicForm: 'p ∨ q → r',
    mathDesc: 'Since this uses "or" (∨), meeting either one of the conditions is enough.',
    type: 'OR',
    pVar: 'Registered before deadline',
    qVar: 'Is VIP member'
  }
];

export const TamaBa: React.FC = () => {
  const [customScenarios, setCustomScenarios] = useLocalStorage<ScenarioDef[]>('tamaba_custom_rules', []);
  const scenarios = [...defaultScenarios, ...customScenarios];

  const [template, setTemplate] = useState<string>('promo');
  const [pCond, setPCond] = useState<Answer>(null);
  const [qCond, setQCond] = useState<Answer>(null);
  const [rCond, setRCond] = useState<Answer>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [showMath, setShowMath] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);

  // Builder States
  const [bTitle, setBTitle] = useState('');
  const [bResult, setBResult] = useState('');
  const [bType, setBType] = useState<LogicType>('AND');
  const [bPCond, setBPCond] = useState('');
  const [bQCond, setBQCond] = useState('');
  const [bRCond, setBRCond] = useState('');
  const [bShowR, setBShowR] = useState(false);

  const currentScenario = scenarios.find(s => s.id === template) || scenarios[0];

  const handleTemplateChange = (t: string) => {
    playSound('click');
    setTemplate(t);
    setPCond(null);
    setQCond(null);
    setRCond(null);
    setHasAnalyzed(false);
    setShowMath(false);
  };

  const setCond = (setter: React.Dispatch<React.SetStateAction<Answer>>, val: Answer) => {
    playSound('click');
    setter(val);
    setHasAnalyzed(false);
  };

  const handleAnalyze = () => {
    playSound('click');
    setHasAnalyzed(true);
  };

  const isReadyToAnalyze = () => {
    if (pCond === null || qCond === null) return false;
    if (currentScenario.rVar && rCond === null) return false;
    return true;
  };

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    const newScenarios = customScenarios.filter(s => s.id !== id);
    setCustomScenarios(newScenarios);
    if (template === id) {
      handleTemplateChange('promo');
    }
  };

  const handleSaveCustomRule = () => {
    if (!bTitle || !bResult || !bPCond || !bQCond) return;
    playSound('click');

    let ruleStr = '';
    let logicForm = '';
    let mathDesc = '';

    if (bType === 'AND') {
      ruleStr = `${bResult} if ${bPCond} AND ${bQCond}${bShowR && bRCond ? ` AND ${bRCond}` : ''}.`;
      logicForm = bShowR && bRCond ? 'p ∧ q ∧ r → s' : 'p ∧ q → r';
      mathDesc = `Since this uses "and" (∧), all conditions must be true for the result to apply.`;
    } else if (bType === 'OR') {
      ruleStr = `${bResult} if ${bPCond} OR ${bQCond}${bShowR && bRCond ? ` OR ${bRCond}` : ''}.`;
      logicForm = bShowR && bRCond ? 'p ∨ q ∨ r → s' : 'p ∨ q → r';
      mathDesc = `Since this uses "or" (∨), at least one condition must be true.`;
    } else if (bType === 'IMPLIES') {
      ruleStr = `If ${bPCond}, then ${bResult}.`;
      logicForm = 'p → q';
      mathDesc = `This is an implication (p → q). If the first part happens, the second part must follow.`;
    } else if (bType === 'IFF') {
      ruleStr = `${bResult} if and only if ${bPCond} and ${bQCond} match.`; // Simplified
      logicForm = 'p ↔ q';
      mathDesc = `This is a biconditional (p ↔ q). Both conditions must be either true or false together.`;
    }

    const newScenario: ScenarioDef = {
      id: 'custom_' + Date.now(),
      title: bTitle,
      desc: `Check if ${bResult}.`,
      rule: ruleStr,
      pLabel: bPCond + '?',
      qLabel: bQCond + '?',
      rLabel: bShowR && bRCond && (bType === 'AND' || bType === 'OR') ? bRCond + '?' : undefined,
      logicForm,
      mathDesc,
      type: bType,
      pVar: bPCond,
      qVar: bQCond,
      rVar: bShowR && bRCond && (bType === 'AND' || bType === 'OR') ? bRCond : undefined,
      isCustom: true
    };

    setCustomScenarios([...customScenarios, newScenario]);
    setIsBuilding(false);
    handleTemplateChange(newScenario.id);
    
    // Reset builder
    setBTitle('');
    setBResult('');
    setBPCond('');
    setBQCond('');
    setBRCond('');
    setBShowR(false);
    setBType('AND');
  };

  const getVerdict = () => {
    if (!isReadyToAnalyze()) return null;

    const hasNotSure = pCond === 'NOT_SURE' || qCond === 'NOT_SURE' || (currentScenario.rVar && rCond === 'NOT_SURE');

    if (hasNotSure) {
      return {
        status: 'KULANG ANG IMPORMASYON',
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        borderColor: 'border-amber-200 dark:border-amber-500/30',
        textColor: 'text-amber-700 dark:text-amber-400',
        icon: <HelpCircle size={48} className="text-amber-500 mb-4" />,
        reason: `May kulang na information. Hindi masabi kung tama o hindi dahil may mga kondisyong hindi sigurado.`
      };
    }

    const p = pCond as boolean;
    const q = qCond as boolean;
    const r = currentScenario.rVar ? (rCond as boolean) : null;

    let isTama = false;
    if (currentScenario.type === 'AND') {
      isTama = r !== null ? (p && q && r) : (p && q);
    } else if (currentScenario.type === 'OR') {
      isTama = r !== null ? (p || q || r) : (p || q);
    } else if (currentScenario.type === 'IMPLIES') {
      isTama = !p || q;
    } else if (currentScenario.type === 'IFF') {
      isTama = p === q;
    }

    if (isTama) {
      let reason = '';
      if (currentScenario.type === 'AND') reason = 'All required conditions are satisfied.';
      else if (currentScenario.type === 'OR') reason = 'At least one of the conditions is satisfied.';
      else if (currentScenario.type === 'IMPLIES') reason = p ? 'The condition was met, and the result follows.' : 'The initial condition was not met, so the claim is trivially true.';
      else if (currentScenario.type === 'IFF') reason = 'Both sides of the rule match logically.';

      return {
        status: 'TAMA',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        borderColor: 'border-emerald-200 dark:border-emerald-500/30',
        textColor: 'text-emerald-700 dark:text-emerald-400',
        icon: <CheckCircle2 size={48} className="text-emerald-500 mb-4" />,
        reason: `Pasok ka sa requirements. ${reason}`
      };
    } else {
      let reason = '';
      if (currentScenario.type === 'AND') {
        reason = `You do not qualify because all conditions must be true.`;
      } else if (currentScenario.type === 'OR') {
        reason = 'Since no condition is met, the rule does not apply to you.';
      } else if (currentScenario.type === 'IMPLIES') {
        reason = 'The claim is false. The condition happened, but the expected result did not follow.';
      } else if (currentScenario.type === 'IFF') {
        reason = 'The conditions do not match. One is true while the other is false.';
      }

      return {
        status: 'HINDI TAMA',
        bg: 'bg-red-50 dark:bg-red-500/10',
        borderColor: 'border-red-200 dark:border-red-500/30',
        textColor: 'text-red-700 dark:text-red-400',
        icon: <XCircle size={48} className="text-red-500 mb-4" />,
        reason: `Hindi pasok sa requirements. ${reason}`
      };
    }
  };

  const res = getVerdict();

  if (isBuilding) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => { playSound('click'); setIsBuilding(false); }}
            className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Custom Rule</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Build your own logic checker for everyday situations.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#141417] p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-black/5 dark:border-white/5 pb-2">Step 1: Name and Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Rule Name</label>
                <input 
                  type="text" 
                  value={bTitle} onChange={(e) => setBTitle(e.target.value)}
                  placeholder="e.g. My Shopee Voucher Rule"
                  className="w-full bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Result Statement</label>
                <input 
                  type="text" 
                  value={bResult} onChange={(e) => setBResult(e.target.value)}
                  placeholder="e.g. Free shipping applies"
                  className="w-full bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-black/5 dark:border-white/5 pb-2">Step 2: Choose Logic Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'AND', label: 'All conditions must be met (AND)' },
                { id: 'OR', label: 'At least one condition must be met (OR)' },
                { id: 'IMPLIES', label: 'If condition happens, result applies (IF-THEN)' },
                { id: 'IFF', label: 'Only if both sides match (IF AND ONLY IF)' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => { playSound('click'); setBType(type.id as LogicType); }}
                  className={`p-4 rounded-xl border-2 text-left font-bold transition transform active:scale-95 text-sm ${bType === type.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-purple-200'}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-black/5 dark:border-white/5 pb-2">Step 3: Add Conditions</h3>
            <div className="space-y-3">
              <div className="flex gap-4 items-center">
                <span className="font-mono font-bold text-purple-500 shrink-0">p =</span>
                <input 
                  type="text" 
                  value={bPCond} onChange={(e) => setBPCond(e.target.value)}
                  placeholder="e.g. Order is at least ₱500"
                  className="w-full bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex gap-4 items-center">
                <span className="font-mono font-bold text-blue-500 shrink-0">q =</span>
                <input 
                  type="text" 
                  value={bQCond} onChange={(e) => setBQCond(e.target.value)}
                  placeholder="e.g. Has valid voucher"
                  className="w-full bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>
              
              {(bType === 'AND' || bType === 'OR') && (
                <>
                  {bShowR ? (
                    <div className="flex gap-4 items-center">
                      <span className="font-mono font-bold text-pink-500 shrink-0">r =</span>
                      <input 
                        type="text" 
                        value={bRCond} onChange={(e) => setBRCond(e.target.value)}
                        placeholder="e.g. User is a new member"
                        className="w-full bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                      <button onClick={() => setBShowR(false)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl"><Trash2 size={18}/></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setBShowR(true)}
                      className="flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-4 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-500/20 transition"
                    >
                      <Plus size={16} /> Add another condition
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleSaveCustomRule}
            disabled={!bTitle || !bResult || !bPCond || !bQCond}
            className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition transform hover:scale-[1.02] active:scale-95"
          >
            <Save size={20} /> Save & Use Custom Rule
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-gray-900 dark:text-white">
            <img src="/tamaba.png" alt="TamaBa?" className="w-10 h-10 object-contain rounded-lg shadow-sm" />
            TamaBa? Rule Checker
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Check if everyday claims, promos, and rules actually make sense.</p>
        </div>
      </div>

      {/* Preset & Custom Cards */}
      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar" id="tour-tamaba-presets">
        {scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => handleTemplateChange(s.id)}
            className={`min-w-[160px] p-3 rounded-xl border-2 text-left transition transform active:scale-95 flex flex-col justify-between h-full relative group ${
              template === s.id 
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/20 shadow-md' 
                : 'border-transparent bg-white dark:bg-[#141417] hover:border-purple-200 dark:hover:border-purple-500/50 shadow-sm'
            }`}
          >
            <span className={`text-sm font-bold pr-6 ${template === s.id ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>
              {s.title}
            </span>
            {s.isCustom && (
              <div 
                onClick={(e) => handleDeleteCustom(s.id, e)}
                className="absolute top-2 right-2 p-1.5 text-red-500 opacity-0 group-hover:opacity-100 bg-red-50 dark:bg-red-500/20 rounded-lg hover:bg-red-100 transition"
              >
                <Trash2 size={14} />
              </div>
            )}
          </button>
        ))}
        
        <button
          onClick={() => { playSound('click'); setIsBuilding(true); }}
          className="min-w-[160px] p-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-500 text-left transition transform active:scale-95 flex flex-col items-center justify-center gap-2 h-[84px] bg-gray-50 dark:bg-[#1a1a1e]"
        >
          <Plus size={20} className="text-gray-500 dark:text-gray-400" />
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Create Custom Rule</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Scenario Card */}
          <div className="bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
            <div className="mb-4">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{currentScenario.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{currentScenario.desc}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 rounded-2xl p-5">
              <p className="text-sm font-bold text-purple-800 dark:text-purple-300 leading-relaxed uppercase tracking-wide">
                Rule: {currentScenario.rule}
              </p>
            </div>
          </div>

          {/* Section 2: Condition Checklist */}
          <div className="bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Check your situation:</h4>
            
            <div className="space-y-4">
              <ConditionRow label={currentScenario.pLabel} val={pCond} setVal={(v) => setCond(setPCond, v)} />
              <ConditionRow label={currentScenario.qLabel} val={qCond} setVal={(v) => setCond(setQCond, v)} />
              {currentScenario.rVar && (
                <ConditionRow label={currentScenario.rLabel || ''} val={rCond} setVal={(v) => setCond(setRCond, v)} />
              )}
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={!isReadyToAnalyze()}
              className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 disabled:bg-purple-300 dark:disabled:bg-purple-900/50 disabled:cursor-not-allowed hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition transform hover:scale-[1.02] active:scale-95"
            >
              Check if Tama
            </button>
          </div>
        </div>

        {/* Section 3: Result Panel */}
        
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {hasAnalyzed && res ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-3xl border ${res.borderColor} ${res.bg} shadow-sm flex flex-col`}
              >
                <div className="text-center mb-6">
                  <div className="flex justify-center">{res.icon}</div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">TamaBa? Result</h3>
                  <h2 className={`font-black text-3xl md:text-4xl ${res.textColor}`}>{res.status}</h2>
                </div>
                
                <div className="bg-white/60 dark:bg-black/20 rounded-2xl p-5 mb-6 border border-white/50 dark:border-white/5 text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium">
                  {res.reason}
                </div>

                <div className="mt-auto border-t border-black/5 dark:border-white/10 pt-4">
                  <button 
                    onClick={() => { playSound('click'); setShowMath(!showMath); }}
                    className="w-full flex items-center justify-between py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                  >
                    <span>Math Behind It</span>
                    {showMath ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  <AnimatePresence>
                    {showMath && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                          <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-black/10 dark:border-white/10 overflow-x-auto">
                            <div className="whitespace-nowrap">p = {currentScenario.pVar} = <TruthVal val={pCond} /></div>
                            <div className="whitespace-nowrap">q = {currentScenario.qVar} = <TruthVal val={qCond} /></div>
                            {currentScenario.rVar && (
                              <div className="whitespace-nowrap">r = {currentScenario.rVar} = <TruthVal val={rCond} /></div>
                            )}
                            <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/10 font-bold whitespace-nowrap">
                              {currentScenario.logicForm} = <span className={res.status === 'TAMA' ? 'text-emerald-500' : res.status === 'HINDI TAMA' ? 'text-red-500' : 'text-amber-500'}>{res.status === 'TAMA' ? 'T' : res.status === 'HINDI TAMA' ? 'F' : '?'}</span>
                            </div>
                          </div>
                          <p className="font-sans text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {currentScenario.mathDesc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <div key="awaiting" className="bg-white dark:bg-[#141417] p-8 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <AlertCircle size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 mb-2">Awaiting Answer</h3>
                <p className="text-sm text-gray-500">Answer the condition questions to check if the rule applies to your situation.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ConditionRow = ({ label, val, setVal }: { label: string, val: Answer, setVal: (v: Answer) => void }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 rounded-xl gap-4">
      <span className="font-medium text-gray-800 dark:text-gray-200 pr-2">{label}</span>
      <div className="flex gap-2 shrink-0 bg-gray-200/50 dark:bg-black/30 p-1 rounded-xl">
        <button onClick={() => setVal(true)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${val === true ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}>Yes</button>
        <button onClick={() => setVal(false)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${val === false ? 'bg-red-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}>No</button>
        <button onClick={() => setVal('NOT_SURE')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition transform active:scale-95 ${val === 'NOT_SURE' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}>Not Sure</button>
      </div>
    </div>
  );
};

const TruthVal = ({ val }: { val: Answer }) => {
  if (val === true) return <span className="text-emerald-500 font-bold">T</span>;
  if (val === false) return <span className="text-red-500 font-bold">F</span>;
  return <span className="text-amber-500 font-bold">?</span>;
};
