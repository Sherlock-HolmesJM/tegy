import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../../firebase';
import { XyzTransition } from '@animxyz/react';

interface Props {
  cate?: boolean;
}

function Navbar(props: Props) {
  const { cate } = props;

  const [show, setShow] = useState(false);

  return (
    <Nav className='navbar'>
      <XyzTransition xyz='fade up big'>
        {!show && (
          <FontAwesomeIcon
            icon={faBars}
            className='navbar-menu'
            onClick={() => setShow(!show)}
          />
        )}
        {show && (
          <div className='navbar-container'>
            <div className='navbar-closeIcon-container'>
              <div>Menu</div>
              <FontAwesomeIcon
                icon={faTimes}
                className='navbar-closeMenu'
                onClick={() => setShow(!show)}
              />
            </div>
            <ul className='navbar-ul'>
              {!cate && (
                <React.Fragment>
                  <li className='navbar-li'>
                    <Link to='/category' className='navbar-li link'>
                      <FontAwesomeIcon
                        icon={faFileImport}
                        className='navbar-icon'
                      />
                      <div>Upgrade</div>
                    </Link>
                  </li>
                  <li className='navbar-li'>
                    <Link to='/category' className='navbar-li link'>
                      <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className='navbar-icon'
                      />
                      <div>Back</div>
                    </Link>
                  </li>
                </React.Fragment>
              )}
              <li className='navbar-li' onClick={signOut}>
                <FontAwesomeIcon icon={faSignOutAlt} className='navbar-icon' />
                <div>Sign-out</div>
              </li>
            </ul>
          </div>
        )}
      </XyzTransition>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  left: 30px;
  top: 30px;

  .navbar-menu {
    width: 40px;
    height: 40px;
    margin-bottom: 3px;
  }

  .navbar-container {
    position: fixed;
    top: 1px;
    left: 0;
    display: flex;
    flex-direction: column;
    background: gray;
    width: 150px;
    height: 100%;
    padding: 5px 5px 5px 10px;
  }

  .navbar-closeIcon-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: 800;
    border-bottom: 2px groove white;
  }

  .navbar-closeMenu {
    width: 30px;
    height: 30px;
  }

  .navbar-ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
  }

  .navbar-li {
    display: flex;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;
  }
  .link {
    text-decoration: none;
    color: white;
  }
  .link:hover {
    color: white;
  }
  .navbar-icon {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  @media screen and (max-width: 594px) {
    left: 5px;
    top: 3px;

    .navbar-menu {
      width: 30px;
      height: 30px;
    }
  }

  @media screen and (max-width: 424px) {
    left: -8px;
  }
`;

export default Navbar;
