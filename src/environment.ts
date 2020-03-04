export const firebaseConfig = {
    apiKey: "AIzaSyAupy9fSjKxEp8TyVrKEFQSCEsVyBKpDA8",
    authDomain: "oopforum-71875.firebaseapp.com",
    databaseURL: "https://oopforum-71875.firebaseio.com",
    projectId: "oopforum-71875",
    storageBucket: "oopforum-71875.appspot.com",
    messagingSenderId: "248956547626",
    appId: "1:248956547626:web:2c468d2560d3a0d9cdc953"
};

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      returnArr.push(item);
  });
  return returnArr;
};

import firebase from 'firebase/app';
import 'firebase/firestore';
export class FireService{
    
    getAccount(acct){ return firebase.firestore().collection('accounts').doc(acct).get(); }
    createAccount(form){ return firebase.firestore().collection('accounts').add(form); }
}