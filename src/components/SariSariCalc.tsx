import React, { useState } from 'react';
import { Store, Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';
import { playSound } from '../utils/audio';
import { SariSariInput } from '../types';

interface Props {
  input: SariSariInput;
  setInput: (i: SariSariInput) => void;
}

export const SariSariCalc: React.FC<Props> = ({ input, setInput }) => {
  const updateInput = (field: keyof SariSariInput, value: number | string) => {
    setInput({ ...input, [field]: value });
  };

  const totalCost = input.wholesaleCost + input.transpoCost;
  const effectiveItems = input.itemsPerPack * (1 - input.spoilageRate / 100);
  const costPerItem = effectiveItems > 0 ? totalCost / effectiveItems : 0;
  const targetSellingPrice = costPerItem / (1 - input.targetMargin / 100);
  const profitPerItem = targetSellingPrice - costPerItem;
  const totalExpectedProfit = profitPerItem * effectiveItems;
  const itemsActuallySold = input.itemsSold !== undefined && input.itemsSold > 0 ? input.itemsSold : effectiveItems;
  const actualRevenue = itemsActuallySold * targetSellingPrice;
  const actualProfit = actualRevenue - totalCost;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <div className="lg:col-span-5 space-y-6 bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
          <Store className="text-blue-500" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Sari-Sari Target Margin</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Product Name (Optional)</label>
            <input type="text" placeholder="e.g. Sachet Shampoo" value={input.productName || ''} onChange={e => { updateInput('productName', e.target.value); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Wholesale Cost (₱)</label>
            <input type="number" value={input.wholesaleCost || ''} onChange={e => { updateInput('wholesaleCost', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Items per pack/box</label>
              <input type="number" value={input.itemsPerPack || ''} onChange={e => { updateInput('itemsPerPack', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Target Margin (%)</label>
              <input type="number" value={input.targetMargin || ''} onChange={e => { updateInput('targetMargin', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-4 py-2.5 text-sm font-bold text-blue-700 dark:text-blue-400 rounded-xl outline-none focus:border-blue-500 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Pamasahe / Transpo Cost (₱)</label>
            <input type="number" value={input.transpoCost || ''} onChange={e => { updateInput('transpoCost', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Expected Spoilage/Loss (%)</label>
            <input type="number" value={input.spoilageRate || ''} onChange={e => { updateInput('spoilageRate', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
            <p className="text-[10px] text-gray-400 mt-1">If you expect some items to rot, break, or be lost.</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Items Actually Sold (Optional)</label>
            <input type="number" value={input.itemsSold || ''} onChange={e => { updateInput('itemsSold', Number(e.target.value)); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
            <p className="text-[10px] text-gray-400 mt-1">See actual profit if you don't sell all effective items.</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-600 dark:bg-blue-600/20 p-6 rounded-3xl border border-blue-500 shadow-lg shadow-blue-500/20 text-white relative overflow-hidden h-full flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Calculator size={120} />
          </div>
          <h3 className="font-bold text-blue-100 uppercase tracking-widest text-xs mb-2 relative z-10">Selling Price To Hit {input.targetMargin}% Margin {input.productName ? `for ${input.productName}` : ''}</h3>
          
          <div className="relative z-10 space-y-6 mt-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="text-5xl md:text-6xl font-bold">₱{isFinite(targetSellingPrice) ? targetSellingPrice.toFixed(2) : '0.00'}</div>
              <div className="text-blue-200 font-bold text-xl mb-2">/ item</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-black/20 p-4 rounded-2xl">
                <div className="text-xs text-blue-200 uppercase tracking-widest mb-1">True Cost Per Item</div>
                <div className="text-2xl font-bold">₱{isFinite(costPerItem) ? costPerItem.toFixed(2) : '0.00'}</div>
              </div>
              <div className="bg-black/20 p-4 rounded-2xl">
                <div className="text-xs text-blue-200 uppercase tracking-widest mb-1">Profit Per Item</div>
                <div className="text-2xl font-bold text-emerald-300">₱{isFinite(profitPerItem) ? profitPerItem.toFixed(2) : '0.00'}</div>
              </div>
            </div>

            <div className="bg-black/20 p-4 rounded-2xl flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <TrendingUp className="text-blue-300 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-blue-100 leading-relaxed">
                  If you sell all {effectiveItems.toFixed(1)} effective items {input.productName ? `of ${input.productName} ` : ''}at ₱{isFinite(targetSellingPrice) ? targetSellingPrice.toFixed(2) : '0.00'}, you will recover your total cost of <strong>₱{totalCost.toFixed(2)}</strong> and earn a total net profit of <strong>₱{isFinite(totalExpectedProfit) ? totalExpectedProfit.toFixed(2) : '0.00'}</strong>.
                </p>
              </div>
              {input.itemsSold !== undefined && input.itemsSold > 0 && input.itemsSold !== effectiveItems && (
                <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                  <Calculator className="text-orange-300 shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-orange-100 leading-relaxed">
                    If you only sell {input.itemsSold} items, your actual {actualProfit >= 0 ? 'profit' : 'loss'} will be <strong className={actualProfit >= 0 ? "text-emerald-300" : "text-red-400"}>₱{Math.abs(actualProfit).toFixed(2)}</strong>.
                  </p>
                </div>
              )}
            </div>
            {input.spoilageRate > 0 && (
              <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-2xl flex items-start gap-3 text-orange-200">
                <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                <p className="text-sm leading-relaxed">
                  You are pricing to cover {input.spoilageRate}% expected spoilage. The effective items to sell is reduced to {effectiveItems.toFixed(1)} pieces.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
