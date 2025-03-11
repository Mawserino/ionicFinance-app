// Import the functions you need from the SDKs you need

// doc id: uhISgczVW2fUxa3iL1Cv

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq6dGgxGDtyVfIIKIJxpquLTcShBYHFrI",
  authDomain: "finance-ionic-d644b.firebaseapp.com",
  projectId: "finance-ionic-d644b",
  storageBucket: "finance-ionic-d644b.firebasestorage.app",
  messagingSenderId: "450895405883",
  appId: "1:450895405883:web:7e8eab6dc14f99d681cd1e",
  measurementId: "G-23Q3SEELSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const dataBase = getFirestore(app)

export {
    dataBase
}