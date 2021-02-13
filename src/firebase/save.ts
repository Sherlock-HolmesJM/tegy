import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Budget } from '../types';

const getUid = () => firebase.auth().currentUser?.uid;

export const saveBudget = async (budget: Budget) => {
  const fs = firebase.firestore();
  const ref = fs.collection('budgety').doc(getUid());

  try {
    await ref.update({ budget: JSON.stringify(budget) });
    return true;
  } catch (e) {
    if (e.code === 'not-found')
      return ref
        .set({ budget: JSON.stringify(budget) })
        .then((r) => true)
        .catch((e) => false);
  }
};

export const getBudget = async () => {
  const fs = firebase.firestore();
  const doc = await fs.collection('budgety').doc(getUid()).get();
  const budget = doc.data()?.budget ?? null;
  return JSON.parse(budget) as Budget | undefined;
};
