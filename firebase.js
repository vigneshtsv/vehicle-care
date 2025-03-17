// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vehiclecare-c2f59.firebaseapp.com",
  projectId: "vehiclecare-c2f59",
  storageBucket: "vehiclecare-c2f59.firebasestorage.app",
  messagingSenderId: "344227296180",
  appId: "1:344227296180:web:0f675ed8da61d4e7c9b8e1",
  measurementId: "G-JVEFE068FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


