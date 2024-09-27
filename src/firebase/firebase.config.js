// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAT9k_uadGAoRcdpozZtNwaIU_hSQ2NBwc",
    authDomain: "user-email-password-prac-8b06c.firebaseapp.com",
    projectId: "user-email-password-prac-8b06c",
    storageBucket: "user-email-password-prac-8b06c.appspot.com",
    messagingSenderId: "318042131622",
    appId: "1:318042131622:web:a9c1febe4e9f6648943867"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;


