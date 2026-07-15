import React, { useState } from 'react';
import { UtangInput } from '../types';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';
import { playSound } from '../utils/audio';
import { Calculator, AlertTriangle, Info, Clock, TrendingUp } from 'lucide-react';

interface Props {
  input: UtangInput;
  setInput: React.Dispatch<React.SetStateAction<UtangInput>>;
}

export const UtangCalc: React.FC<Props> = ({ input, setInput }) => {
  const [localInput, setLocalInput] = useState<UtangInput>(input);
  const [fixedMin, setFixedMin] = useState(500);

  const updateField = (field: keyof UtangInput, value: any) => {
    const newInput = { ...localInput, [field]: value };
    setLocalInput(newInput);
    setInput(newInput);
  };

  const calculate56 = () => {
    const { loanAmount, returnAmount, daysToPay } = localInput;
    if (!loanAmount || !returnAmount || !daysToPay || loanAmount >= returnAmount) return null;

    const interest = returnAmount - loanAmount;
    const rate = interest / loanAmount;
    const periodsPerYear = 365 / daysToPay;
    
    const simpleAnnualRate = rate * periodsPerYear;
    const effectiveAnnualRate = Math.pow(1 + rate, periodsPerYear) - 1;

    return {
      interest,
      ratePct: rate * 100,
      simpleAnnualRate: simpleAnnualRate * 100,
      effectiveAnnualRate: effectiveAnnualRate * 100,
    };
  };

  const calculateCC = () => {
    const { ccBalance, ccAnnualRate, ccMinPaymentPercentage } = localInput;
    if (!ccBalance || !ccAnnualRate || !ccMinPaymentPercentage) return null;

    let balance = ccBalance;
    let months = 0;
    let totalInterest = 0;
    const monthlyRate = ccAnnualRate / 100 / 12;
    
    // Safety break to prevent infinite loops (cap at 600 months = 50 years)
    while (balance > 0 && months < 600) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      
      let minPayment = Math.max(fixedMin, balance * (ccMinPaymentPercentage / 100));
      
      if (balance + interest <= minPayment) {
        minPayment = balance + interest;
        balance = 0;
      } else {
        balance = balance + interest - minPayment;
      }
      months++;
      
      // If balance is increasing despite payments, they will never pay it off
      if (minPayment <= interest && months === 1) {
         return { months: -1, totalInterest: -1, totalPaid: -1 };
      }
    }

    return {
      months,
      totalInterest,
      totalPaid: ccBalance + totalInterest
    };
  };

  const res56 = localInput.mode === '5-6' ? calculate56() : null;
  const resCC = localInput.mode === 'cc-min' ? calculateCC() : null;

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-xl w-fit">
        <button
          onClick={() => { playSound('click'); updateField('mode', '5-6'); }}
          className={cn("px-6 py-2 rounded-lg text-sm font-bold transition",
            localInput.mode === '5-6' ? "bg-white dark:bg-white/10 text-red-600 dark:text-red-400 shadow" : "text-gray-500 hover:text-gray-700"
          )}
        >
          "5-6" Informal Loan
        </button>
        <button
          onClick={() => { playSound('click'); updateField('mode', 'cc-min'); }}
          className={cn("px-6 py-2 rounded-lg text-sm font-bold transition",
            localInput.mode === 'cc-min' ? "bg-white dark:bg-white/10 text-orange-600 dark:text-orange-400 shadow" : "text-gray-500 hover:text-gray-700"
          )}
        >
          Credit Card Minimum
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-gray-400" />
              {localInput.mode === '5-6' ? '5-6 Loan Details' : 'Credit Card Details'}
            </h3>

            {localInput.mode === '5-6' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Borrowed Amount (₱)</label>
                  <input type="number" value={localInput.loanAmount || ''} onChange={(e) => updateField('loanAmount', Number(e.target.value))} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500 font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Total Amount to Return (₱)</label>
                  <input type="number" value={localInput.returnAmount || ''} onChange={(e) => updateField('returnAmount', Number(e.target.value))} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500 font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Days to Pay</label>
                  <input type="number" value={localInput.daysToPay || ''} onChange={(e) => updateField('daysToPay', Number(e.target.value))} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500 font-mono" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Current Card Balance (₱)</label>
                  <input type="number" value={localInput.ccBalance || ''} onChange={(e) => updateField('ccBalance', Number(e.target.value))} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500 font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Annual Interest Rate (%)</label>
                  <input type="number" value={localInput.ccAnnualRate || ''} onChange={(e) => updateField('ccAnnualRate', Number(e.target.value))} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500 font-mono" />
                  <p className="text-xs text-gray-500 mt-1">Typically 36% (3% per month)</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Minimum Payment % of Balance</label>
                  <input type="number" value={localInput.ccMinPaymentPercentage || ''} onChange={(e) => updateField('ccMinPaymentPercentage', Number(e.target.value))} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500 font-mono" />
                  <p className="text-xs text-gray-500 mt-1">Usually 3% to 5%.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm h-full flex flex-col">
            <h3 className="font-bold text-xl mb-6">Analysis Results</h3>
            
            {localInput.mode === '5-6' && res56 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex-1">
                <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-red-900 dark:text-red-300 mb-1">The True Cost of 5-6</h4>
                      <p className="text-sm text-red-800 dark:text-red-400/80 leading-relaxed">
                        While paying an extra ₱{res56.interest.toLocaleString()} in {localInput.daysToPay} days might seem small, if this were a bank loan that lasted a year, the equivalent annual rate is extremely high.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Simple Annual Rate</span>
                    <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{res56.simpleAnnualRate.toLocaleString(undefined, { maximumFractionDigits: 1 })}%</span>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Effective Annual Rate</span>
                    <span className="text-3xl font-black text-red-600 dark:text-red-400 font-mono">{res56.effectiveAnnualRate > 1000 ? '>1000' : res56.effectiveAnnualRate.toLocaleString(undefined, { maximumFractionDigits: 1 })}%</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-start gap-3">
                  <Info className="text-gray-400 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    <strong>Simple Rate</strong> is just multiplying the interest by how many {localInput.daysToPay}-day periods are in a year. <br/>
                    <strong>Effective Rate</strong> (often compounding) is the actual mathematical interest if rolled over continuously. Standard personal bank loans are usually between 15% to 30% annually.
                  </p>
                </div>
              </motion.div>
            )}

            {localInput.mode === 'cc-min' && resCC && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex-1">
                {resCC.months === -1 ? (
                  <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-center">
                    <AlertTriangle className="text-red-600 dark:text-red-400 mx-auto mb-2" size={32} />
                    <h4 className="font-bold text-red-900 dark:text-red-300 text-lg mb-1">Mathematical Trap Detected</h4>
                    <p className="text-sm text-red-800 dark:text-red-400/80">Your minimum payment is smaller than the monthly interest generated. You will <strong>never</strong> pay off this debt if you only pay the minimum.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-100 dark:border-orange-500/20 sm:col-span-3">
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={14}/> Time to Pay Off</span>
                        <span className="text-3xl font-black text-orange-700 dark:text-orange-300">
                          {Math.floor(resCC.months / 12) > 0 ? `${Math.floor(resCC.months / 12)} years, ` : ''}{resCC.months % 12} months
                        </span>
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5 sm:col-span-3 flex justify-between items-center">
                         <div>
                           <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Total Amount Paid</span>
                           <span className="text-2xl font-black text-gray-900 dark:text-white font-mono">₱{resCC.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                         </div>
                         <div className="text-right">
                           <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1 block">Interest Portion</span>
                           <span className="text-xl font-bold text-red-600 dark:text-red-400 font-mono">₱{resCC.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                         </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="text-gray-500 shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">The Minimum Payment Trap</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            By paying only the minimum, you end up paying <strong>{((resCC.totalPaid / localInput.ccBalance) * 100).toLocaleString(undefined, {maximumFractionDigits: 0})}%</strong> of your original debt over {resCC.months} months. Always try to pay your credit card balance in full every month.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {!res56 && !resCC && (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <Calculator size={48} className="mb-4 text-gray-400" />
                <p className="font-medium text-gray-600 dark:text-gray-300">Enter valid numbers to see the analysis</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
