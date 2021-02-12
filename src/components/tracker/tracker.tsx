import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import styled from 'styled-components';
import Banner from './banner';
import Details from './details';
import Input from './input';
import { Budget, Money } from '../../types';
import * as types from '../../types';
import * as util from '../../utility';

interface Props {}

function Tracker(props: Props) {
  // const {} = props

  const [budget, setBudget] = useState<Budget>(types.budget);
  const [type, setType] = useState<1 | 0>(1);

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const fs = firebase.firestore();
      const doc = await fs.collection('budgety').doc(user.uid).get();
      const budget = doc.data()?.budget;
      if (budget) setBudget(JSON.parse(budget) as Budget);
    }
  });

  const handleAdd = (money: Money) => {
    const result = budget[money.type].find((m) => m.uid === money.uid);
    if (!result) {
      const newBudget = util.clone<Budget>(budget);
      newBudget[money.type].push(money);
      setBudget(newBudget);
    }
  };

  const handleDelete = (money: Money) => {
    const index = budget[money.type].indexOf(money);
    if (index !== -1) {
      const newBudget = util.clone<Budget>(budget);
      newBudget[money.type].splice(index, 1);
      setBudget(newBudget);
    }
  };

  const totalIncome = budget.incomes.reduce((acc, inc) => acc + inc.amount, 0);
  const totalExpense = budget.expenses.reduce((acc, ex) => acc + ex.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <TrackerDiv className='Tracker'>
      <Banner income={totalIncome} expense={totalExpense} balance={balance} />
      <Input handleAdd={handleAdd} type={type} setType={setType} />
      <Details handleDelete={handleDelete} budget={budget} type={type} />
    </TrackerDiv>
  );
}

const TrackerDiv = styled.div`
  min-width: 350px;
`;

export default Tracker;
