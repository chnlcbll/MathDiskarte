import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Mail, Target } from 'lucide-react';
import { playSound } from '../utils/audio';

const faqs = [
  { question: "What is MathDiskarte?", answer: "MathDiskarte is an everyday math toolkit designed for Filipinos to help make smarter decisions about money, negotiation, and logical reasoning." },
  { question: "Who made MathDiskarte?", answer: "It was created by Group 8: Christianelle Cabello, Amos John Del Rosario, Lindsay Adrienne Dy, Andre Miguel Palaca, and Gabriel Oscar Torres." },
  { question: "Why was this website created?", answer: "This website was developed as a final group project for the GEMATMW (Mathematics in the Modern World) course at De La Salle University." },
  { question: "What are the main features of the website?", answer: "It features three main tools: IponTubo for compound interest calculation, TawadTactics for negotiation game theory, and TamaBa? for propositional logic checking." },
  { question: "Is my data saved on a server?", answer: "No, all calculations and custom rules are processed and saved locally in your browser's storage. We do not store your data on any external servers." },
  { question: "What technologies were used to build this?", answer: "The website is built using modern web technologies including React, TypeScript, and Tailwind CSS for responsive styling, ensuring a fast and interactive experience." },
  { question: "Are there other Help guides available?", answer: "Yes! Each main tool (IponTubo, TawadTactics, and TamaBa?) has its own specific FAQ section. You can access them by navigating to the respective tool and clicking the Help button. IponTubo even includes Video Guides for a more detailed walkthrough." },
];

export const DashboardHelp: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = (id: string) => {
    playSound('click');
    setOpenIndex(openIndex === id ? null : id);
  };

  const filteredFaqs = faqs.filter(
    faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#141417] border border-gray-200 dark:border-white/10 rounded-2xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition shadow-sm"
              placeholder="Search Dashboard FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 pl-2">
            💡 Tip: Search for keywords (e.g., "tax", "inflation") rather than full questions for best results.
          </p>
        </div>

        <h3 className="text-xl font-bold mb-2">MathDiskarte Overview FAQs</h3>
        <p className="text-sm text-gray-500 mb-4">Learn more about the website, the team behind it, and how it works.</p>

        {filteredFaqs.length === 0 ? (
          <div className="text-sm text-gray-500 py-4 italic">No matching questions found.</div>
        ) : (
          <div className="space-y-3 mt-4">
            {filteredFaqs.map((faq, index) => {
              const id = `dashboard-${index}`;
              const isOpen = openIndex === id;

              return (
                <div 
                  key={id} 
                  className={`border rounded-xl transition-colors ${isOpen ? 'border-emerald-500 bg-white/50 dark:bg-emerald-500/5' : 'border-gray-200 dark:border-white/10 dark:bg-black/20'}`}
                >
                  <button
                    onClick={() => handleToggle(id)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-800 dark:text-gray-200"
                  >
                    <span>{faq.question}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown size={18} className={isOpen ? 'text-emerald-500' : 'text-gray-400'} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-full lg:w-72 shrink-0">
        <div className="bg-emerald-50 dark:bg-[#141417] border border-emerald-100 dark:border-white/10 rounded-2xl p-6 sticky top-0">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Mail size={18} className="text-emerald-500 dark:text-teal-400" />
            Contact Info
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Have questions, issues, or suggestions? Reach out to us directly via email.
          </p>

          <div className="bg-white dark:bg-black/40 rounded-xl p-3 border border-black/5 dark:border-white/5 mb-6">
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Developer Email</div>
            <a href="mailto:christianelle_cabello@dlsu.edu.ph" className="text-sm font-medium text-emerald-600 dark:text-teal-400 break-all select-all hover:underline">
              christianelle_cabello@dlsu.edu.ph
            </a>
          </div>
          
          <div className="pt-6 border-t border-black/5 dark:border-white/10">
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Developer</div>
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-4">Christianelle Cabello</p>
            
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Group Members</div>
            <ul className="text-sm text-gray-800 dark:text-gray-200 mb-6 space-y-1">
              <li>Amos John Del Rosario</li>
              <li>Lindsay Adrienne Dy</li>
              <li>Andre Miguel Palaca</li>
              <li>Gabriel Oscar Torres</li>
            </ul>
            
            <p className="text-sm text-emerald-600 dark:text-teal-400 font-bold mt-1">GEMATMW Z19 - Group 8</p>
            <p className="text-[8px] text-gray-400/80 dark:text-gray-500 mt-6 leading-tight">Disclaimer: Some parts were made with the help of Gemini.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
