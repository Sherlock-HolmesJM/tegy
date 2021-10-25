import { Budget } from '../types';
import * as types from './contextType';

export const addBudget_And_Category = (
  budget: Budget,
  category: string
): types.AddBudget_And_Category => ({
  type: types.AddBudget_Category,
  payload: {
    budget,
    category,
  },
});

export const addBudget = (budget: Budget): types.AddBudget => ({
  type: types.addBudget,
  payload: budget,
});

export const deleteBudget = (name: string): types.DeleteBudget => ({
  type: types.deleteBudget,
  payload: name,
});

export const udpateBudget = (budget: Budget): types.UpdateBudget => ({
  type: types.updateBudget,
  payload: budget,
});
