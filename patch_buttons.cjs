const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newButtons = `                      </button>
                      <button 
                        onClick={() => { playSound('hover'); setActiveTab('sarisari'); }}
                        className={cn("whitespace-nowrap snap-start shrink-0 px-6 py-2 rounded-lg text-xs uppercase tracking-widest font-bold transition", 
                          activeTab === 'sarisari' ? "bg-white dark:bg-white/5 dark:text-blue-400 border dark:border-blue-500/30 shadow text-blue-600" : "hover:bg-white/50 dark:hover:bg-white/5 text-gray-500 border border-transparent"
                        )}
                      >
                        Sari-Sari Margin
                      </button>
                      <button 
                        onClick={() => { playSound('hover'); setActiveTab('tingi'); }}
                        className={cn("whitespace-nowrap snap-start shrink-0 px-6 py-2 rounded-lg text-xs uppercase tracking-widest font-bold transition", 
                          activeTab === 'tingi' ? "bg-white dark:bg-white/5 dark:text-teal-400 border dark:border-teal-500/30 shadow text-teal-600" : "hover:bg-white/50 dark:hover:bg-white/5 text-gray-500 border border-transparent"
                        )}
                      >
                        Tingi Checker
                      </button>`;

content = content.replace("                      </button>\n                    </div>", newButtons + "\n                    </div>");

fs.writeFileSync('src/App.tsx', content);
