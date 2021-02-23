import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';
import Banner from './banner';
import Details from './details';
import Input from './input';
import { Budget, Money } from '../../types';
import * as util from '../../utility';
import { getBudget, saveBudget } from '../../firebase';
import { Redirect } from 'react-router-dom';

interface Props {}

function Tracker(props: Props) {
  // const {} = props

  const [budget, setBudget] = useState<Budget>({ incomes: [], expenses: [] });
  const [type, setType] = useState<1 | 0>(1);
  const [redirect, setRedirect] = useState<'/' | ''>('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user)
        getBudget().then((budget) => (budget ? setBudget(budget) : null));
      else setRedirect('/');
    });
  }, []);

  const handleAdd = (money: Money) => {
    const { type } = money;
    const result = budget[type].find((m) => m.uid === money.uid);
    if (!result) {
      const newBudget = util.clone<Budget>(budget);
      newBudget[type].push(money);
      setBudget(newBudget);
      saveBudget(newBudget).then((status) =>
        status ? console.log('successful') : console.log('Failed. Try again.')
      );
    }
  };

  const handleDelete = (money: Money) => {
    const index = budget[money.type].indexOf(money);
    if (index !== -1) {
      const newBudget = util.clone<Budget>(budget);
      newBudget[money.type].splice(index, 1);
      setBudget(newBudget);
      saveBudget(newBudget).then((status) =>
        status ? console.log('successful') : console.log('Failed. Try again.')
      );
    }
  };

  const totalIncome = budget.incomes.reduce((acc, inc) => acc + inc.amount, 0);
  const totalExpense = budget.expenses.reduce((acc, ex) => acc + ex.amount, 0);
  const balance = totalIncome - totalExpense;

  if (redirect) return <Redirect to={redirect} />;

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
