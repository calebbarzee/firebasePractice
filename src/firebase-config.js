import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBNbLHC2AFu63VyAiOvRoSLWVB8oAr1XSE",
    authDomain: "boxpics-60eee.firebaseapp.com",
    projectId: "boxpics-60eee",
    storageBucket: "boxpics-60eee.appspot.com",
    messagingSenderId: "4256696973",
    appId: "1:4256696973:web:e37fbc1d2338f9fc1a70c4",
    measurementId: "G-5XZRDTSM79"
  };
  
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
export { db, storage };