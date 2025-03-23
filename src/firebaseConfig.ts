import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBiaZNvSERlG9dC-HdKBIw_B38IuV9uHo0",
    authDomain: "teller-2b493.firebaseapp.com",
    projectId: "teller-2b493",
    storageBucket: "teller-2b493.firebasestorage.app",
    messagingSenderId: "568025543710",
    appId: "1:568025543710:web:b205dee2ee7b515b1baa0f",
    measurementId: "G-SHPZ6TBNCX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
