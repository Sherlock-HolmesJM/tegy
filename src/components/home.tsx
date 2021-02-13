import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as fb from '../firebase';
import { Redirect } from 'react-router-dom';
import { homeImg } from '../media';

interface Props {}

function Home(props: Props) {
  // const {} = props;
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((user) =>
        user ? setRedirect('/app') : console.log({ user })
      );
  }, []);

  if (redirect) return <Redirect to={redirect} />;
  console.log({ redirect });

  return (
    <Div>
      <main className='form-signin'>
        <form className='form-form'>
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
          <button
            className='btn btn-lg btn-primary'
            type='submit'
            onClick={fb.signInWithGoogle}
          >
            Sign-in
          </button>
        </form>
      </main>
    </Div>
  );
}

const Div = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Home;
