import { Money, MoneyType } from '../types';

export default class MoneyCl implements Money {
  constructor(
    public uid: string,
    public description: string,
    public amount: number,
    public date: string,
    public type: MoneyType
  ) {}
}
