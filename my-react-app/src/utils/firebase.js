// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stupid-math-game.firebaseapp.com",
  databaseURL: "https://stupid-math-game-default-rtdb.firebaseio.com",
  projectId: "stupid-math-game",
  storageBucket: "stupid-math-game.firebasestorage.app",
  messagingSenderId: "437149078258",
  appId: "1:437149078258:web:f723ece22a0317ab95b66b",
  measurementId: "G-P696YXFGHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);