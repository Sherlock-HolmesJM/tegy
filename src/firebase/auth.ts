import firebase from 'firebase/app';
import 'firebase/auth';

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => console.log(res.user))
    .catch((e) => console.log(e));
};
