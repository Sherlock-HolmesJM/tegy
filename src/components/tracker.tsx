import React from 'react';
import styled from 'styled-components';
import { back } from '../media';
import * as util from '../utility';
import { Theme } from '../types';

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

function Tracker(props: Props) {
  // const {} = props
  const theme = util.theme('white');

  return (
    <TrackerDiv className='Tracker' theme={theme}>
      {/* Tracker summary begins */}
      <div className='tracker-banner'>
        <img src={back} alt='banner' className='tracker-bannerImage' />
        <div className='tracker-bannerOverlay'></div>

        <div className='tracker-bannerText'>
          Available budget in {new Date().getFullYear()}:
        </div>

        <div className='tracker-totalAmount display-3'>+ 0.00</div>

        <div>
          <div className='tracker-summary btn-lg tracker-green'>
            <div>income</div>
            <div className='mr-5'>+ 0.00</div>
          </div>

          <div className='tracker-summary btn-lg btn-danger'>
            <div className=''>expenses</div>
            <div className='tracker-summary-expensesContainer'>
              <div className='mr-3'>- 0.00</div>
              <span className='tracker-badge'>---</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tracker summary ends */}

      {/* Tracker input container begins */}
      <div className='tracker-input-container'>
        <select name='type' className='tracker-type' id='type'>
          <option className='tracker-option' value='1'>
            +
          </option>
          <option value='0'>-</option>
        </select>
        <input
          type='text'
          className='tracker-inputDescription'
          placeholder='Add description'
        />
        <input
          type='number'
          min='0'
          className='tracker-inputAmount'
          placeholder='Amount'
        />
        {/* Submit Icon */}
      </div>
      {/* Tracker input container ends */}

      {/* Tracker details begins */}
      <div className='tracker-details'>
        <div className='tracker-incomes'>
          <h3 className='tracker-title'>income</h3>
          <div className='tracker-list'>
            {incomes.map((income, index) => (
              <ItemComponent key={index} {...income} />
            ))}
          </div>
        </div>

        <div className='tracker-expenses'>
          <h3 className='tracker-title'>expenses</h3>
          <div className='tracker-list'>
            {expenses.map((expense, index) => (
              <ItemComponent key={index} {...expense} />
            ))}
          </div>
        </div>
      </div>
      {/* Tracker details ends */}
    </TrackerDiv>
  );
}

const ItemComponent = (props: { description: string; amount: number }) => {
  const { description, amount } = props;
  return (
    <Item className='item'>
      <div className='item-description'>{util.capitalize(description)}</div>
      <div className='item-amount'>{amount}</div>
      <div className='item-delete'>x</div>
      <div className='item-edit'>ed</div>
    </Item>
  );
};

const Item = styled.div``;

const TrackerDiv = styled.div<{ theme: Theme }>`
  .tracker-input-container {
    display: flex;
    justify-content: center;
    height: 60px;
    background: rgb(0, 0, 0, 0.1);
    border-bottom: groove rgb(0, 0, 0, 0.1) 1.5px;
  }
  .tracker-inputAmount,
  .tracker-inputDescription,
  .tracker-type {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    transition: 0.5s;
  }
  .tracker-inputAmount {
    width: 120px;
  }
  .tracker-inputDescription {
    width: 320px;
  }
  .tracker-option {
    color: blue;
  }

  .tracker-banner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 270px;
    cursor: context-menu;
  }
  .tracker-bannerOverlay {
    position: absolute;
    top: 0;
    background: rgb(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    z-index: -100;
  }
  .tracker-bannerImage {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -111;
  }
  .tracker-bannerText {
    font-size: 20px;
  }

  .tracker-summary {
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin: 10px auto;
    padding: auto 15px;
    text-transform: uppercase;
    transition: 0.5s;
  }
  .tracker-summary-expensesContainer {
    display: flex;
  }
  .tracker-badge {
    background: rgb(255, 255, 255, 0.3);
    font-size: 10px;
    padding: 7px;
  }
  .tracker-green {
    background: ${(props) => props.theme.income};
    color: white;
  }
  .tracker-green:hover {
    background: ${(props) => props.theme.incomeOverlay};
  }
  .tracker-red {
    background: red;
  }
`;

export default Tracker;
