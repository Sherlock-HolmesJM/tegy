import React from 'react';
import styled from 'styled-components';
// import * as util from '../../utility';
// import { Theme } from '../../types';

interface Props {}

function Input(props: Props) {
  //   const {} = props;

  return (
    <Div className='input'>
      <select name='type' className='input-type' id='type'>
        <option className='input-option input-plus' value='1'>
          +
        </option>
        <option className='input-option input-minus' value='0'>
          -
        </option>
      </select>
      <input
        type='text'
        className='input-description'
        placeholder='Add description'
      />
      <input
        type='number'
        min='0'
        className='input-amount'
        placeholder='Amount'
      />
      {/* Submit Icon */}
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  background: rgb(0, 0, 0, 0.1);
  border-bottom: groove rgb(0, 0, 0, 0.1) 1.5px;

  .input-amount,
  .input-description,
  .input-type {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    transition: 0.5s;
  }
  .input-amount {
    width: 120px;
  }
  .input-description {
    width: 320px;
  }
  .input-option {
    color: blue;
  }
`;

export default Input;
