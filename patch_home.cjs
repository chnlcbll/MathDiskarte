const fs = require('fs');
let content = fs.readFileSync('src/components/HomeDashboard.tsx', 'utf8');

const newAnnouncements = `
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
`;

content = content.replace(
  'className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">',
  'className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">\n' + newAnnouncements
);

fs.writeFileSync('src/components/HomeDashboard.tsx', content);
