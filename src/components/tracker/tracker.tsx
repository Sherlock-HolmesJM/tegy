import React from 'react';
import styled from 'styled-components';
import Banner from './banner';
import Details from './details';
import Input from './input';

interface Props {}

function Tracker(props: Props) {
  // const {} = props

  return (
    <TrackerDiv className='Tracker'>
      <Banner />
      <Input />
      <Details />
    </TrackerDiv>
  );
}

const TrackerDiv = styled.div``;

export default Tracker;
