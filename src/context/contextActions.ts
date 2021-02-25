import { Budget } from '../types';
import * as types from './contextType';

export const addBudget = (budget: Budget): types.AddBudget => ({
  type: types.addBudget,
  payload: budget,
});

export const deleteBudget = (name: string): types.DeleteBudget => ({
  type: types.deleteBudget,
  payload: name,
});

export const udpateBudgets = (budgets: Budget[]): types.UpdateBudgets => ({
  type: types.updateBudgets,
  payload: budgets,
});
