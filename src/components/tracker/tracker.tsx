import React, { useState } from 'react';
import styled from 'styled-components';
import Banner from './banner';
import Details from './details';
import Input from './input';
import { Budget, Money } from '../../types';
import * as util from '../../utility';

interface Props {}

function Tracker(props: Props) {
  // const {} = props

  const [budget, setBudget] = useState<Budget>({ incomes: [], expenses: [] });

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

  return (
    <TrackerDiv className='Tracker'>
      <Banner />
      <Input handleAdd={handleAdd} />
      <Details handleDelete={handleDelete} budget={budget} />
    </TrackerDiv>
  );
}

const TrackerDiv = styled.div`
  min-width: 350px;
`;

export default Tracker;
