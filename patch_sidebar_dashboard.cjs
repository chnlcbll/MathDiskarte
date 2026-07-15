const fs = require('fs');

let sidebar = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace(
  "item.type === 'compare' ? 'RTB vs MP2' : 'Unknown'",
  "item.type === 'compare' ? 'RTB vs MP2' :\\n                        item.type === 'utang' ? 'Debt Analyzer' :\\n                        item.type === 'sarisari' ? 'Sari-Sari Margin' :\\n                        item.type === 'tingi' ? 'Tingi Checker' : 'Unknown'"
);
fs.writeFileSync('src/components/Sidebar.tsx', sidebar);

let dashboard = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
dashboard = dashboard.replace(
  "{item.type === 'tbond' ? 'T-bond' : 'MP2'}",
  "{item.type === 'tbond' ? 'T-bond' : item.type === 'mp2' ? 'MP2' : item.type === 'goalseek' ? 'Goal Seek' : item.type === 'fire' ? 'F.I.R.E' : item.type === 'compare' ? 'Compare' : item.type === 'utang' ? 'Debt' : item.type === 'sarisari' ? 'Sari-Sari' : item.type === 'tingi' ? 'Tingi' : 'Unknown'}"
);
fs.writeFileSync('src/components/Dashboard.tsx', dashboard);
