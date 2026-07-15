const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace("import { UtangCalc } from './components/UtangCalc';", "import { UtangCalc } from './components/UtangCalc';\nimport { SariSariCalc } from './components/SariSariCalc';\nimport { TingiCalc } from './components/TingiCalc';\nimport { SariSariInput, TingiInput } from './types';");

content = content.replace(
  "const [activeTab, setActiveTab] = useState<'tbond' | 'mp2' | 'goalseek' | 'compare' | 'fire' | 'utang'>('tbond');",
  "const [activeTab, setActiveTab] = useState<'tbond' | 'mp2' | 'goalseek' | 'compare' | 'fire' | 'utang' | 'sarisari' | 'tingi'>('tbond');"
);

content = content.replace(
  "const [utangInput, setUtangInput] = useState<UtangInput>({ mode: '5-6', loanAmount: 5000, returnAmount: 6000, daysToPay: 30, ccBalance: 50000, ccAnnualRate: 36, ccMinPaymentPercentage: 5 });",
  "const [utangInput, setUtangInput] = useState<UtangInput>({ mode: '5-6', loanAmount: 5000, returnAmount: 6000, daysToPay: 30, ccBalance: 50000, ccAnnualRate: 36, ccMinPaymentPercentage: 5 });\n  const [sariSariInput, setSariSariInput] = useState<SariSariInput>({ wholesaleCost: 100, itemsPerPack: 10, targetMargin: 20, transpoCost: 0, spoilageRate: 0 });\n  const [tingiInput, setTingiInput] = useState<TingiInput>({ itemAPrice: 10, itemAQuantity: 1, itemBPrice: 90, itemBQuantity: 10, unit: 'piece' });"
);

content = content.replace(
  "} else if (activeTab === 'utang') {",
  "} else if (activeTab === 'utang') {\n      title = `Debt Analyzer - ${new Date().toLocaleDateString()}`;\n    } else if (activeTab === 'sarisari') {\n      title = `Sari-Sari Margin - ${new Date().toLocaleDateString()}`;\n    } else if (activeTab === 'tingi') {\n      title = `Tingi Checker - ${new Date().toLocaleDateString()}`;\n    "
);

content = content.replace(
  "activeTab === 'utang' ? { utangInput } : {})",
  "activeTab === 'utang' ? { utangInput } : \n         activeTab === 'sarisari' ? { sarisariInput: sariSariInput } : \n         activeTab === 'tingi' ? { tingiInput } : {})"
);

fs.writeFileSync('src/App.tsx', content);
