import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as util from '../../utility';
import { Theme } from '../../types';

interface Props {}

function Input(props: Props) {
  //   const {} = props;

  const [type, setType] = useState(1);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const theme = util.getTheme('white');
  const color = type ? theme.income : theme.expense;

  const handleInput = () => {
    console.log('Handling input');
    console.log({ type, description, amount });
  };

  return (
    <Div className='input' theme={theme} color={color}>
      <select
        name='type'
        className='input-type input-border'
        id='type'
        onChange={(e) => setType(+e.target.value)}
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
        onChange={(e) =>
          setDescription(e.target.value.trim().toLocaleLowerCase())
        }
      />
      <input
        type='number'
        min='1'
        className='input-amount input-border'
        placeholder='Amount'
        onChange={(e) => setAmount(+e.target.value)}
      />
      <FontAwesomeIcon
        className='input-icon'
        icon={faCheckCircle}
        onClick={handleInput}
      />
    </Div>
  );
}

const Div = styled.div<{ theme: Theme; color: string }>`
  display: flex;
  justify-content: center;
  height: 60px;
  background: ${(props) => props.theme.transparentGray};
  border-bottom: groove ${(props) => props.theme.transparentGray} 1.5px;

  .input-amount,
  .input-description,
  .input-type {
    margin: 10px;
    padding: 10px;
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
  }
  .input-border {
    outline: none;
    border: 1px dotted ${(props) => props.color};
  }
  .input-border:focus {
    border: 1px solid ${(props) => props.color};
  }
`;

export default Input;
