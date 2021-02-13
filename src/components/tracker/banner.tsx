import React from 'react';
import styled from 'styled-components';
import { back } from '../../media';
import * as util from '../../utility';
import { Theme } from '../../types';

interface Props {
  income: number;
  expense: number;
  balance: number;
}

function Banner(props: Props) {
  const { income, expense, balance } = props;
  const date = new Date();
  const month = date.toDateString().split(' ')[1];

  const expensePerc = util.calcPercent(expense, income);
  const theme = util.getTheme('white');

  return (
    <Div className='banner' theme={theme}>
      <img src={back} alt='banner' className='banner-image' />
      <div className='banner-overlay'></div>

      <div className='banner-text'>
        Available budget in {month} {date.getFullYear()}:
      </div>

      <div className='display-4 banner-balance'>
        {balance > 0 ? '+' : balance < 0 ? '' : '-'}{' '}
        {util.formatAmount(balance)}
      </div>

      <div className='banner-summaries'>
        <div className='banner-summary btn-sm banner-green'>
          <div className='banner-title'>income</div>
          <div className='mr-5'>+ {util.formatAmount(income)}</div>
        </div>

        <div className='banner-summary btn-sm btn-danger'>
          <div className='banner-title'>expense</div>
          <div className='banner-expenseContainer'>
            <div className='mr-3'>- {util.formatAmount(expense)}</div>
            <span className='banner-badge badge'>
              {expensePerc ? expensePerc + '%' : '---'}
            </span>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div<{ theme: Theme }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 240px;
  cursor: context-menu;
  color: white;

  .banner-overlay {
    position: absolute;
    top: 0;
    background: rgb(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    z-index: -100;
  }
  .banner-image {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -111;
  }
  .banner-text {
    font-size: 20px;
  }
  .banner-balance {
    margin: 9px;
  }
  .banner-summaries {
    width: min(350px, 80%);
  }
  .banner-summary {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px auto;
    padding: 8px 10px;
    text-transform: uppercase;
    transition: 0.5s;
  }
  .banner-title {
    font-size: 16px;
    color: black;
  }
  .banner-expenseContainer {
    display: flex;
    align-items: center;
  }
  .banner-badge {
    font-weight: 400;
    min-width: 40px;
    padding: 5px;
    background: rgb(255, 255, 255, 0.3);
  }
  .banner-green {
    background: ${(props) => props.theme.income};
    color: white;
  }
  .banner-green:hover {
    background: ${(props) => props.theme.incomeOverlay};
  }
`;

export default Banner;
