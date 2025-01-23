// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-cffc9.firebaseapp.com",
  projectId: "taskmanager-cffc9",
  storageBucket: "taskmanager-cffc9.firebasestorage.app",
  messagingSenderId: "372205399822",
  appId: "1:372205399822:web:3119b6ea7d01f60678f15f"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);