// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cfe-course-for-everyone.firebaseapp.com",
  projectId: "cfe-course-for-everyone",
  storageBucket: "cfe-course-for-everyone.appspot.com",
  messagingSenderId: "322833541253",
  appId: "1:322833541253:web:747fe1d850149ff156a1ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);