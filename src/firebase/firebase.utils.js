import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCQGbpSclO4XzghKlK7Xf0qeIyeSaNfXZ8",
    authDomain: "crwn-db-2f12e.firebaseapp.com",
    databaseURL: "https://crwn-db-2f12e.firebaseio.com",
    projectId: "crwn-db-2f12e",
    storageBucket: "crwn-db-2f12e.appspot.com",
    messagingSenderId: "488143733295",
    appId: "1:488143733295:web:cfb2c76c08e1c7f050fcda"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
