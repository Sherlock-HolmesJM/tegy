import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
import { context, actions } from '../../context';
import { iBudget } from '../../model';

interface Props {}

function Tracker(props: Props) {
  // const {} = props
  const [type, setType] = useState<1 | 0>(1);
  const [redirect, setRedirect] = useState<string>('');
  const { budgets, dispatch } = useContext(context);

  const slug = useParams<{ slug: string | undefined }>().slug?.replace(':', '');

  const budget = budgets.find((b) => b.name === slug) ?? iBudget;
  budget.expenses = budget.expenses ?? [];
  budget.incomes = budget.incomes ?? [];

  console.log(budget);
  console.log(budgets);
  console.log({ slug: slug });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const b = budgets.find((b) => b.name === slug);
      if (user && !b) {
        getBudget(slug).then((budget) =>
          budget ? dispatch(actions.addBudget(budget)) : null
        );
      } else if (!user) setRedirect('/');
    });
    //eslint-disable-next-line
  }, []);

  const handleAdd = (money: Money) => {
    const { type } = money;
    const result = budget[type].find((m) => m.uid === money.uid);
    if (!result) {
      const newBudget = util.clone<Budget>(budget);
      newBudget[type].push(money);
      dispatch(actions.udpateBudget(newBudget));
      saveBudget(newBudget);
    }
  };

  const handleDelete = (money: Money) => {
    const index = budget[money.type].indexOf(money);
    if (index !== -1) {
      const newBudget = util.clone<Budget>(budget);
      newBudget[money.type].splice(index, 1);
      dispatch(actions.udpateBudget(newBudget));
      saveBudget(newBudget);
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
