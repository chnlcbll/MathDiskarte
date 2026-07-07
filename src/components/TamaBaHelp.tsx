import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Mail } from 'lucide-react';
import { playSound } from '../utils/audio';

const faqs = [
  { question: "What is TamaBa?", answer: "TamaBa? is an everyday rule checker that helps you understand whether a rule, promo, requirement, or claim applies to your situation using basic logic." },
  { question: "How does the Rule Checker work?", answer: "It takes a common scenario (like a Free Shipping promo), breaks down the rule into simple Yes/No questions, and gives you a clear verdict based on logical conditions (AND, OR, IF-THEN, IF AND ONLY IF)." },
  { question: "What does the 'Math Behind It' section show?", answer: "It shows how your everyday situation translates into propositional logic. It displays variables (p, q, r), logical connectives (∧, ∨, →, ↔), and truth values to show the mathematical proof behind the verdict." },
  { question: "Why is a 'Budol Claim' an implication?", answer: "Claims like 'If it is discounted, then it is automatically sulit' follow an 'If P then Q' structure (P → Q). TamaBa helps you see that just because the first part is true (discounted), it doesn't always guarantee the second part (sulit)." },
  { question: "What is the 'IF AND ONLY IF' logic?", answer: "A biconditional (p ↔ q) means both conditions must match. Either both must be true, or both must be false for the result to apply. For example: 'A refund is given if and only if the item is defective AND returned within 7 days.'" },
  { question: "Can I add my own rules?", answer: "Yes! You can use the 'Create Custom Rule' button. It lets you define the rule name, result statement, conditions, and choose the logic type (AND, OR, IF-THEN, IF AND ONLY IF). Your custom rules are automatically saved locally." },
  { question: "Are my custom rules saved?", answer: "Yes, custom rules are saved locally to your device's browser using local storage. They will be there the next time you visit, unless you clear your browsing data or click the delete (trash) icon on the rule card." },
  { question: "What if I don't know the answer to one of the conditions?", answer: "You can select 'Not Sure'. If you do, the checker will return a 'KULANG ANG IMPORMASYON' (Insufficient Information) verdict, as the logic cannot be fully evaluated without complete facts." },
  { question: "Can TamaBa? solve math equations?", answer: "No, TamaBa? is strictly for propositional logic and evaluating statements (true/false conditions). It does not solve numerical equations like algebra or calculus." },
  { question: "Are fallacies checked in TamaBa?", answer: "TamaBa? primarily checks the truth value of everyday claims using direct propositional logic structures. Fallacies (like Denying the Antecedent) are intrinsically handled through implication structures (p → q)." }
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
          <p className="text-xs text-gray-500 mt-2 pl-2">
            💡 Tip: Search for keywords (e.g., "tax", "inflation") rather than full questions for best results.
          </p>
        </div>

        <h3 className="text-xl font-bold mb-2">Everyday Rule Checker FAQs</h3>
        <p className="text-sm text-gray-500 mb-4">Learn about how TamaBa? evaluates everyday rules and promos.</p>

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
            <p className="text-[8px] text-gray-400/80 dark:text-gray-500 mt-6 leading-tight">Disclaimer: Some parts were made with the help of Gemini.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
