import { Budgets, Budget } from '../types';

export const addBudget = 'ADD_BUDGET';
export const deleteBudget = 'DELETE_BUDGET';
export const updateBudget = 'UPDATE_BUDGET';
export const AddBudget_Category = 'ADD_BUDGET_CATEGORY';

export interface AddBudget {
  type: typeof addBudget;
  payload: Budget;
}

export interface AddBudget_And_Category {
  type: typeof AddBudget_Category;
  payload: { budget: Budget; category: string };
}

export interface DeleteBudget {
  type: typeof deleteBudget;
  payload: string;
}

export interface UpdateBudget {
  type: typeof updateBudget;
  payload: Budget;
}

export type Actions =
  | AddBudget
  | DeleteBudget
  | UpdateBudget
  | AddBudget_And_Category;
