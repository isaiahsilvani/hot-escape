import firebase from 'firebase'

const firebaseConfig = {
  apiKey: `AIzaSyAsJgCPsczdEVSvflpbXNsN4SP-YtHyN8Y`,
  authDomain: "hot-escapes.firebaseapp.com",
  projectId: "hot-escapes",
  storageBucket: "hot-escapes.appspot.com",
  messagingSenderId: "521123099528",
  appId: "1:521123099528:web:2ac5b55eb878f47f86403d"
};

export const firebaseRef = firebase
export const auth = firebase.auth()
export const db = firebase.firestore()