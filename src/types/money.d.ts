export default interface Money {
  uid: number;
  description: string;
  amount: number;
  type: MoneyType;
  date: string;
}

export interface Budget {
  name: string;
  incomes: Money[];
  expenses: Money[];
}

export interface Budgets {
  [name: string]: Budget;
}

export const budget: Budget = { name: 'default', incomes: [], expenses: [] };

export type MoneyType = 'incomes' | 'expenses';
