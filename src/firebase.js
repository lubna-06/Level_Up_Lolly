import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { exp } from "firebase/firestore/pipelines";

const firebaseConfig = {
  apiKey: "AIzaSyDdih3dxvA884UWX10h5RpA4-7B5FqR_Kw",
  authDomain: "leveluplolly-20055.firebaseapp.com",
  projectId: "leveluplolly-20055",
  storageBucket: "leveluplolly-20055.firebasestorage.app",
  messagingSenderId: "40461224315",
  appId: "1:40461224315:web:e263ea25e1c6782a8d55de"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db=getFirestore(app);
export default app;