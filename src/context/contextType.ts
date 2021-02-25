import { Budgets, Budget } from '../types';

export const addBudget = 'UPDATE_BUDGET';
export const deleteBudget = 'DELETE_BUDGET';
export const updateBudgets = 'UPDATE_BUDGETS';

export interface AddBudget {
  type: typeof addBudget;
  payload: Budget;
}

export interface DeleteBudget {
  type: typeof deleteBudget;
  payload: string;
}

export interface UpdateBudgets {
  type: typeof updateBudgets;
  payload: Budget[];
}

export type Actions = AddBudget | DeleteBudget | UpdateBudgets;
