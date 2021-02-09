import React from 'react';
import styled from 'styled-components';
import * as util from '../../utility';
// import { Theme } from '../../types';

interface Props {}

const income = {
  description: 'feeding',
  amount: 10_000,
};
const expense = {
  description: 'feeding',
  amount: 2_000,
};

const incomes = [income, income];
const expenses = [expense, expense, expense, expense, expense, expense];

function Details(props: Props) {
  //   const {} = props;

  return (
    <Div className='tracker-details'>
      <div className='tracker-incomes'>
        <h3 className='tracker-title'>income</h3>
        <div className='tracker-list'>
          {incomes.map((income, index) => (
            <Item key={index} {...income} />
          ))}
        </div>
      </div>

      <div className='tracker-expenses'>
        <h3 className='tracker-title'>expenses</h3>
        <div className='tracker-list'>
          {expenses.map((expense, index) => (
            <Item key={index} {...expense} />
          ))}
        </div>
      </div>
    </Div>
  );
}

const Item = (props: { description: string; amount: number }) => {
  const { description, amount } = props;
  return (
    <ItemDiv className='item'>
      <div className='item-description'>{util.capitalize(description)}</div>
      <div className='item-amount'>{amount}</div>
      <div className='item-delete'>x</div>
      <div className='item-edit'>ed</div>
    </ItemDiv>
  );
};

const ItemDiv = styled.div``;

const Div = styled.div``;

export default Details;
