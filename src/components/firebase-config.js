// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBYppZpd-W3XuXVh_smWRKRQ1ld9orlpE",
    authDomain: "react-firebase-feedback.firebaseapp.com",
    projectId: "react-firebase-feedback",
    storageBucket: "react-firebase-feedback.appspot.com",
    messagingSenderId: "936546731146",
    appId: "1:936546731146:web:940ab4f0afcbb7f924d973",
    measurementId: "G-YYPS05VBNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);