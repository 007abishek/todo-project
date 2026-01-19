// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5U3AUWOu977C7vZL8-0aZrKG3cuMiTKQ",
  authDomain: "first-project-4d839.firebaseapp.com",
  projectId: "first-project-4d839",
  storageBucket: "first-project-4d839.firebasestorage.app",
  messagingSenderId: "381956403629",
  appId: "1:381956403629:web:e72980626f17d2975c7124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth(app);