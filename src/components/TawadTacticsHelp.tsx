import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Mail } from 'lucide-react';
import { playSound } from '../utils/audio';

const faqs = [
  { question: "What is TawadTactics?", answer: "TawadTactics is a Game Theory-based negotiation analyzer designed for everyday Filipino 'tawad' situations. It helps you decide whether to accept, reject, hold your price, or counteroffer when buying or selling items." },
  { question: "How does it use Game Theory?", answer: "It builds a Payoff Matrix behind the scenes to represent the possible outcomes for both you and the buyer. It then calculates the Maximin strategy (the safest move to minimize your worst-case scenario) and the Nash Equilibrium (the most stable outcome where neither party regrets their choice)." },
  { question: "What does 'Maximin' mean?", answer: "Maximin is a strategy where you look at the worst possible result of each of your choices, and then pick the choice that gives you the 'best' worst-case scenario. It's essentially the safest move when you don't know what the other person will do." },
  { question: "What is a Nash Equilibrium?", answer: "A Nash Equilibrium is a situation in a game where both players have made their choices, and neither player can benefit by changing their strategy while the other player keeps theirs unchanged. In negotiations, it represents a stable agreement." },
  { question: "Why do I need to input 'Urgency' and 'Walk-away Risk'?", answer: "These factors adjust the internal payoffs in the matrix. If you have high urgency, holding your price becomes riskier. If the buyer has high walk-away risk, a counteroffer must be more generous. These help tailor the recommendation to your specific situation." },
  { question: "How is the Recommended Move generated?", answer: "The Recommended Move combines the mathematical safety of Maximin, the stability of Nash Equilibrium, and contextual logic based on the Filipino bargaining culture to give you a clear, actionable 'diskarte' or strategy." }
];

export const TawadTacticsHelp: React.FC = () => {
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
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#141417] border border-gray-200 dark:border-white/10 rounded-2xl text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition shadow-sm"
              placeholder="Search TawadTactics FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">Game Theory & Negotiation FAQs</h3>
        <p className="text-sm text-gray-500 mb-4">Learn how the math behind TawadTactics helps you make smarter decisions.</p>

        {filteredFaqs.length === 0 ? (
          <div className="text-sm text-gray-500 py-4 italic">No matching questions found.</div>
        ) : (
          <div className="space-y-3 mt-4">
            {filteredFaqs.map((faq, index) => {
              const id = `tawad-${index}`;
              const isOpen = openIndex === id;
              return (
                <div 
                  key={id} 
                  className={`border rounded-xl transition-colors ${isOpen ? 'border-blue-500 bg-white/50 dark:bg-blue-500/5' : 'border-gray-200 dark:border-white/10 dark:bg-black/20'}`}
                >
                  <button
                    onClick={() => handleToggle(id)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-800 dark:text-gray-200"
                  >
                    <span>{faq.question}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown size={18} className={isOpen ? 'text-blue-500' : 'text-gray-400'} />
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
        <div className="bg-blue-50 dark:bg-[#141417] border border-blue-100 dark:border-white/10 rounded-2xl p-6 sticky top-0">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Mail size={18} className="text-blue-500" />
            Contact Info
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Have questions, issues, or suggestions? Reach out to us directly via email.
          </p>
          <div className="bg-white dark:bg-black/40 rounded-xl p-3 border border-black/5 dark:border-white/5 mb-6">
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Developer Email</div>
            <a href="mailto:christianelle_cabello@dlsu.edu.ph" className="text-sm font-medium text-blue-600 dark:text-blue-400 break-all select-all hover:underline">
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
            
            <p className="text-sm text-blue-600 dark:text-blue-400 font-bold mt-1">GEMATMW Z19 - Group 8</p>
          </div>
        </div>
      </div>
    </div>
  );
};
