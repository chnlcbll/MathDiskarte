import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Handshake, Target, ShieldAlert, Check, HelpCircle, Store, Tag, Receipt, Users, ShoppingBag, Settings2, ShieldCheck, Zap } from 'lucide-react';
import { playSound } from '../utils/audio';
import { cn } from '../utils/cn';

type ScenarioPreset = 'fb_marketplace' | 'freelance' | 'promo' | 'ukay' | 'sarisari' | 'palengke';
type Urgency = 'Low' | 'Medium' | 'High';
type WalkAwayRisk = 'Low' | 'Medium' | 'High';

export const TawadTactics: React.FC = () => {
  const [scenario, setScenario] = useState<ScenarioPreset>('fb_marketplace');
  
  // Basic inputs
  const [itemPrice, setItemPrice] = useState<number | ''>(1000);
  const [lowestAcceptablePrice, setLowestAcceptablePrice] = useState<number | ''>(850);
  const [buyerOffer, setBuyerOffer] = useState<number | ''>(800);
  
  const [urgency, setUrgency] = useState<Urgency>('Medium');
  const [walkAwayRisk, setWalkAwayRisk] = useState<WalkAwayRisk>('High');

  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [showGameTheoryView, setShowGameTheoryView] = useState(false);

  const presets = [
    { id: 'fb_marketplace', label: 'Sell an Item', desc: 'FB Marketplace', icon: ShoppingBag },
    { id: 'freelance', label: 'Negotiate Price', desc: 'Freelance Service', icon: Handshake },
    { id: 'promo', label: 'Offer a Promo', desc: 'Online Shop', icon: Tag },
  ] as const;

  const handleScenarioChange = (s: ScenarioPreset) => {
    playSound('click');
    setScenario(s);
    setHasAnalyzed(false);
    
    if (s === 'fb_marketplace') {
      setItemPrice(1000); setLowestAcceptablePrice(850); setBuyerOffer(800);
      setUrgency('Medium'); setWalkAwayRisk('High');
    } else if (s === 'freelance') {
      setItemPrice(5000); setLowestAcceptablePrice(4000); setBuyerOffer(3500);
      setUrgency('Low'); setWalkAwayRisk('Medium');
    } else if (s === 'promo') {
      setItemPrice(500); setLowestAcceptablePrice(400); setBuyerOffer(450);
      setUrgency('High'); setWalkAwayRisk('Low');
    } else if (s === 'ukay') {
      setItemPrice(250); setLowestAcceptablePrice(150); setBuyerOffer(100);
      setUrgency('High'); setWalkAwayRisk('High');
    } else if (s === 'sarisari') {
      setItemPrice(15); setLowestAcceptablePrice(12); setBuyerOffer(10);
      setUrgency('Low'); setWalkAwayRisk('Low');
    } else if (s === 'palengke') {
      setItemPrice(180); setLowestAcceptablePrice(150); setBuyerOffer(130);
      setUrgency('Medium'); setWalkAwayRisk('Medium');
    }
  };

  const analyzeGame = () => {
    playSound('click');
    setHasAnalyzed(true);
  };

  const price = Number(itemPrice) || 0;
  const lowest = Number(lowestAcceptablePrice) || 0;
  const offer = Number(buyerOffer) || 0;

  const smartCounteroffer = Math.floor((price + lowest) / 2);
  
  let riskLevel = 'Medium risk';
  if (walkAwayRisk === 'High' && urgency === 'High') riskLevel = 'High risk';
  if (walkAwayRisk === 'Low' && urgency === 'Low') riskLevel = 'Low risk';

  let recommendedMove = 'Hold Price';
  let safestMove = 'Counteroffer';
  let bestCase = 'Buyer accepts original price.';
  let worstCase = 'Buyer walks away and you lose the sale.';
  let explanation = '';
  let stableOutcome = '';
  
  if (offer >= lowest) {
    recommendedMove = 'Accept Tawad';
    safestMove = 'Accept Tawad';
    explanation = 'The buyer\'s offer is above your lowest acceptable price. Accept it to secure the sale immediately without risking them walking away.';
    stableOutcome = 'Seller accepts, Buyer buys immediately.';
  } else if (offer < lowest) {
    if (urgency === 'High') {
      if (walkAwayRisk === 'High') {
         recommendedMove = `Counteroffer slightly above minimum at ₱${Math.floor(lowest * 1.05)}`;
         explanation = `Accepting ₱${offer} is below your minimum price, so it is not the best choice. Holding ₱${price} may give you the highest profit, but there is a high chance the buyer walks away. A ₱${Math.floor(lowest * 1.05)} counteroffer gives a better balance between earning profit and closing the sale quickly.`;
         safestMove = 'Give Discount / Counteroffer';
         stableOutcome = 'Seller gives a small discount, buyer accepts.';
      } else {
         recommendedMove = `Counteroffer at ₱${smartCounteroffer}`;
         explanation = `Even though you need to sell fast, the buyer is unlikely to walk away. You can afford to counteroffer in the middle at ₱${smartCounteroffer} to maximize profit while still offering a deal.`;
         safestMove = 'Give Discount / Counteroffer';
         stableOutcome = 'Seller gives moderate discount, Buyer accepts.';
      }
    } else {
      if (walkAwayRisk === 'High') {
        recommendedMove = `Counteroffer at ₱${smartCounteroffer}`;
        explanation = `You are not in a rush, but the buyer might walk away. Offer a middle ground of ₱${smartCounteroffer}. If they walk away, you can afford to wait for another buyer.`;
        safestMove = 'Give Discount / Counteroffer';
        stableOutcome = 'Seller gives moderate discount, Buyer accepts.';
      } else {
        recommendedMove = 'Hold Price';
        safestMove = 'Hold Price';
        explanation = `You are not in a hurry and the buyer is unlikely to walk away. Hold your ground at ₱${price} to maximize profit. They will likely cave in and accept.`;
        stableOutcome = 'Seller holds price, Buyer eventually accepts.';
      }
    }
  }

  // Abstract Payoffs for Matrix
  const payoffs = {
    s1s1: [100, 20],
    s1s2: [0, 50],
    s2s1: [80, 80],
    s2s2: [0, 50],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3 text-gray-900 dark:text-white tracking-tight">
          <img src="/tawadtactics.png" alt="TawadTactics" className="w-10 h-10 object-contain rounded-lg shadow-sm" />
          TawadTactics Analyzer
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Find your smartest move in everyday Filipino negotiations.</p>
      </div>

      {/* Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {presets.map(p => (
          <button
            key={p.id}
            onClick={() => handleScenarioChange(p.id as ScenarioPreset)}
            className={cn("p-4 rounded-2xl border-2 text-left transition-all flex flex-col gap-2 transform active:scale-[0.98]", 
              scenario === p.id 
                ? "bg-blue-50 dark:bg-blue-500/10 border-blue-500 shadow-md shadow-blue-500/10" 
                : "bg-white dark:bg-[#141417] border-gray-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/50"
            )}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className={cn("p-2 rounded-xl", scenario === p.id ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400")}>
                <p.icon size={20} />
              </div>
              <span className={cn("font-bold", scenario === p.id ? "text-blue-700 dark:text-blue-400" : "text-gray-800 dark:text-gray-200")}>{p.label}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium pl-[44px]">{p.desc}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Scenario Setup */}
        <div className="lg:col-span-4 space-y-6 bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
            <Settings2 className="text-blue-500" />
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Scenario Setup</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Scenario Type</label>
              <select 
                value={scenario}
                onChange={(e) => handleScenarioChange(e.target.value as ScenarioPreset)}
                className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 text-sm rounded-xl px-4 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="fb_marketplace">FB Marketplace Selling</option>
                <option value="freelance">Freelance Service</option>
                <option value="promo">Online Shop Promo</option>
                <option value="ukay">Ukay / Pre-loved Item</option>
                <option value="sarisari">Sari-sari Store</option>
                <option value="palengke">Palengke Tawad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Listed Price (₱)</label>
              <input type="number" value={itemPrice} onChange={e => { setItemPrice(Number(e.target.value) || ''); setHasAnalyzed(false); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Buyer's Offer (₱)</label>
              <input type="number" value={buyerOffer} onChange={e => { setBuyerOffer(Number(e.target.value) || ''); setHasAnalyzed(false); }} className="w-full bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 px-4 py-2.5 text-sm font-bold text-blue-900 dark:text-blue-400 rounded-xl outline-none focus:border-blue-500 transition" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Lowest Acceptable (₱)</label>
              <input type="number" value={lowestAcceptablePrice} onChange={e => { setLowestAcceptablePrice(Number(e.target.value) || ''); setHasAnalyzed(false); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-blue-500 transition" />
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-white/5">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-2">Urgency to Sell</label>
              <div className="flex bg-gray-100 dark:bg-black/40 rounded-xl p-1 mb-4">
                {['Low', 'Medium', 'High'].map(u => (
                  <button key={u} onClick={() => { playSound('click'); setUrgency(u as Urgency); setHasAnalyzed(false); }} className={cn("flex-1 py-1.5 rounded-lg text-xs font-bold transition", urgency === u ? "bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}>{u}</button>
                ))}
              </div>

              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Buyer Walk-away Risk</label>
              <div className="flex bg-gray-100 dark:bg-black/40 rounded-xl p-1">
                {['Low', 'Medium', 'High'].map(u => (
                  <button key={u} onClick={() => { playSound('click'); setWalkAwayRisk(u as WalkAwayRisk); setHasAnalyzed(false); }} className={cn("flex-1 py-1.5 rounded-lg text-xs font-bold transition", walkAwayRisk === u ? "bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}>{u}</button>
                ))}
              </div>
            </div>

            <button 
              onClick={analyzeGame}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition transform hover:scale-[1.02] active:scale-95"
            >
              Analyze Strategy
            </button>
          </div>
        </div>

        {/* Middle Panel: Your Options */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm h-full">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">Possible Moves</h3>
            
            <div className="mb-6">
              <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Your Moves (Seller)</h4>
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-gray-300">Hold Price</div>
                <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-gray-300">Counteroffer</div>
                <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-gray-300">Accept Tawad</div>
                <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-gray-300">Walk Away</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3">Their Moves (Buyer)</h4>
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-gray-300">Accept Price</div>
                <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-gray-300">Ask Lower</div>
                <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-gray-300">Walk Away</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Result */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            {hasAnalyzed ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-blue-600 dark:bg-blue-600/20 p-6 rounded-3xl border border-blue-500 shadow-lg shadow-blue-500/20 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Zap size={64} />
                  </div>
                  <h3 className="font-bold text-blue-100 uppercase tracking-widest text-xs mb-2">Recommended Move</h3>
                  <div className="text-2xl font-bold mb-4">{recommendedMove}</div>
                  <p className="text-blue-50 dark:text-blue-100/80 text-sm leading-relaxed mb-4">
                    {explanation}
                  </p>
                  <div className="bg-white/10 dark:bg-black/20 rounded-xl p-4 text-sm font-medium flex items-center justify-between">
                    <div>
                      <span className="text-blue-200">Best Diskarte:</span> Protect your price but show you are willing to negotiate.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#141417] p-5 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
                    <ShieldCheck className="text-emerald-500 mb-2" size={24} />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Safest Strategy</h3>
                    <p className="text-xs text-gray-500">{safestMove}</p>
                  </div>
                  <div className="bg-white dark:bg-[#141417] p-5 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
                    <Target className="text-purple-500 mb-2" size={24} />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Stable Outcome</h3>
                    <p className="text-xs text-gray-500">{stableOutcome}</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#141417] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Outcome Table</h3>
                    <button 
                      onClick={() => setShowGameTheoryView(!showGameTheoryView)}
                      className="text-xs font-bold text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full transition"
                    >
                      {showGameTheoryView ? 'Hide Game Theory' : 'Show Game Theory View'}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showGameTheoryView && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="overflow-x-auto pb-4 pt-2 border-t border-gray-100 dark:border-white/5 mt-4">
                          <p className="text-xs text-gray-500 mb-4 italic">This shows the relative abstract payoffs for each combination of strategies.</p>
                          <table className="w-full text-sm">
                            <thead>
                              <tr>
                                <th></th>
                                <th colSpan={2} className="text-center pb-2 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider text-[10px]">Buyer</th>
                              </tr>
                              <tr>
                                <th></th>
                                <th className="px-2 pb-2 text-gray-500 font-medium text-xs">Accept</th>
                                <th className="px-2 pb-2 text-gray-500 font-medium text-xs">Walk Away</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="pr-4 pb-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px] text-right">Hold Price</td>
                                <td className="p-1">
                                  <div className="border border-gray-200 dark:border-white/10 rounded-lg p-2 text-center bg-gray-50 dark:bg-black/40">
                                    <span className="text-blue-500 font-bold">{payoffs.s1s1[0]}</span>, <span className="text-purple-500 font-bold">{payoffs.s1s1[1]}</span>
                                  </div>
                                </td>
                                <td className="p-1">
                                  <div className="border border-gray-200 dark:border-white/10 rounded-lg p-2 text-center bg-gray-50 dark:bg-black/40">
                                    <span className="text-blue-500 font-bold">{payoffs.s1s2[0]}</span>, <span className="text-purple-500 font-bold">{payoffs.s1s2[1]}</span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="pr-4 pb-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px] text-right">Counter</td>
                                <td className="p-1">
                                  <div className="border border-blue-500 dark:border-blue-400 rounded-lg p-2 text-center bg-blue-50 dark:bg-blue-500/10 shadow-sm">
                                    <span className="text-blue-500 font-bold">{payoffs.s2s1[0]}</span>, <span className="text-purple-500 font-bold">{payoffs.s2s1[1]}</span>
                                  </div>
                                </td>
                                <td className="p-1">
                                  <div className="border border-gray-200 dark:border-white/10 rounded-lg p-2 text-center bg-gray-50 dark:bg-black/40">
                                    <span className="text-blue-500 font-bold">{payoffs.s2s2[0]}</span>, <span className="text-purple-500 font-bold">{payoffs.s2s2[1]}</span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p className="text-xs text-gray-500 mt-4">
                            <strong>Maximin:</strong> {safestMove} avoids the worst-case scenario. <br/>
                            <strong>Nash Equilibrium:</strong> Highlighted cell indicates the stable outcome.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-[#141417] p-8 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 h-full flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-full mb-4">
                  <Check size={32} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 mb-2">Ready to Analyze</h3>
                <p className="text-sm text-gray-500 max-w-sm">Fill in your situation on the left to get your recommended tawad strategy.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
