const fs = require('fs');

let content = fs.readFileSync('src/types.ts', 'utf8');
content = content.replace(
  "export interface TingiInput {\\n  itemAPrice: number;\\n  itemAQuantity: number;\\n  itemBPrice: number;\\n  itemBQuantity: number;\\n  unit: string;\\n}",
  "export interface TingiInput {\\n  itemAName?: string;\\n  itemAPrice: number;\\n  itemAQuantity: number;\\n  itemBName?: string;\\n  itemBPrice: number;\\n  itemBQuantity: number;\\n  unit: string;\\n}"
);
fs.writeFileSync('src/types.ts', content);
