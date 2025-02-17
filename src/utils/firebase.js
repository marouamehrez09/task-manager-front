// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQXCfDOdCWx4S8MR3zp-P-9H-kUIXf088",
  authDomain: "task-manager-e2367.firebaseapp.com",
  databaseURL: "https://task-manager-e2367-default-rtdb.firebaseio.com",
  projectId: "task-manager-e2367",
  storageBucket: "task-manager-e2367.firebasestorage.app",
  messagingSenderId: "69787244481",
  appId: "1:69787244481:web:f1cb1352e3855212a10140",
  measurementId: "G-BHYQ26TC5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//export const db = getDatabase(app);




//export const db = getFirestore(app)

// Initialisation de Realtime Database

//const database = getDatabase(app)

//export { database, ref, push, onValue, serverTimestamp,set};