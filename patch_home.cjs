const fs = require('fs');
let content = fs.readFileSync('src/components/HomeDashboard.tsx', 'utf8');

const updates = `
        <div className="w-full mt-12 bg-white dark:bg-[#141417] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="text-teal-500" size={24} />
              Updates & Announcements
            </h3>
            <span className="text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 px-3 py-1 rounded-full uppercase tracking-widest">
              New Feature
            </span>
          </div>
          <div className="bg-gray-50 dark:bg-black/20 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Debt Analyzer now in IponTubo</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We just launched the <strong>Debt Analyzer</strong> inside IponTubo! Find out the true cost of informal "5-6" loans or analyze the credit card minimum payment trap. Simply enter your loan amounts or card balance to instantly see how long it takes to pay off and how much interest you actually pay.
            </p>
          </div>
        </div>
`;

content = content.replace(/<\/button>\s*<\/div>\s*<\/div>\s*<\/motion.div>/, "</button></div>\n" + updates + "\n</div></motion.div>");

fs.writeFileSync('src/components/HomeDashboard.tsx', content);
