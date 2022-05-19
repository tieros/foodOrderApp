// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBomJv4n9q3x0gm-gfnllLjFGGcF1kYV3c",
  authDomain: "foodorder-afd5a.firebaseapp.com",
  databaseURL: "https://foodorder-afd5a-default-rtdb.firebaseio.com",
  projectId: "foodorder-afd5a",
  storageBucket: "foodorder-afd5a.appspot.com",
  messagingSenderId: "917554146914",
  appId: "1:917554146914:web:394d63b8e9898c62512b3b",
};

// Initialize Firebase and connect with the app
const app = initializeApp(firebaseConfig);

//app will have authentication
export const auth = getAuth(app);

// app have database
export const database = getDatabase(app);