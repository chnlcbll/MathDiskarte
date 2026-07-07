import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Mail } from 'lucide-react';
import { playSound } from '../utils/audio';

const faqs = [
  { question: "What is TamaBa?", answer: "TamaBa? is a propositional logic analyzer that helps you determine if everyday Filipino claims, promos, and rules make logical sense. It checks if an argument is valid or a fallacy." },
  { question: "How does the Logic Engine work?", answer: "The logic engine converts your selected premises into symbolic logic (e.g., P → Q). It then evaluates if the conclusion necessarily follows from the premises. If it does, the argument is valid. If there is a scenario where the premises are true but the conclusion is false, it is a fallacy." },
  { question: "What is Modus Ponens?", answer: "Modus Ponens is a valid form of argument: 'If P then Q. P is true. Therefore, Q is true.' (Example: If it rains, the street gets wet. It is raining. Therefore, the street is wet.)" },
  { question: "What is Modus Tollens?", answer: "Modus Tollens is a valid form of argument: 'If P then Q. Q is false. Therefore, P is false.' (Example: If it rains, the street gets wet. The street is not wet. Therefore, it is not raining.)" },
  { question: "What is Affirming the Consequent?", answer: "It is a logical fallacy: 'If P then Q. Q is true. Therefore, P is true.' (Example: If it rains, the street gets wet. The street is wet. Therefore, it rained. -> Fallacy, because the street could be wet for another reason, like someone washing their car.)" },
  { question: "What is Denying the Antecedent?", answer: "It is a logical fallacy: 'If P then Q. P is false. Therefore, Q is false.' (Example: If it rains, the street gets wet. It is not raining. Therefore, the street is not wet. -> Fallacy, because again, someone could be washing their car.)" }
];

export const TamaBaHelp: React.FC = () => {
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
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#141417] border border-gray-200 dark:border-white/10 rounded-2xl text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition shadow-sm"
              placeholder="Search TamaBa? FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">Propositional Logic FAQs</h3>
        <p className="text-sm text-gray-500 mb-4">Learn about valid arguments, fallacies, and how TamaBa? evaluates statements.</p>

        {filteredFaqs.length === 0 ? (
          <div className="text-sm text-gray-500 py-4 italic">No matching questions found.</div>
        ) : (
          <div className="space-y-3 mt-4">
            {filteredFaqs.map((faq, index) => {
              const id = `tamaba-${index}`;
              const isOpen = openIndex === id;
              return (
                <div 
                  key={id} 
                  className={`border rounded-xl transition-colors ${isOpen ? 'border-purple-500 bg-white/50 dark:bg-purple-500/5' : 'border-gray-200 dark:border-white/10 dark:bg-black/20'}`}
                >
                  <button
                    onClick={() => handleToggle(id)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-800 dark:text-gray-200"
                  >
                    <span>{faq.question}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown size={18} className={isOpen ? 'text-purple-500' : 'text-gray-400'} />
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
        <div className="bg-purple-50 dark:bg-[#141417] border border-purple-100 dark:border-white/10 rounded-2xl p-6 sticky top-0">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Mail size={18} className="text-purple-500" />
            Contact Info
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Have questions, issues, or suggestions? Reach out to us directly via email.
          </p>
          <div className="bg-white dark:bg-black/40 rounded-xl p-3 border border-black/5 dark:border-white/5 mb-6">
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Developer Email</div>
            <a href="mailto:christianelle_cabello@dlsu.edu.ph" className="text-sm font-medium text-purple-600 dark:text-purple-400 break-all select-all hover:underline">
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
            
            <p className="text-sm text-purple-600 dark:text-purple-400 font-bold mt-1">GEMATMW Z19 - Group 8</p>
          </div>
        </div>
      </div>
    </div>
  );
};
