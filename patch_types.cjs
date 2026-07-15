const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

const newTypes = `
export interface SariSariInput {
  wholesaleCost: number;
  itemsPerPack: number;
  targetMargin: number;
  transpoCost: number;
  spoilageRate: number;
}

export interface TingiInput {
  itemAPrice: number;
  itemAQuantity: number;
  itemBPrice: number;
  itemBQuantity: number;
  unit: string;
}
`;

content = content.replace("export interface SavedCalculation {", newTypes + "\nexport interface SavedCalculation {");
content = content.replace("type: 'tbond' | 'mp2' | 'goalseek' | 'fire' | 'compare' | 'utang';", "type: 'tbond' | 'mp2' | 'goalseek' | 'fire' | 'compare' | 'utang' | 'sarisari' | 'tingi';");

content = content.replace("utangInput?: UtangInput;", "utangInput?: UtangInput;\n  sarisariInput?: SariSariInput;\n  tingiInput?: TingiInput;");

fs.writeFileSync('src/types.ts', content);
