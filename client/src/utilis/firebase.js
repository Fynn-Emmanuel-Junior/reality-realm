// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBqFG53Cz2eB7Zor3AxVbDzoLydafclZsY",
  authDomain: "realityrealm-7dd78.firebaseapp.com",
  projectId: "realityrealm-7dd78",
  storageBucket: "realityrealm-7dd78.appspot.com",
  messagingSenderId: "194090647352",
  appId: "1:194090647352:web:59bf61ed66862bcc838bcd",
  measurementId: "G-WW7RVY2YE3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);