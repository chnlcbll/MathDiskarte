const fs = require('fs');
let content = fs.readFileSync('src/components/TawadTactics.tsx', 'utf8');

const toggleHTML = `
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-black/40 p-1 rounded-xl flex gap-1 inline-flex">
          <button 
            onClick={() => { playSound('click'); setActiveSubTool('analyzer'); }}
            className={cn("px-6 py-2 rounded-lg text-sm font-bold transition", activeSubTool === 'analyzer' ? "bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}
          >
            Tawad Analyzer
          </button>
          <button 
            onClick={() => { playSound('click'); setActiveSubTool('freelance_rate'); }}
            className={cn("px-6 py-2 rounded-lg text-sm font-bold transition", activeSubTool === 'freelance_rate' ? "bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}
          >
            Freelance Rate Calculator
          </button>
        </div>
      </div>

      {activeSubTool === 'analyzer' ? (
        <>
`;

content = content.replace(
  "{/* Quick Cards */}",
  toggleHTML + "\n      {/* Quick Cards */}"
);

const calcHTML = `
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
          <div className="lg:col-span-5 space-y-6 bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
              <Settings2 className="text-blue-500" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Calculate Hourly Rate</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Monthly Living Expenses (₱)</label>
                <input type="number" value={flExpenses} onChange={e => setFlExpenses(Number(e.target.value) || '')} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Internet & Utilities (₱)</label>
                <input type="number" value={flInternet} onChange={e => setFlInternet(Number(e.target.value) || '')} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Hardware Depreciation/Mo (₱)</label>
                <input type="number" value={flHardware} onChange={e => setFlHardware(Number(e.target.value) || '')} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Tax Rate (%)</label>
                  <input type="number" value={flTax} onChange={e => setFlTax(Number(e.target.value) || '')} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Hours / Week</label>
                  <input type="number" value={flHoursPerWeek} onChange={e => setFlHoursPerWeek(Number(e.target.value) || '')} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-blue-600 dark:bg-blue-600/20 p-6 rounded-3xl border border-blue-500 shadow-lg shadow-blue-500/20 text-white relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Receipt size={120} />
              </div>
              <h3 className="font-bold text-blue-100 uppercase tracking-widest text-xs mb-2 relative z-10">Your Minimum Hourly Rate</h3>
              
              {(() => {
                const expenses = Number(flExpenses) || 0;
                const internet = Number(flInternet) || 0;
                const hardware = Number(flHardware) || 0;
                const tax = (Number(flTax) || 0) / 100;
                const hoursPerWeek = Number(flHoursPerWeek) || 0;
                
                const totalMonthlyNeed = expenses + internet + hardware;
                const grossMonthlyNeed = totalMonthlyNeed / (1 - tax);
                const monthlyHours = (hoursPerWeek * 52) / 12;
                
                const hourlyRate = monthlyHours > 0 ? grossMonthlyNeed / monthlyHours : 0;
                const hourlyRateUSD = hourlyRate / 58;

                return (
                  <div className="relative z-10 space-y-6 mt-4">
                    <div className="flex items-end gap-4">
                      <div className="text-6xl font-bold">₱{hourlyRate.toFixed(2)}</div>
                      <div className="text-blue-200 font-bold text-xl mb-2">/ hr</div>
                    </div>
                    <div className="flex items-center gap-2 text-blue-200 text-sm font-medium">
                      <span>Approx.</span>
                      <span className="bg-white/20 px-2 py-1 rounded text-white">$` + '{hourlyRateUSD.toFixed(2)}' + ` USD</span>
                      <span>/ hr</span>
                    </div>

                    <div className="bg-black/20 p-4 rounded-2xl mt-4">
                      <p className="text-sm text-blue-100 leading-relaxed">
                        To cover <strong>₱{totalMonthlyNeed.toLocaleString()}</strong> in monthly expenses and overhead, taking into account a <strong>{` + '(tax * 100).toFixed(0)' + `}% tax rate</strong>, you must earn <strong>₱{grossMonthlyNeed.toLocaleString(undefined, {maximumFractionDigits: 0})}</strong> per month. Working <strong>{hoursPerWeek} hours a week</strong> means you should never accept a project paying less than this hourly rate.
                      </p>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      )}
`;

content = content.replace(
  "      </div>\n    </div>\n  );\n};",
  "      </div>\n" + calcHTML + "\n    </div>\n  );\n};"
);

content = content.replace(
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Listed Price (₱)</label>',
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{scenario === "salary_offer" ? "Your Target Salary (₱)" : "Listed Price (₱)"}</label>'
);
content = content.replace(
  "<label className=\"block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5\">Buyer's Offer (₱)</label>",
  "<label className=\"block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5\">{scenario === 'salary_offer' ? 'Employer\\'s Offer (₱)' : 'Buyer\\'s Offer (₱)'}</label>"
);
content = content.replace(
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Lowest Acceptable (₱)</label>',
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{scenario === "salary_offer" ? "Lowest Acceptable Salary (₱)" : "Lowest Acceptable (₱)"}</label>'
);
content = content.replace(
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-2">Urgency to Sell</label>',
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-2">{scenario === "salary_offer" ? "Urgency to Get Hired" : "Urgency to Sell"}</label>'
);
content = content.replace(
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Buyer Walk-away Risk</label>',
  '<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{scenario === "salary_offer" ? "Employer Walk-away Risk" : "Buyer Walk-away Risk"}</label>'
);

fs.writeFileSync('src/components/TawadTactics.tsx', content);
