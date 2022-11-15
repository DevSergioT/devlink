
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB6hiSZcl18t7Xzkmi0mDNdlSQDCmVtPJ0",
  authDomain: "devlink-9a0ee.firebaseapp.com",
  projectId: "devlink-9a0ee",
  storageBucket: "devlink-9a0ee.appspot.com",
  messagingSenderId: "156936597609",
  appId: "1:156936597609:web:920e055d461147a1c1b2f8",
  measurementId: "G-KK9JS98QG7"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

export { db, auth };