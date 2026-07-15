const fs = require('fs');

let content = fs.readFileSync('src/components/Login.tsx', 'utf8');

// Add Laptop icon import
content = content.replace(
  "import { Lock, User, ArrowRight } from 'lucide-react';",
  "import { Lock, User, ArrowRight, Laptop, Monitor, AlertCircle } from 'lucide-react';"
);

// Add state for device check
content = content.replace(
  "const [loading, setLoading] = useState(false);",
  "const [loading, setLoading] = useState(false);\n  const [deviceCheckState, setDeviceCheckState] = useState<'ask' | 'warning' | 'login'>('ask');"
);

// Add the popup JSX before the form or over the form
const popupJsx = `
      {deviceCheckState !== 'login' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-[#141417] p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-white/10 text-center"
          >
            {deviceCheckState === 'ask' ? (
              <>
                <div className="flex justify-center gap-4 mb-6 text-teal-500">
                  <Laptop size={48} strokeWidth={1.5} />
                  <Monitor size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Device Check</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">Are you currently using a Laptop or Desktop PC?</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { playSound('click'); setDeviceCheckState('warning'); }}
                    className="py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition"
                  >
                    No
                  </button>
                  <button 
                    onClick={() => { playSound('success'); setDeviceCheckState('login'); }}
                    className="py-3 px-4 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 transition"
                  >
                    Yes
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-6 text-orange-500">
                  <AlertCircle size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Caution</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                  Using a Laptop or PC is highly recommended for fewer bugs and a better viewing experience. Do you still wish to proceed?
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { playSound('click'); setDeviceCheckState('ask'); }}
                    className="py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition"
                  >
                    Go Back
                  </button>
                  <button 
                    onClick={() => { playSound('success'); setDeviceCheckState('login'); }}
                    className="py-3 px-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:bg-black dark:hover:bg-gray-100 transition"
                  >
                    Proceed
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
`;

content = content.replace(
  "{/* Background Atmospheric Glow */}",
  popupJsx + "\\n\\n      {/* Background Atmospheric Glow */}"
);

fs.writeFileSync('src/components/Login.tsx', content);
