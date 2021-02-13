import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as fb from '../firebase';
import { Redirect } from 'react-router-dom';

interface Props {}

function Home(props: Props) {
  // const {} = props;
  const [redirect, setRedirect] = useState('');

  firebase
    .auth()
    .onAuthStateChanged((user) => (user ? setRedirect('/app') : null));

  if (redirect) return <Redirect to={redirect} />;

  return (
    <div>
      <main className='form-signin'>
        <form>
          <img
            className='mb-4'
            src='/docs/5.0/assets/brand/bootstrap-logo.svg'
            alt=''
            width='72'
            height='57'
          />
          <h1 className='h3 mb-3 fw-normal'>Please sign in with Google</h1>
          <button
            className='w-100 btn btn-lg btn-primary'
            type='submit'
            onClick={fb.auth.signInWithGoogle}
          >
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
}

export default Home;
