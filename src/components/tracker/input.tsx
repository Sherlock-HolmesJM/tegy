import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as util from '../../utility';
import { Theme, Money } from '../../types';
import MoneyCl from '../../model';

interface Props {
  handleAdd: (money: Money) => void;
  type: 1 | 0;
  setType: (value: 1 | 0) => void;
}

function Input(props: Props) {
  const { handleAdd, type, setType } = props;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const theme = util.getTheme('white');
  const color = type ? theme.income : theme.expense;

  const handleInput = () => {
    if (description && amount) {
      const uid = Date.now();
      const date = new Date().toJSON();
      const t = type ? 'incomes' : 'expenses';
      const money = new MoneyCl(uid, description, amount, date, t);
      handleAdd(money);
      focusDesc();
    } else {
      console.log('Empty fields not allowed.');
    }
  };

  const handleChange = (value: 1 | 0) => {
    setType(value);
    focusDesc();
  };

  const focusDesc = () =>
    (document.querySelector('.input-description') as HTMLElement)?.focus();

  const getIconClass = () =>
    amount && description ? 'input-icon' : 'input-icon hide';

  return (
    <Div
      className='input'
      theme={theme}
      color={color}
      onKeyPress={(e) => (e.key === 'Enter' ? handleInput() : null)}
    >
      <select
        name='type'
        className='input-type input-border'
        id='type'
        onChange={(e) => handleChange(+e.target.value as 1 | 0)}
      >
        <option className='input-option input-plus' value='1'>
          +
        </option>
        <option className='input-option input-minus' value='0'>
          -
        </option>
      </select>
      <input
        type='text'
        className='input-description input-border'
        placeholder='Add description'
        onChange={(e) => setDescription(e.target.value.trim().toLowerCase())}
      />
      <input
        type='number'
        min='1'
        className='input-amount input-border'
        placeholder='Amount'
        onChange={(e) => setAmount(+e.target.value)}
      />
      <FontAwesomeIcon
        className={getIconClass()}
        icon={faCheckCircle}
        onClick={handleInput}
      />
    </Div>
  );
}

const Div = styled.div<{ theme: Theme; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  background: ${(props) => props.theme.transparentGray};
  border-bottom: groove ${(props) => props.theme.transparentGray} 1.5px;

  .input-amount,
  .input-description,
  .input-type {
    margin: 8px;
    padding: 5px 10px;
    border-radius: 5px;
    transition: 0.5s;
  }
  .input-type {
    font-size: large;
  }
  .input-plus {
    color: ${(props) => props.theme.income};
  }
  .input-minus {
    color: ${(props) => props.theme.expense};
  }
  .input-amount {
    width: 110px;
  }
  .input-description {
    width: 400px;
  }
  .input-icon {
    width: 40px;
    height: 40px;
    margin: 8px;
    color: ${(props) => props.color};
    transition: 0.5s;
  }
  .input-icon.hide {
    display: none;
  }
  .input-border {
    outline: none;
    border: 1px dotted ${(props) => props.color};
  }
  .input-border:focus {
    border: 1px solid ${(props) => props.color};
  }

  @media screen and (max-width: 487px) {
    flex-wrap: wrap;

    .input-description {
      flex: 1;
    }
  }

  @media screen and (max-width: 466px) {
    .input-icon {
      width: 30px;
      height: 30px;
      margin: 4px 2px;
    }
  }

  @media screen and (max-width: 401px) {
    padding: 5px;

    .input-amount,
    .input-description,
    .input-type {
      margin: 4px;
    }

    .input-amount {
      margin-top: 0;
    }
  }
`;

export default Input;
