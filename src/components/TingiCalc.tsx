import React, { useState } from 'react';
import { ShoppingCart, Scale, ArrowRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { playSound } from '../utils/audio';
import { TingiInput } from '../types';

interface Props {
  input: TingiInput;
  setInput: (i: TingiInput) => void;
}

export const TingiCalc: React.FC<Props> = ({ input, setInput }) => {
  const updateInput = (field: keyof TingiInput, value: number | string) => {
    setInput({ ...input, [field]: value });
  };

  const ppuA = input.itemAQuantity > 0 ? input.itemAPrice / input.itemAQuantity : 0;
  const ppuB = input.itemBQuantity > 0 ? input.itemBPrice / input.itemBQuantity : 0;

  let verdict = '';
  let difference = 0;
  let winner = 0; // 0 for tie, 1 for A, 2 for B

  const nameA = input.itemAName ? `${input.itemAName} (Item A)` : 'Item A';
  const nameB = input.itemBName ? `${input.itemBName} (Item B)` : 'Item B';

  if (ppuA > 0 && ppuB > 0) {
    if (ppuA < ppuB) {
      winner = 1;
      difference = ((ppuB - ppuA) / ppuB) * 100;
      verdict = `${nameA} is ${difference.toFixed(1)}% cheaper per ${input.unit}`;
    } else if (ppuB < ppuA) {
      winner = 2;
      difference = ((ppuA - ppuB) / ppuA) * 100;
      verdict = `${nameB} is ${difference.toFixed(1)}% cheaper per ${input.unit}`;
    } else {
      verdict = 'Both items have the exact same price per unit.';
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <div className="lg:col-span-5 space-y-6 bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
          <ShoppingCart className="text-teal-500" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">"Sulit" Grocery Checker</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Unit of Measurement</label>
            <select value={input.unit} onChange={e => { updateInput('unit', e.target.value); playSound('click'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 text-sm rounded-xl px-4 py-2.5 font-medium outline-none transition">
              <option value="gram">Grams (g) or Kilograms</option>
              <option value="ml">Milliliters (ml) or Liters</option>
              <option value="piece">Pieces / Sachet</option>
              <option value="meter">Meters</option>
            </select>
          </div>

          {/* Item A */}
          <div className="p-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 space-y-4 relative">
            <div className="absolute -top-3 left-4 bg-white dark:bg-[#141417] px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Item A (e.g. Sachet)</div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Name (Optional)</label>
              <input type="text" placeholder="e.g. Sachet" value={input.itemAName || ''} onChange={e => { updateInput('itemAName', e.target.value); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Price (₱)</label>
                <input type="number" value={input.itemAPrice || ''} onChange={e => { updateInput('itemAPrice', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Quantity ({input.unit})</label>
                <input type="number" value={input.itemAQuantity || ''} onChange={e => { updateInput('itemAQuantity', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
              </div>
            </div>
          </div>

          {/* Item B */}
          <div className="p-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 space-y-4 relative">
            <div className="absolute -top-3 left-4 bg-white dark:bg-[#141417] px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Item B (e.g. Bulk)</div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Name (Optional)</label>
              <input type="text" placeholder="e.g. Bulk Bottle" value={input.itemBName || ''} onChange={e => { updateInput('itemBName', e.target.value); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Price (₱)</label>
                <input type="number" value={input.itemBPrice || ''} onChange={e => { updateInput('itemBPrice', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Quantity ({input.unit})</label>
                <input type="number" value={input.itemBQuantity || ''} onChange={e => { updateInput('itemBQuantity', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-teal-600 dark:bg-teal-600/20 p-6 rounded-3xl border border-teal-500 shadow-lg shadow-teal-500/20 text-white relative overflow-hidden h-full flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Scale size={120} />
          </div>
          <h3 className="font-bold text-teal-100 uppercase tracking-widest text-xs mb-2 relative z-10">True Price Per Unit</h3>
          
          <div className="relative z-10 space-y-6 mt-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={cn("p-4 rounded-2xl border", winner === 1 ? "bg-white/20 border-white/40 shadow-lg" : "bg-black/20 border-transparent")}>
                <div className="text-xs uppercase tracking-widest mb-1 font-bold text-teal-100">{nameA}</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold">₱{isFinite(ppuA) ? ppuA.toFixed(4) : '0.0000'}</div>
                  <div className="text-teal-200 text-sm mb-1">/ {input.unit}</div>
                </div>
              </div>
              <div className={cn("p-4 rounded-2xl border", winner === 2 ? "bg-white/20 border-white/40 shadow-lg" : "bg-black/20 border-transparent")}>
                <div className="text-xs uppercase tracking-widest mb-1 font-bold text-teal-100">{nameB}</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold">₱{isFinite(ppuB) ? ppuB.toFixed(4) : '0.0000'}</div>
                  <div className="text-teal-200 text-sm mb-1">/ {input.unit}</div>
                </div>
              </div>
            </div>

            {ppuA > 0 && ppuB > 0 && winner !== 0 && (
              <div className="bg-white text-teal-900 p-6 rounded-2xl mt-6 shadow-xl flex flex-col items-center text-center">
                <div className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-2">Verdict</div>
                <div className="text-2xl font-bold">{verdict}</div>
                <p className="text-sm mt-3 text-gray-600 font-medium">
                  Don't be fooled by packaging! Buying {winner === 1 ? nameA : nameB} gives you more value for your money.
                </p>
              </div>
            )}
            
            {winner === 0 && ppuA > 0 && ppuB > 0 && (
              <div className="bg-black/20 p-6 rounded-2xl mt-6">
                <div className="text-xl font-bold text-center">It's a Tie!</div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};
