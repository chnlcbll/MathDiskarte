const fs = require('fs');

let content = fs.readFileSync('src/components/TawadTactics.tsx', 'utf8');

// We will add the new tab state to TawadTactics component.
content = content.replace(
  "const [showGameTheoryView, setShowGameTheoryView] = useState(false);",
  "const [showGameTheoryView, setShowGameTheoryView] = useState(false);\n  const [activeSubTool, setActiveSubTool] = useState<'analyzer' | 'freelance_rate'>('analyzer');\n\n  // Freelance Calc States\n  const [flExpenses, setFlExpenses] = useState<number | ''>(20000);\n  const [flInternet, setFlInternet] = useState<number | ''>(1500);\n  const [flHardware, setFlHardware] = useState<number | ''>(2000);\n  const [flTax, setFlTax] = useState<number | ''>(8);\n  const [flHoursPerWeek, setFlHoursPerWeek] = useState<number | ''>(40);\n"
);

// We add 'salary_offer' to the ScenarioPreset type
content = content.replace(
  "type ScenarioPreset = 'fb_marketplace' | 'freelance' | 'promo' | 'ukay' | 'sarisari' | 'palengke';",
  "type ScenarioPreset = 'fb_marketplace' | 'freelance' | 'promo' | 'ukay' | 'sarisari' | 'palengke' | 'salary_offer';"
);

// Add it to the presets array
content = content.replace(
  "{ id: 'promo', label: 'Offer a Promo', desc: 'Online Shop', icon: Tag },",
  "{ id: 'promo', label: 'Offer a Promo', desc: 'Online Shop', icon: Tag },\n    { id: 'salary_offer', label: 'Salary / Raise', desc: 'Job Negotiation', icon: Users },"
);

// Handle the scenario change for 'salary_offer'
content = content.replace(
  "} else if (s === 'palengke') {",
  "} else if (s === 'salary_offer') {\n      setItemPrice(50000); setLowestAcceptablePrice(45000); setBuyerOffer(40000);\n      setUrgency('Medium'); setWalkAwayRisk('High');\n    } else if (s === 'palengke') {"
);

// Add the option in the select tag
content = content.replace(
  '<option value="palengke">Palengke Tawad</option>',
  '<option value="palengke">Palengke Tawad</option>\n                <option value="salary_offer">Salary / Raise Negotiation</option>'
);


fs.writeFileSync('src/components/TawadTactics.tsx', content);
