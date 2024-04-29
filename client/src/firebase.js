// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // if vite:import.meta.env   else: process.env
  authDomain: "mern-blog-14bff.firebaseapp.com",
  projectId: "mern-blog-14bff",
  storageBucket: "mern-blog-14bff.appspot.com",
  messagingSenderId: "570895802392",
  appId: "1:570895802392:web:4e39e6547c53b947d1e36d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
