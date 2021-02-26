import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as fb from '../firebase';
import { getTheme, capitalize } from '../utility';
import { Theme } from '../types';
import { back } from '../media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { NavBar } from './tracker';
import { context, actions } from '../context';
import { BudgetCl } from '../model';

interface Props {}

function Category(props: Props) {
  // const {} = props
  const [redirect, setRedirect] = useState<'/' | ''>('');
  const [name, setName] = useState('');

  const { categories, dispatch } = useContext(context);

  firebase.auth().onAuthStateChanged((user) => (user ? '' : setRedirect('/')));

  const addCate = () => {
    const newName = name.trim().toLowerCase();

    if (newName === '') return;
    if (newName.split(' ').length > 1) return alert('Name must be one word.');

    const oldCate = categories.find((c) => c === newName);

    if (oldCate) {
      alert(`${newName} already exist.`);
    } else {
      const newBudget = new BudgetCl(newName);
      const newList = [...categories, newName];

      fb.saveCategories(newList);
      fb.saveBudget(newBudget);
      dispatch(actions.addBudget_And_Category(newBudget, newName));
      setName('');
    }
  };

  const deleteItem = (item: string) => {
    const list = categories.filter((c) => c !== item);

    fb.saveCategories(list);

    dispatch(actions.deleteBudget(item));
    fb.deleteBudget(item);
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Div theme={getTheme('white')}>
      <div className='banner'>
        <NavBar cate />
        <img src={back} alt='banner' className='banner-image' />
        <div className='banner-overlay'></div>

        <div className=''>
          <h1>Manage your categories</h1>
        </div>

        <div onKeyPress={(e) => e.key === 'Enter' && addCate()}>
          <div className='input-container'>
            <input
              type='text'
              className='inputField'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='button'
              value='Add'
              className='btn btn-primary'
              onClick={addCate}
            />
          </div>
        </div>
      </div>

      <div className='details-container'>
        <h4 className='details-title'>Categories</h4>

        <div className='details-list'>
          {categories.map((item) => (
            <div className='item'>
              <div className='item-container-1'>
                <Link className='item-description' to={`/app:${item}`}>
                  {capitalize(item)}
                </Link>
              </div>
              <div
                className='item-container-2'
                data-item={item}
                onClick={(e) => deleteItem(e.currentTarget.dataset.item ?? '')}
              >
                <FontAwesomeIcon className='item-delete' icon={faTimesCircle} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div<{ theme: Theme }>`
  min-width: 350px;

  .banner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    cursor: context-menu;
    color: white;
  }

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

  .input-container {
    display: flex;
    justify-content: space-between;
    width: 260px;
    margin: 20px;
  }
  .inputField {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.5s;
  }

  .details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .details-title {
    text-transform: uppercase;
    font-weight: 400;
    padding: 10px 20px;
    width: 100%;
    text-align: left;
    color: ${(props) => props.theme.income};
    background: ${(props) => props.theme.transparentGray};
    text-align: center;
  }

  .item {
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    border-top: 1px groove ${(props) => props.theme.transparentGray};
    cursor: context-menu;

    :last-child {
      border-bottom: 1px groove ${(props) => props.theme.transparentGray};
    }
  }

  .item-container-1 {
    padding: 5px;
    margin-right: 100px;
    font-weight: 600;
    font-size: 20px;
    color: ${(props) => props.theme.income};
  }
  .item-description {
    text-decoration: none;
    color: inherit;
  }
  .item-description:hover {
    color: inherit;
  }
  .item-container-2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-delete {
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: ${(props) => props.theme.expense};
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

export default Category;
