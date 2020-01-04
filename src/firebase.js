import firebase from 'firebase/app'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyD1seFQWGlhU8ouYVWFpQSNSPsUpj5pF28",
  authDomain: "react-redux-app-6ff50.firebaseapp.com",
  databaseURL: "https://react-redux-app-6ff50.firebaseio.com",
  projectId: "react-redux-app-6ff50",
  storageBucket: "react-redux-app-6ff50.appspot.com",
  messagingSenderId: "1000656688913",
  appId: "1:1000656688913:web:ba9d3537ec83fba5479eb0",
  measurementId: "G-6KH70SRRDT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export function loginWithGoogle(){
  let provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
  .then(snap => snap.user)
}