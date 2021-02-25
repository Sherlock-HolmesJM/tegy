import { Budget, Money, MoneyType } from '../types';

export default class MoneyCl implements Money {
  uid: number;
  date: string;

  constructor(
    public description: string,
    public amount: number,
    public type: MoneyType
  ) {
    this.uid = Date.now();
    this.date = new Date().toJSON();
  }
}

// const money = new MoneyCl(0, '', 0, '', 'expenses');

export class BudgetCl implements Budget {
  incomes: Money[];
  expenses: Money[];

  constructor(public name: string) {
    this.incomes = [];
    this.expenses = [];
  }
}

export const iBudget: Budget = new BudgetCl('default');
