import firebase from 'firebase/app';
import 'firebase/auth';

export const signOut = () => firebase.auth().signOut();

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
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((c) => true)
    .catch((e) => {
      if (e.code === 'auth/user-not-found') createUser(email, password);
      else alert(e.message);
    });
};

export const createUser = (email: string, password: string) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};
