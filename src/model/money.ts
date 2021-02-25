import { Budget, Money, MoneyType } from '../types';

export default class MoneyCl implements Money {
  constructor(
    public uid: number,
    public description: string,
    public amount: number,
    public date: string,
    public type: MoneyType
  ) {}
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
