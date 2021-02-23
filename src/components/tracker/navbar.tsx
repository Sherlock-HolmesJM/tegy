import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../../firebase';
import { XyzTransition } from '@animxyz/react';

interface Props {}

function Navbar(props: Props) {
  // const {} = props;

  const [show, setShow] = useState(false);

  return (
    <Nav className='navbar'>
      <XyzTransition xyz='fade up big'>
        {!show && (
          <FontAwesomeIcon
            icon={faBars}
            className='square'
            onClick={() => setShow(!show)}
          />
        )}
        {show && (
          <div className='navbar-container'>
            <FontAwesomeIcon
              icon={faBars}
              className='square'
              onClick={() => setShow(!show)}
            />
            <ul className='navbar-ul'>
              <li className='navbar-li'>Back</li>
              <li className='navbar-li' onClick={signOut}>
                Sign-out
              </li>
            </ul>
          </div>
        )}
      </XyzTransition>
    </Nav>
  );
}

const Nav = styled.nav`
  position: absolute;
  left: 30px;
  top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .navbar-container {
    display: flex;
    flex-direction: column;
  }

  .navbar-ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default Navbar;
