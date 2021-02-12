import React from 'react';
import styled from 'styled-components';
import * as util from '../../utility';
import { Theme } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Budget, Money } from '../../types';

interface Props {
  budget: Budget;
  handleDelete: (money: Money) => void;
}

function Details(props: Props) {
  const { incomes, expenses } = props.budget;
  const { handleDelete } = props;

  return (
    <Div className='details' theme={util.getTheme('white')}>
      {incomes.length > 0 && (
        <div className='details-incomes details-container'>
          <h4 className='details-title details-income-title'>incomes</h4>
          <div className='details-list'>
            {incomes.map((income, index) => (
              <Item key={index} money={income} handleDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}

      {expenses.length > 0 && (
        <div className='details-expenses details-container'>
          <h4 className='details-title details-expense-title'>expenses</h4>
          <div className='details-list'>
            {expenses.map((expense, index) => (
              <Item key={index} money={expense} handleDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </Div>
  );
}

const Item = (props: { money: Money; handleDelete: (m: Money) => void }) => {
  const { money, handleDelete } = props;
  const { type, description, amount } = money;

  const theme = util.getTheme('white');
  const color = type === 'incomes' ? theme.income : theme.expense;

  return (
    <ItemDiv className='item' theme={theme} color={color}>
      <div className='item-container-1'>
        <div className='item-description'>{util.capitalize(description)}</div>
      </div>
      <div className='item-container-2'>
        <div className='item-amount'>
          {`${type ? '+' : '-'} ${util.formatAmount(amount)}`}
        </div>
        {!type && <span className='item-badge badge'>---</span>}
        <FontAwesomeIcon
          className='item-delete'
          icon={faTimesCircle}
          onClick={() => handleDelete(money)}
        />
      </div>
    </ItemDiv>
  );
};

const ItemDiv = styled.div<{ theme: Theme; color: string }>`
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  border-top: 1px groove ${(props) => props.theme.transparentGray};

  :last-child {
    border-bottom: 1px groove ${(props) => props.theme.transparentGray};
  }

  .item-container-1 {
    padding: 5px;
  }
  .item-container-2 {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    color: ${(props) => props.color};
  }
  .item-container-2 > * {
    margin-right: 7px;
  }
  .item-container-2:hover .item-delete {
    display: block;
  }
  .item-badge {
    background: rgb(248, 214, 214);
  }
  .item-delete {
    display: none;
    width: 20px;
    height: 20px;
  }

  @media screen and (max-width: 887px) {
    .item-container-1 {
      margin-left: 20px;
      padding-left: 0px;
    }
    .item-container-2 {
      margin-right: 20px;
      padding-right: 0px;
    }
  }
`;

const Div = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  padding-top: 15px;

  .details-container {
    flex-basis: 40%;
  }
  .details-title {
    text-transform: uppercase;
    font-weight: 400;
    padding: 10px 20px;
    text-align: left;
  }
  .details-income-title {
    color: ${(props) => props.theme.income};
  }
  .details-expense-title {
    color: ${(props) => props.theme.expense};
  }

  @media screen and (max-width: 675px) {
    flex-direction: column;

    .details-title {
      margin-left: 20px;
      padding-left: 0px;
    }
  }
`;

export default Details;
