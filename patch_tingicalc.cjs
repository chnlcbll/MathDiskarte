const fs = require('fs');
let content = fs.readFileSync('src/components/TingiCalc.tsx', 'utf8');

content = content.replace(
  "let winner = 0; // 0 for tie, 1 for A, 2 for B",
  "let winner = 0; // 0 for tie, 1 for A, 2 for B\\n\\n  const nameA = input.itemAName ? `${input.itemAName} (Item A)` : 'Item A';\\n  const nameB = input.itemBName ? `${input.itemBName} (Item B)` : 'Item B';"
);

content = content.replace(
  "verdict = `Item A is ${difference.toFixed(1)}% cheaper per ${input.unit}`;",
  "verdict = `${nameA} is ${difference.toFixed(1)}% cheaper per ${input.unit}`;"
);

content = content.replace(
  "verdict = `Item B is ${difference.toFixed(1)}% cheaper per ${input.unit}`;",
  "verdict = `${nameB} is ${difference.toFixed(1)}% cheaper per ${input.unit}`;"
);

content = content.replace(
  "Buying {winner === 1 ? \"Item A\" : \"Item B\"} gives you more value",
  "Buying {winner === 1 ? nameA : nameB} gives you more value"
);

// Add the input fields for names
const nameInputA = `
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Name (Optional)</label>
              <input type="text" placeholder="e.g. Sachet" value={input.itemAName || ''} onChange={e => { updateInput('itemAName', e.target.value); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
            </div>
            <div className="grid grid-cols-2 gap-4">
`;

const nameInputB = `
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Name (Optional)</label>
              <input type="text" placeholder="e.g. Bulk Bottle" value={input.itemBName || ''} onChange={e => { updateInput('itemBName', e.target.value); playSound('keypress'); }} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 px-4 py-2 text-sm font-bold text-gray-900 dark:text-white rounded-xl outline-none focus:border-teal-500 transition" />
            </div>
            <div className="grid grid-cols-2 gap-4">
`;

content = content.replace(
  '<div className="absolute -top-3 left-4 bg-white dark:bg-[#141417] px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Item A (e.g. Sachet)</div>\\n            <div className="grid grid-cols-2 gap-4">',
  '<div className="absolute -top-3 left-4 bg-white dark:bg-[#141417] px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Item A (e.g. Sachet)</div>' + nameInputA
);

content = content.replace(
  '<div className="absolute -top-3 left-4 bg-white dark:bg-[#141417] px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Item B (e.g. Bulk)</div>\\n            <div className="grid grid-cols-2 gap-4">',
  '<div className="absolute -top-3 left-4 bg-white dark:bg-[#141417] px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Item B (e.g. Bulk)</div>' + nameInputB
);

// Update output labels
content = content.replace(
  '<div className="text-xs uppercase tracking-widest mb-1 font-bold text-teal-100">Item A</div>',
  '<div className="text-xs uppercase tracking-widest mb-1 font-bold text-teal-100">{nameA}</div>'
);
content = content.replace(
  '<div className="text-xs uppercase tracking-widest mb-1 font-bold text-teal-100">Item B</div>',
  '<div className="text-xs uppercase tracking-widest mb-1 font-bold text-teal-100">{nameB}</div>'
);

fs.writeFileSync('src/components/TingiCalc.tsx', content);
