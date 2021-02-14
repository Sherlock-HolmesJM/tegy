import firebase from 'firebase/app';
import 'firebase/auth';

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((credential) => console.log(credential.user))
    .catch((e) => console.log(e));
};

export const signInWithEmail = (email: string, password: string) => {
  console.log('Attempting sign in.');

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((credential) => console.log(credential.user))
    .catch((e) => console.log({ e, code: e.code }));
};
