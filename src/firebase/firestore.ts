import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { Budget } from '../types';

// ======= Getters =======

const db = () => firebase.database();
const getuid = () => firebase.auth().currentUser?.uid;

export const getBudget = async (name?: string) => {
  return db()
    .ref('budgety/' + getuid() + '/budgets/' + name)
    .get()
    .then((sp) => sp.val() as Budget | undefined)
    .catch((e) => {
      console.log(e);
      return undefined;
    });
};

export const getBudgetOld = async () => {
  const fs = firebase.firestore();
  const doc = await fs.collection('budgety').doc(getuid()).get();
  const budget = doc.data()?.['budget'] ?? null;
  return JSON.parse(budget) as Budget | undefined;
};

export const getCategories = () => {
  return db()
    .ref('budgety/' + getuid() + '/categories')
    .get()
    .then((res) => res.val() as string[] | undefined)
    .catch((e) => undefined);
};

// ======= Savers =======

export const saveCategories = (categories: string[]) => {
  db()
    .ref('budgety/' + getuid() + '/categories')
    .set(categories);
};

export const saveBudget = async (budget: Budget) => {
  db()
    .ref('budgety/' + getuid() + '/budgets/' + budget.name)
    .set(budget);
};

// ======= Deleters =======

export const deleteBudget = (budgetName: string) => {
  db()
    .ref('budgety/' + getuid() + '/budgets/' + budgetName)
    .remove();
};

export const deleteDoc = () =>
  firebase.firestore().collection('budgety').doc(getuid()).delete();
