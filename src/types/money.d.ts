export default interface Money {
  uid: number;
  description: string;
  amount: number;
  type: MoneyType;
  date: string;
}

export interface Budget {
  incomes: Money[];
  expenses: Money[];
}

export const budget = { incomes: [], expenses: [] };

export type MoneyType = 'incomes' | 'expenses';
