// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vehicle-care-4dba9.firebaseapp.com",
  projectId: "vehicle-care-4dba9",
  storageBucket: "vehicle-care-4dba9.appspot.com",
  messagingSenderId: "494325891091",
  appId: "1:494325891091:web:9ddb31c04c558e8b3b3fe6",
  measurementId: "G-ZN8DNDHY60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);