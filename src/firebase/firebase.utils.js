import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
    apiKey: "AIzaSyCCsd6KqeZ-JbqKGax2j7F42j950krWsBg",
    authDomain: "ecom-1-db.firebaseapp.com",
    databaseURL: "https://ecom-1-db.firebaseio.com",
    projectId: "ecom-1-db",
    storageBucket: "ecom-1-db.appspot.com",
    messagingSenderId: "862617502557",
    appId: "1:862617502557:web:1d0212fcb2dda2d104deb4",
    measurementId: "G-8PPJEYV3GZ"
      
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    

    try {
      await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
      })
    } catch(error) {
        console.log('error creating user', error.message);
    }    
}
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle  = () => auth.signInWithPopup(provider);

export default firebase;