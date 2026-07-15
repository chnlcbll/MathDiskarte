const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const tabsReplacement = `
                  ) : activeTab === 'utang' ? (
                    <motion.div key="utang" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <UtangCalc input={utangInput} setInput={setUtangInput} />
                    </motion.div>
                  ) : activeTab === 'sarisari' ? (
                    <motion.div key="sarisari" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <SariSariCalc input={sariSariInput} setInput={setSariSariInput} />
                    </motion.div>
                  ) : activeTab === 'tingi' ? (
                    <motion.div key="tingi" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <TingiCalc input={tingiInput} setInput={setTingiInput} />
                    </motion.div>
`;

content = content.replace(
  ") : activeTab === 'utang' ? (\n                    <motion.div key=\"utang\" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>\n                      <UtangCalc input={utangInput} setInput={setUtangInput} />\n                    </motion.div>",
  tabsReplacement
);

// also add the buttons for sari-sari and tingi
const buttonUtang = `
                    <button 
                      onClick={() => { playSound('click'); setActiveTab('utang'); }}
                      className={\`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap \${
                        activeTab === 'utang' ? "bg-white dark:bg-white/5 dark:text-red-400 border dark:border-red-500/30 shadow text-red-600" : "hover:bg-white/50 dark:hover:bg-white/5 text-gray-500 border border-transparent"
                      }\`}
                    >
                      Debt Analyzer
                    </button>`;
                    
const newButtons = `
                    <button 
                      onClick={() => { playSound('click'); setActiveTab('sarisari'); }}
                      className={\`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap \${
                        activeTab === 'sarisari' ? "bg-white dark:bg-white/5 dark:text-blue-400 border dark:border-blue-500/30 shadow text-blue-600" : "hover:bg-white/50 dark:hover:bg-white/5 text-gray-500 border border-transparent"
                      }\`}
                    >
                      Sari-Sari Margin
                    </button>
                    <button 
                      onClick={() => { playSound('click'); setActiveTab('tingi'); }}
                      className={\`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap \${
                        activeTab === 'tingi' ? "bg-white dark:bg-white/5 dark:text-teal-400 border dark:border-teal-500/30 shadow text-teal-600" : "hover:bg-white/50 dark:hover:bg-white/5 text-gray-500 border border-transparent"
                      }\`}
                    >
                      Tingi Checker
                    </button>
`;

content = content.replace(buttonUtang.trim(), buttonUtang.trim() + "\n" + newButtons);

fs.writeFileSync('src/App.tsx', content);
