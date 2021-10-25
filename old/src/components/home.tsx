import React, { FormEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';
import * as fb from '../firebase';
import { homeImg, eSpin } from '../media';

interface Props {}

function Home(props: Props) {
  // const {} = props;
  const [redirect, setRedirect] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((user) => (user ? setRedirect('/category') : null));
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setSpin(true);
    fb.signInWithEmail(email, password).then(() => setSpin(false));
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Div>
      {spin && <img src={eSpin} alt='spin' className='spinner' />}
      <main className='form-signin'>
        <form className='form-form' onSubmit={handleLogin}>
          <h1 className='h3 mb-3 fw-normal'>Welcome</h1>
          <h6 className='h6 mb-3 fw-normal'>
            <em>Easily keep track of your revenue</em>
          </h6>
          <div>
            <img
              className='mb-4'
              src={homeImg}
              alt=''
              width='100'
              height='100'
            />
          </div>
          <div className='form-control-div'>
            <input
              type='email'
              placeholder='Email'
              required
              className='m-2 form-control'
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            />
            <input
              type='password'
              required
              placeholder='Password'
              className='m-2 form-control'
              onChange={(e) => setPassword(e.target.value.trim().toLowerCase())}
            />
          </div>
          <div>
            <button type='submit' className='m-2 btn btn-primary'>
              sign-in
            </button>
            {/* <button className='btn btn-secondary' type='submit'>
              sign-up
            </button> */}
          </div>
        </form>
      </main>
    </Div>
  );
}

const Div = styled.div`
  min-height: 100vh;
  min-width: 278px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .spinner {
    position: fixed;
    top: 35px;
  }

  .form-control-div {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  .btn {
    text-transform: uppercase;
  }

  @media screen and (max-width: 326px) {
    .form-control-div {
      width: 100%;
    }
  }
`;

export default Home;
