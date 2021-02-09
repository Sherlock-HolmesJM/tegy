import React from 'react';
import styled from 'styled-components';
import { back } from '../../media';
import * as util from '../../utility';
import { Theme } from '../../types';

interface Props {}

function Banner(props: Props) {
  //   const {} = props;

  const theme = util.theme('white');

  return (
    <Div className='banner' theme={theme}>
      <img src={back} alt='banner' className='banner-image' />
      <div className='banner-overlay'></div>

      <div className='banner-text'>
        Available budget in {new Date().getFullYear()}:
      </div>

      <div className='display-3'>+ 0.00</div>

      <div>
        <div className='banner-summary btn-lg banner-green'>
          <div>income</div>
          <div className='mr-5'>+ 0.00</div>
        </div>

        <div className='banner-summary btn-lg btn-danger'>
          <div className=''>expenses</div>
          <div className='banner-expenseContainer'>
            <div className='mr-3'>- 0.00</div>
            <span className='banner-badge'>---</span>
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
  height: 270px;
  cursor: context-menu;

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
  .banner-summary {
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin: 10px auto;
    padding: auto 15px;
    text-transform: uppercase;
    transition: 0.5s;
  }
  .banner-expenseContainer {
    display: flex;
  }
  .banner-badge {
    background: rgb(255, 255, 255, 0.3);
    font-size: 10px;
    padding: 7px;
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
