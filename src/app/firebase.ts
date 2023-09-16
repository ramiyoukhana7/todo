// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDlU5jnFMVr13yXOyX0KI8UGDUkgButeo",
  authDomain: "todo-e2d25.firebaseapp.com",
  projectId: "todo-e2d25",
  storageBucket: "todo-e2d25.appspot.com",
  messagingSenderId: "667413078872",
  appId: "1:667413078872:web:a83510ef1ae49e4a653b2d",
};

// Initialize Firebase

//Kollar ifall en App är redan instaliserad, om inte instalisera en. För att undvika eventuella errors
const app = getApps().length ? getApp : initializeApp(firebaseConfig);
const firebaseAuth = getAuth();

export { app, firebaseAuth };
