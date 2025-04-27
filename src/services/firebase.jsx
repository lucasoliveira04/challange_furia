import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOEtpy5COGHi7IWaVSwLZ9f3GYqJGampA",
  authDomain: "cha-fur.firebaseapp.com",
  projectId: "cha-fur",
  storageBucket: "cha-fur.firebasestorage.app",
  messagingSenderId: "1072513720186",
  appId: "1:1072513720186:web:1ca51197bc2506c998c0c3",
  measurementId: "G-YK4R7G7TF0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
