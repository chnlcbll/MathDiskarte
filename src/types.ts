export type PayoutType = 'annual' | 'compounded';

export interface BaseInput {
  principal: number;
  rate: number;
  inflationEnabled?: boolean;
  inflationRate?: number;
}

export interface TBondInput extends BaseInput {
  taxRate: number;
  bankFee: number;
  bankFeeFrequency: number; // e.g., 4 for quarterly
  tenor: 5 | 10;
}

export interface MP2Input extends BaseInput {
  payoutType: PayoutType;
  monthlyContribution: number;
  mode: 'one-time' | 'monthly';
  tenor: 5 | 10;
}

export interface GoalSeekInput {
  targetAmount: number;
  years: number;
  instrument: 'mp2' | 'tbond' | 'custom';
  annualRate: number;
}

export interface FIREInput {
  monthlyExpenses: number;
  instrument: 'mp2' | 'tbond' | 'custom';
  annualRate: number;
}

export interface CompareInput {
  lumpSum: number;
  years: number;
  mp2Rate: number;
  rtbGrossRate: number;
}

export interface UtangInput {
  mode: '5-6' | 'cc-min';
  // 5-6
  loanAmount: number;
  returnAmount: number;
  daysToPay: number;
  // CC
  ccBalance: number;
  ccAnnualRate: number;
  ccMinPaymentPercentage: number;
}


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

export interface SavedCalculation {
  id: string;
  name: string;
  type: 'tbond' | 'mp2' | 'goalseek' | 'fire' | 'compare' | 'utang' | 'sarisari' | 'tingi';
  tbondInput?: TBondInput;
  mp2Input?: MP2Input;
  goalSeekInput?: GoalSeekInput;
  fireInput?: FIREInput;
  compareInput?: CompareInput;
  utangInput?: UtangInput;
  sarisariInput?: SariSariInput;
  tingiInput?: TingiInput;
  createdAt: string;
}

export interface AppState {
  saved: SavedCalculation[];
  darkMode: boolean;
  introSeen: boolean;
}
