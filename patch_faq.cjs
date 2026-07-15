const fs = require('fs');
let content = fs.readFileSync('src/components/FAQList.tsx', 'utf8');

const newFaqs = `
  { question: "What is the Sari-Sari Margin Calculator?", answer: "It is a tool inside IponTubo to help small business owners and sari-sari stores compute the exact selling price needed to hit a target profit margin, considering wholesale costs, transportation, and expected spoilage." },
  { question: "How does the 'Sulit' Grocery Checker work?", answer: "Also known as the Tingi vs. Bulk checker, this calculator finds the true price-per-unit (e.g., per gram or per piece) to compare two items so you know exactly which product gives the best value for your money." },
`;

content = content.replace(
  "{ question: \"What is the Debt Analyzer (Utang Calculator)?\",",
  newFaqs.trim() + "\n  { question: \"What is the Debt Analyzer (Utang Calculator)?\","
);

fs.writeFileSync('src/components/FAQList.tsx', content);
