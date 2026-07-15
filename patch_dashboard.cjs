const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(
  "import { ArrowRight, Wallet, PieChart, Clock, PlusCircle, LayoutDashboard, Calculator, Landmark, PiggyBank } from 'lucide-react';",
  "import { ArrowRight, Wallet, PieChart, Clock, PlusCircle, LayoutDashboard, Calculator, Landmark, PiggyBank, Target, Store, Scale, AlertTriangle } from 'lucide-react';"
);

// We need to add goal seek, utang, sarisari, tingi to the 'onNavigate' types
content = content.replace(
  "onNavigate: (view: 'tbond' | 'mp2' | 'goalseek' | 'fire' | 'compare') => void;",
  "onNavigate: (view: 'tbond' | 'mp2' | 'goalseek' | 'fire' | 'compare' | 'utang' | 'sarisari' | 'tingi') => void;"
);

const newButtons = `
              <button 
                onClick={() => { playSound(); onNavigate('goalseek'); }}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#141417] rounded-2xl hover:border-purple-500 dark:hover:border-purple-500 border border-transparent transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-16 h-16 bg-purple-50 dark:bg-black/40 border border-purple-100 dark:border-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <Target className="text-purple-600 dark:text-purple-400" size={28} />
                </div>
                <h4 className="font-bold text-[13px] text-gray-900 dark:text-white">Goal Seek</h4>
                <p className="text-[10px] text-gray-500 mt-2 text-center uppercase tracking-widest font-bold">Reverse Calculate</p>
              </button>
              <button 
                onClick={() => { playSound(); onNavigate('utang'); }}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#141417] rounded-2xl hover:border-red-500 dark:hover:border-red-500 border border-transparent transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-16 h-16 bg-red-50 dark:bg-black/40 border border-red-100 dark:border-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <AlertTriangle className="text-red-600 dark:text-red-400" size={28} />
                </div>
                <h4 className="font-bold text-[13px] text-gray-900 dark:text-white">Debt Analyzer</h4>
                <p className="text-[10px] text-gray-500 mt-2 text-center uppercase tracking-widest font-bold">Avoid Traps</p>
              </button>
              <button 
                onClick={() => { playSound(); onNavigate('sarisari'); }}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#141417] rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 border border-transparent transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-black/40 border border-blue-100 dark:border-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <Store className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <h4 className="font-bold text-[13px] text-gray-900 dark:text-white">Sari-Sari Margin</h4>
                <p className="text-[10px] text-gray-500 mt-2 text-center uppercase tracking-widest font-bold">Target Profit</p>
              </button>
              <button 
                onClick={() => { playSound(); onNavigate('tingi'); }}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#141417] rounded-2xl hover:border-teal-500 dark:hover:border-teal-500 border border-transparent transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-16 h-16 bg-teal-50 dark:bg-black/40 border border-teal-100 dark:border-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <Scale className="text-teal-600 dark:text-teal-400" size={28} />
                </div>
                <h4 className="font-bold text-[13px] text-gray-900 dark:text-white">Tingi Checker</h4>
                <p className="text-[10px] text-gray-500 mt-2 text-center uppercase tracking-widest font-bold">Find Best Value</p>
              </button>
`;

content = content.replace("              </button>\n            </div>\n          </div>", "              </button>\n" + newButtons + "            </div>\n          </div>");

fs.writeFileSync('src/components/Dashboard.tsx', content);
